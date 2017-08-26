// yuchuang 
var $funitem = $("#gallery li"),
    $gallery = $("#gallery"),
    $websitelist = $(".website li"),
    $datainfo = $('.datainfo'),
    $website = $("#website"),
    $titler = $('#titler'),
    $yusubmit = $('.yusubmit'),
    $contenter = $('#contenter'),
    $alertdome = $(".alertdome");

var i = 0; //设置一个全局的变量

// function first begin
$(function() {
  
    $datainfo.draggable({
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

    $('#bar .picture,#bar .pencil,#bar .banner').click(function(event) {
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
            str = '<li class="ui-widget-content ui-corner-tr ui-state-default ' + leiname + ' ' + leiname + i + '" name="' + leiname + i + '"><span class="ui-widget-header"></span><div class="maininfo"><div class="swiper-container"><div class="swiper-wrapper"> </div><div class="swiper-pagination"></div> </div></div></li>';
        }



        str2 = '<div class="span12 ' + leiname + ' ' + leiname + i + ' " name="' + leiname + i + '"><div class="portlet box blue"><div class="portlet-title"><div class="caption"><i class="icon-reorder"></i>组件设置</div><i class="icon-trash"></i></div><div class="portlet-body form"><div class="form-horizontal"><div class="control-group"><label class="control-label">宽度</label><div class="controls"><input type="number" min="1" max="320"  placeholder="1~320" class="span6 m-wrap"> <span class="help-inline alertext hide"></span></div></div>  <div class="control-group setheight"><label class="control-label">高度</label><div class="controls"><input type="number" min="1" max="320" class="span6 m-wrap"> <span class="help-inline alertext hide"></span></div></div>    <div class="control-group setfont"><label class="control-label">文字字号</label><div class="controls"><select class="small m-wrap fontsize" tabindex="1"><option value="12">12</option><option value="14">14</option><option value="16">16</option><option value="18">18</option><option value="20">20</option><option value="22">22</option><option value="24">24</option><option value="30">30</option><option value="36">36</option></select></div></div>  <div class="control-group settxt"><label class="control-label">文字样式</label><div class="controls font_style"> <i class="icon-bold" value="bold" data="" title="加粗"></i> <i class="icon-italic" value="italic" data=""  title="倾斜"></i> <i class="icon-align-left alener" data=""  title="对齐方式"></i> </div></div>  <div class="control-group setcol"><label class="control-label">文字颜色</label><div class="controls"><div class="example-ex"><span></span> <input type="text" value="#000000" class="ex-color-box yu_txtcol span6 m-wrap"></div></div></div>   <div class="control-group setbg"><label class="control-label">背景颜色</label><div class="controls"> <div class="example-ex"><span></span> <input type="text" value="#000000" class="ex-color-box yu_bgcol span6 m-wrap"></div></div></div>   <div class="control-group bannum"><label class="control-label">设置页数</label><div class="controls"><input type="number" min="1" max="8" class="span6 m-wrap yu_bannum"></div></div>   <div class="control-group sethref"><label class="control-label">绑定链接</label><div class="controls"><input type="text" class="span6 m-wrap"> <span class="help-inline alertext hide"></span></div></div>  <div class="form-actions"><button type="submit" onclick="sbm(this)" class="btn yusubmit blue" name="' + leiname + i + '">　确定　</button> <button type="button" onclick="cel(this)" class="btn yucancel" name="' + leiname + i + '">清除样式</button></div></div></div></div></div>';
        $("#website ul").append(str);
        $datainfo.append(str2);

        play();
        setdatainfo(); //组件展示控制
    });

    $("#website").droppable({
        activeClass: "ui-state-hover",
        revert: true,
        helper: "clone",
        drop: function(event, ui) {
            //var width = $(this).find('li').width();
            //console.log(width);
        }
    });

    // function first end
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
    //console.log('banner:' + num);

}

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
function subsidiary(){
    //$website clild show 高亮附属
    $website.find('li').click(function() {
        $(".website li").removeClass('select');
        $(this).addClass('select');
        var classnames = $(this).attr('name');
        // console.log(classnames);
        $datainfo.find('.span12').hide();
        $datainfo.find('.' + classnames).show();
    });

    //$website function delete
    $datainfo.find('i.icon-trash').click(function(index) {
        $(this).parents('.span12').remove();
        var classname = $(this).parents('.span12').attr('name');
        // console.log(classname);
        $website.find('.' + classname).remove();
        // $funiotem.has(classname).show();
    });

    $datainfo.find('input').change(function(){
        // console.log($(this).parents('.form-horizontal'));
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
        
    });
    
    $datainfo.find('.fontsize').change(function(){
        // console.log($(this).parents('.form-horizontal'));
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
    });
}



//提交表单后执行 sub begin
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
        alert("请在组件设置中填写正确参数", "组件设置中宽度值超过了容器窗口，建议宽度尺寸320像素以内")
        return false;
    }

    if (!window.sessionStorage) {
        alert("浏览器不支持sessionStorage,请更换'360极速或其他高版本浏览器'");
        return false;
    } else {

        var storage = window.sessionStorage;
        //json 写入数组
        var obj = {
            name: name,
            width: w,
            height: h,
            color: c,
            bgcolor: bg,
            page: p,
            fontsize: f,
            bold: b,
            txtvalue: v,
            italic: it,
            algin: al,
            href: hf,
        };
        var str = JSON.stringify(obj);
        sessionStorage.obj = str;
        //读取
        str = sessionStorage.obj;
        //重新转换为对象
        obj = JSON.parse(str);
    }

    //输出
    localStorage.setItem('key', JSON.stringify(obj));
    var read = JSON.parse(localStorage.getItem('key'));
    console.log(read, read.length);



    $website.find("." + obj.name).css({ 'width': obj.width, 'height': obj.height, 'background-color': obj.bgcolor });
    $website.find("." + obj.name + " .swiper-container").css({ 'height': obj.height });
    $website.find("." + obj.name + " :text").css({ 'color': obj.color, 'fontWeight': obj.bold, 'fontStyle': obj.italic, 'fontSize': obj.fontsize + 'px', 'text-align': obj.algin, }).attr('value', obj.txtvalue);
    $website.find("." + obj.name).attr({ 'pagenumber': obj.page });


    var ret = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
    if (ret.test(obj.href)) {
        $website.find("." + obj.name + ' a').attr({ 'data': obj.href });
    } else if (hf == '' || hf == 'undefined') {
        $website.find("." + obj.name + ' a').attr({ 'data': 'javascript:void(0);' });
    } else {
        alert("请在组件设置中填写正确参数", "请确保绑定链接无误<br>例如：http://www.domainname.com/index.html<br>避免出现空格等");
        $datainfo.find("." + name + " .sethref :text").val("");
        $website.find("." + obj.name + ' a').attr({ 'data': 'javascript:void(0);' });
        return false;
    }
    // sessionStorage.clear();
    localStorage.clear();
    // for(var i=0;i<storage.length;i++){
    //     var key=storage.key(i);
    //     console.log(storage[key]);
    // }

    //查询追加banner数量
    var bannum = $('.bannum input[type="number"]').val();
    //清空banner 下 dom
    $website.find("." + obj.name + ' .swiper-wrapper').html('');
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


//sub end
}



