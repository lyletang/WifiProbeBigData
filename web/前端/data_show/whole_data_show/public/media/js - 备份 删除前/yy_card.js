// 于闯
var wrap = $('#containment-wrapper');
var boxheight =wrap.height();
var boxwidth =wrap.width();
var uldome =  boxheight - 84;
// console.log(boxheight);
// console.log(boxwidth);

  $(function() {
    var dragbox = $('#containment-wrapper ul li');
    $( "#draggable1,#draggable2,#draggable4,#draggable5,#draggable6,#draggable7" ).draggable({ 
        // console.log(event);
      containment: "#wrapper_main", //指定拖动范围容器
      cursor:"move",  //拖动时候的鼠标样式
      // cursorAt: { top: 0, left: 0 }, //选中后的距离鼠标的偏移位置
      // hadndle:"p",
      cancel: "p", //指定不可拖动元素
      opacity: 0.7, //拖动时透明度
      scroll: false,   //断定是否滚动
      // helper: function( event ) {
      //   return $( "<div class='ui-widget-content'>I'm a custom helper</div>" );
      // }
      start: function() {
        dragbox.css('border','1px dotted #FF9897')
      },
      drag: function() {
        
        // updateCounterStatus( $drag_counter, counts[ 1 ] );
      },
      stop: function() {
        dragbox.css('border','1px dotted rgba(0,0,0,0)')
      }
      });
    $(function(){
        wrap.find('#wrapper_main').css('height',uldome);
    });

    // $('#up_img_WU_FILE_2').change(function(){
    //       setTimeout(function(){
    //         myupload();
    //       },500);
          
    // });
    // function myupload(){

    //     var imgurl = $('#imgShow_WU_FILE_2').attr("src");
    //     console.log(imgurl);
    //     wrap.find('#wrapper_main').css({'background':'url('+imgurl+')  no-repeat', 'background-size':'100%',});
    // };
    


  })