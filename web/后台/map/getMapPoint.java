/**
 * 
 * 该servlet实现获取地图的经纬度坐标
 * @author Victors
 * 
 */
package com.victors.map;

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

public class getMapPoint extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		String[] index = {"res-"};
		String[] type = {"hour"};
		Calendar system_time = Calendar.getInstance();//用于获取当前系统时间
		int year;//系统时间年
		int month;//系统时间月
		int day;//系统时间日
		int hour;//系统时间小时
		year = system_time.get(Calendar.YEAR); 
		month = system_time.get(Calendar.MONTH) + 1; 
		day = system_time.get(Calendar.DATE); 
		hour = system_time.get(Calendar.HOUR_OF_DAY);
		hour = hour - 1;
		if(hour < 0)
		{
			hour = 24 + hour;
			day = day - 1;
			if(day == 0)
			{
				month = month - 1;
				if(month == 0)
				{
					month = 12;
					year = year - 1;
					day = 31;
				}
				else
				{
					day = GetDayBaseYearAndMonth.getDay(year, month);
				}
			}
		}
		String index_name = "res-" + year + "." + ProcessNumber.processNumber(month) + "." + ProcessNumber.processNumber(day) + "_" + ProcessNumber.processNumber(hour);
		index[0] = index_name;
		String data = GetESData.selectData(transportClient, index, type);
		double lat;//经度
		double lon;//维度
		if(data.equals(""))
		{
			lon = 116.404;
			lat = 39.915;
		}
		else
		{
			JSONObject dataJson = new JSONObject(data);//创建一个包含json串的json对象
			lat = Double.parseDouble(dataJson.getString("lat"));//获取维度
			lon = Double.parseDouble(dataJson.getString("lon"));//获取经度
		}
		JSONObject new_json_obj = new JSONObject();
		new_json_obj.accumulate("lat", lat);
		new_json_obj.accumulate("lon", lon);
		String new_s_json_obj = new_json_obj.toString();
		out.println(new_s_json_obj);
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
