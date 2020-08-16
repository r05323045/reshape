<template>
  <div>
    <div id="nav" class="navbar w-100 p-0 d-flex justify-content-center">
      <announcement></announcement>
      <div class="nav-header w-100 mx-auto flex-row">
        <router-link to="/" class="mr-3 brand-name">Reshape</router-link>
        <div class="search-bar input-group align-items-center">
          <input type="text" class="form-control" placeholder="重塑你的生活">
          <div class="input-group-append">
            <button class="btn" type="button">
              搜尋
            </button>
          </div>
          <div class="search-advice">
            <span class="text">玻璃杯</span>
            <span class="text">夏日嚴選</span>
            <span class="text">免運</span>
            <span class="text">抒壓小物</span>
            <span class="text">工程師必備</span>
          </div>
        </div>
        <div class="header-right d-flex flex-row justify-content-center align-items-center">
          <router-link class="text mr-3" to="/admin/">後台列表</router-link>
          <router-link class="icon" to="/cart">
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
      <div class="navbar-navigation w-100 mx-auto d-flex flex-row justify-content-between">
        <router-link to="/" class="mr-3">廚房餐桌</router-link>
        <router-link to="/" class="mr-3">空間佈置</router-link>
        <router-link to="/" class="mr-3">質感生活</router-link>
        <router-link to="/" class="mr-3">品味衣著</router-link>
        <router-link to="/products" class="mr-3">所有分類</router-link>
        <router-link to="/" class="mr-3">關於我們</router-link>
      </div>
    </div>
    <router-view></router-view>
    <footer class="mt-5 w-100 d-flex justify-content-center align-items-center">
      <p>© 2020-2020 vue-cli-try · <a class="fab fa-github" href="https://github.com/r05323045/vue_cli_try"></a></p>
    </footer>
  </div>
</template>

<script>
import announcement from '@/views/Announcement.vue'
export default {
  name: 'Navbar',
  data () {
    return {
      cart: {}
    }
  },
  components: {
    announcement
  },
  created () {
    this.getCart()
  },
  methods: {
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
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #a8a8ab;
  height: 11rem;
  .nav-header {
    margin: 2rem 2rem 0rem 2rem !important;
    max-width: 1140px;
    height: 2rem;
    position : relative;
    .brand-name {
      height: 3rem;
      position: absolute;
      top: 30%;
      font-size: 2rem;
      font-family: 'Comfortaa', cursive;
      color: #10567b !important;
    }
    .brand-name:hover {
      text-decoration: none;
    }
    .search-bar {
      width: 20rem;
      position: absolute;
      left: 10rem;
      top: 30%;
      height: 3rem;
      .form-control {
        height: 2rem;
        font-size: 0.8rem;
        border: 1px solid #d3d3d5;
        outline: none;
      }
      .form-control:focus {
        border-color: #d3d3d5;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        outline: none !important;
      }
      .btn {
        height: 2rem;
        background: #10567b;
        font-size: 0.8rem;
        color: #ffffff;
      }
      .search-advice {
        position: absolute;
        bottom: -1rem;
        font-size: 0.6rem;
        .text{
          margin-left: 0.5rem;
          color: #39393e;
        }
        .text:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .header-right {
      height: 2rem;
      width: 10rem;
      position: absolute;
      top: 50%;
      right: 0;
      .text {
        line-height: 33px;
        vertical-align: middle;
        font-size: 0.9rem;
      }
      .icon {
        line-height: 33px;
        vertical-align: middle;
      }
      .nav-shopping-cart-wrapper {
        cursor: pointer;
        width: 45px;
        position: relative;
        .badge-wrapper {
          top: -2px;
          right: -2px;
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
          font-size: 18px;
          .fa-shopping-cart {
            path {
              fill: #ffffff;
              stroke: #000000;
              stroke-width: 18px;
            }
          }
        }
      }
    }
  }
  .navbar-navigation {
    padding: 1rem 4rem 0 4rem;
    max-width: 1140px;
    margin: 2.5rem 0 0.5rem 0;
    a {
      font-size: 0.9rem;
      color: #39393e !important;
    }
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
