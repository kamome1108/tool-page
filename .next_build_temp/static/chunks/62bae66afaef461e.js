(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32901,e=>{"use strict";var t=e.i(96683);e.s(["Card",0,({children:e,padding:a="md",hover:r=!1,className:s="",onClick:o,...i})=>(0,t.jsx)("div",{className:`
        bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden
        ${{none:"",sm:"p-4",md:"p-6",lg:"p-8"}[a]}
        ${r?"hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer":""}
        ${s}
      `,onClick:o,...i,children:e})])},98980,e=>{"use strict";var t=e.i(96683),a=e.i(78780);e.s(["Button",0,({children:e,variant:r="primary",size:s="md",isLoading:o=!1,leftIcon:i,rightIcon:l,className:n="",disabled:d,href:c,locale:u,...m})=>{let p=`
    inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${{primary:"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",secondary:"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 shadow-sm",outline:"bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",ghost:"bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",danger:"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md"}[r]}
    ${{sm:"px-3 py-1.5 text-xs min-h-8",md:"px-4 py-2 text-sm min-h-10",lg:"px-6 py-3 text-base min-h-12"}[s]}
    ${n}
  `,f=(0,t.jsxs)(t.Fragment,{children:[o&&(0,t.jsxs)("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-current",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,t.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,t.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),!o&&i&&(0,t.jsx)("span",{className:"mr-2",children:i}),e,!o&&l&&(0,t.jsx)("span",{className:"ml-2",children:l})]});return c?(0,t.jsx)(a.Link,{href:c,locale:u,className:p,children:f}):(0,t.jsx)("button",{className:p,disabled:d||o,...m,children:f})}])},97483,e=>{"use strict";let t,a;var r,s=e.i(69103);let o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let o in e){let i=e[o];"@"==o[0]?"i"==o[1]?a=o+" "+i+";":r+="f"==o[1]?d(i,o):o+"{"+d(i,"k"==o[1]?"":t)+"}":"object"==typeof i?r+=d(i,t?t.replace(/([^,])+/g,e=>o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=i&&(o=/^--/.test(o)?o:o.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(o,i):o+":"+i+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},u=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+u(e[a]);return t}return e};function m(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var o;let m=u(e),p=c[m]||(c[m]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(m));if(!c[p]){let t=m!==e?e:(e=>{let t,a,r=[{}];for(;t=i.exec(e.replace(l,""));)t[4]?r.shift():t[3]?(a=t[3].replace(n," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);c[p]=d(s?{["@keyframes "+p]:t}:t,a?"":"."+p)}let f=a&&c.g?c.g:null;return a&&(c.g=c[p]),o=c[p],f?t.data=t.data.replace(f,o):-1===t.data.indexOf(o)&&(t.data=r?o+t.data:t.data+o),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let o=t[s];if(o&&o.call){let e=o(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==o?"":o)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||o})(r.target),r.g,r.o,r.k)}m.bind({g:1});let p,f,h,g=m.bind({k:1});function b(e,t){let a=this||{};return function(){let r=arguments;function s(o,i){let l=Object.assign({},o),n=l.className||s.className;a.p=Object.assign({theme:f&&f()},l),a.o=/ *go\d+/.test(n),l.className=m.apply(a,r)+(n?" "+n:""),t&&(l.ref=i);let d=e;return e[0]&&(d=l.as||e,delete l.as),h&&d[0]&&h(l),p(d,l)}return t?t(s):s}}var y=(e,t)=>"function"==typeof e?e(t):e,x=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},w="default",j=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+o}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},k={},$=(e,t=w)=>{k[t]=j(k[t]||C,e),N.forEach(([e,a])=>{e===t&&a(k[t])})},E=e=>Object.keys(k).forEach(t=>$(e,t)),D=(e=w)=>t=>{$(t,e)},A={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||x()}))(t,e,a);return D(s.toasterId||(r=s.id,Object.keys(k).find(e=>k[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},z=(e,t)=>O("blank")(e,t);z.error=O("error"),z.success=O("success"),z.loading=O("loading"),z.custom=O("custom"),z.dismiss=(e,t)=>{let a={type:3,toastId:e};t?D(t)(a):E(a)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let a={type:4,toastId:e};t?D(t)(a):E(a)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,a)=>{let r=z.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?y(t.success,e):void 0;return s?z.success(s,{id:r,...a,...null==a?void 0:a.success}):z.dismiss(r),e}).catch(e=>{let s=t.error?y(t.error,e):void 0;s?z.error(s,{id:r,...a,...null==a?void 0:a.error}):z.dismiss(r)}),e};var T=1e3,I=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=g`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=g`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,R=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,S=b("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${R} 1s linear infinite;
`,U=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,M=g`
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
}`,_=b("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${M} 0.2s ease-out forwards;
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
`,F=b("div")`
  position: absolute;
`,H=b("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=g`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=b("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===a?null:s.createElement(H,null,s.createElement(S,{...r}),"loading"!==a&&s.createElement(F,null,"error"===a?s.createElement(P,{...r}):s.createElement(_,{...r})))},W=b("div")`
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
`,Y=b("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=s.memo(({toast:e,position:t,style:a,children:r})=>{let o=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},i=s.createElement(V,{toast:e}),l=s.createElement(Y,{...e.ariaProps},y(e.message,e));return s.createElement(W,{className:e.className,style:{...o,...a,...e.style}},"function"==typeof r?r({icon:i,message:l}):s.createElement(s.Fragment,null,i,l))});r=s.createElement,d.p=void 0,p=r,f=void 0,h=void 0;var G=({id:e,className:t,style:a,onHeightUpdate:r,children:o})=>{let i=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:i,className:t,style:a},o)},J=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Q=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:o,toasterId:i,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=w)=>{let[a,r]=(0,s.useState)(k[t]||C),o=(0,s.useRef)(k[t]);(0,s.useEffect)(()=>(o.current!==k[t]&&r(k[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let i=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||A[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:i}})(e,t),o=(0,s.useRef)(new Map).current,i=(0,s.useCallback)((e,t=T)=>{if(o.has(e))return;let a=setTimeout(()=>{o.delete(e),l({type:4,toastId:e})},t);o.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&z.dismiss(a.id);return}return setTimeout(()=>z.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let l=(0,s.useCallback)(D(t),[t]),n=(0,s.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,s.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,s.useCallback)(()=>{r&&l({type:6,time:Date.now()})},[r,l]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:o}=t||{},i=a.filter(t=>(t.position||o)===(e.position||o)&&t.height),l=i.findIndex(t=>t.id===e.id),n=i.filter((e,t)=>t<l&&e.visible).length;return i.filter(e=>e.visible).slice(...r?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)i(e.id,e.removeDelay);else{let t=o.get(e.id);t&&(clearTimeout(t),o.delete(e.id))}})},[a,i]),{toasts:a,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(a,i);return s.createElement("div",{"data-rht-toaster":i||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let i,l,n=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),u=(i=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(i?1:-1)}px)`,...i?{top:0}:{bottom:0},...l});return s.createElement(G,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?J:"",style:u},"custom"===a.type?y(a.message,a):o?o(a):s.createElement(Z,{toast:a,position:n}))}))};e.s(["Toaster",()=>Q,"toast",()=>z],97483)},72738,e=>{"use strict";var t=e.i(96683),a=e.i(69103),r=e.i(78306),s=e.i(98980),o=e.i(32901),i=e.i(97483);function l(){let e=(0,r.useTranslations)("Tools.robots-txt-generator.ui"),[l,n]=(0,a.useState)({userAgent:"*",allow:"",disallow:"",sitemap:"",crawlDelay:""}),[d,c]=(0,a.useState)(""),u=e=>{let{name:t,value:a}=e.target;n(e=>({...e,[t]:a}))};return(0,t.jsxs)("div",{className:"max-w-4xl mx-auto space-y-6",children:[(0,t.jsx)(i.Toaster,{position:"bottom-right"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsxs)(o.Card,{className:"p-6 space-y-4",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("userAgent")}),(0,t.jsx)("input",{type:"text",name:"userAgent",value:l.userAgent,onChange:u,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"*"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("crawlDelay")}),(0,t.jsx)("input",{type:"number",name:"crawlDelay",value:l.crawlDelay,onChange:u,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"10"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("allow")}),(0,t.jsx)("textarea",{name:"allow",value:l.allow,onChange:u,className:"w-full p-2 border border-gray-300 rounded-md h-24 resize-none",placeholder:"/public/ /images/"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("disallow")}),(0,t.jsx)("textarea",{name:"disallow",value:l.disallow,onChange:u,className:"w-full p-2 border border-gray-300 rounded-md h-24 resize-none",placeholder:"/admin/ /private/"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("sitemap")}),(0,t.jsx)("input",{type:"text",name:"sitemap",value:l.sitemap,onChange:u,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"https://example.com/sitemap.xml"})]}),(0,t.jsxs)("div",{className:"flex gap-4 pt-4",children:[(0,t.jsx)(s.Button,{onClick:()=>{n({userAgent:"*",allow:"",disallow:"",sitemap:"",crawlDelay:""}),c("")},variant:"outline",className:"w-1/3",children:e("clear")}),(0,t.jsx)(s.Button,{onClick:()=>{let e=`User-agent: ${l.userAgent}
`;l.crawlDelay&&(e+=`Crawl-delay: ${l.crawlDelay}
`),l.allow&&l.allow.split("\n").filter(e=>e.trim()).forEach(t=>{e+=`Allow: ${t.trim()}
`}),l.disallow&&l.disallow.split("\n").filter(e=>e.trim()).forEach(t=>{e+=`Disallow: ${t.trim()}
`}),l.sitemap&&(e+=`
Sitemap: ${l.sitemap}`),c(e.trim())},className:"w-2/3 bg-blue-600 hover:bg-blue-700 text-white",children:e("generate")})]})]}),(0,t.jsxs)(o.Card,{className:"p-6 space-y-4 h-fit",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center border-b pb-2",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-700",children:e("preview")}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)(s.Button,{onClick:()=>{navigator.clipboard.writeText(d),i.toast.success(e("copied"))},disabled:!d,size:"sm",variant:"outline",children:e("copy")}),(0,t.jsx)(s.Button,{onClick:()=>{let e=new Blob([d],{type:"text/plain"}),t=URL.createObjectURL(e),a=document.createElement("a");a.href=t,a.download="robots.txt",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(t)},disabled:!d,size:"sm",variant:"outline",children:e("download")})]})]}),(0,t.jsx)("div",{className:"bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto min-h-[300px] whitespace-pre",children:d||"# robots.txt content will appear here"})]})]})]})}e.s(["default",()=>l])}]);