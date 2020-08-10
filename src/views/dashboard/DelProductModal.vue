<template>
  <div id="delProductModal" class="modal fade">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <i class="fa fa-times-circle"></i>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong>{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
    }
  },
  props: {
    token: String,
    tempProduct: {
      type: Object,
      default () {
        return {
          imageUrl: []
        }
      }
    },
    user: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  methods: {
    // 刪除產品
    delProduct () {
      $('#delProductModal').modal('hide')
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.$http.delete(url).then(() => {
        this.$emit('update')
      })
    }
  }
}
</script>
<style lang="scss">
</style>
