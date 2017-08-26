$(document).ready(function(){
	var the_traffic_day_data;//客流量按日计
	var the_store_amount_day_data;//入店量按日计
	var traffic_and_the_amount_of_store_day_time;//客流量/入店量按日计时间轴
	/*
    function chart_traffic_and_the_amount_of_store_day(){
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
                  var traffic_and_the_amount_of_store_day = ec.init(document.getElementById('traffic_and_the_amount_of_store_day_data_show'));
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
                              data : traffic_and_the_amount_of_store_day_time,
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
                              data:the_traffic_day_data,
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
                              data:the_store_amount_day_data,
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
              traffic_and_the_amount_of_store_day.setOption(option);
			  window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_day.resize();
              });
              }
              );
          }
          function request_traffic_and_the_amount_of_store_day()
          {
            var my_url = "/softbei_wifi/TrafficAndTheAmountOfStoreDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: traffic_and_the_amount_of_store_day_callback
            });
          }
          function traffic_and_the_amount_of_store_day_callback(data){
            var obj = JSON.parse(data);
            the_traffic_day_data = obj["traffic"];
            the_store_amount_day_data = obj["store_amount"];
            traffic_and_the_amount_of_store_day_time = obj["time"];
            chart_traffic_and_the_amount_of_store_day();
          }
          request_traffic_and_the_amount_of_store_day();//请求客流量/入店量按日计数据
          */
    var the_into_the_store_rate_day_data;//入店率按日计
	var into_the_store_rate_day_time;//入店率按日记时间轴
	/*
    function chart_into_the_store_rate_day(){
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
                  var into_the_store_rate_day = ec.init(document.getElementById('into_the_store_rate_day_data_show'));
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
                              data : into_the_store_rate_day_time,
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
                              data:the_into_the_store_rate_day_data,
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
              into_the_store_rate_day.setOption(option);
			  window.addEventListener("resize",function(){
                                      into_the_store_rate_day.resize();
              });
              }
              );
          }
          function request_into_the_store_rate_day()
          {
            var my_url = "/softbei_wifi/IntoTheStoreRateDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: into_the_store_rate_day_callback
            });
          }
          function into_the_store_rate_day_callback(data){
            var obj = JSON.parse(data);
            the_into_the_store_rate_day_data = obj["into_the_store_rate"];
            into_the_store_rate_day_time = obj["time"];
            chart_into_the_store_rate_day();
          }
          
          request_into_the_store_rate_day();//请求入店率按日计数据
          */
          function chart_traffic_and_the_amount_of_store_and_into_the_store_rate_day()
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
                  var traffic_and_the_amount_of_store_and_into_the_store_rate_day = ec.init(document.getElementById('traffic_and_the_amount_of_store_and_into_the_store_rate_day_data_show'));
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
            		  data: traffic_and_the_amount_of_store_day_time
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
            		data: the_traffic_day_data
        		},
        		{
            		name:'入店量',
            		type:'bar',
            		data: the_store_amount_day_data
        		},
        		{
            		name:'入店率',
            		type:'line',
            		yAxisIndex: 1,
            		data:the_into_the_store_rate_day_data
        		}
    			]
				};
				traffic_and_the_amount_of_store_and_into_the_store_rate_day.setOption(option);
			    window.addEventListener("resize",function(){
                                      traffic_and_the_amount_of_store_and_into_the_store_rate_day.resize();
                });
              })
          }
          
          function request_traffic_and_the_amount_of_store_day()
          {
            var my_url = "/softbei_wifi/TrafficAndTheAmountOfStoreDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: traffic_and_the_amount_of_store_day_callback
            });
          }
          
          function traffic_and_the_amount_of_store_day_callback(data)
          {
              var obj = JSON.parse(data);
              the_traffic_day_data = obj["traffic"];
              the_store_amount_day_data = obj["store_amount"];
              traffic_and_the_amount_of_store_day_time = obj["time"];
              request_into_the_store_rate_day();
          }
          
          function request_into_the_store_rate_day()
          {
            var my_url = "/softbei_wifi/IntoTheStoreRateDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: into_the_store_rate_day_callback
            });
          }
          
          function into_the_store_rate_day_callback(data){
            var obj = JSON.parse(data);
            the_into_the_store_rate_day_data = obj["into_the_store_rate"];
            into_the_store_rate_day_time = obj["time"];
            chart_traffic_and_the_amount_of_store_and_into_the_store_rate_day();
          }
          
          request_traffic_and_the_amount_of_store_day();//请求数据
          
    var new_and_old_customers_day_time;//新老顾客按日计计时间轴
	var the_new_customers_day_data;//新顾客按日计
	var the_old_customers_day_data;//老顾客按日计
    function chart_new_and_old_customers_day(){
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
                  var new_and_old_customers_day = ec.init(document.getElementById('new_and_old_customers_day_data_show'));
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
            				data : new_and_old_customers_day_time
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
            				data:the_new_customers_day_data,
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
            				data:the_old_customers_day_data,
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
              new_and_old_customers_day.setOption(option);
			  window.addEventListener("resize",function(){
                                      new_and_old_customers_day.resize();
              });
              }
              );
          }
          function request_new_and_old_customers_day()
          {
            var my_url = "/softbei_wifi/NewAndOldCustomersDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: new_and_old_customers_day_callback
            });
          }
          function new_and_old_customers_day_callback(data){
            var obj = JSON.parse(data);
            the_new_customers_day_data = obj["new_customers"];
            the_old_customers_day_data = obj["old_customers"];
            new_and_old_customers_day_time = obj["time"];
            chart_new_and_old_customers_day();
          }
          request_new_and_old_customers_day();//请求新老顾客按日计数据
          
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
            chart_resident_time_day();
          }         
          request_resident_time_day();//请求驻店时长数据按日计
          
    var the_bounce_rate_day_data;//跳出率按日计
	var the_deep_rate_day_data;//深访率按日计
	var bounce_rate_and_deep_rate_day_time;//跳出率/深访率按日计时间轴
    function chart_bounce_rate_and_deep_rate_day(){
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
                  var bounce_rate_and_deep_rate_day = ec.init(document.getElementById('bounce_rate_and_deep_rate_day_data_show'));
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
            			data : bounce_rate_and_deep_rate_day_time
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
            			data: the_bounce_rate_day_data
        			  },
        			  {
            			name:'深访率',
            			type:'line',
            			itemStyle: {normal: {areaStyle: {type: 'default'}}},
            			data: the_deep_rate_day_data
        			  }
    				  ]
                  };
              bounce_rate_and_deep_rate_day.setOption(option);
			  window.addEventListener("resize",function(){
                                      bounce_rate_and_deep_rate_day.resize();
              });
              }
              );
          }
          function request_bounce_rate_and_deep_rate_day()
          {
            var my_url = "/softbei_wifi/BounceRateAndDeepRateDay";
            $.ajax({
              type: "GET",
              url: my_url,
              success: bounce_rate_and_deep_rate_day_callback
            });
          }
          function bounce_rate_and_deep_rate_day_callback(data){
            var obj = JSON.parse(data);
            the_bounce_rate_day_data = obj["bounce_rate"];
            the_deep_rate_day_data = obj["deep_rate"];
            bounce_rate_and_deep_rate_day_time = obj["time"];
            chart_bounce_rate_and_deep_rate_day();
          }
          request_bounce_rate_and_deep_rate_day();//请求跳出率/深访率按日计数据
});