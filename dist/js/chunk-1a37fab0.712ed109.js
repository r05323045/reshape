(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1a37fab0"],{2532:function(t,e,r){"use strict";var i=r("23e7"),n=r("5a34"),a=r("1d80"),s=r("ab13");i({target:"String",proto:!0,forced:!s("includes")},{includes:function(t){return!!~String(a(this)).indexOf(n(t),arguments.length>1?arguments[1]:void 0)}})},"2d3b":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"home",staticClass:"home mx-auto"},[r("div",{ref:"overlay-loading",staticClass:"overlay-loading"}),r("div",{staticClass:"search"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-3 col-lg-2 category-wrapper"},[r("div",{staticClass:"side-category"},[r("div",{staticClass:"title"},[t._v("商品分類")]),r("ul",{staticClass:"list-group list-group-flush"},[r("div",{staticClass:"back",on:{click:function(e){return t.$router.push("/products")}}},[r("i",{staticClass:"fas fa-angle-left"}),r("span",{staticClass:"text"},[t._v("所有分類")])])])])]),0===t.products.length?r("div",{staticClass:"col-12 col-md-9 col-lg-10 notFound"},[r("div",{staticClass:"title-wrapper"},[r("div",{staticClass:"title"},[t._v(t._s('找不到與"'+t.$route.query.key+'"相關的商品'))])]),r("div",{staticClass:"button-wrapper"},[r("button",{staticClass:"btn",on:{click:function(e){return t.$router.push("/products")}}},[t._v("探索更多商品")])])]):t._e(),t.products.length>0?r("div",{staticClass:"col-12 col-md-9 col-lg-10 card-decks-wrapper d-flex flex-column justify-content-center",class:{"only-one":t.products.length<=t.numCardsRow}},[r("div",{staticClass:"title"},[t._v(t._s("找到 "+t.products.length+' 件"'+t.$route.query.key+'"的商品'))]),t._l(5,(function(e){return r("div",{key:"row_"+e},[t.products.slice((e-1)*t.numCardsRow,e*t.numCardsRow).length>0?r("div",{staticClass:"card-deck"},[t._l(t.products.slice((e-1)*t.numCardsRow,e*t.numCardsRow),(function(e){return r("div",{key:e.id,staticClass:"card my-5",attrs:{id:e.id},on:{click:function(r){return t.$router.push("/product/"+e.id)}}},[r("div",{staticClass:"img-wrapper"},[r("div",{staticClass:"card-img-top",style:"background: url("+e.imageUrl[0]+") no-repeat center/contain;"})]),r("div",{directives:[{name:"show",rawName:"v-show",value:.85>e.price/e.origin_price,expression:"0.85 > item.price/item.origin_price"}],staticClass:"discount-badge"},[t._v(t._s(10*(e.price/e.origin_price).toFixed(1)+" 折")+" ")]),r("div",{staticClass:"card-body"},[r("div",{staticClass:"card-content"},[r("p",{staticClass:"card-title"},[t._v(t._s(e.title))]),r("div",{staticClass:"rating w-100 d-flex align-items-center"},[t._l(e.rating.rate,(function(t,e){return r("span",{key:e,staticClass:"star-item",class:t})})),r("span",{staticClass:"count"},[t._v(t._s("("+e.rating.count+")"))])],2),r("div",{staticClass:"price-wrapper"},[r("span",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(e.price)))]),r("span",{directives:[{name:"show",rawName:"v-show",value:e.origin_price>e.price,expression:"item.origin_price > item.price"}],staticClass:"original-price"},[t._v(t._s(t._f("priceFormat")(e.origin_price)))])])])]),t.windowWidth>=992?r("b-popover",{ref:"popover-"+e.id,refInFor:!0,attrs:{target:e.id,triggers:"hover focus",placement:"right"}},[r("div",{staticClass:"popper-wrapper"},[r("div",{staticClass:"popper-title"},[t._v(" "+t._s(e.title)+" ")]),e.options.event?t._e():r("div",[r("span",{staticClass:"btn btn-light popper-badge",on:{click:function(r){return t.$router.push("/search?key="+e.options.subcategory)}}},[t._v(" "+t._s(e.options.subcategory)+" ")])]),e.options.event?r("div",[r("span",{staticClass:"btn btn-light popper-badge",on:{click:function(r){return t.$router.push("/search?key="+e.options.subcategory)}}},[t._v(" "+t._s(e.options.subcategory)+" ")]),t._l(e.options.event.split(" "),(function(e,i){return r("span",{key:"event_"+i,staticClass:"btn btn-light popper-badge",on:{click:function(r){return t.$router.push("/search?key="+e)}}},[t._v(" "+t._s(e)+" ")])}))],2):t._e(),r("div",{staticClass:"popper-content"},[r("div",{domProps:{innerHTML:t._s(e.content)}})]),r("div",{staticClass:"popper-star"},t._l(e.rating.rate,(function(t,e){return r("span",{key:e,staticClass:"star-item",class:t})})),0),r("div",{staticClass:"popper-price"},[r("span",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(e.price)))]),r("span",{directives:[{name:"show",rawName:"v-show",value:e.origin_price>e.price,expression:"item.origin_price > item.price"}],staticClass:"original-price"},[t._v(t._s(t._f("priceFormat")(e.origin_price)))])]),t.cartId.includes(e.id)?t._e():r("div",{staticClass:"btn d-flex justify-content-center mt-3 mb-3",class:{addToCart:!t.cartId.includes(e.id),goToCheckout:t.cartId.includes(e.id)},on:{click:function(r){return t.addToCart(e)}}},[r("span",[t._v("放入購物車")])]),t.cartId.includes(e.id)?r("div",{staticClass:"btn d-flex justify-content-center mt-3 mb-3",class:{addToCart:!t.cartId.includes(e.id),goToCheckout:t.cartId.includes(e.id)},on:{click:function(e){return t.$router.push("/cart")}}},[r("span",[t._v("立刻結帳")])]):t._e()])]):t._e()],1)})),t._l(t.numCardsRow-t.products.slice((e-1)*t.numCardsRow,e*t.numCardsRow).length,(function(t){return r("div",{key:"surplus_"+t,staticClass:"card my-5 border-0 no-use"})}))],2):t._e()])}))],2):t._e()])])])},n=[],a=(r("99af"),r("4de4"),r("4160"),r("caad"),r("d81d"),r("a9e3"),r("ac1f"),r("2532"),r("1276"),r("159b"),r("6b75"));function s(t){if(Array.isArray(t))return Object(a["a"])(t)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("d3b7"),r("3ca3"),r("ddb0");function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var c=r("06c5");function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t){return s(t)||o(t)||Object(c["a"])(t)||u()}var p=r("3828"),l=(r("bbe3"),{name:"search",data:function(){return{products:[],cart:{},randomRating:{rate:[],count:Number},windowWidth:window.innerWidth}},components:{"b-popover":p["a"]},computed:{cartId:function(){return this.cart.length>0?this.cart.map((function(t){return t.product.id})):[]},numCardsRow:function(){return this.windowWidth>=576&&this.windowWidth<992?3:this.windowWidth>=992?4:2}},mounted:function(){var t=this;this.getProducts(),this.getCart(),window.addEventListener("resize",(function(){t.windowWidth=window.innerWidth}))},beforeRouteUpdate:function(t,e,r){r(),this.getProducts()},methods:{getProducts:function(t){var e=this,r=this.$loading.show({container:this.$refs.overlayLoading,isFullPage:!0,opacity:1},{default:this.$createElement("MyLoading")}),i="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/products");this.$http.get(i).then((function(t){var i;e.products=t.data.data;var n=e.products.filter((function(t){return!(!t.options.event||0===t.options.event.length)}));e.products=e.products.filter((function(t){return t.title.includes(e.$route.query.key)||t.options.subcategory.includes(e.$route.query.key)})),(i=e.products).push.apply(i,d(n.filter((function(t){return t.options.event.split(" ").includes(e.$route.query.key)})))),e.products.forEach((function(t){t.rating=e.rating()})),r.hide()}))},getCart:function(t){var e=this,r="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/shopping");this.$http.get(r).then((function(r){e.cart=r.data.data,t&&t.hide()}))},addToCart:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i=this.$loading.show({container:this.$refs.overlayLoading,isFullPage:!0,opacity:1},{default:this.$createElement("MyLoading")}),n="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/shopping"),a={product:t.id,quantity:r};this.$http.post(n,a).then((function(){e.getCart(i),e.$refs["popover-".concat(t.id)][0].$emit("close")})).catch((function(t){console.log(t)}))},rating:function(){for(var t={rate:[],count:0},e=Math.floor(2.5*(2.5+2*Math.random()))/2,r=0;r<Math.floor(e);r++)t.rate.push("on");e%1!==0&&t.rate.push("half");while(t.rate.length<5)t.rate.push("off");return t.count=Math.floor(50+500*Math.random()),t}}}),f=l,h=(r("3de7"),r("2877")),v=Object(h["a"])(f,i,n,!1,null,null,null);e["default"]=v.exports},"3de7":function(t,e,r){"use strict";var i=r("c371"),n=r.n(i);n.a},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var i=r("1d80"),n=r("5899"),a="["+n+"]",s=RegExp("^"+a+a+"*"),o=RegExp(a+a+"*$"),c=function(t){return function(e){var r=String(i(e));return 1&t&&(r=r.replace(s,"")),2&t&&(r=r.replace(o,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},"5a34":function(t,e,r){var i=r("44e7");t.exports=function(t){if(i(t))throw TypeError("The method doesn't accept regular expressions");return t}},7156:function(t,e,r){var i=r("861d"),n=r("d2bb");t.exports=function(t,e,r){var a,s;return n&&"function"==typeof(a=e.constructor)&&a!==r&&i(s=a.prototype)&&s!==r.prototype&&n(t,s),t}},a9e3:function(t,e,r){"use strict";var i=r("83ab"),n=r("da84"),a=r("94ca"),s=r("6eeb"),o=r("5135"),c=r("c6b6"),u=r("7156"),d=r("c04e"),p=r("d039"),l=r("7c73"),f=r("241c").f,h=r("06cf").f,v=r("9bf2").f,g=r("58a8").trim,_="Number",b=n[_],m=b.prototype,C=c(l(m))==_,y=function(t){var e,r,i,n,a,s,o,c,u=d(t,!1);if("string"==typeof u&&u.length>2)if(u=g(u),e=u.charCodeAt(0),43===e||45===e){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+u}for(a=u.slice(2),s=a.length,o=0;o<s;o++)if(c=a.charCodeAt(o),c<48||c>n)return NaN;return parseInt(a,i)}return+u};if(a(_,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var w,k=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof k&&(C?p((function(){m.valueOf.call(r)})):c(r)!=_)?u(new b(y(e)),r,k):y(e)},I=i?f(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),x=0;I.length>x;x++)o(b,w=I[x])&&!o(k,w)&&v(k,w,h(b,w));k.prototype=m,m.constructor=k,s(n,_,k)}},ab13:function(t,e,r){var i=r("b622"),n=i("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[n]=!1,"/./"[t](e)}catch(i){}}return!1}},c371:function(t,e,r){},caad:function(t,e,r){"use strict";var i=r("23e7"),n=r("4d64").includes,a=r("44d2"),s=r("ae40"),o=s("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:!o},{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),a("includes")}}]);
//# sourceMappingURL=chunk-1a37fab0.712ed109.js.map