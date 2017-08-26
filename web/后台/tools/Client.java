/**
 * 
 * 该类实现Socket通信
 * @author Victors
 * 
 */
package com.victors.tools;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class Client {
	/**
	 * 该方法对指定主机指定端口的socket连接，并发送获得相应数据
	 * @param host 主机地址 String
	 * @param port 主机端口号 int
	 * @param message 发送的信息 String
	 * @return String
	 */
	public static String sendMessage(String host, int port, String message)
	{
		String info = "";
		try
		{
			//创建Socket对象
			Socket socket = new Socket(host, port);
			//根据输入输出流和服务器连接
			OutputStream outputStream = socket.getOutputStream();//获取一个输出流，向服务器发送信息
			PrintWriter printWriter = new PrintWriter(outputStream);//将输出流包装成打印流
			printWriter.print(message);
			printWriter.flush();
			socket.shutdownOutput();//关闭输出流
			
			InputStream inputStream = socket.getInputStream();//获取一个输入流，接收服务器的信息
			byte[] buf = new byte[1024];
			int len = inputStream.read(buf);
			info = new String(buf,0,len);
			//关闭相对应的资源
			inputStream.close();
			printWriter.close();
			outputStream.close();
			socket.close();
		}catch(UnknownHostException e)
		{
			e.printStackTrace();
		}catch(IOException e)
		{
			e.printStackTrace();
		}
		return info;
	}
}
