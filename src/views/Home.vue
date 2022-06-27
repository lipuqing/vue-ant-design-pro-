<template>
  <div>
    <a-breadcrumb style="margin: 16px 0"> 歌手列表 </a-breadcrumb>
    <div class="box" v-for="(it, ix) in 7" :key="ix">
      <div class="b_info">
        <a-avatar
          :size="64"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div class="info">
          <p class="m_text">
            <span style="margin-right: 30px">歌手姓名</span> <span>电量: 666</span>
          </p>
          <p class="m_text">歌手说明啊歌手说明啊歌手说明啊歌手说明啊歌手说明啊</p>
        </div>

        <div class="p_right">
          <a-button type="primary" style="margin-left: 15px"> 加电力 </a-button>
          <a-button type="primary" style="margin-left: 15px"> 减电力 </a-button>
          <a-button type="primary" style="margin-left: 15px"> 展示歌手 </a-button>
        </div>
      </div>
      <a-card style="width: 100%"> 
        <a-row>
          <a-col style="position: relative" v-for="(item, index) in 6" :key="index">
            <card title="电音人" :index="index" list="30"></card>
          </a-col>
        </a-row>
      </a-card>
    </div> 
  </div>
</template>

<script>
import card from "@/components/card.vue";
export default {
  components: {
    card,
  },
  data() {
    return {
      activeKey: 0,
      listData: [
        {
          href: "https://www.antdv.com/",
          title: `艺人列表1`,
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          description: "艺人简介，对的我就是艺人怎么了，艺人啊艺人",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        },
        {
          href: "https://www.antdv.com/",
          title: `艺人列表2`,
          avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          description: "艺人简介，对的我就是艺人怎么了，艺人啊艺人",
          content:
            "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        },
      ],
      dataSource: ["艺人1", "艺人2", "艺人3"],
      methods: {
        filterOption(input, option) {
          return (
            option.componentOptions.children[0].text
              .toUpperCase()
              .indexOf(input.toUpperCase()) >= 0
          );
        },
      },
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  .b_info {
    background: #fafafa;
    display: inline-flex;
    width: 100%;
    position: relative;
    .info {
      display: flex;
      flex-direction: column;
      padding-left: 16px;
      .m_text {
        margin: 0;
        margin: auto 0;
      }
    }
    .p_right {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
