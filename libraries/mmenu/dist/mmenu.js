!function(e){var t={};function n(s){if(t[s])return t[s].exports;var i=t[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(s,i,function(t){return e[t]}.bind(null,i));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var s={hooks:{},navbar:{add:!0,title:"Menu",titleLink:"parent"},slidingSubmenus:!0};var i={classNames:{divider:"Divider",nolistview:"NoListview",nopanel:"NoPanel",panel:"Panel",selected:"Selected",vertical:"Vertical"},language:null,panelNodetype:["ul","ol","div"],screenReader:{closeSubmenu:"Close submenu",openSubmenu:"Open submenu",toggleSubmenu:"Toggle submenu"}};const a=(e,t)=>{"object"!=o(e)&&(e={}),"object"!=o(t)&&(t={});for(let n in t)t.hasOwnProperty(n)&&(void 0===e[n]?e[n]=t[n]:"object"==o(e[n])&&a(e[n],t[n]));return e},o=e=>({}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()),r=()=>"mm-"+l++;let l=0;const m=e=>"mm-clone-"==e.slice(0,9)?e:"mm-clone-"+e,c=e=>"mm-clone-"==e.slice(0,9)?e.slice(9):e,d={},h=(e,t)=>{void 0===d[t]&&(d[t]={}),a(d[t],e)};var p={"Close submenu":"بستن زیرمنو",Menu:"منو","Open submenu":"بازکردن زیرمنو","Toggle submenu":"سوییچ زیرمنو"},u={"Close submenu":"Submenu sluiten",Menu:"Menu","Open submenu":"Submenu openen","Toggle submenu":"Submenu wisselen"},f={"Close submenu":"Fechar submenu",Menu:"Menu","Open submenu":"Abrir submenu","Toggle submenu":"Alternar submenu"},b={"Close submenu":"Закрыть подменю",Menu:"Меню","Open submenu":"Открыть подменю","Toggle submenu":"Переключить подменю"},v={"Close submenu":"Zatvoriť submenu",Menu:"Menu","Open submenu":"Otvoriť submenu","Toggle submenu":"Prepnúť submenu"},g={"Close submenu":"Закрити підменю",Menu:"Меню","Open submenu":"Відкрити підменю","Toggle submenu":"Перемкнути підменю"};const L=e=>{const t=e.split("."),n=document.createElement(t.shift());return n.classList.add(...t),n},_=(e,t)=>t.length?[].slice.call(e.querySelectorAll(t)):[],w=(e,t)=>{const n=Array.prototype.slice.call(e.children);return t?n.filter(e=>e.matches(t)):n},E=(e,t)=>{let n=[],s=e.parentElement;for(;s;)n.push(s),s=s.parentElement;return t?n.filter(e=>e.matches(t)):n},y=e=>e.filter(e=>!e.matches(".mm-hidden")),P=e=>{let t=[];return y(e).forEach(e=>{t.push(...w(e,"a.mm-listitem__text"))}),t.filter(e=>!e.matches(".mm-btn--next"))},S=(e,t,n)=>{e.matches("."+t)&&e.classList.add(n)};let M={};const k=(e,t,n)=>{"number"==typeof e&&(e="(min-width: "+e+"px)"),M[e]=M[e]||[],M[e].push({yes:t,no:n})},x=(e,t)=>{var n=t.matches?"yes":"no";for(let t=0;t<M[e].length;t++)M[e][t][n]()};var T,A,C,N=function(e,t,n){if(!t.has(e))throw new TypeError("attempted to set private field on non-instance");return t.set(e,n),n},O=function(e,t){if(!t.has(e))throw new TypeError("attempted to get private field on non-instance");return t.get(e)};h({"Close submenu":"Untermenü schließen",Menu:"Menü","Open submenu":"Untermenü öffnen","Toggle submenu":"Untermenü wechseln"},"de"),h(p,"fa"),h(u,"nl"),h(f,"pt_br"),h(b,"ru"),h(v,"sk"),h(g,"uk");class j{constructor(e,t,n){return T.set(this,void 0),A.set(this,void 0),C.set(this,void 0),this.opts=a(t,s),this.conf=a(n,i),this._api=["i18n","bind","openPanel","closePanel","setSelected"],this.node={},this.hook={},this.node.menu="string"==typeof e?document.querySelector(e):e,"function"==typeof this._deprecatedWarnings&&this._deprecatedWarnings(),this.trigger("init:before"),this._initObservers(),this._initAddons(),this._initHooks(),this._initAPI(),this._initMenu(),this._initPanels(),this._initOpened(),(()=>{for(let e in M){let t=window.matchMedia(e);x(e,t),t.onchange=n=>{x(e,t)}}})(),this.trigger("init:after"),this}openPanel(e,t=!0,n=!0){if(!e)return;e=e.closest(".mm-panel"),this.trigger("openPanel:before",[e,{animation:t,setfocus:n}]);const s=e.closest(".mm-listitem--vertical");if(s){s.classList.add("mm-listitem--opened");const e=s.closest(".mm-panel");this.openPanel(e)}else{const n=w(this.node.pnls,".mm-panel--opened")[0];e.matches(".mm-panel--parent")&&n&&n.classList.add("mm-panel--highest");const s=["mm-panel--opened","mm-panel--parent"],i=[];t?s.push("mm-panel--noanimation"):i.push("mm-panel--noanimation"),w(this.node.pnls,".mm-panel").forEach(t=>{t.classList.add(...i),t.classList.remove(...s),t!==n&&t.classList.remove("mm-panel--highest"),t===e?t.removeAttribute("inert"):t.setAttribute("inert","true")}),e.classList.add("mm-panel--opened");let a=_(this.node.pnls,"#"+e.dataset.mmParent)[0];for(;a;)a=a.closest(".mm-panel"),a.classList.add("mm-panel--parent"),a=_(this.node.pnls,"#"+a.dataset.mmParent)[0]}this.trigger("openPanel:after",[e,{animation:t,setfocus:n}])}closePanel(e,t=!0,n=!0){if(e&&(e.matches(".mm-panel--opened")||e.parentElement.matches(".mm-listitem--opened"))){if(this.trigger("closePanel:before",[e]),e.parentElement.matches(".mm-listitem--vertical"))e.parentElement.classList.remove("mm-listitem--opened");else if(e.dataset.mmParent){const s=_(this.node.pnls,"#"+e.dataset.mmParent)[0];this.openPanel(s,t,n)}else{const s=w(this.node.pnls,".mm-panel--parent").pop();if(s&&s!==e)this.openPanel(s,t,n);else{const s=w(this.node.pnls,".mm-panel")[0];s&&s!==e&&this.openPanel(s,t,n)}}this.trigger("closePanel:after",[e])}}togglePanel(e){let t="openPanel";(e.parentElement.matches(".mm-listitem--opened")||e.matches(".mm-panel--opened"))&&(t="closePanel"),this[t](e)}setSelected(e){this.trigger("setSelected:before",[e]),_(this.node.menu,".mm-listitem--selected").forEach(e=>{e.classList.remove("mm-listitem--selected")}),e.classList.add("mm-listitem--selected"),this.trigger("setSelected:after",[e])}bind(e,t){this.hook[e]=this.hook[e]||[],this.hook[e].push(t)}trigger(e,t){if(this.hook[e])for(var n=0,s=this.hook[e].length;n<s;n++)this.hook[e][n].apply(this,t)}_initObservers(){N(this,T,new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{e.matches(this.conf.panelNodetype.join(", "))&&this._initListview(e)})})})),N(this,A,new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{this._initListitem(e)})})})),N(this,C,new MutationObserver(e=>{e.forEach(e=>{e.addedNodes.forEach(e=>{(null==e?void 0:e.matches(this.conf.panelNodetype.join(", ")))&&this._initSubPanel(e)})})}))}_initAPI(){const e=this;this.API={},this._api.forEach(t=>{this.API[t]=function(){return e[t].apply(e,arguments)}}),this.node.menu.mmApi=this.API}_initHooks(){for(let e in this.opts.hooks)this.bind(e,this.opts.hooks[e])}_initAddons(){this.trigger("initAddons:before");for(let e in j.addons)j.addons[e].call(this);this.trigger("initAddons:after")}_initMenu(){this.trigger("initMenu:before"),this.node.wrpr=this.node.wrpr||this.node.menu.parentElement,this.node.wrpr.classList.add("mm-wrapper"),this.node.menu.classList.add("mm-menu"),this.node.menu.id=this.node.menu.id||r(),this.node.menu.setAttribute("aria-label",this.i18n(this.opts.navbar.title||"Menu")),this.node.menu.setAttribute("aria-modal","true"),this.node.menu.setAttribute("role","dialog");const e=w(this.node.menu).filter(e=>e.matches(this.conf.panelNodetype.join(", ")));this.node.pnls=L("div.mm-panels"),this.node.menu.append(this.node.pnls),e.forEach(e=>{this._initPanel(e)}),this.trigger("initMenu:after")}_initPanels(){this.trigger("initPanels:before"),this.node.menu.addEventListener("click",e=>{var t,n;const s=(null===(n=null===(t=e.target)||void 0===t?void 0:t.closest("a[href]"))||void 0===n?void 0:n.getAttribute("href"))||"";if("#"===s.slice(0,1))try{const t=_(this.node.menu,s)[0];t&&(e.preventDefault(),this.togglePanel(t))}catch(e){}},{capture:!0}),this.trigger("initPanels:after")}_initPanel(e){var t;if(!e.matches(".mm-panel")&&(S(e,this.conf.classNames.panel,"mm-panel"),S(e,this.conf.classNames.nopanel,"mm-nopanel"),!e.matches(".mm-nopanel"))){if(this.trigger("initPanel:before",[e]),e.id=e.id||r(),e.matches("ul, ol")){const t=L("div");t.id=e.id,e.removeAttribute("id"),[].slice.call(e.classList).filter(e=>"mm-"===e.slice(0,3)).forEach(n=>{t.classList.add(n),e.classList.remove(n)}),Object.keys(e.dataset).filter(e=>"mm"===e.slice(0,2)).forEach(n=>{t.dataset[n]=e.dataset[n],delete e.dataset[n]}),e.before(t),t.append(e),e=t}return e.classList.add("mm-panel"),(null===(t=e.parentElement)||void 0===t?void 0:t.matches(".mm-listitem--vertical"))||this.node.pnls.append(e),this._initNavbar(e),w(e,"ul, ol").forEach(e=>{this._initListview(e)}),O(this,T).observe(e,{childList:!0}),this.trigger("initPanel:after",[e]),e}}_initNavbar(e){if(w(e,".mm-navbar").length)return;let t=null,n=null;if(e.dataset.mmParent)for(t=_(this.node.pnls,"#"+e.dataset.mmParent)[0],n=t.closest(".mm-panel");n.closest(".mm-listitem--vertical");)n=n.parentElement.closest(".mm-panel");if(null==t?void 0:t.matches(".mm-listitem--vertical"))return;this.trigger("initNavbar:before",[e]);const s=L("div.mm-navbar");if(this.opts.navbar.add||s.classList.add("mm-hidden"),n){const e=L("a.mm-btn.mm-btn--prev.mm-navbar__btn");e.href="#"+n.id,e.setAttribute("aria-label",this.i18n(this.conf.screenReader.closeSubmenu)),s.append(e)}let i=null;t?i=w(t,".mm-listitem__text")[0]:n&&(i=_(n,'a[href="#'+e.id+'"]')[0]);const a=L("a.mm-navbar__title");switch(a.tabIndex=-1,a.setAttribute("aria-hidden","true"),this.opts.navbar.titleLink){case"anchor":i&&(a.href=i.getAttribute("href"));break;case"parent":n&&(a.href="#"+n.id)}const o=L("span");var r;o.innerHTML=e.dataset.mmTitle||((r=i)?[].slice.call(r.childNodes).filter(e=>e.nodeType===Node.TEXT_NODE).map(e=>e.nodeValue.trim()).join(" "):"")||this.i18n(this.opts.navbar.title||"Menu"),e.prepend(s),s.append(a),a.append(o),this.trigger("initNavbar:after",[e])}_initListview(e){["htmlulistelement","htmlolistelement"].includes(o(e))&&(e.matches(".mm-listview")||(S(e,this.conf.classNames.nolistview,"mm-nolistview"),e.matches(".mm-nolistview")||(this.trigger("initListview:before",[e]),e.classList.add("mm-listview"),w(e).forEach(e=>{this._initListitem(e)}),O(this,A).observe(e,{childList:!0}),this.trigger("initListview:after",[e]))))}_initListitem(e){["htmllielement"].includes(o(e))&&(e.matches(".mm-listitem")||(S(e,this.conf.classNames.divider,"mm-divider"),e.matches(".mm-divider")||(this.trigger("initListitem:before",[e]),e.classList.add("mm-listitem"),S(e,this.conf.classNames.selected,"mm-listitem--selected"),w(e,"a, span").forEach(e=>{e.classList.add("mm-listitem__text")}),w(e,this.conf.panelNodetype.join(", ")).forEach(e=>{this._initSubPanel(e)}),O(this,C).observe(e,{childList:!0}),this.trigger("initListitem:after",[e]))))}_initSubPanel(e){if(e.matches(".mm-panel"))return;const t=e.parentElement;(e.matches("."+this.conf.classNames.vertical)||!this.opts.slidingSubmenus)&&t.classList.add("mm-listitem--vertical"),t.id=t.id||r(),e.id=e.id||r(),t.dataset.mmChild=e.id,e.dataset.mmParent=t.id;let n=w(t,".mm-btn")[0];n||(n=L("a.mm-btn.mm-btn--next.mm-listitem__btn"),w(t,"a, span").forEach(e=>{e.matches("span")?(n.classList.add("mm-listitem__text"),n.innerHTML=e.innerHTML,t.insertBefore(n,e.nextElementSibling),e.remove()):t.insertBefore(n,e.nextElementSibling)}),n.setAttribute("aria-label",this.i18n(this.conf.screenReader[t.matches(".mm-listitem--vertical")?"toggleSubmenu":"openSubmenu"]))),n.href="#"+e.id,this._initPanel(e)}_initOpened(){this.trigger("initOpened:before");const e=_(this.node.pnls,".mm-listitem--selected").pop();let t=w(this.node.pnls,".mm-panel")[0];e&&(this.setSelected(e),t=e.closest(".mm-panel")),this.openPanel(t,!1,!1),this.trigger("initOpened:after")}i18n(e){return((e,t)=>"string"==typeof t&&void 0!==d[t]&&d[t][e]||e)(e,this.conf.language)}static i18n(e={},t=""){if(!e||!t)return d;h(e,t)}}T=new WeakMap,A=new WeakMap,C=new WeakMap,j.addons={},j.node={},j.vars={};var H={use:!0,position:"left"};var q={clone:!1,menu:{insertMethod:"append",insertSelector:"body"},page:{nodetype:"div",selector:null,noSelector:[]},screenReader:{closeMenu:"Close menu",openMenu:"Open menu"}};const I=["left","left-front","right","right-front","top","bottom"];j.prototype.open=function(){this.node.menu.matches(".mm-menu--opened")||(this.trigger("open:before"),this.node.wrpr.classList.add("mm-wrapper--opened","mm-wrapper--position-"+this.opts.offCanvas.position),this.node.menu.classList.add("mm-menu--opened"),this.node.menu.removeAttribute("inert"),j.node.blck.removeAttribute("inert"),j.node.page.setAttribute("inert","true"),this.node.open=document.activeElement,this.trigger("open:after"))},j.prototype.close=function(){var e;if(!this.node.menu.matches(".mm-menu--opened"))return;this.trigger("close:before"),this.node.wrpr.classList.remove("mm-wrapper--opened","mm-wrapper--position-"+this.opts.offCanvas.position),this.node.menu.classList.remove("mm-menu--opened"),this.node.menu.setAttribute("inert","true"),j.node.blck.setAttribute("inert","true"),j.node.page.removeAttribute("inert");null===(e=this.node.open||document.querySelector(`[href="#${this.node.menu.id}"]`)||null)||void 0===e||e.focus(),document.body.scrollLeft=0,document.documentElement.scrollLeft=0,this.trigger("close:after")},j.prototype.setPage=function(e){const t=this.conf.offCanvas;if(!e){let n="string"==typeof t.page.selector?_(document.body,t.page.selector):w(document.body,t.page.nodetype);if(n=n.filter(e=>!e.matches(".mm-menu, .mm-wrapper__blocker")),t.page.noSelector.length&&(n=n.filter(e=>!e.matches(t.page.noSelector.join(", ")))),n.length>1){let e=L("div");n[0].before(e),n.forEach(t=>{e.append(t)}),n=[e]}e=n[0]}this.trigger("setPage:before",[e]),e.classList.add("mm-page","mm-slideout"),e.id=e.id||r(),j.node.blck.setAttribute("href","#"+e.id),j.node.page=e,this.trigger("setPage:after",[e])};var B={fix:!0};const R="ontouchstart"in window||!!navigator.msMaxTouchPoints||!1;const D=["light","dark","white","black","light-contrast","dark-contrast","white-contrast","black-contrast"];j.prototype.theme=function(e=null){const t=this.opts.theme;if(!e)return t;D.includes(e)&&(this.node.menu.classList.remove("mm-menu--theme-"+t),this.node.menu.classList.add("mm-menu--theme-"+e),this.opts.theme=e)};var $={close:!1,open:!1};var F={add:!1};var Z={use:!1,top:[],bottom:[],position:"left",type:"default"};var W={add:!1,blockPanel:!0,visible:3};var z={breadcrumbs:{separator:"/",removeFirst:!1}};function V(){this.opts.navbars=this.opts.navbars||[],this.conf.navbars=this.conf.navbars||{},a(this.conf.navbars,z);let e=this.opts.navbars;if(void 0!==e&&(e instanceof Array||(e=[e]),e.length)){var t={};e.forEach(e=>{if(!(e=function(e){return"boolean"==typeof e&&e&&(e={}),"object"!=typeof e&&(e={}),void 0===e.content&&(e.content=["prev","title"]),e.content instanceof Array||(e.content=[e.content]),void 0===e.use&&(e.use=!0),e}(e)).use)return;const n=L("div.mm-navbar");let{position:s}=e;"bottom"!==s&&(s="top"),t[s]||(t[s]=L("div.mm-navbars.mm-navbars--"+s)),t[s].append(n);for(let t=0,s=e.content.length;t<s;t++){const s=e.content[t];if("string"==typeof s){const e=V.navbarContents[s];if("function"==typeof e)e.call(this,n);else{let e=L("span");e.innerHTML=s;const t=w(e);1==t.length&&(e=t[0]),n.append(e)}}else n.append(s)}if("string"==typeof e.type){const t=V.navbarTypes[e.type];"function"==typeof t&&t.call(this,n)}let i=()=>{n.classList.remove("mm-hidden")},a=()=>{n.classList.add("mm-hidden")};"boolean"==typeof e.use?this.bind("initMenu:after",i):k(e.use,i,a)}),this.bind("initMenu:after",()=>{for(let e in t)this.node.pnls["bottom"==e?"after":"before"](t[e])})}}V.navbarContents={breadcrumbs:function(e){var t=L("div.mm-navbar__breadcrumbs");e.append(t),this.bind("initNavbar:after",e=>{if(!e.querySelector(".mm-navbar__breadcrumbs")){w(e,".mm-navbar")[0].classList.add("mm-hidden");for(var t=[],n=L("span.mm-navbar__breadcrumbs"),s=e,i=!0;s;){if(!(s=s.closest(".mm-panel")).parentElement.matches(".mm-listitem--vertical")){let e=_(s,".mm-navbar__title span")[0];if(e){let n=e.textContent;n.length&&t.unshift(i?`<span>${n}</span>`:`<a \n                                    href="#${s.id}" \n                                    title="${this.i18n(this.conf.screenReader.openSubmenu)}"\n                                    >${n}</a>`)}i=!1}s=_(this.node.pnls,"#"+s.dataset.mmParent)[0]}this.conf.navbars.breadcrumbs.removeFirst&&t.shift(),n.innerHTML=t.join('<span class="mm-separator">'+this.conf.navbars.breadcrumbs.separator+"</span>"),w(e,".mm-navbar")[0].append(n)}}),this.bind("openPanel:before",e=>{var n=e.querySelector(".mm-navbar__breadcrumbs");t.innerHTML=n?n.innerHTML:""})},close:function(e){const t=L("a.mm-btn.mm-btn--close.mm-navbar__btn");t.setAttribute("aria-label",this.i18n(this.conf.offCanvas.screenReader.closeMenu)),e.append(t),this.bind("setPage:after",e=>{t.href="#"+e.id})},prev:function(e){let t=L("a.mm-btn.mm-hidden");e.append(t),this.bind("initNavbar:after",e=>{w(e,".mm-navbar")[0].classList.add("mm-hidden")}),this.bind("openPanel:before",e=>{if(e.parentElement.matches(".mm-listitem--vertical"))return;t.classList.add("mm-hidden");const n=e.querySelector(".mm-navbar__btn.mm-btn--prev");if(n){const e=n.cloneNode(!0);t.after(e),t.remove(),t=e}})},searchfield:function(e){let t=L("div.mm-navbar__searchfield");t.id=r(),e.append(t),this.opts.searchfield=this.opts.searchfield||{},this.opts.searchfield.add=!0,this.opts.searchfield.addTo="#"+t.id},title:function(e){let t=L("a.mm-navbar__title");e.append(t),this.bind("openPanel:before",e=>{if(e.parentElement.matches(".mm-listitem--vertical"))return;const n=e.querySelector(".mm-navbar__title");if(n){const e=n.cloneNode(!0);t.after(e),t.remove(),t=e}})}},V.navbarTypes={tabs:function(e){function t(n){const s=w(e,`.mm-navbar__tab[href="#${n.id}"]`)[0];if(s)s.classList.add("mm-navbar__tab--selected"),s.ariaExpanded="true";else{const e=_(this.node.pnls,"#"+n.dataset.mmParent)[0];e&&t.call(this,e.closest(".mm-panel"))}}e.classList.add("mm-navbar--tabs"),e.closest(".mm-navbars").classList.add("mm-navbars--has-tabs"),w(e,"a").forEach(e=>{e.classList.add("mm-navbar__tab")}),this.bind("openPanel:before",n=>{w(e,"a").forEach(e=>{e.classList.remove("mm-navbar__tab--selected"),e.ariaExpanded="false"}),t.call(this,n)}),this.bind("initPanels:after",()=>{e.addEventListener("click",e=>{var t,n,s;const i=null===(n=null===(t=e.target)||void 0===t?void 0:t.closest(".mm-navbar__tab"))||void 0===n?void 0:n.getAttribute("href");try{null===(s=_(this.node.pnls,i+".mm-panel")[0])||void 0===s||s.classList.add("mm-panel--noanimation")}catch(e){}},{capture:!0})})}};var U={scroll:!1,update:!1};var Y={scrollOffset:0,updateOffset:50};var G={add:!1,addTo:"panels",noResults:"No results found.",placeholder:"Search",search:!0,searchIn:"panels",splash:"",title:"Search"};var K={cancel:!0,clear:!0,form:{},input:{},panel:{},submit:!1},X={cancel:"انصراف","Cancel searching":"لغو جستجو","Clear searchfield":"پاک کردن فیلد جستجو","No results found.":"نتیجه‌ای یافت نشد.",Search:"جستجو"},J={cancel:"annuleren","Cancel searching":"Zoeken annuleren","Clear searchfield":"Zoekveld leeg maken","No results found.":"Geen resultaten gevonden.",Search:"Zoeken"},Q={cancel:"cancelar","Cancel searching":"Cancelar pesquisa","Clear searchfield":"Limpar campo de pesquisa","No results found.":"Nenhum resultado encontrado.",Search:"Buscar"},ee={cancel:"отменить","Cancel searching":"Отменить поиск","Clear searchfield":"Очистить поле поиска","No results found.":"Ничего не найдено.",Search:"Найти"},te={cancel:"zrušiť","Cancel searching":"Zrušiť vyhľadávanie","Clear searchfield":"Vymazať pole vyhľadávania","No results found.":"Neboli nájdené žiadne výsledky.",Search:"Vyhľadávanie"},ne={cancel:"скасувати","Cancel searching":"Скасувати пошук","Clear searchfield":"Очистити поле пошуку","No results found.":"Нічого не знайдено.",Search:"Пошук"};h({cancel:"abbrechen","Cancel searching":"Suche abbrechen","Clear searchfield":"Suchfeld löschen","No results found.":"Keine Ergebnisse gefunden.",Search:"Suche"},"de"),h(X,"fa"),h(J,"nl"),h(Q,"pt_br"),h(ee,"ru"),h(te,"sk"),h(ne,"uk");const se=function(){const e=this.opts.searchfield,t=this.conf.searchfield;let n=w(this.node.pnls,".mm-panel--search")[0];return n||(n=L("div.mm-panel--search"),de(n,t.panel),e.title.length&&(n.dataset.mmTitle=this.i18n(e.title)),n.append(L("ul")),this._initPanel(n),n)},ie=function(e){const t=this.opts.searchfield;if(e.matches(t.addTo)){const t=e.matches(".mm-panel--search");if(!_(e,".mm-searchfield").length){const n=ae.call(this,t);t&&n.classList.add("mm-searchfield--cancelable"),e.prepend(n),oe.call(this,n)}}if(t.splash.length&&e.matches(".mm-panel--search")&&!_(e,".mm-panel__splash").length){const n=L("div.mm-panel__splash");n.innerHTML=t.splash,e.append(n)}if(t.noResults.length&&!_(e,".mm-panel__noresults").length){const n=L("div.mm-panel__noresults");n.innerHTML=this.i18n(t.noResults),e.append(n)}},ae=function(e=!1){const t=this.opts.searchfield,n=this.conf.searchfield,s=L("form.mm-searchfield");de(s,n.form);const i=L("div.mm-searchfield__input");s.append(i);const a=L("input");if(i.append(a),a.type="text",a.autocomplete="off",a.placeholder=this.i18n(t.placeholder),a.setAttribute("aria-label",this.i18n(t.placeholder)),de(a,n.input),n.submit){const e=L("button.mm-btnreset.mm-btn.mm-btn--next.mm-searchfield__btn");e.type="submit",i.append(e)}else if(n.clear){const e=L("button.mm-btnreset.mm-btn.mm-btn--close.mm-searchfield__btn");e.type="reset",e.setAttribute("aria-label",this.i18n("Clear searchfield")),i.append(e),s.addEventListener("reset",()=>{window.requestAnimationFrame(()=>{a.dispatchEvent(new Event("input"))})})}if(n.cancel&&e){const e=L("a.mm-searchfield__cancel");e.href="#",e.setAttribute("aria-label",this.i18n("Cancel searching")),e.textContent=this.i18n("cancel"),s.append(e),e.addEventListener("click",e=>{e.preventDefault(),this.closePanel(w(this.node.pnls,".mm-panel--search")[0],!1)})}return s},oe=function(e){const t=this.opts.searchfield,n=e.closest(".mm-panel")||_(this.node.pnls,".mm-panel--search")[0],s=_(e,"input")[0];let i=n.matches(".mm-panel--search")?w(this.node.pnls,t.searchIn):[n];i=i.filter(e=>!e.matches(".mm-panel--search"));const a=()=>{const a=s.value.toLowerCase().trim();if(a.length?e.classList.add("mm-searchfield--searching"):e.classList.remove("mm-searchfield--searching"),!t.search)return;const o=[];if(i.forEach(e=>{e.scrollTop=0,o.push(..._(e,".mm-listitem"))}),a.length){this.trigger("search:before"),n.classList.add("mm-panel--searching"),o.forEach(e=>{const t=w(e,".mm-listitem__text")[0];var n;(!t||(n=t,[].slice.call(n.childNodes).filter(e=>!e.ariaHidden).map(e=>e.textContent).join(" ")).toLowerCase().indexOf(a)>-1)&&(e.dataset.mmSearchresult=a)});let e=0;e=n.matches(".mm-panel--search")?re(n,a,i):me(a,i),n.classList[0==e?"add":"remove"]("mm-panel--noresults"),this.trigger("search:after")}else this.trigger("clear:before"),n.classList.remove("mm-panel--searching","mm-panel--noresults"),n.matches(".mm-panel--search")?(le(n),t.splash||this.closePanel(n,!1,!1)):ce(i),this.trigger("clear:after")};s.addEventListener("input",a),a()},re=(e,t,n)=>{const s=_(e,".mm-listview")[0];s.innerHTML="";let i=0;return n.forEach(e=>{const n=_(e,`[data-mm-searchresult="${t}"]`);if(i+=n.length,n.length){const t=_(e,".mm-navbar__title")[0];if(t){const e=L("li.mm-divider");e.innerHTML=t.innerHTML,s.append(e)}n.forEach(e=>{const t=e.cloneNode(!0);s.append(t)})}}),_(s,".mm-panel").forEach(e=>{e.remove()}),["id","data-mm-parent","data-mm-child"].forEach(e=>{_(s,`[${e}]`).forEach(t=>{t.removeAttribute(e)})}),_(s,".mm-listitem--opened").forEach(e=>{e.classList.remove("mm-listitem--opened")}),i},le=e=>{_(e,".mm-listview")[0].innerHTML=""},me=(e,t)=>{let n=0;return t.forEach(t=>{const s=_(t,`[data-mm-searchresult="${e}"]`);n+=s.length,s.length&&s.forEach(t=>{const n=((e,t)=>{let n=[],s=e.previousElementSibling;for(;s;)t&&!s.matches(t)||n.push(s),s=s.previousElementSibling;return n})(t,".mm-divider")[0];n&&(n.dataset.mmSearchresult=e)}),_(t,".mm-listitem, .mm-divider").forEach(t=>{t.classList.add("mm-hidden"),t.dataset.mmSearchresult===e&&[t,...E(t,".mm-listitem")].forEach(e=>{e.classList.remove("mm-hidden")})})}),n},ce=e=>{e.forEach(e=>{_(e,".mm-listitem, .mm-divider").forEach(e=>{e.classList.remove("mm-hidden")})})},de=(e,t)=>{t&&Object.keys(t).forEach(n=>{e[n]=t[n]})};var he={add:!1,addTo:"panels"};var pe={current:!0,hover:!1,parent:!1};var ue={collapsed:{use:!1},expanded:{use:!1,initial:"open"}};
/*!
 * mmenu.js
 * mmenujs.com
 *
 * Copyright (c) Fred Heusschen
 * frebsite.nl
 */
