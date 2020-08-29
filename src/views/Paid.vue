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
<style lang="scss">
.paid {
  width: 100%;
  height: 100%;
  overflow: visible;
  display: flex;
  flex-direction: column;
  .title-wrapper {
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .title {
      font-size: 1.5rem;
      font-weight: 500;
      @media (min-width: 576px) {
        font-size: 2rem;
      }
    }
  }
  .icon-wrapper {
    width: 100%;
    flex-grow: 1;
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
    text-align: center;
    flex-grow: 1;
    .btn {
      border: 1px solid #666;
    }
  }
}
</style>
