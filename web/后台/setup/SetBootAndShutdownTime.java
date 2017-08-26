/**
 * 
 * 该Servlet实现设置自动开关机时间
 * @author Victors
 * 
 */
package com.victors.setup;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.Session;
import com.victors.tools.WriteAndSendBootAndShutdownTime;

public class SetBootAndShutdownTime extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String boot_time = request.getParameter("boot");
		String shutdown_time = request.getParameter("shutdown");
		JSONObject dataJson = new JSONObject();
		dataJson.accumulate("boot", boot_time);
		dataJson.accumulate("shutdown", shutdown_time);
		String s_data = dataJson.toString();
		String filepath = getServletContext().getRealPath("./") + File.separator + "Automatic";
		String filename = "automatic.json";
		Boolean file_is_ok = WriteAndSendBootAndShutdownTime.WriteBootAndShutdownTime(filepath, filename, s_data);
		if(!file_is_ok)
		{
			out.println("false");
			return;
		}
		ChannelSftp sftp = null;
		Session session = null;
		String host = "192.168.1.205";//发送的IP
		Integer port = null;//默认端口
		String username = "pi";//用户名
		String password = "raspberry";//密码
		String directory = "Automatic";//传送的目录
		String uploadFile = getServletContext().getRealPath("./") + File.separator + "Automatic" + File.separator + "automatic.json";
		try
		{
			session = WriteAndSendBootAndShutdownTime.connect(host, port, username, password);
			com.jcraft.jsch.Channel channel = session.openChannel("sftp");
			channel.connect();
			sftp = (ChannelSftp)channel;
			Boolean upload_is_ok = WriteAndSendBootAndShutdownTime.upload(directory, uploadFile, sftp);
			if(!upload_is_ok)
			{
				out.println("false");
				if(sftp != null)
				{
					sftp.disconnect();
				}
				if(session != null)
				{
					session.disconnect();
				}
				return;
			}
			out.println("ok");
		}catch(Exception e)
		{
			out.println("false");
		}finally
		{
			if(sftp != null)
			{
				sftp.disconnect();
			}
			if(session != null)
			{
				session.disconnect();
			}
		}
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
