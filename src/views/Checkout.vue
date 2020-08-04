<template>
  <div class="checkout" ref="checkout">
    <div class="router-wrapper mt-3">
        <i class="fas fa-chevron-left" @click="backToCart"></i>
        <span class="mx-2 router" @click="backToCart">返回購物車</span>
    </div>
    <div class="my-5 cart-step-wrapper d-flex justify-content-center mx-auto">
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
    <div class="row">
      <div class="mt-5 col-4 offset-1 cart-summary" v-if="cart.length">
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
              <div class="divider-wrapper">
                <div class="divider"></div>
              </div>
              <div class="list-group-item d-flex w-100 mt-3">
                <div class="cart-total w-100 d-flex justify-content-between">
                    <span>結帳金額</span>
                    <span>{{ cartTotal | priceFormat}}</span>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-3 col-6 justify-content-center checkout-form">
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
</template>

<script>
import $ from 'jquery'
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
      }
    }
  },
  props: {
    cart: {}
  },
  computed: {
    cartTotal: function () {
      let total = 0
      this.cart.forEach((item) => {
        total += item.product.price * item.quantity
      })
      return total
    }
  },
  methods: {
    backToCart () {
      this.$emit('backtocart')
    },
    createOrder () {
      const loader = this.$loading.show({
        container: this.$refs.checkout,
        opacity: 1,
        isFullPage: true
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/orders`
      this.$http.post(url, this.form)
        .then((response) => {
          if (response.data.data.id) {
            Object.keys(this.form).forEach(item => { item = '' })
            this.$refs.formvalidation.reset()
            this.$refs.checkoutform.reset()
            $('#orderModal').modal('show')
          }
          this.$router.push('/')
          this.$bus.$emit('cartUpdate', {
            cart: {}
          })
          loader.hide()
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
.checkout{
  margin-top: 80px;
  height: 100%;
  overflow: visible;
  max-height: none;
  max-width: 1140px;
  background: #ffffff;
  .router-wrapper {
    .router {
      width: 100%;
      cursor: pointer;
      color: #10567b;
    }
    .router:hover {
      text-decoration: underline;
    }
    .fa-chevron-left {
      cursor: pointer;
      color: #2e90b7;
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
        background-color: #10567b;
        color: #ffffff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    }
    .checkout-step-text {
        padding-left: 15px;
        padding-right: 10px;
        z-index: 999;
        background-color: #ffffff;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        line-height: 50px;
        height: 50px;
        color: #000000
    }
    .connector-line {
        z-index: 1;
        position: absolute;
        left: 0;
        top: 23px;
        background-color: #10567b;
        width: 100%;
        height: 2px;
        vertical-align: middle;
    }
  }
  .checkout-form {
    .checkout-submit {
      color: #ffffff;
      background-color: #10567b;
      text-decoration: none;
    }
    .checkout-submit:hover, .checkout-submit:focus, .checkout-submit:active:hover {
      color: #ffffff;
      background-color: #092c3f;
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
