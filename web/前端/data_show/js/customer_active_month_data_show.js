$(document).ready(function(){
	var the_high_activity_month_data;//高活跃度按月计
	var the_mid_activity_month_data;//中活跃度按月计
	var the_low_activity_month_data;//低活跃度按月计
	var the_sleep_activity_month_data;//沉睡活跃度按月计
    function chart_customer_active_month(){
              require.config({
                  paths:{
                  echarts:'http://echarts.baidu.com/build/dist'
                  }
              });
              require(
              
              [
                  'echarts',
                  'echarts/chart/line',
                  'echarts/chart/bar',
                  'echarts/chart/pie'
              ],
              function (ec){
                  var customer_active_month = ec.init(document.getElementById('customer_active_month_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      tooltip : {
                          trigger: 'item',
                          formatter: "{b} : {c}人({d}%)"
                      },
                      legend: {
                         // orient: 'vertical',
                          //left: 'left',
                          data: ['高活跃度','中活跃度','低活跃度','沉睡活跃度']
                      },
                      series : [
                          {
                              name:'顾客活跃度',
                              type:'pie',
                              radius : '80%', //55
                              //center: ['50%', '60%'],
                              data:[
                                  {value:the_high_activity_month_data, name:'高活跃度'},
                                  {value:the_mid_activity_month_data, name:'中活跃度'},
                                  {value:the_low_activity_month_data, name:'低活跃度'},
                                  {value:the_sleep_activity_month_data, name:'沉睡活跃度'}
                              ],
                              itemStyle:{
                                  emphasis:{
                                      shadowBlur: 10,
                                      shadowOffsetX: 0,
                                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                                  },
                                  normal:{
                                      label:{
                                          show:true,
                                          formatter:'{b} : {c}人({d}%)'
                                      },
                                      labelLine:{show:true}
                                  }
                              }
                          }
                      ]
                  };

              customer_active_month.setOption(option);
			  window.onresize = customer_active_month.resize;
              }
              );
          }
          function request_customer_active_month()
          {
            var my_url = "/softbei_wifi/CustomerActiveMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: request_customer_active_month_callback
            });
          }
          function request_customer_active_month_callback(data){
            var obj = JSON.parse(data);
            the_high_activity_month_data = obj["high_activity"];
            the_mid_activity_month_data = obj["mid_activity"];
            the_low_activity_month_data = obj["low_activity"];
            the_sleep_activity_month_data = obj["sleep_activity"];
            var start_time = obj["show_start_time"];
            document.getElementById("start_date").value = start_time;
            chart_customer_active_month();
          }
          request_customer_active_month();//请求顾客活跃度按月计
});

function select_data()
{
    var start_date = document.getElementById("start_date").value;
	//var end_date = document.getElementById("end_date").value;
	var start_strs = new Array();
	//var end_strs = new Array();
	var start_day_and_hour = new Array();
	//var end_day_and_hour = new Array();
	start_strs = start_date.split("-");
	//end_strs = end_date.split("-");
	var start_year = parseInt(start_strs[0]);
	var start_month = parseInt(start_strs[1]);
	//alert("正常！");
	request_data(start_year, start_month);
}

function request_data(start_year, start_month)
{
     var my_url = "/softbei_wifi/SelectCustomerActiveMonth";
     var request_time = new Object();
     request_time.start_year = start_year;

     request_time.start_month = start_month;
     
     $.ajax({
       type: "GET",
       url: my_url,
       data: request_time,
       success: select_request_customer_active_month_callback,
       error: function(data)
       {
           alert("失败！");
       }
     });
}

var the_high_activity_month_data;
var the_mid_activity_month_data;
var the_low_activity_month_data;
var the_sleep_activity_month_data;
function select_request_customer_active_month_callback(data)
{
            var obj = JSON.parse(data);
            the_high_activity_month_data = obj["high_activity"];
            the_mid_activity_month_data = obj["mid_activity"];
            the_low_activity_month_data = obj["low_activity"];
            the_sleep_activity_month_data = obj["sleep_activity"];
            var start_time = obj["show_start_time"];
            document.getElementById("start_date").value = start_time;
            select_chart_customer_active_month();
}

function select_chart_customer_active_month()
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
                  'echarts/chart/bar',
                  'echarts/chart/pie'
              ],
              function (ec){
                  var customer_active_month = ec.init(document.getElementById('customer_active_month_data_show'));
                  var option = {
                      //backgroundColor:"white",
                      title : {
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      tooltip : {
                          trigger: 'item',
                          formatter: "{b} : {c}人({d}%)"
                      },
                      legend: {
                         // orient: 'vertical',
                          //left: 'left',
                          data: ['高活跃度','中活跃度','低活跃度','沉睡活跃度']
                      },
                      series : [
                          {
                              name:'顾客活跃度',
                              type:'pie',
                              radius : '80%', //55
                              //center: ['50%', '60%'],
                              data:[
                                  {value:the_high_activity_month_data, name:'高活跃度'},
                                  {value:the_mid_activity_month_data, name:'中活跃度'},
                                  {value:the_low_activity_month_data, name:'低活跃度'},
                                  {value:the_sleep_activity_month_data, name:'沉睡活跃度'}
                              ],
                              itemStyle:{
                                  emphasis:{
                                      shadowBlur: 10,
                                      shadowOffsetX: 0,
                                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                                  },
                                  normal:{
                                      label:{
                                          show:true,
                                          formatter:'{b} : {c}人({d}%)'
                                      },
                                      labelLine:{show:true}
                                  }
                              }
                          }
                      ]
                  };

              customer_active_month.setOption(option);
			  window.onresize = customer_active_month.resize;
              }
              );
}