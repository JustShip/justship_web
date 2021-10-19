<template>
  <transition name="fade">
    <p
      :class="`${ {transitioned: 'ease'} }`"
    >
      <o-icon variant="danger" icon="alert-circle-outline" size="small" />
      <slot />
    </p>
  </transition>
</template>

<script>
export default {
  props: {
    transitioned: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
