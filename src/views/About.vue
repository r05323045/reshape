<template>
  <div class="about-wrapper">
    <div class="about" ref="about">
      <div class="router-wrapper">
        <router-link to="/"><span class="mr-2 router">首頁</span></router-link>
        <i class="fas fa-angle-right"></i>
        <span class="ml-2">關於我們</span>
      </div>
      <div class="row content ">
        <div class="col-0 col-xl-2"></div>
        <div class="col-12 col-xl-10">
          <div class="title">
            關於我們
          </div>
          <div class="img"></div>
          <div class="text">
            Reshape 於 2020 年成立，為用戶嚴選設計、居家、等質感商品，將時尚美學注入大眾的日常，連結設計、創意品牌與個人生活需求，重塑每個人的生活。我們透過嚴選商品、數據分析與客製化服務，致力於為用戶創造精緻的購物體驗，滿足大眾對「美」的需求，為設計創造價值。
          </div>
          <div class="text en">
            Reshape was founded in 2020, strictly merchandising for our user, put beauty into everyone's daily, creating a connection between personal demand and design brand, we reshape people's life. Reshape aims to make delicate shopping experience, via strictly merchandising, data analysis, and customization service, we satisfy the need of aesthetic and create value for the design.
          </div>
          <div class="know-more">
            <div class="text" @click="goToGithub">
              了解更多
              <i class="fas fa-angle-right"></i>
            </div>
          </div>
          <div class="notice">
            <hr>
            <div class="text">
              商品圖片來源自Pinkoi、citysocial等購物網站，此網站僅供學習使用，無任何商業利益行為。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    const loader = this.$loading.show({
      isFullPage: true,
      opacity: 1
    }, { default: this.$createElement('MyLoading') })
    setTimeout(() => { loader.hide() }, 1000)
  },
  methods: {
    goToGithub () {
      window.location.href = 'https://github.com/r05323045/reshape'
    }
  }
}
</script>
<style lang="scss">
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
.about-wrapper {
  position: relative;
  overflow: hidden;
  margin: auto;
  min-height: calc(100vh - 2rem);
  @media (min-width: 768px) {
    max-width: 992px;
    min-height: calc(100vh - 18.5rem);
  }
  @media (min-width: 1441px) {
    max-width: 1200px;
  }
  .about {
    margin: 5rem 1rem 2rem 1rem;
    height: 100%;
    overflow-x: hidden;
    overflow-y: visible;
    background: #ffffff;
    position: relative;
    @media (min-width: 576px) {
      margin-top: 5.5rem;
    }
    @media (min-width: 768px) {
      margin: 2rem;
    }
    .router-wrapper {
      .router {
        width: 100%;
        cursor: pointer;
        color: $blue !important;
      }
      .router:hover {
        text-decoration: underline;
      }
    }
    .content {
      margin-top: 2rem;
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        @media (min-width: 768px) {
          font-size: 1.75rem;
        }
      }
      .img {
        margin-top: 2rem;
        width: 100%;
        padding-top: 25%;
        background: url(https://images.unsplash.com/photo-1589606024345-6e1441cc949b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2207&q=80) no-repeat center/contain;
      }
      .text {
        margin-top: 2rem;
        font-size: 1rem;
        @media (min-width: 768px) {
          font-size: 1.25rem;
        }
      }
      .en {
        color: $gray;
      }
      .know-more {
        display: none;
        @media (min-width: 768px) {
          display: block;
          margin-top: 2rem;
        }
        .text {
          width: 8rem;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          height: 2rem;
          line-height: 2rem;
          vertical-align: center;
          color: $blue;
          .fa-angle-right {
            margin-left: 0.5rem;
            color: $gray;
          }
        }
        .text:hover {
          text-decoration: underline;
        }
      }
      .notice {
        margin-top: 2rem;
        .text{
          font-size: 0.8rem;
          color: #666;
          @media (min-width: 768px) {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
