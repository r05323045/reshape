<template>
  <div class="checkout" ref="checkout">
    <paid v-show="paid"></paid>
    <div v-show="paid === false">
      <div class="router-wrapper">
          <i class="fas fa-angle-left" @click="backToCart"></i>
          <span class="mx-2 router" @click="backToCart">返回購物車</span>
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
      <div class="row form-wrapper">
        <div class="col-12 col-md-6 col-lg-5 cart-summary mt-md-5" v-if="cart.length && checkoutTotal">
          <div class="card cart-card mx-auto">
            <div class="card-header">
              訂單摘要
            </div>
            <div class="card-body d-flex flex-column">
              <ul class="list-group h-100">
                <li class="list-group-item d-flex justify-content-between">
                  <span>商品總計</span>
                  <span>{{ cartTotal | priceFormat}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>運費總計</span>
                  <span>NT$ 0</span>
                </li>
                <li v-if="coupon && coupon.enabled" class="list-group-item d-flex justify-content-between">
                  <span>{{ coupon.title }}</span>
                  <span class="coupon-discount">{{ - Math.ceil(cartTotal * (1 - coupon.percent / 100)) | priceFormat }}</span>
                </li>
                <div class="divider-wrapper">
                  <div class="divider"></div>
                </div>
                <div class="list-group-item d-flex w-100 mt-3">
                  <div class="cart-total w-100 d-flex justify-content-between">
                      <span>結帳金額</span>
                      <span>{{ checkoutTotal | priceFormat}}</span>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-7 justify-content-center checkout-form">
          <validation-observer ref="formvalidation" v-slot="{ invalid }" class="col-md-6">
            <form ref="checkoutform" @submit.prevent="createOrder">
              <div class="form-group">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="username">收件人姓名</label>
                  <input id="username" v-model="form.name" type="text" class="form-control" :class="classes">
                  <span v-if="errors[0]" class="text-danger">{{ `收件人姓名${errors[0].slice(9, errors[0].length)}` }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="email">Email</label>
                  <input id="email" v-model="form.email" type="email" class="form-control" :class="classes">
                  <span v-if="errors[0]" class="text-danger">{{ `Email${errors[0].slice(6, errors[0].length)}` }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider  v-slot="{ errors, classes }" rules="required|numeric|min:8">
                  <label for="tel">電話</label>
                  <input id="tel" v-model="form.tel" type="tel" class="form-control" :class="classes">
                  <span v-if="errors[0]" class="text-danger">{{ `電話${errors[0].slice(4, errors[0].length)}` }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="address">地址</label>
                  <input id="address" v-model="form.address" type="text" class="form-control" :class="classes">
                  <span v-if="errors[0]" class="text-danger">{{ `地址${errors[0].slice(8, errors[0].length)}` }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <validation-provider v-slot="{ errors, classes }" rules="required">
                  <label for="message">購買方式</label>
                  <select id="payment" v-model="form.payment" class="form-control" :class="classes" required>
                    <option value="" disabled>
                      請選擇付款方式
                    </option>
                    <option value="WebATM">
                      WebATM
                    </option>
                    <option value="ATM">
                      ATM
                    </option>
                    <option value="CVS">
                      CVS
                    </option>
                    <option value="Barcode">
                      Barcode
                    </option>
                    <option value="Credit">
                      Credit
                    </option>
                    <option value="ApplePay">
                      ApplePay
                    </option>
                    <option value="GooglePay">
                      GooglePay
                    </option>
                  </select>
                  <span v-if="errors[0]" class="text-danger">{{ `購買方式${errors[0].slice(8, errors[0].length)}` }}</span>
                </validation-provider>
              </div>
              <div class="form-group">
                <label for="message">留言</label>
                <textarea id="message" v-model="form.message" class="form-control" cols="30" rows="3"></textarea>
              </div>
              <div class="text-right">
                <button type="submit" class="btn checkout-submit" :disabled="invalid">
                  送出
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import paid from '@/views/Paid'
export default {
  name: 'Checkout',
  data () {
    return {
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: ''
      },
      paid: false
    }
  },
  props: {
    cart: {},
    cartTotal: Number,
    checkoutTotal: Number,
    coupon: {}
  },
  components: {
    paid
  },
  methods: {
    backToCart () {
      this.$emit('backtocart')
    },
    createOrder () {
      const loader = this.$loading.show({
        opacity: 1,
        isFullPage: true,
        zIndex: 999
      }, { default: this.$createElement('MyLoading') })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/orders`
      const order = { ...this.form }
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code
      }
      this.$http.post(url, order)
        .then((response) => {
          if (response.data.data.id) {
            Object.keys(this.form).forEach(item => { item = '' })
            this.$refs.formvalidation.reset()
            this.$refs.checkoutform.reset()
          }
          this.$bus.$emit('cartUpdate', {
            cart: {}
          })
          loader.hide()
          this.paid = true
        }).catch((error) => {
          console.log(error)
          this.$router.push('/')
          loader.hide()
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
.checkout {
  z-index: 0;
  padding: 5rem 1rem 2rem 1rem;
  height: 100%;
  overflow-x: hidden;
  overflow-y: visible;
  background: #ffffff;
  min-height: calc(100vh - 7rem);
  @media (min-width: 576px) {
    padding-top: 7.5rem;
  }
  @media (min-width: 768px) {
    padding-top: 0rem;
    margin-top: 2rem;
  }
  .router-wrapper {
    .router {
      width: 100%;
      cursor: pointer;
      color: $blue;
    }
    .router:hover {
      text-decoration: underline;
    }
    .fa-angle-left {
      cursor: pointer;
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
      background-color: $navy;
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
        background-color: $navy;
        color: #ffffff;
        border-radius: 50%;
        position: absolute;
        right: 1rem;
        width: 3rem;
        height: 3rem;
      }
      .checkout-step-text {
        z-index: 2;
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
  .form-wrapper {
    margin: 0;
    @media (min-width: 992px) {
      max-width: 768px;
      margin: auto;
    }
    .checkout-form {
      padding: 1rem;
      @media (min-width: 576px) {
        padding: 1rem 3rem;
      }
      @media (min-width: 768px) {
        padding: 0rem;
      }
      .checkout-submit {
        margin-top: 2rem;
        color: #ffffff;
        background-color: $navy;
        text-decoration: none;
      }
      .checkout-submit:hover, .checkout-submit:focus, .checkout-submit:active:hover {
        color: #ffffff;
        background-color: #092c3f;
      }
    }
  }
  .modal {
    .modal-content {
      border: 0 none;
      border-radius: 10px;
      .modal-body {
        vertical-align: middle;
        line-height: 72px;
      }
    }
    .btn {
      border-radius: 5px;
    }
  }
}
</style>
