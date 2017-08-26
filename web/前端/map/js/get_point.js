$(document).ready(function(){
    var my_url = "/softbei_wifi/getMapPoint";
    $.ajax({
        type: "GET",
        url: my_url,
        success: get_point_callback,
        error: function(data){
            alert("无法获得数据！");
        }
    });
});

var lat;//维度
var lon;//经度
function get_point_callback(data)
{
    var obj = JSON.parse(data);
    lat = obj["lat"];
    lon = obj["lon"];
    show_map();
}

function show_map()
{
    var map = new BMap.Map("container");          // 创建地图实例  
    var opts={
        width:250,//信息窗口宽度
	    height:100,//信息窗口高度
	    title:"当前位置"//信息窗口标题
    };
    var point = new BMap.Point(lon, lat); // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.MapTypeControl()); 
    map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
    map.enableKeyboard();//启动键盘操作地图
    var maker = new BMap.Marker(point);//创建标注
    maker.addEventListener("click", function(e){
	    var myGeo = new BMap.Geocoder();
        //根据坐标的到地址描述
        myGeo.getLocation(point, function(result){
	        var infoWindow = new BMap.InfoWindow(result.address, opts);//创建信息窗口对象
	        map.openInfoWindow(infoWindow, point);//打开信息窗口
        });
    });
    map.addOverlay(maker);//将标注添加到地图中
    //创建地理编码实例
    var myGeo = new BMap.Geocoder();
    //根据坐标的到地址描述
    myGeo.getLocation(point, function(result){
        //alert(result.address);
	    var infoWindow = new BMap.InfoWindow(result.address, opts);//创建信息窗口对象
	    map.openInfoWindow(infoWindow, map.getCenter());//打开信息窗口
    });
}