(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32901,e=>{"use strict";var t=e.i(96683);e.s(["Card",0,({children:e,padding:a="md",hover:r=!1,className:s="",onClick:i,...o})=>(0,t.jsx)("div",{className:`
        bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden
        ${{none:"",sm:"p-4",md:"p-6",lg:"p-8"}[a]}
        ${r?"hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer":""}
        ${s}
      `,onClick:i,...o,children:e})])},98980,e=>{"use strict";var t=e.i(96683),a=e.i(78780);e.s(["Button",0,({children:e,variant:r="primary",size:s="md",isLoading:i=!1,leftIcon:o,rightIcon:n,className:l="",disabled:d,href:c,locale:m,...p})=>{let u=`
    inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${{primary:"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",secondary:"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 shadow-sm",outline:"bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",ghost:"bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",danger:"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md"}[r]}
    ${{sm:"px-3 py-1.5 text-xs min-h-8",md:"px-4 py-2 text-sm min-h-10",lg:"px-6 py-3 text-base min-h-12"}[s]}
    ${l}
  `,g=(0,t.jsxs)(t.Fragment,{children:[i&&(0,t.jsxs)("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-current",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,t.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,t.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),!i&&o&&(0,t.jsx)("span",{className:"mr-2",children:o}),e,!i&&n&&(0,t.jsx)("span",{className:"ml-2",children:n})]});return c?(0,t.jsx)(a.Link,{href:c,locale:m,className:u,children:g}):(0,t.jsx)("button",{className:u,disabled:d||i,...p,children:g})}])},97483,e=>{"use strict";let t,a;var r,s=e.i(69103);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,d=(e,t)=>{let a="",r="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+o+";":r+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=d.p?d.p(i,o):i+":"+o+";")}return a+(t&&s?t+"{"+s+"}":s)+r},c={},m=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+m(e[a]);return t}return e};function p(e){let t,a,r=this||{},s=e.call?e(r.p):e;return((e,t,a,r,s)=>{var i;let p=m(e),u=c[p]||(c[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!c[u]){let t=p!==e?e:(e=>{let t,a,r=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?r.shift():t[3]?(a=t[3].replace(l," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(l," ").trim();return r[0]})(e);c[u]=d(s?{["@keyframes "+u]:t}:t,a?"":"."+u)}let g=a&&c.g?c.g:null;return a&&(c.g=c[u]),i=c[u],g?t.data=t.data.replace(g,i):-1===t.data.indexOf(i)&&(t.data=r?i+t.data:t.data+i),u})(s.unshift?s.raw?(t=[].slice.call(arguments,1),a=r.p,s.reduce((e,r,s)=>{let i=t[s];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+r+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(r.target),r.g,r.o,r.k)}p.bind({g:1});let u,g,h,f=p.bind({k:1});function y(e,t){let a=this||{};return function(){let r=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;a.p=Object.assign({theme:g&&g()},n),a.o=/ *go\d+/.test(l),n.className=p.apply(a,r)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),h&&d[0]&&h(n),u(d,n)}return t?t(s):s}}var x=(e,t)=>"function"==typeof e?e(t):e,b=(t=0,()=>(++t).toString()),v=()=>{if(void 0===a&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a},w="default",j=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===r.id),toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},$={},k=(e,t=w)=>{$[t]=j($[t]||C,e),N.forEach(([e,a])=>{e===t&&a($[t])})},E=e=>Object.keys($).forEach(t=>k(e,t)),T=(e=w)=>t=>{k(t,e)},H={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},O=e=>(t,a)=>{let r,s=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||b()}))(t,e,a);return T(s.toasterId||(r=s.id,Object.keys($).find(e=>$[e].toasts.some(e=>e.id===r))))({type:2,toast:s}),s.id},D=(e,t)=>O("blank")(e,t);D.error=O("error"),D.success=O("success"),D.loading=O("loading"),D.custom=O("custom"),D.dismiss=(e,t)=>{let a={type:3,toastId:e};t?T(t)(a):E(a)},D.dismissAll=e=>D.dismiss(void 0,e),D.remove=(e,t)=>{let a={type:4,toastId:e};t?T(t)(a):E(a)},D.removeAll=e=>D.remove(void 0,e),D.promise=(e,t,a)=>{let r=D.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?x(t.success,e):void 0;return s?D.success(s,{id:r,...a,...null==a?void 0:a.success}):D.dismiss(r),e}).catch(e=>{let s=t.error?x(t.error,e):void 0;s?D.error(s,{id:r,...a,...null==a?void 0:a.error}):D.dismiss(r)}),e};var z=1e3,A=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,I=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,_=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,P=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${A} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${I} 0.15s ease-out forwards;
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
    animation: ${_} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,S=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,L=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,M=f`
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
}`,F=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
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
`,R=y("div")`
  position: absolute;
