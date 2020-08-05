<template>
  <div>
    <div class="not-open d-flex align-items-center justify-content-center">
      <div>
        <div class="under-construction mb-5">🚧 Under Construction 🚧</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
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
</style>
