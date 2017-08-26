// 于闯、、
var $funitem = $("#gallery li"),
    $gallery = $("#gallery"),
    $websitelist = $(".website li"),
    $datainfo = $('.datainfo'),
    $website = $("#website");

var i = 0; //设置一个全局的变量

$(function() {

    $(".datainfo").draggable({
        addClasses: false, //提高性能
        distance: 30,
        handle: '',
        containment: '.page-content', //限制父容器移动
        cursor: "move",
        opacity: 0.35,
        // snap: '.page-content',
        // snapMode: 'both',
        snapTolerance: 0,
        grid: [2, 10],
        delay: 200
    });


    // 烧脑模式开始

    $('.picture,.pencil,.banner').click(function(event) {
        //识别对象
        var leiname = event.currentTarget.className;

        //防止爆发
        var i = $("#website li").length;

        i += 1; //自增
        var str; //插入模块
        var str2; //展示组件
        if (leiname == 'picture') {
            console.log('click:picture');
            str = '<li class="ui-widget-content ui-corner-tr ui-state-default ' + leiname + ' ' + leiname + i + '" name="' + leiname + i + '"><a data="" class="datahref"><span class="ui-widget-header"></span><div class="maininfo"><input name="" type="file' + i + '" id="up_FILE' + i + '" class="imghide bindname" /><img src="" ondblclick="upload(this,' + i + ',1)" src="/media/image/favicon.png" class="uploadimg" /></div></a></li>';


        } else if (leiname == 'pencil') {
            console.log('click:pencil');
            str = '<li class="ui-widget-content ui-corner-tr ui-state-default ' + leiname + ' ' + leiname + i + '" name="' + leiname + i + '"><a data="" class="datahref"><span class="ui-widget-header"></span><div class="maininfo"><input name="name' + i + '" type="text" id="text' + i + '" class=""  value=""/></div></a></li>';

        } else if (leiname == 'banner') {
            console.log('click:banner');
            str = '<li class="ui-widget-content ui-corner-tr ui-state-default ' + leiname + ' ' + leiname + i + '" name="' + leiname + i + '"><span class="ui-widget-header"></span><div class="maininfo"><div class="swiper-container"><div class="swiper-wrapper"> </div><div class="swiper-pagination">  </div> </div></div></li>';
        }
        str2 = '<div class="span12 ' + leiname + ' ' + leiname + i + ' " name="' + leiname + i + '"><div class="portlet box blue"><div class="portlet-title"><div class="caption"><i class="icon-reorder"></i>组件设置</div><i class="icon-trash"></i></div><div class="portlet-body form"><div class="form-horizontal"><div class="control-group"><label class="control-label">宽度</label><div class="controls"><input type="number" min="1" max="320"  placeholder="1~320" class="span6 m-wrap"> <span class="help-inline alertext hide"></span></div></div>  <div class="control-group setheight"><label class="control-label">高度</label><div class="controls"><input type="number" min="1" max="320" class="span6 m-wrap"> <span class="help-inline alertext hide"></span></div></div>    <div class="control-group setfont"><label class="control-label">文字字号</label><div class="controls"><select class="small m-wrap fontsize" tabindex="1"><option value="12">12</option><option value="14">14</option><option value="16">16</option><option value="18">18</option><option value="20">20</option><option value="22">22</option><option value="24">24</option><option value="30">30</option><option value="36">36</option></select></div></div>  <div class="control-group settxt"><label class="control-label">文字样式</label><div class="controls font_style"> <i class="icon-bold" value="bold" data="" title="加粗"></i> <i class="icon-italic" value="italic" data=""  title="倾斜"></i> <i class="icon-align-left alener" data=""  title="对齐方式"></i> </div></div>  <div class="control-group setcol"><label class="control-label">文字颜色</label><div class="controls"><div class="example-ex"><span></span> <input type="text" value="#000000" class="ex-color-box yu_txtcol span6 m-wrap"></div></div></div>   <div class="control-group setbg"><label class="control-label">背景颜色</label><div class="controls"> <div class="example-ex"><span></span> <input type="text" value="#000000" class="ex-color-box yu_bgcol span6 m-wrap"></div></div></div>   <div class="control-group bannum"><label class="control-label">设置页数</label><div class="controls"><input type="number" min="1" max="8" class="span6 m-wrap yu_bannum"></div></div>   <div class="control-group sethref"><label class="control-label">绑定链接</label><div class="controls"><input type="text" class="span6 m-wrap"> <span class="help-inline alertext hide"></span></div></div>  <div class="form-actions"><button type="submit" onclick="sbm(this)" class="btn yusubmit blue" name="' + leiname + i + '">　确定　</button> <button type="button" onclick="cel(this)" class="btn yucancel" name="' + leiname + i + '">清除样式</button></div></div></div></div></div>';
        $("#website ul").append(str);
        $(".datainfo").append(str2);


        // console.log(typeyu);
        play();
        setdatainfo(); //组件展示控制
    });

    //总调度
    function play() {
        dragg();
        resizables();
        subsidiary(); //附属关系
        colpick(); //色板
    }

    function bannerpage() {
        //查询banner页数 
        var num = $('.banner').attr('pagenumber');
        console.log(num);

    }

    // $funitem.click(function() {
    //     $(this).hide();
    //     $(this).find('.icon_selcet').attr('title', '移除该模块');
    //     $("#website ul").append($(this).clone().fadeIn());
    //     dragg();
    //     resizables();
    // });

    $("#website").droppable({
        activeClass: "ui-state-hover",
        revert: true,
        helper: "clone",
        drop: function(event, ui) {
            //var width = $(this).find('li').width();
            //console.log(width);
        }
    });
    //end
});

