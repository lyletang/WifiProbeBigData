var master = false;
var slave1 = false;
var slave2 = false;
$(document).ready(function(){
    get_web_status();
    setInterval("get_web_status()",1000);
});

function get_web_status()
{
    var my_url = "/softbei_wifi/WebStatus";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_web_status_callback
    });
}

function get_web_status_callback(data)
{
    var obj = JSON.parse(data);
    master = obj["master"];
    slave1 = obj["slave1"];
    slave2 = obj["slave2"];
    show_web_status();
}

function show_web_status()
{
    var web_master = document.getElementById("master");
    var web_slave1 = document.getElementById("slave1");
    var web_slave2 = document.getElementById("slave2");
    if(master)
    {
        web_master.src = "img/web_on.png";
        web_master.alt = "on";
    }
    else
    {
        web_master.src = "img/web_off.png";
        web_master.alt = "off";
    }
    if(slave1)
    {
        web_slave1.src = "img/web_on.png";
        web_slave1.alt = "on";
    }
    else
    {
        web_slave1.src = "img/web_off.png";
        web_slave1.alt = "off";
    }
    if(slave2)
    {
        web_slave2.src = "img/web_on.png";
        web_slave2.alt = "on";
    }
    else
    {
        web_slave2.src = "img/web_off.png";
        web_slave2.alt = "off";
    }
}