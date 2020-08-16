<template>
  <div id="productModal" class="modal fade" ref="productModal">
    <div class="modal-dialog modal-lg" role="document">
      <validation-observer ref="form" v-slot="{ invalid }">
        <form @submit.prevent="updateProduct(tempProduct)">
          <div class="modal-content border-0">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ modalTitle }}
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
                  <div class="form-group">
                    <label for="customFile">
                      或 上傳圖片
                      <i
                        v-if="status.fileUploading"
                        class="fas fa-spinner fa-spin"
                      />
                    </label>
                    <input
                      id="customFile"
                      ref="file"
                      type="file"
                      accept="image/*"
                      class="form-control"
                      @change="uploadFile"
                    >
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
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <validation-provider v-slot="{ errors, classes }" rules="required">
                          <label for="subcategory">子分類</label>
                          <input
                          id="subcategory"
                          v-model="options.subcategory"
                          type="text" class="form-control"
                          :class="classes"
                          placeholder="請輸入子分類"
                          @change="optionsChange">
                          <span v-if="errors[0]" class="text-danger">{{ `子分類${errors[0].slice(12, errors[0].length)}` }}</span>
                        </validation-provider>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="event">活動</label>
                        <input id="event"
                        v-model="options.event"
                        type="text"
                        class="form-control"
                        placeholder="請使用空白鍵分隔"
                        @change="optionsChange">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <validation-provider v-slot="{ errors }" rules="required">
                      <label for="description">產品描述</label>
                      <textarea v-model="tempProduct.description" type="text" class="form-control" placeholder="請輸入產品描述">
                      </textarea>
                      <span v-if="errors[0]" class="text-danger">{{ `產品描述${errors[0].slice(12, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors }" rules="required">
                      <label for="content">說明內容</label>
                      <vue-editor v-model="tempProduct.content">
                      </vue-editor>
                      <span v-if="errors[0]" class="text-danger">{{ `說明內容${errors[0].slice(8, errors[0].length)}` }}</span>
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
import { VueEditor } from 'vue2-editor/dist/vue2-editor.core'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      tempProduct: {
        imageUrl: [],
        enabled: false,
        options: {}
      },
      modalTitle: '建立新產品',
      status: {
        fileUploading: false
      },
      options: {
        subcategory: '',
        event: ''
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
      this.tempProduct = { imageUrl: [], enabled: false, options: {} }
      this.$refs.form.reset()
    },
    getProduct (id) {
      this.options = { subcategory: '', event: '' }
      this.$refs.form.reset()
      if (!this.isNew) {
        this.modalTitle = '編輯產品'
      }
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`
      this.$http.get(api)
        .then((res) => {
          $('#productModal').modal('show')
          this.tempProduct = res.data.data
          if (!this.tempProduct.options) {
            this.tempProduct.options = {}
          } else {
            this.options = this.tempProduct.options
          }
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
      $('#productModal').modal('hide')
      setTimeout(() => { this.$emit('loading') }, 500)
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`
      if (!this.tempProduct.options) {
        this.tempProduct.options = {}
      }
      this.$http[method](url, this.tempProduct)
        .then(() => {
          this.$bus.$emit('productUpdate', {
            product: this.tempProduct
          })
          this.tempProduct = {}
          this.$emit('loading')
        }).catch((error) => {
          console.log(error)
        })
    },
    optionsChange () {
      this.tempProduct.options = this.options
      console.log(this.tempProduct.options)
    },
    uploadFile () {
      const uploadedFile = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', uploadedFile)
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage`
      this.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((response) => {
        this.status.fileUploading = false
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path)
        }
      }).catch((error) => {
        console.log(error)
        this.status.fileUploading = false
      })
    }
  }
}
</script>
<style lang="scss">
@import '~vue2-editor/dist/vue2-editor.css';
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
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
