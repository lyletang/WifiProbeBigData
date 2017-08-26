$(document).ready(function(){
	var the_traffic_month_data;//客流量按月计
	var the_store_amount_month_data;//入店量按月计
	var traffic_and_the_amount_of_store_month_time;//客流量/入店量按月计时间轴
	/*
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
                              data : traffic_and_the_amount_of_store_month_time,
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
                              data:the_traffic_month_data,
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
                              data:the_store_amount_month_data,
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
            chart_traffic_and_the_amount_of_store_month();
          }
          request_traffic_and_the_amount_of_store_month();//请求客流量/入店量按月计数据
*/
	var the_into_the_store_rate_month_data;//入店率按月计
	var into_the_store_rate_month_time;//入店率按月记时间轴
	/*
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
                              data : into_the_store_rate_month_time,
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
			  window.addEventListener("resize",function(){
                                      into_the_store_rate_month.resize();
              });
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
            chart_into_the_store_rate_month();
          }
          
          request_into_the_store_rate_month();//请求入店率按月计数据*/
          
          function chart_traffic_and_the_amount_of_store_and_into_the_store_rate_month()
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
                  var traffic_and_the_amount_of_store_and_into_the_store_rate_month = ec.init(document.getElementById('traffic_and_the_amount_of_store_and_into_the_store_rate_month_data_show'));
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
            		  data: traffic_and_the_amount_of_store_month_time
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
            		data: the_traffic_month_data
        		},
        		{
            		name:'入店量',
            		type:'bar',
            		data: the_store_amount_month_data
        		},
        		{
            		name:'入店率',
            		type:'line',
            		yAxisIndex: 1,
            		data:the_into_the_store_rate_month_data
        		}
    			]
				};
				traffic_and_the_amount_of_store_and_into_the_store_rate_month.setOption(option);
			    window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_and_into_the_store_rate_month.resize();
                });
              })
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
          
          function traffic_and_the_amount_of_store_month_callback(data)
          {
              var obj = JSON.parse(data);
              the_traffic_month_data = obj["traffic"];
              the_store_amount_month_data = obj["store_amount"];
              traffic_and_the_amount_of_store_month_time = obj["time"];
              request_into_the_store_rate_month();
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
            chart_traffic_and_the_amount_of_store_and_into_the_store_rate_month();
          }
          
          request_traffic_and_the_amount_of_store_month();//请求数据

	var the_visiting_cycle_month_data;//来访周期按月计
	var visiting_cycle_month_time;//来访周期按月计时间轴
    function chart_visiting_cycle_month(){
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
                  var visiting_cycle_month = ec.init(document.getElementById('visiting_cycle_month_data_show'));
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
            			data : visiting_cycle_month_time
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
            			data: the_visiting_cycle_month_data
        			  }
    				  ]
                  };
              visiting_cycle_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      visiting_cycle_month.resize();
              });
              }
              );
          }
          function request_visiting_cycle_month()
          {
            var my_url = "/softbei_wifi/VisitingCycleMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: visiting_cycle_month_callback
            });
          }
          function visiting_cycle_month_callback(data){
            var obj = JSON.parse(data);
            the_visiting_cycle_month_data = obj["visiting_cycle"];
            visiting_cycle_month_time = obj["time"];
            chart_visiting_cycle_month();
          }         
          request_visiting_cycle_month();//请求来访周期数据按月计

	var new_and_old_customers_month_time;//新老顾客按月计时间轴
	var the_new_customers_month_data;//新顾客按月计
	var the_old_customers_month_data;//老顾客按月计
    function chart_new_and_old_customers_month(){
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
                  var new_and_old_customers_month = ec.init(document.getElementById('new_and_old_customers_month_data_show'));
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
            				data : new_and_old_customers_month_time
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
            				data:the_new_customers_month_data,
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
            				data:the_old_customers_month_data,
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
              new_and_old_customers_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      new_and_old_customers_month.resize();
              });
              }
              );
          }
          function request_new_and_old_customers_month()
          {
            var my_url = "/softbei_wifi/NewAndOldCustomersMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: new_and_old_customers_month_callback
            });
          }
          function new_and_old_customers_month_callback(data){
            var obj = JSON.parse(data);
            the_new_customers_month_data = obj["new_customers"];
            the_old_customers_month_data = obj["old_customers"];
            new_and_old_customers_month_time = obj["time"];
            chart_new_and_old_customers_month();
          }
          request_new_and_old_customers_month();//请求新老顾客按月计数据

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
                              radius : '70%', //55
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
                                          show:false,
                                          formatter:'{b} : {c}人({d}%)'
                                      },
                                      labelLine:{show:false}
                                  }
                              }
                          }
                      ]
                  };

              customer_active_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      customer_active_month.resize();
              });
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
            chart_customer_active_month();
          }
          request_customer_active_month();//请求顾客活跃度按月计

	var the_resident_time_month_data;//驻店时长按月计
	var resident_time_month_time;//驻店时长按月计时间轴
    function chart_resident_time_month(){
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
                  var resident_time_month = ec.init(document.getElementById('the_resident_time_month_data_show'));
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
                              data : resident_time_month_time,
                              axisLabel:{
                                  show:true
                              }
                          }
                      ],
                      yAxis : [
                          {
                              type : 'value',
                              axisLabel : {
                                  formatter: '{value}分'
                              }
                          }
                      ],
                      series : [
                          {
                              name:'驻店时长',
                              type:'line',
                              data:the_resident_time_month_data,
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
              resident_time_month.setOption(option);
			  window.addEventListener("resize",function(){
                                      resident_time_month.resize();
              });
              }
              );
          }
          function request_resident_time_month()
          {
            var my_url = "/softbei_wifi/TheResidentTimeMonth";
            $.ajax({
              type: "GET",
              url: my_url,
              success: resident_time_month_callback
            });
          }
          function resident_time_month_callback(data){
            var obj = JSON.parse(data);
            the_resident_time_month_data = obj["resident_time"];
            resident_time_month_time = obj["time"];
            chart_resident_time_month();
          }         
          request_resident_time_month();//请求驻店时长数据按月计


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
            chart_bounce_rate_and_deep_rate_month();
          }
          request_bounce_rate_and_deep_rate_month();//请求跳出率/深访率按月计数据
});