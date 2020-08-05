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
          <div class="not-open d-flex align-items-center justify-content-center" v-if="this.$route.path === '/admin/'">
            <div>
              <div class="under-construction mb-5">🚧 Under Construction 🚧</div>
              請至
              <router-link to="/admin/products">產品列表</router-link>
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
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
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
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
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
      padding: 50px;
      .not-open {
        margin: auto;
        width: 50rem;
        height: 30rem;
        background: #ffffff;
        border-radius: 2rem;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
        text-align: center;
        .under-construction {
          font-size: 3rem;
        }
      }
    }
  }
}
</style>
