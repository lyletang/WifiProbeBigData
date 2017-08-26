var one = false;
var two = false;
var three = false;
var four = false;
var five = false;
$(document).ready(function(){
    get_wifi_status();
    setInterval("get_wifi_status()",1000);
});

function get_wifi_status()
{
    var my_url = "/softbei_wifi/WIFIStatus";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_wifi_status_callback
    });
}

function get_wifi_status_callback(data)
{
    var obj = JSON.parse(data);
    one = obj["1"];
    two = obj["2"];
    three = obj["3"];
    four = obj["4"];
    five = obj["5"];
    show_wifi_status();
}

function show_wifi_status()
{
    var one_position = document.getElementById("one");
    var two_position = document.getElementById("two");
    var three_position = document.getElementById("three");
    var four_position = document.getElementById("four");
    var five_position = document.getElementById("five");
    if(one)
    {
        one_position.src = "img/wifi_on.png";
        one_position.alt = "on";
    }
    else
    {
        one_position.src = "img/wifi_off.png";
        one_position.alt = "off";
    }
    if(two)
    {
        two_position.src = "img/wifi_on.png";
        two_position.alt = "on";
    }
    else
    {
        two_position.src = "img/wifi_off.png";
        two_position.alt = "off";
    }
    if(three)
    {
        three_position.src = "img/wifi_on.png";
        three_position.alt = "on";
    }
    else
    {
        three_position.src = "img/wifi_off.png";
        three_position.alt = "off";
    }
    if(four)
    {
        four_position.src = "img/wifi_on.png";
        four_position.alt = "on";
    }
    else
    {
        four_position.src = "img/wifi_off.png";
        four_position.alt = "off";
    }
    if(five)
    {
        five_position.src = "img/wifi_on.png";
        five_position.alt = "on";
    }
    else
    {
        five_position.src = "img/wifi_off.png";
        five_position.alt = "off";
    }
}