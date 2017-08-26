$(document).ready(function(){
	var the_bounce_rate_month_data;//跳出率按月计
	var the_deep_rate_month_data;//深访率按月计
	var bounce_rate_and_deep_rate_month_time;//跳出率/深访率按月计时间轴
    function chart_bounce_rate_and_deep_rate_month(){
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
                  var bounce_rate_and_deep_rate_month = ec.init(document.getElementById('bounce_rate_and_deep_rate_month_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      legend: {
        				data:['跳出率','深访率'],
    				  },
    				  xAxis : [
        			  {
            			type : 'category',
            			boundaryGap : false,
            			axisLine: {onZero: false},
            			data : bounce_rate_and_deep_rate_month_time
        			  }
    				  ],
    				  yAxis : [
        			  {
            			name : '跳出率/深访率',
            			type : 'value',
            			min:0,
            			max:1
        			  }
    				  ],
    				  series : [
        			  {
            			name:'跳出率',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_bounce_rate_month_data
        			  },
        			  {
            			name:'深访率',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_deep_rate_month_data
        			  }
    				  ]
                  };
              bounce_rate_and_deep_rate_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      bounce_rate_and_deep_rate_month.resize();
              });
              }
              );
          }
          function request_bounce_rate_and_deep_rate_month()
          {
            var my_url = "/softbei_wifi/BounceRateAndDeepRateMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: bounce_rate_and_deep_rate_month_callback
            });
          }
          function bounce_rate_and_deep_rate_month_callback(data){
            var obj = JSON.parse(data);
            the_bounce_rate_month_data = obj["bounce_rate"];
            the_deep_rate_month_data = obj["deep_rate"];
            bounce_rate_and_deep_rate_month_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            chart_bounce_rate_and_deep_rate_month();
          }
          request_bounce_rate_and_deep_rate_month();//请求跳出率/深访率按月计数据
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
			    //alert("正确！");
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
     var my_url = "/softbei_wifi/SelectBounceRateAndDeepRateMonth";
     var request_time = new Object();
     request_time.start_year = start_year;

     request_time.start_month = start_month;
     request_time.end_year = end_year;
     request_time.end_month = end_month;
     
     $.ajax({
       type: "GET",
       url: my_url,
       data: request_time,
       success: select_bounce_rate_and_deep_rate_month_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_bounce_rate_month_data;
var the_deep_rate_month_data;
var bounce_rate_and_deep_rate_month_time;
function select_bounce_rate_and_deep_rate_month_callback(data)
{
            var obj = JSON.parse(data);
            the_bounce_rate_month_data = obj["bounce_rate"];
            the_deep_rate_month_data = obj["deep_rate"];
            bounce_rate_and_deep_rate_month_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            select_chart_bounce_rate_and_deep_rate_month();
}

function select_chart_bounce_rate_and_deep_rate_month()
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
                  var bounce_rate_and_deep_rate_month = ec.init(document.getElementById('bounce_rate_and_deep_rate_month_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      legend: {
        				data:['跳出率','深访率'],
    				  },
    				  xAxis : [
        			  {
            			type : 'category',
            			boundaryGap : false,
            			axisLine: {onZero: false},
            			data : bounce_rate_and_deep_rate_month_time
        			  }
    				  ],
    				  yAxis : [
        			  {
            			name : '跳出率/深访率',
            			type : 'value',
            			min:0,
            			max:1
        			  }
    				  ],
    				  series : [
        			  {
            			name:'跳出率',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_bounce_rate_month_data
        			  },
        			  {
            			name:'深访率',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_deep_rate_month_data
        			  }
    				  ]
                  };
              bounce_rate_and_deep_rate_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      bounce_rate_and_deep_rate_month.resize();
              });
              }
              );
}