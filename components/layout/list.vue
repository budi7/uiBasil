<template functional>
  <ul class="list-group">
    <li class="list-group-item border-top-0 border-bottom-0 border-left-0 border-right-0 bg-transparent pb-2 sticky-top-lower">
      <slot name="title" />
    </li>
    <layoutManager
      :is-loading="props.isLoading"
      :is-error="props.isError"
      :is-empty="props.isEmpty"
      class="w-100"
    >
      <template #error>
        <slot name="error" />
      </template>
      <template #loader>
        <slot name="loader" />
      </template>
      <template #content>
        <slot name="content" />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </layoutManager>
  </ul>
</template>

<script>
import layoutManager from '~/components/layout/manager.vue'

export default {
  components: {
    layoutManager
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isError: {
      type: Boolean,
      default: false
    },
    isEmpty: {
      type: Boolean,
      default: false
    }
  }
}
</script>