//拖动
function dragg() {
    $("#website li").draggable({
        addClasses: false, //提高性能
        scroll: true,
        scrollSensitivity: 10,
        scrollSpeed: 10,
        distance: 30,
        handle: '.ui-widget-header',
        containment: 'parent', //限制父容器移动
        cursor: "move",
        opacity: 0.35,
        snap: '#website',
        snapMode: 'both',
        snapTolerance: 0,
        grid: [2, 10],
        delay: 200
    });
}
//缩放
function resizables() {
    // website li resizable
    $("#website .picture").resizable({
        animate: true,
        animateDuration: 500,
        animateEasing: 'swing',
        // aspectRatio:1, //aspectRatio
        alsoResize: '', //跟随父容器缩放
        // containment: 'parent',
        maxHeight: 12000,
        maxWidth: 320,
        minHeight: 70,
        minWidth: 70

    });


}
//添加解除附属
function subsidiary() {
    //$website function delete
    $datainfo.find('i.icon-trash').click(function(index) {
        $(this).parents('.span12').remove();
        var classname = $(this).parents('.span12').attr('name');
        // console.log(classname);
        $website.find('.' + classname).remove();
        // $funiotem.has(classname).show();
    });
    //$website clild show 高亮附属
    $website.find('li').click(function() {
        $(".website li").removeClass('select');
        $(this).addClass('select');
        var classnames = $(this).attr('name');
        // console.log(classnames);
        $datainfo.find('.span12').hide();
        $datainfo.find('.' + classnames).show();
    });
}


