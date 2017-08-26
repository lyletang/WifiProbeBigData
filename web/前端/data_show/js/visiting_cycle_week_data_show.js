$(document).ready(function(){
	var the_visiting_cycle_week_data;//来访周期按周计
	var visiting_cycle_week_time;//来访周期按周计时间轴
    function chart_visiting_cycle_week(){
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
                  var visiting_cycle_week = ec.init(document.getElementById('visiting_cycle_week_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      legend: {
        				data:['来访周期'],
    				  },
    				  xAxis : [
        			  {
            			type : 'category',
            			boundaryGap : false,
            			axisLine: {onZero: false},
            			data : visiting_cycle_week_time
        			  }
    				  ],
    				  yAxis : [
        			  {
            			name : '来访周期',
            			type : 'value',
        			  }
    				  ],
    				  series : [
        			  {
            			name:'来访周期',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_visiting_cycle_week_data
        			  }
    				  ]
                  };
              visiting_cycle_week.setOption(option);
			  window.addEventListener("resize",function(){
                                      visiting_cycle_week.resize();
              });
              }
              );
          }
          function request_visiting_cycle_week()
          {
            var my_url = "/softbei_wifi/VisitingCycleWeek";
            $.ajax({
              type: "GET",
              url: my_url,
              success: visiting_cycle_week_callback
            });
          }
          function visiting_cycle_week_callback(data){
            var obj = JSON.parse(data);
            the_visiting_cycle_week_data = obj["visiting_cycle"];
            visiting_cycle_week_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            chart_visiting_cycle_week();
          }         
          request_visiting_cycle_week();//请求来访周期数据
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
	var start_day = parseInt(start_strs[2]);
	//var start_day_and_hour = start_strs[2].split(" ");
	//var start_day = parseInt(start_day_and_hour[0]);
	//var start_hour = parseInt(start_day_and_hour[1]);
	var end_year = parseInt(end_strs[0]);
	var end_month = parseInt(end_strs[1]);
	//end_day_and_hour = end_strs[2].split(" ");
	var end_day = parseInt(end_strs[2]);
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
			    if(start_month == end_month)
				{
				    if(start_day > end_day)
					{
					    alert("抱歉，开始时间不能大于结束时间！");
					}
					else
					{
					    //alert("正常！");
					    request_data(start_year, start_month, start_day, end_year, end_month, end_day);
					}
				}
				else
				{
					//alert("正常");
					request_data(start_year, start_month, start_day, end_year, end_month, end_day);
				}
			}
		}
		else
		{
		    //alert("正常");
		    request_data(start_year, start_month, start_day, end_year, end_month, end_day);
		}
	}
}
function request_data(start_year, start_month, start_day, end_year, end_month, end_day)
{
    var my_url = "/softbei_wifi/SelectVisitingCycleWeek";
     var request_time = new Object();
     request_time.start_year = start_year;

     request_time.start_month = start_month;
     request_time.start_day = start_day;
     request_time.end_year = end_year;
     request_time.end_month = end_month;
     request_time.end_day = end_day;
     
     $.ajax({
       type: "GET",
       url: my_url,
       data: request_time,
       success: select_visiting_cycle_week_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_visiting_cycle_week_data;
var visiting_cycle_week_time;
function select_visiting_cycle_week_callback(data)
{
            var obj = JSON.parse(data);
            the_visiting_cycle_week_data = obj["visiting_cycle"];
            visiting_cycle_week_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            select_chart_visiting_cycle_week();
}

function select_chart_visiting_cycle_week()
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
                  var visiting_cycle_week = ec.init(document.getElementById('visiting_cycle_week_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      legend: {
        				data:['来访周期'],
    				  },
    				  xAxis : [
        			  {
            			type : 'category',
            			boundaryGap : false,
            			axisLine: {onZero: false},
            			data : visiting_cycle_week_time
        			  }
    				  ],
    				  yAxis : [
        			  {
            			name : '来访周期',
            			type : 'value',
        			  }
    				  ],
    				  series : [
        			  {
            			name:'来访周期',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_visiting_cycle_week_data
        			  }
    				  ]
                  };
              visiting_cycle_week.setOption(option);
			  window.addEventListener("resize",function(){
                                      visiting_cycle_week.resize();
              });
              }
              );
}