`,U=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:a,iconTheme:r}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===a?null:s.createElement(U,null,s.createElement(S,{...r}),"loading"!==a&&s.createElement(R,null,"error"===a?s.createElement(P,{...r}):s.createElement(F,{...r})))},W=y("div")`
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
`,Y=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Z=s.memo(({toast:e,position:t,style:a,children:r})=>{let i=e.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,s]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*a}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*a}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${f(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(V,{toast:e}),n=s.createElement(Y,{...e.ariaProps},x(e.message,e));return s.createElement(W,{className:e.className,style:{...i,...a,...e.style}},"function"==typeof r?r({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});r=s.createElement,d.p=void 0,u=r,g=void 0,h=void 0;var G=({id:e,className:t,style:a,onHeightUpdate:r,children:i})=>{let o=s.useCallback(t=>{if(t){let a=()=>{r(e,t.getBoundingClientRect().height)};a(),new MutationObserver(a).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return s.createElement("div",{ref:o,className:t,style:a},i)},J=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Q=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:r,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:a,pausedAt:r}=((e={},t=w)=>{let[a,r]=(0,s.useState)($[t]||C),i=(0,s.useRef)($[t]);(0,s.useEffect)(()=>(i.current!==$[t]&&r($[t]),N.push([t,r]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=a.toasts.map(t=>{var a,r,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(a=e[t.type])?void 0:a.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||H[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...a,toasts:o}})(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=z)=>{if(i.has(e))return;let a=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,a)},[]);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),s=a.map(a=>{if(a.duration===1/0)return;let r=(a.duration||0)+a.pauseDuration-(e-a.createdAt);if(r<0){a.visible&&D.dismiss(a.id);return}return setTimeout(()=>D.dismiss(a.id,t),r)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[a,r,t]);let n=(0,s.useCallback)(T(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),d=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),c=(0,s.useCallback)(()=>{r&&n({type:6,time:Date.now()})},[r,n]),m=(0,s.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:s=8,defaultPosition:i}=t||{},o=a.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[a]);return(0,s.useEffect)(()=>{a.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[a,o]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:c,calculateOffset:m}}})(a,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(a=>{let o,n,l=a.position||t,d=c.calculateOffset(a,{reverseOrder:e,gutter:r,defaultPosition:t}),m=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(G,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?J:"",style:m},"custom"===a.type?x(a.message,a):i?i(a):s.createElement(Z,{toast:a,position:l}))}))};e.s(["Toaster",()=>Q,"toast",()=>D],97483)},82017,e=>{"use strict";var t=e.i(96683),a=e.i(69103),r=e.i(78306),s=e.i(98980),i=e.i(32901),o=e.i(97483);function n(){let e=(0,r.useTranslations)("Tools.twitter-card-generator.ui"),[n,l]=(0,a.useState)({cardType:"summary",siteHandle:"",creatorHandle:"",title:"",description:"",image:""}),[d,c]=(0,a.useState)(""),m=e=>{let{name:t,value:a}=e.target;l(e=>({...e,[t]:a}))};return(0,t.jsxs)("div",{className:"max-w-4xl mx-auto space-y-6",children:[(0,t.jsx)(o.Toaster,{position:"bottom-right"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,t.jsxs)(i.Card,{className:"p-6 space-y-4",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("cardType")}),(0,t.jsxs)("select",{name:"cardType",value:n.cardType,onChange:m,className:"w-full p-2 border border-gray-300 rounded-md",children:[(0,t.jsx)("option",{value:"summary",children:e("types.summary")}),(0,t.jsx)("option",{value:"summary_large_image",children:e("types.summary_large_image")}),(0,t.jsx)("option",{value:"app",children:e("types.app")}),(0,t.jsx)("option",{value:"player",children:e("types.player")})]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("siteHandle")}),(0,t.jsx)("input",{type:"text",name:"siteHandle",value:n.siteHandle,onChange:m,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"@username"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("creatorHandle")}),(0,t.jsx)("input",{type:"text",name:"creatorHandle",value:n.creatorHandle,onChange:m,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"@creator"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("title")}),(0,t.jsx)("input",{type:"text",name:"title",value:n.title,onChange:m,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"Card Title"})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("description")}),(0,t.jsx)("textarea",{name:"description",value:n.description,onChange:m,className:"w-full p-2 border border-gray-300 rounded-md h-24 resize-none",placeholder:"Card Description..."})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium text-gray-700",children:e("image")}),(0,t.jsx)("input",{type:"text",name:"image",value:n.image,onChange:m,className:"w-full p-2 border border-gray-300 rounded-md",placeholder:"https://example.com/image.jpg"})]}),(0,t.jsxs)("div",{className:"flex gap-4 pt-4",children:[(0,t.jsx)(s.Button,{onClick:()=>{l({cardType:"summary",siteHandle:"",creatorHandle:"",title:"",description:"",image:""}),c("")},variant:"outline",className:"w-1/3",children:e("clear")}),(0,t.jsx)(s.Button,{onClick:()=>{let e="";n.cardType&&(e+=`<meta name="twitter:card" content="${n.cardType}" />
`),n.siteHandle&&(e+=`<meta name="twitter:site" content="${n.siteHandle}" />
`),n.creatorHandle&&(e+=`<meta name="twitter:creator" content="${n.creatorHandle}" />
`),n.title&&(e+=`<meta name="twitter:title" content="${n.title}" />
`),n.description&&(e+=`<meta name="twitter:description" content="${n.description}" />
`),n.image&&(e+=`<meta name="twitter:image" content="${n.image}" />
`),c(e.trim())},className:"w-2/3 bg-blue-600 hover:bg-blue-700 text-white",children:e("generate")})]})]}),(0,t.jsxs)(i.Card,{className:"p-6 space-y-4 h-fit",children:[(0,t.jsxs)("div",{className:"flex justify-between items-center border-b pb-2",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-700",children:e("preview")}),(0,t.jsx)(s.Button,{onClick:()=>{navigator.clipboard.writeText(d),o.toast.success(e("copied"))},disabled:!d,size:"sm",variant:"outline",children:e("copy")})]}),(0,t.jsx)("div",{className:"bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto min-h-[300px] whitespace-pre",children:d||"<!-- Twitter Card tags will appear here -->"})]})]})]})}e.s(["default",()=>n])}]);