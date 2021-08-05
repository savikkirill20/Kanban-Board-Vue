<template>
  <label class="switch" title="Show details...">
    <input type="checkbox" v-model="value">
    <span class="slider" />
  </label>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
};
</script>
