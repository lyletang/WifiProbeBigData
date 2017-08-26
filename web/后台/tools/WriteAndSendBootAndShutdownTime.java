/**
 * 
 * 该类实现将开关机时间写入文件，发送文件
 * @author Victors
 * 
 */
package com.victors.tools;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Properties;


import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
public class WriteAndSendBootAndShutdownTime {
    /**
     * 
     * 该方法用于将字符串写入文件
     * @param path String 文件所在目录
     * @param filename String 文件名
     * @param jsondata String 要写入的字符串
     * @return Boolean
     * 
     */
	public static Boolean WriteBootAndShutdownTime(String path, String filename, String jsondata)
    {
    	File filePath = new File(path);
    	if(!filePath.exists())
    	{
    		filePath.mkdir();
    	}
    	String stringFile = path + File.separator + filename;
    	File file = new File(stringFile);
    	try{
    	    FileOutputStream out = new FileOutputStream(file);
    	    byte buy[] = jsondata.getBytes();
    	    out.write(buy);
    	    out.close();
    	    return true;
    	}catch(Exception e)
    	{
    		return false;
    	}
    }
	/**
	 * 该方法获得sftp连接
	 * @param host
	 * @param port
	 * @param user
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static Session connect(String host, Integer port, String user, String password) throws Exception
	{
		Session session = null;
		try
		{
			JSch jsch = new JSch();
			if(port != null)
			{
				session = jsch.getSession(user, host, port.intValue());
			}
			else
			{
				session = jsch.getSession(user, host);
			}
			session.setPassword(password);
			Properties config = new Properties();
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);
			session.setTimeout(30000);
			session.connect();
			return session;
		}catch(Exception e)
		{
			e.printStackTrace();
			throw e;
		}
	}
	
	/**
	 * 
	 * 该方法将文件传入到指定节点
	 * @param directory
	 * @param uploadFile
	 * @param sftp
	 * @return
	 * @throws Exception
	 */
	public static Boolean upload(String directory, String uploadFile, ChannelSftp sftp) throws Exception
	{
		File file = new File(uploadFile);
		if(file.exists())
		{
			try
			{
				java.util.Vector content = sftp.ls(directory);
				if(content == null)
				{
					sftp.mkdir(directory);
				}
			}catch(SftpException e)
			{
				sftp.mkdir(directory);
			}
			//进入目标路径
			sftp.cd(directory);
			if(file.isFile())
			{
				InputStream ins = new FileInputStream(file);
				//中文名称的
				sftp.put(ins, new String(file.getName().getBytes(),"UTF-8"));
			}
			return true;
		}
		else
		{
			return false;
		}
	}
}
