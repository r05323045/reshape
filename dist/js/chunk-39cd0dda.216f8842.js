(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39cd0dda"],{5899:function(t,r){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,r,a){var i=a("1d80"),e=a("5899"),c="["+e+"]",n=RegExp("^"+c+c+"*"),s=RegExp(c+c+"*$"),o=function(t){return function(r){var a=String(i(r));return 1&t&&(a=a.replace(n,"")),2&t&&(a=a.replace(s,"")),a}};t.exports={start:o(1),end:o(2),trim:o(3)}},7156:function(t,r,a){var i=a("861d"),e=a("d2bb");t.exports=function(t,r,a){var c,n;return e&&"function"==typeof(c=r.constructor)&&c!==a&&i(n=c.prototype)&&n!==a.prototype&&e(t,n),t}},8418:function(t,r,a){"use strict";var i=a("c04e"),e=a("9bf2"),c=a("5c6c");t.exports=function(t,r,a){var n=i(r);n in t?e.f(t,n,c(0,a)):t[n]=a}},"99af":function(t,r,a){"use strict";var i=a("23e7"),e=a("d039"),c=a("e8b5"),n=a("861d"),s=a("7b0b"),o=a("50c4"),d=a("8418"),u=a("65f0"),p=a("1dde"),l=a("b622"),f=a("2d00"),h=l("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",m=f>=51||!e((function(){var t=[];return t[h]=!1,t.concat()[0]!==t})),_=p("concat"),C=function(t){if(!n(t))return!1;var r=t[h];return void 0!==r?!!r:c(t)},w=!m||!_;i({target:"Array",proto:!0,forced:w},{concat:function(t){var r,a,i,e,c,n=s(this),p=u(n,0),l=0;for(r=-1,i=arguments.length;r<i;r++)if(c=-1===r?n:arguments[r],C(c)){if(e=o(c.length),l+e>v)throw TypeError(g);for(a=0;a<e;a++,l++)a in c&&d(p,l,c[a])}else{if(l>=v)throw TypeError(g);d(p,l++,c)}return p.length=l,p}})},a9e3:function(t,r,a){"use strict";var i=a("83ab"),e=a("da84"),c=a("94ca"),n=a("6eeb"),s=a("5135"),o=a("c6b6"),d=a("7156"),u=a("c04e"),p=a("d039"),l=a("7c73"),f=a("241c").f,h=a("06cf").f,v=a("9bf2").f,g=a("58a8").trim,m="Number",_=e[m],C=_.prototype,w=o(l(C))==m,y=function(t){var r,a,i,e,c,n,s,o,d=u(t,!1);if("string"==typeof d&&d.length>2)if(d=g(d),r=d.charCodeAt(0),43===r||45===r){if(a=d.charCodeAt(2),88===a||120===a)return NaN}else if(48===r){switch(d.charCodeAt(1)){case 66:case 98:i=2,e=49;break;case 79:case 111:i=8,e=55;break;default:return+d}for(c=d.slice(2),n=c.length,s=0;s<n;s++)if(o=c.charCodeAt(s),o<48||o>e)return NaN;return parseInt(c,i)}return+d};if(c(m,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var b,x=function(t){var r=arguments.length<1?0:t,a=this;return a instanceof x&&(w?p((function(){C.valueOf.call(a)})):o(a)!=m)?d(new _(y(r)),a,x):y(r)},N=i?f(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),P=0;N.length>P;P++)s(_,b=N[P])&&!s(x,b)&&v(x,b,h(_,b));x.prototype=C,C.constructor=x,n(e,m,x)}},bd21:function(t,r,a){"use strict";var i=a("cd3a"),e=a.n(i);e.a},c975:function(t,r,a){"use strict";var i=a("23e7"),e=a("4d64").indexOf,c=a("a640"),n=a("ae40"),s=[].indexOf,o=!!s&&1/[1].indexOf(1,-0)<0,d=c("indexOf"),u=n("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:o||!d||!u},{indexOf:function(t){return o?s.apply(this,arguments)||0:e(this,t,arguments.length>1?arguments[1]:void 0)}})},cd3a:function(t,r,a){},d2f1:function(t,r,a){"use strict";a.r(r);var i=function(){var t=this,r=t.$createElement,a=t._self._c||r;return a("div",{staticClass:"product-wrapper"},[a("div",{ref:"product",staticClass:"product"},[a("div",{staticClass:"router-wrapper mt-3"},[a("router-link",{attrs:{to:"/"}},[a("span",{staticClass:"mr-2 router"},[t._v("首頁")])]),a("i",{staticClass:"fas fa-angle-right"}),a("span",{staticClass:"mx-2 router"},[t._v(t._s(t.product.category))]),a("i",{staticClass:"fas fa-angle-right"}),t.product.options?a("span",{staticClass:"mx-2"},[t._v(t._s(t.product.options.subcategory))]):t._e()],1),t.product.title?a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-md-6 col-xl-7 images"},[a("div",{staticClass:"main-img"},[a("div",{staticClass:"image",style:"background: url("+t.product.imageUrl[0]+") no-repeat center/contain;"})])]),a("div",{staticClass:"col-12 col-md-6 col-xl-5 info"},[a("div",{staticClass:"title"},[t._v(t._s(t.product.title))]),a("div",{staticClass:"price-wrapper"},[a("div",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(t.product.price)))]),a("div",{directives:[{name:"show",rawName:"v-show",value:.85>t.product.price/t.product.origin_price,expression:"0.85 > product.price/product.origin_price"}],staticClass:"origin-price"},[t._v(t._s(t._f("priceFormat")(t.product.origin_price)))])]),a("div",{directives:[{name:"show",rawName:"v-show",value:.85>t.product.price/t.product.origin_price,expression:"0.85 > product.price/product.origin_price"}],staticClass:"discount"},[a("div",{staticClass:"badge"},[t._v(" "+t._s(10*(t.product.price/t.product.origin_price).toFixed(1)+" 折")+" ")]),a("div",{staticClass:"save-money"},[t._v(" 省下"+t._s(t._f("priceFormat")(t.product.origin_price-t.product.price))+" ")])]),a("div",{staticClass:"content"},[a("div",{domProps:{innerHTML:t._s(t.product.content)}})]),a("div",{staticClass:"rating"},[t._l(t.randomRating.rate,(function(t,r){return a("span",{key:r,staticClass:"star-item",class:t})})),a("span",{staticClass:"count"},[t._v(t._s("("+t.randomRating.count+")"))])],2),a("div",{staticClass:"quantity"},[a("div",[t._v("數量")]),a("div",{staticClass:"input-area"},[t.cartPatch.quantity<=4?a("select",{directives:[{name:"model",rawName:"v-model",value:t.cartQuantity,expression:"cartQuantity"}],staticClass:"form-control",on:{change:function(r){var a=Array.prototype.filter.call(r.target.options,(function(t){return t.selected})).map((function(t){var r="_value"in t?t._value:t.value;return r}));t.cartQuantity=r.target.multiple?a:a[0]}}},[t._l(Array.from(Array(4).keys()),(function(r){return a("option",{key:r},[t._v(" "+t._s(r+1)+" ")])})),a("option",{attrs:{value:"5"}},[t._v("5+")])],2):t._e(),a("validation-observer",[a("validation-provider",{attrs:{rules:"required|numeric|min_value:1"},scopedSlots:t._u([{key:"default",fn:function(r){var i=r.errors;return[a("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.cartQuantity,expression:"cartQuantity",modifiers:{lazy:!0}},{name:"show",rawName:"v-show",value:t.cartPatch.quantity>4,expression:"cartPatch.quantity > 4"}],ref:"quantity-input-"+t.product.id,staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.cartQuantity},on:{change:function(r){t.cartQuantity=r.target.value}}}),i[0]?a("span",{staticClass:"text-danger quantity-error"},[t._v(t._s("數量"+i[0].slice(t.product.id.length+16,i[0].length)))]):t._e()]}}],null,!1,3771546008)})],1)],1)]),a("div",{staticClass:"put-in-cart"},[t.alreadyPut?t._e():a("div",{staticClass:"add-to-cart btn d-flex justify-content-center mt-3 mb-3",on:{click:t.addToCart}},[a("span",[t._v("放入購物車")])]),t.alreadyPut?a("div",{staticClass:"go-to-checkout btn d-flex justify-content-center mt-3 mb-3",on:{click:function(r){return t.$router.push("/cart")}}},[a("span",[t._v("立刻結帳")])]):t._e()]),a("div",{staticClass:"description"},[t._v(" "+t._s(t.product.description)+" ")])])]):t._e(),a("div",{staticClass:"recommand-products row"},[a("div",{staticClass:"card-decks-wrapper col-12"},[a("div",{staticClass:"card-decks-wrapper"},[a("div",{staticClass:"title"},[t._v("類似商品")]),t._l(5,(function(r){return a("div",{key:"row_"+r},[t.products.slice((r-1)*t.numCardsRow,r*t.numCardsRow).length>0?a("div",{staticClass:"card-deck"},[t._l(t.products.slice((r-1)*t.numCardsRow,r*t.numCardsRow),(function(r){return a("div",{key:r.id,staticClass:"card my-5",attrs:{id:r.id},on:{click:function(a){return t.getProduct(r.id)}}},[a("div",{staticClass:"img-wrapper"},[a("div",{staticClass:"card-img-top",style:"background: url("+r.imageUrl[0]+") no-repeat center/contain;"})]),a("div",{directives:[{name:"show",rawName:"v-show",value:.85>r.price/r.origin_price,expression:"0.85 > item.price/item.origin_price"}],staticClass:"discount-badge"},[t._v(t._s(10*(r.price/r.origin_price).toFixed(1)+" 折")+" ")]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"card-content"},[a("p",{staticClass:"card-title"},[t._v(t._s(r.title))]),r.rating?a("div",{staticClass:"rating w-100 d-flex align-items-center"},[t._l(r.rating.rate,(function(t,r){return a("span",{key:r,staticClass:"star-item",class:t})})),a("span",{staticClass:"count"},[t._v(t._s("("+r.rating.count+")"))])],2):t._e(),a("div",{staticClass:"price-wrapper"},[a("span",{staticClass:"price"},[t._v(t._s(t._f("priceFormat")(r.price)))]),a("span",{directives:[{name:"show",rawName:"v-show",value:r.origin_price>r.price,expression:"item.origin_price > item.price"}],staticClass:"original-price"},[t._v(t._s(t._f("priceFormat")(r.origin_price)))])])])])])})),t._l(t.numCardsRow-t.products.slice((r-1)*t.numCardsRow,r*t.numCardsRow).length,(function(t){return a("div",{key:"surplus_"+t,staticClass:"card my-5 border-0 no-use"})}))],2):t._e()])}))],2)])])])])},e=[],c=(a("99af"),a("4de4"),a("4160"),a("c975"),a("d81d"),a("a9e3"),a("159b"),{name:"Product",data:function(){return{id:"",windowWidth:window.innerWidth,products:[],product:{},cart:{},cartPatch:{product:String,quantity:1},cartQuantity:1,alreadyPut:!1,randomRating:{rate:[],count:Number}}},computed:{cartId:function(){return this.cart.length>0?this.cart.map((function(t){return t.product.id})):[]},numCardsRow:function(){return this.windowWidth>=576&&this.windowWidth<768?3:this.windowWidth>=768?4:2}},watch:{cartQuantity:function(t,r){var a=t;(!/^[0-9]+$/.test(a)||a<1)&&(a=r,this.cartQuantity=r),this.cartPatch.quantity=a}},created:function(){},mounted:function(){this.id=this.$route.params.id,this.getProduct(this.id)},beforeRouteUpdate:function(t,r,a){a()},methods:{rating:function(){for(var t={rate:[],count:0},r=Math.floor(2.5*(2.5+2*Math.random()))/2,a=0;a<Math.floor(r);a++)t.rate.push("on");r%1!==0&&t.rate.push("half");while(t.rate.length<5)t.rate.push("off");return t.count=Math.floor(50+500*Math.random()),t},addToCart:function(){var t=this,r=this.$loading.show({container:this.$refs.product,opacity:.8}),a="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/shopping"),i="post",e=this.cartId.indexOf(this.cartPatch.product);e>=0&&(i="patch",this.cart[e].quantity===Number(this.cartPatch.quantity)&&(i="none",setTimeout((function(){r.hide()}),1e3))),"none"!==i&&this.$http[i](a,this.cartPatch).then((function(){t.getCart(r)})).catch((function(t){console.log(t.response.data.errors)})),this.alreadyPut=!0},getCart:function(t){var r=this,a="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/shopping");this.$http.get(a).then((function(a){r.cart=a.data.data,t&&t.hide(),r.$bus.$emit("cartUpdate",{cart:r.cart})}))},getProduct:function(t){var r=this;t!==this.$route.params.id&&this.$router.push("/product/".concat(t));var a=this.$loading.show({container:this.$refs.product,opacity:1,isFullPage:!0});this.cartPatch.product=t;var i="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/product/").concat(t);this.$http.get(i).then((function(t){r.product=t.data.data,r.getProducts(a),r.getCart()})),this.randomRating.rate=this.rating().rate,this.randomRating.count=Math.floor(50+500*Math.random()),window.addEventListener("resize",(function(){r.windowWidth=window.innerWidth}))},getProducts:function(t){var r=this,a="".concat("https://course-ec-api.hexschool.io/","api/").concat("765c633d-f16f-4821-90b7-1588004cb252","/ec/products");this.$http.get(a).then((function(a){r.products=a.data.data,r.products=r.products.filter((function(t){return t.category===r.product.category&&t.id!==r.product.id})),r.products.forEach((function(t){t.rating=r.rating()})),r.getCart(),t&&t.hide()}))}}}),n=c,s=(a("bd21"),a("2877")),o=Object(s["a"])(n,i,e,!1,null,null,null);r["default"]=o.exports},d81d:function(t,r,a){"use strict";var i=a("23e7"),e=a("b727").map,c=a("1dde"),n=a("ae40"),s=c("map"),o=n("map");i({target:"Array",proto:!0,forced:!s||!o},{map:function(t){return e(this,t,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-39cd0dda.216f8842.js.map