<template>
  <a-card hoverable>
    <img
      slot="cover"
      alt="example"
      style="height: 100px; margin: 0 auto; display: flex"
      :style="'filter: contrast(' + (index % 2 != 0 ? 0 : 1) + ')'"
      src="https://oss.canxingtv.com/wl/file/20220615180913921-601545299.png"
    />
    <p style="text-align: center">{{ title }}</p>
    <a-button :type="index% 2 != 0 ?'primary':'danger'"> 加电力 </a-button>
  </a-card>
</template>
<script>
export default {
  name: "card",
  components: {},
  props: {
    title: {
      type: String,
    },
    list: {
      type: [String, Number],
    },
    index: {
      type: [String, Number],
    },
  },
};
</script>
