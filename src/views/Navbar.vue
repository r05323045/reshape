<template>
  <div class="page-content">
    <div id="nav" class="navbar w-100 p-0 d-flex justify-content-md-center" :class="{'windowTop' : scrollY === 0}">
      <announcement></announcement>
      <div class="nav-header w-100 mx-md-auto flex-row">
        <router-link to="/" class="brand-name">Reshape</router-link>
        <nav class="navbar-expand-md search-expand">
          <div class="search-bar input-group align-items-md-center collapse navbar-collapse" id="searchBar">
            <div class="input-wrapper d-flex flex-row align-items-center">
              <i class="fas fa-search"></i>
              <input type="text" class="form-control" placeholder="重塑你的生活" v-model.lazy="searchKey" @change="$router.push(`/search?key=${searchKey}`)">
              <button class="close" @click="collapseToggle('searchBar')">
                <i class="fa fa-times"></i>
              </button>
            </div>
            <div class="input-group-append">
              <button class="btn" type="button" @click="$router.push(`/search?key=${searchKey}`)">
                搜尋
              </button>
            </div>
            <div class="search-advice">
              <span class="text" @click="$router.push(`/search?key=玻璃杯`)">玻璃杯</span>
              <span class="text" @click="$router.push(`/search?key=夏日嚴選`)">夏日嚴選</span>
              <span class="text" @click="$router.push(`/search?key=免運`)">免運</span>
              <span class="text" @click="$router.push(`/search?key=抒壓小物`)">抒壓小物</span>
              <span class="text" @click="$router.push(`/search?key=工程師必備`)">工程師必備</span>
            </div>
            <div class="collapse-bottom d-md-none" @click="collapseToggle('searchBar')"></div>
          </div>
        </nav>
        <div class="header-right d-flex flex-row">
          <button class="navbar-toggler d-md-none" type="button" data-toggle="collapse" data-target="#searchBar">
            <span><i class="fas fa-search"></i></span>
          </button>
          <button class="fa-wrapper navbar-toggler" type="button" @click="$router.push('/cart')">
            <i class="fas fa-shopping-cart"></i>
            <div class="badge">
              <span class="badge-wrapper" v-if="cart.length">
                {{ cart.length }}
              </span>
            </div>
          </button>
          <button class="navbar-toggler d-md-none" type="button" data-toggle="collapse" data-target="#navbarCategory">
            <span><i class="fas fa-align-justify"></i></span>
          </button>
        </div>
      </div>
      <nav class="navbar-expand-md category-expand">
        <div class="collapse navbar-collapse category-collapse" id="navbarCategory">
          <div class="navbar-navigation w-100 d-flex flex-column flex-md-row mx-md-auto">
            <div class="laptop">
              <router-link to="/category?n=1" class="router-link mr-3">廚房餐桌</router-link>
              <router-link to="/category?n=2" class="router-link mr-3">空間佈置</router-link>
              <router-link to="/category?n=3" class="router-link mr-3">質感生活</router-link>
              <router-link to="/category?n=4" class="router-link mr-3">品味衣著</router-link>
              <router-link to="/products" class="router-link mr-3">所有分類</router-link>
              <router-link to="/" class="router-link mr-3">關於我們</router-link>
            </div>
            <div class="mobile">
              <ul class="list-group section">
                <li class="list-group-item">
                  <router-link to="/" class="router-link mr-3">登入 / 註冊</router-link>
                </li>
              </ul>
              <ul class="list-group section">
                <div class="section-title">
                  <li class="list-group-item">
                    主題活動
                  </li>
                </div>
                <li class="list-group-item" @click="$router.push('/products')">
                  <router-link to="/products" class="router-link mr-3">
                    <span class="badge hot">Hot</span>
                    <span class="text">熱門排行</span>
                  </router-link>
                </li>
                <li class="list-group-item" @click="$router.push('/')">
                  <router-link to="/" class="router-link mr-3">
                    <span class="badge new">New</span>
                    <span class="text">新品上架</span>
                  </router-link>
                </li>
                <li class="list-group-item" @click="$router.push('/')">
                  <router-link to="/" class="router-link mr-3">
                    免運專區
                  </router-link>
                </li>
              </ul>
              <ul class="list-group section">
                <div class="section-title">
                  <li class="list-group-item">
                    商品分類
                  </li>
                </div>
                <li class="list-group-item" @click="$router.push('/category?n=1')">
                  <i class="fas fa-utensils"></i>
                  <router-link to="/category?n=1" class="router-link mr-3">
                    廚房餐桌
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
                <li class="list-group-item" @click="$router.push('/category?n=2')">
                  <i class="fas fa-couch"></i>
                  <router-link to="/category?n=2" class="router-link mr-3">
                    空間佈置
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
                <li class="list-group-item" @click="$router.push('/category?n=3')">
                  <i class="fas fa-laptop-house"></i>
                  <router-link to="/category?n=3" class="router-link mr-3">
                    質感生活
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
                <li class="list-group-item" @click="$router.push('/category?n=4')">
                  <i class="fas fa-tshirt"></i>
                  <router-link to="/category?n=4" class="router-link mr-3">
                    品味衣著
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
                <li class="list-group-item" @click="$router.push('/category?n=5')">
                  <i class="fas fa-pencil-ruler"></i>
                  <router-link to="/category?n=5" class="router-link mr-3">
                    文具小物
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
                <li class="list-group-item" @click="$router.push('/category?n=6')">
                  <i class="fas fa-cocktail"></i>
                  <router-link to="/category?n=6" class="router-link mr-3">
                    食品飲料
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
                <li class="list-group-item" @click="$router.push('/category?n=7')">
                  <i class="fas fa-hiking"></i>
                  <router-link to="/category?n=7" class="router-link mr-3">
                    戶外休閒
                  </router-link>
                  <i class="fas fa-angle-right"></i>
                </li>
              </ul>
              <ul class="list-group section">
                <div class="section-title">
                  <li class="list-group-item">
                      關於我們
                  </li>
                </div>
                <li class="list-group-item" @click="$router.push('/')">
                  <router-link to="/" class="router-link mr-3">品牌故事</router-link>
                </li>
                <li class="list-group-item" @click="$router.push('/')">
                  <router-link to="/" class="router-link mr-3">作者</router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="collapse-right d-md-none" @click="collapseToggle('navbarCategory')"></div>
        </div>
      </nav>
    </div>
    <router-view></router-view>
    <footer class="w-100 d-flex flex-column justify-content-center align-items-center">
      <div>
        <div class="brand-name">
          <span class="title" @click="$router.push('/')">Reshape </span>
          <span class="text">| Reshape Your Life</span>
        </div>
        <div>
          <p>© 2020 Reshape. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import announcement from '@/views/Announcement.vue'
