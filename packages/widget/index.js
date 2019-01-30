import Widget from './widget.vue';

Widget.install = function (Vue) {
  Vue.component(Widget.name, Widget);
}

export default Widget;
