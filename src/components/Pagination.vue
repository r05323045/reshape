<template>
  <div>
    <nav v-show="pages.total_pages > 1" aria-label="Page navigation">
      <ul class="mt-5 pagination d-flex justify-content-center">
        <li
          v-show="pages.current_page !== 1"
          class="page-item"
        >
          <a
          class="page-link"
          href="#"
          aria-label="Go to first page"
          @click.prevent="emitPages(1)"
          >
          <span aria-hidden="true"><i class="fas fa-angle-double-left"></i></span>
          </a>
        </li>
        <li
          v-show="pages.current_page !== 1"
          class="page-item"
        >
          <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPages(pages.current_page - 1)"
          >
          <span aria-hidden="true"><i class="fas fa-angle-left"></i></span>
          </a>
        </li>
        <li
          v-show="pages.current_page > Math.ceil(numOfShown/2) && pages.total_pages > numOfShown + 1"
          class="page-item disabled"
        >
          <a
          class="page-link"
          aria-label="hide pages"
          >
          <span aria-hidden="true">...</span>
          </a>
        </li>
        <li
          v-for="(item, index) in pagesShown"
          :key="index"
          class="page-item"
          :class="{'active': item === pages.current_page, 'disabled': item === pages.current_page}"
        >
          <a
          class="page-link"
          href="#"
          @click.prevent="emitPages(item)"
          >{{ item }}</a>
        </li>
        <li
          v-show="pages.current_page < pages.total_pages - Math.floor(numOfShown/2) && pages.total_pages > numOfShown + 1"
          class="page-item disabled"
        >
          <a
          class="page-link"
          aria-label="hide pages"
          >
          <span aria-hidden="true">...</span>
          </a>
        </li>
        <li
          class="page-item"
          v-show="pages.current_page !== pages.total_pages"
        >
          <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPages(pages.current_page + 1)"
          >
          <span aria-hidden="true"><i class="fas fa-angle-right"></i></span>
          </a>
        </li>
        <li
          class="page-item"
          v-show="pages.current_page !== pages.total_pages"
        >
          <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPages(pages.total_pages)"
          >
          <span aria-hidden="true"><i class="fas fa-angle-double-right"></i></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      numOfShown: 5
    }
  },
  computed: {
    pagesShown: function () {
      if (this.pages.total_pages <= this.numOfShown + 1) {
        return Array.from({ length: this.pages.total_pages }, (el, idx) => idx + 1)
      }
      if (this.pages.current_page < Math.ceil(this.numOfShown / 2)) {
        return Array.from({ length: this.numOfShown }, (el, idx) => idx + 1)
      } else if (this.pages.current_page > this.pages.total_pages - Math.floor(this.numOfShown / 2)) {
        return Array.from({ length: this.numOfShown }, (el, idx) => idx + this.pages.total_pages - this.numOfShown + 1)
      }
      return Array.from({ length: this.numOfShown }, (el, idx) => idx + this.pages.current_page - Math.floor(this.numOfShown / 2))
    }
  },
  props: {
    pages: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    emitPages (item) {
      this.$emit('emit-pages', item)
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
.page-item.active.disabled {
  .page-link {
    background-color: $blue!important;
    border-color: $blue !important;
    color: #ffffff;
  }
}
*:focus {
  outline: none !important
}
</style>
