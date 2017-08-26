/**
 * 
 * 该servlet实现入店率周数据处理
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

public class IntoTheStoreRateWeek extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		final int MAX_X = 12;//表示横坐标最大的显示数目,修改时不要超过12
		String index_name;
		String[] index = {"res-"};
		String[] type = {"week"};
		ArrayList<Float> the_into_the_store_rate = new ArrayList<Float>();
		ArrayList<String> time = new ArrayList<String>();
		String s_time;//用于临时存放时间
		Calendar system_time = Calendar.getInstance();//用于获取当前系统时间
		Calendar temp_time = Calendar.getInstance();//用于临时处理时间
		int year;//系统时间年
		int month;//系统时间月
		int day;//系统时间日
		int hour;//系统时间小时
		int week;//系统时间周
		int day_of_week;//系统时间周的第几天
		
		int start_year;//开始时间年
		int start_month;//开始时间月
		int start_day;//开始时间日
		int start_hour;//开始时间小时
		int start_week;//开始时间周
		
		String host = "192.168.1.104";//ElasticSearch的IP
		int port = 9300;//端口号
		String show_start_time;//展示开始时间
		String show_end_time;//展示结束时间
		//下面为展示开始和结束时间的临时变量
		int temp_start_year;
		int temp_start_month;
		int temp_start_day;
		int temp_start_week;
		int temp_end_year;
		int temp_end_month;
		int temp_end_day;
		int temp_end_week;
		//依次获取系统时间
		year = system_time.get(Calendar.YEAR); 
		month = system_time.get(Calendar.MONTH) + 1; 
		day = system_time.get(Calendar.DATE); 
		hour = system_time.get(Calendar.HOUR_OF_DAY);
		week = system_time.get(Calendar.WEEK_OF_YEAR);
		day_of_week = system_time.get(Calendar.DAY_OF_WEEK);
		if(week == 1)
		{
			if(day > 7)
			{
				year++;
			}
		}
		//初始开始时间
		start_year = year;
		start_hour = 0;
		start_day = day;
		start_month = month;
		start_week = week;
		//如果为周日，则处理
		if(day_of_week == 1)
		{
			//如果时为0，则上周数据不可取
			if(hour == 0)
			{
				start_week = week - MAX_X;
			}
			else
			{
				start_week = week - MAX_X + 1;
				week++;
				temp_time.set(Calendar.YEAR, year);
				temp_time.set(Calendar.MONTH, 11);
				temp_time.set(Calendar.DATE, 31);
				if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
				{
					temp_time.set(Calendar.DATE, 24);
				}
				if(week > temp_time.get(Calendar.WEEK_OF_YEAR))
				{
					week = 1;
					year++;				
				}
			}
		}
		else
		{
			start_week = week - MAX_X + 1;
			week++;
			temp_time.set(Calendar.YEAR, year);
			temp_time.set(Calendar.MONTH, 11);
			temp_time.set(Calendar.DATE, 31);
			if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
			{
				temp_time.set(Calendar.DATE, 24);
			}
			if(week > temp_time.get(Calendar.WEEK_OF_YEAR))
			{
				week = 1;
				year++;				
			}
		}
		//处理非正数周
		if(start_week <= 0)
		{
			start_year--;
			temp_time.set(Calendar.YEAR, start_year);
			temp_time.set(Calendar.MONTH, 11);
			temp_time.set(Calendar.DATE, 31);
			if(temp_time.get(Calendar.WEEK_OF_YEAR) == 1)
			{
				temp_time.set(Calendar.DATE, 24);
			}
			start_week = temp_time.get(Calendar.WEEK_OF_YEAR) + start_week;
		}
		Calendar temp_time2 = Calendar.getInstance();//用于临时处理时间
		temp_time2.set(Calendar.YEAR, start_year);
		temp_time2.set(Calendar.WEEK_OF_YEAR, start_week);
		temp_time2.set(Calendar.DAY_OF_WEEK, 1);
		int temp_year = temp_time2.get(Calendar.YEAR);
		int temp_month = temp_time2.get(Calendar.MONTH);
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
			String into_the_store_rate;
			if(data.equals(""))
			{
				into_the_store_rate = "0";
			}
			else
			{
				JSONObject dataJson = new JSONObject(data);//创建一个包含json串的json对象
				into_the_store_rate = dataJson.getString("Into the store rate");//入店率
			}
			the_into_the_store_rate.add(Float.parseFloat(into_the_store_rate));//加入入店率数据
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
			if(s_year == year && temp_week == week)
			{
				break;
			}
		}
		//创建并处理
		JSONObject new_json_obj = new JSONObject();
		new_json_obj.accumulate("into_the_store_rate", the_into_the_store_rate);
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
