<template>
  <div class="home mx-auto" ref="home">
    <div class="overlay-loading" ref="overlay-loading"></div>
    <div class="category">
      <div class="row">
        <div class="col-3 col-lg-2 category-wrapper">
          <div class="side-category">
            <div class="title">商品分類</div>
            <ul class="list-group list-group-flush">
              <div class="back" @click="$router.push('/products')">
                <i class="fas fa-angle-left"></i>
                <span class="text">所有分類</span>
              </div>
              <li class="list-group-item" v-if="$route.query.n === '1'">
                <i class="fas fa-utensils"></i>
                廚房餐桌
              </li>
              <li class="list-group-item" v-if="$route.query.n === '2'">
                <i class="fas fa-couch"></i>
                空間佈置
              </li>
              <li class="list-group-item" v-if="$route.query.n === '3'">
                <i class="fas fa-laptop-house"></i>
                質感生活
                </li>
              <li class="list-group-item" v-if="$route.query.n === '4'">
                <i class="fas fa-tshirt"></i>
                品味衣著
              </li>
              <li class="list-group-item" v-if="$route.query.n === '5'">
                <i class="fas fa-pencil-ruler"></i>
                文具小物
              </li>
              <li class="list-group-item" v-if="$route.query.n === '6'">
                <i class="fas fa-cocktail"></i>
                食品飲料
              </li>
              <li class="list-group-item" v-if="$route.query.n === '7'">
                <i class="fas fa-hiking"></i>
                戶外休閒
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-10 card-decks-wrapper d-flex flex-column justify-content-center" :class="{'only-one': products.length <= numCardsRow}">
          <div class="title">{{ name[$route.query.n] }}</div>
          <div v-for="i in 5" :key="`row_${i}`">
            <div class="card-deck" v-if="products.slice((i - 1) * numCardsRow, i * numCardsRow).length > 0">
              <div v-for="item in products.slice((i - 1) * numCardsRow, i * numCardsRow)" :key="item.id" class="card my-5" :id="item.id"  @click="$router.push(`/product/${item.id}`)"> <!-- @mouseover="getDescription(item)" -->
                <div class="img-wrapper">
                  <div :style="`background: url(${item.imageUrl[0]}) no-repeat center/contain;`" class="card-img-top"></div>
                </div>
                <div class="discount-badge" v-show="0.85 > item.price/item.origin_price">{{ `${(item.price/item.origin_price).toFixed(1) * 10} 折` }}
                </div>
                <div class="card-body">
                  <div class="card-content">
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
              <div class="card my-5 border-0 no-use" v-for="i in numCardsRow - products.slice((i - 1) * numCardsRow, i * numCardsRow).length" :key="`surplus_${i}`">
              </div>
            </div>
          </div>
          <pagination :pages="pagination" @emit-pages="getProducts" class="pagination-wrapper"></pagination>
        </div>
      </div>
      <div class="row w-100">
        <div class="col-0 col-xl-2"></div>
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
</template>

