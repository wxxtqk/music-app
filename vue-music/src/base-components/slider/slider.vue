<template>
  <div class="slider">
    <div class="slider-list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  methods: {
  }
}
</script>


<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.slider {
  min-height: 1px;
  .slider-list {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
