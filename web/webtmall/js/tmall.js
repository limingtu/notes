$(function(){
  //轮播图
  var img =  $(".banner .banner-list li");
  //按钮
  var btn = $(".banner .banner-radio a");
  //背景
  var bkg = $(".banner-wrap");

  //初始化参数
  var num = 0;//索引 代表第几个图片
  var tempBtn = btn[num];
  var tempImg = img[num];
  var timer;//计时器
  var timer1;//计时器

  //图片显示
  tempImg.style.display = 'block';
  //按钮选中颜色
  tempBtn.className = 'show';
  for(var i = 0 ; i < btn.length;i++){
    btn[i].index = i;//索引
    btn[i].onmouseover = function(){
      num = this.index;
      show();
    }
  }

  function show(){
    //按钮
    tempBtn.className = '';
		tempBtn = btn[num];
		btn[num].className = 'show';
		//图片
		tempImg.style.display = 'none';
		tempImg = img[num];
		img[num].style.display ='block';
    changecolor(num);
  }

  scroll();
  function scroll(){
    timer1 = setInterval(function(){
      autoScroll();
    },2000);
  }

  function autoScroll() {
      $(".list-con3").find("ul:first").animate({
          marginTop: "-40px"
      },
      500,
      function() {
          $(this).css({
              marginTop: "0px"
          }).find("li:first").appendTo(this);
      });
  }

  //自动播放
  autoplay();
  function autoplay(){
    timer = setInterval(function(){
      show();
      num++;
      if(num==6){
        num = 0;
      }
    },2000);
  }

  btn.mouseover(function(){
    clearInterval(timer);
  });

  btn.mouseout(function(){
    autoplay();
  });

  //轮播图背景颜色
  function changecolor(){
    if(num==0){
      bkg.css("background","#D28B37");
    }else if(num==1){
      bkg.css("background","#E8E8E8");
    }else if(num==2){
      bkg.css("background","#C20001");
    }else if(num==3){
      bkg.css("background","#E8E8E8");
    }else if(num==4){
      bkg.css("background","#FFF1A6");
    }else if(num==5){
      bkg.css("background","#8A7DA8");
    }
  }

  //固定搜索框
  var topnav = $(".top-nav");
  //左边导航
  var leftnav = $(".left-nav");
  var liArry = $(".left-nav li");
  var floor1 = $("#floor1");
  var floor2 = $("#floor2");
  var floor3 = $("#floor3");
  var floor4 = $("#floor4");
  var floor5 = $("#floor5");
  var floor6 = $("#floor6");
  var floor7 = $("#floor7");

  $(window).scroll(function(){
    //窗体滚动像素
    var scrollTop = $(window).scrollTop();
    if(scrollTop >= 1200){
			topnav.css("top","0px");
		}else{
			topnav.css("top","-50px");
		}
    if(scrollTop >= 1100){
      leftnav.css("display","block");
    }else{
      leftnav.css("display","none");
    }
    changeLeftColor(floor1,liArry[1],'#EA5F8D');
    changeLeftColor(floor2,liArry[2],'#0AA6E8');
    changeLeftColor(floor3,liArry[3],'#64C333');
    changeLeftColor(floor4,liArry[4],'#F15453');
    changeLeftColor(floor5,liArry[5],'#19C8A9');
    changeLeftColor(floor6,liArry[6],'#F7A945');
    changeLeftColor(floor7,liArry[7],'#FF0000');
  });

  function changeLeftColor(obj,li,color){
      if(obj[0].getBoundingClientRect().top<= 500 && obj[0].getBoundingClientRect().top >= -obj[0].scrollHeight + 500){
        li.style.background = color;
      }else{
        li.style.background = '';
      }
  	}

    // 直播区轮播图
    var a = $(".live .con-2");
    var li_width = a.find("li").width();
    var margin_right = parseInt(a.find("li").css("margin-right"));
    // console.log(li_width);
    // console.log(margin_right);

    // 右移 3倍li的宽度+3倍的margin-right
    a.find(".next").on("click",function(){
     a.find("ul").animate({"margin-left":-(3*li_width+3*margin_right)},500);
     //左边按钮隐藏
     a.find(".prev").show();
     a.find(".next").hide();
    });

    // 左移 3倍li的宽度+3倍的margin-right
    a.find(".prev").on("click",function(){
      a.find("ul").animate({"margin-left":0},500);
      //右边按钮隐藏
      a.find(".next").show();
      a.find(".prev").hide();
    });

    // 切换图片
    $(".con-start a").hover(function(){
      //hover选中的文字
      var text = $(this).parent()[0].innerText;
      //list中的图片属性
      var img =  $(this).parent().parent().first().css("background-image");
      //直播窗口
      var liveImg = $(".live-con");
      //直播窗口中文字
      var liveDiv = $(".live-con .text");
      liveImg.css("background-image",img);
      liveDiv[0].innerText = text;
    });



 });
