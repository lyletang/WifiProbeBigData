/**
 * 
 * 该servlet实现查询顾客活跃度数据（按月计）
 * @author Victors
 * 
 */
package com.victors.main;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.client.transport.TransportClient;
import org.json.JSONObject;

import com.victors.tools.GetESData;
import com.victors.tools.ProcessNumber;

public class SelectCustomerActiveMonth extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		String index_name;
		String[] index = {"res-"};
		String[] type = {"month"};
		int the_high_activity = 0;//高活跃度
		int the_mid_activity = 0;//中活跃度
		int the_low_activity = 0;//低活跃度
		int the_sleep_activity = 0;//沉睡活跃度
		int start_year = Integer.parseInt(request.getParameter("start_year"));
		int start_month = Integer.parseInt(request.getParameter("start_month"));
		int start_day = 1;
		int start_hour = 0;
		String show_start_time;//展示开始时间
		show_start_time = start_year + "-" + ProcessNumber.processNumber(start_month);
		//开始时间加1
		start_month++;
		if(start_month > 12)
		{
			start_month = 1;
			start_year++;
		}
		//组合索引名
		index_name = "res-" + start_year + "." + ProcessNumber.processNumber(start_month) + "." + ProcessNumber.processNumber(start_day) + "_" + ProcessNumber.processNumber(start_hour);
		index[0] = index_name;
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
