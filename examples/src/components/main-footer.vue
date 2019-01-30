<template lang="html">
  <div class="main-footer">
    <div class="footer-social">
      <h3 class="footer-social__h3">Peony {{ version && version.slice(0, 3) }}</h3>
      <a class="footer-social__item" href="https://github.com/nongshuqiner" target="_blank">
        <i class="fab fa-github"></i>
      </a>
      <a class="footer-social__item" href="https://www.npmjs.com/settings/nongshuqiner/packages" target="_blank">
        <i class="fab fa-npm"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { version } from '@/index.js'

export default {
  data() {
    return {
      version
    }
  }
}
</script>

<style lang="scss" scoped>
.main-footer {
  .footer-social {
    height: 60px;
    line-height: 60px;
  }
  .footer-social__h3 {
    line-height: 60px;
    // display: inline-block;
    float: left;
    color: #666;
    font-size: 18px;
    margin: 0;
    padding: 0;
    font-weight: bold;
  }
  .footer-social__item {
    display: inline-block;
    width: 32px;
    height: 32px;
    float: left;
    transition: .3s;
    line-height: 32px;
    text-align: center;
    color: #c8d6e8;
    background-color: transparent;
    vertical-align: middle;
    // margin-right: 20px;
    margin: 14px 0 14px 20px;
    &:hover {
      transform: scale(1.2);
      color: #8D99AB;
    }
    i {
      display: inline-block;
      width: 100%;
      height: 100%;
      size: 32px;
      font-size: 32px;
    }
  }
}
</style>
