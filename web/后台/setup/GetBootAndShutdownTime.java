/**
 * 
 * 该servlet实现对开关机时间获取
 * @author Victors
 * 
 */
package com.victors.setup;

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

public class GetBootAndShutdownTime extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String filename = "automatic.json";//json文件名
		String path;//文件路径
		path = getServletContext().getRealPath("./")+File.separator+"Automatic"+File.separator+filename;
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
					String s_dataJson = dataJson.toString();
					out.println(s_dataJson);
				}catch(Exception e)
				{
					e.printStackTrace();
				}
			}
			br.close();
		}
		else
		{
			String boot_time = null;
			String shutdown_time = null;
			JSONObject dataJson = new JSONObject();
			dataJson.accumulate("boot", boot_time);
			dataJson.accumulate("shutdown", shutdown_time);
			String s_dataJson = dataJson.toString();
			out.println(s_dataJson);
		}
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
