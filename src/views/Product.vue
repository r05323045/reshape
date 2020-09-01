<template>
  <div class="product-wrapper">
    <div class="overlay-loading" ref="overlay-loading"></div>
    <div class="product" ref="product">
      <div class="router-wrapper mt-3">
        <router-link to="/"><span class="mr-2 router">首頁</span></router-link>
        <i class="fas fa-angle-right"></i>
        <span class="mx-2 router" @click="$router.push(`/category?n=${categoryList[product.category]}`)">{{ product.category }}</span>
        <i class="fas fa-angle-right"></i>
        <span class="mx-2" v-if="product.options">{{ product.options.subcategory }}</span>
      </div>
      <div class="row" v-if="product.title">
        <div class="col-12 col-md-6 col-xl-7 images">
          <div class="main-img">
            <div class="image" :style="`background: url(${product.imageUrl[0]}) no-repeat center/contain;`"></div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-xl-5 info">
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
            <div v-html="product.content"></div>
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
          <div class="put-in-cart" v-if="cart">
            <div v-if="!cartId.includes(product.id)" class="add-to-cart btn d-flex justify-content-center mt-3 mb-3" @click="addToCart">
              <span>放入購物車</span>
            </div>
            <div v-if="cartId.includes(product.id)" class="go-to-checkout btn d-flex justify-content-center mt-3 mb-3" @click="$router.push('/cart')">
              <span>立刻結帳</span>
            </div>
          </div>
          <div class="description">
            {{ product.description }}
          </div>
        </div>
      </div>
      <div class="recommand-products row">
        <div class="card-decks-wrapper col-12">
          <div class="card-decks-wrapper">
            <div class="title">類似商品</div>
            <div v-for="i in 5" :key="`row_${i}`">
              <div class="card-deck" v-if="products.slice((i - 1) * numCardsRow, i * numCardsRow).length > 0">
                <div
                  v-for="item in products.slice((i - 1) * numCardsRow, i * numCardsRow)"
                  :key="item.id" class="card my-5"
                  :id="item.id"
                  @click="getProduct(item.id)"
                >
                  <div class="img-wrapper">
                    <div :style="`background: url(${item.imageUrl[0]}) no-repeat center/contain;`" class="card-img-top"></div>
                  </div>
                  <div class="discount-badge" v-show="0.85 > item.price/item.origin_price">{{ `${(item.price/item.origin_price).toFixed(1) * 10} 折` }}
                  </div>
                  <div class="card-body">
                    <div class="card-content">
                      <p class="card-title">{{ item.title }}</p>
                      <div class="rating w-100 d-flex align-items-center" v-if="item.rating">
                        <span v-for="(score, index) in item.rating.rate" :class="score" class="star-item" :key="index"></span>
                        <span class="count">{{ `(${item.rating.count})`  }}</span>
                      </div>
                      <div class="price-wrapper">
                        <span class="price">{{ item.price | priceFormat }}</span>
                        <span class="original-price" v-show="item.origin_price > item.price">{{ item.origin_price | priceFormat }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card my-5 border-0 no-use" v-for="i in numCardsRow - products.slice((i - 1) * numCardsRow, i * numCardsRow).length" :key="`surplus_${i}`">
                </div>
              </div>
            </div>
          </div>
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
      id: '',
      windowWidth: window.innerWidth,
      products: [],
      product: {},
      cart: {},
      cartPatch: {
        product: String,
        quantity: 1
      },
      cartQuantity: 1,
      randomRating: {
        rate: [],
        count: Number
      },
      categoryList: {
        廚房餐桌: 1,
        空間佈置: 2,
        質感生活: 3,
        品味衣著: 4,
        文具小物: 5,
        食品飲料: 6,
        戶外休閒: 7
      }
    }
  },
  computed: {
    cartId: function () {
      if (this.cart.length > 0) {
        return this.cart.map(item => item.product.id)
      }
      return []
    },
    numCardsRow: function () {
      if (this.windowWidth >= 576 && this.windowWidth < 768) {
        return 3
      } else if (this.windowWidth >= 768) {
        return 4
      }
      return 2
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
  mounted () {
    this.id = this.$route.params.id
    this.getProduct(this.id)
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    rating () {
      const result = { rate: [], count: 0 }
      const score = Math.floor((2.5 + Math.random() * 2) * 2.5) / 2
      for (let i = 0; i < Math.floor(score); i++) {
        result.rate.push('on')
      }
      if (score % 1 !== 0) {
        result.rate.push('half')
      }
      while (result.rate.length < 5) {
        result.rate.push('off')
      }
      result.count = Math.floor((50 + Math.random() * 500))
      return result
    },
    addToCart () {
      const loader = this.$loading.show({
        container: this.$refs.overlayLoading,
        opacity: 1,
        isFullPage: true
      }, { default: this.$createElement('MyLoading') })
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
          this.$bus.$emit('cartUpdate', {
            cart: this.cart
          })
        })
    },
    getProduct (id) {
      if (id !== this.$route.params.id) {
        this.$router.push(`/product/${id}`)
      }
      const loader = this.$loading.show({
        container: this.$refs.overlayLoading,
        opacity: 1,
        isFullPage: true
      }, { default: this.$createElement('MyLoading') })
      this.cartPatch.product = id
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`
      this.$http.get(url)
        .then((res) => {
          this.product = res.data.data
          this.getProducts(loader)
          this.getCart()
        })
      this.randomRating.rate = this.rating().rate
      this.randomRating.count = Math.floor((50 + Math.random() * 500))
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      })
    },
    getProducts (loader) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products?paged=999`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
          this.products = this.products.filter(item => (item.category === this.product.category && item.id !== this.product.id))
          this.products.forEach(item => {
            item.rating = this.rating()
          })
          this.getCart()
          if (loader) {
            loader.hide()
          }
        })
    }
  }
}
</script>
<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
$light-gray: #a8a8ab;
.product-wrapper {
  margin: auto;
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 1200px) {
    max-width: 992px;
  }
  @media (min-width: 1441px) {
    max-width: 1200px;
  }
  .product {
    margin: 5rem 1rem 2rem 1rem;
    height: 100%;
    overflow: visible;
    max-height: none;
    @media (min-width: 576px) {
       margin: 2rem;
    }
    .router-wrapper {
      margin-bottom: 2rem;
      .router {
        cursor: pointer;
        color: $blue;
      }
    }
    .info {
      padding: 1rem;
      @media (min-width: 576px) {
        padding: 3rem;
      }
      @media (min-width: 768px) {
        padding: 1rem;
      }
      .title {
        font-size: 1.25rem;
        font-weight: 700;
        color: $gray;
        margin-bottom: 1rem;
      }
      .price-wrapper {
        display: flex;
        flex-direction: row;
        .price {
          height: 2rem;
          vertical-align: middle;
          height: 2rem;
          font-weight: 500;
          font-size: 1.25rem;
          margin-right: 20px;
          color: $navy;
        }
        .origin-price {
          height: 2rem;
          vertical-align: middle;
          line-height: 2rem;
          text-decoration: line-through;
          font-size: 1rem;
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
        margin-top: 1rem;
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
        font-size: 1rem;
        @media (min-width: 768px) {
          max-width: 100px;
        }
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
        margin-top: 1rem;
        font-size: 0.9rem;
      }
    }
    .images {
      display: flex;
      align-items: center;
      justify-content: center;
      @media (min-width: 576px) {
        padding: 3rem;
      }
      @media (min-width: 768px) {
        padding: 1rem;
      }
      .main-img {
        width: 100%;
        padding-top: 0;
        background: #a8a8ab;
        .image {
          width: 100%;
          padding-top: 100%;
        }
      }
    }
    .card-decks-wrapper {
      margin-top: 1rem;
      width: 100%;
      .title {
        font-size: 1rem;
        font-weight: 500;
        @media (min-width: 768px) {
          font-size: 1.25rem;
        }
        @media (min-width: 992px) {
          font-size: 1.5rem;
        }
      }
      .card-deck {
        display: flex;
        justify-content: space-between;
        @media (min-width: 375px) {
          margin: 1rem 0rem;
        }
        .card {
          border: none;
          width: 48%;
          height: 18rem;
          cursor: pointer;
          @media (min-width: 376px) {
            height: 20rem;
          }
          @media (min-width: 576px) {
            width: 100%;
          }
          .img-wrapper{
            position: relative;
            width: 100%;
            background: #e1e1e6;
            display: flex;
            align-items: center;
            .card-img-top {
              width: 100%;
              padding-top: 100%;
            }
          }
          .discount-badge {
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 2px 0 2px 0;
            z-index: 5;
            background: $pink;
            font-weight: 700;
            font-size: 14px;
            color: #ffffff;
            box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
            text-align: center;
            padding: 5px 6px;
            line-height: 1;
          }
          .card-body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.5rem;
            display: inline-block;
            position: relative;
            width: 100%;
            padding-bottom: 100%;
            position: relative;
            .card-content {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              margin-top: 1rem;
              .card-title {
                height: 2.5rem;
                line-height: 1.25rem;
                text-align: start;
                font-size: 0.9rem;
                font-weight: 700;
                color: $gray;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                visibility: visible;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                @media (min-width: 992px) {
                  width: auto;
                  font-size: 16px;
                }
              }
              .price-wrapper {
                width: 100%;
                text-align: start;
                flex-grow: 1;
                bottom: 10px;
                .price {
                  display: inline-block;
                  width: 100%;
                  vertical-align: middle;
                  font-weight: 500;
                  font-size: 0.9rem;
                  margin-right: 6px;
                  color: $navy;
                  @media (min-width: 1200px) {
                    width: auto;
                    font-size: 16px;
                  }
                }
                .original-price {
                  vertical-align: middle;
                  text-decoration: line-through;
                  font-size: 0.8rem;
                  line-height: 20px;
                  color: $light-gray;
                  @media (min-width: 992px) {
                    width: auto;
                    font-size: 14px;
                  }
                }
              }
              .rating {
                margin-bottom: 0.5rem;
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
            }
          }
        }
        .no-use {
          cursor: default;
        }
      }
    }
  }
}
.overlay-loading {
  z-index: -999;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
</style>
