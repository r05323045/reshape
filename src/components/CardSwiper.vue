<template>
  <div class="card-section">
    <div class="title">{{ title }}</div>
    <div class="swiper-container-wrapper">
      <div class="swiper-container card-swiper-container">
        <div class="swiper-wrapper">
          <div v-for="item in products.slice(0, 10)" class="swiper-slide" :key="`silder-${item.id}`">
            <div class="card">
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
      slidesPerView: 5,
      spaceBetween: 30,
      slidesPerGroup: 5,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next.card-swiper-button-next',
        prevEl: '.swiper-button-prev.card-swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
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
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }
  .swiper-container-wrapper {
    background: #ffffff;
    .card-swiper-container {
      width: 100%;
      height: 20rem;
      padding: 0 1rem;
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
          width: 60%;
          max-width: 720px;
          .card {
            border: none;
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
                text-align: start;
                width: 100%;
                flex-grow: 3;
                font-size: 16px;
                font-weight: 700;
                color: $gray;
                margin-bottom: 15px;
              }
              .price-wrapper {
                text-align: start;
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
        }
      }
      .swiper-button-prev,
      .swiper-button-next {
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
        transform: scale(1.25) translateY(-1rem);
        opacity: 1;
        box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.3);
      }
      .swiper-button-prev {
        top: 40%;
        left: 0.35rem;
      }
      .swiper-button-next {
        right: 0.35rem;
        top: 40%;
      }
      .swiper-pagination {
        position: absolute;
        width: 100px;
        height: 50px;
        top: -2rem;
        left: 92%;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
