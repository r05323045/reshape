<template>
  <div class="card-section">
    <div class="title">{{ title }}</div>
    <div class="swiper-container-wrapper">
      <div class="swiper-container card-swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="item in products.slice(0, 10)"
            class="swiper-slide"
            :key="`silder-${item.id}`"
            @click="$router.push(`/product/${item.id}`)"
           >
            <div class="card">
              <div class="img-wrapper">
                <div :style="`background: url(${item.imageUrl[0]}) no-repeat center/contain;`" class="card-img-top"></div>
              </div>
              <div class="discount-badge" v-show="0.85 > item.price/item.origin_price">{{ `${(item.price/item.origin_price).toFixed(1) * 10} 折` }}
              </div>
              <div class="card-body">
                <div class="card-content">
                  <p class="card-title">{{ item.title }}</p>
                  <div class="price-wrapper">
                    <span class="price">{{ item.price | priceFormat }}</span>
                    <span class="original-price" v-show="item.origin_price > item.price">{{ item.origin_price | priceFormat }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next card-swiper-button-next"></div>
        <div class="swiper-button-prev card-swiper-button-prev"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.js'
import 'swiper/swiper-bundle.css'
export default {
  data () {
    return {}
  },
  props: {
    title: String,
    products: Array
  },
  mounted () {
    // eslint-disable-next-line no-unused-vars
    const cardSwiper = new Swiper('.swiper-container.card-swiper-container', {
      slidesPerView: 2.1,
      spaceBetween: '3%',
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next.card-swiper-button-next',
        prevEl: '.swiper-button-prev.card-swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },
      breakpoints: {
        375: {
          slidesPerView: 2.5,
          spaceBetween: '15%',
          slidesPerGroup: 1
        },
        576: {
          slidesPerView: 3.1,
          spaceBetween: '15%',
          slidesPerGroup: 1
        },
        768: {
          slidesPerView: 3.5,
          spaceBetween: '15%'
        },
        834: {
          slidesPerView: 3.8,
          spaceBetween: '15%'
        },
        900: {
          slidesPerView: 4.1,
          spaceBetween: '15%'
        },
        992: {
          slidesPerView: 4.5,
          spaceBetween: '15%'
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: '18%',
          slidesPerGroup: 5
        }
      }
    })
  }
}
</script>
<style lang="scss">
$pink: #ee847d;
$navy: #10567b;
$blue: #2e90b7;
$gray: #39393e;
$light-gray: #a8a8ab;
.card-section{
  overflow: hidden;
  .title {
    margin: 1rem;
    font-size: 1.25rem;
    font-weight: 500;
    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }
  .swiper-container-wrapper {
    background: #ffffff;
    margin-top: 2rem !important;
    .card-swiper-container {
      width: 100%;
      padding: 0 1rem 0 1rem;
      position: relative;
      overflow: visible;
      .swiper-wrapper {
        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          .card {
            border: none;
            width: 100%;
            height: 18rem;
            cursor: pointer;
            @media (min-width: 376px) {
              height: 20rem;
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
                  text-align: start;
                  font-size: 0.9rem;
                  font-weight: 700;
                  color: $gray;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  visibility: visible;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  @media (min-width: 576px) {
                    overflow: default;
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
                    @media (min-width: 576px) {
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
                    @media (min-width: 576px) {
                      width: auto;
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .swiper-button-prev,
      .swiper-button-next {
        display: none;
        @media (min-width: 768px) {
          display: inline-block;
          transform: translate(0,-50%);
          box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          text-align: center;
          background: #ffffff;
          opacity: 0.8;
          transition: 0.25s ease-in-out;
        }
      }
      .swiper-button-prev:after,
      .swiper-button-next:after {
        vertical-align: middle;
        text-align: center;
        font-size: 1rem;
        line-height: 2rem;
        color: #39393e;
      }
      .swiper-button-prev:hover,
      .swiper-button-next:hover {
        transform: scale(1.2) translateY(-1rem);
        opacity: 1;
        box-shadow: 1px 1px 2px 0.5px rgba(0,0,0,0.3);
      }
      .swiper-button-prev {
        top: 45%;
        left: 0.3rem;
      }
      .swiper-button-next {
        right: 0.3rem;
        top: 45%;
      }
      .swiper-pagination {
        display: none;
        @media (min-width: 1200px) {
          display: block;
          position: absolute;
          width: 100px;
          height: 50px;
          top: -2rem;
          left: 92%;
          font-size: 0.8rem;
          padding-right: 1rem;
        }
      }
    }
  }
}
</style>
