(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[0],[,,,,,,function(e,a,t){e.exports={nav:"Navbar_nav__2UV_k",item:"Navbar_item__psXG3",activeLink:"Navbar_activeLink__3Vsg1"}},function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__38gst",dialogsItems:"Dialogs_dialogsItems__1F-1z",active:"Dialogs_active__1JIuo",dialog:"Dialogs_dialog__33mEz",messages:"Dialogs_messages__7SKqO"}},,,,,,,function(e,a,t){e.exports={postsBlock:"MyPosts_postsBlock__1Bz1M",posts:"MyPosts_posts__20llT"}},function(e,a,t){e.exports={mainImage:"ProfileInfo_mainImage__1C5Wq",descriptionBlock:"ProfileInfo_descriptionBlock__1hVfg"}},,,,function(e,a,t){e.exports={header:"Header_header__2I21n"}},,function(e,a,t){e.exports={item:"Post_item__f_ukf"}},function(e,a,t){e.exports=t(34)},,,,,function(e,a,t){},function(e,a,t){},,,,,,function(e,a,t){"use strict";t.r(a);var s=function(e,a){switch(a.type){case"ADD-POST":var t={id:5,message:e.newPostText,likesCount:"28"};return e.posts.push(t),e.newPostText="",e;case"CHANGE-NEW-TEXT":return e.newPostText=a.newText,e;default:return e}},n=function(e,a){switch(a.type){case"UPDATE_NEW_MESSAGE_BODY":return e.newMessageBody=a.body,e;case"SEND_MESSAGE":var t=e.newMessageBody;return e.newMessageBody="",e.messages.push({message:t,id:6}),e;default:return e}},i=function(e,a){return e},r={_state:{profilePage:{posts:[{message:"Hello, how are you doing",likesCount:"10"},{message:"Hay, nothing",likesCount:"25"},{message:"learn React, nigger!",likesCount:"1"}],newPostText:""},dialogsPage:{dialogs:[{name:"Andriy",id:"1"},{name:"Dimych",id:"2"},{name:"Vika",id:"3"},{name:"Alina",id:"4"},{name:"Maxim",id:"5"}],messages:[{message:"Hay",id:1},{message:"How are you?",id:2},{message:"Bye",id:3},{message:"Yo",id:4},{message:"Yo",id:5}],newMessageBody:""},sidebar:{}},_callSubscriber:function(e){},getState:function(){return this._state},subscribe:function(e){this._callSubscriber=e},dispatch:function(e){this._state.dialogsPage=n(this._state.dialogsPage,e),this._state.profilePage=s(this._state.profilePage,e),this._state.sidebar=i(this._state.sidebar,e),this._callSubscriber(this._state)}},c=t(0),l=t.n(c),o=t(18),m=t.n(o),d=(t(27),t(8)),u=t(1),g=(t(28),t(19)),p=t.n(g),E=function(){return l.a.createElement("header",{className:p.a.header},l.a.createElement("img",{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/DC_Comics_logo.png/768px-DC_Comics_logo.png",alt:"avatar"}))},_=t(6),f=t.n(_),v=function(){return l.a.createElement("nav",{className:f.a.nav},l.a.createElement("div",{className:f.a.item},l.a.createElement(d.b,{to:"/profile",activeClassName:f.a.activeLink},"Profile")),l.a.createElement("div",{className:"".concat(f.a.item," ").concat(f.a.active)},l.a.createElement(d.b,{to:"/dialogs",activeClassName:f.a.activeLink},"Message")),l.a.createElement("div",{className:f.a.item},l.a.createElement("a",{href:"#"},"News")),l.a.createElement("div",{className:f.a.item},l.a.createElement("a",{href:"#"},"Music")),l.a.createElement("div",{className:f.a.item},l.a.createElement("a",{href:"#"},"Settings")))},h=t(14),N=t.n(h),k=t(21),b=t.n(k),w=function(e){return l.a.createElement("div",{className:b.a.item},l.a.createElement("img",{src:"https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png",alt:"ava"}),e.message,l.a.createElement("div",null,l.a.createElement("span",null,e.likesCount)))},y=function(e){var a=e.posts.map((function(e){return l.a.createElement(w,{key:e.id,message:e.message,likesCount:e.likesCount})}));return l.a.createElement("div",{className:N.a.postsBlock},l.a.createElement("h3",null,"My posts"),l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("textarea",{value:e.newPostText,onChange:function(a){var t=a.currentTarget.value;e.dispatch(function(e){return{type:"CHANGE-NEW-TEXT",newText:e}}(t))}})),l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){e.dispatch({type:"ADD-POST"})}},"Add post"))),l.a.createElement("div",{className:N.a.posts},a))},P=t(15),x=t.n(P),S=function(){return l.a.createElement("div",null,l.a.createElement("div",{className:x.a.mainImage},l.a.createElement("img",{src:"https://images.pexels.com/photos/302804/pexels-photo-302804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",alt:"image"})),l.a.createElement("div",{className:x.a.descriptionBlock},"ava + description"))},C=function(e){return l.a.createElement("div",null,l.a.createElement(S,null),l.a.createElement(y,{posts:e.profilePage.posts,newPostText:e.profilePage.newPostText,dispatch:e.dispatch}))},T=t(7),D=t.n(T),M=function(e){return l.a.createElement("div",{className:D.a.dialog},e.message)},B=function(e){return l.a.createElement("div",{className:D.a.dialog+" "+D.a.active},l.a.createElement(d.b,{to:"/dialogs/"+e.id},e.name))},A=function(e){var a=e.store.getState().dialogsPage,t=a.dialogs.map((function(e){return l.a.createElement(B,{key:e.id,name:e.name,id:e.id})})),s=a.messages.map((function(e){return l.a.createElement(M,{key:e.id,message:e.message})})),n=a.newMessageBody;return l.a.createElement("div",{className:D.a.dialogs},l.a.createElement("div",{className:D.a.dialogsItems},t),l.a.createElement("div",{className:D.a.messages},l.a.createElement("div",null,s),l.a.createElement("div",null,l.a.createElement("textarea",{value:n,onChange:function(a){var t=a.target.value;e.store.dispatch({type:"UPDATE_NEW_MESSAGE_BODY",body:t})},placeholder:"send message"})),l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){e.store.dispatch({type:"SEND_MESSAGE"})}},"Send Message"))))},I=function(e){return l.a.createElement(d.a,null,l.a.createElement("div",{className:"app-wrapper"},l.a.createElement(E,null),l.a.createElement(v,null),l.a.createElement("div",{className:"app-wrapper-content"},l.a.createElement(u.a,{path:"/dialogs",render:function(){return l.a.createElement(A,{store:e.store})}}),l.a.createElement(u.a,{path:"/profile",render:function(){return l.a.createElement(C,{profilePage:e.state.profilePage,dispatch:e.dispatch})}}))))},G=function(e){m.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(I,{state:e,dispatch:r.dispatch.bind(r),store:r})),document.getElementById("root"))};G(r.getState()),r.subscribe(G)}],[[22,1,2]]]);
//# sourceMappingURL=main.99624fd6.chunk.js.map