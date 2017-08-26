/**
 * 
 * 该servlet实现顾客活跃度月数据处理
 * @author Victors
 * 
 */
package com.victors.main;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;

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

public class CustomerActiveMonth extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		final int MAX_X = 12;//表示横坐标最大的显示数目,修改时不要超过24
		String index_name;
		String[] index = {"res-"};
		String[] type = {"month"};
		int the_high_activity = 0;//高活跃度
		int the_mid_activity = 0;//中活跃度
		int the_low_activity = 0;//低活跃度
		int the_sleep_activity = 0;//沉睡活跃度
		Calendar system_time = Calendar.getInstance();//用于获取当前系统时间
		int year;//系统时间年
		int month;//系统时间月
		int day;//系统时间日
		int hour;//系统时间小时
		int start_year;//开始时间年
		int start_month;//开始时间月
		int start_day;//开始时间日
		int start_hour;//开始时间小时
		String host = "192.168.1.104";//ElasticSearch的IP
		int port = 9300;//端口号
		String show_start_time;//展示开始时间
		//下面为展示开始时间的临时变量
		int temp_start_year;
		int temp_start_month;
		//依次获取系统时间
		year = system_time.get(Calendar.YEAR); 
		month = system_time.get(Calendar.MONTH) + 1; 
		day = system_time.get(Calendar.DATE); 
		hour = system_time.get(Calendar.HOUR_OF_DAY);
		//初始开始时间
		start_year = year;
		start_hour = 0;
		start_day = 1;
		//如果日为1，则处理
		if(day == 1)
		{
			//如果时为0，则上月数据不可获取
			if(hour == 0)
			{
				start_month = month - 1;
			}
			else
			{
				start_month = month;
			}
		}
		else
		{
			start_month = month;
		}
		//处理非正数月
		if(start_month <= 0)
		{
			start_year--;
			start_month = 12 + start_month;
		}
		//处理展示开始时间
		temp_start_year = start_year;
		temp_start_month = start_month - 1;
		if(temp_start_month <= 0)
		{
			temp_start_year--;
			temp_start_month = 12 + temp_start_month;
		}
		show_start_time = temp_start_year + "-" + ProcessNumber.processNumber(temp_start_month);
		//组合索引名
		index_name = "res-" + start_year + "." + ProcessNumber.processNumber(start_month) + "." + ProcessNumber.processNumber(start_day) + "_" + ProcessNumber.processNumber(start_hour);
		index[0] = index_name;
		//String data = GetESData.select_data(host, port, index, type);
		String data = GetESData.selectData(transportClient, index, type);
		if(!data.equals(""))
		{
		    JSONObject dataJson = new JSONObject(data);//创建一个包含json串的json对象
		    JSONObject customer_active = dataJson.getJSONObject("Customer active");//顾客活跃度
		    String high_activity = customer_active.getString("High activity");//高活跃度
		    String mid_activity = customer_active.getString("Mid activity");//中活跃度
		    String low_activity = customer_active.getString("Low activity");//低活跃度
		    String sleep_activity = customer_active.getString("Sleep activity");//沉睡活跃度
		    the_high_activity = Integer.parseInt(high_activity);
		    the_mid_activity = Integer.parseInt(mid_activity);
		    the_low_activity = Integer.parseInt(low_activity);
		    the_sleep_activity = Integer.parseInt(sleep_activity);
		}
		//创建并处理
		JSONObject new_json_obj = new JSONObject();
		new_json_obj.accumulate("high_activity", the_high_activity);
		new_json_obj.accumulate("mid_activity", the_mid_activity);
		new_json_obj.accumulate("low_activity", the_low_activity);
		new_json_obj.accumulate("sleep_activity", the_sleep_activity);
		new_json_obj.accumulate("show_start_time", show_start_time);
		String new_s_json_obj = new_json_obj.toString();
		out.println(new_s_json_obj);
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
