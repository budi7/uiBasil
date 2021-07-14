<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination mb-0">
        <li class="page-item">
          <div class="input-group input-group-sm pr-1">
            <span
              class="clickable input-group-text no-border right"
              @click="firstPage"
            >
            &nbsp;
              <img src="~/assets/img/left-double.svg" width="9" class="icon-page">
            </span>
          </div>
        </li>
        <li class="page-item">
          <div class="input-group input-group-sm">
            <span
              class="clickable input-group-text no-border right"
              @click="previousPage"
            >
            &nbsp;
              <img src="~/assets/img/left-single.svg" width="9" class="icon-page">
            </span>
          </div>
        </li>
        <li class="page-item input-page px-1">
          <div class="input-group input-group-sm searchbar">
            <input
              v-model="p"
              type="number"
              class="form-control round top bottom text-center"
              @click="() => {
                oldP = p
                p = null
              }"
              @blur="handleInputPage"
            >
          </div>
          <p class="mb-0 shadow-input text-center">
            {{ p }}
          </p>
        </li>
        <li class="page-item">
          <div class="input-group input-group-sm pr-1">
            <span
              class="clickable input-group-text no-border right"
              @click="nextPage"
            >
            &nbsp;
              <img src="~/assets/img/left-single.svg" width="9" class="icon-page rotate-bottom">
            </span>
          </div>
        </li>
        <li class="page-item">
          <div class="input-group input-group-sm">
            <span
              class="clickable input-group-text no-border right"
              @click="lastPage"
            >
            &nbsp;
              <img src="~/assets/img/left-double.svg" width="9" class="icon-page rotate-bottom">
            </span>
          </div>
        </li>
      </ul>
      <!-- <p class="description mb-0 pt-2 text-center">
        12.000 Data / 7.000 Halaman
      </p> -->
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      default: 1,
      type: Number
    },
    maxPage: {
      default: 1,
      type: Number
    }
  },
  data () {
    return {
      p: 1,
      oldP: null
    }
  },
  methods: {
    changePage () {
      if (!this.p) { return }
      this.$emit('pageChanged', this.p)
    },
    firstPage () {
      if (this.p <= this.maxPage) { return }
      this.p = 1
    },
    previousPage () {
      if (this.p <= this.maxPage) { return }
      this.p -= 1
    },
    nextPage () {
      if (this.p >= this.maxPage) { return }
      this.p += 1
    },
    lastPage () {
      if (this.p >= this.maxPage) { return }
      this.p = this.nextPage
    },
    handleInputPage () {
      if (!this.p) {
        this.p = this.oldP
      } else {
        if (this.p < 1) {
          this.p = 1
        } else if (this.p > this.maxPage) {
          this.p = this.maxPage
        }
        this.changePage()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/var.scss";

.clickable {
  background-color: $color-white;

  &:hover {
    background-color: $color-action;
  }
}

.input-group-text, input, p{
  font-size: 70% !important;
}

.input-page {
  width: min-content;
  min-width: 4rem;
  max-width: 12.5vw;

  .searchbar {
    z-index: 1;
  }

  .shadow-input {
    margin-top: -31px;
    opacity: 0;
    z-index: 0;
    margin-bottom: 0px;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

.icon-page {
  opacity: .8;
}

</style>
