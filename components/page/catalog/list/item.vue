<template>
  <li
    :ref="`list-group-${index}`"
    class="list-group-item clickable no-radius"
    @click="$emit('click', catalog)"
  >
    <div class="row align-items-center">
      <div v-show="isSelecting" class="col-auto px-2 text-center">
        <div
          class="row mx-0 select-group"
        >
          <div class="check d-flex pl-2">
            <img v-show="!isSelected" src="~/assets/img/check.svg" width="13">
            <img v-show="isSelected" src="~/assets/img/checked.svg" width="13">
          </div>
        </div>
      </div>
      <div class="col-3 px-2">
        <div class="row mx-0 align-items-center">
          <div class="col-3 pl-0">
            <img class="img-fluid " src="https://www.malangculinary.com/upload/img_15944486022.jpg">
          </div>
          <div class="col pl-1">
            <p class="mb-0 list-text">
              {{ catalog.name }}
            </p>
            <p class="text-secondary mb-0 list-text minititle">
              {{ catalog.code }}
            </p>
          </div>
        </div>
      </div>
      <div class="col px-2">
        <p class="mb-0 list-text">
          {{ catalog.group }}
        </p>
      </div>
      <div class="col px-2 text-center">
        <b-button v-if="catalog.varians.length" v-b-toggle="`collapse-varian-${index}`" variant="link" @click.stop>
          {{ catalog.varians.length }}
          <span class="ml-1 when-opened">
            <small>
              <b-icon-caret-up-fill />
            </small>
          </span>
          <span class="ml-1 when-closed">
            <small>
              <b-icon-caret-down-fill />
            </small>
          </span>
        </b-button>
        <p v-else class="mb-0 list-text">
          {{ catalog.varians.length }}
        </p>
      </div>
      <div class="col px-2 text-center">
        <b-button v-if="catalog.addons.length" v-b-toggle="`collapse-addon-${index}`" variant="link" @click.stop>
          {{ catalog.addons.length }}
          <span class="ml-1 when-opened">
            <small>
              <b-icon-caret-up-fill />
            </small>
          </span>
          <span class="ml-1 when-closed">
            <small>
              <b-icon-caret-down-fill />
            </small>
          </span>
        </b-button>
        <p v-else class="mb-0 list-text">
          {{ catalog.addons.length }}
        </p>
      </div>
      <div class="col px-2 text-center">
        <p :class="`mb-0 list-text ${catalog.is_active === Object.keys(status.catalog)[1] ? 'text-success' : 'text-secondary'}`">
          {{ status.catalog[0][lang] }}
        </p>
      </div>
      <div class="col px-2 text-right">
        <p class="mb-0 list-text">
          {{ catalog.price | number }}
        </p>
      </div>
      <div v-show="!isSelecting" :class="`col-auto text-right ${!isSelecting ? 'px-2' : 'px-2 ml-3'}`" @click.stop>
        <b-dropdown
          :class="`${!isSelecting ? 'mr-1 ml-3' : 'ml-1'}`"
          variant="link"
          size="small"
          toggle-class="text-decoration-none"
          no-caret
          right
          @click.stop
        >
          <template #button-content>
            <b-icon-three-dots-vertical />
          </template>
          <b-dropdown-item
            v-for="(menu, i) in dropMenu.indexCatalog"
            v-show="!(catalog.is_active === Object.keys(status.catalog)[1] && i === 'activate') && !(catalog.is_active === Object.keys(status.catalog)[0] && i === 'deactivate')"
            :key="`menu-catalog-${i}`"
            @click.stop="$emit('clickMenuCatalog',{
              evt: i,
              data: catalog
            })"
          >
            {{ menu[lang] }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <!-- detail collapse -->
    <div :class="`accordion ${isSelecting ? 'ml-3 pl-3' : ''}`" role="tablist">
      <!-- collapse varian -->
      <b-collapse v-if="catalog.varians.length" :id="`collapse-varian-${index}`" accordion="my-accordion" role="tabpanel">
        <div class="row align-items center pt-2 mt-2 border-top">
          <div class="col">
            <p class="mb-0 list-text text-muted">
              {{ labelPage.table.varian[lang] }}
            </p>
          </div>
        </div>
        <div class="row align-items center mb-2">
          <div class="col">
            <div v-for="(varian, _i) in catalog.varians" :key="index+'-'+_i" class="row align-items-center pt-2 px-2 mt-2 border-top">
              <div class="col-3 px-2">
                <div class="row mx-0 align-items-center">
                  <div class="col-3 pl-0">
                    <img class="img-fluid" src="https://www.malangculinary.com/upload/img_15944486022.jpg">
                  </div>
                  <div class="col pl-1">
                    <p class="mb-0 list-text">
                      {{ varian.name }}
                    </p>
                    <p class="text-secondary mb-0 list-text minititle">
                      {{ varian.code }}
                    </p>
                  </div>
                </div>
              </div>
              <div :class="`col offset-md-5 text-center ${isSelecting ? 'px-3' : 'px-0'}`">
                <!-- <p :class="`mb-0 list-text ${varian.status === status.varian[1] ? 'text-success' : 'text-secondary'}`">
                  {{ status.varian[varian.status][lang] }}
                </p> -->
                <p :class="`mb-0 list-text ${catalog.is_active === status.catalog[1] ? 'text-success' : 'text-secondary'}`">
                  {{ status.catalog[0][lang] }}
                </p>
              </div>
              <div :class="`col text-right ${isSelecting ? 'px-2' : 'px-4'}`">
                <p class="text-end mb-0 list-text">
                  {{ catalog.price | number }}
                </p>
              </div>
              <div :class="`col-auto text-right ${isSelecting ? 'px-0 ml-4' : 'px-1 ml-0'}`">
                <b-dropdown
                  class="ml-1"
                  variant="link"
                  size="small"
                  toggle-class="text-decoration-none"
                  no-caret
                  right
                >
                  <template #button-content>
                    <b-icon-three-dots-vertical />
                  </template>
                  <b-dropdown-item
                    v-for="(menu, i) in dropMenu.indexVarian"
                    v-show="!(varian.status === Object.keys(status.varian)[1] && i === 'activate') && !(varian.status === Object.keys(status.varian)[0] && i === 'deactivate')"
                    :key="`menu-varian-${i}`"
                    @click.stop="$emit('clickMenuVarian', i)"
                  >
                    {{ menu[lang] }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>

      <!-- collapse addons -->
      <b-collapse v-if="catalog.addons.length" :id="`collapse-addon-${index}`" accordion="my-accordion" role="tabpanel">
        <div class="row align-items center pt-2 mt-2 border-top">
          <div class="col">
            <p class="mb-0 list-text text-muted">
              {{ labelPage.table.addons[lang] }}
            </p>
          </div>
        </div>
        <div class="row align-items center mb-2">
          <div class="col">
            <div v-for="(addon, _i) in catalog.addons" :key="index+'-'+_i" class="row align-items-center pt-2 px-2 mt-2 border-top">
              <div class="col-3 px-2">
                <div class="row mx-0 align-items-center">
                  <div class="col-3 pl-0">
                    <img class="img-fluid" src="https://www.malangculinary.com/upload/img_15944486022.jpg">
                  </div>
                  <div class="col pl-1">
                    <p class="mb-0 list-text">
                      {{ addon.name }}
                    </p>
                    <p class="text-secondary mb-0 list-text minititle">
                      {{ addon.code }}
                    </p>
                  </div>
                </div>
              </div>
              <div :class="`col offset-md-7 text-right ${isSelecting ? 'px-2' : 'px-2'}`">
                <p class="text-end mb-0 list-text">
                  {{ addon.price | number }}
                </p>
              </div>
              <div :class="`col-auto text-right ${isSelecting ? 'px-0 ml-4' : 'px-1 ml-3'}`">
                <b-dropdown
                  class="ml-1"
                  variant="link"
                  size="small"
                  toggle-class="text-decoration-none"
                  no-caret
                  right
                >
                  <template #button-content>
                    <b-icon-three-dots-vertical />
                  </template>
                  <b-dropdown-item
                    v-for="(menu, i) in dropMenu.indexAddon"
                    v-show="!(addon.status === Object.keys(status.varian)[1] && i === 'activate') && !(addon.status === Object.keys(status.varian)[0] && i === 'deactivate')"
                    :key="`menu-addon-${i}`"
                    @click.stop="$emit('clickMenuAddon', i)"
                  >
                    {{ menu[lang] }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    catalog: {
      default: () => { return {} },
      type: Object
    },
    index: {
      default: 0,
      type: Number
    },
    isSelecting: {
      default: false,
      type: Boolean
    },
    isSelected: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      labelPage: require('~/json/label_page.json').catalog.index,
      dropMenu: require('~/json/dropdownmenu.json').catalog,
      status: require('~/json/status.json')
    }
  },
  mounted () {
    console.log('check catalog', this.catalog)
  }
}
</script>
