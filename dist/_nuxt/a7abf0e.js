(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{377:function(t,e,n){"use strict";n.r(e);n(4),n(3),n(1),n(5),n(2),n(6);var l=n(0),r=n(152),c=n(307),o=n(319),d=n(324),h=n(325),filter=n(326);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var C={components:{compBottomMenuContent:o.default},mixins:[d.a,h.a,Object(filter.a)(n(315).catalog)],beforeRouteLeave:function(t,e,n){this.vmCatalogFetch.cancel(),n()},layout:"dashboard",data:function(){return{lang:this.$store.getters["app/getLanguage"],gvm:this,isLoading:!1,selected:[],selecteAll:!1,isSelectedAll:!1,isSelecting:!1,selectAction:null,functionCart:new c.a,labelPage:n(303).catalog.index,labelGeneral:n(150),dropMenu:n(302).catalog,urlPage:n(195).menu_product.menus}},computed:{},watch:{},mounted:function(){},methods:m(m({},r.a),{},{init:function(){this.fetchCatalog()},handleSubmit:function(){var param={key:this.selectAction,data:this.functionCart.carts};switch(this.$store.commit("temp/setData",param),this.selectAction){case"editprice":this.$router.push({path:this.urlPage.price.submenus.edit_price.url});break;case"upprice":this.$router.push({path:this.urlPage.price.submenus.up_price.url});break;case"downprice":this.$router.push({path:this.urlPage.price.submenus.down_price.url});break;default:this.$router.push({path:this.urlPage.catalog.submenus["catalog_"+this.selectAction].url})}},handleCancel:function(){this.isSelecting=!1,this.selected=[]},handleEditing:function(dt){dt&&(this.isSelecting=!0)},handleListClick:function(param){var t=this,e=this;this.isSelecting?(this.functionCart.togle(param),this.$nextTick((function(){t.selected=t.functionCart.indexer})),e.functionCart.carts.length===e.catalogDatas.length?e.isSelectedAll=!0:e.isSelectedAll=!1):this.navigateTo(this,"/dashboard/catalog/detail#".concat(param.uuid),!0)},handleSelectAll:function(param){var dt=this.catalogDatas;if(param){for(var i in this.catalogDatas)!1===this.functionCart.inCart(parseInt(dt[i].id))&&this.functionCart.add(dt[i]);this.selected=this.functionCart.indexer,this.isSelectedAll=!0}else this.functionCart.reset(),this.selected=[],this.isSelectedAll=!1},handleMenuTitle:function(param){switch(param){case"refresh":this.fetchCatalog();break;case"detail":this.selectAction=null,this.isSelecting=!1;break;default:this.selectAction=param,this.isSelecting=!0}},handleMenuCatalog:function(param){switch(param.evt){case"addvarian":case"addAddon":break;default:this.selectAction=param.evt,this.functionCart.togle(param.data),this.handleSubmit()}},handleMenuVarian:function(param){},handleMenuAddon:function(param){},handleCancelSelection:function(){this.isSelecting=!1,this.functionCart.reset()},handlePageChanged:function(dt){this.catalogCurrentPage=dt,this.fetchCatalog()}})},v=n(37),component=Object(v.a)(C,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row mx-0"},[n("div",{staticClass:"col px-3"},[n("div",{staticClass:"row py-2 mt-4 mb-3"},[n("div",{staticClass:"col"},[n("p",{staticClass:"title mb-0"},[t._v("\n          "+t._s(t.labelPage.title[t.lang])+"\n        ")]),t._v(" "),t._m(0)])]),t._v(" "),n("div",{staticClass:"row sticky-top-upper"},[n("div",{staticClass:"col px-2"},[n("div",{staticClass:"row mx-0 mt-2 pt-1 pb-2 round top bottom",style:{"background-color":t.stickyTopMenuClass}},[n("div",{staticClass:"col pl-2"},[n("div",{staticClass:"row mx-0 pb-3"},[n("div",{staticClass:"filter-wrapper flex-grow-1 align-items-start flex-row"},[n("compSearchbar",{staticClass:"searchbar",attrs:{placeholder:t.labelPage.filter.search[t.lang],direction:"all"},on:{search:t.handleSearch}}),t._v(" "),t._l(t.filter,(function(dt,i){return n("compFilterDisplay",{key:i,attrs:{"wrapper-class":"ml-2 filterDisplay",data:{value:dt,prototype:t.filterStructure.filter[t.filterIndex[i]].prototype,options:t.filterStructure.filter[t.filterIndex[i]].options}},on:{open:function(e){return t.openFilter(t.filterIndex[i])},clear:t.handleClearFilter}})}))],2)])]),t._v(" "),n("div",{staticClass:"col-auto pr-2 filter-buttons pl-0"},[n("compFilterButton",{attrs:{menu:t.filterStructure},on:{filterTrigger:t.openFilter,sortTrigger:t.handleSort}})],1)])])]),t._v(" "),n("div",{staticClass:"row mb-5"},[n("div",{staticClass:"col-12 mb-5"},[n("layoutList",{attrs:{"is-loading":t.catalogIsLoading,"is-error":t.catalogIsError,"is-empty":t.catalogIsEmpty},scopedSlots:t._u([{key:"title",fn:function(){return[n("compListHeader",{attrs:{"is-selected":t.isSelectedAll,"is-show-select-box":t.isSelecting},on:{select:function(param){t.handleSelectAll(param)},menuClicked:t.handleMenuTitle}})]},proxy:!0},{key:"loader",fn:function(){return t._l(5,(function(t,i){return n("b-skeleton",{key:i,staticClass:"mt-2",attrs:{height:"51px","no-aspect":"true"}})}))},proxy:!0},{key:"error",fn:function(){return[n("layoutError",{attrs:{label:t.labelPage.state.error.label[t.lang],action:t.labelPage.state.error.action[t.lang]},on:{action:function(e){return t.fetchCatalog()}}})]},proxy:!0},{key:"empty",fn:function(){return[n("layoutEmpty",{attrs:{label:t.labelPage.state.nodata.label[t.lang],action:t.labelPage.state.nodata.action[t.lang]},on:{action:function(e){return t.navigateTo(t.gvm,"/dashboard/catalog/create",!0)}}})]},proxy:!0},{key:"content",fn:function(){return t._l(t.catalogDatas,(function(e,l){return n("compListItem",{key:"cat"+l,attrs:{catalog:e,index:l,"is-selected":t.functionCart.inCart(e.id),"is-selecting":t.isSelecting},on:{click:t.handleListClick,clickMenuCatalog:t.handleMenuCatalog,clickMenuVarian:t.handleMenuVarian,clickMenuAddon:t.handleMenuAddon}})}))},proxy:!0}])})],1)]),t._v(" "),n("compBottomMenu",{attrs:{size:"large"}},[n("compBottomMenuContent",{attrs:{"is-loading":t.catalogIsLoading,"total-selected":t.functionCart.carts.length,"current-page":t.catalogCurrentPage,"is-selecting":t.isSelecting,"total-data":t.vmCatalogFetch.totalData,"total-page":t.vmCatalogFetch.totalPage},on:{pageChanged:t.handlePageChanged},scopedSlots:t._u([{key:"action",fn:function(){return[n("button",{directives:[{name:"show",rawName:"v-show",value:t.isSelecting,expression:"isSelecting"}],staticClass:"btn btn-outline-primary btn-sm mr-2",attrs:{type:"button"},on:{click:t.handleCancelSelection}},[t._v("\n            "+t._s(t.labelGeneral.cancel[t.lang])+"\n          ")]),t._v(" "),t.isSelecting?n("button",{staticClass:"btn btn-primary btn-sm",attrs:{disabled:0===t.functionCart.carts.length,type:"button"},on:{click:t.handleSubmit}},[t._v("\n            "+t._s(t.dropMenu.indexTitle[t.selectAction][t.lang])+"\n          ")]):t._e()]},proxy:!0}])})],1)],1),t._v(" "),n("compModalFilterCheck",{ref:"modal-filter-group",attrs:{options:t.vmCatalogFetch.filters?t.vmCatalogFetch.filters.group:[],structure:t.filterStructure.filter.group,"with-searchbar":!0},on:{applied:function(dt){return t.handleFilterApplied(dt,"group")}}}),t._v(" "),n("compModalFilterSelect",{ref:"modal-filter-status",attrs:{options:t.filterStructure.filter.status.options.value,"with-searchbar":!1,structure:t.filterStructure.filter.status},on:{applied:function(dt){return t.handleFilterApplied(dt,"status")}}}),t._v(" "),n("compModalFilterNumberRange",{ref:"modal-filter-price",attrs:{structure:t.filterStructure.filter.price},on:{applied:function(dt){return t.handleFilterApplied(dt,"price")}}})],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ol",{staticClass:"breadcrumb"},[n("li",{staticClass:"breadcrumb-item"},[n("a",{staticClass:"text-hover",attrs:{href:"#"}},[n("span",[t._v("Katalog")])])]),t._v(" "),n("li",{staticClass:"breadcrumb-item"},[n("a",{staticClass:"active",attrs:{href:"#"}},[n("span",[t._v("Daftar Katalog")])])])])}],!1,null,"50425c67",null);e.default=component.exports}}]);