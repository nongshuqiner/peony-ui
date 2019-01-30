import AnchorLink from './anchor-link.vue';

AnchorLink.install = function (Vue) {
  Vue.component(AnchorLink.name, AnchorLink);
}

export default AnchorLink;
