/**
 * 
 * 该servlet实现查询驻店时长数据（按小时计）
 * @author Victors
 * 
 */
package com.victors.main;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.client.transport.TransportClient;
import org.json.JSONObject;

import com.victors.tools.GetDayBaseYearAndMonth;
import com.victors.tools.GetESData;
import com.victors.tools.ProcessNumber;

public class SelectTheResidentTimeHour extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		String index_name;
		String[] index = {"res-"};
		String[] type = {"hour"};
		ArrayList<Float> the_resident_time = new ArrayList<Float>();//驻店时长
		ArrayList<String> time = new ArrayList<String>();
		String s_time;//用于临时存放时间
		int start_year = Integer.parseInt(request.getParameter("start_year"));
		int start_month = Integer.parseInt(request.getParameter("start_month"));
		int start_day = Integer.parseInt(request.getParameter("start_day"));
		int start_hour = Integer.parseInt(request.getParameter("start_hour"));
		int end_year = Integer.parseInt(request.getParameter("end_year"));
		int end_month = Integer.parseInt(request.getParameter("end_month"));
		int end_day = Integer.parseInt(request.getParameter("end_day"));
		int end_hour = Integer.parseInt(request.getParameter("end_hour"));
		String host = "192.168.1.104";//ElasticSearch的IP
		int port = 9300;//端口号
		String show_start_time;//展示开始时间
		String show_end_time;//展示结束时间
		show_end_time = end_year + "-" + ProcessNumber.processNumber(end_month) + "-" + ProcessNumber.processNumber(end_day) + " " + ProcessNumber.processNumber(end_hour);
		show_start_time = start_year + "-" + ProcessNumber.processNumber(start_month) + "-" + ProcessNumber.processNumber(start_day) + " " + ProcessNumber.processNumber(start_hour);
		DecimalFormat df = new DecimalFormat("0.00");//用于设置保留两位小数
		int second_per_minute = 60;//表示一分钟有60秒
		//末尾时间加1
		end_hour++;
		if(end_hour >=24)
		{
			end_hour = 0;
			end_day++;
			if(end_day > GetDayBaseYearAndMonth.getDay(end_year, end_month))
			{
				end_day = 1;
				end_month++;
				if(end_month > 12)
				{
					end_month = 1;
					end_year++;
				}
			}
		}
		int temp_year = start_year;//用于循环临时年
		int temp_month = start_month;//用于循环临时月
		int temp_day = start_day;//用于循环临时日
		int temp_hour = start_hour;//用于循环临时小时
		int s_hour, s_day, s_month, s_year;//用于显示时间
		//循环进行数据获取处理
		while(true)
		{
			//组合索引名
			index_name = "res-" + temp_year + "." + ProcessNumber.processNumber(temp_month) + "." + ProcessNumber.processNumber(temp_day) + "_" + ProcessNumber.processNumber(temp_hour);
			index[0] = index_name;
			//组合时间
			if(temp_hour == 0)
			{
				s_hour = 24;
				s_day = temp_day - 1;
				s_month = temp_month;
				s_year = temp_year;
				if(s_day <= 0)
				{
					s_month--;
					if(s_month <= 0)
					{
						s_year--;
					}
					s_day = GetDayBaseYearAndMonth.getDay(s_year, s_month);
				}
			}
			else
			{
				s_year = temp_year;
				s_month = temp_month;
				s_day = temp_day;
				s_hour = temp_hour;
			}
			s_time = ProcessNumber.processNumber(s_month) + "." + ProcessNumber.processNumber(s_day) + "." + ProcessNumber.processNumber(s_hour);
			time.add(s_time);
			String data = GetESData.selectData(transportClient, index, type);
			String resident_time;//驻店时长
			if(data.equals(""))
			{
				resident_time = "0";
			}
			else
			{
				JSONObject dataJson = new JSONObject(data);//创建一个包含json串的json对象
				resident_time = dataJson.getString("The resident time");//驻店时长
			}
			the_resident_time.add(Float.parseFloat(df.format(Float.parseFloat(resident_time)/(float)second_per_minute)));
			//处理下一个时间
			temp_hour++;
			if(temp_hour >= 24)
			{
				temp_hour = 0;
				temp_day++;
				if(temp_day > GetDayBaseYearAndMonth.getDay(temp_year, temp_month))
				{
					temp_day = 1;
					temp_month++;
					if(temp_month > 12)
					{
						temp_month = 1;
						temp_year++;
					}
				}
			}
			if(temp_year == end_year && temp_month == end_month && temp_day == end_day && temp_hour == end_hour)
			{
				break;
			}
		}
		//创建并处理
		JSONObject new_json_obj = new JSONObject();
		new_json_obj.accumulate("resident_time", the_resident_time);
		new_json_obj.accumulate("time", time);
		new_json_obj.accumulate("show_start_time", show_start_time);
		new_json_obj.accumulate("show_end_time", show_end_time);
		String new_s_json_obj = new_json_obj.toString();
		out.println(new_s_json_obj);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
