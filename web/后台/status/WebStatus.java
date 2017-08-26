/**
 * 
 * 该servlet实现获取WEN集群状态
 * @author Victors
 * 
 */
package com.victors.status;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class WebStatus extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		//获得状态json文件路径
		String path = File.separator + "home" + File.separator + "pi" + File.separator + "Monitor" + File.separator + "status.json";
		try
		{
			File file = new File(path);
			if(file.exists())
			{
				BufferedReader br = new BufferedReader(new FileReader(path));//读取json文件
			    String s = null;
			    while((s = br.readLine()) != null)
			   {
				   try
				   {
					    JSONObject dataJson = new JSONObject(s);//创建一个包含json串的json对象
					    JSONObject statusJson = new JSONObject();
					    statusJson = dataJson.getJSONObject("web");//获取web集群状态
					    String s_obj = statusJson.toString();
					    out.println(s_obj);
				    }catch(Exception e)
				    {
					    e.printStackTrace();
				    }
			    }
			}
			else
			{
				Boolean master = false;
			    Boolean slave1 = false;
			    Boolean slave2 = false;
			    JSONObject dataJson = new JSONObject();
			    dataJson.accumulate("master", master);
			    dataJson.accumulate("slave1", slave1);
			    dataJson.accumulate("slave2", slave2);
			    String s_obj = dataJson.toString();
			    out.println(s_obj);
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