j.addons={offcanvas:function(){this.opts.offCanvas=this.opts.offCanvas||{},this.conf.offCanvas=this.conf.offCanvas||{};const e=a(this.opts.offCanvas,H),t=a(this.conf.offCanvas,q);e.use&&(I.includes(e.position)||(e.position=I[0]),this._api.push("open","close","setPage","position"),this.bind("initMenu:before",()=>{t.clone&&(this.node.menu=this.node.menu.cloneNode(!0),this.node.menu.id&&(this.node.menu.id=m(this.node.menu.id)),_(this.node.menu,"[id]").forEach(e=>{e.id=m(e.id)})),this.node.wrpr=document.querySelector(t.menu.insertSelector),this.node.wrpr[t.menu.insertMethod](this.node.menu)}),j.node.blck||this.bind("initMenu:before",()=>{const e=L("a.mm-wrapper__blocker.mm-blocker.mm-slideout");e.id=r(),e.setAttribute("aria-label",this.i18n(t.screenReader.closeMenu)),e.setAttribute("inert","true"),document.querySelector(t.menu.insertSelector).append(e),j.node.blck=e}),this.bind("initMenu:after",()=>{this.setPage(j.node.page),this.node.menu.classList.add("mm-menu--offcanvas"),this.node.menu.setAttribute("inert","true"),I.includes(e.position)&&(this.node.wrpr.classList.add("mm-wrapper--position-"+e.position),this.node.menu.classList.add("mm-menu--position-"+e.position));let t=window.location.hash;if(t){let e=c(this.node.menu.id);e&&e==t.slice(1)&&setTimeout(()=>{this.open()},1e3)}}),document.addEventListener("click",e=>{var t;switch(null===(t=e.target.closest("a"))||void 0===t?void 0:t.getAttribute("href")){case"#"+c(this.node.menu.id):e.preventDefault(),this.open();break;case"#"+c(j.node.page.id):e.preventDefault(),this.close()}}),document.addEventListener("keyup",e=>{"Escape"==e.key&&this.close()}))},scrollBugFix:function(){if(!R||!this.opts.offCanvas.use)return;this.opts.scrollBugFix=this.opts.scrollBugFix||{};if(!a(this.opts.scrollBugFix,B).fix)return;const e=(e=>{let t="",n=null;return e.addEventListener("touchstart",e=>{1===e.touches.length&&(t="",n=e.touches[0].pageY)}),e.addEventListener("touchend",e=>{0===e.touches.length&&(t="",n=null)}),e.addEventListener("touchmove",e=>{if(t="",n&&1===e.touches.length){const s=e.changedTouches[0].pageY;s>n?t="down":s<n&&(t="up"),n=s}}),{get:()=>t}})(this.node.menu);this.node.menu.addEventListener("scroll",e=>{e.preventDefault(),e.stopPropagation()},{passive:!1}),this.node.menu.addEventListener("touchmove",t=>{let n=t.target.closest(".mm-panel, .mm-iconbar__top, .mm-iconbar__bottom");n&&n.closest(".mm-listitem--vertical")&&(n=E(n,".mm-panel").pop()),n?(n.scrollHeight===n.offsetHeight||0==n.scrollTop&&"down"==e.get()||n.scrollHeight==n.scrollTop+n.offsetHeight&&"up"==e.get())&&t.stopPropagation():t.stopPropagation()},{passive:!1}),this.bind("open:after",()=>{var e=w(this.node.pnls,".mm-panel--opened")[0];e&&(e.scrollTop=0)}),window.addEventListener("orientationchange",e=>{var t=w(this.node.pnls,".mm-panel--opened")[0];t&&(t.scrollTop=0,t.style["-webkit-overflow-scrolling"]="auto",t.style["-webkit-overflow-scrolling"]="touch")})},theme:function(){this.opts.theme=this.opts.theme||"light";const e=this.opts.theme;D.includes(e)||(this.opts.theme=D[0]),this._api.push("theme"),this.bind("initMenu:after",()=>{this.theme(this.opts.theme)})},backButton:function(){if(this.opts.backButton=this.opts.backButton||{},!this.opts.offCanvas.use)return;const e=a(this.opts.backButton,$),t="#"+this.node.menu.id;if(e.close){var n=[];const e=()=>{n=[t],w(this.node.pnls,".mm-panel--opened, .mm-panel--parent").forEach(e=>{n.push("#"+e.id)})};this.bind("open:after",()=>{history.pushState(null,document.title,t)}),this.bind("open:after",e),this.bind("openPanel:after",e),this.bind("close:after",()=>{n=[],history.back(),history.pushState(null,document.title,location.pathname+location.search)}),window.addEventListener("popstate",e=>{if(this.node.menu.matches(".mm-menu--opened")&&n.length){var s=(n=n.slice(0,-1))[n.length-1];s==t?this.close():(this.openPanel(this.node.menu.querySelector(s)),history.pushState(null,document.title,t))}})}e.open&&window.addEventListener("popstate",e=>{this.node.menu.matches(".mm-menu--opened")||location.hash!=t||this.open()})},counters:function(){this.opts.counters=this.opts.counters||{};if(!a(this.opts.counters,F).add)return;const e=e=>{const t=this.node.pnls.querySelector("#"+e.dataset.mmParent);if(!t)return;const n=t.querySelector(".mm-counter");if(!n)return;const s=[];w(e,".mm-listview").forEach(e=>{s.push(...w(e,".mm-listitem"))}),n.innerHTML=y(s).length.toString()},t=new MutationObserver(t=>{t.forEach(t=>{"class"==t.attributeName&&e(t.target.closest(".mm-panel"))})});this.bind("initListview:after",t=>{const n=t.closest(".mm-panel"),s=this.node.pnls.querySelector("#"+n.dataset.mmParent);if(!s)return;const i=w(s,".mm-btn")[0];if(i){if(!w(i,".mm-counter").length){const e=L("span.mm-counter");e.setAttribute("aria-hidden","true"),i.prepend(e)}e(n)}}),this.bind("initListitem:after",e=>{const n=e.closest(".mm-panel");if(!n)return;this.node.pnls.querySelector("#"+n.dataset.mmParent)&&t.observe(e,{attributes:!0})})},iconbar:function(){this.opts.iconbar=this.opts.iconbar||{};const e=a(this.opts.iconbar,Z);if(!e.use)return;let t;if(["top","bottom"].forEach((n,s)=>{let i=e[n];"array"!=o(i)&&(i=[i]);const a=L("div.mm-iconbar__"+n);for(let e=0,t=i.length;e<t;e++)"string"==typeof i[e]?a.innerHTML+=i[e]:a.append(i[e]);a.children.length&&(t||(t=L("div.mm-iconbar")),t.append(a))}),t){this.bind("initMenu:after",()=>{this.node.menu.prepend(t)});let n="mm-menu--iconbar-"+e.position,s=()=>{this.node.menu.classList.add(n)},i=()=>{this.node.menu.classList.remove(n)};if("boolean"==typeof e.use?this.bind("initMenu:after",s):k(e.use,s,i),"tabs"==e.type){t.classList.add("mm-iconbar--tabs"),t.addEventListener("click",e=>{const t=e.target.closest(".mm-iconbar__tab");if(t)if(t.matches(".mm-iconbar__tab--selected"))e.stopImmediatePropagation();else try{const n=_(this.node.menu,t.getAttribute("href")+".mm-panel")[0];n&&(e.preventDefault(),e.stopImmediatePropagation(),this.openPanel(n,!1))}catch(e){}});const e=n=>{_(t,"a").forEach(e=>{e.classList.remove("mm-iconbar__tab--selected")});const s=_(t,'[href="#'+n.id+'"]')[0];if(s)s.classList.add("mm-iconbar__tab--selected");else{const t=_(this.node.pnls,"#"+n.dataset.mmParent)[0];t&&e(t.closest(".mm-panel"))}};this.bind("openPanel:before",e)}}},iconPanels:function(){this.opts.iconPanels=this.opts.iconPanels||{};const e=a(this.opts.iconPanels,W);let t=!1;if("first"==e.visible&&(t=!0,e.visible=1),e.visible=Math.min(3,Math.max(1,e.visible)),e.visible++,e.add){this.bind("initMenu:after",()=>{this.node.menu.classList.add("mm-menu--iconpanel")});const n=["mm-panel--iconpanel-0","mm-panel--iconpanel-1","mm-panel--iconpanel-2","mm-panel--iconpanel-3"];t?this.bind("initMenu:after",()=>{var e;null===(e=w(this.node.pnls,".mm-panel")[0])||void 0===e||e.classList.add("mm-panel--iconpanel-first")}):this.bind("openPanel:after",t=>{if(t.closest(".mm-listitem--vertical"))return;let s=w(this.node.pnls,".mm-panel");s=s.filter(e=>e.matches(".mm-panel--parent")),s.push(t),s=s.slice(-e.visible),s.forEach((e,t)=>{e.classList.remove("mm-panel--iconpanel-first",...n),e.classList.add("mm-panel--iconpanel-"+t)})})}},navbars:V,pageScroll:function(){this.opts.pageScroll=this.opts.pageScroll||{},this.conf.pageScroll=this.conf.pageScroll||{};const e=a(this.opts.pageScroll,U),t=a(this.conf.pageScroll,Y);var n;function s(){n&&window.scrollTo({top:n.getBoundingClientRect().top+document.scrollingElement.scrollTop-t.scrollOffset,behavior:"smooth"}),n=null}function i(e){try{if("#"==e.slice(0,1))return _(j.node.page,e)[0]}catch(e){}return null}if(this.opts.offCanvas.use&&e.scroll&&(this.bind("close:after",()=>{s()}),this.node.menu.addEventListener("click",e=>{var t,a;const o=(null===(a=null===(t=e.target)||void 0===t?void 0:t.closest("a[href]"))||void 0===a?void 0:a.getAttribute("href"))||"";(n=i(o))&&(e.preventDefault(),this.node.menu.matches(".mm-menu--sidebar-expanded")&&this.node.wrpr.matches(".mm-wrapper--sidebar-expanded")?s():this.close())})),e.update){let e=[];this.bind("initListview:after",t=>{const n=w(t,".mm-listitem");P(n).forEach(t=>{const n=i(t.getAttribute("href"));n&&e.unshift(n)})});let n=-1;window.addEventListener("scroll",s=>{const i=window.scrollY;for(var a=0;a<e.length;a++)if(e[a].offsetTop<i+t.updateOffset){if(n!==a){n=a;let t=w(this.node.pnls,".mm-panel--opened")[0],s=_(t,".mm-listitem"),i=P(s);i=i.filter(t=>t.matches('[href="#'+e[a].id+'"]')),i.length&&this.setSelected(i[0].parentElement)}break}},{passive:!0})}},searchfield:function(){this.opts.searchfield=this.opts.searchfield||{},this.conf.searchfield=this.conf.searchfield||{};const e=a(this.opts.searchfield,G);a(this.conf.searchfield,K);if(e.add){switch(e.addTo){case"panels":e.addTo=".mm-panel";break;case"searchpanel":e.addTo=".mm-panel--search"}switch(e.searchIn){case"panels":e.searchIn=".mm-panel"}this.bind("initPanel:after",t=>{t.matches(e.addTo)&&!t.closest(".mm-listitem--vertical")&&ie.call(this,t)}),this.bind("initMenu:after",()=>{const t=se.call(this);ie.call(this,t),_(this.node.menu,e.addTo).forEach(n=>{if(!n.matches(".mm-panel")){const s=ae.call(this,!0);n.append(s);const i=_(s,"input")[0];e.splash.length?(i.addEventListener("focusin",()=>{this.openPanel(t,!1,!1)}),this.bind("openPanel:after",e=>{e.matches(".mm-panel--search")?s.classList.add("mm-searchfield--cancelable"):s.classList.remove("mm-searchfield--cancelable")})):(this.bind("search:after",()=>{this.openPanel(t,!1,!1)}),i.addEventListener("focusout",()=>{i.value.length||this.closePanel(t,!1)})),oe.call(this,s)}})}),this.bind("close:before",()=>{_(this.node.menu,".mm-searchfield input").forEach(e=>{e.blur()})})}},sectionIndexer:function(){this.opts.sectionIndexer=this.opts.sectionIndexer||{};a(this.opts.sectionIndexer,he).add&&this.bind("initPanels:after",()=>{if(!this.node.indx){let e="";"abcdefghijklmnopqrstuvwxyz".split("").forEach(t=>{e+='<a href="#">'+t+"</a>"});let t=L("div.mm-sectionindexer");t.innerHTML=e,this.node.pnls.prepend(t),this.node.indx=t,this.node.indx.addEventListener("click",e=>{e.target.matches("a")&&e.preventDefault()});let n=e=>{if(!e.target.matches("a"))return;const t=e.target.textContent,n=w(this.node.pnls,".mm-panel--opened")[0];let s=-1,i=n.scrollTop;n.scrollTop=0,_(n,".mm-divider").filter(e=>!e.matches(".mm-hidden")).forEach(e=>{s<0&&t==e.textContent.trim().slice(0,1).toLowerCase()&&(s=e.offsetTop)}),n.scrollTop=s>-1?s:i};R?(this.node.indx.addEventListener("touchstart",n),this.node.indx.addEventListener("touchmove",n)):this.node.indx.addEventListener("mouseover",n)}this.bind("openPanel:before",e=>{const t=_(e,".mm-divider").filter(e=>!e.matches(".mm-hidden")).length;this.node.indx.classList[t?"add":"remove"]("mm-sectionindexer--active")})})},setSelected:function(){this.opts.setSelected=this.opts.setSelected||{};const e=a(this.opts.setSelected,pe);if("detect"==e.current){const e=t=>{t=t.split("?")[0].split("#")[0];const n=this.node.menu.querySelector('a[href="'+t+'"], a[href="'+t+'/"]');if(n)this.setSelected(n.parentElement);else{const n=t.split("/").slice(0,-1);n.length&&e(n.join("/"))}};this.bind("initMenu:after",()=>{e.call(this,window.location.href)})}else e.current||this.bind("initListview:after",e=>{w(e,".mm-listitem--selected").forEach(e=>{e.classList.remove("mm-listitem--selected")})});e.hover&&this.bind("initMenu:after",()=>{this.node.menu.classList.add("mm-menu--selected-hover")}),e.parent&&(this.bind("openPanel:after",e=>{_(this.node.pnls,".mm-listitem--selected-parent").forEach(e=>{e.classList.remove("mm-listitem--selected-parent")});let t=e;for(;t;){let e=_(this.node.pnls,"#"+t.dataset.mmParent)[0];t=null==e?void 0:e.closest(".mm-panel"),e&&!e.matches(".mm-listitem--vertical")&&e.classList.add("mm-listitem--selected-parent")}}),this.bind("initMenu:after",()=>{this.node.menu.classList.add("mm-menu--selected-parent")}))},sidebar:function(){if(!this.opts.offCanvas.use)return;this.opts.sidebar=this.opts.sidebar||{};const e=a(this.opts.sidebar,ue);if(e.collapsed.use){this.bind("initMenu:after",()=>{this.node.menu.classList.add("mm-menu--sidebar-collapsed")});let t=()=>{this.node.wrpr.classList.add("mm-wrapper--sidebar-collapsed")},n=()=>{this.node.wrpr.classList.remove("mm-wrapper--sidebar-collapsed")};"boolean"==typeof e.collapsed.use?this.bind("initMenu:after",t):k(e.collapsed.use,t,n)}if(e.expanded.use){this.bind("initMenu:after",()=>{this.node.menu.classList.add("mm-menu--sidebar-expanded")});let t=!1,n=()=>{t=!0,this.node.wrpr.classList.add("mm-wrapper--sidebar-expanded"),this.node.menu.removeAttribute("aria-modal"),this.open(),j.node.page.removeAttribute("inert")},s=()=>{t=!1,this.node.wrpr.classList.remove("mm-wrapper--sidebar-expanded"),this.node.menu.setAttribute("aria-modal","true"),this.close()};"boolean"==typeof e.expanded.use?this.bind("initMenu:after",n):k(e.expanded.use,n,s),this.bind("close:after",()=>{t&&window.sessionStorage.setItem("mmenuExpandedState","closed")}),this.bind("open:after",()=>{t&&(window.sessionStorage.setItem("mmenuExpandedState","open"),j.node.page.removeAttribute("inert"))});let i=e.expanded.initial;const a=window.sessionStorage.getItem("mmenuExpandedState");switch(a){case"open":case"closed":i=a}"closed"===i&&this.bind("init:after",()=>{this.close()})}}};t.default=j;window&&(window.Mmenu=j)}]);