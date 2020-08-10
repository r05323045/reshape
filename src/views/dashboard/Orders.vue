<template>
  <div class="backend-orders-wrapper">
    <loading :active.sync="isLoading" loader="bars" :is-full-page="false" :opacity="1" background-color="#e5e5e5"></loading>
    <div class="backend-orders" ref="backend-orders">
      <div class="table-wrapper">
        <table class="table mt-4">
          <thead class="thead-dark">
            <tr>
              <th>下單時間</th>
              <th>購買款項</th>
              <th>付款方式</th>
              <th>應付金額</th>
              <th>是否付款</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orders" :key="item.id">
              <td class="order-created-time" v-if="item.created">{{ item.created.datetime }}</td>
              <td class="order-products">
                <ul class="list-group">
                  <li
                    v-for="(product, i) in item.products"
                    :key="i"
                    class="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between"
                  >
                    <span>{{ product.product.title }}</span>
                    <span>{{ `${product.quantity} ${product.product.unit}` }}</span>
                  </li>
                </ul>
              </td>
              <td>{{ item.payment }}</td>
              <td v-if="item.amount">{{ Math.ceil(item.amount) | priceFormat }}</td>
              <td class="ispaid">
                <div class="onoffswitch mx-auto align-middle">
                  <input type="checkbox"  @click="setOrderPaid(item)" name="onoffswitch" class="onoffswitch-checkbox" :class="{ checked: item.paid}" :id="`switch-${item.id}`" tabindex="0" checked>
                  <label class="onoffswitch-label" :for="`switch-${item.id}`"></label>
                </div>
                <div class="ispaid-text">
                  <span class="paid" v-if="item.paid">已付款</span>
                  <span class="unpaid" v-if="!item.paid">尚未付款</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <pagination :pages="pagination" @emit-pages="getOrders" class="pagination-wrapper"></pagination>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '@/components/Pagination'
export default {
  name: 'Orders',
  data () {
    return {
      orders: [],
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
    pagination
  },
  created () {
    this.getOrders()
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`
      this.$http.get(api).then((response) => {
        this.orders = response.data.data
        this.pagination = response.data.meta.pagination
        this.isLoading = false
      })
    },
    setOrderPaid (item) {
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`
      if (item.paid) {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`
      }
      this.$http.patch(api, item.id).then(() => {
        this.getOrders()
      })
    },
    toolTip () {
      $('[data-toggle="tooltip"]').tooltip()
    }
  }
}
</script>
<style lang="scss">
.backend-orders-wrapper {
  position: relative;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 50px;
}
.backend-orders {
  margin: auto;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  .table-wrapper {
    -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
    .table {
      max-width: 100%;
      width: 100%;
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
          .order-products {
            text-align: left;
          }
          td {
            height: 100%;
            text-align: center;
            vertical-align: middle;
          }
          .order-created-time {
            font-size: 14px;
          }
          .ispaid {
            width: 130px;
            .onoffswitch {
              float: left;
              position: relative; width: 40px;
              -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
              .onoffswitch-checkbox {
                position: absolute;
                opacity: 0;
                pointer-events: none;
              }
              .onoffswitch-label {
                display: block; overflow: hidden; cursor: pointer;
                height: 24px; padding: 0; margin: 0px; line-height: 24px;
                border: 2px solid #E3E3E3; border-radius: 24px;
                background-color: #E3E3E3;
                transition: background-color 0.3s ease-in;
              }
              .onoffswitch-label:before {
                content: "";
                display: block; width: 24px; margin: 0px;
                background: #FFFFFF;
                position: absolute; top: 0; bottom: 0;
                right: 14px;
                border: 2px solid #E3E3E3; border-radius: 24px;
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
            .ispaid-text {
              float: right;
              font-size: 0.9rem;
              .paid {
                color: #00ad5f;
                height: 24px; padding: 0; margin: 0px; line-height: 24px;
              }
              .unpaid {
                color: #fa4251;
                height: 24px; padding: 0; margin: 0px; line-height: 24px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
