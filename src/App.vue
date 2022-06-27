<template>
  <a-layout-header class="header" :style="{ position: 'fixed', zIndex: 999, width: '100%' }">
    <a-menu theme="dark" mode="horizontal" v-model:value="defaultSelectedKeys">
        <a-menu-item v-for="item in menu" :key="item.key" @click="changePage(item)">
          {{ item.name }}
        </a-menu-item>
    </a-menu>
  </a-layout-header>
  <a-layout-content
    :style="{
      background: '#fff',
      padding: '24px',
      margin: 0,
      minHeight: '280px',
      overflow: 'hidden',
      'padding-top':'75px'
    }"
  >
    <router-view />
  </a-layout-content>
  <!-- <a-layout-content
    :style="{
      background: '#fff',
      padding: '24px',
      margin: 0,
      minHeight: '280px',
      overflow: 'hidden',
    }"
  >
    <router-view />
  </a-layout-content> -->
</template>
<script>
import { Item } from "ant-design-vue/lib/menu";
export default {
  data() {
    return {
      collapsed: false,
      menu: [],
      defaultSelectedKeys: this.$route.key,
    };
  },
  created() {
    let menu = this.$router.options.routes.filter((item) => {
      return item.type == "menu";
    });
    this.menu = menu;
  },
  methods:{
    changePage(val){
      this.$router.push({path:val.path})
    }
  },
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#components-layout-demo-top-side-2 {
  height: 100%;
}
#app {
  height: 100vh;
}
</style>
