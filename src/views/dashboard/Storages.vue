<!--TODO: 複製圖片連結功能-->
<template>
  <div class="backend-storages-wrapper">
    <loading :active.sync="isLoading" loader="bars" :is-full-page="false" :opacity="1" background-color="#e5e5e5"></loading>
    <div class="backend-storages" v-if="storages.length">
      <div v-for="i in 3" :key="`row_${i}`">
        <div class="card-deck mx-auto" v-if="storages.slice((i - 1) * 3, i * 3).length > 0">
          <div v-for="item in storages.slice((i - 1) * 3, i * 3)" :key="item.id" class="card my-5" :id="item.id">
            <img :src="item.path" class="card-img-top">
            <button type="button" class="close delete-badge" @click.prevent="openModel(item)">
              <i class="fa fa-times-circle"></i>
            </button>
            <div class="card-body">
              <div class="input-group input-group-sm">
                <input
                  v-model="item.path"
                  type="text"
                  class="form-control"
                disabled>
                <div class="input-group-append">
                  <button type="button"
                    class="btn btn-secondary"
                    v-clipboard:copy="item.path"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError">
                    <i class="far fa-copy"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card my-5 border-0 no-use" v-for="i in 3 - storages.slice((i - 1) * 3, i * 3).length" :key="`surplus_${i}`">
          </div>
        </div>
      </div>
      <pagination :pages="pagination" @emitPages="getData"></pagination>
    </div>
    <div id="deleteModal" class="modal fade">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 lass="modal-title">
              <span>刪除圖片</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal">
              <i class="fa fa-times-circle"></i>
            </button>
          </div>
          <div class="modal-body">
            是否刪除該筆資料 (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteData">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import pagination from '@/components/Pagination'
export default {
  name: 'Storages',
  components: {
    pagination
  },
  data () {
    return {
      storages: {},
      tempData: {},
      pagination: {},
      isLoading: false,
      message: 'Copy These Text'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData (page = 1) {
      this.isLoading = true

      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`

      this.$http.get(url).then((response) => {
        this.storages = response.data.data
        this.pagination = response.data.meta.pagination
        this.isLoading = false
      })
    },
    openModel (item) {
      $('#deleteModal').modal('show')

      this.tempData = { ...item }
    },
    deleteData () {
      $('#deleteModal').modal('hide')
      setTimeout(() => { this.isLoading = true }, 500)
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage/${this.tempData.id}`
      this.$http.delete(url).then(() => {
        this.isLoading = false
        this.getData()
      })
    },
    onCopy: function (e) {
      alert('Successfully copied image url to your Clipboard!')
    },
    onError: function (e) {
      alert('Failed to copy url')
    }
  }
}
</script>
<style lang="scss">
.backend-storages-wrapper {
  margin: auto;
  position: relative;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  padding: 50px;
}
.backend-storages {
  margin: auto;
  max-width: 1140px;
  width: 100%;
  height: 100%;
  .card-deck {
    .card {
      max-width: 300px;
      border-radius: 1rem;
      cursor: pointer;
      .card-img-top {
        max-width: 300px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
      .delete-badge {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 5;
        border-radius: 50%;
        background-color: #ffffff;
        color: #f16c5d;
        opacity: 0.9;
      }
    }
    .no-use {
      background-color: #e5e5e5;
      cursor: default;
    }
  }
}
</style>
