var master = false;
var slave1 = false;
var slave3 = false;
var slave4 = false;
var slave5 = false;
var slave6 = false;
var slave7 = false;
var slave8 = false;
var slave9 = false;
$(document).ready(function(){
    get_spark_status();
    setInterval("get_spark_status()",1000);
});

function get_spark_status()
{
    var my_url = "/softbei_wifi/SparkStatus";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_spark_status_callback
    });
}

function get_spark_status_callback(data)
{
    var obj = JSON.parse(data);
    master = obj["master"];
    slave1 = obj["slave1"];
    slave2 = obj["slave2"];
    slave3 = obj["slave3"];
    slave4 = obj["slave4"];
    slave5 = obj["slave5"];
    slave6 = obj["slave6"];
	slave7 = obj["slave7"];
	slave8 = obj["slave8"];
	slave9 = obj["slave9"];
    show_spark_status();
}

function show_spark_status()
{
    var spark_master = document.getElementById("master");
    var spark_slave1 = document.getElementById("slave1");
    var spark_slave2 = document.getElementById("slave2");
    var spark_slave3 = document.getElementById("slave3");
    var spark_slave4 = document.getElementById("slave4");
    var spark_slave5 = document.getElementById("slave5");
    var spark_slave6 = document.getElementById("slave6");
    var spark_slave7 = document.getElementById("slave7");
    var spark_slave8 = document.getElementById("slave8");
    var spark_slave9 = document.getElementById("slave9");
    if(master)
    {
        spark_master.src = "img/spark_on.png";
        spark_master.alt = "on";
    }
    else
    {
        spark_master.src = "img/spark_off.png";
        spark_master.alt = "off";
    }
    if(slave1)
    {
        spark_slave1.src = "img/spark_on.png";
        spark_slave1.alt = "on";
    }
    else
    {
        spark_slave1.src = "img/spark_off.png";
        spark_slave1.alt = "off";
    }
    if(slave2)
    {
        spark_slave2.src = "img/spark_on.png";
        spark_slave2.alt = "on";
    }
    else
    {
        spark_slave2.src = "img/spark_off.png";
        spark_slave2.alt = "off";
    }
    if(slave3)
    {
        spark_slave3.src = "img/spark_on.png";
        spark_slave3.alt = "on";
    }
    else
    {
        spark_slave3.src = "img/spark_off.png";
        spark_slave3.alt = "off";
    }
    if(slave4)
    {
        spark_slave4.src = "img/spark_on.png";
        spark_slave4.alt = "on";
    }
    else
    {
        spark_slave4.src = "img/spark_off.png";
        spark_slave4.alt = "off";
    }
    if(slave5)
    {
        spark_slave5.src = "img/spark_on.png";
        spark_slave5.alt = "on";
    }
    else
    {
        spark_slave5.src = "img/spark_off.png";
        spark_slave5.alt = "off";
    }
    if(slave6)
    {
        spark_slave6.src = "img/spark_on.png";
        spark_slave6.alt = "on";
    }
    else
    {
        spark_slave6.src = "img/spark_off.png";
        spark_slave6.alt = "off";
    }
	if(slave7)
    {
        spark_slave7.src = "img/spark_on.png";
        spark_slave7.alt = "on";
    }
    else
    {
        spark_slave7.src = "img/spark_off.png";
        spark_slave7.alt = "off";
    }
	if(slave8)
    {
        spark_slave8.src = "img/spark_on.png";
        spark_slave8.alt = "on";
    }
    else
    {
        spark_slave8.src = "img/spark_off.png";
        spark_slave8.alt = "off";
    }
	if(slave9)
    {
        spark_slave9.src = "img/spark_on.png";
        spark_slave9.alt = "on";
    }
    else
    {
        spark_slave9.src = "img/spark_off.png";
        spark_slave9.alt = "off";
    }
}