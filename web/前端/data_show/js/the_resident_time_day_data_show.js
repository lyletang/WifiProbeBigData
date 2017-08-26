$(document).ready(function(){
	var the_resident_time_day_data;//驻店时长按日计
	var resident_time_day_time;//驻店时长按日计时间轴
    function chart_resident_time_day(){
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
                  var resident_time_day = ec.init(document.getElementById('the_resident_time_day_data_show'));
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
                          data:['驻店时长']
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : resident_time_day_time,
                              axisLabel:{
                                  show:true,
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value}分',
                              }
                          }
                      ],
                      series : [
                          {
                              name:'驻店时长',
                              type:'line',
                              data:the_resident_time_day_data,
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
              resident_time_day.setOption(option);
			  window.addEventListener("resize",function(){
                                      resident_time_day.resize();
              });
              }
              );
          }
          function request_resident_time_day()
          {
            var my_url = "/softbei_wifi/TheResidentTimeDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: resident_time_day_callback
            });
          }
          function resident_time_day_callback(data){
            var obj = JSON.parse(data);
            the_resident_time_day_data = obj["resident_time"];
            resident_time_day_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            chart_resident_time_day();
          }         
          request_resident_time_day();//请求驻店时长数据按日计
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
     var my_url = "/softbei_wifi/SelectTheResidentTimeDay";
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
       success: select_resident_time_day_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_resident_time_day_data;
var resident_time_day_time;
function select_resident_time_day_callback(data)
{
            var obj = JSON.parse(data);
            the_resident_time_day_data = obj["resident_time"];
            resident_time_day_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            select_chart_resident_time_day();
}

function select_chart_resident_time_day()
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
                  var resident_time_day = ec.init(document.getElementById('the_resident_time_day_data_show'));
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
                          data:['驻店时长']
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : resident_time_day_time,
                              axisLabel:{
                                  show:true,
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value}分',
                              }
                          }
                      ],
                      series : [
                          {
                              name:'驻店时长',
                              type:'line',
                              data:the_resident_time_day_data,
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
              resident_time_day.setOption(option);
			  window.addEventListener("resize",function(){
                                      resident_time_day.resize();
              });
              }
              );
}
