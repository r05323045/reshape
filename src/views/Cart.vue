<template>
  <div>
    <div class="cart" v-show="!checkingout" ref="cart">
      <div class="router-wrapper mt-3">
        <router-link to="/"><span class="mr-2 router">首頁</span></router-link>
        <i class="fas fa-chevron-right"></i>
        <span class="ml-2">購物車</span>
      </div>
      <div class="my-5 cart-step-wrapper d-flex justify-content-center mx-auto" v-if="cart.length">
        <div class="cart-step row">
          <div class="cart-step-icon">1</div>
          <div class="cart-step-text">
              <div>購買品項</div>
          </div>
          <div class="connector-line"></div>
        </div>
        <div class="checkout-step row">
          <div class="checkout-step-icon">2</div>
          <div class="checkout-step-text">填寫地址與結帳</div>
        </div>
      </div>
      <div class="empty-cart w-100 text-center my-5" v-if="!cart.length">
        <div class="text-align-center">
          <h1 class="mt-5">你的購物車中沒有商品</h1>
          <router-link to="/"><div class="btn mt-5 back-to-homepage">回首頁選購</div></router-link>
          <router-link to="/"><div class="btn mt-5 ml-3 back-to-homepage">我不要</div></router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-8 cart-board" ref="cartboard">
          <div class="table-wrapper d-flex flex-column">
            <table class="table">
              <tbody v-if="cart.length">
                <tr v-for="item in cart" :key="item.id">
                <td class="td-img" :class="{ borderless : cart.length === 1}">
                  <div class="img-wrapper mx-auto my-auto">
                  <img :src="item.product.imageUrl" class="cart-image" @click="$router.push(`/product/${item.product.id}`)">
                  </div>
                </td>
                <td class="align-middle td-title" :class="{ borderless : cart.length === 1}">
                    {{ item.product.title }}
                </td>
                <td class="align-middle td-quantity" :class="{ borderless : cart.length === 1}">
                  <select class="form-control" v-if="item.quantity <= 4" v-model="item.quantity" @change="quantityUpdata(item.product.id, item.quantity)">
                    <option v-for="integer in Array.from(Array(4).keys())" :key="integer">
                        {{ integer + 1 }}
                    </option>
                    <option value="5">5+</option>
                  </select>
                  <validation-observer>
                    <form @submit.prevent="">
                      <validation-provider v-slot="{ errors }" rules="required|numeric|min_value:1">
                        <input :id="`quantity-input-${item.product.id}`" type="text" class="form-control" v-model.lazy="item.quantity" @change="quantityUpdata(item.product.id, item.quantity)" v-show="item.quantity > 4">
                        <span v-if="errors[0]" class="text-danger td-quantity-error">{{ `數量${errors[0].slice((item.product.id.length + 16), errors[0].length)}` }}</span>
                      </validation-provider>
                    </form>
                  </validation-observer>
                </td>
                <td class="align-middle text-right td-amount" :class="{ borderless : cart.length === 1}">
                  {{ item.product.price * item.quantity | priceFormat }}
                </td>
                <td class="align-middle" :class="{ borderless : cart.length === 1}">
                  <button class="btn" @click="removeCartItem(item.product.id)">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
                </tr>
              </tbody>
            </table>
            <div class="clear-cart-wrapper mb-3 flex-grow-1 d-flex align-items-end" v-if="cart.length">
              <div class="clear-cart" @click="removeAllCartItem()">清空購物車</div>
            </div>
          </div>
        </div>
        <div class="col-4 cart-summary" v-if="cart.length">
          <div class="card cart-card mx-auto">
            <div class="card-header">
              訂單摘要
            </div>
            <div class="card-body d-flex flex-column">
              <loading :active.sync="isLoading" loader="bars" :is-full-page="false" :opacity="1" :z-index="2"></loading>
              <ul class="list-group h-100">
                <li class="list-group-item d-flex justify-content-between">
                  <span>商品總計</span>
                  <span>{{ cartTotal | priceFormat}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>運費總計</span>
                  <span>NT$ 0</span>
                </li>
                <li v-if="coupon.enabled" class="list-group-item d-flex justify-content-between">
                  <span>{{ coupon.title }}</span>
                  <span class="coupon-discount">{{ - Math.ceil(cartTotal * (1 - coupon.percent / 100)) | priceFormat }}</span>
                </li>
                <li class="list-group-item">
                  <span class="use-coupon" data-toggle="collapse" data-target="#collapseCoupon">使用優惠券</span>
                  <div class="collapse mt-3" id="collapseCoupon">
                    <div>
                      <div class="input-group mb-3 input-group-sm">
                        <input
                          v-model="coupon_code"
                          type="text"
                          class="form-control"
                          placeholder="請輸入優惠碼"
                        >
                        <div class="input-group-append">
                          <button
                            class="btn apply-coupon"
                            type="button"
                            @click="addCoupon"
                          >
                            使用
                          </button>
                        </div>
                      </div>
                    </div>
                    <div v-if="couponExpire || coupon.enabled === false" class="coupon-fail">
                      優惠碼無法使用
                    </div>
                  </div>
                </li>
                <div class="divider-wrapper">
                  <div class="divider"></div>
                </div>
                <div class="list-group-item d-flex w-100 pt-2">
                    <div class="cart-total w-100 d-flex justify-content-between">
                        <span>結帳金額</span>
                        <span>{{ checkoutTotal | priceFormat}}</span>
                    </div>
                </div>
                <div class="list-group-item">
                    <div class="goToCheckout btn d-flex justify-content-center" @click="cartOrCheckout">
                      前往結帳
                    </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <checkout :cart="cart" :cartTotal="cartTotal" :checkoutTotal="checkoutTotal" :coupon="coupon" v-show="checkingout" @backtocart="cartOrCheckout" ref="checkout"></checkout>
  </div>
</template>

<script>
import checkout from './Checkout.vue'
export default {
  name: 'Cart',
  data () {
    return {
      cart: {},
      coupon: {},
      coupon_code: '',
      checkingout: false,
      isLoading: false,
      couponExpire: false
    }
  },
  components: {
    checkout
  },
  created () {
    const loader = this.$loading.show({
      container: this.$refs.cart,
      opacity: 1,
      isFullPage: true
    })
    this.getCart(loader)
  },
  computed: {
    cartTotal: function () {
      let total = 0
      if (this.cart.length > 0) {
        this.cart.forEach((item) => {
          total += item.product.price * item.quantity
        })
      }
      return total
    },
    checkoutTotal: function () {
      if (this.coupon.enabled) {
        return Math.ceil(this.cartTotal * this.coupon.percent / 100)
      }
      return this.cartTotal
    }
  },
  methods: {
    getCart (loader) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          if (loader) {
            loader.hide()
          }
          this.$bus.$emit('cartUpdate', {
            cart: this.cart
          })
        })
    },
    quantityUpdata (id, num) {
      const loader = this.$loading.show({
        container: this.$refs.cartboard,
        opacity: 0.8,
        isFullPage: true
      })
      if (!/^[0-9]+$/.test(num) || num < 1) {
        num = 1
      }
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      const data = {
        product: id,
        quantity: num
      }
      this.$http.patch(url, data).then(() => {
        this.getCart(loader)
      })
    },
    removeAllCartItem () {
      const loader = this.$loading.show({
        container: this.$refs.cartboard,
        opacity: 0.8,
        isFullPage: true
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.$http.delete(url)
        .then(() => {
          this.getCart(loader)
        })
    },
    removeCartItem (id) {
      const loader = this.$loading.show({
        container: this.$refs.cartboard,
        opacity: 0.8,
        isFullPage: true
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.$http.delete(url).then(() => {
        this.getCart(loader)
      })
    },
    cartOrCheckout () {
      this.checkingout = !this.checkingout
      this.$refs.checkout.$refs.formvalidation.reset()
      this.$refs.checkout.$refs.checkoutform.reset()
    },
    addCoupon () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/coupon/search`
      // 輸入 coupon 之前必須先戳一下 api/{{ uuid }}/coupon/search API 確定該 coupon 是存在的
      this.$http.post(url, { code: this.coupon_code }).then((response) => {
        // 若 coupon 存在就回寫回去到 this.coupon
        // 該資料會是一個物件格式，詳情可見 API 文件
        // https://course-ec-api.hexschool.io/document#frontend-search-coupon-code-code
        this.coupon = response.data.data
        this.couponExpire = false
        this.isLoading = false
      }).catch((error) => {
        this.couponExpire = true
        const errorData = error.response.data.errors
        if (errorData) {
          errorData.code.forEach((err) => {
            console.log(err)
          })
          this.isLoading = false
        } else {
          const { message } = error.response.data
          console.log(message)
          this.isLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.cart {
  margin-top: 80px;
  height: 100%;
  overflow: visible;
  width: 100vw;
  max-width: 1140px;
  background: #ffffff;
  .router-wraper {
    .router {
      width: 100%;
      cursor: pointer;
    }
    .router:hover {
      text-decoration: underline;
    }
  }
  .cart-step-wrapper {
    .cart-step {
      width: 300px;
      position: relative;
    }
    .cart-step-icon {
        z-index: 999;
        text-align: center;
        vertical-align: middle;
        line-height: 50px;
        background-color: #10567b;
        color: #ffffff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    .cart-step-text {
        padding-left: 15px;
        padding-right: 10px;
        z-index: 999;
        background-color: #ffffff;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 50px;
        height: 50px;
    }
    .checkout-step-icon {
        z-index: 999;
        text-align: center;
        vertical-align: middle;
        line-height: 50px;
        background-color: #919191;
        color: #ffffff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    .checkout-step-text {
        padding-left: 15px;
        padding-right: 10px;
        z-index: 999;
        color: #919191;
        background-color: #ffffff;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 50px;
        height: 50px;
    }
    .connector-line {
        z-index: 1;
        position: absolute;
        left: 0;
        top: 23px;
        background-color: #919191;
        width: 100%;
        height: 2px;
        vertical-align: middle;
    }
  }
  .empty-cart {
    height: 100%;
    .back-to-homepage {
      color: #39393e;
      border: 1px solid #a8a8ab;
      padding: 8px
    }
    .back-to-homepage:hover, .back-to-homepage:focus, .back-to-homepage:active:hover {
      color: #ffffff;
      background-color: #919191;
    }
  }
  .row {
    .cart-board {
      .table-wrapper {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .borderless {
            border-top: 0 none !important;
        }
        .td-title {
          max-width: 200px;
        }
        .td-img {
          max-width: 100px;
          .cart-image {
            cursor: pointer;
            max-width: 100%;
            max-height: 100%;
            border-radius: 10px;
          }
        }
        .td-quantity {
          position: relative;
          width: 80px;
          .td-quantity-error {
            top: 60px;
            width: 100px;
            position: absolute;
          }
        }
        .td-amount {
          width: 144px;
        }
        .clear-cart-wrapper {
          position: relative;
          .clear-cart {
            position: absolute;
            right: 40px;
            cursor: pointer;
            color: #2e90b7;
          }
          .clear-cart:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
.cart-summary {
  .cart-card {
    width: 300px;
    .divider {
      display: block;
      height: 2px;
      background-color: #eeeeef;
      margin-top: 20px;
    }
    .list-group-item {
      border: none !important;
      font-size: 0.9rem;
      .coupon-discount {
        font-size: 0.9rem;
        font-weight: 700;
        color: #f16c5d;
      }
      .use-coupon {
        font-size: 0.9rem;
        font-weight: 500;
        color: #2e90b7;
      }
      .use-coupon:hover {
        cursor: pointer;
        color: #10567b;
      }
      #collapseCoupon {
        .apply-coupon {
            z-index: 1;
            background-color: #10567b;
            color: #ffffff;
        }
        .coupon-fail {
          color: #ec5252;
        }
      }
      .cart-total {
        font-size: 1rem;
        font-weight: 500;
      }
      .goToCheckout {
        color: #ffffff;
        background-color: #10567b;
        text-decoration: none;
        a {
          color: #ffffff;
          text-decoration: none;
        }
      }
      .goToCheckout:hover, .goToCheckout:focus, .goToCheckout:active:hover {
        color: #ffffff;
        background-color: #092c3f;
      }
    }
  }
}
</style>
