$(document).ready(function(){
	var the_into_the_store_rate_month_data;//入店率按月计
	var into_the_store_rate_month_time;//入店率按月记时间轴
    function chart_into_the_store_rate_month(){
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
                  var into_the_store_rate_month = ec.init(document.getElementById('into_the_store_rate_month_data_show'));
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
                              data : into_the_store_rate_month_time,
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
                              data:the_into_the_store_rate_month_data,
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
              into_the_store_rate_month.setOption(option);
			  window.onresize = into_the_store_rate_month.resize;
              }
              );
          }
          function request_into_the_store_rate_month()
          {
            var my_url = "/softbei_wifi/IntoTheStoreRateMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: into_the_store_rate_month_callback
            });
          }
          function into_the_store_rate_month_callback(data){
            var obj = JSON.parse(data);
            the_into_the_store_rate_month_data = obj["into_the_store_rate"];
            into_the_store_rate_month_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            chart_into_the_store_rate_month();
          }
          
          request_into_the_store_rate_month();//请求入店率按月计数据
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
     var my_url = "/softbei_wifi/SelectIntoTheStoreRateMonth";
     var request_time = new Object();
     request_time.start_year = start_year;

     request_time.start_month = start_month;
     request_time.end_year = end_year;
     request_time.end_month = end_month;
     
     $.ajax({
       type: "GET",
       url: my_url,
       data: request_time,
       success: select_into_the_store_rate_month_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_into_the_store_rate_month_data;
var into_the_store_rate_month_time;
function select_into_the_store_rate_month_callback(data)
{
            var obj = JSON.parse(data);
            the_into_the_store_rate_month_data = obj["into_the_store_rate"];
            into_the_store_rate_month_time = obj["time"];
            var start_time = obj["show_start_time"];
            var end_time = obj["show_end_time"];
            document.getElementById("start_date").value = start_time;
	        document.getElementById("end_date").value = end_time;
            select_chart_into_the_store_rate_month();
}

function select_chart_into_the_store_rate_month()
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
                  var into_the_store_rate_month = ec.init(document.getElementById('into_the_store_rate_month_data_show'));
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
                              data : into_the_store_rate_month_time,
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
                              data:the_into_the_store_rate_month_data,
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
              into_the_store_rate_month.setOption(option);
			  window.onresize = into_the_store_rate_month.resize;
              }
              );
}