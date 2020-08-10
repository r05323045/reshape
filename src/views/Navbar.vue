<template>
  <div>
    <div id="nav" class="navbar fixed-top w-100 p-0" :class="{'not-top': scrollY > 0}">
      <announcement></announcement>
      <div class="navbar-inside w-100 mx-auto d-flex flex-row justify-content-end" :class="{'not-top-inside': scrollY > 0}">
        <router-link to="/admin/" class="mr-3">後台列表</router-link>
        <router-link to="/cart">
        <div class="d-flex align-items-center nav-shopping-cart-wrapper">
          <div class="badge">
            <span class="badge-wrapper" v-if="cart.length">
              {{ cart.length }}
            </span>
          </div>
          <div class="fa-wrapper">
            <i class="fas fa-shopping-cart"></i>
          </div>
        </div>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import announcement from '@/views/Announcement.vue'
export default {
  name: 'Navbar',
  data () {
    return {
      scrollY: 0
    }
  },
  mounted () {
    const that = this
    window.addEventListener('scroll', function () {
      that.scrollY = window.scrollY
    })
  },
  components: {
    announcement
  },
  props: {
    cart: {}
  }
}
</script>
<style lang="scss">
.navbar {
  z-index: 999;
  background-color: #ffffff;
  height: 7rem;
  border-bottom: 1px solid #a8a8ab;
  .navbar-inside {
    margin-top: 2rem;
    max-width: 1140px;
    a {
      line-height: 33px;
      vertical-align: middle;
    }
    .nav-shopping-cart-wrapper {
      cursor: pointer;
      width: 45px;
      position: relative;
      .badge-wrapper {
        top: -5px;
        right: -5px;
        position: absolute;
        display: inline-block;
        background-color: #f16c5d;
        color: #ffffff;
        border-radius: 50%;
        padding: 3px;
        width: 20px;
        height: 18px;
      }
      .fa-wrapper {
        vertical-align: middle;
        font-size: 22px;
        .fa-shopping-cart {
          path {
            fill: #ffffff;
            stroke: #000000;
            stroke-width: 10px;
          }
        }
      }
    }
    .btn-login {
      margin-right: 30px;
      border: 1px solid #a8a8ab;
      border-radius: 5px;
      padding: 8px 10px;
      font-size: 14px;
    }
  }
}
.not-top {
  height: 5rem;
  .not-top-inside {
    margin-top: 0rem;
  }
}
</style>
