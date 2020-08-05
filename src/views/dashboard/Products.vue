<template>
  <div class="backend-products" ref="backend-products">
    <loading :active.sync="isLoading"></loading>
    <div class="above-table text-right mt-4">
      <button class="btn create-product" @click="openModal('new')">
        ＋ ADD ITEM
      </button>
    </div>
    <div class="table-wrapper">
      <table class="table mt-4">
        <thead class="thead-dark">
          <tr>
            <th></th>
            <th>分類</th>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>啟用</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td class="td-img">
              <div class="img-wrapper mx-auto my-auto">
                <img :src="item.imageUrl" class="product-image">
              </div>
            </td>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price }}</td>
            <td>{{ item.price }}</td>
            <td>
              <div class="onoffswitch mx-auto align-middle">
                <input type="checkbox"  @click="switchToActive(item)" name="onoffswitch" class="onoffswitch-checkbox" :class="{ checked: item.enabled}" :id="`switch-${item.id}`" tabindex="0" checked>
                <label class="onoffswitch-label" :for="`switch-${item.id}`"></label>
              </div>
            </td>
            <td>
              <button class="btn btn-sm" @click="openModal('edit', item)" @mouseover="toolTip" data-toggle="tooltip" title="編輯產品">
                  <i class="fa fa-edit fa-lg"></i>
              </button>
              <button class="btn btn-sm" @click="openModal('delete', item)" @mouseover="toolTip" data-toggle="tooltip" title="刪除產品">
                  <i class="fa fa-trash fa-lg"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <pagination :pages="pagination" @emit-pages="getProducts" class="pagination-wrapper"></pagination>
    <product-modal ref="productModel" :is-new="isNew" :token="token" @loading="loadingSwitch"></product-modal>
    <del-product-modal :temp-product="tempProduct" @update="getProducts" :token="token"></del-product-modal>
  </div>
</template>

<script>
import $ from 'jquery'
import productModal from './ProductModal'
import delProductModal from './DelProductModal'
import pagination from '.././Pagination'
export default {
  name: 'Products',
  props: ['token'],
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      tempProduct: {
        imageUrl: [],
        enabled: false
      },
      isNew: false
    }
  },
  components: {
    productModal,
    delProductModal,
    pagination
  },
  created () {
    this.getProducts()
    this.$bus.$on('productUpdate', event => {
      const productsId = this.products.map(product => product.id)
      if (productsId.includes(event.product.id)) {
        this.products.forEach((el, idx) => {
          if (el.id === event.product.id) {
            this.products[idx] = event.product
          }
        })
      } else {
        this.getProducts()
      }
    })
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`
      this.$http.get(api).then((response) => {
        this.products = response.data.data
        this.pagination = response.data.meta.pagination
        this.isLoading = false
      })
    },
    openModal (isNew, item) {
      switch (isNew) {
        case 'new':
          this.isNew = true
          this.$refs.productModel.clearTempProduct()
          $('#productModal').modal('show')
          break
        case 'edit':
          this.tempProduct = Object.assign({}, item)
          this.isNew = false
          this.$refs.productModel.getProduct(this.tempProduct.id)
          break
        case 'delete':
          $('#delProductModal').modal('show')
          this.tempProduct = Object.assign({}, item)
          break
        default:
          break
      }
    },
    switchToActive (item) {
      this.tempProduct = Object.assign({}, item)
      this.tempProduct.enabled = !this.tempProduct.enabled
      this.isNew = false
      this.$refs.productModel.updateProduct(this.tempProduct)
    },
    toolTip () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    loadingSwitch () {
      this.isLoading = !this.isLoading
    }
  }
}
</script>
<style lang="scss">
.backend-products {
  margin: auto;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  .above-table {
    .btn {
      border-radius: 10px;
    }
    .create-product {
      background: #63c76a;
      color: #FFFFFF;
      border-radius: 0px;
      transition: background-color 0.3s, box-shadow 0.3s;
    }
    .create-product:hover {
      color: #FFFFFF;
      background: #49E845;
    }
  }
  .table-wrapper {
    border-radius: 10px;
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    .table {
      max-width: 100%;
      width: 100%;
      border-radius: 10px;
      overflow: hidden;
      background-color: #FFFFFF;
      thead {
        th {
          text-align: center;
          vertical-align: middle;
        }
      }
      tbody {
        tr {
          td {
            text-align: center;
            vertical-align: middle;
            .td-img {
              max-width: 300px;
            }
            .onoffswitch {
              position: relative; width: 60px;
              -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
              .onoffswitch-checkbox {
                position: absolute;
                opacity: 0;
                pointer-events: none;
              }
              .onoffswitch-label {
                display: block; overflow: hidden; cursor: pointer;
                height: 36px; padding: 0; margin: 0px; line-height: 36px;
                border: 2px solid #E3E3E3; border-radius: 36px;
                background-color: #E3E3E3;
                transition: background-color 0.3s ease-in;
              }
              .onoffswitch-label:before {
                content: "";
                display: block; width: 36px; margin: 0px;
                background: #FFFFFF;
                position: absolute; top: 0; bottom: 0;
                right: 22px;
                border: 2px solid #E3E3E3; border-radius: 36px;
                transition: all 0.3s ease-in 0s;
              }
              .onoffswitch-checkbox.checked + .onoffswitch-label {
                background-color: #49E845;
              }
              .onoffswitch-checkbox.checked + .onoffswitch-label,
              .onoffswitch-checkbox.checked + .onoffswitch-label:before {
                border-color: #49E845;
              }
              .onoffswitch-checkbox.checked + .onoffswitch-label:before {
                right: 0px;
              }
            }
          }
        }
      }
    }
  }
}
.modal-content {
    border-radius: 10px;
}

.img-wrapper {
    padding: 10px;
    width: 200px;
    height: 100px;
}
.modal-img-wrapper {
    padding: 10px;
    width: 300px;
    height: 180px;
    max-width: 100%;
    max-height: 100%;
}
.product-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10px;
}
.validation {
    font-size: 10px;
}
.fa-times-circle {
    cursor: pointer;
}
</style>
