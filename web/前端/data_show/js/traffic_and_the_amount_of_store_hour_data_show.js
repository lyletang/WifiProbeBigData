$(document).ready(function(){
	var the_traffic_hour_data;//客流量按小时计
	var the_store_amount_hour_data;//入店量按小时计
	var traffic_and_the_amount_of_store_hour_time;//客流量/入店量按小时记时间轴
    function chart_traffic_and_the_amount_of_store_hour(){
              require.config({
                  paths:{
                  echarts:'http://echarts.baidu.com/build/dist'
                  }
              });
              require(
              [
                  'echarts',
                  'echarts/chart/line',
                  'echarts/chart/bar'
              ],
              function (ec){
                  var traffic_and_the_amount_of_store_hour = ec.init(document.getElementById('traffic_and_the_amount_of_store_hour_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      legend: {
        				data:['客流量','入店量'],
    				  },
    				  xAxis : [
        			  {
            			type : 'category',
            			boundaryGap : false,
            			axisLine: {onZero: false},
            			data : traffic_and_the_amount_of_store_hour_time
        			  }
    				  ],
    				  yAxis : [
        			  {
            			name : '客流量/入店量',
            			type : 'value',
            			axisLabel : {
                              formatter: '{value} 人'
                        }
        			  }
    				  ],
    				  series : [
        			  {
            			name:'客流量',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_traffic_hour_data
        			  },
        			  {
            			name:'入店量',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_store_amount_hour_data
        			  }
    				  ]
                  };
              traffic_and_the_amount_of_store_hour.setOption(option);
			  window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_hour.resize();
              });
              }
              );
          }
		  function request_traffic_and_the_amount_of_store_hour()
          {
            var my_url = "/softbei_wifi/TrafficAndTheAmountOfStoreHour";
            $.ajax({
              type: "GET",
              url: my_url,
              success: traffic_and_the_amount_of_store_hour_callback
            });
          }
          function traffic_and_the_amount_of_store_hour_callback(data){
            var obj = JSON.parse(data);
            the_traffic_hour_data = obj["traffic"];
            the_store_amount_hour_data = obj["store_amount"];
            traffic_and_the_amount_of_store_hour_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time; 
            chart_traffic_and_the_amount_of_store_hour();
          }
          request_traffic_and_the_amount_of_store_hour();//请求客流量/入店量按小时计数据
		  //chart_traffic_and_the_amount_of_store_hour();
});

function select_data()
{
    var start_date = document.getElementById("start_date").value;
	var end_date = document.getElementById("end_date").value;
	var start_strs = new Array();
	var end_strs = new Array();
	var start_day_and_hour = new Array();
	var end_day_and_hour = new Array();
	start_strs = start_date.split("-");
	end_strs = end_date.split("-");
	var start_year = parseInt(start_strs[0]);
	var start_month = parseInt(start_strs[1]);
	var start_day_and_hour = start_strs[2].split(" ");
	var start_day = parseInt(start_day_and_hour[0]);
	var start_hour = parseInt(start_day_and_hour[1]);
	var end_year = parseInt(end_strs[0]);
	var end_month = parseInt(end_strs[1]);
	end_day_and_hour = end_strs[2].split(" ");
	var end_day = parseInt(end_day_and_hour[0]);
	var end_hour = parseInt(end_day_and_hour[1]);
	if(start_year > end_year)
	{
	    alert("抱歉，开始时间不能大于结束时间！");
	}
	else
	{
	    if(start_year == end_year)
		{
		    if(start_month > end_month)
			{
			    alert("抱歉，开始时间不能大于结束时间！");
			}
			else
			{
			    if(start_month == end_month)
				{
				    if(start_day > end_day)
					{
					    alert("抱歉，开始时间不能大于结束时间！");
					}
					else
					{
					    if(start_day == end_day)
						{
						    if(start_hour > end_hour)
							{
							    alert("抱歉，开始时间不能大于结束时间！");
							}
							else
							{
								//alert("正常！");
								request_data(start_year, start_month, start_day, start_hour, end_year, end_month, end_day, end_hour);
							}
						}
						else
						{
							//alert("正常！");
							request_data(start_year, start_month, start_day, start_hour, end_year, end_month, end_day, end_hour);
							/*
						    if((end_day - start_day) > 1)
							{
							    alert("抱歉，时间间隔过大！");
							}
							else
							{
							    alert("正常！");
							}*/
						}
					}
				}
				else
				{
					//alert("正常");
					request_data(start_year, start_month, start_day, start_hour, end_year, end_month, end_day, end_hour);
					/*
				    if((end_month - start_month) > 1)
					{
					    alert("抱歉，时间间隔过大！");
					}
					else
					{
					    if(end_day != 1)
						{
						    alert("抱歉，时间间隔过大！");
						}
						else
						{
						    var temp_day = getDay(start_year);
							if(temp_day != start_)
						}
					}*/
				}
			}
		}
		else
		{
		    //alert("正常");
		    request_data(start_year, start_month, start_day, start_hour, end_year, end_month, end_day, end_hour);
		}
	}
}

function request_data(start_year, start_month, start_day, start_hour, end_year, end_month, end_day, end_hour)
{
     var my_url = "/softbei_wifi/SelectTrafficAndTheAmountOfStoreHour";
     var request_time = new Object();
     request_time.start_year = start_year;

     request_time.start_month = start_month;
     request_time.start_day = start_day;
     request_time.start_hour = start_hour;
     request_time.end_year = end_year;
     request_time.end_month = end_month;
     request_time.end_day = end_day;
     request_time.end_hour = end_hour;
     
     $.ajax({
       type: "GET",
       url: my_url,
       data: request_time,
       success: select_traffic_and_the_amount_of_store_hour_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}
var the_traffic_hour_data;
var the_store_amount_hour_data;
var traffic_and_the_amount_of_store_hour_time;

function select_traffic_and_the_amount_of_store_hour_callback(data)
{
            var obj = JSON.parse(data);
            the_traffic_hour_data = obj["traffic"];
            the_store_amount_hour_data = obj["store_amount"];
            traffic_and_the_amount_of_store_hour_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time; 
            select_chart_traffic_and_the_amount_of_store_hour();
}

function select_chart_traffic_and_the_amount_of_store_hour()
{
              require.config({
                  paths:{
                  echarts:'http://echarts.baidu.com/build/dist'
                  }
              });
              require(
              [
                  'echarts',
                  'echarts/chart/line',
                  'echarts/chart/bar'
              ],
              function (ec){
                  var traffic_and_the_amount_of_store_hour = ec.init(document.getElementById('traffic_and_the_amount_of_store_hour_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      legend: {
        				data:['客流量','入店量'],
    				  },
    				  xAxis : [
        			  {
            			type : 'category',
            			boundaryGap : false,
            			axisLine: {onZero: false},
            			data : traffic_and_the_amount_of_store_hour_time
        			  }
    				  ],
    				  yAxis : [
        			  {
            			name : '客流量/入店量',
            			type : 'value',
            			axisLabel : {
                              formatter: '{value} 人'
                        }
        			  }
    				  ],
    				  series : [
        			  {
            			name:'客流量',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_traffic_hour_data
        			  },
        			  {
            			name:'入店量',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_store_amount_hour_data
        			  }
    				  ]
                  };
              traffic_and_the_amount_of_store_hour.setOption(option);
			  window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_hour.resize();
              });
              }
              );
}