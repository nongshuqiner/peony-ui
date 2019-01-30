<template lang="html">
  <div>
    <peony-circle :size="120" :stroke-width="6" :trail-width="6" :percent="percent" :stroke-color="strokeColor" :trail-color="trailColor">
      <span style="color:#36D1DC">{{ percent }}%</span>
    </peony-circle>
    <button :style="{'background': '#F56C6C', 'border-color': '#F56C6C'}" @click="add">+</button>
    <button :style="{'background': '#F56C6C', 'border-color': '#F56C6C'}" @click="sub">-</button>
    <button :style="{'background': '#F56C6C', 'border-color': '#F56C6C'}" @click="strokeColor = ['#36D1DC', '#5B86E5']">渐变</button>
    <button :style="{'background': '#F56C6C', 'border-color': '#F56C6C'}" @click="strokeColor = '#36D1DC'">单一颜色</button>
    <button :style="{'background': '#F56C6C', 'border-color': '#F56C6C'}" @click="trailColor = '#ececec'" style="color: #ececec">背景 1</button>
    <button :style="{'background': '#F56C6C', 'border-color': '#F56C6C'}" @click="trailColor = '#C0C4CC'" style="color: #C0C4CC">背景 2</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      percent: 20,
      strokeColor: ['#36D1DC', '#5B86E5'],
      trailColor: '#ececec'
    }
  },
  methods: {
    add () {
      let percent = this.percent + 20
      if (percent < 100) {
        this.percent = percent
      } else {
        this.percent = 100
      }
    },
    sub () {
      let percent = this.percent - 20
      if (percent > 0) {
        this.percent = percent
      } else {
        this.percent = 0
      }
    }
  }
}
</script>

<style lang="css">

</style>
