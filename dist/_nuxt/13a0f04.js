(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{338:function(t,e,l){"use strict";l.r(e);var n={props:{defaultInput:{type:Object,default:function(){return{}}},id:{type:String,default:null},data:{type:Object,default:function(){return{}}}},data:function(){return{lang:this.$store.getters["app/getLanguage"],gvm:this,image:null,input:{image_url:null},selectOptions:{product:[]},labelPage:l(303).catalog.create.galleries.create}},watch:{defaultInput:function(t,e){e&&this.setInput()}},mounted:function(){this.init(),console.log("check default input",this.defaultInput)},methods:{init:function(){this.setInput()},save:function(){var t=this;console.log("check input",t.input),t.$emit("SAVE",t.input)},cancel:function(){this.$emit("CANCEL")},onCheck:function(){},setInput:function(){var t=this;t.defaultInput&&(t.input=t.defaultInput)}}},o=l(37),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("b-form",{on:{submit:function(t){t.stopPropagation(),t.preventDefault()}}},[l("div",{staticClass:"row mb-2"},[l("div",{staticClass:"col-4"},[l("label",{staticClass:"col-form-label"},[t._v(t._s(t.labelPage.field.title[t.lang]))])]),t._v(" "),l("div",{staticClass:"col-8"},[l("b-form-input",{attrs:{placeholder:t.labelPage.field.title[t.lang]},model:{value:t.input.caption,callback:function(e){t.$set(t.input,"caption",e)},expression:"input.caption"}})],1)]),t._v(" "),l("div",{staticClass:"row mb-2"},[l("div",{staticClass:"col-4"},[l("label",{staticClass:"col-form-label"},[t._v(t._s(t.labelPage.field.image[t.lang]))])]),t._v(" "),l("div",{staticClass:"col-8"},[l("b-form-file",{attrs:{placeholder:"Choose a file or drop it here...","drop-placeholder":"Drop file here..."},model:{value:t.image,callback:function(e){t.image=e},expression:"image"}})],1)]),t._v(" "),l("div",{staticClass:"row border-top pt-3"},[l("div",{staticClass:"col"},[l("b-button",{staticClass:"float-right",attrs:{variant:"primary",size:"sm"},on:{click:function(e){return t.save()}}},[t._v("\n          "+t._s((t.defaultInput&&t.defaultInput.id&&t.defaultInput.id,t.labelPage.action.save[t.lang]))+"\n        ")]),t._v(" "),l("b-button",{staticClass:"float-right mr-2",attrs:{variant:"outline-primary",size:"sm"},on:{click:function(e){return t.cancel()}}},[t._v("\n          "+t._s(t.labelPage.action.cancel[t.lang])+"\n        ")])],1)])])],1)}),[],!1,null,null,null);e.default=component.exports}}]);