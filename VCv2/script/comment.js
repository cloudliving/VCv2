/**
 * Created by Lucky on 2016/1/4.
 */
// Date格式化拓展
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


function Comment(options){
    // this.data = data1;
    this.target = document.querySelector("#comment-area");
    this.article = "<img class='avatar' src='src'><div class='wrap'><p class='author'>author</p><p class='content'>content</p><p class='timestamp'>timestamp</p><a class='like'><span class='link-sum'>likes</span><i class='ico-heart'></i></a></div>";
    this.actid = document.querySelector("#comment-area").getAttribute('data-act');
    this.addurl = options.addurl;
    this.likeurl = options.likeurl;
    this.delurl = options.delect;

    var id = this.actid;
    var url = options.qurl;

    $.ajax({
        url:url,
        type:"POST",
        dataType: 'json',
        data:{"id":id},
        async:false,
        success:function(data){
            window.cmtdata = data;
            console.log(data);
        },
        error:function(){

        }
    });
}
Comment.prototype  = {
    constructor:Comment,

    // create DOM
    createEditor:function(){
        // 创建头部
        var data = window.cmtdata,
            target = this.target,
            //h = document.createElement('header'),
            f = document.createElement('form'),
            c = document.createElement('div'),
            face = document.createElement('div'),
            b = document.createElement('button'),
            // 表单按钮字符串
            s = "<div style='padding: 0 15px'><div class='btn-wrap clearfix'><div><a class='btn-big close-form'>返回</a></div><div><input type='submit' class='btn-big submit' value='发布'></div></div></div> ";


        // 赋值
        b.type = "button";
        b.className = "want-button";
        b.innerHTML = "<a href='javascript:'>我要评论</a>";
        c.className = "controller clearfix";
        c.innerHTML = "<button class='face-btn' type='button'><i class='ui-icon-emo'></i></button>";
        face.className = "face-list clearfix";
        for ( var i=1 ; i<25 ; i++ ){
            var temp = i>=10 ? i : "0"+i;
            face.innerHTML += "<div><span code='face"+temp+"'class='face face"+temp+"'></span></div>"
        }
        f.className = "editor-area";
        f.innerHTML = "<div style='position: relative;background: #ffffff;padding: 15px'><p>说说你对这个活动的想法感受吧，还可以获得积分</p><textarea class='editor' cols='30' rows='8' placeholder='发表评论，需要多于5个字'></textarea>" + c.outerHTML + face.outerHTML + "</div>" ;

        f.innerHTML += "<div class='label'><div>匿名 <input  type='checkbox' name='anonymity' id='anonymity' value='1'/><i class='ico-checked '></div></div>";
        f.innerHTML += s;

        // 插入至DOM
        target.appendChild(b);
        target.appendChild(f)
    },

    // 创建Sofa
    createSofa:function(){
        var target = this.target ;
        var section = document.createElement('section');
        section.className = "comment-list-area";
        section.innerHTML = "<header class='caption'>最新评论</header><div class='comment-list'><div class='sofa'><img src='http://cloudliving-img.b0.upaiyun.com/static/Home/VCv2/img/sofa.png'/></div></div>"
        target.appendChild(section);
    },

    // 创建评论
    createComments:function(){
        var list_area = document.createElement('section'),
            list = document.createElement('div'),
            data = window.cmtdata,
            target = this.target,
            comments = data.comment;

        list_area.className = "comment-list-area";
        list.className = "comment-list";

        // 循环评论
        for( var i=0 ; i<comments.length ; i++){
            var item = document.createElement('article'),
                wrap = document.createElement('div'),
                d = comments[i],
                text = d.content.replace(/\[\/\w{6}\]?/g,function(a){
                    return "<span class='face " + a.slice(2,-1) +" '></span>";
                });
                

            item.className = "item";
            item.innerHTML = this.article;
            item.setAttribute('data-id',d.cid);
            item.querySelector(".avatar").src = Number(d.anonymity) ?  "http://www.xiaohehe.net/uploads/allimg/150305/304-1503051H138.png" :    d.avatar;
            item.querySelector(".author").innerHTML = Number(d.anonymity) ?  "匿名" : d.name;
            item.querySelector(".content").innerHTML = text;
            item.querySelector(".timestamp").innerHTML = d.date;
            item.querySelector(".link-sum").innerHTML = d.likes;

            // 添加删除按钮
            if( data.vid == d.aid ){
                item.querySelector('.wrap').innerHTML += "<a class='remove'>删除</a>";
            }

            // 判断是否点赞 
            if (data.liked)
            {
                for( var j=0;j<data.liked.length ; j++ ) {
                    if( data.liked[j].id == d.cid ) {
                         item.querySelector(".like").className +=  " &nbsp; beat" ;
                         break;
                    }
                }
            }
        

            list.appendChild(item);
        }

        list_area.className = "comment-list-area";
        list_area.innerHTML = "<header class='caption'>最新评论</header>" + list.outerHTML;

        target.appendChild(list_area)
    },


    // event ==========================================================================================================

    // 表情栏相关事件
    face:function(){
        var face_btn = $('.face-btn'),
            face_list = $('.face-list'),
            form = $('.editor-area');

        // 打开关闭表情栏
        face_btn.on('tap',function(){
            if( face_btn.hasClass('open') ) {
                face_btn.removeClass('open');
                face_list.fadeOut();
                console.log(1);
            } else {
                console.log(2);
                face_btn.addClass('open');
                face_list.fadeIn();
            }
        });
        form.on('tap',function(e){

            var a = face_list.has(e.target).length == 0;
            var b = face_btn.has(e.target).length == 0;

            if ( a && b  ) {
                face_list.fadeOut();
                face_btn.removeClass('open');
            }
        });


        // 表情点击事件
        face_list.find('div').on('tap',function(){
            var code =  $(this).find('span').attr('code') ;
            document.querySelector(".editor").value += "[/"+code+"]";
        })
    },

    // 表单相关事件
    submit:function(){
        var face_btn = $('.face-btn'),
            face_list = $('.face-list'),
            form = $('.editor-area'),
            textarea = $('.editor'),
            comment_list = $('.comment-list'),
            module = this.article,
            open = $('.want-button'),
            close = $('.close-form'),
            label = $('.label'),
            addurl = this.addurl, // ajax的url
            vid = window.cmtdata.vid, // 评论人的id
            actid = this.actid,// 活动id
            anonymity = null    ; // 匿名


        textarea.on('focus',function(){
            face_btn.removeClass('open');
            face_list.fadeOut();
        });

        // 打开form事件
        open.on('tap',function(){
           form.fadeIn();
        });

        // 关闭form事件
        close.on('tap',function(){
            form.fadeOut();
        });

        // 匿名事件
        label.on('tap',function(e){
            var input = $(this).find('input');
            var i = $(this).find('i');
            if (  input.attr('checked')){
                input.prop('checked',false);
                i.removeClass('checked')
            } else {
                input.prop('checked',true);
                i.addClass('checked')
            }
        });

        // 提交事件
        form.on('submit',function(e){    // 提交 ，此处应换成ajax

            e.preventDefault();

            if( textarea.val().length == 0 ) {
                $.tips({
                    content:"评论不能为空",
                    stayTime:2000
                });
                return false;
            };
            if( textarea.val().length < 5 ) {
                $.tips({
                    content:"发表评论字数需要多于5个字",
                    stayTime:2000
                });
                return false;
            };

            face_btn.removeClass('open');
            face_list.hide();

            console.log(addurl);
            var val = textarea.val()
            var value = val.replace(/\[\/\w{6}\]?/g,function(a){
                return "<span class='face " + a.slice(2,-1) +" '></span>";
            });
            var item = document.createElement('article');
            
            anonymity = $('#anonymity').is(':checked') ?  1 : 0;



            $.ajax({
                url:addurl,
                type:"POST",
                data:{"value":val,"vid":vid,"actid":actid,"anonymity":anonymity},
                async:false,
                success:function(data){
                    
                    console.log(data)

                    item.className = "item";
                    item.innerHTML = module;
                    item.querySelector(".avatar").src = anonymity ? "http://cloudliving-img.b0.upaiyun.com/static/Home/VCv2/img/niming.png" :  data.comment.avatar;
                    item.querySelector(".author").innerHTML =   anonymity ? "匿名"  : data.comment.name;
                    item.setAttribute('data-id',data.comment.id);
                    item.querySelector(".content").innerHTML = value;
                    item.querySelector(".timestamp").innerHTML = "刚刚";
                    item.querySelector(".link-sum").innerHTML = 0;
                    item.querySelector('.wrap').innerHTML += "<a class='remove'>删除</a>";


                    comment_list.prepend(item);
                    $(window).scrollTop(comment_list.offset().top);
                    var temp = $.tips({
                        content:"发布评论成功",
                        stayTime:2000
                    });
                    
                    temp.on("tips:hide",function(){
                        console.log(data.integral);
                        if(data.integral) {
                            $.tips({
                                content:"评论活动，奖励" +data.integral +"积分!",
                                stayTime:2000
                            })
                        }
                        
                    })
                    form.fadeOut();


                    form[0].reset();
                    $('.sofa').remove(); 

                },
                error:function(){
                    $.dialog({
                        title:"提示",
                        content:"评论失败，请重试"
                    })
                }
            });


            
       
        })
    },

    // 删除与点赞
    remove:function(){

        var actid = this.actid;
        var url = this.likeurl;
        var delurl = this.delurl;
        $('.comment-list').on('tap',function(e){
            var target = e.target;
            console.log(target);

            if ( $(target).hasClass('remove') ){  // 删除，此处应发送个请求
                $.dialog({
                    title:"提示",
                    content:"是否删除评论",
                    button:["确认","取消"]
                })
                $('#dialogButton0').tap(function(){
                    var id = $(target).parents('.item').attr('data-id');
                    $.ajax({
                        url:delurl,
                        type:"POST",
                        data:{"id":id},
                        dataType: 'json',
                        async:false,
                        success:function(data){

                            $(target).parents('.item').remove();

                    
                            $.tips({
                                content:"删除成功",
                                stayTime:2000
                            })
                        }
                     
                    })


                })
            }

            if ( $('.comment-list .like').has(target).length>0 ){

                var like = $(target).parent('.like');
                var cid = like.parents('.item').attr('data-id');
                var bool = like.hasClass('beat') ;  
                var type = bool ? 0 : 1 ;  // 0为取消点赞， 1 为点赞
        
                console.log(type);
                console.log(cid);
            





                $.ajax({
                    
                        url:url,
                        type:"POST",
                        dataType: 'json',
                        data:{"type":type,"actid":actid,"cid":cid,vid:window.cmtdata.vid},  // 点赞上传的数据 , type点赞的状态,actid活动的id，cid评论的id，vid点赞人的id
                        async:false,
      

                        success:function(data){
                            console.log(data);
                            if (type){
                            
                                like.addClass('beat');
                                like[0].querySelector('.link-sum').innerHTML = Number(like[0].querySelector('.link-sum').innerHTML) + 1;
                            } else {
                                like.removeClass('beat');
                                like[0].querySelector('.link-sum').innerHTML -= 1;
                            }
                        }

                    });

            
            }
        });

    },

    init:function(){
        this.createEditor();
        if (window.cmtdata.type == 1){
            this.createComments();
        } else {
            this.createSofa();
        }
        this.face();
        this.submit();
        this.remove();
    }
};




