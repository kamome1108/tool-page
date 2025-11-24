(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32901,e=>{"use strict";var t=e.i(96683);e.s(["Card",0,({children:e,padding:r="md",hover:i=!1,className:s="",onClick:n,...a})=>(0,t.jsx)("div",{className:`
        bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden
        ${{none:"",sm:"p-4",md:"p-6",lg:"p-8"}[r]}
        ${i?"hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer":""}
        ${s}
      `,onClick:n,...a,children:e})])},98980,e=>{"use strict";var t=e.i(96683),r=e.i(78780);e.s(["Button",0,({children:e,variant:i="primary",size:s="md",isLoading:n=!1,leftIcon:a,rightIcon:o,className:l="",disabled:d,href:c,locale:u,...h})=>{let f=`
    inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${{primary:"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",secondary:"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 shadow-sm",outline:"bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",ghost:"bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",danger:"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md"}[i]}
    ${{sm:"px-3 py-1.5 text-xs min-h-8",md:"px-4 py-2 text-sm min-h-10",lg:"px-6 py-3 text-base min-h-12"}[s]}
    ${l}
  `,p=(0,t.jsxs)(t.Fragment,{children:[n&&(0,t.jsxs)("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-current",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,t.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,t.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),!n&&a&&(0,t.jsx)("span",{className:"mr-2",children:a}),e,!n&&o&&(0,t.jsx)("span",{className:"ml-2",children:o})]});return c?(0,t.jsx)(r.Link,{href:c,locale:u,className:f,children:p}):(0,t.jsx)("button",{className:f,disabled:d||n,...h,children:p})}])},97483,e=>{"use strict";let t,r;var i,s=e.i(69103);let n={data:""},a=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,o=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let r="",i="",s="";for(let n in e){let a=e[n];"@"==n[0]?"i"==n[1]?r=n+" "+a+";":i+="f"==n[1]?d(a,n):n+"{"+d(a,"k"==n[1]?"":t)+"}":"object"==typeof a?i+=d(a,t?t.replace(/([^,])+/g,e=>n.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):n):null!=a&&(n=/^--/.test(n)?n:n.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(n,a):n+":"+a+";")}return r+(t&&s?t+"{"+s+"}":s)+i},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function h(e){let t,r,i=this||{},s=e.call?e(i.p):e;return((e,t,r,i,s)=>{var n;let h=u(e),f=c[h]||(c[h]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(h));if(!c[f]){let t=h!==e?e:(e=>{let t,r,i=[{}];for(;t=a.exec(e.replace(o,""));)t[4]?i.shift():t[3]?(r=t[3].replace(l," ").trim(),i.unshift(i[0][r]=i[0][r]||{})):i[0][t[1]]=t[2].replace(l," ").trim();return i[0]})(e);c[f]=d(s?{["@keyframes "+f]:t}:t,r?"":"."+f)}let p=r&&c.g?c.g:null;return r&&(c.g=c[f]),n=c[f],p?t.data=t.data.replace(p,n):-1===t.data.indexOf(n)&&(t.data=i?n+t.data:t.data+n),f})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=i.p,s.reduce((e,i,s)=>{let n=t[s];if(n&&n.call){let e=n(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;n=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+i+(null==n?"":n)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(i.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||n})(i.target),i.g,i.o,i.k)}h.bind({g:1});let f,p,m,g=h.bind({k:1});function y(e,t){let r=this||{};return function(){let i=arguments;function s(n,a){let o=Object.assign({},n),l=o.className||s.className;r.p=Object.assign({theme:p&&p()},o),r.o=/ *go\d+/.test(l),o.className=h.apply(r,i)+(l?" "+l:""),t&&(o.ref=a);let d=e;return e[0]&&(d=o.as||e,delete o.as),m&&d[0]&&m(o),f(d,o)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,_=(t=0,()=>(++t).toString()),x=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},v="default",w=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:i}=t;return w(e,{type:+!!e.toasts.find(e=>e.id===i.id),toast:i});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let n=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+n}))}}},k=[],E={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},O=(e,t=v)=>{C[t]=w(C[t]||E,e),k.forEach(([e,r])=>{e===t&&r(C[t])})},R=e=>Object.keys(C).forEach(t=>O(e,t)),j=(e=v)=>t=>{O(t,e)},S={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},N=e=>(t,r)=>{let i,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||_()}))(t,e,r);return j(s.toasterId||(i=s.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===i))))({type:2,toast:s}),s.id},I=(e,t)=>N("blank")(e,t);I.error=N("error"),I.success=N("success"),I.loading=N("loading"),I.custom=N("custom"),I.dismiss=(e,t)=>{let r={type:3,toastId:e};t?j(t)(r):R(r)},I.dismissAll=e=>I.dismiss(void 0,e),I.remove=(e,t)=>{let r={type:4,toastId:e};t?j(t)(r):R(r)},I.removeAll=e=>I.remove(void 0,e),I.promise=(e,t,r)=>{let i=I.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?I.success(s,{id:i,...r,...null==r?void 0:r.success}):I.dismiss(i),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?I.error(s,{id:i,...r,...null==r?void 0:r.error}):I.dismiss(i)}),e};var A=1e3,T=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,L=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,F=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${L} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,z=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,P=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${z} 1s linear infinite;