import $ from 'jquery'
export default {
  name: 'Navbar',
  data () {
    return {
      cart: {},
      scrollY: 0,
      searchKey: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  components: {
    announcement
  },
  created () {
    this.getCart()
    this.$bus.$on('cartUpdate', event => {
      this.cart = event.cart
    })
  },
  watch: {
    $route () {
      $('#navbarCategory').collapse('hide')
      $('#searchBar').collapse('hide')
      this.searchKey = ''
    }
  },
  methods: {
    getCart (loader) {
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data
          this.$bus.$emit('cartUpdate', {
            cart: this.cart
          })
          if (loader) {
            loader.hide()
          }
        })
    },
    collapseToggle (id) {
      $(`#${id}`).collapse('toggle')
    },
    onScroll (e) {
      this.scrollY = window.top.scrollY
    }
  }
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap');
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
$light-gray: #a8a8ab;
.page-content {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  min-height: calc(100% + 5rem);
  *:focus {
    outline: none !important
  }
}
.navbar.windowTop {
  height: 3.5rem;
  @media (min-width: 576px) {
    height: 6rem;
  }
  @media (min-width: 768px) {
    height: 10.5rem;
  }
  .nav-header {
    @media (min-width: 576px) {
      margin-top: 2.5rem;
    }
    .search-expand {
      .search-bar {
        @media (min-width: 576px) {
          top: 2.5rem;
        }
        @media (min-width: 768px) {
          top: 30%;
        }
        .input-wrapper {
          height: 3.5rem;
          @media (min-width: 768px) {
            height: 2.5rem;
            padding: 0;
          }
        }
      }
    }
  }
}
#nav {
  a {
    font-weight: 400;
  }
}
.navbar {
  position: fixed !important;
  background: #ffffff;
  height: 3.5rem;
  z-index: 999;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: 768px) {
    height: 10.5em;
    position: static !important;
  }
  .nav-header {
    margin: 0 1rem;
    margin-top: 0;
    height: 3.5rem;
    position : relative;
    display: flex;
    align-items: center;
    @media (min-width: 768px) {
      margin: 2rem 2rem 1rem 2rem !important;
      height: 2rem;
      max-width: 768px;
    }
    @media (min-width: 1200px) {
      max-width: 992px;
    }
    @media (min-width: 1441px) {
      max-width: 1200px;
    }
    .brand-name {
      font-size: 1.5rem;
      font-family: 'Comfortaa', cursive;
      color: $navy !important;
      @media (min-width: 768px) {
        height: 3rem;
        margin-right: 3rem;
        position: absolute;
        top: 30%;
        font-size: 2rem;
      }
    }
    .brand-name:hover {
      text-decoration: none;
    }
    .search-expand {
      .search-bar {
        transition: all 0.4s ease-in-out;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1001;
        align-items: flex-start;
        @media (min-width: 768px) {
          width: 20rem;
          position: absolute;
          left: 10rem;
          top: 30%;
          height: 3rem;
        }
        .input-wrapper {
          background: #ffffff;
          height: 3.5rem;
          padding: 0 1.5rem;
          width: 100%;
          @media (min-width: 768px) {
            height: auto;
            width: 16rem;
            padding: 0;
          }
          .fa-search {
            margin-right: 0.5rem;
            color: #666;
            @media (min-width: 768px) {
              display: none;
            }
          }
          .form-control {
            height: 2rem;
            font-size: 0.9rem;
            border: none;
            border-bottom: 1px solid #d3d3d5;
            padding: 0;
            margin: 0 0.5rem;
            border-radius: 0;
            @media (min-width: 768px) {
              padding: 0.375rem 0.75rem;
              height: 2rem;
              font-size: 0.8rem;
              border: 1px solid #d3d3d5;
              outline: none;
              margin: 0;
            }
          }
          .form-control:focus {
            border-color: #d3d3d5;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            outline: none !important;
          }
          .close {
            outline: none;
            .fa-times {
              font-size: 1rem;
              @media (min-width: 768px) {
                display: none;
              }
            }
          }
        }
        .btn {
          display: none;
          @media (min-width: 768px) {
            display: inline;
            height: 2rem;
            background: $navy;
            font-size: 0.8rem;
            color: #ffffff;
          }
        }
        .search-advice {
          display: none;
          @media (min-width: 768px) {
            display: block;
            position: absolute;
            bottom: -1rem;
            font-size: 0.6rem;
            .text{
              margin-left: 0.5rem;
              color: $gray;
            }
            .text:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
        .collapse-bottom {
          transition: all 0.4s ease;
          position: absolute;
          top: 3.5rem;
          background: #666;
          display: inline-block;
          min-height: 100%;
          width: 100%;
          opacity: 0.8;
        }
      }
    }
    .header-right {
      justify-content: flex-end;
      width: 100%;
      @media (min-width: 768px) {
        height: 2rem;
        width: 10rem;
        position: absolute;
        top: 50%;
        right: 0;
      }
      .text {
        line-height: 33px;
        vertical-align: middle;
        font-size: 0.9rem;
      }
      .badge {
        top: 0.5rem;
        right: 2.5rem;
        position: absolute;
        @media (min-width: 768px) {
          top: -0.25rem;
          right: 0;
        }
        .badge-wrapper {
          display: inline-block;
          background-color: #f16c5d;
          color: #ffffff;
          border-radius: 50%;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          vertical-align: middle;
        }
      }
      .fa-wrapper {
        background: none;
        border: none;
        .fa-shopping-cart {
          font-size: 1rem;
          path {
            fill: #ffffff;
            stroke: #666;
            stroke-width: 3rem;
          }
        }
      }
      .fa-search {
        font-size: 1rem;
        path {
          fill: #666;
        }
      }
      .navbar-toggler {
        margin: 0;
        font-size: 1rem;
        path {
          fill: #666;
        }
      }
    }
  }
  .category-expand {
    z-index: 2;
    padding: 0;
    width: 100%;
    max-width: 1200px;
    .category-collapse {
      z-index: 3;
      width: 100%;
      transition: all 0.4s ease;
      position: fixed;
      top: 0;
      height: 100%;
      z-index: 1000;
      @media (min-width: 768px) {
        position: static !important;
        z-index: 1;
        max-width: 768px;
        margin: auto;
        padding: 0 2rem;
      }
      @media (min-width: 1200px) {
        max-width: 992px;
        margin: auto;
      }
      @media (min-width: 1441px) {
        max-width: 1200px;
        margin: auto;
      }
      .collapse-right {
        position: absolute;
        right: -100%;
        top: 0;
        background: #666;
        display: inline-block;
        min-height: 100%;
        width: 100%;
        opacity: 0.8;
      }
      .navbar-navigation {
        height: 100%;
        background: #ffffff;
        overflow-y: scroll;
        overflow-x: hidden;
        @media (min-width: 768px) {
          max-width: 768px;
          position: static !important;
          margin: 1.5rem 3rem 0.5rem 3rem;
        }
        @media (min-width: 1200px) {
          max-width: 992px;
        }
        @media (min-width: 1441px) {
          max-width: 1200px;
        }
        .laptop {
          display: none;
          @media (min-width: 768px) {
            display: flex;
            width: 100%;
            justify-content: space-between;
          }
          .router-link {
            @media (min-width: 768px) {
              font-weight: 700 !important;
              font-size: 0.9rem;
              color: $gray !important;
            }
          }
        }
        .mobile {
          @media (min-width: 768px) {
            display: none;
          }
          .section {
            .section-title {
              font-weight: 500;
              width: 100%;
              background-color: #f7f7f7;
              padding-left: 1rem;
              .list-group-item {
                margin-left: 0;
                background-color: #f7f7f7;
              }
            }
            .list-group-item {
              margin-left: 1rem;
              border: 0 none;
              font-size: 1rem;
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
              .fa-angle-right {
                position: absolute;
                height: 33%;
                top: 33%;
                right: 2rem;
                path {
                  fill: $gray;
                  stroke: $gray;
                  stroke-width: 0;
                }
              }
              .router-link {
                color: $gray !important;
                font-weight: 100;
                position: relative;
                .badge {
                  background: $navy;
                  color: #ffffff;
                  width: 2.5rem;
                  position: absolute;
                  top: 0;
                }
                .text {
                  margin-left: 3rem;
                }
              }
            }
            .list-group-item:hover {
              .router-link {
                color: $pink !important;
                font-weight: 100;
                text-decoration: none;
              }
              .svg-inline--fa {
                path {
                  stroke: $pink;
                  fill: $pink;
                }
              }
            }
          }
        }
      }
    }
    .category-collapse.collapsing {
      min-height: 100%;
      margin-right: 50%;
      right: 50%;
      transition: all 0.4s ease;
    }
    .category-collapse.show {
      width: 80%;
      transition: all 0.4s ease;
      height: 100%;
      right: 0;
      margin-right: 20%;
    }
  }
}
footer {
  margin-top: 3rem;
  height: 5rem;
  background-color: #f7f7f8;
  .brand-name {
    line-height: 2rem;
    margin-bottom: 0;
    vertical-align: middle;
    height: 2rem;
    .title {
      font-size: 1rem;
      font-family: 'Comfortaa', cursive;
      color: $navy;
      font-weight: 500;
      cursor: pointer;
    }
    .text {
      color: #666;
      font-size: 0.8rem;
      font-weight: 400;
    }
  }
  p {
    font-size: 0.8rem;
    font-weight: 400;
    height: 2rem;
    line-height: 2rem;
    margin-bottom: 0;
    vertical-align: middle;
    font-family: initial;
  }
}
</style>
