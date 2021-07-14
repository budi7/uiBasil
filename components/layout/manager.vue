<template functional>
  <div v-if="!props.isLoading">
    <div v-if="(props.isError || props.isEmpty)">
      <div v-if="props.isError">
        <slot name="error" />
      </div>
      <div v-if="props.isEmpty && !props.isError">
        <slot name="empty" />
      </div>
    </div>
    <div v-else>
      <slot name="content" />
    </div>
  </div>
  <div v-else>
    <slot name="loader" />
  </div>
</template>

<script>
export default {
  props: {
    isError: {
      default: false,
      type: Boolean
    },
    isLoading: {
      default: false,
      type: Boolean
    },
    isEmpty: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style />