//清空组件
function cel(b) {
    var name = $(b).attr('name'); //获取类
    $datainfo.find("." + name + ' input').val("");
    $datainfo.find("." + name + ' .font_style i').css('color', '');
    $datainfo.find("." + name + ' .yusubmit').trigger("click");
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
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
    }, function(event) {
        var style = $(this).attr('value');
        $(this).attr("data", 'inherit');
        $(this).css('color', '#e5e5e5');
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
    });

    $('.font_style i.alener').toggle(function() {
        $(this).removeClass('icon-align-left icon-align-right');
        $(this).addClass('icon-align-center');
        $(this).attr("data", 'center');
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
    }, function() {
        $(this).removeClass('icon-align-left icon-align-center');
        $(this).addClass('icon-align-right');
        $(this).attr("data", 'right');
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
    }, function() {
        $(this).removeClass('icon-align-center icon-align-right');
        $(this).addClass('icon-align-left');
        $(this).attr("data", 'left');
        var mypatents = $(this).parents('.form-horizontal');
        mypatents.find('.yusubmit').trigger('click');
    });

    //移除多余组件
    $('.pencil .setbg').remove();
    
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

function alert(title, cont) {
    $titler.html(title);
    $contenter.html(cont);
    $alertdome.trigger("click");
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
                obtaincolor(hex,el);
            }
        })
        // .css('background-color', '#000000');
}

//obtaincolor
function obtaincolor(hex,el){
    var colpatents = $(el).parents('.form-horizontal');
    colpatents.find('.yusubmit').trigger('click');
}

