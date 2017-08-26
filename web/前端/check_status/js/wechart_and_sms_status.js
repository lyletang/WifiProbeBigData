var wechart = false;
var sms = false;
/*
var slave3 = false;
var slave4 = false;
var slave5 = false;
var slave6 = false;
*/
$(document).ready(function(){
    get_wechart_and_sms_status();
    setInterval("get_wechart_and_sms_status()",1000);
});

function get_wechart_and_sms_status()
{
    var my_url = "/softbei_wifi/WechartAndSMSStatus";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_wechart_and_sms_status_callback
    });
}

function get_wechart_and_sms_status_callback(data)
{
    var obj = JSON.parse(data);
    wechart = obj["wechat"];
    sms = obj["sms"];
    /*
    slave2 = obj["slave2"];
    slave3 = obj["slave3"];
    slave4 = obj["slave4"];
    slave5 = obj["slave5"];
    slave6 = obj["slave6"];
    */
    show_wechart_and_sms_status();
}

function show_wechart_and_sms_status()
{
    var wechart_position = document.getElementById("wechart");
    var sms_position = document.getElementById("sms");
    if(wechart)
    {
        wechart_position.src = "img/wechart_on.png";
        wechart_position.alt = "on";
    }
    else
    {
        wechart_position.src = "img/wechart_off.png";
        wechart_position.alt = "off";
    }
    if(sms)
    {
        sms_position.src = "img/sms_on.png";
        sms_position.alt = "on";
    }
    else
    {
        sms_position.src = "img/sms_off.png";
        sms_position.alt = "off";
    }
    /*
    if(slave2)
    {
        $('#slave2').src = "img/online-1.png";
        $('#slave2').alt = "on";
    }
    else
    {
        $('#slave2').src = "img/offline-1.png";
        $('#slave2').alt = "off";
    }
    if(slave3)
    {
        $('#slave3').src = "img/online-1.png";
        $('#slave3').alt = "on";
    }
    else
    {
        $('#slave3').src = "img/offline-1.png";
        $('#slave3').alt = "off";
    }
    if(slave4)
    {
        $('#slave4').src = "img/online-1.png";
        $('#slave4').alt = "on";
    }
    else
    {
        $('#slave4').src = "img/offline-1.png";
        $('#slave4').alt = "off";
    }
    if(slave5)
    {
        $('#slave5').src = "img/online-1.png";
        $('#slave5').alt = "on";
    }
    else
    {
        $('#slave5').src = "img/offline-1.png";
        $('#slave5').alt = "off";
    }
    if(slave6)
    {
        $('#slave6').src = "img/online-1.png";
        $('#slave6').alt = "on";
    }
    else
    {
        $('#slave6').src = "img/offline-1.png";
        $('#slave6').alt = "off";
    }*/
}