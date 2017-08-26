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
    get_tcp_status();
    setInterval("get_tcp_status()",1000);
});

function get_tcp_status()
{
    var my_url = "/softbei_wifi/TCPStatus";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_tcp_status_callback
    });
}

function get_tcp_status_callback(data)
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
    show_tcp_status();
}

function show_tcp_status()
{
    var tcp_master = document.getElementById("master");
    var tcp_slave1 = document.getElementById("slave1");
    var tcp_slave2 = document.getElementById("slave2");
    var tcp_slave3 = document.getElementById("slave3");
    var tcp_slave4 = document.getElementById("slave4");
    var tcp_slave5 = document.getElementById("slave5");
    var tcp_slave6 = document.getElementById("slave6");
    var tcp_slave7 = document.getElementById("slave7");
    var tcp_slave8 = document.getElementById("slave8");
    var tcp_slave9 = document.getElementById("slave9");
    if(master)
    {
        tcp_master.src = "img/http_on.png";
        tcp_master.alt = "on";
    }
    else
    {
        tcp_master.src = "img/http_off.png";
        tcp_master.alt = "off";
    }
    if(slave1)
    {
        tcp_slave1.src = "img/http_on.png";
        tcp_slave1.alt = "on";
    }
    else
    {
        tcp_slave1.src = "img/http_off.png";
        tcp_slave1.alt = "off";
    }
    if(slave2)
    {
        tcp_slave2.src = "img/http_on.png";
        tcp_slave2.alt = "on";
    }
    else
    {
        tcp_slave2.src = "img/http_off.png";
        tcp_slave2.alt = "off";
    }
    if(slave3)
    {
        tcp_slave3.src = "img/http_on.png";
        tcp_slave3.alt = "on";
    }
    else
    {
        tcp_slave3.src = "img/http_off.png";
        tcp_slave3.alt = "off";
    }
    if(slave4)
    {
        tcp_slave4.src = "img/http_on.png";
        tcp_slave4.alt = "on";
    }
    else
    {
        tcp_slave4.src = "img/http_off.png";
        tcp_slave4.alt = "off";
    }
    if(slave5)
    {
        tcp_slave5.src = "img/http_on.png";
        tcp_slave5.alt = "on";
    }
    else
    {
        tcp_slave5.src = "img/http_off.png";
        tcp_slave5.alt = "off";
    }
    if(slave6)
    {
        tcp_slave6.src = "img/http_on.png";
        tcp_slave6.alt = "on";
    }
    else
    {
        tcp_slave6.src = "img/http_off.png";
        tcp_slave6.alt = "off";
    }
	if(slave7)
    {
        tcp_slave7.src = "img/http_on.png";
        tcp_slave7.alt = "on";
    }
    else
    {
        tcp_slave7.src = "img/http_off.png";
        tcp_slave7.alt = "off";
    }
	if(slave8)
    {
        tcp_slave8.src = "img/http_on.png";
        tcp_slave8.alt = "on";
    }
    else
    {
        tcp_slave8.src = "img/http_off.png";
        tcp_slave8.alt = "off";
    }
	if(slave9)
    {
        tcp_slave9.src = "img/http_on.png";
        tcp_slave9.alt = "on";
    }
    else
    {
        tcp_slave9.src = "img/http_off.png";
        tcp_slave9.alt = "off";
    }
}