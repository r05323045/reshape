<template>
  <div id="productModal" class="modal fade" ref="productModal">
    <div class="modal-dialog modal-lg" role="document">
      <validation-observer ref="form" v-slot="{ invalid }">
        <form @submit.prevent="updateProduct(tempProduct)">
          <div class="modal-content border-0">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ modalView.title }}
              </h5>
              <i class="fa fa-times-circle fa-2x" data-dismiss="modal"></i>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" :rules="{ required: true, regex: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ }">
                      <label for="imageUrl">輸入圖片網址</label>
                      <input id="imageUrl" v-model="tempProduct.imageUrl[0]" type="text" class="form-control" :class="classes"
                        placeholder="請輸入圖片連結">
                      <span v-if="errors[0]" class="text-danger">{{ `圖片連結${errors[0].slice(9, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="modal-img-wrapper text-center">
                    <img class="img-fluid product-image" :src="tempProduct.imageUrl[0]" alt>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider v-slot="{ errors, classes }" rules="required">
                          <label for="title">標題</label>
                          <input id="title" v-model="tempProduct.title" type="text" class="form-control" :class="classes" placeholder="請輸入標題">
                          <span v-if="errors[0]" class="text-danger">{{ `標題${errors[0].slice(6, errors[0].length)}` }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider v-slot="{ errors, classes }" rules="required">
                          <label for="category">分類</label>
                          <input id="category" v-model="tempProduct.category" type="text" class="form-control" :class="classes" placeholder="請輸入分類">
                          <span v-if="errors[0]" class="text-danger">{{ `分類${errors[0].slice(9, errors[0].length)}` }}</span>
                        </validation-provider>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider v-slot="{ errors, classes }" rules="required|numeric">
                          <label for="origin_price">原價</label>
                          <input id="origin_price" v-model="tempProduct.origin_price" type="text" class="form-control" :class="classes" placeholder="請輸入原價">
                          <span v-if="errors[0]" class="text-danger">{{ `原價${errors[0].slice(13, errors[0].length)}` }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <validation-provider v-slot="{ errors, classes }" rules="required|numeric">
                          <label for="price">價格</label>
                          <input id="price" v-model="tempProduct.price" type="text" class="form-control" :class="classes" placeholder="請輸入價格">
                          <span v-if="errors[0]" class="text-danger">{{ `價格${errors[0].slice(6, errors[0].length)}` }}</span>
                        </validation-provider>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider v-slot="{ errors, classes }" rules="required">
                          <label for="unit">單位</label>
                          <input id="unit" v-model="tempProduct.unit" type="text" class="form-control" :class="classes" placeholder="請輸入單位">
                          <span v-if="errors[0]" class="text-danger">{{ `單位${errors[0].slice(5, errors[0].length)}` }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <label>id</label>
                        <input type="text" class="form-control" v-model="tempProduct.id" placeholder="自動產生" disabled>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div v-for="item in ['description', 'content']" class="form-group" :key="item">
                    <validation-provider v-slot="{ errors }" rules="required">
                      <label :for="item">{{ modalView.engToZh[item] }}</label>
                      <textarea :id="item" v-model="tempProduct[item]" type="text" class="form-control"
                        :placeholder="`請輸入${modalView.engToZh[item]}`">
                      </textarea>
                      <span v-if="errors[0]" class="text-danger">{{ `${modalView.engToZh[item]}${errors[0].slice(errors[0].length - 3, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label class="form-check-label" for="enabled">是否啟用</label>
                    <div class="mt-3">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" :value=true v-model="tempProduct.enabled">
                        <label class="form-check-label">啟用</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" :value=false v-model="tempProduct.enabled">
                        <label class="form-check-label">不啟用</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
                取消
              </button>
              <button type="submit" class="btn btn-primary" :disabled="invalid">
                確認
              </button>
            </div>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data () {
    return {
      tempProduct: {
        imageUrl: [],
        enabled: false
      },
      modalView: {
        title: '建立新產品',
        engToZh: {
          title: '標題',
          id: 'Id',
          category: '分類',
          unit: '單位',
          origin_price: '原價',
          price: '價格',
          description: '產品描述',
          content: '說明內容'
        }
      }
    }
  },
  props: {
    token: String,
    isNew: {
      type: Boolean,
      default: true
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
    clearTempProduct () {
      this.tempProduct = { imageUrl: [], enabled: false }
      this.$refs.form.reset()
    },
    getProduct (id) {
      this.$refs.form.reset()
      if (!this.isNew) {
        this.modalView.title = '編輯產品'
      }
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`
      this.$http.get(api)
        .then((res) => {
          $('#productModal').modal('show')
          this.tempProduct = res.data.data
        }).catch((error) => {
          console.log(error)
        })
    },
    updateProduct (productData) {
      if (productData) {
        this.tempProduct = productData
      }
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api += `/${this.tempProduct.id}`
        httpMethod = 'patch'
      }
      this.axiosMethod(api, httpMethod)
    },
    axiosMethod (url, method) {
      this.$emit('loading')
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.$http[method](url, this.tempProduct)
        .then(() => {
          $('#productModal').modal('hide')
          this.$bus.$emit('productUpdate', {
            product: this.tempProduct
          })
          this.$emit('loading')
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss">
.modal {
  .modal-dialog {
    .modal-content {
      border-radius: 10px;
      .modal-header {
        .fa-times-circle {
          cursor: pointer;
        }
      }
      .modal-body {
        text-align: left;
        padding: 30px;
        .modal-img-wrapper {
          padding: 10px;
          width: 300px;
          height: 180px;
          max-width: 100%;
          max-height: 100%;
          .product-image {
            max-width: 100%;
            max-height: 100%;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
