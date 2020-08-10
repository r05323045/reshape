<template>
  <div class="dashboard">
    <div class="d-flex">
      <div class="sidebar-wrapper">
        <div class="sidebar-heading text-align-center">
          <div class="logo"></div>
        </div>
        <div class="list-group">
          <router-link to="/admin/" class="list-group-item">首頁</router-link>
          <router-link to="/admin/products" class="list-group-item">產品列表</router-link>
          <router-link to="/admin/orders" class="list-group-item">訂單列表</router-link>
          <router-link to="/admin/coupons" class="list-group-item">優惠券列表</router-link>
          <router-link to="/admin/storages" class="list-group-item">圖片列表</router-link>
        </div>
      </div>
      <div class="content-wrapper">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0 mr-5">
              <li class="nav-item">
                <router-link to="/" class="nav-link">回到前台</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="signout">登出</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="router-view-wrapper">
          <div class="report-wrapper" v-if="this.$route.path === '/admin/'">
            <loading :active.sync="isLoading" loader="bars" :is-full-page="false" :opacity="1" background-color="#e5e5e5"></loading>
            <div class="report d-flex flex-column justify-content-center">
              <div class="row">
                <div class="report-item overview">
                  <div class="section">
                    <div class="title">總營收</div>
                    <div class="content">{{ totalEarning | priceFormat }}</div>
                  </div>
                  <div class="section">
                    <div class="title">銷貨數量</div>
                    <div class="content">{{ productsNum }} <span class="unit">件</span></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="report-item">
                  <div class="title">
                    付款情形
                  </div>
                  <div class="diagram d-flex justify-content-center align-items-center">
                    <pie-chart :donut="true" :data="paidStatus" :colors="['#00b5e9', '#fa4251']"></pie-chart>
                  </div>
                </div>
                <div class="report-item">
                  <div class="title">
                    營業收入
                  </div>
                  <div class="diagram d-flex justify-content-center align-items-center" v-if="earning">
                    <area-chart class="chart" :data="earning" :colors="['#63c76a']"></area-chart>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="report-item">
                  <div class="title">
                    訂單數量
                  </div>
                  <div class="diagram d-flex justify-content-center align-items-center" v-if="ordersNum">
                    <area-chart class="chart" :data="ordersNum" :colors="['#3f5efb']"></area-chart>
                  </div>
                </div>
                <div class="report-item">
                  <div class="title">
                    支付來源
                  </div>
                  <div class="diagram d-flex justify-content-center align-items-center" v-if="paidBy">
                    <column-chart :data="paidBy" :colors="['#a8a8ab']"></column-chart>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <router-view :token="token" v-if="checkSuccess"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: 'Dashboard',
  data () {
    return {
      token: '',
      checkSuccess: false,
      isLoading: false,
      orders: [],
      ordersNum: {},
      productsNum: 0,
      earning: {},
      paidStatus: {},
      paidBy: []
    }
  },
  computed: {
    totalEarning: function () {
      if (this.earning) {
        return Math.round(Object.values(this.earning).reduce((acc, cur) => acc + cur, 0))
      }
      return 0
    }
  },
  created () {
    this.checkLogin()
    this.getOrders()
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      // Axios 預設值
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}api/auth/check`
      // eslint-disable-next-line
      this.$http.post(api, { 'api_token': this.token }).then((response) => {
        // 登入沒有問題
        if (response.data.success) {
          this.checkSuccess = true
        }
      }).catch((res) => {
        // 驗證失敗，轉回登入頁
        console.log(res)
        this.$router.push('/login')
      })
    },
    signout () {
      document.cookie = 'hexToken=;expires=;'
      console.log('token 已清除')
      this.$router.push('/login')
    },
    getOrders () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders`
      this.$http.get(api).then((response) => {
        this.orders = response.data.data
        this.draw()
        this.isLoading = false
      })
    },
    draw () {
      const ordersData = {}
      const earningData = {}
      const paidData = { paid: 0, unpaid: 0 }
      const paymentData = {}
      this.orders.forEach(item => {
        const dateString = item.created.datetime.slice(0, 10)
        if (!(dateString in ordersData)) {
          ordersData[dateString] = 1
          earningData[dateString] = item.amount
        } else {
          ordersData[dateString] += 1
          earningData[dateString] += item.amount
        }
        if (item.paid) {
          paidData.paid += 1
        } else {
          paidData.unpaid += 1
        }
        if (!(item.payment in paymentData)) {
          paymentData[item.payment] = 1
        } else {
          paymentData[item.payment] += 1
        }
        item.products.forEach(product => {
          this.productsNum += product.quantity
        })
      })
      this.ordersNum = ordersData
      this.earning = earningData
      this.paidStatus = paidData
      this.paidBy = paymentData
    }
  }
}
</script>
<style lang="scss">
.dashboard {
  height: 100vh;
  width: 100vw;
  .sidebar-wrapper {
    width: 15rem;
    text-align: center;
    min-height: 100vh;
    transition: margin .25s ease-out;
    background: #ffffff;
    .sidebar-heading {
      height: 80px;
      line-height: 80px;
      vertical-align: middle;
      padding: 14px 14px;
      font-size: 1.2rem;
      background: #f5f5f5;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      .logo {
        background: url(https://vuejs.org/images/logo.png);
        background-size: contain;
        background-repeat: no-repeat;
        height: 52px;
        width: 52px;
        margin: auto;
      }
    }
    .list-group {
      margin: 20px auto;
      width: 15rem;
      .list-group-item {
        border: 0 none;
        background: #ffffff;
        color: #555;
      }
    }
  }
  .content-wrapper {
    width: 100%;
    .navbar {
      height: 80px;
      background: #f5f5f5;
      .nav-item {
        cursor: pointer;
        .nav-link {
          color: #555;
        }
        .nav-link:hover {
          text-decoration: underline;
        }
      }
    }
    .router-view-wrapper {
      background: #e5e5e5;
      width: 100%;
      height: 100%;
    }
  }
}
.report-wrapper {
  margin: auto;
  position: relative;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  padding: 50px;
  .report-item {
    margin: 1rem;
    width: 30rem;
    height: 25rem;
    background: #ffffff;
    border-radius: 2rem;
    padding: 2rem;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    .title {
      font-size: 1.5rem;
      margin-bottom: 0.8rem
    }
  }
  .overview {
    margin-bottom: 2rem;
    background-image: -webkit-linear-gradient(90deg, #3f5efb 0%, #fc466b 100%);
    color: #ffffff;
    width: 20rem;
    height: 20rem;
    .section {
      margin-bottom: 2rem;
      .content {
        text-align: center;
        font-size: 2rem;
        .unit {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
