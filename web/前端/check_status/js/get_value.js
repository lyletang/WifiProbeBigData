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
								alert("正常！");
							}
						}
						else
						{
							alert("正常！");
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
					alert("正常");
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
		    alert("正常");
		}
	}
	/*
	for(var i = 0; i < start_strs.length; i++)
	{
	    alert(start_strs[i]);
	}
	for(var j = 0; j < end_strs.length; j++)
	{
	    alert(end_strs[j]);
	}*/
}
/*
function getDay(var year, var month)
{
    var init_day = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var day;
	day = init_day[month - 1];
	//判断处理2月
	if(month == 2)
	{
	    //判断处理闰年
		if(judgeLeapYear(year))
		{
		    day = 29
		}
	}
	return day;
}

function judgeLeapYear(var year)
{
    //判断是否整除100
	if(year % 100 == 0)
	{
	    //判断是否整除400
		if(year % 400 == 0)
		{
		    return true;
		}
	}
	else
	{
	    //判断是否整除4
		if(year % 4 == 0)
		{
		    return true;
		}
	}
	return false;
}*/