<template>
  <div >
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in products.slice(0, 5)"
          class="swiper-slide"
          :key="`top-5-swiper-${item.id}`"
          :style="`background: url(${item.imageUrl[0]}) no-repeat center/contain;`"
          @click="$router.push(`/product/${item.id}`)"
        >
          <div class="title">
            <div class="rank">{{ `0${index + 1} |`}}</div>
            <div class="name">{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
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
    products: Array
  },
  mounted () {
    // eslint-disable-next-line no-unused-vars
    const mySwiper = new Swiper('.swiper-container', {
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
  }
}
</script>

<style lang="scss">
$pink: #ee847d;
$navy: #10567b;
$blue: #2e90b7;
$gray: #39393e;
$light-gray: #a8a8ab;
.swiper-container {
  width: 100%;
  height: 20rem;
  position: relative;
  @media (min-width: 414px) {
    height: 25rem;
  }
  .swiper-wrapper {
    .swiper-slide:hover {
      -webkit-filter: opacity(0.8)
    }
    .swiper-slide {
      cursor: pointer;
      position: relative;
      .title {
        background: #ffffff;
        opacity: 0.8;
        padding: 1rem;
        position: absolute;
        top: 20%;
        left: 20%;
        max-width: 80%;
        @media (min-width: 576px) {
          left: 10%;
        }
        .rank {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          font-weight: 500;
          @media (min-width: 992px) {
            font-size: 1.25rem;
          }
        }
        .name {
          font-weight: 500;
          font-size: 0.9rem;
          @media (min-width: 992px) {
            font-size: 1rem;
          }
        }
      }
    }
  }
  .swiper-pagination {
    display: none;
    @media (min-width: 576px) {
      display: inline-block;
    }
    .swiper-pagination-bullet {
      width: 0.8rem;
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.8rem;
      color:#000;
      opacity: 1;
      background: rgba(0,0,0,0.2);
      @media (min-width: 992px) {
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.8rem;
      }
    }
    .swiper-pagination-bullet-active {
      color:#fff;
      background: $navy;
    }
  }
}
</style>
