<template>
  <div>
    <a-row style="margin-top: 10px">
      <a-button type="primary" style="margin-left: 15px"> 切回天梯榜单 </a-button>
      <a-button type="primary" style="margin-left: 15px"> 重置出场 </a-button>
    </a-row>
    <a-row style="margin: 10px 0 0 15px">
      <a-auto-complete
        :data-source="dataSource"
        style="width: 200px"
        placeholder="筛选阵容"
        :filter-option="filterOption"
      />
      <a-button type="primary" style="margin-left: 15px"> 切换 </a-button>
    </a-row>
    <a-breadcrumb style="margin: 16px 0"> 电音人列表 </a-breadcrumb>
    <div class="box" v-for="(it, ix) in 30" :key="ix">
      <div class="b_info">
        <a-avatar
          :size="64"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div class="info">
          <p class="m_text">
            <span style="margin-right: 30px">电音人姓名</span>
            <span style="margin-right: 30px">电量: 666</span>
            <a-tag :color="ix == 0 ? 'red' : 'cyan'">
              {{ ix == 0 ? "展示中" : "未出场" }}
            </a-tag>
          </p>
          <p class="m_text">
            电音人说明啊电音人说明啊电音人说明啊电音人说明啊电音人说明啊
          </p>
        </div>

        <div class="p_right">
          <a-button v-if="ix != 0" type="danger" style="margin-left: 15px">
            出场展示
          </a-button>
          <a-button v-else type="primary" style="margin-left: 15px"> 展示中 </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card.vue";
import { entry } from "@/api/api";
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
    };
  },
  created() {
    // console.log('userLogin()')
    entry({
      paramData: {
        PlayerId: "2406C655-0CE8-42E0-9800-5111A5BEA9D8",
      },
      asmName: "DJ_电音人出场",
    }).then((res) => {
      console.log(res);
    });
  },
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
