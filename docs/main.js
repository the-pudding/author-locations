parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"or4r":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3],e="Expected a function",n=NaN,r="[object Symbol]",i=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,f=/^0o[0-7]+$/i,c=parseInt,a="object"==typeof t&&t&&t.Object===Object&&t,s="object"==typeof self&&self&&self.Object===Object&&self,v=a||s||Function("return this")(),l=Object.prototype,p=l.toString,b=Math.max,m=Math.min,y=function(){return v.Date.now()};function d(t,n,r){var i,o,u,f,c,a,s=0,v=!1,l=!1,p=!0;if("function"!=typeof t)throw new TypeError(e);function d(e){var n=i,r=o;return i=o=void 0,s=e,f=t.apply(r,n)}function g(t){var e=t-a;return void 0===a||e>=n||e<0||l&&t-s>=u}function O(){var t=y();if(g(t))return x(t);c=setTimeout(O,function(t){var e=n-(t-a);return l?m(e,u-(t-s)):e}(t))}function x(t){return c=void 0,p&&i?d(t):(i=o=void 0,f)}function T(){var t=y(),e=g(t);if(i=arguments,o=this,a=t,e){if(void 0===c)return function(t){return s=t,c=setTimeout(O,n),v?d(t):f}(a);if(l)return c=setTimeout(O,n),d(a)}return void 0===c&&(c=setTimeout(O,n)),f}return n=h(n)||0,j(r)&&(v=!!r.leading,u=(l="maxWait"in r)?b(h(r.maxWait)||0,n):u,p="trailing"in r?!!r.trailing:p),T.cancel=function(){void 0!==c&&clearTimeout(c),s=0,i=a=o=c=void 0},T.flush=function(){return void 0===c?f:x(y())},T}function j(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function O(t){return"symbol"==typeof t||g(t)&&p.call(t)==r}function h(t){if("number"==typeof t)return t;if(O(t))return n;if(j(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=j(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(i,"");var r=u.test(t);return r||f.test(t)?c(t.slice(2),r?2:8):o.test(t)?n:+t}module.exports=d;
},{}],"WEtf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var r={android:function(){return navigator.userAgent.match(/Android/i)},blackberry:function(){return navigator.userAgent.match(/BlackBerry/i)},ios:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},opera:function(){return navigator.userAgent.match(/Opera Mini/i)},windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.android()||r.blackberry()||r.ios()||r.opera()||r.windows()}},e=r;exports.default=e;
},{}],"v9Q8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=[{image:"2018_02_stand-up",url:"2018/02/stand-up",hed:"The Structure of Stand-Up Comedy"},{image:"2018_04_birthday-paradox",url:"2018/04/birthday-paradox",hed:"The Birthday Paradox Experiment"},{image:"2018_11_boy-bands",url:"2018/11/boy-bands",hed:"Internet Boy Band Database"},{image:"2018_08_pockets",url:"2018/08/pockets",hed:"Women’s Pockets are Inferior"}],e=null;function n(t,e){var n=document.getElementsByTagName("script")[0],a=document.createElement("script");return a.src=t,a.async=!0,n.parentNode.insertBefore(a,n),e&&"function"==typeof e&&(a.onload=e),a}function a(e){var n=new XMLHttpRequest,a=Date.now(),o="https://pudding.cool/assets/data/stories.json?v=".concat(a);n.open("GET",o,!0),n.onload=function(){if(n.status>=200&&n.status<400){var a=JSON.parse(n.responseText);e(a)}else e(t)},n.onerror=function(){return e(t)},n.send()}function o(t){return"\n\t<a class='footer-recirc__article' href='https://pudding.cool/".concat(t.url,"' target='_blank'>\n\t\t<img class='article__img' src='https://pudding.cool/common/assets/thumbnails/640/").concat(t.image,".jpg' alt='").concat(t.hed,"'>\n\t\t<p class='article__headline'>").concat(t.hed,"</p>\n\t</a>\n\t")}function r(){var t=window.location.href,n=e.filter(function(e){return!t.includes(e.url)}).slice(0,4).map(o).join("");d3.select(".pudding-footer .footer-recirc__articles").html(n)}function s(){a(function(t){e=t,r()})}var c={init:s};exports.default=c;
},{}],"vL5c":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,t=arguments[3];!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof e&&e.amd?e(n):t.scrollama=n()}(this,function(){"use strict";function e(e){for(var t=e.length,n=[],r=0;r<t;r+=1)n.push(e[r]);return n}function t(e){return"scrollama__debug-offset--"+e.id}function n(e){!function(e){var n=e.id,r=e.offsetVal,o=e.stepClass,i=document.createElement("div");i.setAttribute("id",t({id:n})),i.setAttribute("class","scrollama__debug-offset"),i.style.position="fixed",i.style.left="0",i.style.width="100%",i.style.height="0px",i.style.borderTop="2px dashed black",i.style.zIndex="9999";var s=document.createElement("p");s.innerText='".'+o+'" trigger: '+r,s.style.fontSize="12px",s.style.fontFamily="monospace",s.style.color="black",s.style.margin="0",s.style.padding="6px",i.appendChild(s),document.body.appendChild(i)}({id:e.id,offsetVal:e.offsetVal,stepClass:e.stepEl[0].getAttribute("class")})}function r(e){var n=e.id,r=(e.stepOffsetHeight,e.offsetMargin);e.offsetVal;!function(e){var n=e.id,r=e.offsetMargin,o=(e.offsetVal,t({id:n}));document.querySelector("#"+o).style.top=r+"px"}({id:n,offsetMargin:r})}function o(e){var t=e.id,n=e.index,r=e.state,o=function(e){return"scrollama__debug-step--"+e.id+"-"+e.i}({id:t,i:n}),i=document.querySelector("#"+o+"_above"),s=document.querySelector("#"+o+"_below"),a="enter"===r?"block":"none";i&&(i.style.display=a),s&&(s.style.display=a)}return function(){var t=["stepAbove","stepBelow","stepProgress","viewportAbove","viewportBelow"],i={stepEnter:function(){},stepExit:function(){},stepProgress:function(){}},s={},a=null,c=[],l=[],u=[],f=[],d=0,p=0,v=0,g=0,m=0,b=0,w=!1,h=!1,x=!1,y=!1,E=!1,M=!1,O="down",S=[];function A(e){return e.getBoundingClientRect().top+window.pageYOffset-(document.body.clientTop||0)}function I(e){return+e.getAttribute("data-scrollama-index")}function C(){window.pageYOffset>m?O="down":window.pageYOffset<m&&(O="up"),m=window.pageYOffset}function H(e){s[e]&&s[e].forEach(function(e){return e.disconnect()})}function k(){var e,t;v=window.innerHeight,e=document.body,t=document.documentElement,g=Math.max(e.scrollHeight,e.offsetHeight,t.clientHeight,t.scrollHeight,t.offsetHeight),p=d*v,w&&(l=c.map(function(e){return e.getBoundingClientRect().height}),u=c.map(A),h&&z()),x&&r({id:a,stepOffsetHeight:l,offsetMargin:p,offsetVal:d})}function q(e){if(e&&!h){if(!w)return console.error("scrollama error: enable() called before scroller was ready"),void(h=!1);z()}!e&&h&&t.forEach(H),h=e}function _(e,t){var n=I(e);void 0!==t&&(f[n].progress=t);var r={element:e,index:n,progress:f[n].progress};"enter"===f[n].state&&i.stepProgress(r)}function N(e,t){if("above"===t)for(var n=0;n<e;n+=1){var r=f[n];"enter"!==r.state&&"down"!==r.direction?(P(c[n],"down",!1),R(c[n],"down")):"enter"===r.state&&R(c[n],"down")}else if("below"===t)for(var o=f.length-1;o>e;o-=1){var i=f[o];"enter"===i.state&&R(c[o],"up"),"down"===i.direction&&(P(c[o],"up",!1),R(c[o],"up"))}}function P(e,t,n){void 0===n&&(n=!0);var r=I(e),s={element:e,index:r,direction:t};f[r].direction=t,f[r].state="enter",E&&n&&"down"===t&&N(r,"above"),E&&n&&"up"===t&&N(r,"below"),i.stepEnter&&!S[r]&&(i.stepEnter(s,f),x&&o({id:a,index:r,state:"enter"}),M&&(S[r]=!0)),y&&_(e)}function R(e,t){var n=I(e),r={element:e,index:n,direction:t};y&&("down"===t&&f[n].progress<1?_(e,1):"up"===t&&f[n].progress>0&&_(e,0)),f[n].direction=t,f[n].state="exit",i.stepExit(r,f),x&&o({id:a,index:n,state:"exit"})}function V(e){var t=e[0];C();var n=t.isIntersecting,r=t.boundingClientRect,o=t.target,i=r.top,s=r.bottom,a=i-p,c=s-p,l=I(o),u=f[l];n&&a<=0&&c>=0&&"down"===O&&"enter"!==u.state&&P(o,O),!n&&a>0&&"up"===O&&"enter"===u.state&&R(o,O)}function B(e){var t=e[0];C();var n=t.isIntersecting,r=t.boundingClientRect,o=t.target,i=r.top,s=r.bottom,a=i-p,c=s-p,l=I(o),u=f[l];n&&a<=0&&c>=0&&"up"===O&&"enter"!==u.state&&P(o,O),!n&&c<0&&"down"===O&&"enter"===u.state&&R(o,O)}function T(e){var t=e[0];C();var n=t.isIntersecting,r=t.target,o=I(r),i=f[o];n&&"down"===O&&"down"!==i.direction&&"enter"!==i.state&&(P(r,"down"),R(r,"down"))}function Y(e){var t=e[0];C();var n=t.isIntersecting,r=t.target,o=I(r),i=f[o];n&&"up"===O&&"down"===i.direction&&"enter"!==i.state&&(P(r,"up"),R(r,"up"))}function j(e){var t=e[0];C();var n=t.isIntersecting,r=t.intersectionRatio,o=t.boundingClientRect,i=t.target,s=o.bottom;n&&s-p>=0&&_(i,+r.toFixed(3))}function F(){s.stepProgress=c.map(function(e,t){var n=l[t]-p+"px 0px "+(-v+p)+"px 0px",r=function(e){for(var t=Math.ceil(e/b),n=[],r=1/t,o=0;o<t;o+=1)n.push(o*r);return n}(l[t]),o=new IntersectionObserver(j,{rootMargin:n,threshold:r});return o.observe(e),o})}function z(){t.forEach(H),s.viewportAbove=c.map(function(e,t){var n=g-u[t],r=p-v-l[t],o=new IntersectionObserver(T,{rootMargin:n+"px 0px "+r+"px 0px"});return o.observe(e),o}),s.viewportBelow=c.map(function(e,t){var n=-p-l[t],r=p-v+l[t]+g,o=new IntersectionObserver(Y,{rootMargin:n+"px 0px "+r+"px 0px"});return o.observe(e),o}),s.stepAbove=c.map(function(e,t){var n=-p+l[t],r=new IntersectionObserver(V,{rootMargin:n+"px 0px "+(p-v)+"px 0px"});return r.observe(e),r}),s.stepBelow=c.map(function(e,t){var n=-p,r=p-v+l[t],o=new IntersectionObserver(B,{rootMargin:n+"px 0px "+r+"px 0px"});return o.observe(e),o}),y&&F()}function D(e){return!(!e||1!==e.nodeType)&&(function(e){var t=window.getComputedStyle(e);return("scroll"===t.overflowY||"auto"===t.overflowY)&&e.scrollHeight>e.clientHeight}(e)?e:D(e.parentNode))}var L={};return L.setup=function(t){var r=t.step,o=t.offset;void 0===o&&(o=.5);var i=t.progress;void 0===i&&(i=!1);var s=t.threshold;void 0===s&&(s=4);var l=t.debug;void 0===l&&(l=!1);var u=t.order;void 0===u&&(u=!0);var p,v,g,m,h,O=t.once;if(void 0===O&&(O=!1),v=(p="abcdefghijklmnopqrstuv").length,g=Date.now(),a=""+[0,0,0].map(function(e){return p[Math.floor(Math.random()*v)]}).join("")+g,m=r,void 0===h&&(h=document),!(c="string"==typeof m?e(h.querySelectorAll(m)):m instanceof Element?e([m]):m instanceof NodeList?e(m):m instanceof Array?m:[]).length)return console.error("scrollama error: no step elements"),L;var S=c.reduce(function(e,t){return e||D(t.parentNode)},!1);return S&&console.error("scrollama error: step elements cannot be children of a scrollable element. Remove any css on the parent element with overflow: scroll; or overflow: auto; on elements with fixed height.",S),x=l,y=i,E=u,M=O,L.offsetTrigger(o),b=Math.max(1,+s),w=!0,x&&n({id:a,stepEl:c,offsetVal:d}),c.forEach(function(e,t){return e.setAttribute("data-scrollama-index",t)}),f=c.map(function(){return{direction:null,state:null,progress:0}}),k(),L.enable(),L},L.resize=function(){return k(),L},L.enable=function(){return q(!0),L},L.disable=function(){return q(!1),L},L.destroy=function(){q(!1),Object.keys(i).forEach(function(e){i[e]=null}),Object.keys(s).forEach(function(e){s[e]=null})},L.offsetTrigger=function(e){return e&&!isNaN(e)?(e>1&&console.error("scrollama error: offset value is greater than 1. Fallbacks to 1."),e<0&&console.error("scrollama error: offset value is lower than 0. Fallbacks to 0."),d=Math.min(Math.max(0,e),1),L):(isNaN(e)&&console.error("scrollama error: offset value is not a number. Fallbacks to 0."),d)},L.onStepEnter=function(e){return"function"==typeof e?i.stepEnter=e:console.error("scrollama error: onStepEnter requires a function"),L},L.onStepExit=function(e){return"function"==typeof e?i.stepExit=e:console.error("scrollama error: onStepExit requires a function"),L},L.onStepProgress=function(e){return"function"==typeof e?i.stepProgress=e:console.error("scrollama error: onStepProgress requires a function"),L},L}});
},{}],"xZJw":[function(require,module,exports) {
"use strict";function t(t){return new Promise(function(e,n){var r=t.split(".").pop();"csv"===r?d3.csv("assets/data/".concat(t)).then(e).catch(n):"json"===r?d3.json("assets/data/".concat(t)).then(e).catch(n):n(new Error("unsupported file type for: ".concat(t)))})}function e(e){if("string"==typeof e)return t(e);var n=e.map(t);return Promise.all(n)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=e;
},{}],"XoEi":[function(require,module,exports) {
function t(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),e.push.apply(e,r)}return e}function n(n){for(var r=1;r<arguments.length;r++){var a=null!=arguments[r]?arguments[r]:{};r%2?t(a,!0).forEach(function(t){e(n,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(a)):t(a).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(a,t))})}return n}function e(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}d3.selection.prototype.puddingChartArcHistogram=function(t){var e=this.nodes().map(function(e){var r=d3.select(e),a=null,o=null,c=null,i=r.datum(),s=function(){return!1},u=null,l=t.binSize,d=t.maxBin,f=0,p=0,h=0,g=0,b=0,y=0,m=d3.scaleLinear(),v=d3.scaleLinear(),O=d3.scaleBand();function k(t){var n=t.distance,e=.51*m(n),r=v(n),a=m(n);return"M0,0 A".concat(e,",").concat(r," 0 0,1 ").concat(a,",0")}function j(){var t=d3.select(this),n=t.node().getTotalLength();t.attr("stroke-dasharray","".concat(n," ").concat(n)).attr("stroke-dashoffset",n)}function w(t){var n=t.append("g").attr("class","book");return n.append("path").attr("d",k).each(j),n.append("text").text(function(t){return t.book_title}),n}function x(t){return t.append("g").attr("class","bin")}function P(t){var n=t.append("g").attr("class","book");return n.attr("transform",function(t,n){return"translate(0, ".concat(n*b+y,")")}).style("opacity",0),n.append("rect").attr("x",0).attr("y",0),n}var A={init:function(){a=r.append("svg").attr("class","pudding-chart"),o=a.append("g").attr("class","g-axis"),(c=a.append("g").attr("class","g-vis")).append("g").attr("class","arc"),c.append("g").attr("class","hist");var t=d3.extent(i,function(t){return t.distance});m.domain(t).nice(),v.domain(t).nice();var n=d3.range(0,m.domain()[1],l);O.domain(n)},resize:function(){return f=r.node().offsetWidth-h-g,p=r.node().offsetHeight-0-8,a.attr("width",f+h+g).attr("height",p+0+8),m.range([0,f]),v.range([0,.35*p]),O.range([0,f]),h=O.bandwidth()+24,g=h,b=Math.floor((.65*p-8)/d),y=.35*p+8,A},render:function(){c.attr("transform","translate(".concat(h,", ").concat(0,")"));var t=d3.axisTop(m).tickFormat(function(t,n){return 0===n?"".concat(t," miles"):t});o.call(t).attr("transform","translate(".concat(h,", ").concat(0+y-b,")")),o.select(".tick text").attr("text-anchor","end").attr("x",-4);var e=i.filter(s).map(function(t){return n({},t,{highlight:t.book_title===u})}),r=d3.nest().key(function(t){return t.bin}).entries(e);r.forEach(function(t){t.values.sort(function(t,n){return d3.descending(t.top,n.top)})}),c.select(".arc").selectAll(".book").data(e,function(t){return t.book_title}).join(w).select("path").attr("transform",function(){return"translate(0, ".concat(v.range()[1],")")}).transition().delay(function(t,n){return e.length>2?20*t.bin:0}).duration(1e3).ease(d3.easeCubicInOut).attr("stroke-dashoffset",0);var a=c.select(".hist").attr("transform","translate(".concat(l/2,", 0)")).selectAll(".bin").data(r,function(t){return t.key}).join(x);a.attr("transform",function(t){var n=O(+t.key*l)-l/2;return"translate(".concat(n,", 0)")});var d=a.selectAll(".book").data(function(t){return t.values},function(t){return t.book_title}).join(P);return d.select("rect").attr("width",O.bandwidth()).attr("height",b).classed("is-highlight",function(t){return t.highlight}),d.transition().duration(1e3).delay(function(t,n){return e.length>2?20*t.bin:0}).ease(d3.easeCubicInOut).attr("transform",function(t,n){return"translate(0, ".concat(n*b+y,")")}).style("opacity",1),A},data:function(t){return arguments.length?(i=t,r.datum(i),A):i},filter:function(t){return arguments.length?(s=t,A):s},highlight:function(t){return u=t,A}};return A.init(),A});return e.length>1?e:e.pop()};
},{}],"GapP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=n(require("scrollama")),t=n(require("./load-data"));function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(n,!0).forEach(function(t){o(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}require("./pudding-chart/arc-histogram");var c=d3.select('[data-js="distance"]'),a=c.select('[data-js="distance__figure"]'),u=c.select('[data-js="distance__article"]'),s=u.selectAll('[data-js="article__step"]'),l=(0,e.default)(),d=0,f=null;function h(){d=c.node().offsetWidth<960?20:10;var e=Math.floor(.75*window.innerHeight);a.style("height","".concat(window.innerHeight,"px")),s.style("height","".concat(e,"px")),s.style("margin-top",function(e,t){return 0===t?"".concat(.5*-window.innerHeight,"px"):0}),s.style("padding-bottom",function(e,t){return t===s.size()-1?"".concat(1*window.innerHeight,"px"):0})}function p(){h(),l.resize()}function g(e){var t=e.index;s.classed("is-active",function(e,n){return n===t}),0===t?f.filter(function(e){return["White Teeth"].includes(e.book_title)}).highlight("White Teeth").render():1===t?f.filter(function(e){return["White Teeth","2666"].includes(e.book_title)}).highlight("2666").render():2===t?f.filter(function(){return!0}).highlight().render():3===t&&f.highlight("Rabbit at Rest").render()}function b(e){var t=e.map(function(e){return i({},e,{distance:+e.distance,bin:Math.floor(+e.distance/d),top:"White Teeth"===e.book_title})}),n=d3.nest().key(function(e){return e.book_title}).rollup(function(e){var t=e.map(function(e){return e.setting}),n=e.map(function(e){return e.residence}),r=e[0];return{book_title:r.book_title,author_name:r.author_name,distance:r.distance,setting:t,residence:n,bin:r.bin,top:r.top}}).entries(t).map(function(e){return e.value});return n.sort(function(e,t){return d3.ascending(e.distance,t.distance)}),n}function v(){l.setup({step:"#distance article .step",offset:.33,debug:!1}).onStepEnter(g)}function y(e){h();var t=b(e),n=d3.max(d3.nest().key(function(e){return e.bin}).entries(t),function(e){return e.values.length});(f=a.datum(t).puddingChartArcHistogram({binSize:d,maxBin:n})).resize(),v(),p()}function m(){(0,t.default)("top-100.csv").then(y)}var _={init:m,resize:p};exports.default=_;
},{"scrollama":"vL5c","./load-data":"xZJw","./pudding-chart/arc-histogram":"XoEi"}],"JKdT":[function(require,module,exports) {
d3.selection.prototype.puddingChartTimeline=function(t){var n=this.nodes().map(function(t){var n=d3.select(t),a=n.datum(),e=a.filteredAuthors[0].values,r=a.filteredBooks[0].values,o=a.oldest,c=0,i=0,l=null,u=null,s=null,d=!1,f=d3.scaleLinear(),p=(d3.scaleOrdinal(d3.schemeSet1),d3.scaleLinear()),g=null,m=null,_=null,h=null,v=null,x=null,y=null,b=null,k={init:function(){var t=(g=n.append("svg").attr("class","pudding-chart")).append("g");t.attr("transform","translate(".concat(50,", ").concat(0,")")),(m=g.append("g").attr("class","g-axis").attr("transform","translate(".concat(50,", ").concat(0,")"))).append("g").attr("class","author__axis"),m.append("g").attr("class","book__axis"),_=t.append("g").attr("class","g-vis"),h=_.append("g").attr("class","g-authors"),v=_.append("g").attr("class","g-books"),x=_.append("g").attr("class","g-connections"),f.domain([0,o]).ticks(5),p.domain([0,o]).ticks(5),l=d3.nest().key(function(t){return t.title}).rollup(function(t){return{values:t,year:d3.max(t,function(t){return t.pub_age})}}).entries(r);var a=(y=r.filter(function(t){return t.match.length})).map(function(t){return t.match_locs}).map(function(t){var n=null;return t&&(n={location:t.location,mid:t.mid}),n}).filter(function(t){return t});a&&(b=Array.from(new Set(a.map(function(t){return t.location}))).map(function(t){return{location:t,mid:a.find(function(n){return n.location===t}).mid}})),k.resize(),k.render()},resize:function(){return c=n.node().offsetWidth-50-50,i=n.node().offsetHeight-0-0,g.attr("width",c+50+50).attr("height",i+0+0),d=window.innerHeight>window.innerWidth,f.range([0,c]),p.range([0,i]),u=d?.25*c:.25*i,s=d?.75*c:.75*i,m.select(".author__axis").attr("transform",d?"translate(".concat(u,", 0)"):"translate(0, ".concat(u,")")).call(d?d3.axisLeft(p):d3.axisTop(f)),m.select(".book__axis").attr("transform",d?"translate(".concat(s,", 0)"):"translate(0, ".concat(s,")")).call(d?d3.axisRight(p):d3.axisBottom(f)),k},render:function(){h.selectAll(".author__location").data(e,function(t){return t.start_age}).join(function(t){return t.append("rect").attr("class","author__location")}).attr("x",function(t){return d?u-10:f(t.start_age)}).attr("y",function(t){return d?p(t.start_age):u-10}).attr("width",function(t){return d?20:f(t.end_age)-f(t.start_age)}).attr("height",function(t){return d?p(t.end_age)-p(t.start_age):20});for(var t=d3.forceSimulation(l).force("x",d?d3.forceX(s):d3.forceX(function(t){return f(t.value.year)})).force("y",d?d3.forceY(function(t){return p(t.value.year)}):d3.forceY(s)).force("collide",d3.forceCollide(6)).stop(),n=0;n<120;n+=1)t.tick();v.selectAll(".book").data(l).join(function(t){return t.append("circle").attr("class","book")}).attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y}).attr("r",6);var a=y.map(function(t){return t.match_locs}).filter(function(t){return t});x.selectAll(".connection__lived").data(a).join(function(t){return t.append("path").attr("class","connection__lived")}).attr("d",function(t){var n=d?p(t.pub_age):f(t.pub_age),a=d?p(t.mid):f(t.mid);return["M",d?[u,a]:[a,u],"C",d?[c/2+10,a]:[a,i/2+10],d?[c/2-10,n]:[n,i/2-10],d?[s,n]:[n,s]].join(" ")}),_.selectAll(".cities__lived").data(b).join(function(t){return t.append("text").text(function(t){return t.location}).attr("class","cities__lived").attr("text-anchor","middle").attr("alignment-baseline","bottom")}).attr("transform",function(t){return d?"translate(".concat(u-20,", ").concat(p(t.mid),")"):"translate(".concat(f(t.mid),", ").concat(u-10,")")}).style("font-size",12);var o=r.filter(function(t){return!t.match.length}),g=d3.nest().key(function(t){return t.title}).rollup(function(t){return{locs:t.map(function(t){return t.location}),year:t[0].pub_age}}).entries(o);_.selectAll(".group__never").data(g).join(function(t){return t.append("g").attr("class","group__never")}).attr("transform",function(t){return d?"translate(".concat(s,", ").concat(p(t.value.year),")"):"translate(".concat(f(t.value.year),", ").concat(s,")")}).selectAll(".cities__never").data(function(t){return t.value.locs}).join(function(t){t.append("text").text(function(t){return t}).attr("class","cities__never").attr("text-anchor","middle").attr("transform",function(t,n){return"translate(0, ".concat(12*n,")")}).attr("alignment-baseline","hanging").style("font-size",12)})},data:function(t){return arguments.length?(a=t,n.datum(a),k.render(),k):a}};return k.init(),k});return n.length>1?n:n.pop()};
},{}],"dcSH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=e(require("./load-data"));function e(t){return t&&t.__esModule?t:{default:t}}function r(t){return u(t)||a(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function u(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(r,!0).forEach(function(e){c(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function c(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}require("./pudding-chart/timeline");var l=d3.select('[data-js="timeline"]'),s=l.selectAll('[data-js="author__figure"]'),f=null,p=null,d=null,y=null,g=null,m=[];function b(t){var e=t.match.split(";").map(function(t){return t.trim()});return g.filter(function(r){return r.slug===t.slug&&e.includes(r.location)&&t.pub_year>r.start_year}).map(function(e){return{pub_age:t.pub_age,location:e.location.trim(),mid:e.mid}}).sort(function(t,e){return d3.ascending(t.mid,e.mid)}).pop()}function _(t){var e=t.map(function(t){return i({},t,{pub_year:+t.pub_year,pub_age:+t.pub_year-y.get(t.slug)})}).map(function(t){return i({},t,{match_locs:b(t)})});return d3.nest().key(function(t){return t.slug}).entries(e)}function h(t){var e=d3.nest().key(function(t){return t.slug}).rollup(function(t){var e=t.map(function(t){return+t.start_year});return Math.min.apply(Math,r(e))}).entries(t).map(function(t){return[t.key,t.value]});y=new Map(e);var n=t.map(function(t){return i({},t,{location:t.location.trim(),start_year:+t.start_year,end_year:+t.end_year,start_age:+t.start_year-y.get(t.slug),end_age:+t.end_year-y.get(t.slug)})}).map(function(t){return i({},t,{mid:d3.mean([t.start_age,t.end_age])})});return d=Math.max.apply(Math,r(n.map(function(t){return t.end_age}))),p=n.map(function(t){var e=d3.mean([t.start_age,t.end_age]);return{location:t.location,mid:e}}),g=n,d3.nest().key(function(t){return t.slug}).entries(n)}function v(){var t=d3.select(this),e=t.attr("data-author"),r={filteredAuthors:f.authors.filter(function(t){return t.key===e}).slice(0,1),filteredBooks:f.books.filter(function(t){return t.key===e}),oldest:d},n=t.data([r]).puddingChartTimeline();m.push(n)}function O(t){var e=h(t[0]),r=_(t[1]);f={authors:e,books:r},s.each(v)}function j(){m.forEach(function(t){return t.resize().render()})}function k(){(0,t.default)(["authors.json","books.json"]).then(O)}var w={init:k,resize:j};exports.default=w;
},{"./load-data":"xZJw","./pudding-chart/timeline":"JKdT"}],"epB2":[function(require,module,exports) {
"use strict";var e=l(require("lodash.debounce")),i=l(require("./utils/is-mobile")),s=l(require("./footer")),t=l(require("./graphic-distance")),r=l(require("./graphic-timeline"));function l(e){return e&&e.__esModule?e:{default:e}}var a=d3.select("body"),d=0;function n(){var e=a.node().offsetWidth;d!==e&&(d=e,t.default.resize(),r.default.resize())}function u(){if(a.select("header").classed("is-sticky")){var e=a.select(".header__menu"),i=a.select(".header__toggle");i.on("click",function(){var s=e.classed("is-visible");e.classed("is-visible",!s),i.classed("is-visible",!s)})}}function c(){a.classed("is-mobile",i.default.any()),window.addEventListener("resize",(0,e.default)(n,150)),u(),t.default.init(),r.default.init()}c();
},{"lodash.debounce":"or4r","./utils/is-mobile":"WEtf","./footer":"v9Q8","./graphic-distance":"GapP","./graphic-timeline":"dcSH"}]},{},["epB2"], null)