(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,32901,e=>{"use strict";var t=e.i(96683);e.s(["Card",0,({children:e,padding:r="md",hover:s=!1,className:a="",onClick:i,...o})=>(0,t.jsx)("div",{className:`
        bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden
        ${{none:"",sm:"p-4",md:"p-6",lg:"p-8"}[r]}
        ${s?"hover:shadow-xl hover:border-transparent transition-all duration-300 cursor-pointer":""}
        ${a}
      `,onClick:i,...o,children:e})])},98980,e=>{"use strict";var t=e.i(96683),r=e.i(78780);e.s(["Button",0,({children:e,variant:s="primary",size:a="md",isLoading:i=!1,leftIcon:o,rightIcon:l,className:n="",disabled:d,href:c,locale:u,...p})=>{let m=`
    inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
    ${{primary:"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",secondary:"bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 shadow-sm",outline:"bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500",ghost:"bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500",danger:"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md"}[s]}
    ${{sm:"px-3 py-1.5 text-xs min-h-8",md:"px-4 py-2 text-sm min-h-10",lg:"px-6 py-3 text-base min-h-12"}[a]}
    ${n}
  `,h=(0,t.jsxs)(t.Fragment,{children:[i&&(0,t.jsxs)("svg",{className:"animate-spin -ml-1 mr-2 h-4 w-4 text-current",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,t.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,t.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),!i&&o&&(0,t.jsx)("span",{className:"mr-2",children:o}),e,!i&&l&&(0,t.jsx)("span",{className:"ml-2",children:l})]});return c?(0,t.jsx)(r.Link,{href:c,locale:u,className:m,children:h}):(0,t.jsx)("button",{className:m,disabled:d||i,...p,children:h})}])},97483,e=>{"use strict";let t,r;var s,a=e.i(69103);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,l=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,d=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?d(o,i):i+"{"+d(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=d(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=d.p?d.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},c={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function p(e){let t,r,s=this||{},a=e.call?e(s.p):e;return((e,t,r,s,a)=>{var i;let p=u(e),m=c[p]||(c[p]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(p));if(!c[m]){let t=p!==e?e:(e=>{let t,r,s=[{}];for(;t=o.exec(e.replace(l,""));)t[4]?s.shift():t[3]?(r=t[3].replace(n," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(n," ").trim();return s[0]})(e);c[m]=d(a?{["@keyframes "+m]:t}:t,r?"":"."+m)}let h=r&&c.g?c.g:null;return r&&(c.g=c[m]),i=c[m],h?t.data=t.data.replace(h,i):-1===t.data.indexOf(i)&&(t.data=s?i+t.data:t.data+i),m})(a.unshift?a.raw?(t=[].slice.call(arguments,1),r=s.p,a.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":d(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"")):a.reduce((e,t)=>Object.assign(e,t&&t.call?t(s.p):t),{}):a,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(s.target),s.g,s.o,s.k)}p.bind({g:1});let m,h,f,g=p.bind({k:1});function x(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let l=Object.assign({},i),n=l.className||a.className;r.p=Object.assign({theme:h&&h()},l),r.o=/ *go\d+/.test(n),l.className=p.apply(r,s)+(n?" "+n:""),t&&(l.ref=o);let d=e;return e[0]&&(d=l.as||e,delete l.as),f&&d[0]&&f(l),m(d,l)}return t?t(a):a}}var b=(e,t)=>"function"==typeof e?e(t):e,y=(t=0,()=>(++t).toString()),v=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",j=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:s}=t;return j(e,{type:+!!e.toasts.find(e=>e.id===s.id),toast:s});case 3:let{toastId:a}=t;return{...e,toasts:e.toasts.map(e=>e.id===a||void 0===a?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},N=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},C={},$=(e,t=w)=>{C[t]=j(C[t]||k,e),N.forEach(([e,r])=>{e===t&&r(C[t])})},E=e=>Object.keys(C).forEach(t=>$(e,t)),O=(e=w)=>t=>{$(t,e)},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=e=>(t,r)=>{let s,a=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||y()}))(t,e,r);return O(a.toasterId||(s=a.id,Object.keys(C).find(e=>C[e].toasts.some(e=>e.id===s))))({type:2,toast:a}),a.id},A=(e,t)=>D("blank")(e,t);A.error=D("error"),A.success=D("success"),A.loading=D("loading"),A.custom=D("custom"),A.dismiss=(e,t)=>{let r={type:3,toastId:e};t?O(t)(r):E(r)},A.dismissAll=e=>A.dismiss(void 0,e),A.remove=(e,t)=>{let r={type:4,toastId:e};t?O(t)(r):E(r)},A.removeAll=e=>A.remove(void 0,e),A.promise=(e,t,r)=>{let s=A.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?b(t.success,e):void 0;return a?A.success(a,{id:s,...r,...null==r?void 0:r.success}):A.dismiss(s),e}).catch(e=>{let a=t.error?b(t.error,e):void 0;a?A.error(a,{id:s,...r,...null==r?void 0:r.error}):A.dismiss(s)}),e};var I=1e3,T=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,M=g`
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
}`,B=x("div")`
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
    animation: ${M} 0.15s ease-out forwards;
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
`,P=g`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,R=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${P} 1s linear infinite;
`,S=g`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=g`
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
}`,H=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
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
`,_=x("div")`
  position: absolute;
`,U=x("div")`
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
}`,V=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,W=({toast:e})=>{let{icon:t,type:r,iconTheme:s}=e;return void 0!==t?"string"==typeof t?a.createElement(V,null,t):t:"blank"===r?null:a.createElement(U,null,a.createElement(R,{...s}),"loading"!==r&&a.createElement(_,null,"error"===r?a.createElement(B,{...s}):a.createElement(H,{...s})))},Y=x("div")`
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
`,q=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=a.memo(({toast:e,position:t,style:r,children:s})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[s,a]=v()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${g(s)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${g(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=a.createElement(W,{toast:e}),l=a.createElement(q,{...e.ariaProps},b(e.message,e));return a.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof s?s({icon:o,message:l}):a.createElement(a.Fragment,null,o,l))});s=a.createElement,d.p=void 0,m=s,h=void 0,f=void 0;var Z=({id:e,className:t,style:r,onHeightUpdate:s,children:i})=>{let o=a.useCallback(t=>{if(t){let r=()=>{s(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,s]);return a.createElement("div",{ref:o,className:t,style:r},i)},G=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,J=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:s,children:i,toasterId:o,containerStyle:l,containerClassName:n})=>{let{toasts:d,handlers:c}=((e,t="default")=>{let{toasts:r,pausedAt:s}=((e={},t=w)=>{let[r,s]=(0,a.useState)(C[t]||k),i=(0,a.useRef)(C[t]);(0,a.useEffect)(()=>(i.current!==C[t]&&s(C[t]),N.push([t,s]),()=>{let e=N.findIndex(([e])=>e===t);e>-1&&N.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,s,a;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(s=e[t.type])?void 0:s.duration)||(null==e?void 0:e.duration)||z[t.type],style:{...e.style,...null==(a=e[t.type])?void 0:a.style,...t.style}}});return{...r,toasts:o}})(e,t),i=(0,a.useRef)(new Map).current,o=(0,a.useCallback)((e,t=I)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),l({type:4,toastId:e})},t);i.set(e,r)},[]);(0,a.useEffect)(()=>{if(s)return;let e=Date.now(),a=r.map(r=>{if(r.duration===1/0)return;let s=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(s<0){r.visible&&A.dismiss(r.id);return}return setTimeout(()=>A.dismiss(r.id,t),s)});return()=>{a.forEach(e=>e&&clearTimeout(e))}},[r,s,t]);let l=(0,a.useCallback)(O(t),[t]),n=(0,a.useCallback)(()=>{l({type:5,time:Date.now()})},[l]),d=(0,a.useCallback)((e,t)=>{l({type:1,toast:{id:e,height:t}})},[l]),c=(0,a.useCallback)(()=>{s&&l({type:6,time:Date.now()})},[s,l]),u=(0,a.useCallback)((e,t)=>{let{reverseOrder:s=!1,gutter:a=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),l=o.findIndex(t=>t.id===e.id),n=o.filter((e,t)=>t<l&&e.visible).length;return o.filter(e=>e.visible).slice(...s?[n+1]:[0,n]).reduce((e,t)=>e+(t.height||0)+a,0)},[r]);return(0,a.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:d,startPause:n,endPause:c,calculateOffset:u}}})(r,o);return a.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...l},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},d.map(r=>{let o,l,n=r.position||t,d=c.calculateOffset(r,{reverseOrder:e,gutter:s,defaultPosition:t}),u=(o=n.includes("top"),l=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:v()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${d*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...l});return a.createElement(Z,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?G:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):a.createElement(X,{toast:r,position:n}))}))};e.s(["Toaster",()=>J,"toast",()=>A],97483)},56737,e=>{"use strict";var t=e.i(96683),r=e.i(69103),s=e.i(78306),a=e.i(98980),i=e.i(32901),o=e.i(97483);function l(){let e=(0,s.useTranslations)("Tools.image-color-picker.ui"),[l,n]=(0,r.useState)(null),[d,c]=(0,r.useState)(null),u=(0,r.useRef)(null),p=(0,r.useRef)(null);(0,r.useEffect)(()=>{if(l&&u.current){let e=u.current,t=e.getContext("2d"),r=new Image;r.onload=()=>{e.width=r.width,e.height=r.height,t?.drawImage(r,0,0),p.current=r},r.src=l}},[l]);let m=t=>{navigator.clipboard.writeText(t),o.toast.success(e("copied"))};return(0,t.jsxs)("div",{className:"max-w-4xl mx-auto space-y-6",children:[(0,t.jsx)(o.Toaster,{position:"bottom-right"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[(0,t.jsx)(i.Card,{className:"md:col-span-2 p-6",children:l?(0,t.jsxs)("div",{className:"relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center",children:[(0,t.jsx)("canvas",{ref:u,onClick:e=>{if(!u.current)return;let t=u.current,r=t.getContext("2d");if(!r)return;let s=t.getBoundingClientRect(),a=t.width/s.width,i=t.height/s.height,o=(e.clientX-s.left)*a,l=(e.clientY-s.top)*i,n=r.getImageData(o,l,1,1).data,d=n[0],p=n[1],m=n[2],h=`#${(0x1000000+(d<<16)+(p<<8)+m).toString(16).slice(1).toUpperCase()}`,f=`rgb(${d}, ${p}, ${m})`,g=d/255,x=p/255,b=m/255,y=Math.max(g,x,b),v=Math.min(g,x,b),w=0,j=0,N=(y+v)/2;if(y!==v){let e=y-v;switch(j=N>.5?e/(2-y-v):e/(y+v),y){case g:w=(x-b)/e+6*(x<b);break;case x:w=(b-g)/e+2;break;case b:w=(g-x)/e+4}w/=6}c({hex:h,rgb:f,hsl:`hsl(${Math.round(360*w)}, ${Math.round(100*j)}%, ${Math.round(100*N)}%)`})},className:"max-w-full h-auto cursor-crosshair",style:{maxHeight:"600px"}}),(0,t.jsx)("div",{className:"absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm pointer-events-none",children:e("instructions")}),(0,t.jsx)(a.Button,{onClick:()=>{n(null),c(null)},className:"absolute top-4 right-4 bg-white text-gray-700 hover:bg-gray-100",size:"sm",children:"✕"})]}):(0,t.jsxs)("div",{className:"border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors",children:[(0,t.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{let t=e.target.files?.[0];if(t){let e=new FileReader;e.onload=e=>{e.target?.result&&(n(e.target.result),c(null))},e.readAsDataURL(t)}},className:"hidden",id:"image-upload"}),(0,t.jsxs)("label",{htmlFor:"image-upload",className:"cursor-pointer flex flex-col items-center gap-4",children:[(0,t.jsx)("div",{className:"bg-blue-50 p-4 rounded-full",children:(0,t.jsx)("svg",{className:"w-12 h-12 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"})})}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("span",{className:"text-xl font-semibold text-gray-700 block",children:e("selectImage")}),(0,t.jsx)("span",{className:"text-sm text-gray-500 block",children:e("dragDrop")})]})]})]})}),(0,t.jsxs)(i.Card,{className:"p-6 space-y-6 h-fit",children:[(0,t.jsx)("h3",{className:"font-medium text-gray-700 border-b pb-2",children:e("pickedColor")}),(0,t.jsx)("div",{className:"flex items-center justify-center py-8",children:(0,t.jsx)("div",{className:"w-24 h-24 rounded-full shadow-inner border border-gray-200",style:{backgroundColor:d?.hex||"#ffffff"}})}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-xs font-medium text-gray-500",children:e("hex")}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("input",{type:"text",value:d?.hex||"",readOnly:!0,className:"w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"}),(0,t.jsx)(a.Button,{onClick:()=>d&&m(d.hex),disabled:!d,variant:"outline",size:"sm",children:e("copy")})]})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-xs font-medium text-gray-500",children:e("rgb")}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("input",{type:"text",value:d?.rgb||"",readOnly:!0,className:"w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"}),(0,t.jsx)(a.Button,{onClick:()=>d&&m(d.rgb),disabled:!d,variant:"outline",size:"sm",children:e("copy")})]})]}),(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("label",{className:"text-xs font-medium text-gray-500",children:e("hsl")}),(0,t.jsxs)("div",{className:"flex gap-2",children:[(0,t.jsx)("input",{type:"text",value:d?.hsl||"",readOnly:!0,className:"w-full p-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"}),(0,t.jsx)(a.Button,{onClick:()=>d&&m(d.hsl),disabled:!d,variant:"outline",size:"sm",children:e("copy")})]})]})]})]})]})]})}e.s(["default",()=>l])}]);