(()=>{"use strict";var e={130:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t){this.fname=e,this.lname=t}getFullName(){return`${this.fname} ${this.lname}`}}},607:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=r(o(860)),n=o(721),a=new(r(o(130)).default)("Coder","House"),l=(0,s.default)();l.get("/",((e,t)=>{t.json({time:(0,n.getTime)(),name:a.getFullName()})})),l.listen(8080,(()=>{console.log("conectado al puerto: 8080")}))},721:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getTime=void 0,t.getTime=()=>({fyh:(new Date).toLocaleString(),timestamp:Date.now()})},860:e=>{e.exports=require("express")}},t={};!function o(r){var s=t[r];if(void 0!==s)return s.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,o),n.exports}(607)})();