$(document).ready(function(){
	var new_and_old_customers_week_time;//新老顾客按周计计时间轴
	var the_new_customers_week_data;//新顾客按周计
	var the_old_customers_week_data;//老顾客按周计
    function chart_new_and_old_customers_week(){
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
                  var new_and_old_customers_week = ec.init(document.getElementById('new_and_old_customers_week_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      tooltip : {
        				trigger: 'axis'
    					},
    					legend: {
        					data:['新顾客','老顾客']
    					},
    					calculable : true,
    					xAxis : [
        				{
            				type : 'category',
            				data : new_and_old_customers_week_time
        				}
    					],
    					yAxis : [
        				{
            				type : 'value',
            				axisLabel: {
                      			formatter: '{value} 人'
            	  	  		}
        				}
    					],
    					series : [
        				{
            				name:'新顾客',
            				type:'bar',
            				data:the_new_customers_week_data,
            				markPoint : {
                				data : [
                    			{type : 'max', name: '最大值'},
                    			{type : 'min', name: '最小值'}
                				]
            				},
            				markLine : {
                				data : [
                    			{type : 'average', name: '平均值'}
                				]
            				}
        				},
        				{
            				name:'老顾客',
            				type:'bar',
            				data:the_old_customers_week_data,
            				markPoint : {
                				data : [
                    				{type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                				]
            				},
            				markLine : {
                				data : [
                    			{type : 'average', name : '平均值'}
                				]
            				}
        				}
    					]
                  };
              new_and_old_customers_week.setOption(option);
			  window.addEventListener("resize",function(){
                                      new_and_old_customers_week.resize();
              });
              }
              );
          }
          function request_new_and_old_customers_week()
          {
            var my_url = "/softbei_wifi/NewAndOldCustomersWeek";
            $.ajax({
              type: "GET",
              url: my_url,
              success: new_and_old_customers_week_callback
            });
          }
          function new_and_old_customers_week_callback(data){
            var obj = JSON.parse(data);
            the_new_customers_week_data = obj["new_customers"];
            the_old_customers_week_data = obj["old_customers"];
            new_and_old_customers_week_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            chart_new_and_old_customers_week();
          }
          request_new_and_old_customers_week();//请求新老顾客按周计数据
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
    var my_url = "/softbei_wifi/SelectNewAndOldCustomersWeek";
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
       success: select_new_and_old_customers_week_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_new_customers_week_data;
var the_old_customers_week_data;
var new_and_old_customers_week_time;
function select_new_and_old_customers_week_callback(data)
{
            var obj = JSON.parse(data);
            the_new_customers_week_data = obj["new_customers"];
            the_old_customers_week_data = obj["old_customers"];
            new_and_old_customers_week_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            select_chart_new_and_old_customers_week();
}

function select_chart_new_and_old_customers_week()
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
                  var new_and_old_customers_week = ec.init(document.getElementById('new_and_old_customers_week_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      tooltip : {
        				trigger: 'axis'
    					},
    					legend: {
        					data:['新顾客','老顾客']
    					},
    					calculable : true,
    					xAxis : [
        				{
            				type : 'category',
            				data : new_and_old_customers_week_time
        				}
    					],
    					yAxis : [
        				{
            				type : 'value',
            				axisLabel: {
                      			formatter: '{value} 人'
            	  	  		}
        				}
    					],
    					series : [
        				{
            				name:'新顾客',
            				type:'bar',
            				data:the_new_customers_week_data,
            				markPoint : {
                				data : [
                    			{type : 'max', name: '最大值'},
                    			{type : 'min', name: '最小值'}
                				]
            				},
            				markLine : {
                				data : [
                    			{type : 'average', name: '平均值'}
                				]
            				}
        				},
        				{
            				name:'老顾客',
            				type:'bar',
            				data:the_old_customers_week_data,
            				markPoint : {
                				data : [
                    				{type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                				]
            				},
            				markLine : {
                				data : [
                    			{type : 'average', name : '平均值'}
                				]
            				}
        				}
    					]
                  };
              new_and_old_customers_week.setOption(option);
			  window.addEventListener("resize",function(){
                                      new_and_old_customers_week.resize();
              });
              }
              );
}