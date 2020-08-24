<template>
  <div class="homepage-wrapper">
    <div class="homepage">
      <div class="swiper-container-wrapper">
        <div class="swiper-container jumbo-swiper-container">
          <div class="swiper-wrapper">
            <div v-for="i in 3" class="swiper-slide" :key="`silder-${i}`">
              <img class="w-100" src='https://images.unsplash.com/photo-1558661092-f9ad8c1c63c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div v-if="products.length > 0">
        <div class="section-wrapper">
          <cardSwiper title="編輯嚴選" :products="products.slice(0, 10)"></cardSwiper>
        </div>
        <div class="section-wrapper">
          <cardSwiper title="最近熱門" :products="products.slice(5, 20)"></cardSwiper>
        </div>
        <div class="section-wrapper">
          <cardSwiper title="限時免運" :products="products.slice(15, 25)"></cardSwiper>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cardSwiper from '@/components/CardSwiper'
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
export default {
  data () {
    return {
      products: [],
      cart: {},
      mySwiper: {}
    }
  },
  created () {
    this.getProducts()
    this.getCart()
    this.$bus.$on('cartUpdate', event => {
      this.cart = event.cart
    })
  },
  components: {
    cardSwiper
  },
  mounted () {
    this.getSwiper()
  },
  methods: {
    getSwiper () {
      this.mySwiper = new Swiper('.jumbo-swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: '3%',
        centeredSlides: true,
        loop: true,
        speed: 800,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    getProducts () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
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
    }
  }
}
</script>
<style lang="scss">
.homepage{
  overflow: hidden;
  .swiper-container-wrapper {
    margin-top: 5rem;
    margin-bottom: 2rem;
    @media (min-width: 768px) {
      margin-top: 0;
    }
    .jumbo-swiper-container {
      height: auto !important;
      width: 100%;
      overflow: hidden;
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        -webkit-filter: opacity(.2);
        @media (min-width: 768px) {
          width: 80%;
          max-width: 720px;
        }
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
        }
      }
      .swiper-slide-active,
      .swiper-slide-duplicate-active {
        width: 90%;
        -webkit-filter: opacity(1);
        @media (min-width: 768px) {
          width: 80%;
          max-width: 720px;
        }
        .swiper-button-prev,
        .swiper-button-next {
          display: none;
          @media (min-width: 768px) {
            display: inline-block;
            transform: translate(0,-50%);
            box-shadow: -1px 1px 2px 0 rgba(0,0,0,0.1);
            height: 4rem;
            width: 2rem;
            background: #fff;
            opacity: 0.8;
            border-radius: 0.5rem;
          }
        }
        .swiper-button-prev:after,
        .swiper-button-next:after {
          vertical-align: middle;
          font-size: 2rem;
          line-height: 4rem;
          color: #39393e;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          opacity: 1;
          transform: scale(1.1) translateY(-1.6rem)
        }
        .swiper-button-prev {
          left: -1.5rem;
        }
        .swiper-button-next {
          right: -1.5rem;
        }
      }
      .swiper-pagination {
        left: 0%;
      }
      .swiper-pagination-bullet {
        display: none;
        @media (min-width: 768px) {
          width: 8px;
          height: 8px;
        }
      }
    }
  }
  .section-wrapper {
    margin: auto;
    margin-top: 1rem;
    height: 100%;
    overflow: visible;
    width: 100vw;
    max-width: 1200px;
  }
}
</style>
