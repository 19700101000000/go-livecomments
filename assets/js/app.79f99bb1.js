(function(t){function e(e){for(var o,a,c=e[0],r=e[1],l=e[2],m=0,d=[];m<c.length;m++)a=c[m],i[a]&&d.push(i[a][0]),i[a]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o]);u&&u(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],o=!0,c=1;c<n.length;c++){var r=n[c];0!==i[r]&&(o=!1)}o&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={app:0},s=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=r;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"17c6":function(t,e,n){"use strict";var o=n("f4f6"),i=n.n(o);i.a},"1c24":function(t,e,n){"use strict";var o=n("7552"),i=n.n(o);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("router-view")},s=[],a={name:"app"},c=a,r=n("2877"),l=Object(r["a"])(c,i,s,!1,null,null,null),u=l.exports,m=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"h-100"},[n("b-row",{staticClass:"align-items-center h-100"},[n("b-col",{staticClass:"mx-auto",attrs:{sm:"6"}},[n("b-card",{staticClass:"text-center",attrs:{title:"LiveComments"}},[n("b-alert",{attrs:{show:t.isError,variant:"danger",dismissible:""},on:{dismissed:function(e){t.isError=!1}}},[t._v("\n          Connection failed.\n        ")]),n("b-button",{attrs:{variant:"outline-primary",size:"sm",disabled:t.isDisabled},on:{click:t.onClickNew}},[t.isDisabled?n("b-spinner",{attrs:{small:""}}):t._e(),t._v("\n          New Live\n        ")],1)],1)],1)],1)],1)},h=[],f=n("bc3a"),b=n.n(f),v={data:function(){return{isDisabled:!1,isError:!1}},methods:{onClickNew:function(){this.isDisabled=!0,window.setTimeout(this.newLive,800)},newLive:function(){var t=this;b.a.get("/api/newlive").then(function(e){t.$store.commit("livekey",e.data.livekey),t.$router.push({path:"/live"})}).catch(function(e){window.console.log(e),t.isError=!0,t.isDisabled=!1})}}},p=v,w=Object(r["a"])(p,d,h,!1,null,null,null),C=w.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"h-100",style:t.styles.liveScreen,attrs:{id:"live-screen"},on:{mousemove:t.onMouseMove}},[n("b-container",{staticClass:"h-100"},[n("b-row",{staticClass:"h-100 align-items-center"},[n("b-col",{staticClass:"text-center mx-auto"},[n("timer",{staticClass:"display-1"})],1)],1),n("b-row",{staticClass:"h-100 mt-0 align-items-center"},[n("b-col",{staticClass:"text-center mx-auto"},[n("b-alert",{attrs:{variant:"danger",show:""}},[t._v("\n          Fail Connection\n        ")])],1)],1)],1),n("live-menu",{style:t.styles.liveScreenMenu,on:{clickDummyComment:t.onClickDummyComment,autoHide:t.onChangeMenuAutoHide}})],1)},y=[],k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"h-100",attrs:{id:"live-screen-menu",fluid:""}},[n("b-row",{staticClass:"h-25 pt-3"},[n("b-col",[n("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.modal-qr",modifiers:{"modal-qr":!0}}],attrs:{variant:"outline-light"}},[n("font-awesome-icon",{attrs:{icon:"qrcode"}})],1),n("b-modal",{staticClass:"text-center",attrs:{id:"modal-qr",centered:"","hide-header":"","hide-footer":""},on:{show:t.onFocusQR,hide:t.onBlurQR}},[n("qrcode-vue",{staticClass:"m-4",attrs:{value:t.qrValue,size:400}})],1)],1),n("b-col",{staticClass:"text-right"},[n("b-button",{attrs:{variant:"outline-light",disabled:""}},[n("font-awesome-icon",{attrs:{icon:"list"}})],1)],1)],1),n("b-row",{staticClass:"h-50 align-items-center"},[n("b-col",{staticClass:"mx-auto text-light",attrs:{sm:"6"}},[n("timer-controller")],1)],1),n("b-row",{staticClass:"h-25 align-items-end pb-3"},[n("b-col",[n("b-button",{attrs:{variant:"outline-light",disabled:""}},[n("font-awesome-icon",{attrs:{icon:"cog"}})],1)],1),n("b-col",{staticClass:"mx-auto text-right"},[n("b-button",{attrs:{variant:"danger"},on:{click:t.onClickDummyComment}},[t._v("\n        Dummy Comment\n      ")])],1)],1)],1)},T=[],x=n("d7b0"),_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card",{staticClass:"bg-transparent text-center",attrs:{"border-variant":"light"}},[n("timer"),n("b-row",[n("b-col",{attrs:{sm:"2"}}),n("b-col",{attrs:{sm:"8"}},[n("b-button",{attrs:{variant:"outline-light"},on:{click:t.onClickToggle}},[t.active?n("font-awesome-icon",{attrs:{icon:"pause"}}):n("font-awesome-icon",{attrs:{icon:"play"}})],1),n("b-button",{staticClass:"ml-3",attrs:{variant:"outline-light"},on:{click:t.onClickStop}},[n("font-awesome-icon",{attrs:{icon:"stop"}})],1)],1),n("b-col",{staticClass:"text-right",attrs:{sm:"2"}},[n("b-button",{attrs:{variant:"outline-light",disabled:""}},[n("font-awesome-icon",{attrs:{icon:"cog"}})],1)],1)],1)],1)},$=[],M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",{staticClass:"timer mb-0"},[t._v(t._s(t.timer))]),n("p",{staticClass:"count"},[t._v(t._s(t.count))])])},S=[],D={computed:{timer:function(){var t=this.$store.state.timer.time,e=this.$store.state.timer.count,n=t-e,o=1e3,i=60*o,s=60*i,a=Math.floor(n/s),c=Math.floor(n%s/i),r=Math.floor(n%i/o);return"".concat("0".concat(a).slice(-2),":").concat("0".concat(c).slice(-2),":").concat("0".concat(r).slice(-2))},count:function(){var t=this.$store.state.timer.count,e=1e3,n=60*e,o=60*n,i=Math.floor(t/o),s=Math.floor(t%o/n),a=Math.floor(t%n/e);return"".concat("0".concat(i).slice(-2),":").concat("0".concat(s).slice(-2),":").concat("0".concat(a).slice(-2))}}},O=D,E=(n("17c6"),Object(r["a"])(O,M,S,!1,null,null,null)),j=E.exports,H={components:{Timer:j},data:function(){return{eventInterval:{countTimer:null}}},computed:{active:function(){return this.$store.state.timer.active}},methods:{onClickToggle:function(){this.$store.commit("activeTimer",!this.active),this.active?this.eventInterval.countTimer=window.setInterval(this.countTimer,1e3):this.clearTimer()},onClickStop:function(){this.eventInterval.countTimer&&this.clearTimer(),this.$store.commit("stopTimer")},countTimer:function(){this.$store.commit("countTimer",1e3),this.$store.state.timer===this.$store.state.count&&(this.$store.commit("activeTimer",!1),this.clearTimer())},clearTimer:function(){window.clearInterval(this.eventInterval.countTimer),this.eventInterval.countTimer=null}}},L=H,I=Object(r["a"])(L,_,$,!1,null,null,null),q=I.exports,N={components:{QrcodeVue:x["a"],TimerController:q},data:function(){return{autoHide:!0,qrValue:"http://".concat(window.location.host,"/comment/").concat(this.$store.state.livekey||"")}},methods:{onClickDummyComment:function(){this.$emit("clickDummyComment")},onFocusQR:function(){this.autoHide=!1,this.$emit("autoHide",this.autoHide)},onBlurQR:function(){this.autoHide=!0,this.$emit("autoHide",this.autoHide)}}},A=N,P=(n("1c24"),Object(r["a"])(A,k,T,!1,null,null,null)),Q=P.exports,F=n("7e3c"),R={components:{LiveMenu:Q,Timer:j},data:function(){return{comments:[],menuAutoHide:!0,eventTimeout:{hideMenu:null},styles:{liveScreen:{backgroundColor:this.$store.state.bgColor},liveScreenMenu:{display:"none",position:"absolute",zIndex:"1",top:"0"}},socket:new F["w3cwebsocket"]("ws://".concat(window.location.host,"/ws/").concat(this.$store.state.livekey))}},methods:{onChangeMenuAutoHide:function(t){window.console.log(t),this.clearTimeout(),this.menuAutoHide=t,this.menuAutoHide&&this.onMouseMove()},onClickDummyComment:function(){this.addComment({comment:"Dummy Comment"})},addComment:function(t){this.comments.push(t);var e=(new Date).getTime(),n=window.document.createTextNode(t.comment),o=window.document.createElement("p");o.className="comment",o.appendChild(n),o.style.top="".concat(e%80,"%"),o.animate([{marginLeft:"100%",widh:"100%"},{marginLeft:"-".concat(t.comment.length,"em"),widh:"100%"}],4e3).onfinish=function(){o.remove()};var i=window.document.getElementById("live-screen");i.appendChild(o)},onMouseMove:function(){var t=this;this.styles.liveScreenMenu.display="block",this.clearTimeout(),this.menuAutoHide&&(this.eventTimeout.hideMenu=window.setTimeout(function(){t.styles.liveScreenMenu.display="none"},2e3))},clearTimeout:function(){window.clearTimeout(this.eventTimeout.hideMenu)}},created:function(){var t=this;this.socket.onmessage=function(e){t.addComment(JSON.parse(e.data))},this.socket.onerror=function(){window.console.log("websocket error")},this.socket.onclose=function(){window.console.log("websocket close")}},destroyed:function(){this.socket.close()}},z=R,B=(n("ba4a"),Object(r["a"])(z,g,y,!1,null,null,null)),J=B.exports,V=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"h-100"},[n("b-row",{staticClass:"align-items-end h-50"},[n("b-col",{staticClass:"mx-auto pb-3"},[n("b-card",{attrs:{title:"Comment Form"}},[n("b-card-text",[n("b-form-input",{attrs:{type:"text",state:t.commentState,disabled:t.isDisabled,placeholder:"your comment"},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}}),n("b-form-text",{staticClass:"text-right"},[t._v("\n            "+t._s(t.comment.length)+"/"+t._s(t.commentLimit)+"\n          ")])],1),n("b-row",[n("b-col",[t.isSending?n("b-spinner",{attrs:{small:"",variant:"primary"}}):t._e()],1),n("b-col",{staticClass:"text-right"},[n("b-button",{staticClass:"ml-2",attrs:{variant:"outline-primary",disabled:!t.commentState||t.isDisabled},on:{click:t.onClickSend}},[t._v("\n              Send\n            ")])],1)],1)],1)],1)],1),n("b-row",{staticClass:"h-50"},[n("b-col",[n("b-alert",{attrs:{show:t.isError,variant:"danger",dismissible:""},on:{dismissed:function(e){t.isError=!1}}},[t._v("\n          Connection failed.\n        ")])],1)],1)],1)},G=[],K={data:function(){return{comment:"",commentLimit:50,isDisabled:!1,isSending:!1,isError:!1,socket:new F["w3cwebsocket"]("ws://".concat(window.location.host,"/ws/").concat(this.$route.params.id))}},computed:{commentState:function(){return this.comment.length>0&&this.comment.length<=this.commentLimit}},methods:{onClickSend:function(){var t=this;this.isDisabled=!0,this.isSending=!0,this.socket.send(this.comment),window.setTimeout(function(){t.isDisabled=!1,t.isSending=!1,t.comment=""},1e3)}},created:function(){this.socket.onerror=function(){window.console.log("websocket error")},this.socket.onclose=function(){window.console.log("websocket close")}}},U=K,W=Object(r["a"])(U,V,G,!1,null,null,null),X=W.exports;o["a"].use(m["a"]);var Y=new m["a"]({mode:"history",routes:[{path:"/",component:C},{path:"/live",component:J},{path:"/comment/:id",component:X}]}),Z=n("2f62");o["a"].use(Z["a"]);var tt=new Z["a"].Store({state:{bgColor:"white",timer:{time:3e5,count:0,active:!1},livekey:null},mutations:{setColor:function(t,e){t.bgColor=e},countTimer:function(t,e){t.timer.count+=e,t.timer.count>=t.timer.time&&(t.timer.count=t.timer.time)},activeTimer:function(t,e){t.timer.active=e},stopTimer:function(t){t.timer.active=!1,t.timer.count=0},livekey:function(t,e){t.livekey=e}}}),et=n("9f7b"),nt=n.n(et);n("f9e3"),n("2dd8");o["a"].use(nt.a);var ot=n("ecee"),it=n("c074"),st=n("ad3d");ot["c"].add(it["a"]),o["a"].component("font-awesome-icon",st["a"]),o["a"].config.productionTip=!1,new o["a"]({router:Y,store:tt,render:function(t){return t(u)}}).$mount("#app")},7552:function(t,e,n){},ba4a:function(t,e,n){"use strict";var o=n("c5a5"),i=n.n(o);i.a},c5a5:function(t,e,n){},f4f6:function(t,e,n){}});
//# sourceMappingURL=app.79f99bb1.js.map