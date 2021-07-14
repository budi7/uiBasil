<template>
  <div>
    <ul class="list-group">
      <!-- list header -->
      <slot name="list-header" />
      <!-- list content -->
      <slot name="list-content" :data="datas" />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: Array,
      default () { return [] }
    }
  }
}
</script>
