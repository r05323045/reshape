<template>
  <div class="loading">
    <i class="fas fa-circle-notch quick-spin"></i>
    Loading...
  </div>
</template>
<script>
export default {
  name: 'MyLoading'
}
</script>
<style lang="scss">
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
$light-gray: #a8a8ab;
.loading {
  font-size: 0.8rem;
  font-weight: 400;
  color: $navy;
  line-height: 1rem;
  height: 1rem;
  vertical-align: center;
  margin: 0 1rem;
  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
  .quick-spin {
    -webkit-animation: fa-spin 1s infinite linear;
    animation: fa-spin 1s infinite linear;
  }
}
</style>
