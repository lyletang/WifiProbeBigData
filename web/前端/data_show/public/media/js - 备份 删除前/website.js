// 于闯
 var  $funitem = $("#gallery li"),
      $gallery = $("#gallery"),
      $websitelist = $(".website li");

$(function(){
    $funitem.each(function(){
        index = $(this).index();
        $(this).attr("name",'list'+index);
        $(this).addClass('list'+index);
        // $(this).css('z-index',index);
        // var aDom = $funitem;
          // for(var i=0;i<aDom.length;i++){
              // aDom[i].id = 'num' + i;
          // }

        // .draggable( 'disable' );
    });

    $funitem.click(function(){
      $(this).fadeOut();
      $(this).find('.icon_selcet').attr('title','移除该模块');
      $("#website ul").append($(this).clone().fadeIn());
        $( "#website li" ).draggable({  
          addClasses: false, //提高性能
          scroll: true,
          scrollSensitivity:10,
          scrollSpeed: 10, 
          distance: 30 ,
          handle: '',     
          containment: 'parent', //限制父容器移动
          cursor:'auto',
          opacity: 0.35, 
          snap: '#website',   
          snapMode: 'both',
          snapTolerance:0,
          grid: [2,10],
          delay:200

        });
        resizable(); 
        remember();
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
    $("#website li" ).resizable({
        // animate: true,
        // helper: "ui-resizable-helper",
        alsoResize:'', //跟随父容器缩放
        containment: "#website",
        maxHeight:320,
        maxWidth: 320,
        minHeight: 94,
        minWidth: 94,
        
    });
    //$gallery function delete & show
    $('#website i.icon_selcet').click(function(index){
      $(this).parent('li').remove();
      var classname = $(this).parent('li').attr('name');
      // console.log(classname);
      $gallery.find('.' + classname).fadeIn();
      $gallery.find('.icon_selcet').attr('title','添加该模块');
      // $funitem.has(classname).show();
    });
}

function remember(){
  $websitelist.each(function(){
      num = $(this).index();
      console.log(num);
    })
}