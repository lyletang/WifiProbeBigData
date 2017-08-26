// 于闯
$(function(){
  $('#gallery li').click(function(){
      $("#website ul").append($(this).clone());
        $( "#website li" ).draggable({  
          distance: 30 ,    //只有移动指定像素后才开始激活拖拽动作
          handle: 'h5',     //限制指定元素拖拽
          containment: 'parent',//只允许在指定元素区域内移动
          cursor:'auto',//拖动时鼠标样式
          opacity: 0.35,    //移动时透明度
          snap: '#website',     //元素拖动到其它元素的边缘时，会自动吸附其它元素
          snapMode: 'both',//元素的吸附模式
          snapTolerance:0,//像素其他元素**的距离时，发生吸附的动作
          // delay: 200,       //延时防止误操作200
          // grid: [108, 108], //只能以指定大小的方格进行拖动
          // cancel: 'p',      //防止在指定元素上拖动
          // addClasses: false,//阻止ui-draggable样式加载
          // helper:'clone',   //拖拽元素时的显示方式
          // connectToSortable: 'ul#myList',//允许该元素被拖动到指定元素中,如果使用此选项helper属性必须设置成clone才能正常工作。
          // cursorAt: { left: 10,top: 10},//移动时鼠标定位在的某个位置上
          // revert: 'invalid' ,    //拖拽结束后，回到初始位置
          // revertDuration: 1000, //拖拽结束后，回到初始位置的时间
          // scope: 'tasks',   //设置元素只允许拖拽到具有相同scope值的元素
          // scroll: false,    //元素拖拽至边缘时，父容器将自动滚动
          // scrollSensitivity: 40,//元素拖拽至边缘时，父容器需要滚动的像素
          // stack: { group: 'products', min: 50 },
          // zIndex: 2700,     //拖拽时候改变index数值
        });   
        $("#website li" ).resizable({
        // animate: true,
        containment: "#website",
        maxHeight: 92,
        maxWidth: 320,
        minHeight: 92,
        minWidth: 92
        });
  });

  
   
})
