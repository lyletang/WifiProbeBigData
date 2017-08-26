// 于闯
var $funitem = $("#gallery li"),
    $gallery = $("#gallery"),
	$warplist = $('#warp li'),
    $set_input = $('.set_text'),
    $custom = $('.custom');


$(function() {
    var usenum = $warplist.length;
    $funitem.each(function() {
        number = $(this).index() + usenum;
        //$(this).attr("name", 'list' + number);
        //$(this).addClass('list' + number);
        $(this).find('input').attr('name', 'file' + number);
        $(this).find('input').attr('id', 'up_FILE' + number);
        $(this).find('img').attr('ondblclick', 'upload(this,' + number + ',1)');
        // $(this).find('a').attr('class','href'+number);
    });
	$warplist.each(function() {
		var itemlist = $(this).attr('name');
		 console.log(itemlist);
		 if( itemlist == 'list1'){
			$gallery.find('.' + itemlist).hide();
		 }else if( itemlist == 'list2'){
			$gallery.find('.' + itemlist).hide();
		 }else if( itemlist == 'list3'){
			$gallery.find('.' + itemlist).hide();
		 }else if( itemlist == 'list4'){
			$gallery.find('.' + itemlist).hide();
		 }else if( itemlist == 'icon_erma'){
			$gallery.find('.' + itemlist).hide();
		 }
		 



		//$funitem.attr('name',itemlist).hide();
	});

    //文本修改
    // $('.set_input').dblclick(function(){
    //   $(this).next($set_input).show();
    //   $(this).hide();
    // });

    // $set_input.blur(function(){
    //   var inpval = $(this).val(); 
    //   $(this).hide();
    //   $(this).prev().html(inpval).show();
    // });
    
    $('.yusubmit').click(function() {
        var str = $("#urlval").val();
        var ret = /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
        if (ret.test(str)) {
            var urlval = $("input[name='url']").val();
            // console.log('地址：'+ urlval); 
            $('#warp li:last a').attr('data', urlval);
            $('#mask,.datainfo').hide();
        } else {
            $('.alertext').fadeIn();
            setTimeout(
                function() {
                    $('.alertext').fadeOut();
                }, 3000);
        }

    });

    $('.yucancel').click(function() {
        $('#mask,.datainfo').hide();
        var customname = $('#warp li:last').attr('name');
        $gallery.find('.' + customname).fadeIn();
        $('#warp li:last').remove();
    });

    $funitem.click(function() {
        if ($(this).hasClass("custom")) {
            $('#mask').show();
            $('.datainfo').slideDown(200);
        } else {

        };
        $(this).fadeOut();
        $(this).find('.icon_selcet').attr('title', '移除该模块');
        $("#website ul").append($(this).clone().fadeIn());
        $("#website li").addClass('positionXY');
        dragg();
        resizables();
    });

    $("#website").droppable({
        activeClass: "ui-state-hover",
        revert: true,
        helper: "clone",
        drop: function(event, ui) {
            //
        }
    });


    //end
});


function dragg() {
    $("#website li").draggable({
        distance: 30,
        handle: '',
        cursor: 'all-scroll',
        containment: 'parent',
        cursor: 'auto',
        opacity: 0.35,
        snap: '#website',
        snapMode: 'both',
        snapTolerance: 0,
        grid: [2, 10],
    });
}

function resizables() {
    //$gallery function delete & show
    $('#website i.icon_selcet').click(function(index) {
        $(this).parent().parent('li').remove();
        var classname = $(this).parent().parent('li').attr('name');
        // console.log(classname);
        $gallery.find('.' + classname).fadeIn();
        $gallery.find('.icon_selcet').attr('title', '添加该模块');
        // $funitem.has(classname).show();
    });


}

setTimeout(function(){
		$('.loading,#mask').hide();	
	},1000)