`,M=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,$=g`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,U=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${$} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,B=y("div")`
  position: absolute;
`,q=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,H=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,K=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${H} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:i}=e;return void 0!==t?"string"==typeof t?s.createElement(K,null,t):t:"blank"===r?null:s.createElement(q,null,s.createElement(P,{...i}),"loading"!==r&&s.createElement(B,null,"error"===r?s.createElement(F,{...i}):s.createElement(U,{...i})))},J=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Q=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=s.memo(({toast:e,position:t,style:r,children:i})=>{let n=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[i,s]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},a=s.createElement(W,{toast:e}),o=s.createElement(Q,{...e.ariaProps},b(e.message,e));return s.createElement(J,{className:e.className,style:{...n,...r,...e.style}},"function"==typeof i?i({icon:a,message:o}):s.createElement(s.Fragment,null,a,o))});i=s.createElement,d.p=void 0,f=i,p=void 0,m=void 0;var Y=({id:e,className:t,style:r,onHeightUpdate:i,children:n})=>{let a=s.useCallback(t=>{if(t){let r=()=>{i(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,i]);return s.createElement("div",{ref:a,className:t,style:r},n)},G=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,V=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:i,children:n,toasterId:a,containerStyle:o,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:i}=((e={},t=v)=>{let[r,i]=(0,s.useState)(C[t]||E),n=(0,s.useRef)(C[t]);(0,s.useEffect)(()=>(n.current!==C[t]&&i(C[t]),k.push([t,i]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let a=r.toasts.map(t=>{var r,i,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(i=e[t.type])?void 0:i.duration)||(null==e?void 0:e.duration)||S[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:a}})(e,t),n=(0,s.useRef)(new Map).current,a=(0,s.useCallback)((e,t=A)=>{if(n.has(e))return;let r=setTimeout(()=>{n.delete(e),o({type:4,toastId:e})},t);n.set(e,r)},[]);(0,s.useEffect)(()=>{if(i)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let i=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(i<0){r.visible&&I.dismiss(r.id);return}return setTimeout(()=>I.dismiss(r.id,t),i)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,i,t]);let o=(0,s.useCallback)(j(t),[t]),l=(0,s.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),d=(0,s.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),c=(0,s.useCallback)(()=>{i&&o({type:6,time:Date.now()})},[i,o]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:i=!1,gutter:s=8,defaultPosition:n}=t||{},a=r.filter(t=>(t.position||n)===(e.position||n)&&t.height),o=a.findIndex(t=>t.id===e.id),l=a.filter((e,t)=>t<o&&e.visible).length;return a.filter(e=>e.visible).slice(...i?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)a(e.id,e.removeDelay);else{let t=n.get(e.id);t&&(clearTimeout(t),n.delete(e.id))}})},[r,a]),{toasts:r,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:u}}})(r,a);return s.createElement("div",{"data-rht-toaster":a||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...o},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let a,o,l=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:i,defaultPosition:t}),u=(a=l.includes("top"),o=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(a?1:-1)}px)`,...a?{top:0}:{bottom:0},...o});return s.createElement(Y,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?G:"",style:u},"custom"===r.type?b(r.message,r):n?n(r):s.createElement(Z,{toast:r,position:l}))}))};e.s(["Toaster",()=>V,"toast",()=>I],97483)},37348,(e,t,r)=>{var i;let s;e.e,i=function e(){var t,r="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==r?r:{},i=!r.document&&!!r.postMessage,s=r.IS_PAPA_WORKER||!1,n={},a=0,o={};function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var t=_(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new f(t),(this._handle.streamer=this)._config=t}).call(this,e),this.parseChunk=function(e,t){var i=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<i){let t=this._config.newline;t||(n=this._config.quoteChar||'"',t=this._handle.guessLineEndings(e,n)),e=[...e.split(t).slice(i)].join(t)}this.isFirstChunk&&v(this._config.beforeFirstChunk)&&void 0!==(n=this._config.beforeFirstChunk(e))&&(e=n),this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e,n=(this._partialLine="",this._handle.parse(i,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(e=n.meta.cursor,this._finished||(this._partialLine=i.substring(e-this._baseIndex),this._baseIndex=e),n&&n.data&&(this._rowCount+=n.data.length),i=this._finished||this._config.preview&&this._rowCount>=this._config.preview,s)r.postMessage({results:n,workerId:o.WORKER_ID,finished:i});else if(v(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=n=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!i||!v(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),i||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){v(this._config.error)?this._config.error(e):s&&this._config.error&&r.postMessage({workerId:o.WORKER_ID,error:e,finished:!1})}}function d(e){var t;(e=e||{}).chunkSize||(e.chunkSize=o.RemoteChunkSize),l.call(this,e),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),i||(t.onload=x(this._chunkLoaded,this),t.onerror=x(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var e,r,s=this._config.downloadRequestHeaders;for(r in s)t.setRequestHeader(r,s[r])}this._config.chunkSize&&(e=this._start+this._config.chunkSize-1,t.setRequestHeader("Range","bytes="+this._start+"-"+e));try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}i&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){let e;4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize||t.responseText.length,this._finished=!this._config.chunkSize||this._start>=(null!==(e=(e=t).getResponseHeader("Content-Range"))?parseInt(e.substring(e.lastIndexOf("/")+1)):-1),this.parseChunk(t.responseText)))},this._chunkError=function(e){e=t.statusText||e,this._sendError(Error(e))}}function c(e){(e=e||{}).chunkSize||(e.chunkSize=o.LocalChunkSize),l.call(this,e);var t,r,i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?((t=new FileReader).onload=x(this._chunkLoaded,this),t.onerror=x(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input,s=(this._config.chunkSize&&(s=Math.min(this._start+this._config.chunkSize,this._input.size),e=r.call(e,this._start,s)),t.readAsText(e,this._config.encoding));i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function u(e){var t;l.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){var e,r;if(!this._finished)return t=(e=this._config.chunkSize)?(r=t.substring(0,e),t.substring(e)):(r=t,""),this._finished=!t,this.parseChunk(r)}}function h(e){l.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=x(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=x(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=x(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=x(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function f(e){var t,r,i,s,n=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,a=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,l=this,d=0,c=0,u=!1,h=!1,f=[],g={data:[],errors:[],meta:{}};function y(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function b(){if(g&&i&&(w("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),i=!1),e.skipEmptyLines&&(g.data=g.data.filter(function(e){return!y(e)})),x()){if(g)if(Array.isArray(g.data[0])){for(var t,r=0;x()&&r<g.data.length;r++)g.data[r].forEach(s);g.data.splice(0,1)}else g.data.forEach(s);function s(t,r){v(e.transformHeader)&&(t=e.transformHeader(t,r)),f.push(t)}}function l(t,r){for(var i=e.header?{}:[],s=0;s<t.length;s++){var o=s,l=t[s],l=((t,r)=>(e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping))?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&((e=>{if(n.test(e)&&-0x20000000000000<(e=parseFloat(e))&&e<0x20000000000000)return 1})(r)?parseFloat(r):a.test(r)?new Date(r):""===r?null:r):r)(o=e.header?s>=f.length?"__parsed_extra":f[s]:o,l=e.transform?e.transform(l,o):l);"__parsed_extra"===o?(i[o]=i[o]||[],i[o].push(l)):i[o]=l}return e.header&&(s>f.length?w("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+s,c+r):s<f.length&&w("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+s,c+r)),i}g&&(e.header||e.dynamicTyping||e.transform)&&(t=1,!g.data.length||Array.isArray(g.data[0])?(g.data=g.data.map(l),t=g.data.length):g.data=l(g.data,0),e.header&&g.meta&&(g.meta.fields=f),c+=t)}function x(){return e.header&&0===f.length}function w(e,t,r,i){e={type:e,code:t,message:r},void 0!==i&&(e.row=i),g.errors.push(e)}v(e.step)&&(s=e.step,e.step=function(t){g=t,x()?b():(b(),0!==g.data.length&&(d+=t.data.length,e.preview&&d>e.preview?r.abort():(g.data=g.data[0],s(g,l))))}),this.parse=function(s,n,a){var l=e.quoteChar||'"',l=(e.newline||(e.newline=this.guessLineEndings(s,l)),i=!1,e.delimiter?v(e.delimiter)&&(e.delimiter=e.delimiter(s),g.meta.delimiter=e.delimiter):((l=((t,r,i,s,n)=>{var a,l,d,c;n=n||[",","	","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var u=0;u<n.length;u++){for(var h,f=n[u],p=0,g=0,b=0,_=(d=void 0,new m({comments:s,delimiter:f,newline:r,preview:10}).parse(t)),x=0;x<_.data.length;x++)i&&y(_.data[x])?b++:(g+=h=_.data[x].length,void 0===d?d=h:0<h&&(p+=Math.abs(h-d),d=h));0<_.data.length&&(g/=_.data.length-b),(void 0===l||p<=l)&&(void 0===c||c<g)&&1.99<g&&(l=p,a=f,c=g)}return{successful:!!(e.delimiter=a),bestDelimiter:a}})(s,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess)).successful?e.delimiter=l.bestDelimiter:(i=!0,e.delimiter=o.DefaultDelimiter),g.meta.delimiter=e.delimiter),_(e));return e.preview&&e.header&&l.preview++,t=s,g=(r=new m(l)).parse(t,n,a),b(),u?{meta:{paused:!0}}:g||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,r.abort(),t=v(e.chunk)?"":t.substring(r.getCharIndex())},this.resume=function(){l.streamer._halted?(u=!1,l.streamer.parseChunk(t,!0)):setTimeout(l.resume,3)},this.aborted=function(){return h},this.abort=function(){h=!0,r.abort(),g.meta.aborted=!0,v(e.complete)&&e.complete(g),t=""},this.guessLineEndings=function(e,t){e=e.substring(0,1048576);var t=RegExp(p(t)+"([^]*?)"+p(t),"gm"),r=(e=e.replace(t,"")).split("\r"),t=e.split("\n"),e=1<t.length&&t[0].length<r[0].length;if(1===r.length||e)return"\n";for(var i=0,s=0;s<r.length;s++)"\n"===r[s][0]&&i++;return i>=r.length/2?"\r\n":"\r"}}function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function m(e){var t=(e=e||{}).delimiter,r=e.newline,i=e.comments,s=e.step,n=e.preview,a=e.fastMode,l=null,d=!1,c=null==e.quoteChar?'"':e.quoteChar,u=c;if(void 0!==e.escapeChar&&(u=e.escapeChar),("string"!=typeof t||-1<o.BAD_DELIMITERS.indexOf(t))&&(t=","),i===t)throw Error("Comment character same as delimiter");!0===i?i="#":("string"!=typeof i||-1<o.BAD_DELIMITERS.indexOf(i))&&(i=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n");var h=0,f=!1;this.parse=function(o,m,g){if("string"!=typeof o)throw Error("Input must be a string");var y=o.length,b=t.length,_=r.length,x=i.length,w=v(s),k=[],E=[],C=[],O=h=0;if(!o)return P();if(a||!1!==a&&-1===o.indexOf(c)){for(var R=o.split(r),j=0;j<R.length;j++){if(C=R[j],h+=C.length,j!==R.length-1)h+=r.length;else if(g)break;if(!i||C.substring(0,x)!==i){if(w){if(k=[],D(C.split(t)),M(),f)return P()}else D(C.split(t));if(n&&n<=j)return k=k.slice(0,n),P(!0)}}return P()}for(var S=o.indexOf(t,h),N=o.indexOf(r,h),I=RegExp(p(u)+p(c),"g"),A=o.indexOf(c,h);;)if(o[h]===c)for(A=h,h++;;){if(-1===(A=o.indexOf(c,A+1)))return g||E.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:k.length,index:h}),F();if(A===y-1)return F(o.substring(h,A).replace(I,c));if(c===u&&o[A+1]===u)A++;else if(c===u||0===A||o[A-1]!==u){-1!==S&&S<A+1&&(S=o.indexOf(t,A+1));var T=L(-1===(N=-1!==N&&N<A+1?o.indexOf(r,A+1):N)?S:Math.min(S,N));if(o.substr(A+1+T,b)===t){C.push(o.substring(h,A).replace(I,c)),o[h=A+1+T+b]!==c&&(A=o.indexOf(c,h)),S=o.indexOf(t,h),N=o.indexOf(r,h);break}if(T=L(N),o.substring(A+1+T,A+1+T+_)===r){if(C.push(o.substring(h,A).replace(I,c)),z(A+1+T+_),S=o.indexOf(t,h),A=o.indexOf(c,h),w&&(M(),f))return P();if(n&&k.length>=n)return P(!0);break}E.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:k.length,index:h}),A++}}else if(i&&0===C.length&&o.substring(h,h+x)===i){if(-1===N)return P();h=N+_,N=o.indexOf(r,h),S=o.indexOf(t,h)}else if(-1!==S&&(S<N||-1===N))C.push(o.substring(h,S)),h=S+b,S=o.indexOf(t,h);else{if(-1===N)break;if(C.push(o.substring(h,N)),z(N+_),w&&(M(),f))return P();if(n&&k.length>=n)return P(!0)}return F();function D(e){k.push(e),O=h}function L(e){return -1!==e&&(e=o.substring(A+1,e))&&""===e.trim()?e.length:0}function F(e){return g||(void 0===e&&(e=o.substring(h)),C.push(e),h=y,D(C),w&&M()),P()}function z(e){h=e,D(C),C=[],N=o.indexOf(r,h)}function P(i){if(e.header&&!m&&k.length&&!d){var s=k[0],n=Object.create(null),a=new Set(s);let t=!1;for(let r=0;r<s.length;r++){let i=s[r];if(n[i=v(e.transformHeader)?e.transformHeader(i,r):i]){let e,o=n[i];for(;e=i+"_"+o,o++,a.has(e););a.add(e),s[r]=e,n[i]++,t=!0,(l=null===l?{}:l)[e]=i}else n[i]=1,s[r]=i;a.add(i)}t&&console.warn("Duplicate headers found and renamed."),d=!0}return{data:k,errors:E,meta:{delimiter:t,linebreak:r,aborted:f,truncated:!!i,cursor:O+(m||0),renamedHeaders:l}}}function M(){s(P()),k=[],E=[]}},this.abort=function(){f=!0},this.getCharIndex=function(){return h}}function g(e){var t=e.data,r=n[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var s={abort:function(){i=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:b,resume:b};if(v(r.userStep)){for(var a=0;a<t.results.data.length&&(r.userStep({data:t.results.data[a],errors:t.results.errors,meta:t.results.meta},s),!i);a++);delete t.results}else v(r.userChunk)&&(r.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!i&&y(t.workerId,t.results)}function y(e,t){var r=n[e];v(r.userComplete)&&r.userComplete(t),r.terminate(),delete n[e]}function b(){throw Error("Not implemented.")}function _(e){if("object"!=typeof e||null===e)return e;var t,r=Array.isArray(e)?[]:{};for(t in e)r[t]=_(e[t]);return r}function x(e,t){return function(){e.apply(t,arguments)}}function v(e){return"function"==typeof e}return o.parse=function(t,i){var s,l,f,p=(i=i||{}).dynamicTyping||!1;if(v(p)&&(i.dynamicTypingFunction=p,p={}),i.dynamicTyping=p,i.transform=!!v(i.transform)&&i.transform,!i.worker||!o.WORKERS_SUPPORTED){let e;return p=null,o.NODE_STREAM_INPUT,"string"==typeof t?(t=65279!==(e=t).charCodeAt(0)?e:e.slice(1),p=new(i.download?d:u)(i)):!0===t.readable&&v(t.read)&&v(t.on)?p=new h(i):(r.File&&t instanceof File||t instanceof Object)&&(p=new c(i)),p.stream(t)}(p=!!o.WORKERS_SUPPORTED&&(l=r.URL||r.webkitURL||null,f=e.toString(),s=o.BLOB_URL||(o.BLOB_URL=l.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",f,")();"],{type:"text/javascript"}))),(s=new r.Worker(s)).onmessage=g,s.id=a++,n[s.id]=s)).userStep=i.step,p.userChunk=i.chunk,p.userComplete=i.complete,p.userError=i.error,i.step=v(i.step),i.chunk=v(i.chunk),i.complete=v(i.complete),i.error=v(i.error),delete i.worker,p.postMessage({input:t,config:i,workerId:p.id})},o.unparse=function(e,t){var r=!1,i=!0,s=",",n="\r\n",a='"',l=a+a,d=!1,c=null,u=!1,h=((()=>{if("object"==typeof t){if("string"!=typeof t.delimiter||o.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(s=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(r=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(d=t.skipEmptyLines),"string"==typeof t.newline&&(n=t.newline),"string"==typeof t.quoteChar&&(a=t.quoteChar),"boolean"==typeof t.header&&(i=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw Error("Option columns is empty");c=t.columns}void 0!==t.escapeChar&&(l=t.escapeChar+a),t.escapeFormulae instanceof RegExp?u=t.escapeFormulae:"boolean"==typeof t.escapeFormulae&&t.escapeFormulae&&(u=/^[=+\-@\t\r].*$/)}})(),RegExp(p(a),"g"));if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return f(null,e,d);if("object"==typeof e[0])return f(c||Object.keys(e[0]),e,d)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||c),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),f(e.fields||[],e.data||[],d);throw Error("Unable to serialize unrecognized input");function f(e,t,r){var a="",o=("string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t)),Array.isArray(e)&&0<e.length),l=!Array.isArray(t[0]);if(o&&i){for(var d=0;d<e.length;d++)0<d&&(a+=s),a+=m(e[d],d);0<t.length&&(a+=n)}for(var c=0;c<t.length;c++){var u=(o?e:t[c]).length,h=!1,f=o?0===Object.keys(t[c]).length:0===t[c].length;if(r&&!o&&(h="greedy"===r?""===t[c].join("").trim():1===t[c].length&&0===t[c][0].length),"greedy"===r&&o){for(var p=[],g=0;g<u;g++){var y=l?e[g]:g;p.push(t[c][y])}h=""===p.join("").trim()}if(!h){for(var b=0;b<u;b++){0<b&&!f&&(a+=s);var _=o&&l?e[b]:b;a+=m(t[c][_],b)}c<t.length-1&&(!r||0<u&&!f)&&(a+=n)}}return a}function m(e,t){var i,n;return null==e?"":e.constructor===Date?JSON.stringify(e).slice(1,25):(n=!1,u&&"string"==typeof e&&u.test(e)&&(e="'"+e,n=!0),i=e.toString().replace(h,l),(n=n||!0===r||"function"==typeof r&&r(e,t)||Array.isArray(r)&&r[t]||((e,t)=>{for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1})(i,o.BAD_DELIMITERS)||-1<i.indexOf(s)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?a+i+a:i)}},o.RECORD_SEP="\x1e",o.UNIT_SEP="\x1f",o.BYTE_ORDER_MARK="\uFEFF",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!i&&!!r.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=0xa00000,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=m,o.ParserHandle=f,o.NetworkStreamer=d,o.FileStreamer=c,o.StringStreamer=u,o.ReadableStreamStreamer=h,r.jQuery&&((t=r.jQuery).fn.parse=function(e){var i=e.config||{},s=[];return this.each(function(e){if(!("INPUT"===t(this).prop("tagName").toUpperCase()&&"file"===t(this).attr("type").toLowerCase()&&r.FileReader)||!this.files||0===this.files.length)return!0;for(var n=0;n<this.files.length;n++)s.push({file:this.files[n],inputElem:this,instanceConfig:t.extend({},i)})}),n(),this;function n(){if(0===s.length)v(e.complete)&&e.complete();else{var r,i,n,l=s[0];if(v(e.before)){var d=e.before(l.file,l.inputElem);if("object"==typeof d){if("abort"===d.action)return r=l.file,i=l.inputElem,n=d.reason,void(v(e.error)&&e.error({name:"AbortError"},r,i,n));if("skip"===d.action)return void a();"object"==typeof d.config&&(l.instanceConfig=t.extend(l.instanceConfig,d.config))}else if("skip"===d)return void a()}var c=l.instanceConfig.complete;l.instanceConfig.complete=function(e){v(c)&&c(e,l.file,l.inputElem),a()},o.parse(l.file,l.instanceConfig)}}function a(){s.splice(0,1),n()}}),s&&(r.onmessage=function(e){e=e.data,void 0===o.WORKER_ID&&e&&(o.WORKER_ID=e.workerId),"string"==typeof e.input?r.postMessage({workerId:o.WORKER_ID,results:o.parse(e.input,e.config),finished:!0}):(r.File&&e.input instanceof File||e.input instanceof Object)&&(e=o.parse(e.input,e.config))&&r.postMessage({workerId:o.WORKER_ID,results:e,finished:!0})}),(d.prototype=Object.create(l.prototype)).constructor=d,(c.prototype=Object.create(l.prototype)).constructor=c,(u.prototype=Object.create(u.prototype)).constructor=u,(h.prototype=Object.create(l.prototype)).constructor=h,o},"function"==typeof define&&define.amd?void 0!==(s=i())&&e.v(s):t.exports=i()},70836,e=>{"use strict";var t=e.i(96683),r=e.i(69103),i=e.i(78306),s=e.i(98980),n=e.i(32901),a=e.i(37348),o=e.i(97483);function l(){let e=(0,i.useTranslations)("Tools.csv-to-json.ui"),[l,d]=(0,r.useState)(""),[c,u]=(0,r.useState)(""),[h,f]=(0,r.useState)(!0),[p,m]=(0,r.useState)(!0);return(0,t.jsxs)("div",{className:"max-w-4xl mx-auto space-y-6",children:[(0,t.jsx)(o.Toaster,{position:"bottom-right"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsxs)(n.Card,{className:"p-6 space-y-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-700",children:"CSV Input"}),(0,t.jsx)(s.Button,{onClick:()=>{d(""),u("")},variant:"ghost",size:"sm",className:"text-gray-500 hover:text-red-500",children:e("clear")})]}),(0,t.jsx)("textarea",{value:l,onChange:e=>d(e.target.value),placeholder:e("inputPlaceholder"),className:"w-full h-[400px] p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none",spellCheck:!1})]}),(0,t.jsxs)(n.Card,{className:"p-6 space-y-4",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-700",children:"JSON Output"}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(s.Button,{onClick:()=>{navigator.clipboard.writeText(c),o.toast.success(e("copied"))},disabled:!c,variant:"outline",size:"sm",children:e("copy")}),(0,t.jsx)(s.Button,{onClick:()=>{if(!c)return;let e=new Blob([c],{type:"application/json;charset=utf-8;"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t,r.download=`converted-${new Date().toISOString()}.json`,r.click()},disabled:!c,size:"sm",className:"bg-green-600 hover:bg-green-700 text-white",children:e("download")})]})]}),(0,t.jsx)("textarea",{value:c,readOnly:!0,placeholder:e("outputPlaceholder"),className:"w-full h-[400px] p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg resize-none"})]})]}),(0,t.jsx)(n.Card,{className:"p-4",children:(0,t.jsxs)("div",{className:"flex flex-wrap items-center gap-6 justify-center",children:[(0,t.jsxs)("span",{className:"font-medium text-gray-700",children:[e("options"),":"]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:h,onChange:e=>f(e.target.checked),className:"w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"}),(0,t.jsx)("span",{className:"text-sm text-gray-600",children:e("header")})]}),(0,t.jsxs)("label",{className:"flex items-center gap-2 cursor-pointer",children:[(0,t.jsx)("input",{type:"checkbox",checked:p,onChange:e=>m(e.target.checked),className:"w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"}),(0,t.jsx)("span",{className:"text-sm text-gray-600",children:e("skipEmptyLines")})]}),(0,t.jsx)(s.Button,{onClick:()=>{try{let t=a.default.parse(l,{header:h,skipEmptyLines:p});if(t.errors.length>0){console.error(t.errors),o.toast.error(e("error"));return}u(JSON.stringify(t.data,null,2))}catch(t){console.error(t),o.toast.error(e("error"))}},disabled:!l,className:"bg-blue-600 hover:bg-blue-700 text-white px-8",children:e("convert")})]})})]})}e.s(["default",()=>l])}]);