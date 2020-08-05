<template>
  <div class="product" ref="product">
    <div class="router-wrapper mt-3">
      <router-link to="/"><span class="mr-2 router">首頁</span></router-link>
      <i class="fas fa-chevron-right"></i>
      <span class="ml-2">{{ product.category }}</span>
    </div>
    <div class="row mt-5" v-if="product.title">
      <div class="col-7 images">
        <div class="main-img">
          <img :src="product.imageUrl? product.imageUrl[0]: ''" class="w-100">
        </div>
      </div>
      <div class="col-5 info">
        <div class="title">{{ product.title }}</div>
        <div class="price-wrapper">
          <div class="price">{{ product.price | priceFormat }}</div>
          <div class="origin-price" v-show="0.85 > product.price/product.origin_price">{{ product.origin_price | priceFormat }}</div>
        </div>
        <div class="discount" v-show="0.85 > product.price/product.origin_price">
          <div class="badge">
            {{ `${(product.price/product.origin_price).toFixed(1) * 10} 折` }}
          </div>
          <div class="save-money">
            省下{{ product.origin_price - product.price | priceFormat }}
          </div>
        </div>
        <div class="content">
            {{ product.content }}
        </div>
        <div class="rating">
          <span v-for="(score, index) in randomRating.rate" :class="score" class="star-item" :key="index"></span>
          <span class="count">{{ `(${randomRating.count})`  }}</span>
        </div>
        <div class="quantity">
          <div>數量</div>
          <div class="input-area">
            <select class="form-control" v-if="cartPatch.quantity <= 4" v-model="cartQuantity">
              <option v-for="integer in Array.from(Array(4).keys())" :key="integer">
                  {{ integer + 1 }}
              </option>
              <option value="5">5+</option>
            </select>
            <validation-observer>
              <validation-provider v-slot="{ errors }" rules="required|numeric|min_value:1">
                <input :ref="`quantity-input-${product.id}`" type="text" class="form-control" v-model.lazy="cartQuantity" v-show="cartPatch.quantity > 4">
                <span v-if="errors[0]" class="text-danger quantity-error">{{ `數量${errors[0].slice((product.id.length + 16), errors[0].length)}` }}</span>
              </validation-provider>
            </validation-observer>
          </div>
        </div>
        <div class="put-in-cart">
          <div v-if="!alreadyPut" class="add-to-cart btn d-flex justify-content-center mt-3 mb-3" @click="addToCart">
            <span>放入購物車</span>
          </div>
          <div v-if="alreadyPut" class="go-to-checkout btn d-flex justify-content-center mt-3 mb-3" @click="$router.push('/cart')">
            <span>立刻結帳</span>
          </div>
        </div>
        <div class="description">
          {{ product.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      product: {},
      cart: {},
      cartPatch: {
        product: String,
        quantity: 1
      },
      cartQuantity: 1,
      alreadyPut: false,
      randomRating: {
        rate: [],
        count: Number
      }
    }
  },
  computed: {
    cartId: function () {
      if (this.cart.length > 0) {
        return this.cart.map(item => item.product.id)
      }
      return []
    }
  },
  watch: {
    cartQuantity: function (newValue, oldValue) {
      let num = newValue
      if (!/^[0-9]+$/.test(num) || num < 1) {
        num = oldValue
        this.cartQuantity = oldValue
      }
      this.cartPatch.quantity = num
    }
  },
  created () {
    const loader = this.$loading.show({
      container: this.$refs.product,
      opacity: 1,
      isFullPage: true
    })
    const { id } = this.$route.params
    this.cartPatch.product = id
    const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.$http.get(url)
      .then((res) => {
        this.product = res.data.data
        this.getCart(loader)
      })
    this.randomRating.rate = this.rating()
    this.randomRating.count = Math.floor((50 + Math.random() * 500))
  },
  methods: {
    rating () {
      const result = []
      const score = Math.floor((2.5 + Math.random() * 2) * 2.5) / 2
      for (let i = 0; i < Math.floor(score); i++) {
        result.push('on')
      }
      if (score % 1 !== 0) {
        result.push('half')
      }
      while (result.length < 5) {
        result.push('off')
      }
      return result
    },
    addToCart () {
      const loader = this.$loading.show({
        container: this.$refs.product,
        opacity: 0.8
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      let method = 'post'
      const indexOfPatch = this.cartId.indexOf(this.cartPatch.product)
      if (indexOfPatch >= 0) {
        method = 'patch'
        if (this.cart[indexOfPatch].quantity === Number(this.cartPatch.quantity)) {
          method = 'none'
          setTimeout(() => { loader.hide() }, 1000)
        }
      }
      if (method !== 'none') {
        this.$http[method](url, this.cartPatch)
          .then(() => {
            this.getCart(loader)
          })
          .catch((error) => {
            console.log(error.response.data.errors)
          })
      }
      this.alreadyPut = true
    },
    getCart (loader) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          if (loader) {
            loader.hide()
          }
          console.log()
        })
    }
  }
}
</script>
<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
$pink: #ee847d;
$navy: #10567b;
$blue: #2e90b7;
$gray: #39393e;
$light-gray: #a8a8ab;
.product {
  margin-top: 80px;
  height: 100%;
  overflow: visible;
  max-height: none;
  max-width: 1140px;
  .info {
    padding: 36px;
    .title {
      font-size: 26px;
      font-weight: 700;
      color: $gray;
      margin-bottom: 15px;
    }
    .price-wrapper {
      display: flex;
      flex-direction: row;
      .price {
        height: 50px;
        vertical-align: middle;
        line-height: 50px;
        font-weight: 500;
        font-size: 24px;
        margin-right: 20px;
        color: $navy;
      }
      .origin-price {
        height: 50px;
        vertical-align: middle;
        line-height: 50px;
        text-decoration: line-through;
        font-size: 20px;
        color: $light-gray;
      }
    }
    .discount {
      max-width: 200px;
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      border: solid 1px $pink;
      .badge {
        padding: 0 10px;
        height: 50px;
        border-radius: 2px 0 2px 0;
        background: $pink;
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
        box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
        text-align: center;
        line-height: 50px;
        vertical-align: middle;
      }
      .save-money {
        margin-left: 20px;
        height: 50px;
        font-size: 16px;
        font-weight: 700;
        color: $gray;
        line-height: 50px;
        vertical-align: middle;
      }
    }
    .content {
      margin-top: 30px;
      line-height: 30px;
      font-weight: 500;
    }
    .rating {
      margin-top: 20px;
      .star-item{
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-repeat: no-repeat;
        background-size: 10px 10px;
      }
      .star-item:last-child{
        margin-right: 0;
      }
      .on{
        background-image: url('../../public/images/star/star24_on@2x.png')
      }
      .off{
        background-image: url('../../public/images/star/star24_off@2x.png')
      }
      .half{
        background-image: url('../../public/images/star/star24_half@2x.png')
      }
      .count {
        margin-left: 5px;
        font-size: 10px;
        font-weight: 500;
      }
    }
    .quantity {
      margin-top: 20px;
      max-width: 100px;
      .input-area {
        margin-top: 20px;
      }
    }
    .put-in-cart {
      margin-top: 20px;
      .add-to-cart {
        color: #ffffff;
        background-color: $pink;
        text-decoration: none;
        font-weight: 700;
      }
      .add-to-cart:hover, .add-to-cart:focus, .add-to-cart:active:hover {
        color: #ffffff;
        background-color: #f16c5d;
      }
      .go-to-checkout {
        color: #ffffff;
        background-color: #10567b;
        text-decoration: none;
      }
      .go-to-checkout:hover, .go-to-checkout:focus, .go-to-checkout:active:hover {
        color: #ffffff;
        background-color: #092c3f;
      }
    }
    .description {
      color: $gray;
      margin-top: 20px;
    }
  }
  .images {
    padding: 36px;
  }
}
</style>