//提交表单后执行
function sbm(a) {

    var name = $(a).attr('name'); //获取类
    var w = $('.' + name + " input[type='number']:eq(0)").val(); //宽
    var h = $('.' + name + " input[type='number']:eq(1)").val(); //高
    var c = $('.' + name + " input.yu_txtcol").val(); //文字颜色
    var bg = $('.' + name + " input.yu_bgcol").val(); //背景颜色
    var p = $('.' + name + " input.yu_bannum").val(); //页码
    var f = $('.' + name + " .fontsize option:selected").val(); //字号
    var v = $('.' + name + " :text").val(); //input文字
    var b = $('.' + name + " .icon-bold").attr('data'); //加粗
    var it = $('.' + name + " .icon-italic").attr('data'); //倾斜
    var al = $('.' + name + " .alener").attr('data'); //对齐
    var hf = $('.' + name + " .sethref :text").val(); //链接

    if (w > 320) {
        $('#titler').html('请在组件设置中填写正确参数');
        $('#contenter').html('组件设置中宽度值超过了容器窗口，建议宽度尺寸320像素以内');
        $(".alertdome").trigger("click");
        return false;
    }

    if (!window.sessionStorage) {
        alert("浏览器不支持sessionStorage,请更换'360极速或其他高版本浏览器'");
        return false;
    } else {
        var storage = window.sessionStorage;
        //写入字段
        storage["name"] = name;
        storage["width"] = w;
        storage["height"] = h;
        storage["color"] = c;
        storage["bgcolor"] = bg;
        storage["page"] = p;
        storage["fontsize"] = f;
        storage["bold"] = b;
        storage["txtvalue"] = v;
        storage["italic"] = it;
        storage["algin"] = al;
        storage["href"] = hf;
        //写入b字段
        // storage.name = name;
        //写入c字段
        // storage.setItem("name",name);
    }
    //输出字段
    var storage = window.sessionStorage;

    var $name = storage.name,
        $width = storage.width,
        $height = storage.height,
        $color = storage.color,
        $bgcolor = storage.bgcolor,
        $page = storage.page,
        $fontsize = storage.fontsize,
        $bold = storage.bold,
        $italic = storage.italic,
        $txtvalue = storage.txtvalue,
        $algin = storage.algin,
        $href = storage.href;

    $website.find("." + $name).css({ 'width': $width, 'height': $height, 'background-color': $bgcolor });
    $website.find("." + $name + " .swiper-container").css({ 'height': $height });
    $website.find("." + $name + " :text").css({ 'color': $color, 'fontWeight': $bold, 'fontStyle': $italic, 'fontSize': $fontsize + 'px', 'text-align': $algin, }).attr('value', $txtvalue);
    $website.find("." + $name).attr({ 'pagenumber': $page });
    

    var ret = /^http:\/\/[a-zA-Z0-9]+\.[a-zA-Z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;
    if (hf == '' || hf == 'undefined') {
        $website.find("." + $name + ' a').attr({ 'data': 'javascript:void(0);' });
    }else if (ret.test(hf)) {
        $website.find("." + $name + ' a').attr({ 'data': $href });
    } else {
        $('#titler').html('请在组件设置中填写正确参数');
        $('#contenter').html('请确保绑定链接无误<br>例如：http://www.domainname.com/index.html<br>避免出现空格等');
        $(".alertdome").trigger("click");
        $datainfo.find("." + name +" .sethref :text").val("");
        $website.find("." + $name + ' a').attr({ 'data': 'javascript:void(0);' });
        return false;
    }
    // sessionStorage.clear();
    // for(var i=0;i<storage.length;i++){
    //     var key=storage.key(i);
    //     console.log(storage[key]);
    // }

    //查询追加banner数量
    var bannum = $('.bannum input[type="number"]').val();
    //清空dom
    $website.find("." + $name + ' .swiper-wrapper').html('');
    //插入新元素
    for (var i = 0; i < bannum; i++) {
        var createobj = $('<div class="swiper-slide"> <input name="" type="file10' + i + '" id="up_FILE10' + i + '" class="imghide bindname" /><img src="" ondblclick="upload(this,10' + i + ',1)" class="uploadimg" /></div>');
        //把div定义为变量createobj
        $(".swiper-wrapper").append(createobj);
        //把createobj这个变量追加到html中的'body'里
        var swiper = new Swiper('.swiper-container', {
            // pagination: '.swiper-pagination',
            // paginationClickable: true,
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',
            // spaceBetween: 30,
            // effect: 'fade',
            // grabCursor: true,
            // autoplay: 2000,
        });
    }



}
//sbm(a) end



//清空组件
function cel(b) {
    var name = $(b).attr('name'); //获取类
    $datainfo.find("." + name).find('input').val("");
    $(".yusubmit").trigger("click");
    // console.log(calvalue);
}

//组件展示控制
function setdatainfo() {
    // $('.banner .sethref').remove();
    //设置字体样式 //加粗 倾斜
    var claname;
    $('.font_style i.icon-bold,.font_style i.icon-italic').toggle(function(event) {
        var style = $(this).attr('value');
        $(this).attr("data", style);
        $(this).css('color', '#000000');
    }, function(event) {
        var style = $(this).attr('value');
        $(this).attr("data", 'inherit');
        $(this).css('color', '#e5e5e5');
    });

    $('.font_style i.alener').toggle(function() {
        $(this).removeClass('icon-align-left icon-align-right');
        $(this).addClass('icon-align-center');
        $(this).attr("data", 'center');
    }, function() {
        $(this).removeClass('icon-align-left icon-align-center');
        $(this).addClass('icon-align-right');
        $(this).attr("data", 'right');
    }, function() {
        $(this).removeClass('icon-align-center icon-align-right');
        $(this).addClass('icon-align-left');
        $(this).attr("data", 'left');
    });


    // 旋转
    // var value2 = 0;
    // $('#wraps li').rotate({ 
    //     bind: {
    //         click: function(){
    //             value2 +=15;
    //             $(this).rotate({
    //                 animateTo: value2
    //             });
    //         }
    //     }
    // });
    //end
};


//获取dom高度 截取页面
function domeheight() {
    var lastlist = $('#website li:last');
    var domehe = lastlist.height();
    var dometop = lastlist.position().top;
    // console.log(domehe);
}

//color
function colpick() {
    $('.ex-color-box').val('');
    $('.ex-color-box').colpick({
            colorScheme: 'dark',
            layout: 'rgbhex',
            color: '000000',
            livePreview: 0,
            onSubmit: function(hsb, hex, rgb, el) {
                $(el).css('background-color', '#' + hex);
                $(el).attr('value', '#' + hex);
                $(el).colpickHide();
            }
        })
        // .css('background-color', '#000000')
}


//链接赋值
function datatype() {
    $('#website li .datahref').each(function() {
        var datatype = $(this).attr("data");
        $(this).attr('href', datatype);
        $(this).attr("data", '');
        // console.log(datatype);
    })
}
