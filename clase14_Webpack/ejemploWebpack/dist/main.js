(()=>{"use strict";var o={468:(o,e,r)=>{r.d(e,{Z:()=>n});const n=class{constructor(o,e){this.nombre=o,this.edad=e}}},682:(o,e,r)=>{r.d(e,{B:()=>n,o:()=>t});const n=()=>console.log("Funcion 1"),t=()=>console.log("Funcion 2")},364:(o,e,r)=>{var n=r(682);const t=new(r(468).Z)("Juan Pérez",25);(0,n.B)(),(0,n.o)(),console.log(`${t.nombre} tiene ${t.edad} años`)}},e={};function r(n){var t=e[n];if(void 0!==t)return t.exports;var s=e[n]={exports:{}};return o[n](s,s.exports,r),s.exports}r.d=(o,e)=>{for(var n in e)r.o(e,n)&&!r.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},r.o=(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r(364),r(468),r(682)})();