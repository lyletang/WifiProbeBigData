package com.victors.main;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.transport.TransportAddress;

public class SteeringDataDisplay extends HttpServlet {
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
		
		ServletContext servletContext = this.getServletContext();
		TransportClient transportClient = (TransportClient)servletContext.getAttribute("transportClient");
		transportClient.close();
	}
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=utf-8");
		PrintWriter out = response.getWriter();
		String page = request.getParameter("page");
		if(page.equals("datashow"))
		{
		    response.sendRedirect("/softbei_wifi/data_show/whole_data_show/hour_data_show.html");
		    return;
		}
		else
		{
			if(page.equals("map"))
			{
				response.sendRedirect("/softbei_wifi/map/index.html");
				return;
			}
			else
			{
				response.sendRedirect("/softbei_wifi/data_show/whole_data_show/hour_data_show.html");
				return;
			}
		}
	}
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doGet(request, response);
	}
	public void init() throws ServletException {
		// Put your code here
		String host = "192.168.1.104";//ElasticSearch的IP
		int port = 9300;//端口号
		ServletContext servletContext = this.getServletContext();
		Settings settings = Settings.settingsBuilder().put("cluster.name", "WIFI").put("client.transport.sniff", true).build();//修改了节点名称，显式定义cluster.name，将client.transport.sniff设置为true表示开启集群的嗅探功能，开启之后，在代码中只需要设置集群中的一部分节点信息即可，es会自动把集群中的其他节点的信息加载进来。
		TransportClient transportClient = TransportClient.builder().settings(settings).build();
		InetAddress inet_host = null;
		try{
			inet_host = InetAddress.getByName(host);
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		TransportAddress transportAddress = new InetSocketTransportAddress(inet_host, port);
		transportClient.addTransportAddress(transportAddress);
		servletContext.setAttribute("transportClient", transportClient);
	}

}
