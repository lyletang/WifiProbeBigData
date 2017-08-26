$(document).ready(function(){
	var new_and_old_customers_hour_time;//新老顾客按小时计时间轴
	var the_new_customers_hour_data;//新顾客按小时计
	var the_old_customers_hour_data;//老顾客按小时计
     function chart_new_and_old_customers_hour(){
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
                  var new_and_old_customers_hour = ec.init(document.getElementById('new_and_old_customers_hour_data_show'));
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
            				data : new_and_old_customers_hour_time
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
            				data:the_new_customers_hour_data,
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
            				data:the_old_customers_hour_data,
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
              new_and_old_customers_hour.setOption(option);
			  window.addEventListener("resize",function(){
                                      new_and_old_customers_hour.resize();
              });
              }
              );
          }
          function request_new_and_old_customers_hour()
          {
            var my_url = "/softbei_wifi/NewAndOldCustomersHour";
            $.ajax({
              type: "GET",
              url: my_url,
              success: new_and_old_customers_hour_callback
            });
          }
          function new_and_old_customers_hour_callback(data){
            var obj = JSON.parse(data);
            the_new_customers_hour_data = obj["new_customers"];
            the_old_customers_hour_data = obj["old_customers"];
            new_and_old_customers_hour_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time; 
            chart_new_and_old_customers_hour();
          }
          request_new_and_old_customers_hour();//请求新老顾客按小时计数据
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
     var my_url = "/softbei_wifi/SelectNewAndOldCustomersHour";
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
       success: select_new_and_old_customers_hour_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}
var the_new_customers_hour_data;
var the_old_customers_hour_data;
var new_and_old_customers_hour_time;
function select_new_and_old_customers_hour_callback(data)
{
            var obj = JSON.parse(data);
            the_new_customers_hour_data = obj["new_customers"];
            the_old_customers_hour_data = obj["old_customers"];
            new_and_old_customers_hour_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time; 
            select_chart_new_and_old_customers_hour();
}

function select_chart_new_and_old_customers_hour()
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
                  var new_and_old_customers_hour = ec.init(document.getElementById('new_and_old_customers_hour_data_show'));
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
            				data : new_and_old_customers_hour_time
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
            				data:the_new_customers_hour_data,
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
            				data:the_old_customers_hour_data,
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
              new_and_old_customers_hour.setOption(option);
			  window.addEventListener("resize",function(){
                                      new_and_old_customers_hour.resize();
              });
              }
              );
}