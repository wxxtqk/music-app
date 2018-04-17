<template>
  <div ref="wrapperScroll">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    click: {
      type: Boolean,
      default: true
    },
    // 需要滚动的位置
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    },
    // 监听滚动
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapperScroll) {
        return
      }
      // 初始化滚动
      this.scroll = new BScroll(this.$refs.wrapperScroll, {
        click: this.click,
        probeType: this.probeType
      })
      // 监听滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
    },
    // 重新计算滚动
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    update() {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    // 移动到具体某个元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  mounted () {
    this.update()
  },
  // 当data发生改变后重新计算高度
  watch: {
    data() {
      this.refresh()
    }
  }
}
</script>

