/**
 * 
 * 该servlet实现查找客流量入店量数据（按月计）
 * @author Victors
 * 
 */
package com.victors.main;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.client.transport.TransportClient;
import org.json.JSONObject;

import com.victors.tools.GetESData;
import com.victors.tools.ProcessNumber;

public class SelectTrafficAndTheAmountOfStoreMonth extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		String index_name;
		String[] index = {"res-"};
		String[] type = {"month"};
		ArrayList<Integer> the_traffic = new ArrayList<Integer>();
		ArrayList<Integer> the_store_amount = new ArrayList<Integer>();
		ArrayList<String> time = new ArrayList<String>();
		String s_time;//用于临时存放时间
		int start_year = Integer.parseInt(request.getParameter("start_year"));
		int start_month = Integer.parseInt(request.getParameter("start_month"));
		int start_day = 1;
		int start_hour = 0;
		int end_year = Integer.parseInt(request.getParameter("end_year"));
		int end_month = Integer.parseInt(request.getParameter("end_month"));
		String show_start_time;//展示开始时间
		String show_end_time;//展示结束时间
		show_end_time = end_year + "-" + ProcessNumber.processNumber(end_month);
		show_start_time = start_year + "-" + ProcessNumber.processNumber(start_month);
		//开始时间加1
		start_month++;
		if(start_month > 12)
		{
			start_month = 1;
			start_year++;
		}
		//处理结束时间
		for(int i = 0; i < 2; i++)
		{
			end_month++;
			if(end_month > 12)
			{
				end_month = 1;
				end_year++;
			}
		}
		int temp_year = start_year;//用于循环临时年
		int temp_month = start_month;//用于循环临时月
		//下列为展示显示时间的变量
		int show_year;
		int show_month;
		//循环进行数据获取处理
		while(true)
		{
			//组合索引名
			index_name = "res-" + temp_year + "." + ProcessNumber.processNumber(temp_month) + "." + ProcessNumber.processNumber(start_day) + "_" + ProcessNumber.processNumber(start_hour);
			index[0] = index_name;
			show_year = temp_year;
			show_month = temp_month - 1;
			if(show_month <= 0)
			{
				show_year--;
				show_month = 12 + show_month;
			}
			//组合时间
			s_time = show_year + "." + ProcessNumber.processNumber(show_month);
			time.add(s_time);
			String data = GetESData.selectData(transportClient, index, type);
			String traffic_amount;
			String the_amount_of_store;
			if(data.equals(""))
			{
				traffic_amount = "0";
				the_amount_of_store = "0";
			}
			else
			{
				JSONObject dataJson = new JSONObject(data);//创建一个包含json串的json对象
				traffic_amount = dataJson.getString("Traffic amount");//客流量
				the_amount_of_store = dataJson.getString("The amount of store");//入店量
			}
			the_traffic.add(Integer.parseInt(traffic_amount));//加入客流量数据
			the_store_amount.add(Integer.parseInt(the_amount_of_store));//加入入店量
			//处理下一个时间
			temp_month++;
			if(temp_month > 12)
			{
				temp_month = 1;
				temp_year++;
			}
			if(temp_year == end_year && temp_month == end_month)
			{
				break;
			}
		}
		//创建并处理
		JSONObject new_json_obj = new JSONObject();
		new_json_obj.accumulate("traffic", the_traffic);
		new_json_obj.accumulate("store_amount", the_store_amount);
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
