/**
 * 
 * 该Servlet实现查询新老顾客数据（按周计）
 * @author Victors
 * 
 */
package com.victors.main;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Calendar;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.client.transport.TransportClient;
import org.json.JSONObject;

import com.victors.tools.GetESData;
import com.victors.tools.ProcessNumber;

public class SelectNewAndOldCustomersWeek extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		String index_name;
		String[] index = {"res-"};
		String[] type = {"week"};
		ArrayList<Integer> the_new_customers = new ArrayList<Integer>();//新顾客
		ArrayList<Integer> the_old_customers = new ArrayList<Integer>();//老顾客
		ArrayList<String> time = new ArrayList<String>();
		String s_time;//用于临时存放时间
		Calendar temp_time = Calendar.getInstance();//用于临时处理时间
		String show_start_time;//展示开始时间
		String show_end_time;//展示结束时间
		int start_year = Integer.parseInt(request.getParameter("start_year"));
		int start_month = Integer.parseInt(request.getParameter("start_month"));
		int start_day = Integer.parseInt(request.getParameter("start_day"));
		int start_hour = 0;
		temp_time.set(Calendar.YEAR, start_year);
		temp_time.set(Calendar.MONTH, start_month-1);
		temp_time.set(Calendar.DATE, start_day);
		int start_week = temp_time.get(Calendar.WEEK_OF_YEAR);
		if(start_week == 1)
		{
			if(start_day > 7)
			{
				start_year++;
			}
		}
		start_week++;
		temp_time.set(Calendar.YEAR, start_year);
		temp_time.set(Calendar.MONTH, 11);
		temp_time.set(Calendar.DATE, 31);
		if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
		{
			temp_time.set(Calendar.DATE, 24);
		}
		if(start_week > temp_time.get(Calendar.WEEK_OF_YEAR))
		{
			start_year++;
			start_week = 1;
		}
		int end_year = Integer.parseInt(request.getParameter("end_year"));
		int end_month = Integer.parseInt(request.getParameter("end_month"));
		int end_day = Integer.parseInt(request.getParameter("end_day"));
		temp_time.set(Calendar.YEAR, end_year);
		temp_time.set(Calendar.MONTH, end_month-1);
		temp_time.set(Calendar.DATE, end_day);
		int end_week = temp_time.get(Calendar.WEEK_OF_YEAR);
		if(end_week == 1)
		{
			if(end_day > 7)
			{
				end_year++;
			}
		}
		for(int i = 0; i < 2; i++)
		{
			end_week++;
			temp_time.set(Calendar.YEAR, end_year);
			temp_time.set(Calendar.MONTH, 11);
			temp_time.set(Calendar.DATE, 31);
			if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
			{
				temp_time.set(Calendar.DATE, 24);
			}
			if(end_week > temp_time.get(Calendar.WEEK_OF_YEAR))
			{
				end_year++;
				end_week = 1;
			}
		}
		//下面为展示开始和结束时间的临时变量
		int temp_start_year;
		int temp_start_month;
		int temp_start_day;
		int temp_start_week;
		int temp_end_year;
		int temp_end_month;
		int temp_end_day;
		int temp_end_week;
		Calendar temp_time2 = Calendar.getInstance();//用于临时处理时间
		temp_time2.set(Calendar.YEAR, start_year);
		temp_time2.set(Calendar.WEEK_OF_YEAR, start_week);
		temp_time2.set(Calendar.DAY_OF_WEEK, 1);
		int temp_year = temp_time2.get(Calendar.YEAR);
		int temp_month = temp_time2.get(Calendar.MONTH) + 1;
		int temp_day = temp_time2.get(Calendar.DATE);
		int temp_week = start_week;
		//下面为计算开始时间
		temp_start_year = start_year;
		temp_start_week = start_week - 1;
		if(temp_start_week <= 0)
		{
			temp_start_year--;
			temp_time.set(Calendar.YEAR, temp_start_year);
			temp_time.set(Calendar.MONTH, 11);
			temp_time.set(Calendar.DATE, 31);
			if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
			{
				temp_time.set(Calendar.DATE, 24);
			}
			temp_start_week = temp_time.get(Calendar.WEEK_OF_YEAR) + temp_start_week;
		}
		temp_time2.set(Calendar.YEAR, temp_start_year);
		temp_time2.set(Calendar.WEEK_OF_YEAR, temp_start_week);
		temp_time2.set(Calendar.DAY_OF_WEEK, 1);
		temp_start_year = temp_time2.get(Calendar.YEAR);
		temp_start_month = temp_time2.get(Calendar.MONTH) + 1;
		temp_start_day = temp_time2.get(Calendar.DATE);
		show_start_time = temp_start_year + "-" + ProcessNumber.processNumber(temp_start_month) + "-" + ProcessNumber.processNumber(temp_start_day);
		//下面变量为展示显示时间的变量
		int show_year;
		int show_week;
		int s_year = temp_year;
		//循环进行数据获取处理
		while(true)
		{
			//组合索引名
			index_name = "res-" + temp_year + "." + ProcessNumber.processNumber(temp_month) + "." + ProcessNumber.processNumber(temp_day) + "_" + ProcessNumber.processNumber(start_hour);
			index[0] = index_name;
			//处理展示时间
			show_year = s_year;
			show_week = temp_week - 1;
			//处理非正数周
			if(show_week <= 0)
			{
				show_year--;
				temp_time.set(Calendar.YEAR, show_year);
				temp_time.set(Calendar.MONTH, 11);
				temp_time.set(Calendar.DATE, 31);
				if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
				{
					temp_time.set(Calendar.DATE, 24);
				}
				show_week = temp_time.get(Calendar.WEEK_OF_YEAR) + show_week;
			}
			//组合时间
			s_time = show_year + "年" + ProcessNumber.processNumber(show_week)+"周";
			time.add(s_time);
			//处理结束时间
			temp_end_year = show_year;
			temp_end_week = show_week;
			temp_time2.set(Calendar.YEAR, temp_end_year);
			temp_time2.set(Calendar.WEEK_OF_YEAR, temp_end_week);
			temp_time2.set(Calendar.DAY_OF_WEEK, 7);
			temp_end_year = temp_time2.get(Calendar.YEAR);
			temp_end_month = temp_time2.get(Calendar.MONTH) + 1;
			temp_end_day = temp_time2.get(Calendar.DATE);
			show_end_time = temp_end_year + "-" + ProcessNumber.processNumber(temp_end_month) + "-" + ProcessNumber.processNumber(temp_end_day);
			String data = GetESData.selectData(transportClient, index, type);
			String new_customer;//新顾客
			String old_customer;//老顾客
			if(data.equals(""))
			{
				new_customer = "0";
				old_customer = "0";
			}
			else
			{
				JSONObject dataJson = new JSONObject(data);//创建一个包含json串的json对象
				JSONObject new_and_old_customers = dataJson.getJSONObject("The new and old customers");//新老顾客
				new_customer = new_and_old_customers.getString("new");//新顾客
				old_customer = new_and_old_customers.getString("old");//老顾客
			}
			the_new_customers.add(Integer.parseInt(new_customer));
			the_old_customers.add(Integer.parseInt(old_customer));
			//处理下一个时间
			temp_week++;
			Calendar temp_time3 = Calendar.getInstance();//用于临时处理时间
			if(s_year != temp_year)
			{
				temp_year++;
			}
			temp_time3.set(Calendar.YEAR, temp_year);
			temp_time3.set(Calendar.MONTH, 11);
			temp_time3.set(Calendar.DATE, 31);
			if(temp_time3.get(Calendar.WEEK_OF_YEAR) == 1)
			{
				temp_time3.set(Calendar.DATE, 24);
			}
			if(temp_week > temp_time3.get(Calendar.WEEK_OF_YEAR))
			{
				s_year++;
				temp_year++;
				temp_week = 1;
				temp_month = 1;
				temp_time3.set(Calendar.YEAR, temp_year);
				temp_time3.set(Calendar.WEEK_OF_YEAR, 1);
				temp_time3.set(Calendar.DAY_OF_WEEK, 1);
				temp_day = temp_time3.get(Calendar.DATE);
				if(temp_day > 7)
				{
					temp_year--;
					temp_month = 12;
				}
			}
			else
			{
				temp_time3.set(Calendar.YEAR, temp_year);
				temp_time3.set(Calendar.WEEK_OF_YEAR, temp_week);
				temp_time3.set(Calendar.DAY_OF_WEEK, 1);
				temp_day = temp_time3.get(Calendar.DATE);
				temp_month = temp_time3.get(Calendar.MONTH) + 1;
			}
			if(s_year == end_year && temp_week == end_week)
			{
				break;
			}
		}
		//创建并处理
		JSONObject new_json_obj = new JSONObject();
		new_json_obj.accumulate("new_customers", the_new_customers);
		new_json_obj.accumulate("old_customers", the_old_customers);
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
