<template>
  <div class="home mx-auto" ref="home">
    <div class="overlay-loading" ref="overlay-loading"></div>
    <div class="search">
      <div class="row">
        <div class="col-3 col-lg-2 category-wrapper">
          <div class="side-category">
            <div class="title">商品分類</div>
            <ul class="list-group list-group-flush">
              <div class="back" @click="$router.push('/products')">
                <i class="fas fa-angle-left"></i>
                <span class="text">所有分類</span>
              </div>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-9 col-lg-10 notFound" v-if="products.length === 0">
          <div class="title-wrapper">
            <div class="title">{{ `找不到與"${$route.query.key}"相關的商品` }}</div>
          </div>
          <div class="button-wrapper">
            <button class="btn" @click="$router.push('/products')">探索更多商品</button>
          </div>
        </div>
        <div
          v-if="products.length > 0"
          class="col-12 col-md-9 col-lg-10 card-decks-wrapper d-flex flex-column justify-content-center"
          :class="{'only-one': products.length <= numCardsRow}"
        >
          <div class="title">{{ `找到 ${products.length} 件"${$route.query.key}"的商品` }}</div>
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
                <b-popover :target="item.id" triggers="hover focus" placement="right" v-if="windowWidth >= 992" :ref="`popover-${item.id}`">
                  <div class="popper-wrapper">
                    <div class="popper-title">
                        {{ item.title }}
                    </div>
                    <div v-if="!item.options.event">
                      <span class="btn btn-light popper-badge" @click="$router.push(`/search?key=${item.options.subcategory}`)"> {{ item.options.subcategory }} </span>
                    </div>
                    <div v-if="item.options.event">
                      <span class="btn btn-light popper-badge" @click="$router.push(`/search?key=${item.options.subcategory}`)"> {{ item.options.subcategory }} </span>
                      <span
                        v-for="(event, index) in item.options.event.split(' ')"
                        class="btn btn-light popper-badge"
                        :key="`event_${index}`"
                        @click="$router.push(`/search?key=${event}`)"
                      > {{ event }} </span>
                    </div>
                    <div class="popper-content">
                      <div v-html="item.content"></div>
                    </div>
                    <div class="popper-star">
                      <span v-for="(score, index) in item.rating.rate" :class="score" class="star-item" :key="index"></span>
                    </div>
                    <div class="popper-price">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BPopover } from 'bootstrap-vue'
import 'swiper/swiper-bundle.css'
export default {
  name: 'search',
  data () {
    return {
      products: [],
      cart: {},
      randomRating: {
        rate: [],
        count: Number
      },
      windowWidth: window.innerWidth
    }
  },
  components: {
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
      if (this.windowWidth >= 576 && this.windowWidth < 992) {
        return 3
      } else if (this.windowWidth >= 992) {
        return 4
      }
      return 2
    }
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
    getProducts (name) {
      const loader = this.$loading.show({
        container: this.$refs.overlayLoading,
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
          const eventProducts = this.products.filter(item => !(!item.options.event || item.options.event.length === 0))
          this.products = this.products.filter(item =>
            (item.title.includes(this.$route.query.key) ||
            item.options.subcategory.includes(this.$route.query.key))
          )
          this.products.push(...eventProducts.filter(item => item.options.event.split(' ').includes(this.$route.query.key)))
          const noRepeat = [...new Set(this.products.map(item => item.id))]
          this.products = this.products.filter(item => noRepeat.includes(item.id))
          this.products.forEach(item => {
            item.rating = this.rating()
          })
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
        container: this.$refs.overlayLoading,
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
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
.home {
  min-height: calc(100vh - 2rem) !important;
  width: 100%;
  overflow: hidden;
  @media (min-width: 768px) {
    min-height: calc(100vh - 18.5rem) !important;
  }
  .search {
    min-height: calc(100vh - 2rem);
    margin: 5rem auto 2rem auto;
    @media (min-width: 576px) {
      margin-top: 5.5rem;
    }
    @media (min-width: 768px) {
      min-height: calc(100vh - 18.5rem) !important;
      margin: 0 auto;
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
        padding: 2rem;
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
          color: $gray;
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
          .back:hover {
            text-decoration: underline;
            color: #666;
            cursor: pointer;
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
      @media (min-width: 992px) {
        padding-left: 3rem !important;
        padding-right: 3rem !important;
      }
      .router-wrapper {
        margin-bottom: 2rem;
        .router {
          color: $blue;
        }
        @media (min-width: 576px) {
          margin-top: 3rem;
        }
        @media (min-width: 768px) {
          display: none;
        }
      }
      .title {
        margin: 0 1rem 1rem 1rem;
        font-size: 1rem;
        font-weight: 500;
        @media (min-width: 576px) {
          margin-left: 0rem;
        }
        @media (min-width: 992px) {
          font-size: 1.25rem;
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
          padding: 1rem;
        }
        @media (min-width: 880px) {
          padding: 1.5rem 0;
        }
        @media (min-width: 992px) {
          padding: 0rem 0;
        }
        @media (min-width: 1441px) {
          padding: 1rem 0;
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
    .notFound {
      min-height: calc(100vh - 2rem);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 768px) {
        min-height: calc(100vh - 22.5rem);
      }
      .title-wrapper {
        padding-bottom: 2rem;
        .title {
          font-size: 1rem;
          font-weight: 500;
          @media (min-width: 576px) {
            font-size: 1.25rem;
          }
        }
      }
      .button-wrapper {
        .btn {
          border-radius: 0.25rem;
          color: #ffffff;
          background: $navy;
        }
        .btn:hover, .btn:focus, .btn:active:hover {
          background: #919191;
        }
      }
    }
  }
}
.popper-wrapper {
  border-radius: 30%;
  padding: 1.5rem;
  width: 16rem;
  height: 25rem;
  .popper-badge {
    display: inline-block;
    white-space: nowrap;
    font-size: 12px;
    margin: 1px 3px 3px 3px;
    padding: 3px 6px;
    color: #919191;
  }
  .popper-title {
    margin: auto;
    height: 2.5rem;
    line-height: 1.25rem;
    font-size: 1rem;
    font-weight: 700;
    color: $gray;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    visibility: visible;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .popper-star {
    margin: 1rem 0;
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
    margin-top: 1rem;
    min-height: 6.25rem;
    max-height: 6.25rem;
    max-width: 100%;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    visibility: visible;
    -webkit-line-clamp: 5;
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
    background-color: $navy;
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
