/**
 * 
 * 该servlet实现开关机重启的信号接收
 * @author Victors
 * 
 */
package com.victors.setup;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.victors.tools.*;
public class BootRebootShutdown extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String host = "192.168.1.205";//主机地址
		int port = 12346;//端口号
		String signal = request.getParameter("signal");//接收信号
		String callback_signal = Client.sendMessage(host, port, signal);//发送信号
		out.println(callback_signal);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}

}
