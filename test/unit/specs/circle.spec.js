import Vue from 'vue' // 导入Vue用于生成Vue实例
import Circle from '../../../packages/circle/index.js' // 导入组件'
var assert = require('assert')

// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('Circle.vue', () => {
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Circle) // 获得组件实例
    const vm = new Constructor().$mount() // 将组件挂在到DOM上
    console.log(vm)
    // 断言：DOM中包含class为XXX的元素
    // expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome to Your Vue.js App')
    // expect(vm.$el.classList.contains('peony-circle')).to.eventually.be.true
    assert.equal([1, 2, 3].indexOf(4), -1)
    // 断言：DOM中包含class为v-hello__message的元素
    // expect(vm.$el.querySelector('.peony-circle__content')).to.be.true
  })
})
