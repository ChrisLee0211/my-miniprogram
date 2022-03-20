const app = getApp();
Component({
    
    data:{
        article:{}
    },
    methods:{
        onLoad(){
             let content= `### HTTP工作原理

            HTTP协议定义Web客户端如何从Web服务器请求Web页面，以及服务器如何把Web页面传送给客户端。客户端向服务器发送一个请求报文，服务器以一个状态行作为响应。`
        let result = app.towxml(content,'markdown',{
       base:'www.xxx.com',             // 相对资源的base路径
       theme:'light',                   // 主题，默认`light`
      events:{                    // 为元素绑定的事件方法
           tap:(e)=>{
               console.log('h4',e);
           }
       }
   });
   // 更新解析数据
   this.setData({
      article:result
   });
        }
    },
})