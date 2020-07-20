function wheel(wins,opts,runOpts){
    // 初始化
    this.init(wins,opts,runOpts);
    // 获取窗口
    this.getWindow();
    // 创建盒子
    this.createBox();
    // 创建轮播列表
    this.createList();
    // 创建按钮
    this.createBtn();
    // 轮播
    // this.move(); 
    // 点击切换
    // this.clickMove();
}
wheel.prototype={
    init(wins,opts,runOpts){
        this.opts=opts;
        var wins=document.querySelector(wins);
        if(!(wins&&wins.nodeType==1)){
            console.error("没有找到窗口元素");
            return ;
        }
        this.wins=this.win=wins;
        // 图片的地址添加一个
        this.opts.imgs.push(opts.imgs[0]);
        // 链接的地址添加一个
        this.opts.links.push(opts.links[0]);
        // 图片的颜色
        this.opts.imgColor.push(opts.imgColor[0]);
        this.imgLength=opts.imgs.length+1;
        if(this.imgLength==0){
            console.error("没有传入相应的轮播内容");
            return;
        }
        this.imgSize=opts.imgSize;
        if(!(this.imgSize instanceof Array)){
            console.error("请传入合法的尺寸类型");
        }
        if(this.imgSize.length==0){
            this.imgSize[0]=document.documentElement.clientWidth;
            this.imgSize[1]=400;
        }
        if(this.imgSize.some(function(val){
            return val==0;
        })){
            for(var i=0;i<2;i++){
                if(this.imgSize[i]==0){
                    this.imgSize[i]=500;
                }
            }
        }
        this.btnColor=opts.btnColor||"green";
        this.btnActive=opts.btnColor||"red";
        this.btnPos=opts.btnPos||["center","20"];
        this.runOpts=runOpts||{};
        this.time=0;
        if(runOpts.time){
            this.time=runOpts.time*1000;
        }else{
            this.time=5000;
        }
        this.eachtime=0;
        if(runOpts.eachTime){
            this.eachTime=runOpts.rachTime*1000;
        }else{
            this.eachTime=500;
        }
        this.runStyle="";
        if(runOpts.runStyle=="linner"||!(runOpts.runStyle)){
            this.runStyle=Tween.Linear;
        }else if(runOpts.runStyle=="in"){
            this.runStyle=Tween.Quad.easeIn;
        }else if(runOpts.runStyle=="out"){
            this.runStyle=Tween.Quad.easeOut;
        }
    },
    getWindow(){
        this.wins.style.cssText="width:100%;height:"+this.imgSize[1]+"px;overflow:hidden;position:relative";
    },
    createBox(){
        this.box=document.createElement("div");
        this.box.style.cssText="width:"+this.imgLength*100+"%;height:100%;border:1px solid red";
        this.wins.appendChild(this.box);
    },
    createList(){
        for(var i=0;i<this.imgLength-1;i++){
            var divList=document.createElement("div");
            divList.style.cssText="float:left;width:${100/this.imgLength}%;height:100%;border:1px solid blue;background:${this.opts.imgColor[i]}";
            var link=document.createElement("a");
            link.href=this.opts.links[i];
            link.style.cssText="width:"+this.imgSize[0]+"px;height:"+this.imgSize[1]+"px;display:block;margin:auto;background:url("+this.opts.imgs[i]+") no-repeat 0 0";
            divList.appendChild(link);
            this.box.appendChild(divList);
        }
    },
    createBtn(){
        var btnBox=document.createElement("div");
        btnBox.style.cssText="width:300px;height:20px;position:absolute;left:0;right:0;margin:auto;bottom:"+this.btnPos[1]+"px";
        this.btns=[];
        for(var i=0;i<this.imgLength-2;i++){
            var bgcolor=(i==0?this.btnActive:this.btnColor);
            var btn=document.createElement("div");
            btn.style.cssText="width:10px;height:10px;background"+bgcolor+";border-radius:50%;margin:0 10px;cursor:pointer;float:left;";
            btnBox.appendChild(btn);
            this.btns.push(btn);
        }
        this.wins.appendChild(btnBox);
    }
        
}