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
                this.flag=true;
                switch (this.index){
                    case 0:
                        photoShow();
                        break;
                    case 1:
                        photoHide();
                        break;
                    case 4:
                        photoHide();
                        break
                }
            }, false)

        })


    }
    var photo=document.querySelector(".photo");
    var start=document.querySelector(".start");
    var name =document.querySelector(".name");
    var job=document.querySelector(".job");
    function photoShow() {
        job.id="job";
        start.id="start";
        name.id="text"
        photo.id="";
        photo.id="photo";
    }
    function photoHide() {
        job.id="";
        start.id=""
        photo.id="";
        name.id="";
        photo.style.webkitTransform="translate(0,-1.2rem);";
    }
    document.addEventListener("touchstar",function () {},false);
    photoShow();
}, false)

