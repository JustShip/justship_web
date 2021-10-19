<template>
  <transition name="fade">
    <p
      :class="`${ {transitioned: 'ease'} }`"
    >
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
