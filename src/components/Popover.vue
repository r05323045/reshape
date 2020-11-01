<template>
  <b-popover :target="product.id" triggers="hover focus" placement="right" v-if="windowWidth >= 992" :ref="`popover-${product.id}`">
    <div class="popper-wrapper">
      <div class="popper-title mt-3">
          {{ product.title }}
      </div>
      <div v-if="product.options.event">
        <span class="btn btn-light popper-badge" @click="$router.push(`/search?key=${product.options.subcategory}`)"> {{ product.options.subcategory }} </span>
        <span
          v-for="(event, index) in product.options.event.split(' ').slice(0, 2)"
          class="btn btn-light popper-badge"
          :key="`event_${index}`"
          @click="$router.push(`/search?key=${event}`)"
        > {{ event }} </span>
      </div>
      <div class="popper-content mt-2">
        <div v-html="product.content"></div>
      </div>
      <div class="popper-star mt-3">
        <span v-for="(score, index) in product.rating.rate" :class="score" class="star-product" :key="index"></span>
      </div>
      <div class="popper-price mt-3">
        <span class="price">{{ product.price | priceFormat }}</span>
        <span class="original-price" v-show="product.origin_price > product.price">{{ product.origin_price | priceFormat }}</span>
      </div>
      <div v-if="!cartId.includes(product.id)" :class="{ addToCart: !cartId.includes(product.id), goToCheckout: cartId.includes(product.id) }" class="btn d-flex justify-content-center mt-3 mb-3" @click="addToCart(product)">
        <span>放入購物車</span>
      </div>
      <div v-if="cartId.includes(product.id)" :class="{ addToCart: !cartId.includes(product.id), goToCheckout: cartId.includes(product.id) }" class="btn d-flex justify-content-center mt-3 mb-3" @click="$router.push('/cart')">
        <span>立刻結帳</span>
      </div>
      <!--
      <div v-if="cartId.includes(product.id)" class="popper-description mt-2">
        {{ product.description }}
      </div>
      -->
    </div>
  </b-popover>
</template>

<script>
import { BPopover } from 'bootstrap-vue'
export default {
  data () {
    return {}
  },
  props: {
    product: Object,
    windowWidth: Number,
    cartId: Array
  },
  components: {
    'b-popover': BPopover
  },
  methods: {
    addToCart (item, quantity = 1) {
      const loader = this.$loading.show({
        container: this.$refs.overlayLoading,
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      this.$http.post(url, cart)
        .then(() => {
          this.$emit('getCart', loader)
          this.$refs[`popover-${item.id}`].$emit('close')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">
$pink: #FA7268;
$navy: #00457C;
$blue: #0079C1;
$gray: #484848;
$light-gray: #a8a8ab;
.popper-wrapper {
  display: block;
  border-radius: 30%;
  padding: 1rem 1.5rem;
  width: 16rem;
  .popper-badge {
    display: inline-block;
    white-space: nowrap;
    font-size: 12px;
    margin: 1px 3px 3px 3px;
    padding: 3px 6px;
    color: #919191;
  }
  .popper-title {
    margin: auto;
    height: 2.5rem;
    line-height: 1.25rem;
    font-size: 1rem;
    font-weight: 700;
    color: $gray;
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    visibility: visible;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .popper-price {
    .price {
      vertical-align: middle;
      font-weight: 500;
      font-size: 1rem;
      margin-right: 6px;
      color: $navy;
    }
    .original-price {
      vertical-align: middle;
      text-decoration: line-through;
      font-size: 0.9rem;
      line-height: 0.9rem;
      color: $light-gray;
    }
  }
  .popper-content {
    margin-top: 1rem;
    height: 7.5rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    visibility: visible;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }
  .addToCart {
    color: #ffffff;
    background-color: #ec5252;
    text-decoration: none;
  }
  .addToCart:hover, .add-to-cartaddToCart:focus, .addToCart:active:hover {
    color: #ffffff;
    background-color: #c93232;
  }
  .goToCheckout {
    color: #ffffff;
    background-color: $navy;
    text-decoration: none;
  }
  .goToCheckout:hover, .goToCheckout:focus, .goToCheckout:active:hover {
    color: #ffffff;
    background-color: #092c3f;
  }
}
</style>
