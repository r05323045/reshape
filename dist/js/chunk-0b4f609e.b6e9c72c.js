(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b4f609e"],{7828:function(t,i,a){"use strict";var s=a("a4e7"),e=a.n(s);e.a},8247:function(t,i,a){"use strict";var s=a("eba7"),e=a.n(s);e.a},a4e7:function(t,i,a){},e6dc:function(t,i,a){"use strict";a.r(i);var s=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{ref:"home-warpper",staticClass:"home-wrapper"},[a("div",{ref:"overlay-loading",staticClass:"overlay-loading"}),a("div",{ref:"home",staticClass:"home mx-auto"},[a("div",{staticClass:"products"},[a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-12 col-md-9 col-lg-10 d-flex justify-content-center"},[t.products.length>0?a("div",{staticClass:"hot-sales w-100 row d-flex align-items-center"},[a("div",{staticClass:"col-12 col-sm-6 hot-swiper-wrapper"},[a("div",{staticClass:"outer-title"},[t._v("本月熱賣 TOP 5")]),a("hot-swiper",{attrs:{products:t.hotProducts}})],1),a("div",{staticClass:"col-12 col-sm-6 rank-wrapper"},[a("div",{staticClass:"title"},[t._v("本月熱賣 TOP 5")]),a("ul",{staticClass:"list-group list-group-flush"},t._l(t.hotProducts,(function(i,s){return a("li",{key:"top-5-"+i.id,staticClass:"list-group-item d-flex flex-row",on:{click:function(a){return t.$router.push("/product/"+i.id)}}},[a("div",{staticClass:"rank"},[t._v(t._s("0"+(s+1)))]),a("div",{staticClass:"image-wrapper"},[a("div",{staticClass:"image",style:"background: url("+i.imageUrl[0]+") no-repeat center/contain;"})]),a("span",{staticClass:"title"},[t._v(t._s(i.title))])])})),0)])]):t._e()])]),a("div",{staticClass:"row w-100"},[a("div",{staticClass:"col-0 col-xl-2"}),a("div",{staticClass:"card-decks-wrapper col-12 col-xl-10"},[a("div",{staticClass:"title"},[t._v("熱賣商品")]),t._l(5,(function(i){return a("div",{key:"row_"+i},[t.products.slice((i-1)*t.numCardsRow,i*t.numCardsRow).length>0?a("div",{staticClass:"card-deck"},[t._l(t.products.slice((i-1)*t.numCardsRow,i*t.numCardsRow),(function(i){return a("div",{key:i.id,staticClass:"card my-5",attrs:{id:i.id},on:{click:function(a){return t.$router.push("/product/"+i.id)}}},[a("div",{staticClass:"img-wrapper"},[a("div",{staticClass:"card-img-top",style:"background: url("+i.imageUrl[0]+") no-repeat center/contain;"})]),a("div",{directives:[{name:"show",rawName:"v-show",value:.85>i.price/i.origin_price,expression:"0.85 > item.price/item.origin_price"}],staticClass:"discount-badge"},[t._v(t._s(10*(i.price/i.origin_price).toFixed(1)+" 折")+" ")]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"card-content"},[a("p",{staticClass:"card-title"},[t._v(t._s(i.title))]),a("div",{staticClass:"rating w-100 d-flex align-items-center"},[t._l(i.rating.rate,(function(t,i){return a("span",{key:i,staticClass:"star-item",class:t})})),a("span",{staticClass:"count"},[t._v(t._s("("+i.rating.count+")"))])],2),a("div",{staticClass:"price-wrapper"},[a("span",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(i.price)))]),a("span",{directives:[{name:"show",rawName:"v-show",value:i.origin_price>i.price,expression:"item.origin_price > item.price"}],staticClass:"original-price"},[t._v(t._s(t._f("priceFormat")(i.origin_price)))])])])]),a("b-popover",{ref:"popover-"+i.id,refInFor:!0,staticClass:"product-popper",attrs:{target:i.id,triggers:"hover focus",placement:"right"}},[a("loading",{attrs:{active:t.isLoading,loader:"bars"},on:{"update:active":function(i){t.isLoading=i}}}),a("div",{staticClass:"popper-wrapper"},[a("div",{staticClass:"popper-title mt-3"},[t._v(" "+t._s(i.title)+" ")]),a("span",{staticClass:"btn btn-light popper-badge"},[t._v(" "+t._s(i.category)+" ")]),a("div",{staticClass:"popper-content mt-2"},[a("div",{domProps:{innerHTML:t._s(i.content)}})]),a("div",{staticClass:"popper-star mt-3"},t._l(i.rating.rate,(function(t,i){return a("span",{key:i,staticClass:"star-item",class:t})})),0),a("div",{staticClass:"popper-price mt-3"},[a("span",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(i.price)))]),a("span",{directives:[{name:"show",rawName:"v-show",value:i.origin_price>i.price,expression:"item.origin_price > item.price"}],staticClass:"original-price"},[t._v(t._s(t._f("priceFormat")(i.origin_price)))])]),t.cartId.includes(i.id)?t._e():a("div",{staticClass:"btn d-flex justify-content-center mt-3 mb-3",class:{addToCart:!t.cartId.includes(i.id),goToCheckout:t.cartId.includes(i.id)},on:{click:function(a){return t.addToCart(i)}}},[a("span",[t._v("放入購物車")])]),t.cartId.includes(i.id)?a("div",{staticClass:"btn d-flex justify-content-center mt-3 mb-3",class:{addToCart:!t.cartId.includes(i.id),goToCheckout:t.cartId.includes(i.id)},on:{click:function(i){return t.$router.push("/cart")}}},[a("span",[t._v("立刻結帳")])]):t._e()])],1)],1)})),t._l(t.numCardsRow-t.products.slice((i-1)*t.numCardsRow,i*t.numCardsRow).length,(function(t){return a("div",{key:"surplus_"+t,staticClass:"card my-5 border-0 no-use"})}))],2):t._e()])})),a("pagination",{staticClass:"pagination-wrapper",attrs:{pages:t.pagination},on:{"emit-pages":t.getProducts}})],2)])]),t._m(1)])])},e=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"col-3 col-lg-2 category-wrapper"},[a("div",{staticClass:"category"},[a("div",{staticClass:"title"},[t._v("商品分類")]),a("ul",{staticClass:"list-group list-group-flush"},[a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-utensils"}),t._v(" 廚房餐桌 ")]),a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-couch"}),t._v(" 空間佈置 ")]),a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-laptop-house"}),t._v(" 質感生活 ")]),a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-tshirt"}),t._v(" 品味衣著 ")]),a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-pencil-ruler"}),t._v(" 文具小物 ")]),a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-cocktail"}),t._v(" 食品飲料 ")]),a("li",{staticClass:"list-group-item"},[a("i",{staticClass:"fas fa-hiking"}),t._v(" 戶外休閒 ")])])])])},function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"modal fade",attrs:{id:"orderModal",tabindex:"-1",role:"dialog"}},[a("div",{staticClass:"modal-dialog modal-dialog-centered",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title"},[t._v("完成訂購")]),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal"}},[a("span",[t._v("×")])])]),a("div",{staticClass:"modal-body text-center"},[a("p",[t._v("感謝你的購買，請耐心等候到貨通知")])]),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-secondary",attrs:{type:"button","data-dismiss":"modal"}},[t._v("關閉")])])])])])}],r=(a("a4d3"),a("e01a"),a("99af"),a("4160"),a("caad"),a("d81d"),a("fb6a"),a("a9e3"),a("2532"),a("159b"),a("3828")),c=a("7de3"),n=a.n(c),o=(a("bbe3"),a("1799")),l=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[a("div",{staticClass:"swiper-container"},[a("div",{staticClass:"swiper-wrapper"},t._l(t.products.slice(0,5),(function(i,s){return a("div",{key:"top-5-swiper-"+i.id,staticClass:"swiper-slide",style:"background: url("+i.imageUrl[0]+") no-repeat center/contain;",on:{click:function(a){return t.$router.push("/product/"+i.id)}}},[a("div",{staticClass:"title"},[a("div",{staticClass:"rank"},[t._v(t._s("0"+(s+1)+" |"))]),a("div",{staticClass:"name"},[t._v(t._s(i.title))])])])})),0),a("div",{staticClass:"swiper-pagination"})])])},d=[],p={data:function(){return{}},props:{products:Array},mounted:function(){new n.a(".swiper-container",{centeredSlides:!0,autoplay:{delay:2500,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,i){return'<span class="'+i+'">'+(t+1)+"</span>"}}})}},u=p,v=(a("7828"),a("2877")),h=Object(v["a"])(u,l,d,!1,null,null,null),f=h.exports,g={name:"products",data:function(){return{products:[],hotProducts:[],cart:{},pagination:{},isLoading:!1,randomRating:{rate:[],count:Number},windowWidth:window.innerWidth}},components:{pagination:o["a"],hotSwiper:f,"b-popover":r["a"]},computed:{cartId:function(){return this.cart.length>0?this.cart.map((function(t){return t.product.id})):[]},numCardsRow:function(){return this.windowWidth>=576&&this.windowWidth<768?3:this.windowWidth>=768?4:2}},created:function(){var t=this;this.getProducts(),this.getCart(),window.addEventListener("resize",(function(){t.windowWidth=window.innerWidth}))},methods:{getSwiper:function(){this.mySwiper=new n.a(".hot-sales.swiper-container",{spaceBetween:30,centeredSlides:!0,autoplay:{delay:2500,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0,renderBullet:function(t,i){return'<span class="'+i+'">'+(t+1)+"</span>"}}})},getProducts:function(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,a=this.$loading.show({container:this.$refs.overlayLoading,isFullPage:!0,opacity:1}),s="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/products?paged=16&page=").concat(i);this.$http.get(s).then((function(s){t.products=s.data.data,1===i&&(t.hotProducts=t.products.slice(0,5)),t.products.forEach((function(i){i.rating=t.rating()})),t.getSwiper(),t.pagination=s.data.meta.pagination,a.hide()}))},getCart:function(t){var i=this,a="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/shopping");this.$http.get(a).then((function(a){i.cart=a.data.data,t&&t.hide()}))},addToCart:function(t){var i=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,s=this.$loading.show({container:this.$refs.homeWrapper,isFullPage:!0,opacity:1}),e="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/shopping"),r={product:t.id,quantity:a};this.$http.post(e,r).then((function(){i.getCart(s),i.$refs["popover-".concat(t.id)][0].$emit("close")})).catch((function(t){console.log(t)}))},rating:function(){for(var t={rate:[],count:0},i=Math.floor(2.5*(2.5+2*Math.random()))/2,a=0;a<Math.floor(i);a++)t.rate.push("on");i%1!==0&&t.rate.push("half");while(t.rate.length<5)t.rate.push("off");return t.count=Math.floor(50+500*Math.random()),t},getDescription:function(t){var i=this;if(!t.description&&this.cartId.includes(t.id)){this.isLoading=!0;var a="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/product/").concat(t.id),s=this;this.$http.get(a).then((function(a){var e=a.data.data;s.products.forEach((function(i,a){i.id===t.id&&(s.products[a].description=e.description)})),i.isLoading=!1}))}}}},C=g,m=(a("8247"),Object(v["a"])(C,s,e,!1,null,null,null));i["default"]=m.exports},eba7:function(t,i,a){},fb6a:function(t,i,a){"use strict";var s=a("23e7"),e=a("861d"),r=a("e8b5"),c=a("23cb"),n=a("50c4"),o=a("fc6a"),l=a("8418"),d=a("b622"),p=a("1dde"),u=a("ae40"),v=p("slice"),h=u("slice",{ACCESSORS:!0,0:0,1:2}),f=d("species"),g=[].slice,C=Math.max;s({target:"Array",proto:!0,forced:!v||!h},{slice:function(t,i){var a,s,d,p=o(this),u=n(p.length),v=c(t,u),h=c(void 0===i?u:i,u);if(r(p)&&(a=p.constructor,"function"!=typeof a||a!==Array&&!r(a.prototype)?e(a)&&(a=a[f],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return g.call(p,v,h);for(s=new(void 0===a?Array:a)(C(h-v,0)),d=0;v<h;v++,d++)v in p&&l(s,d,p[v]);return s.length=d,s}})}}]);
//# sourceMappingURL=chunk-0b4f609e.b6e9c72c.js.map