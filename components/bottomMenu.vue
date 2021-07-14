<template functional>
  <div id="bottom-menu" class="content-menu-bottom px-2 pb-2">
    <div :class="`row mx-0 px-1 content ${props.size}`">
      <div class="col px-1 w-100">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      default: '',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
