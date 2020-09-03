<template>
  <div class="homepage-wrapper">
    <div class="homepage">
      <div class="swiper-container-wrapper">
        <div class="swiper-container jumbo-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img
                class="w-100"
                @click="$router.push('/search?key=夏日嚴選')"
                src='https://hexschool-api.s3.us-west-2.amazonaws.com/custom/0MmTvxlbN47F1yN0PnduoTF7jPCkuqu8dwQawndwEY1PQ2zH1h65BO9dcFVw0jbNTvtwNz9ZdHupme1BkF5VAkJ2rhnGlQKlp0lcoyFK0tTfEs3lb740c3rFUdtWHTv7.png'
              >
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <div class="swiper-slide">
              <img
                class="w-100"
                @click="$router.push('/category?n=2')"
                src='https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zt5Ebl4HCveSAbLyggmF4wf8B0P8J2KctMp01huq1FHajKSLh3TpjmFjnTsVtZb2SbaTUWuHtGOElxjbFiN4pqNEOIu4HOOp4EYbSjJdqR275aBoTuvxaifDDau4i1FK.png'
              >
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
            </div>
            <div class="swiper-slide">
              <img
                class="w-100"
                src='https://hexschool-api.s3.us-west-2.amazonaws.com/custom/lOz7ks7pLTf5u3btisI2SXHHLDddIS68RXjNplzUQTFcJQEuFDCnLRNY3YOO5Y5C2ks6HvWwQIxXozUKED7QCFxFVsdkkn99zOCpejH8tAAIdRFUC7bDFDTIAN5V7rx0.png'
                @click="$router.push('/category?n=4')"
              >
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
          <cardSwiper title="編輯精選" :products="eventProducts.filter(item => item.options.event.split(' ').includes('編輯精選'))" :cart="cart"></cardSwiper>
        </div>
        <div class="section-wrapper">
          <cardSwiper title="最近熱門" :products="eventProducts.filter(item => item.options.event.split(' ').includes('本月熱門'))" :cart="cart"></cardSwiper>
        </div>
        <div class="section-wrapper">
          <cardSwiper title="限時免運" :products="eventProducts.filter(item => item.options.event.split(' ').includes('免運'))" :cart="cart"></cardSwiper>
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
      eventProducts: [],
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
        spaceBetween: '1%',
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
      }, { default: this.$createElement('MyLoading') })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`
      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data
          this.eventProducts = this.products.filter(item => !(!item.options.event || item.options.event.length === 0))
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
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
$light-gray: #a8a8ab;
.homepage{
  overflow: hidden;
  .swiper-container-wrapper {
    margin-top: 3.5rem;
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
        cursor: pointer;
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
            z-index: 2;
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
          color: $gray;
        }
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          opacity: 1;
          transform: scale(1.1) translateY(-1.6rem)
        }
        .swiper-button-prev:focus,
        .swiper-button-next:focus {
          outline: none;
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
