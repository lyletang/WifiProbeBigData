$(document).ready(function(){
	var the_traffic_month_data;//客流量按月计
	var the_store_amount_month_data;//入店量按月计
	var traffic_and_the_amount_of_store_month_time;//客流量/入店量按月计时间轴
    function chart_traffic_and_the_amount_of_store_month(){
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
                  var traffic_and_the_amount_of_store_month = ec.init(document.getElementById('traffic_and_the_amount_of_store_month_data_show'));
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
            			data : traffic_and_the_amount_of_store_month_time
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
            			data: the_traffic_month_data
        			  },
        			  {
            			name:'入店量',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_store_amount_month_data
        			  }
    				  ]
                  };
              traffic_and_the_amount_of_store_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_month.resize();
              });
              }
              );
          }
          function request_traffic_and_the_amount_of_store_month()
          {
            var my_url = "/softbei_wifi/TrafficAndTheAmountOfStoreMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: traffic_and_the_amount_of_store_month_callback
            });
          }
          function traffic_and_the_amount_of_store_month_callback(data){
            var obj = JSON.parse(data);
            the_traffic_month_data = obj["traffic"];
            the_store_amount_month_data = obj["store_amount"];
            traffic_and_the_amount_of_store_month_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            chart_traffic_and_the_amount_of_store_month();
          }
          request_traffic_and_the_amount_of_store_month();//请求客流量/入店量按月计数据
});

function select_data()
{
    var start_date = document.getElementById("start_date").value;
	var end_date = document.getElementById("end_date").value;
	var start_strs = new Array();
	var end_strs = new Array();
	//var start_day_and_hour = new Array();
	//var end_day_and_hour = new Array();
	start_strs = start_date.split("-");
	end_strs = end_date.split("-");
	var start_year = parseInt(start_strs[0]);
	var start_month = parseInt(start_strs[1]);
	//var start_day_and_hour = start_strs[2].split(" ");
	//var start_day = parseInt(start_day_and_hour[0]);
	//var start_hour = parseInt(start_day_and_hour[1]);
	var end_year = parseInt(end_strs[0]);
	var end_month = parseInt(end_strs[1]);
	//end_day_and_hour = end_strs[2].split(" ");
	//var end_day = parseInt(end_day_and_hour[0]);
	//var end_hour = parseInt(end_day_and_hour[1]);
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
			    //alert("正常！");
			    request_data(start_year, start_month, end_year, end_month);
			}
		}
		else
		{
		    //alert("正常");
		    request_data(start_year, start_month, end_year, end_month);
		}
	}
}

function request_data(start_year, start_month, end_year, end_month)
{
     var my_url = "/softbei_wifi/SelectTrafficAndTheAmountOfStoreMonth";
     var request_time = new Object();
     request_time.start_year = start_year;

     request_time.start_month = start_month;
     request_time.end_year = end_year;
     request_time.end_month = end_month;
     
     $.ajax({
       type: "GET",
       url: my_url,
       data: request_time,
       success: select_traffic_and_the_amount_of_store_month_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_traffic_month_data;
var the_store_amount_month_data;
var traffic_and_the_amount_of_store_month_time;
function select_traffic_and_the_amount_of_store_month_callback(data)
{
            var obj = JSON.parse(data);
            the_traffic_month_data = obj["traffic"];
            the_store_amount_month_data = obj["store_amount"];
            traffic_and_the_amount_of_store_month_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            select_chart_traffic_and_the_amount_of_store_month();
}

function  select_chart_traffic_and_the_amount_of_store_month()
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
                  var traffic_and_the_amount_of_store_month = ec.init(document.getElementById('traffic_and_the_amount_of_store_month_data_show'));
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
            			data : traffic_and_the_amount_of_store_month_time
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
            			data: the_traffic_month_data
        			  },
        			  {
            			name:'入店量',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_store_amount_month_data
        			  }
    				  ]
                  };
              traffic_and_the_amount_of_store_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_month.resize();
              });
              }
              );
}