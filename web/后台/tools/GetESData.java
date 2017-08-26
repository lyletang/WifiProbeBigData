/**
 * 
 * 该类提供获取ElasticSearch数据的方法
 * @author Victors
 * 
 */
package com.victors.tools;

import org.elasticsearch.action.search.SearchResponse;    
import org.elasticsearch.client.transport.TransportClient;  
import org.elasticsearch.common.settings.Settings;  
import org.elasticsearch.common.transport.InetSocketTransportAddress;  
import org.elasticsearch.common.transport.TransportAddress;
import org.elasticsearch.search.SearchHit;  
import org.elasticsearch.search.SearchHits;
import java.net.InetAddress;

public class GetESData {
    /**
     * 
     * 该方法用于查询ElasticSearch中的数据,只获取第一条数据
     * @author Victors
     * @return String
     * 
     */
	public static String select_data(String host, int port, String[] index, String[] type)
	{
		String data = "";
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
		try
		{
		    SearchResponse searchResponse = (SearchResponse)transportClient.prepareSearch(index).setTypes(type).execute().actionGet();//index指定索引库，type指定类型
		    //获取返回结果，包含数据总数和详细内容
		    SearchHits hits = searchResponse.getHits();
		    //获取具体的详细内容
		    SearchHit[] hits2 = hits.getHits();
		    data = hits2[0].getSourceAsString();
		}catch(Exception e)
		{
			transportClient.close();
			data = "";
			return data;
		}
		transportClient.close();
		return data;
	}
	/**
	 * 
	 * 该方法用于指定TransportClient对象，提供索引和类型进行ES数据查询
	 * @author Victors
	 * @param transportClient
	 * @param index
	 * @param type
	 * @return String data
	 */
	
	public static String selectData(TransportClient transportClient, String[] index, String[] type)
	{
		String data = "";
		try
		{
			SearchResponse searchResponse = (SearchResponse)transportClient.prepareSearch(index).setTypes(type).execute().actionGet();//index指定索引库，type指定类型
			//获取返回结果，包含数据总数和详细内容
		    SearchHits hits = searchResponse.getHits();
		    //获取具体的详细内容
		    SearchHit[] hits2 = hits.getHits();
		    data = hits2[0].getSourceAsString();
		}catch(Exception e)
		{
			data = "";
			return data;
		}
		return data;
	}
}
