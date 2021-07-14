<template>
  <div>
    <b-modal
      v-model="isModalShow"
      content-class="rounded"
      :title="structure.label[lang]"
      size="sm"
      centered
    >
      <template #default>
        <div class="modal-wrapper">
          <div class="content">
            <div class="row mx-0">
              <div class="col">
                <label>
                  {{ structure.options && structure.options.label ?
                    structure.options.label.start[lang] :
                    label_general.start[lang]
                  }}
                </label>
                <div class="input-group input-group-sm searchbar all rounded left">
                  <input
                    v-model="start"
                    type="number"
                    class="form-control"
                    :max="end"
                    min="0"
                  >
                  <div class="input-group-append">
                    <span class="input-group-text right">
                      <img class="clickable" src="~/assets/img/close.svg" width="10" @click="start = null">
                    </span>
                  </div>
                </div>
                <!-- <p v-if="error.start" class="mb-0 pt-2 description text-danger">
                  {{ error.start[lang] }}
                </p> -->
                <div class="clearfix mb-3" />
                <label>
                  {{ structure.options && structure.options.label ?
                    structure.options.label.end[lang] :
                    label_general.end[lang]
                  }}
                </label>
                <div class="input-group input-group-sm searchbar all rounded left">
                  <input
                    v-model="end"
                    :min="start "
                    type="number"
                    class="form-control"
                  >
                  <div class="input-group-append">
                    <span class="input-group-text right">
                      <img class="clickable" src="~/assets/img/close.svg" width="10" @click="end = null">
                    </span>
                  </div>
                </div>
                <p v-if="error.end" class="mb-0 pt-2 description text-danger">
                  {{ error.end[lang] }}
                </p>
                <div class="clearfix mb-3" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #modal-footer>
        <button
          class="btn btn-primary m-0 btn-block"
          @click="apply"
        >
          {{ labelGeneral.apply[lang] }}
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import labelGeneral from '~/json/label_general'

export default {
  components: {
  },
  props: {
    options: {
      type: Array,
      default: () => { return [] }
    },
    structure: {
      type: Object,
      default: () => { return {} }
    },
    withSearchbar: {
      type: Boolean,
      default: false
    },
    onlyOption: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      labelGeneral,
      isModalShow: false,
      start: null,
      end: null,
      error: {}
    }
  },
  methods: {
    show (dt) {
      this.reset()
      this.start = dt.start >= 0 ? dt.start : null
      this.end = dt.end >= 0 ? dt.end : null
      this.isModalShow = true
    },
    apply () {
      this.error = {}

      // validation
      if (parseInt(this.start) >= 0 && parseInt(this.end) >= 0) {
        // if (this.start > this.end) {
        //   this.error.start = {
        //     id: 'Tidak valid',
        //     eng: 'Value not valid'
        //   }
        //   return
        // }
        if (this.end < this.start) {
          this.error.end = {
            id: 'Tidak valid',
            eng: 'Value not valid'
          }
          return
        }

        this.$emit('applied', {
          start: this.start,
          end: this.end
        })
      } else {
        this.$emit('applied', {})
      }
      this.isModalShow = false
    },
    reset () {
      this.start = null
      this.end = null
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-wrapper {
    height: 55vh;
    .input {
      margin-left: -.33rem;
      margin-right: -.33rem;
    }
    .content {
      margin-left: -.75rem;
      margin-right: -.75rem;
      height: calc(55vh - 2.75rem);
      overflow-y: auto;
    }
  }
</style>
