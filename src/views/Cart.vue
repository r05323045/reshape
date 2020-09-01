<template>
  <div class="cart-wrapper">
    <div class="cart" v-show="!checkingout" ref="cart">
      <div class="router-wrapper">
        <router-link to="/"><span class="mr-2 router">首頁</span></router-link>
        <i class="fas fa-angle-right"></i>
        <span class="ml-2">購物車</span>
      </div>
      <div class="cart-step-wrapper row" v-if="cart.length">
        <div class="cart-step">
          <div class="cart-step-icon">1</div>
          <div class="cart-step-text">
              <div>購買品項</div>
          </div>
        </div>
        <div class="connector-line"></div>
        <div class="checkout-step">
          <div class="checkout-step-icon">2</div>
          <div class="checkout-step-text">填寫地址與結帳</div>
        </div>
      </div>
      <div class="empty-cart w-100 text-center my-auto" v-if="!cart.length">
        <div class="text-align-center">
          <div class="mt-5 text">你的購物車中沒有商品</div>
          <router-link to="/"><div class="btn mt-5 back-to-homepage">回首頁選購</div></router-link>
          <router-link to="/products"><div class="btn mt-5 ml-3 back-to-products">我不要</div></router-link>
        </div>
      </div>
      <div class="row m-0">
        <div class="col-12 col-md-6 col-lg-7 cart-board" ref="cartboard">
          <ul class="list-group">
            <li v-for="item in cart" :key="item.id"  class="list-group-item">
              <div class="row my-3">
                <div class="col-12 col-md-7 col-xl-8">
                  <div class="row mt-2">
                    <div class="img col-4" :class="{ borderless : cart.length === 1}">
                      <div class="img-wrapper mx-auto my-auto">
                        <div :style="`background: url(${item.product.imageUrl[0]}) no-repeat center/contain;`" class="cart-image" @click="$router.push(`/product/${item.product.id}`)"></div>
                      </div>
                    </div>
                    <div class="title col-8" :class="{ borderless : cart.length === 1}">
                      {{ item.product.title }}
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-5 col-xl-4 mt-4 mt-md-2">
                  <div class="row">
                    <div class="col-4 col-md-3 col-xl-4 quantity d-flex justify-content-center">
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
                            <span v-if="errors[0]" class="text-danger quantity-error">{{ `數量${errors[0].slice((item.product.id.length + 16), errors[0].length)}` }}</span>
                          </validation-provider>
                        </form>
                      </validation-observer>
                    </div>
                    <div class="col-8 col-md-9 col-xl-8 price h-100 text-right text-md-center">
                      {{ item.product.price * item.quantity | priceFormat }}
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn" @click="removeCartItem(item.product.id)">
                <i class="fa fa-times"></i>
              </button>
            </li>
          </ul>
          <div class="clear-cart-wrapper" v-if="cart.length">
            <div class="clear-cart" @click="removeAllCartItem()">清空購物車</div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-5 cart-summary" v-if="cart.length">
          <div class="card cart-card mx-auto">
            <div class="card-header">
              訂單摘要
            </div>
            <div class="card-body d-flex flex-column">
              <loading :active.sync="isLoading" loader="bars" :color="'#00457C'" :is-full-page="false" :opacity="1" :z-index="2"></loading>
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
                  <span class="coupon-name">{{ coupon.title }}</span>
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
    <checkout
      :cart="cart"
      :cartTotal="cartTotal"
      :checkoutTotal="checkoutTotal"
      :coupon="coupon"
      v-show="checkingout"
      @backtocart="cartOrCheckout"
      ref="checkout"
    >
    </checkout>
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
      isFullPage: true,
      opacity: 1
    }, { default: this.$createElement('MyLoading') })
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
        loader: 'bars',
        isFullPage: true,
        color: '#00457C'
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
        isFullPage: true,
        loader: 'bars',
        color: '#00457C'
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
        isFullPage: true,
        loader: 'bars',
        color: '#00457C'
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
      window.scrollTo(0, 0)
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
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
.cart-wrapper {
  position: relative;
  overflow: hidden;
  margin: auto;
  min-height: calc(100vh - 2rem);
  @media (min-width: 768px) {
    max-width: 768px;
    min-height: calc(100vh - 18.5rem);
  }
  @media (min-width: 992px) {
    max-width: 992px;
  }
  @media (min-width: 1200px) {
    max-width: 992px;
  }
  @media (min-width: 1441px) {
    max-width: 1200px;
  }
  .cart {
    margin: 5rem 1rem 2rem 1rem;
    height: 100%;
    overflow-x: hidden;
    overflow-y: visible;
    background: #ffffff;
    position: relative;
    @media (min-width: 576px) {
      margin-top: 7.5rem;
    }
    @media (min-width: 768px) {
      margin: 2rem;
    }
    .router-wrapper {
      .router {
        width: 100%;
        cursor: pointer;
        color: $blue !important;
      }
      .router:hover {
        text-decoration: underline;
      }
    }
    .cart-step-wrapper {
      text-align: center;
      margin: 2rem 0;
      padding: 0 2rem;
      height: 5rem;
      width: 100%;
      position: relative;
      @media (min-width: 576px) {
        margin: 2rem 10%;
        width: 80%;
      }
      @media (min-width: 768px) {
        margin: 2rem 15%;
        width: 70%;
      }
      @media (min-width: 992px) {
        margin: 2rem 20%;
        width: 60%;
      }
      .cart-step {
        height: 100%;
        width: 50%;
        position: relative;
        .cart-step-icon {
          z-index: 3;
          text-align: center;
          vertical-align: middle;
          line-height: 3rem;
          background-color: $navy;
          color: #ffffff;
          border-radius: 50%;
          position: absolute;
          left: 1rem;
          width: 3rem;
          height: 3rem;
        }
        .cart-step-text {
          text-align: center;
          z-index: 2;
          background-color: #ffffff;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          line-height: 3rem;
          height: 3rem;
          font-size: 0.9rem;
          width: 5rem;
          position: absolute;
          left: 0;
          top: 3rem;
        }
      }
      .connector-line {
        z-index: 1;
        position: absolute;
        top: 1.5rem;
        left: 3rem;
        right: 3rem;
        background-color: #919191;
        height: 2px;
        vertical-align: middle;
      }
      .checkout-step {
        height: 100%;
        width: 50%;
        position: relative;
        .checkout-step-icon {
          z-index: 2;
          text-align: center;
          vertical-align: middle;
          line-height: 3rem;
          background-color: #919191;
          color: #ffffff;
          border-radius: 50%;
          position: absolute;
          right: 1rem;
          width: 3rem;
          height: 3rem;
        }
        .checkout-step-text {
          z-index: 2;
          color: #919191;
          background-color: #ffffff;
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          line-height: 3rem;
          height: 3rem;
          font-size: 0.9rem;
          position: absolute;
          right: -0.5rem;
          top: 3rem;
        }
      }
    }
    .empty-cart {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        font-size: 1.5rem;
      }
      .back-to-homepage{
        background: $navy;
        color: #ffffff;
        padding: 8px;
        border-radius: 0.25rem;
      }
      .back-to-products {
        background: #ffffff;
        color: #666;
        padding: 8px;
        border-radius: 0.25rem;
        border: 1px solid #666;
      }
      .back-to-homepage:hover, .back-to-homepage:focus, .back-to-homepage:active:hover {
        background: #919191;
      }
      .back-to-products:hover, .back-to-products:focus, .back-to-products:active:hover {
        background: #919191;
        color: #ffffff;
      }
    }
    .row {
      .cart-board {
        @media (min-width: 576px) {
          padding: 0 3rem;
        }
        @media (min-width: 768px) {
          padding: 0;
        }
        .img {
          padding: 0;
          .img-wrapper{
            height: 3rem;
            width: 3rem;
            @media (min-width: 414px) {
              height: 4rem;
              width: 4rem;
            }
            @media (min-width: 576px) {
              height: 5rem;
              width: 5rem;
            }
            @media (min-width: 768px) {
              height: 4rem;
              width: 4rem;
            }
            @media (min-width: 992px) {
              height: 5rem;
              width: 5rem;
            }
            cursor: pointer;
            .cart-image {
              border-radius: 15%;
              width: 100%;
              padding-top: 100%;
            }
          }
        }
        .title {
          padding: 0 1.5rem 0 0;
          font-size: 0.9rem;
          @media (min-width: 576px) {
            font-size: 1rem;
          }
          @media (min-width: 768px) {
            font-size: 0.9rem;
            padding: 0 1rem;
          }
        }
        .btn {
          position: absolute;
          right: 0;
          top: 0;
        }
        .quantity{
          .form-control {
            width: 3.5rem;
            height: 2rem;
            font-size: 0.9rem;
            @media (min-width: 768px) {
              width: 3rem;
              font-size: 0.8rem;
              padding: 0 0.5rem;
            }
            @media (min-width: 992px) {
              width: 3.5rem;
              font-size: 0.9rem;
            }
            .quantity-error {
              top: 60px;
              width: 100px;
              position: absolute;
            }
          }
        }
        .price {
          line-height: 2rem;
          height: 2rem;
          font-weight: 500;
          vertical-align: middle;
          font-size: 1rem;
          @media (min-width: 576px) {
            font-size: 1.25rem;
          }
          @media (min-width: 768px) {
            font-size: 0.9rem;
          }
          @media (min-width: 992px) {
            font-size: 1rem;
          }
        }
        .clear-cart-wrapper {
          position: relative;
          display: none;
          @media (min-width: 768px) {
            display: flex;
            margin: 2rem 0;
          }
          .clear-cart {
            cursor: pointer;
            color: $blue;
            position: absolute;
            right: 1rem;
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
  margin-top: 2rem;
  @media (min-width: 576px) {
    padding: 0 3rem;
  }
  @media (min-width: 768px) {
    margin-top: 0;
    padding: 0 2rem;
  }
  .cart-card {
    width: 100%;
    .card-body {
      @media (min-width: 768px) {
        padding: 0.5rem;
      }
      .divider {
        display: block;
        height: 2px;
        background-color: #eeeeef;
        margin-top: 20px;
      }
      .list-group-item {
        border: none !important;
        font-size: 0.9rem;
        @media (min-width: 768px) {
          font-size: 1rem;
        }
        .coupon-name {
          font-size: 0.8rem;
          max-width: 50%;
          @media (min-width: 768px) {
            font-size: 0.9rem;
          }
        }
        .coupon-discount {
          text-align: right;
          width: 50%;
          max-width: 50%;
          font-size: 0.8rem;
          font-weight: 700;
          color: #f16c5d;
          @media (min-width: 768px) {
            font-size: 0.9rem;
          }
        }
        .use-coupon {
          font-size: 0.9rem;
          font-weight: 500;
          color: $blue;
        }
        .use-coupon:hover {
          cursor: pointer;
          color: $navy;
        }
        #collapseCoupon {
          .apply-coupon {
              z-index: 1;
              background-color: $navy;
              color: #ffffff;
          }
          .coupon-fail {
            color: #ec5252;
          }
        }
        .cart-total {
          font-size: 1rem;
          font-weight: 500;
          @media (min-width: 576px) {
            font-size: 1.25rem;
          }
          @media (min-width: 768px) {
            font-size: 0.9rem;
          }
          @media (min-width: 992px) {
            font-size: 1rem;
          }
        }
        .goToCheckout {
          color: #ffffff;
          background-color: $navy;
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
}
</style>
