// 于闯
 var  $funitem = $("#gallery li"),
      $gallery = $("#gallery"),
      $set_input = $('.set_text')







  $(function(){
	
    $funitem.each(function(){
        number = $(this).index();
        $(this).attr("name",'list'+number);
        $(this).addClass('list'+number);
        $(this).find('input').attr('name','file'+number); 
        $(this).find('input').attr('id','up_FILE'+number);
        $(this).find('img').attr('ondblclick','upload(this,'+number+',1)');
        // $(this).find('a').attr('class','href'+number);
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



    $funitem.click(function(){
      $(this).fadeOut();
      $(this).find('.icon_selcet').attr('title','移除该模块');
      $("#website ul").append($(this).clone().fadeIn());
      $( "#website li" ).addClass('positionXY');
        $( "#website li" ).draggable({  
          distance: 30 ,
          handle: '',     
          containment: 'parent',
          cursor:'auto',
          opacity: 0.35, 
          snap: '#website',   
          snapMode: 'both',
          snapTolerance:0,
          grid: [2,2]
        });
        resizable(); 
    });

    $("#website").droppable({
        activeClass: "ui-state-hover",
        revert: true, 
        helper: "clone" ,
        drop: function( event, ui ) {
          //
        }
    });
    //end
  });
function resizable(){
    // website li resizable
    // $("#website li" ).resizable({
    //     // animate: true,
    //     // helper: "ui-resizable-helper",
    //     alsoResize:'.maininfo,p',
    //     containment: "#website",
    //     maxHeight: 94,
    //     maxWidth: 320,
    //     minHeight: 94,
    //     minWidth: 94
    // });
    //$gallery function delete & show
    $('#website i.icon_selcet').click(function(index){
      $(this).parent().parent('li').remove();
      var classname = $(this).parent().parent('li').attr('name');
      // console.log(classname);
      $gallery.find('.' + classname).fadeIn();
      $gallery.find('.icon_selcet').attr('title','添加该模块');
      // $funitem.has(classname).show();
    });

   
}
