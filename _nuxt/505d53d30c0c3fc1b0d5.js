(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{220:function(t,e,n){"use strict";n(31),n(217),n(218),n(24);var l=n(1),r=Object(l.a)({},(function(){var t=this.$createElement;return(this._self._c||t)("div",[this._t("nav"),this._v(" "),this._t("content")],2)}),[],!1,null,null,null).exports,c={name:"tabs-layout"},o={name:"tabs",components:{TabsLayout:Object(l.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"nav-tabs-navigation"},[e("div",{staticClass:"nav-tabs-wrapper"},[this._t("nav")],2)]),this._v(" "),e("div",[this._t("content")],2)])}),[],!1,null,null,null).exports,PillsLayout:r,TabItemContent:{props:["tab"],render:function(t){return t("div",[this.tab.$slots.title||this.tab.title])}}},props:{type:{type:String,default:"",validator:function(t){return-1!==["","primary","info","success","warning","danger","theme1","theme2","theme3","theme4","theme5"].indexOf(t)},description:"Tabs type (primary|info|danger|default|warning|success)"},pills:{type:Boolean,default:!0,description:"Whether tabs are pills"},circle:{type:Boolean,default:!1,description:"Whether tabs are circle"},fill:{type:Boolean,default:!0,description:"Whether to fill each tab"},activeTab:{type:String,default:"",description:"Default active tab name"},tabNavWrapperClasses:{type:[String,Object],default:"",description:"Tab Nav wrapper (div) css classes"},tabNavClasses:{type:[String,Object],default:"",description:"Tab Nav (ul) css classes"},tabNavItemCount:{type:[Number],default:-1,description:"Tab Nav Item (li) col size"},tabContentClasses:{type:[String,Object],default:"",description:"Tab content css classes"},icons:{type:Boolean,description:"Whether tabs should be of icon type (small no text)"},centered:{type:Boolean,description:"Whether tabs are centered"},value:{type:String,description:"Initial value (active tab)"}},provide:function(){return{addTab:this.addTab,removeTab:this.removeTab}},data:function(){return{tabs:[],activeTabIndex:0}},computed:{layoutComponent:function(){return this.pills?"pills-layout":"tabs-layout"},slotData:function(){return{activeTabIndex:this.activeTabIndex,tabs:this.tabs}}},methods:{findAndActivateTab:function(title){var t=this.tabs.find((function(t){return t.title===title}));t&&this.activateTab(t)},activateTab:function(t){this.handleClick&&this.handleClick(t),this.deactivateTabs(),t.active=!0,this.activeTabIndex=this.tabs.findIndex((function(t){return t.active}))},deactivateTabs:function(){this.tabs.forEach((function(t){t.active=!1}))},addTab:function(t){this.activeTab===t.name&&(t.active=!0),this.tabs.push(t)},removeTab:function(t){var e=this.tabs,n=e.indexOf(t);n>-1&&e.splice(n,1)},setTabNavItemClass:function(t,e,n){-1===n&&(n=e.length);var l=[],col=12/n,r=Math.ceil(12/e.length),c=(t+1)%n;return t+1<=(Math.ceil(e.length/n)-1)*n&&l.push("pb-3","pb-lg-0"),0==c?(l.push("pr-0"),e.length-1!==t&&l.push("pr-lg-3")):l.push("pr-3"),l.push("col-"+col,"col-lg-"+r),l.join(" ")}},mounted:function(){var t=this;this.$nextTick((function(){t.value?t.findAndActivateTab(t.value):t.tabs.length>0&&t.activateTab(t.tabs[0])}))},watch:{value:function(t){this.findAndActivateTab(t)}}},d=Object(l.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(t.layoutComponent,{tag:"component"},[n("template",{slot:"nav"},[n("div",{staticClass:"nav-wrapper"},[n("ul",{staticClass:"nav text-center",class:[t.type?"nav-pills-"+t.type:"",t.pills?"nav-pills":"nav-tabs",{"nav-pills-icons":t.icons},{"nav-fill":t.fill},{"nav-pills-circle":t.circle},{"justify-content-center":t.centered},t.tabNavClasses],attrs:{role:"tablist"}},t._l(t.tabs,(function(e,l){return n("li",{key:e.id||e.title,class:["pl-0",t.setTabNavItemClass(l,t.tabs,t.tabNavItemCount)]},[n("a",{staticClass:"nav-link",class:[e.active?t.type?"active bg-"+t.type:"active":t.type?"text-"+t.type:""],attrs:{"data-toggle":"tab",role:"tab",href:"#"+(e.id||e.title),"aria-selected":e.active},on:{click:function(n){return n.preventDefault(),t.activateTab(e)}}},[n("tab-item-content",{attrs:{tab:e}})],1)])})),0)])]),t._v(" "),n("div",{staticClass:"tab-content",class:[t.tabContentClasses],attrs:{slot:"content"},slot:"content"},[t._t("default",null,null,t.slotData)],2)],2)}),[],!1,null,null,null);e.a=d.exports},221:function(t,e,n){"use strict";var l={name:"tab-pane",props:["label","id","title"],inject:["addTab","removeTab"],data:function(){return{active:!1}},mounted:function(){this.addTab(this)},destroyed:function(){this.$el&&this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el),this.removeTab(this)}},r=n(1),component=Object(r.a)(l,(function(){var t=this.$createElement;return(this._self._c||t)("div",{directives:[{name:"show",rawName:"v-show",value:this.active,expression:"active"}],staticClass:"tab-pane fade",class:{"active show":this.active},attrs:{id:this.id||this.label,"aria-expanded":this.active}},[this._t("default")],2)}),[],!1,null,null,null);e.a=component.exports},232:function(t,e){!function(){if("undefined"!=typeof self&&self.Prism&&self.document){var t=/\n(?!$)/g,e=function(element){var e=n(element)["white-space"];if("pre-wrap"===e||"pre-line"===e){var l=element.querySelector("code"),r=element.querySelector(".line-numbers-rows"),c=element.querySelector(".line-numbers-sizer"),o=l.textContent.split(t);c||((c=document.createElement("span")).className="line-numbers-sizer",l.appendChild(c)),c.style.display="block",o.forEach((function(line,t){c.textContent=line||"\n";var e=c.getBoundingClientRect().height;r.children[t].style.height=e+"px"})),c.textContent="",c.style.display="none"}},n=function(element){return element?window.getComputedStyle?getComputedStyle(element):element.currentStyle||null:null};window.addEventListener("resize",(function(){Array.prototype.forEach.call(document.querySelectorAll("pre.line-numbers"),e)})),Prism.hooks.add("complete",(function(n){if(n.code){var code=n.element,pre=code.parentNode;if(pre&&/pre/i.test(pre.nodeName)&&!code.querySelector(".line-numbers-rows")){for(var l=!1,r=/(?:^|\s)line-numbers(?:\s|$)/,element=code;element;element=element.parentNode)if(r.test(element.className)){l=!0;break}if(l){code.className=code.className.replace(r," "),r.test(pre.className)||(pre.className+=" line-numbers");var c,o=n.code.match(t),d=o?o.length+1:1,v=new Array(d+1).join("<span></span>");(c=document.createElement("span")).setAttribute("aria-hidden","true"),c.className="line-numbers-rows",c.innerHTML=v,pre.hasAttribute("data-start")&&(pre.style.counterReset="linenumber "+(parseInt(pre.getAttribute("data-start"),10)-1)),n.element.appendChild(c),e(pre),Prism.hooks.run("line-numbers",n)}}}})),Prism.hooks.add("line-numbers",(function(t){t.plugins=t.plugins||{},t.plugins.lineNumbers=!0})),Prism.plugins.lineNumbers={getLine:function(element,t){if("PRE"===element.tagName&&element.classList.contains("line-numbers")){var e=element.querySelector(".line-numbers-rows"),n=parseInt(element.getAttribute("data-start"),10)||1,l=n+(e.children.length-1);t<n&&(t=n),t>l&&(t=l);var r=t-n;return e.children[r]}}}}}()},233:function(t,e,n){var content=n(234);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(23).default)("2dc2f3ea",content,!0,{sourceMap:!1})},234:function(t,e,n){(e=n(22)(!1)).push([t.i,"pre[class*=language-].line-numbers{position:relative;padding-left:3.8em;counter-reset:linenumber}pre[class*=language-].line-numbers>code{position:relative;white-space:inherit}.line-numbers .line-numbers-rows{position:absolute;pointer-events:none;top:0;font-size:100%;left:-3.8em;width:3em;letter-spacing:-1px;border-right:1px solid #999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.line-numbers-rows>span{pointer-events:none;display:block;counter-increment:linenumber}.line-numbers-rows>span:before{content:counter(linenumber);color:#999;display:block;padding-right:.8em;text-align:right}",""]),t.exports=e},267:function(t,e,n){"use strict";n.r(e);var l=n(220),r=n(221),c=n(230),o=n.n(c),d=(n(232),n(233),n(231),{section1:{getTime:"var startTime = new Date().getTime();\n\n/* Do Anything */\n\nvar endTime = new Date().getTime();\n\nvar result = endTime - startTime;\n\nconsole.log(result);"}}),v={components:{Tabs:l.a,TabPane:r.a},data:function(){return{exCodes:d}},methods:{getPrismHTML:function(code,t){return o.a.highlight(code,o.a.languages[t],t)}},beforeMount:function(){}},h=n(1),component=Object(h.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),t._v(" "),n("div",{staticClass:"py-4"},[n("div",{staticClass:"doc-section",attrs:{id:"section1"}},[n("h2",[t._v("1. 실행시간")]),t._v(" "),n("tabs",{staticClass:"flex-column flex-md-row",attrs:{fill:"",type:"theme4"},scopedSlots:t._u([{key:"default",fn:function(e){e.activeTabIndex;return n("card",{attrs:{shadow:""}},[n("tab-pane",{attrs:{title:"replace"}},[n("h4",[t._v("1) getTime")]),t._v(" "),n("br"),t._v(" "),n("h6",[t._v("- 기본")]),t._v(" "),n("p",{staticClass:"description"},[t._v("\n              간단하게 Date 객체의 getTime() 메소드를 이용하여 두 시점의 millisecond 값을 구하고, "),n("br"),t._v("\n              그 두 시점의 차를 구하면 된다.\n            ")]),t._v(" "),n("pre",{staticClass:"line-numbers"},[n("code",{staticClass:"language-js",domProps:{innerHTML:t._s(t.getPrismHTML(t.exCodes.section1.getTime,"js"))}})])])],1)}}])})],1)])])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"section-shaped my-0"},[n("div",{staticClass:"shape shape-style-1 shape-primary"},[n("span",{staticClass:"span-150"}),t._v(" "),n("span",{staticClass:"span-50"}),t._v(" "),n("span",{staticClass:"span-50"}),t._v(" "),n("span",{staticClass:"span-75"}),t._v(" "),n("span",{staticClass:"span-100"}),t._v(" "),n("span",{staticClass:"span-75"}),t._v(" "),n("span",{staticClass:"span-50"}),t._v(" "),n("span",{staticClass:"span-100"}),t._v(" "),n("span",{staticClass:"span-50"}),t._v(" "),n("span",{staticClass:"span-100"})]),t._v(" "),n("div",{staticClass:"align-items-center"},[n("div",{staticClass:"col px-0"},[n("div",{staticClass:"row justify-content-center align-items-center"},[n("div",{staticClass:"col text-center pt-lg"},[n("h1",{staticClass:"text-white"},[t._v("실행시간")]),t._v(" "),n("p",{staticClass:"lead text-white mt-4 mb-5"},[t._v(" ")])])])])])])}],!1,null,null,null);e.default=component.exports}}]);