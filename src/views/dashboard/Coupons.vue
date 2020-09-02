<template>
  <div class="backend-coupons-wrapper">
    <loading :active.sync="isLoading" loader="bars" :is-full-page="false" :opacity="1" background-color="#e5e5e5"></loading>
    <div class="backend-coupons">
      <div class="above-table text-right">
        <button class="btn create-coupon" @click="openCouponModal('created')">
          ＋ ADD ITEM
        </button>
      </div>
      <div class="table-wrapper">
        <table class="table mt-4">
          <thead class="thead-dark">
            <tr>
              <th>名稱</th>
              <th>優惠碼</th>
              <th>折扣百分比</th>
              <th>到期日</th>
              <th>是否啟用</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in coupons" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.percent }} 折</td>
              <td>{{ item.deadline.datetime }}</td>
              <td>
                <div class="onoffswitch mx-auto align-middle">
                  <input type="checkbox"  @click="switchToActive(item)" name="onoffswitch" class="onoffswitch-checkbox" :class="{ checked: item.enabled}" :id="`switch-${item.id}`" tabindex="0" checked>
                  <label class="onoffswitch-label" :for="`switch-${item.id}`"></label>
                </div>
              </td>
              <td>
                <button class="btn btn-sm" @click="openCouponModal('edit', item)" @mouseover="toolTip" data-toggle="tooltip" title="編輯產品">
                    <i class="fa fa-edit fa-lg"></i>
                </button>
                <button class="btn btn-sm" @click="openCouponModal('delete', item)" @mouseover="toolTip" data-toggle="tooltip" title="刪除產品">
                    <i class="fa fa-trash fa-lg"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        id="couponModal"
        class="modal fade"
        tabindex="-1"
      >
        <div
          class="modal-dialog"
          role="document"
        >
          <validation-observer ref="form" v-slot="{ invalid }">
            <form @submit.prevent="updateCoupon">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
                  </h5>
                  <button type="button" class="close" data-dismiss="modal">
                    <i class="fa fa-times-circle"></i>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required">
                      <label for="title">標題</label>
                      <input
                        id="title"
                        v-model="tempCoupon.title"
                        type="text"
                        class="form-control"
                        placeholder="請輸入標題"
                        :class="classes"
                      >
                      <span v-if="errors[0]" class="text-danger">{{ `標題${errors[0].slice(6, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required">
                      <label for="coupon_code">優惠碼</label>
                      <input
                        id="coupon_code"
                        v-model="tempCoupon.code"
                        type="text"
                        class="form-control"
                        placeholder="請輸入優惠碼"
                        :class="classes"
                      >
                      <span v-if="errors[0]" class="text-danger">{{ `優惠碼${errors[0].slice(12, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required">
                    <label for="due_date">到期日</label>
                      <input
                        id="due_date"
                        v-model="due_date"
                        type="date"
                        class="form-control"
                        :class="classes"
                      >
                      <span v-if="errors[0]" class="text-danger">{{ `到期日${errors[0].slice(9, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required">
                      <label for="due_time">到期時間</label>
                      <input
                        id="due_time"
                        v-model="due_time"
                        type="time"
                        step="1"
                        class="form-control"
                        :class="classes"
                      >
                      <span v-if="errors[0]" class="text-danger">{{ `到期時間${errors[0].slice(9, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <validation-provider v-slot="{ errors, classes }" rules="required|numeric|min_value:1|max_value:99">
                      <label for="price">折扣</label>
                      <input
                        id="price"
                        v-model="tempCoupon.percent"
                        type="number"
                        class="form-control"
                        place
                        holder="請輸入折扣數量"
                        :class="classes"
                      >
                      <span v-if="errors[0]" class="text-danger">{{ `折扣${errors[0].slice(6, errors[0].length)}` }}</span>
                    </validation-provider>
                  </div>
                  <div class="form-group">
                    <label class="form-check-label" for="enabled">是否啟用</label>
                      <div class="mt-3">
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" :value=true v-model="tempCoupon.enabled">
                          <label class="form-check-label">啟用</label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" :value=false v-model="tempCoupon.enabled">
                          <label class="form-check-label">不啟用</label>
                        </div>
                      </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    關閉
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="invalid"
                  >
                    {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
                  </button>
                </div>
              </div>
            </form>
          </validation-observer>
        </div>
      </div>
      <div
        id="delCouponModal"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          role="document"
        >
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5
                id="exampleModalLabel"
                class="modal-title"
              >
                <span>刪除優惠卷</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>

              <button
                type="button"
                class="btn btn-danger"
                @click="delCoupon"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Coupons',
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: ''
      },
      due_date: '',
      due_time: '',
      status: '',
      isLoading: false
    }
  },
  created () {
    this.getCoupons()
  },
  methods: {
    openCouponModal (status, item) {
      this.$refs.form.reset()
      this.status = status

      switch (status) {
        case 'created':
          this.tempCoupon = { enabled: false }
          $('#couponModal').modal('show')
          break
        // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          this.tempCoupon = { ...item }

          // 使用 split 切割相關時間戳
          const deadlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = deadlineAt
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = { ...item }
          $('#delCouponModal').modal('show')
          break
        default:
          break
      }
    },
    getCoupons () {
      this.isLoading = true

      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupons`

      this.$http.get(url).then((response) => {
        this.coupons = response.data.data

        this.isLoading = false
      })
    },
    updateCoupon () {
      $('#couponModal').modal('hide')
      setTimeout(() => { this.isLoading = true }, 500)
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon`
      let httpMethod = ''

      if (this.status === 'created') {
        httpMethod = 'post'
      } else {
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`
        httpMethod = 'patch'
      }

      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`

      this.$http[httpMethod](api, this.tempCoupon).then((response) => {
        if (response.status === 200) {
          this.getCoupons()
        } else {
          console.log(response.data.message)
        }
        setTimeout(() => { this.isLoading = false }, 500)
      })
    },
    delCoupon () {
      this.isLoading = true

      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`

      this.$http.delete(api).then((response) => {
        $('#delCouponModal').modal('hide')

        if (response.status === 200) {
          this.getCoupons()
        } else {
          console.log(response.data.message)
        }

        this.isLoading = false
      })
    },
    switchToActive (item) {
      this.tempCoupon = Object.assign({}, item)
      this.tempCoupon.enabled = !this.tempCoupon.enabled
      this.status = 'edit'
      this.updateCoupon()
    },
    toolTip () {
      $('[data-toggle="tooltip"]').tooltip()
    }
  }
}
</script>
<style lang="scss">
.backend-coupons-wrapper {
  margin: auto;
  position: relative;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  padding: 50px;
}
.backend-coupons {
  margin: auto;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  .above-table {
    .btn {
      border-radius: 10px;
    }
    .create-coupon {
      background: #63c76a;
      color: #FFFFFF;
      border-radius: 0px;
      transition: background-color 0.3s, box-shadow 0.3s;
    }
    .create-coupon:hover {
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
</style>
