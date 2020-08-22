<template>
  <div class="home-wrapper" ref="home-warpper">
    <div class="home mx-auto" ref="home">
      <div class="products">
        <div class="row">
          <div class="col-2">
            <div class="category">
              <div class="title">商品分類</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <i class="fas fa-utensils"></i>
                  廚房餐桌
                </li>
                <li class="list-group-item">
                  <i class="fas fa-couch"></i>
                  空間佈置
                </li>
                <li class="list-group-item">
                  <i class="fas fa-laptop-house"></i>
                  質感生活
                  </li>
                <li class="list-group-item">
                  <i class="fas fa-tshirt"></i>
                  品味衣著
                </li>
                <li class="list-group-item">
                  <i class="fas fa-pencil-ruler"></i>
                  文具小物
                </li>
                <li class="list-group-item">
                  <i class="fas fa-cocktail"></i>
                  食品飲料
                </li>
                <li class="list-group-item">
                  <i class="fas fa-hiking"></i>
                  戶外休閒
                </li>
              </ul>
            </div>
          </div>
          <div class="col-10">
            <div class="hot-sales w-100 row d-flex align-items-center" v-if="products.length > 0">
              <div class="col-6">
                <hot-swiper :products="hotProducts"></hot-swiper>
              </div>
              <div class="col-6">
                <div class="title">本月熱賣 TOP 5</div>
                <ul class="list-group list-group-flush">
                  <li
                    v-for="(item,index) in hotProducts"
                    class="list-group-item d-flex flex-row"
                    :key="`top-5-${item.id}`"
                    @click="$router.push(`/product/${item.id}`)"
                  >
                    <div class="rank">{{ `0${index + 1}` }}</div>
                    <div class="image" :style="`background: url(${item.imageUrl[0]}) no-repeat center/contain;`"></div>
                    <span class="title">{{ item.title }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <h3 class="title">熱賣商品</h3>
            <div v-for="i in 5" :key="`row_${i}`">
              <div class="card-deck" v-if="products.slice((i - 1) * 4, i * 4).length > 0">
                <div v-for="item in products.slice((i - 1) * 4, i * 4)" :key="item.id" class="card my-5" :id="item.id"  @click="$router.push(`/product/${item.id}`)"> <!-- @mouseover="getDescription(item)" -->
                  <div class="img-wrapper">
                    <div :style="`background: url(${item.imageUrl[0]}) no-repeat center/contain;`" class="card-img-top"></div>
                  </div>
                  <div class="discount-badge" v-show="0.85 > item.price/item.origin_price">{{ `${(item.price/item.origin_price).toFixed(1) * 10} 折` }}
                  </div>
                  <div class="card-body">
                    <p class="card-title">{{ item.title }}</p>
                    <div class="rating w-100 d-flex align-items-center">
                      <span v-for="(score, index) in item.rating.rate" :class="score" class="star-item" :key="index"></span>
                      <span class="count">{{ `(${item.rating.count})`  }}</span>
                    </div>
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
                        <span v-for="(score, index) in item.rating.rate" :class="score" class="star-item" :key="index"></span>
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
                      <!--
                      <div v-if="cartId.includes(item.id)" class="popper-description mt-2">
                        {{ item.description }}
                      </div>
                      -->
                    </div>
                  </b-popover>
                </div>
                <div class="card my-5 border-0 no-use" v-for="i in 4 - products.slice((i - 1) * 4, i * 4).length" :key="`surplus_${i}`">
                </div>
              </div>
            </div>
            <pagination :pages="pagination" @emit-pages="getProducts" class="pagination-wrapper"></pagination>
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
    </div>
  </div>
</template>

<script>
import { BPopover } from 'bootstrap-vue'
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import pagination from '@/components/Pagination'
import hotSwiper from '@/components/HotSwiper.vue'
export default {
  name: 'home',
  data () {
    return {
      products: [],
      hotProducts: [],
      cart: {},
      pagination: {},
      isLoading: false,
      randomRating: {
        rate: [],
        count: Number
      }
    }
  },
  components: {
    pagination,
    hotSwiper,
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
    getSwiper () {
      this.mySwiper = new Swiper('.hot-sales.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
        }
      })
    },
    getProducts (page = 1) {
      const loader = this.$loading.show({
        container: this.$refs.homeWrapper,
        isFullPage: false,
        opacity: 1
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products?paged=16&page=${page}`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
          if (page === 1) {
            this.hotProducts = this.products.slice(0, 5)
          }
          this.products.forEach(item => {
            item.rating = this.rating()
          })
          this.getSwiper()
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
    margin: 5rem auto 2rem auto;
    .category {
      .title {
        font-size: 16px;
        color: #39393e;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .list-group {
        width: 80%;
        .list-group-item {
          font-size: 14px;
          font-weight: 500;
          padding: 0.75rem 0.75rem;
          cursor: pointer;
          .svg-inline--fa {
            margin-right: 0.5rem;
            width: 20px;
            path {
              fill: #ffffff;
              stroke: #000000;
              stroke-width: 18px;
            }
          }
        }
        .list-group-item:hover {
          color: $pink;
          .svg-inline--fa {
            path {
              stroke: $pink;
            }
          }
        }
      }
    }
    .hot-sales {
      height: 30rem;
      width: 100%;
      margin-bottom: 3rem;
      .title {
        font-size: 1.25rem;
        font-weight: 500;
        margin-right: 0.5rem;
      }
      .list-group-item:hover {
        -webkit-filter: opacity(0.8)
      }
      .list-group-item {
        margin: 0.1rem 0;
        height: 100%;
        cursor: pointer;
        .image {
          height: 60px;
          width: 60px;
        }
        .rank {
          color: $light-gray;
          font-size: 1.25rem;
          font-weight: 500;
          margin-right: 0.5rem;
        }
        .title {
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0 1rem;
        }
        .rank, .title {
          line-height: 60px;
          height: 60px;
          vertical-align: center;
        }
      }
    }
    .card-deck {
      height: 23rem;
      margin: 0rem 0;
      .card {
        margin: 0 0.5rem 0.5rem 0.5rem;
        cursor: pointer;
        height: 21rem;
        width: 15rem;
        border: none;
        .img-wrapper{
          height: 13.5rem;
          width: 13.5rem;
          background: #e1e1e6;
          display: flex;
          align-items: center;
          .card-img-top {
            height: 13.5rem;
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
          padding: 1rem;
          .card-title {
            width: 100%;
            font-size: 16px;
            font-weight: 700;
            color: $gray;
            flex-grow: 3;
            height: 2.5rem;
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
    .pagination-wrapper {
      margin: 8rem auto 0 auto;
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
</style>