<script>
import { BPopover } from 'bootstrap-vue'
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
import pagination from '@/components/Pagination'
export default {
  name: 'category',
  data () {
    return {
      name: {
        1: '廚房餐桌',
        2: '空間佈置',
        3: '質感生活',
        4: '品味衣著',
        5: '文具小物',
        6: '食品飲料',
        7: '戶外休閒'
      },
      products: [],
      hotProducts: [],
      cart: {},
      pagination: {},
      isLoading: false,
      randomRating: {
        rate: [],
        count: Number
      },
      windowWidth: window.innerWidth
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
  created () {
  },
  mounted () {
    this.getProducts()
    this.getCart()
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.getProducts()
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
    getProducts (name) {
      const loader = this.$loading.show({
        container: this.$refs.overlayLoading,
        isFullPage: true,
        opacity: 1
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
          this.products = this.products.filter(item => item.category === this.name[this.$route.query.n])
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
.home {
  width: 100%;
  overflow: hidden;
  .router-link-active {
    color: $blue;
  }
  .category {
    margin: 3.5rem auto 2rem auto;
    @media (min-width: 576px) {
      margin-top: 4rem;
    }
    @media (min-width: 768px) {
      margin: 1rem auto;
      max-width: 992px;
    }
    @media (min-width: 1200px) {
      max-width: 992px;
    }
    @media (min-width: 1441px) {
      max-width: 1200px;
    }
    .row {
      margin: 0;
      @media (min-width: 576px) {
        padding: 1rem;
      }
    }
    .category-wrapper{
      display: none;
      @media (min-width: 768px) {
        display: flex;
        justify-content: center;
      }
      .side-category {
        .title {
          font-size: 1rem;
          color: #39393e;
          font-weight: 500;
          margin-bottom: 0.5rem;
          @media (min-width: 992px) {
            font-size: 1.25rem;
          }
        }
        .list-group {
          width: 100%;
          .back {
            margin: 0.5rem;
            .text {
              font-size: 0.9rem;
              font-weight: 500;
              margin: 0 0.5rem;
            }
          }
          .list-group-item {
            font-size: 0.8rem;
            font-weight: 500;
            padding: 0.75rem 0.75rem;
            color: $pink;
            cursor: pointer;
            @media (min-width: 768px) {
              font-size: 0.9em;
            }
            .svg-inline--fa {
              margin-right: 0.5rem;
              width: 20px;
              path {
                fill: #ffffff;
                stroke: $pink;
                stroke-width: 3rem;
              }
            }
          }
        }
      }
    }
    .card-decks-wrapper {
      width: 100%;
      padding: 0 1rem 1rem 1rem;
      margin-top: 2rem;
      @media (min-width: 576px) {
        margin-top: 3.5rem;
      }
      @media (min-width: 768px) {
        margin-top: 0;
      }
      @media (min-width: 992px) {
        padding-left: 3rem !important;
        padding-right: 3rem !important;
      }
      .title {
        margin: 0 1rem 1rem 1rem;
        font-size: 1.25rem;
        font-weight: 500;
        @media (min-width: 576px) {
          margin-left: 0rem;
        }
        @media (min-width: 992px) {
          font-size: 1.5rem;
        }
      }
      .card-deck {
        padding: 1rem 0;
        display: flex;
        justify-content: space-between;
        @media (min-width: 414px) {
          padding: 2rem 0;
        }
        @media (min-width: 468px) {
          padding: 3rem 0;
        }
        @media (min-width: 576px) {
          padding: 0.5rem 0;
        }
        @media (min-width: 667px) {
          padding: 1.5rem 0;
        }
        @media (min-width: 768px) {
          padding: 0rem;
        }
        .card {
          margin: 1rem 0.5rem !important;
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
                  @media (min-width: 992px) {
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
    .card-decks-wrapper.only-one {
      width: 100%;
      padding: 0 1rem 1rem 1rem;
      margin-top: 2rem;
      @media (min-width: 576px) {
        margin-top: 3.5rem;
      }
      @media (min-width: 768px) {
        margin-top: 0;
        padding-left: 0rem;
        padding-right: 0rem;
      }
      @media (min-width: 992px) {
        padding-left: 3rem;
        padding-right: 3rem;
      }
      padding-bottom: 25%;
    }
  }
}
.popper-wrapper {
  display: none;
  @media (min-width: 992px) {
    display: block;
    border-radius: 30%;
    padding: 1.5rem;
    width: 16rem;
    height: 25rem;
  }
  .popper-badge {
    display: inline-block;
    white-space: nowrap;
    font-size: 12px;
    margin: 3px;
    padding: 3px 6px;
    color: #919191;
  }
  .popper-title {
    margin: auto;
    height: 2rem;
    line-height: 1rem;
    font-size: 1rem;
    font-weight: 700;
    color: #39393e;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    visibility: visible;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
      font-size: 1rem;
      margin-right: 6px;
      color: $navy;
    }
    .original-price {
      vertical-align: middle;
      text-decoration: line-through;
      font-size: 0.9rem;
      line-height: 0.9rem;
      color: $light-gray;
    }
  }
  .popper-content {
    min-height: 8.4rem;
    max-height: 8.4rem;
    max-width: 100%;
    line-height: 1.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    visibility: visible;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
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
.overlay-loading {
  z-index: -999;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
