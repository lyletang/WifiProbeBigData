// 于闯
  $(function() {
            // this
            var $gallery = $( "#gallery" ),   //左侧
                $website = $( "#website" );   //右侧
         
            // 让功能可拖拽
             // $($gallery).sortable();
            $( "li", $gallery ).draggable({
              cancel: "a.ui-icon", // 点击一个图标不会启动拖拽
              revert: "invalid", // 当未被放置时，条目会还原回它的初始位置
              containment: "document",
              helper: "clone", //拖动自身或者克隆 original, clone
              cursor: "move"
            });
         
            // 让dom可放置，接受相册的条目
            $website.droppable({
              accept: "#gallery > li",
              cancel:"ui-corner-tr",
              activeClass: "ui-state-highlight",
              hoverClass: 'drophover',
              drop: function( event, ui ) {
                deletefun( ui.draggable );
              }
            });
            // 让相册可放置，接受回收站的条目
            $gallery.droppable({
              accept: "#website li",
              activeClass: "custom-state-active",
              drop: function( event, ui ) {
                recycleImage( ui.draggable );
              }
            });
         
            // 功能栏移除功能
            var recycle_icon = "<a href='' title='移除功能' class='ui-icon ui-icon-refresh'>移除功能</a>";

            function deletefun( $item ) {  //left li
              $item.fadeOut(function() {   //hide
                var $list = $( "ul", $website ).length ?
                  $( "ul", $website ) :
                  $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $website );
                $item.find( "a.ui-icon-trash" ).remove();
                $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
                  $item.animate({ width: "auto" }); //淡入添加文字
                });
              });
            }
         
            // 图像还原功能
            var trash_icon = "<a href='' title='添加功能' class='ui-icon ui-icon-trash'>添加</a>";
            function recycleImage( $item ) {
              $item.fadeOut(function() {
                $item
                  .find( "a.ui-icon-refresh" )
                    .remove() 
                  .end()//还原图标隐藏
                  .css( "width", "92px")
                  .append( trash_icon )
                  .find( "img" )
                  .css( "height", "92px" )
                  .end()
                  .appendTo( $gallery )
                  .fadeIn();
              });
            }
         
            // 通过事件代理解决图标行为
            $( "ul.gallery > li" ).click(function( event ) {
              var $item = $( this ),
                $target = $( event.target );
         
              if ( $target.is( "a.ui-icon-trash" ) ) {
                deletefun( $item );
              } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
                viewLargerImage( $target );
              } else if ( $target.is( "a.ui-icon-refresh" ) ) {
                recycleImage( $item );
              }
         
              return false;
            });
          });