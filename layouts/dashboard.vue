<template>
  <div class="body-wrapper">
    <!-- main left menu -->
    <!--
    how to add menu
    1. add block menu bellow, add some icon
    2. add click event: active_menu = "your menu"
    3. register your menu inside datas variable: your_menu: {label: {id: '', lang: ''}, menus: {'your_submenu' : [label: {id: '', lang: ''}, url: 'yourpageurl']}}
    -->
    <div class="body-left-menu">
      <div class="row mt-2">
        <div
          id="outlet"
          class="col my-3 mx-1"
          @click="$store.commit('app/setMenu', 'menu_outlet')"
        >
          <img
            data-bs-toggle="tooltip"
            data-bss-tooltip=""
            data-bs-placement="right"
            :title="menu.menu_outlet.label[lang]"
            :class="'img-fluid p-2 ' + ($store.state.app.menu === 'menu_outlet' ? 'active' : '')"
            src="~/assets/img/shop.png"
          >
        </div>
        <div
          id="product"
          class="col my-3 mx-1"
          @click="$store.commit('app/setMenu', 'menu_product')"
        >
          <img
            data-bs-toggle="tooltip"
            data-bss-tooltip=""
            data-bs-placement="right"
            :title="menu.menu_product.label[lang]"
            :class="'img-fluid p-2 ' + ($store.state.app.menu === 'menu_product' ? 'active' : '')"
            src="~/assets/img/package-6.png"
          >
        </div>
        <div
          id="sales"
          class="col my-3 mx-1"
          @click="$store.commit('app/setMenu', 'menu_sales')"
        >
          <img
            data-bs-toggle="tooltip"
            data-bss-tooltip=""
            data-bs-placement="right"
            :title="menu.menu_sales.label[lang]"
            :class="'img-fluid p-2 ' + ($store.state.app.menu === 'menu_sales' ? 'active' : '')"
            src="~/assets/img/shopping-bag-2.png"
          >
        </div>
        <div
          id="employee"
          class="col my-3 mx-1"
          @click="$store.commit('app/setMenu', 'menu_employee')"
        >
          <img
            data-bs-toggle="tooltip"
            data-bss-tooltip=""
            data-bs-placement="right"
            :title="menu.menu_employee.label[lang]"
            :class="'img-fluid p-2 ' + ($store.state.app.menu === 'menu_employee' ? 'active' : '')"
            src="~/assets/img/graphic.svg"
          >
        </div>
        <div class="col my-3 mx-1">
          <hr class="my-0">
        </div>
        <div
          id="user"
          class="col my-3 mx-1"
          @click="$store.commit('app/setMenu', 'menu_me')"
        >
          <div
            data-bs-toggle="tooltip"
            data-bss-tooltip=""
            data-bs-placement="right"
            :title="menu.menu_me.label[lang]"
            :class="'p-1 menu ' + ($store.state.app.menu === 'menu_me' ? 'active' : '')"
          >
            <h6 class="text-center my-0 round-link invert bg-darkBlack">
              B
            </h6>
          </div>
        </div>
        <div
          id="logout"
          class="col my-3 mx-1"
          @click="logout()"
        >
          <img
            data-bs-toggle="tooltip"
            data-bss-tooltip=""
            data-bs-placement="right"
            :title="menu.menu_logout.label[lang]"
            class="img-fluid p-2"
            src="~/assets/img/turn-off.png"
          >
        </div>
      </div>
    </div>
    <!-- END main left menu -->

    <div class="body-center-wrapper">
      <!-- submenu -->
      <!--
      how to add submenu
      1. register your submenu via main 'your_menu' variable, then insert inside menus{}
      -->
      <compLeftMenu
        :title="menu[$store.state.app.menu].label"
        :menus="menu[$store.state.app.menu].menus"
      />
      <!-- END submenu -->
      <div class="body-center-content">
        <div class="content scroll" @scroll="handleScroll">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import compLeftMenu from '~/components/leftMenu.vue'
import menuManifest from '~/json/menu.json'

export default {
  components: {
    compLeftMenu
  },
  data () {
    return {
      lang: this.$store.getters['app/getLanguage'],
      menu: menuManifest,
      scrollPos: 0
    }
  },
  mounted () {
    console.log(this.$store.state.uac)
  },
  methods: {
    logout () {
      this.$nuxt.$emit('logout')
    },
    handleScroll (e) {
      this.$nuxt.$emit('scroll', e.target.scrollTop)
    }
  }
}
</script>

<style>

</style>
