<template>
  <div class="paid" ref="paid">
    <div class="title-wrapper">
      <div class="title">我們已經收到你的訂單</div>
    </div>
    <div class="icon-wrapper">
      <i class="far fa-check-circle"></i>
    </div>
    <div class="button-wrapper">
      <button class="btn" @click="$router.push('/')">繼續選購</button>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
.paid {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: visible;
  display: flex;
  flex-direction: column;
  .title-wrapper {
    margin-top: 10rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    @media (min-width: 768px) {
      margin-top: 5rem;
    }
    .title {
      font-size: 1.5rem;
      font-weight: 500;
      @media (min-width: 576px) {
        font-size: 2rem;
      }
    }
  }
  .icon-wrapper {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .fa-check-circle {
      color: #34c759;
      font-size: 5rem;
      @media (min-width: 576px) {
        font-size: 7.5rem;
      }
    }
  }
  .button-wrapper {
    margin-top: 3rem;
    text-align: center;
    .btn {
      border-radius: 0.25rem;
      color: #ffffff;
      background: $navy;
    }
    .btn:hover, .btn:focus, .btn:active:hover {
      background: #919191;
    }
  }
}
</style>
