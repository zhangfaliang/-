/**
 * Created by Administrator on 2016/4/26.
 */
document.addEventListener("DOMContentLoaded", function () {
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    var desW = 640;
    var scale = 640 / 100;
    if (winW > 640) {
        winW = 640;
    }
    document.documentElement.style.fontSize = winW / scale + "px";
    //得到所有的  var shoolName2
    var shoolName2 = document.querySelectorAll(".shoolName2")
    // 场景搭建
    // 移动距离就是 当前的哥哥或者弟弟 上移动 或者下移动  本身不懂动
    var oLis = document.querySelectorAll(".list>li");
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);

    })
    function start(e) {
        // 保存 y轴 初始的位置 和
        this.startY = e.changedTouches[0].pageY;
        // x轴的初始距离
        this.startX = e.changedTouches[0].pageX;
        this.flag = true;

    }

    function move(e) {
        // 得到 x和y的偏移
        if (!this.flag)return;
        this.flag = false;
        var posiY = e.changedTouches[0].pageY - this.startY;
        var posiX = e.changedTouches[0].pageX - this.startX;
        if (Math.abs(posiX) > Math.abs(posiY)) {// 判断左右的移动是否大于上下的
            return;
        }
        // 判断是否显示哥哥节点或者弟弟节点
        var index = this.index;
        var len = oLis.length;
        if (posiY > 0) {// 显示哥哥节点
            this.pervIndex = index <= 0 ? len - 1 : index - 1;
            // 除了 你本身和他的哥哥或者弟弟 显示意外其他的都隐藏
            fn.call(this);
            oLis[this.pervIndex].style.webkitTransform = "translate(0px," + (-winH + posiY) + "px)"
        } else {// 显示弟弟节点
            this.pervIndex = index >= len - 1 ? 0 : index + 1;
            fn.call(this)
            oLis[this.pervIndex].style.webkitTransform = "translate(0px," + (winH + posiY) + "px)"
        }
        function fn() {
            [].forEach.call(oLis, function () {
                if (arguments[1] !== index) {
                    arguments[0].style.display = "none";
                }
                arguments[0].className = "";
            })
            this.style.zIndex = 0;
            oLis[this.pervIndex].style.zIndex = 8;
            oLis[this.pervIndex].style.display = "block";

        }

        e.preventDefault();

    }

    function end(e) {
        oLis[this.pervIndex].style.webkitTransform = "translate(0px,0px)";
        oLis[this.pervIndex].style.webkitTransition = "1s";
        [].forEach.call(oLis, function () {
            arguments[0].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                this.flag = true;
                switch (this.index) {
                    case 0:
                        photoShow(1);
                        // showLi(0);
                        break;
                    case 1:
                        showLi(1);
                        photoShow(0);
                        break;
                    case 2:
                        showLi(0);
                        liShow3(1)
                        break;
                    case 3:
                        liShow3(0)
                        break;
                    case 4:
                        liShow3(0)
                        photoShow(0);
                        break
                }
            }, false)

        })


    }

    //得到所有的shoolName2

    var photo = document.querySelector(".photo");
    var start = document.querySelector(".start");
    var name = document.querySelector(".name");
    var job = document.querySelector(".job");
    // # li3 显示
    // 得到 我的擅长
    function liShow3(flag) {
        var nblong=document.querySelector(".nblong");
        var initLongAll=document.querySelectorAll(".initLong");
        // 得到p
         var initLongP=document.querySelectorAll(".shangchang");
        // 得到所有的黄线
        var outrtLongAll=document.querySelectorAll(".outrtLong");
        if(flag){
            // 显示
            nblong.style.webkitTransform="translate(0rem,0rem)";
            nblong.style.webkitTransition="translate 2s";
            for(var i=0,len=outrtLongAll.length;i<len;i++){
                outrtLongAll[i].style.webkitTransform="translate(0rem,0rem)";
               /* outrtLongAll[i].style.webkitTransition="translate "+(i*0.3)+"s";
                initLongP[i].id="opcityP"*/
                initLongP[i].id="opcityP"
            }
        }else{
            // 隐藏
            nblong.style.webkitTransition="";
            for(var i=0,len=outrtLongAll.length;i<len;i++){
                initLongP.id=""
                outrtLongAll[i].addEventListener("webkitTransition",function () {

                    outrtLongAll[i].style.webkitTransition="";
                })

            }
        }

    }
    // #li2 显示
    function showLi(flag) {// titleG 的放大缩小
        var titleG = document.querySelector(".titleG");
        //一条线
        var whiteliner = document.querySelector(".whiteliner");
        // start 下面的跳动
        var start1 = document.querySelector(".start1");
        if (flag) {
            //跳动
            start1.id = "start1";
            titleG.id = "titleG";
            // 2
            whiteliner.style.height = "100%";
            whiteliner.style.webkitTransition = "height 2s";
            // 文字移动
            [].forEach.call(shoolName2, function (item, index) {
                /*    ="translate 2s"*/
                item.id = "li2";
                item.style.webkitTransition = "transform " + (parseFloat(item.getAttribute("index")) * 0.5) + "s";

            })
        } else {
            // 跳动
            //跳动
            start1.id="";
            whiteliner.style.height = "10%";
            whiteliner.style.webkitTransition = "";
            // titleG 的放大缩小
            titleG.id = "";
            // 文字移动
            [].forEach.call(shoolName2, function (item, index) {
                item.id = "";
                item.style.webkitTransition = null;

            })
        }

    }
    function photoShow(flag) {
        if (flag) {
            job.id = "job";
            start.id = "start";
            name.id = "text"
            photo.id = "photo";
        } else {
            job.id = "";
            start.id = ""
            photo.id = "";
            name.id = "";
        }

    }




    document.addEventListener("touchstar", function () {
    }, false);
    photoShow(1);
}, false)


