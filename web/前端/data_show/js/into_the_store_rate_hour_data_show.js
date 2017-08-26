$(document).ready(function(){
	var the_into_the_store_rate_hour_data;//入店率按小时计
	var into_the_store_rate_hour_time;//入店率按小时记时间轴
    function chart_into_the_store_rate_hour(){
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
                  var into_the_store_rate_hour = ec.init(document.getElementById('into_the_store_rate_hour_data_show'));
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
                          data:['入店率']
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : into_the_store_rate_hour_time,
                              axisLabel:{
                                  show:true
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value} '
                              }
                          }
                      ],
                      series : [
                          {
                              name:'入店率',
                              type:'line',
                              data:the_into_the_store_rate_hour_data,
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
                              },
                          },
                          
                      ]
                  };
              into_the_store_rate_hour.setOption(option);
			  window.onresize = into_the_store_rate_hour.resize;
              }
              );
          }
          function request_into_the_store_rate_hour()
          {
            var my_url = "/softbei_wifi/IntoTheStoreRateHour";
            $.ajax({
              type: "GET",
              url: my_url,
              success: into_the_store_rate_hour_callback
            });
          }
          function into_the_store_rate_hour_callback(data){
            var obj = JSON.parse(data);
            the_into_the_store_rate_hour_data = obj["into_the_store_rate"];
            into_the_store_rate_hour_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time; 
            chart_into_the_store_rate_hour();
          }
          
          request_into_the_store_rate_hour();//请求入店率按小时计数据
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
     var my_url = "/softbei_wifi/SelectIntoTheStoreRateHour";
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
       success: select_into_the_store_rate_hour_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}
var the_into_the_store_rate_hour_data;
var into_the_store_rate_hour_time;
function select_into_the_store_rate_hour_callback(data)
{
            var obj = JSON.parse(data);
            the_into_the_store_rate_hour_data = obj["into_the_store_rate"];
            into_the_store_rate_hour_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time; 
            select_chart_into_the_store_rate_hour();
}

function select_chart_into_the_store_rate_hour()
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
                  var into_the_store_rate_hour = ec.init(document.getElementById('into_the_store_rate_hour_data_show'));
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
                          data:['入店率']
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : into_the_store_rate_hour_time,
                              axisLabel:{
                                  show:true
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value} '
                              }
                          }
                      ],
                      series : [
                          {
                              name:'入店率',
                              type:'line',
                              data:the_into_the_store_rate_hour_data,
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
                              },
                          },
                          
                      ]
                  };
              into_the_store_rate_hour.setOption(option);
			  window.onresize = into_the_store_rate_hour.resize;
              }
              );
}

