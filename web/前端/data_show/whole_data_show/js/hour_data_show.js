$(document).ready(function(){
	var the_traffic_hour_data;//客流量按小时计
	var the_store_amount_hour_data;//入店量按小时计
	var traffic_and_the_amount_of_store_hour_time;//客流量/入店量按小时记时间轴
	/*
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
					  backgroundColor:"white",
                      title : {
                          //text: '客流量/入店量',
                          //subtext: '按小时计算',
                          textStyle:{
                              fontWeight:'normal',
                              color:'blue'
                          }
                      },
                      tooltip : {
                          trigger: 'axis'
                      },
                      legend: {
                          data:['客流量','入店量']
                      },
                      toolbox: {
                          show : false,
                          feature : {
                              mark : {show: true},
                              dataView : {show: true, readOnly: false},
                              magicType : {show: true, type: ['line', 'bar']},
                              restore : {show: true},
                              saveAsImage : {show: true}
                          }
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : traffic_and_the_amount_of_store_hour_time,
							  //data:["2017-05-26 08", "2017-05-26 09", "2017-05-26 10", "2017-05-26 11", "2017-05-26 12", "2017-05-26 13", "2017-05-26 14", "2017-05-26 15", "2017-05-26 16", "2017-05-26 17", "2017-05-26 18", "2017-05-26 19"],
                              axisLabel:{
                                  show:true,
                                  textStyle:{
                                      color:'#999999',
									  fontSize:8
                                  }
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value} 人',
                                  textStyle:{
                                      color:'#999999',
									  fontSize:8
                                  }
                              }
                          }
                      ],
                      series : [
                          {
                              name:'客流量',
                              type:'line',
                              data:the_traffic_hour_data,
							  //data: [764,983,876,986,765,543,875,654,654,376,526,463],
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
                          {
                              name:'入店量',
                              type:'line',
                              data:the_store_amount_hour_data,
							  //data: [300,400,500,298,768,965,386,785,950,643,654,654],
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
                              },
                          }
                      ]
                  };
              traffic_and_the_amount_of_store_hour.setOption(option);
              window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_hour.resize();
              });
			  //window.onresize = traffic_and_the_amount_of_store_hour.resize;
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
            chart_traffic_and_the_amount_of_store_hour();
          }
          request_traffic_and_the_amount_of_store_hour();//请求客流量/入店量按小时计数据*/

	var the_into_the_store_rate_hour_data;//入店率按小时计
	var into_the_store_rate_hour_time;//入店率按小时记时间轴
	/*
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
                      backgroundColor:"white",
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
                      toolbox: {
                          show : false,
                          feature : {
                              mark : {show: true},
                              dataView : {show: true, readOnly: false},
                              magicType : {show: true, type: ['line', 'bar']},
                              restore : {show: true},
                              saveAsImage : {show: true}
                          }
                      },
                      calculable : true,
                      xAxis : [
                          {
                              type : 'category',
                              boundaryGap : false,
                              data : into_the_store_rate_hour_time,
                              axisLabel:{
                                  show:true,
                                  textStyle:{
                                      color:'#999999',
									  fontSize:8
                                  }
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value} ',
                                  textStyle:{
                                      color:'#999999',
									  fontSize:8
                                  }
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
			  window.addEventListener("resize",function(){
                                      into_the_store_rate_hour.resize();
              });
			  //window.onresize = traffic_and_the_amount_of_store_hour.resize;
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
            chart_into_the_store_rate_hour();
          }
          
          request_into_the_store_rate_hour();//请求入店率按小时计数据*/
          
          function chart_traffic_and_the_amount_of_store_and_into_the_store_rate_hour()
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
              function(ec){
                  var traffic_and_the_amount_of_store_and_into_the_store_rate_hour = ec.init(document.getElementById('traffic_and_the_amount_of_store_and_into_the_store_rate_hour_data_show'));
                  var colors = ['#5793f3', '#d14a61', '#675bba'];
                  var option = {
                      color: colors,
                      //backgroundColor:"white",
    				  tooltip: {
        			  trigger: 'axis',
        			  axisPointer: {
            		  	type: 'cross'
        			  }
    			  },
    			  grid: {
        			  right: '20%'
    			  },
    			  legend: {
        			  data:['客流量','入店量','入店率']
    			  },
    			  xAxis: [
        		  {
            		  type: 'category',
            		  axisTick: {
                	  alignWithLabel: true
            	 	  },
            		  data: traffic_and_the_amount_of_store_hour_time
        		  }
    			  ],
    			  yAxis: [
        		  {
            		  type: 'value',
            		  name: '客流量 、入店量',
            		  position: 'left',
            		  axisLine: {
                	  	lineStyle: {
                      		color: colors[0]
                	  	}
            	  	  },
            	  	  axisLabel: {
                      	formatter: '{value} 人'
            	  	  }
        		  },
        		  {
            	  	  type: 'value',
            		  name: '入店率',
            		  position: 'right',
            		  offset: 80,
            		  min: 0.0,
            		  max: 1.0,
            		  axisLine: {
                	  lineStyle: {
                    	  color: colors[1]
                	  }
            	  },
            	  axisLabel: {
                	  formatter: '{value}'
            	  }
        	  	}	  	
    			],
    			series: [
        		{
            		name:'客流量',
            		type:'bar',
            		data: the_traffic_hour_data
        		},
        		{
            		name:'入店量',
            		type:'bar',
            		data: the_store_amount_hour_data
        		},
        		{
            		name:'入店率',
            		type:'line',
            		yAxisIndex: 1,
            		data:the_into_the_store_rate_hour_data
        		}
    			]
				};
				traffic_and_the_amount_of_store_and_into_the_store_rate_hour.setOption(option);
			    window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_and_into_the_store_rate_hour.resize();
                });
              })
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
          
          function traffic_and_the_amount_of_store_hour_callback(data)
          {
              var obj = JSON.parse(data);
              the_traffic_hour_data = obj["traffic"];
              the_store_amount_hour_data = obj["store_amount"];
              traffic_and_the_amount_of_store_hour_time = obj["time"];
              request_into_the_store_rate_hour();
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
            chart_traffic_and_the_amount_of_store_and_into_the_store_rate_hour();
          }
          
          request_traffic_and_the_amount_of_store_hour();//请求数据

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
            chart_new_and_old_customers_hour();
          }
          request_new_and_old_customers_hour();//请求新老顾客按小时计数据

	var the_resident_time_hour_data;//驻店时长按小时计
	var resident_time_hour_time;//驻店时长按小时计时间轴
    function chart_resident_time_hour(){
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
                  var resident_time_hour = ec.init(document.getElementById('the_resident_time_hour_data_show'));
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
                              data : resident_time_hour_time,
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
                              data:the_resident_time_hour_data,
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
              resident_time_hour.setOption(option);
			  window.addEventListener("resize",function(){
                                      resident_time_hour.resize();
              });
              }
              );
          }
          function request_resident_time_hour()
          {
            var my_url = "/softbei_wifi/TheResidentTimeHour";
            $.ajax({
              type: "GET",
              url: my_url,
              success: resident_time_hour_callback
            });
          }
          function resident_time_hour_callback(data){
            var obj = JSON.parse(data);
            the_resident_time_hour_data = obj["resident_time"];
            resident_time_hour_time = obj["time"];
            chart_resident_time_hour();
          }         
          request_resident_time_hour();//请求驻店时长数据

	var the_bounce_rate_hour_data;//跳出率按小时计
	var the_deep_rate_hour_data;//深访率按小时计
	var bounce_rate_and_deep_rate_hour_time;//跳出率/深访率按小时计时间轴
    function chart_bounce_rate_and_deep_rate_hour(){
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
                  var bounce_rate_and_deep_rate_hour = ec.init(document.getElementById('bounce_rate_and_deep_rate_hour_data_show'));
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
            			data : bounce_rate_and_deep_rate_hour_time
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
            			data: the_bounce_rate_hour_data
        			  },
        			  {
            			name:'深访率',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_deep_rate_hour_data
        			  }
    				  ]
                  };
              bounce_rate_and_deep_rate_hour.setOption(option);
			  window.addEventListener("resize",function(){
                                      bounce_rate_and_deep_rate_hour.resize();
              });
              }
              );
          }
          function request_bounce_rate_and_deep_rate_hour()
          {
            var my_url = "/softbei_wifi/BounceRateAndDeepRateHour";
            $.ajax({
              type: "GET",
              url: my_url,
              success: bounce_rate_and_deep_rate_hour_callback
            });
          }
          function bounce_rate_and_deep_rate_hour_callback(data){
            var obj = JSON.parse(data);
            the_bounce_rate_hour_data = obj["bounce_rate"];
            the_deep_rate_hour_data = obj["deep_rate"];
            bounce_rate_and_deep_rate_hour_time = obj["time"];
            chart_bounce_rate_and_deep_rate_hour();
          }
          request_bounce_rate_and_deep_rate_hour();//请求跳出率/深访率数据
});