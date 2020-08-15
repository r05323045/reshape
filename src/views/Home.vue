<template>
  <div class="home-wrapper" ref="home-warpper">
    <div class="home mx-auto" ref="home">
      <div class="products">
        <div class="mb-2">
          <h3 class="title">廚房餐桌</h3>
        </div>
        <div v-for="i in 5" :key="`row_${i}`">
          <div class="card-deck mx-auto" v-if="products.slice((i - 1) * 5, i * 5).length > 0">
            <div v-for="item in products.slice((i - 1) * 5, i * 5)" :key="item.id" class="card my-5" :id="item.id"  @click="$router.push(`/product/${item.id}`)" @mouseover="getDescription(item)">
              <img :src="item.imageUrl[0]" class="card-img-top">
              <div class="discount-badge" v-show="0.85 > item.price/item.origin_price">{{ `${(item.price/item.origin_price).toFixed(1) * 10} 折` }}
              </div>
              <div class="card-body">
                <p class="card-title">{{ item.title }}</p>
                <div class="price-wrapper">
                  <span class="price">{{ item.price | priceFormat }}</span>
                  <span class="original-price" v-show="item.origin_price > item.price">{{ item.origin_price | priceFormat }}</span>
                </div>
              </div>
              <b-popover :target="item.id" triggers="hover focus" placement="right" class="product-popper" :ref="`popover-${item.id}`">
                <loading :active.sync="isLoading" loader="bars"></loading>
                <div class="popper-wrapper">
                  <div class="popper-title mt-3">
                      {{ item.title }}
                  </div>
                  <span class="btn btn-light popper-badge"> {{ item.category }} </span>
                  <div class="popper-content mt-2">
                    <div v-html="item.content"></div>
                  </div>
                  <div class="popper-star mt-3">
                    <span v-for="(score, index) in rating()" :class="score" class="star-item" :key="index"></span>
                  </div>
                  <div class="popper-price mt-3">
                    <span class="price">{{ item.price | priceFormat }}</span>
                    <span class="original-price" v-show="item.origin_price > item.price">{{ item.origin_price | priceFormat }}</span>
                  </div>
                  <div v-if="!cartId.includes(item.id)" :class="{ addToCart: !cartId.includes(item.id), goToCheckout: cartId.includes(item.id) }" class="btn d-flex justify-content-center mt-3 mb-3" @click="addToCart(item)">
                    <span>放入購物車</span>
                  </div>
                  <div v-if="cartId.includes(item.id)" :class="{ addToCart: !cartId.includes(item.id), goToCheckout: cartId.includes(item.id) }" class="btn d-flex justify-content-center mt-3 mb-3" @click="$router.push('/cart')">
                    <span>立刻結帳</span>
                  </div>
                  <div v-if="cartId.includes(item.id)" class="popper-description mt-2">
                    {{ item.description }}
                  </div>
                </div>
              </b-popover>
            </div>
            <div class="card my-5 border-0 no-use" v-for="i in 5 - products.slice((i - 1) * 5, i * 5).length" :key="`surplus_${i}`">
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="orderModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">完成訂購</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p>感謝你的購買，請耐心等候到貨通知</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            </div>
          </div>
        </div>
      </div>
      <pagination :pages="pagination" @emit-pages="getProducts" class="pagination-wrapper my-3"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import { BPopover } from 'bootstrap-vue'
export default {
  name: 'home',
  data () {
    return {
      products: [],
      cart: {},
      pagination: {},
      isLoading: false
    }
  },
  components: {
    pagination,
    'b-popover': BPopover
  },
  computed: {
    cartId: function () {
      if (this.cart.length > 0) {
        return this.cart.map(item => item.product.id)
      }
      return []
    }
  },
  created () {
    this.getProducts()
    this.getCart()
    this.$bus.$on('cartUpdate', event => {
      this.cart = event.cart
    })
  },
  methods: {
    getProducts (page = 1) {
      const loader = this.$loading.show({
        container: this.$refs.homeWrapper,
        isFullPage: false,
        opacity: 1
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products?paged=25&page=${page}`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          loader.hide()
        })
    },
    getCart (loader) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          if (loader) {
            loader.hide()
          }
        })
    },
    addToCart (item, quantity = 1) {
      const loader = this.$loading.show({
        container: this.$refs.homeWrapper,
        isFullPage: true,
        opacity: 1
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      this.$http.post(url, cart)
        .then(() => {
          this.getCart(loader)
          this.$refs[`popover-${item.id}`][0].$emit('close')
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
    getDescription (item) {
      if (!item.description) {
        if (this.cartId.includes(item.id)) {
          this.isLoading = true
          const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${item.id}`
          const that = this
          this.$http.get(url)
            .then((res) => {
              const product = res.data.data
              that.products.forEach((el, idx) => {
                if (el.id === item.id) {
                  that.products[idx].description = product.description
                }
              })
              this.isLoading = false
            })
        }
      }
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
.home-wrapper {
  display: flex;
  flex-direction: column;
}
.home {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  .router-link-active {
    color: $blue;
  }
  .products {
    max-width: 1140px;
    margin: 2rem auto;
    .card-deck {
      .card {
        cursor: pointer;
        height: 300px;
        .card-img-top {
          height: 160px;
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
          height: 180px;
          .card-title {
            width: 100%;
            flex-grow: 3;
            font-size: 16px;
            font-weight: 700;
            color: $gray;
            margin-bottom: 15px;
          }
          .price-wrapper {
            flex-grow: 1;
            width: 100%;
            bottom: 10px;
            .price {
              vertical-align: middle;
              font-weight: 500;
              font-size: 16px;
              margin-right: 6px;
              color: $navy;
            }
            .original-price {
              vertical-align: middle;
              text-decoration: line-through;
              font-size: 14px;
              line-height: 20px;
              color: $light-gray;
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
.popper-wrapper {
  border-radius: 30%;
  padding: 15px;
  .popper-badge {
    display: inline-block;
    white-space: nowrap;
    font-size: 12px;
    margin: 3px;
    padding: 3px 6px;
    color: #919191;
  }
  .popper-title {
    font-size: 16px;
    font-weight: 700;
    color: #39393e;
    margin-bottom: 15px;
  }
  .popper-star {
    font-size: 0;
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
  }
  .popper-price {
    .price {
      vertical-align: middle;
      font-weight: 500;
      font-size: 16px;
      margin-right: 6px;
      color: $navy;
    }
    .original-price {
      vertical-align: middle;
      text-decoration: line-through;
      font-size: 14px;
      line-height: 20px;
      color: $light-gray;
    }
  }
  .popper-description {
    font-size: 10px;
    min-height: 10px;
  }
  .addToCart {
    color: #ffffff;
    background-color: #ec5252;
    text-decoration: none;
  }
  .addToCart:hover, .add-to-cartaddToCart:focus, .addToCart:active:hover {
    color: #ffffff;
    background-color: #c93232;
  }
  .goToCheckout {
    color: #ffffff;
    background-color: #10567b;
    text-decoration: none;
  }
  .goToCheckout:hover, .goToCheckout:focus, .goToCheckout:active:hover {
    color: #ffffff;
    background-color: #092c3f;
  }
}
footer {
  height: 100px;
  background-color: #f7f7f8;
  p {
    height: 100px;
    margin: auto;
    line-height: 100px;
    vertical-align: middle;
    a {
      color: black;
      cursor: pointer;
    }
  }
}
</style>
