var master = false;
var slave1 = false;
var slave3 = false;
var slave4 = false;
var slave5 = false;
var slave6 = false;
var slave7 = false;
var slave8 = false;
var slave9 = false;
var slave10 = false;
var slave11 = false;
var slave12 = false;
var slave13 = false;
var slave14 = false;
var slave15 = false;
var slave16 = false;
var slave17 = false;
var slave18 = false;
var slave19 = false;
$(document).ready(function(){
    get_elk_status();
    setInterval("get_elk_status()",1000);
});

function get_elk_status()
{
    var my_url = "/softbei_wifi/ELKStatus";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_elk_status_callback
    });
}

function get_elk_status_callback(data)
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
	slave10 = obj["slave10"];
	slave11 = obj["slave11"];
	slave12 = obj["slave12"];
	slave13 = obj["slave13"];
	slave14 = obj["slave14"];
	slave15 = obj["slave15"];
	slave16 = obj["slave16"];
	slave17 = obj["slave17"];
	slave18 = obj["slave18"];
	slave19 = obj["slave19"];
    show_elk_status();
}

function show_elk_status()
{
    var elk_master = document.getElementById("master");
    var elk_slave1 = document.getElementById("slave1");
    var elk_slave2 = document.getElementById("slave2");
    var elk_slave3 = document.getElementById("slave3");
    var elk_slave4 = document.getElementById("slave4");
    var elk_slave5 = document.getElementById("slave5");
    var elk_slave6 = document.getElementById("slave6");
    var elk_slave7 = document.getElementById("slave7");
    var elk_slave8 = document.getElementById("slave8");
    var elk_slave9 = document.getElementById("slave9");
    var elk_slave10 = document.getElementById("slave10");
    var elk_slave11 = document.getElementById("slave11");
    var elk_slave12 = document.getElementById("slave12");
    var elk_slave13 = document.getElementById("slave13");
    var elk_slave14 = document.getElementById("slave14");
    var elk_slave15 = document.getElementById("slave15");
    var elk_slave16 = document.getElementById("slave16");
    var elk_slave17 = document.getElementById("slave17");
    var elk_slave18 = document.getElementById("slave18");
    var elk_slave19 = document.getElementById("slave19");
    if(master)
    {
        elk_master.src = "img/es_on.png";
        elk_master.alt = "on";
    }
    else
    {
        elk_master.src = "img/es_off.png";
        elk_master.alt = "off";
    }
    if(slave1)
    {
        elk_slave1.src = "img/es_on.png";
        elk_slave1.alt = "on";
    }
    else
    {
        elk_slave1.src = "img/es_off.png";
        elk_slave1.alt = "off";
    }
    if(slave2)
    {
        elk_slave2.src = "img/es_on.png";
        elk_slave2.alt = "on";
    }
    else
    {
        elk_slave2.src = "img/es_off.png";
        elk_slave2.alt = "off";
    }
    if(slave3)
    {
        elk_slave3.src = "img/es_on.png";
        elk_slave3.alt = "on";
    }
    else
    {
        elk_slave3.src = "img/es_off.png";
        elk_slave3.alt = "off";
    }
    if(slave4)
    {
        elk_slave4.src = "img/es_on.png";
        elk_slave4.alt = "on";
    }
    else
    {
        elk_slave4.src = "img/es_off.png";
        elk_slave4.alt = "off";
    }
    if(slave5)
    {
        elk_slave5.src = "img/es_on.png";
        elk_slave5.alt = "on";
    }
    else
    {
        elk_slave5.src = "img/es_off.png";
        elk_slave5.alt = "off";
    }
    if(slave6)
    {
        elk_slave6.src = "img/es_on.png";
        elk_slave6.alt = "on";
    }
    else
    {
        elk_slave6.src = "img/es_off.png";
        elk_slave6.alt = "off";
    }
	if(slave7)
    {
        elk_slave7.src = "img/es_on.png";
        elk_slave7.alt = "on";
    }
    else
    {
        elk_slave7.src = "img/es_off.png";
        elk_slave7.alt = "off";
    }
	if(slave8)
    {
        elk_slave8.src = "img/es_on.png";
        elk_slave8.alt = "on";
    }
    else
    {
        elk_slave8.src = "img/es_off.png";
        elk_slave8.alt = "off";
    }
	if(slave9)
    {
        elk_slave9.src = "img/es_on.png";
        elk_slave9.alt = "on";
    }
    else
    {
        elk_slave9.src = "img/es_off.png";
        elk_slave9.alt = "off";
    }
	if(slave10)
    {
        elk_slave10.src = "img/es_on.png";
        elk_slave10.alt = "on";
    }
    else
    {
        elk_slave10.src = "img/es_off.png";
        elk_slave10.alt = "off";
    }
	if(slave11)
    {
        elk_slave11.src = "img/es_on.png";
        elk_slave11.alt = "on";
    }
    else
    {
        elk_slave12.src = "img/es_off.png";
        elk_slave12.alt = "off";
    }
	if(slave12)
    {
        elk_slave12.src = "img/es_on.png";
        elk_slave12.alt = "on";
    }
    else
    {
        elk_slave12.src = "img/es_off.png";
        elk_slave12.alt = "off";
    }
	if(slave13)
    {
        elk_slave13.src = "img/es_on.png";
        elk_slave13.alt = "on";
    }
    else
    {
        elk_slave13.src = "img/es_off.png";
        elk_slave13.alt = "off";
    }
	if(slave14)
    {
        elk_slave14.src = "img/es_on.png";
        elk_slave14.alt = "on";
    }
    else
    {
        elk_slave14.src = "img/es_off.png";
        elk_slave14.alt = "off";
    }
	if(slave15)
    {
        elk_slave15.src = "img/es_on.png";
        elk_slave15.alt = "on";
    }
    else
    {
        elk_slave15.src = "img/es_off.png";
        elk_slave15.alt = "off";
    }
	if(slave16)
    {
        elk_slave16.src = "img/es_on.png";
        elk_slave16.alt = "on";
    }
    else
    {
        elk_slave16.src = "img/es_off.png";
        elk_slave16.alt = "off";
    }
	if(slave17)
    {
        elk_slave17.src = "img/es_on.png";
        elk_slave17.alt = "on";
    }
    else
    {
        elk_slave17.src = "img/es_off.png";
        elk_slave17.alt = "off";
    }
	if(slave18)
    {
        elk_slave18.src = "img/es_on.png";
        elk_slave18.alt = "on";
    }
    else
    {
        elk_slave18.src = "img/es_off.png";
        elk_slave18.alt = "off";
    }
	if(slave19)
    {
        elk_slave19.src = "img/es_on.png";
        elk_slave19.alt = "on";
    }
    else
    {
        elk_slave19.src = "img/es_off.png";
        elk_slave19.alt = "off";
    }
}