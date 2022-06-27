<template>
  <a-row style="margin: 10px 0 0 0">
    <a-col :span="12">
      <a-button type="primary" @click="start()"> 开始跑票 </a-button>
      <a-button type="primary" style="margin-left: 15px" @click="stop()">
        结束跑票
      </a-button>
    </a-col>
    <a-col :span="12"> </a-col>
  </a-row>
  <a-breadcrumb style="margin: 16px 0"> 歌手列表 </a-breadcrumb>
  <a-table
    :columns="columns"
    :data-source="SongerList"
    :pagination="false"
    :loading="loading"
    size="small"
  >
    <template #avatar="{ record }">
      <a-avatar :size="64" :src="record.Avatar" />
    </template>
    <template #playtype="{ record }">
      <a-tag color="processing" v-if="record.OnShow == 1"> 进行中</a-tag>
      <a-tag color="default" v-else-if="record.OnShow == 0"> 未开始</a-tag>
      <a-tag color="success" v-else>已完成</a-tag>
    </template>
    <template #type="{ record }">
      <a-tag color="processing" v-if="record.IsPublic == 1"> 已宣布 </a-tag>
      <a-tag color="default" v-else-if="record.IsPublic == 0"> 未宣布</a-tag> 
    </template>
    <template #zyButton="{ record }">
      <a-row>
        <a-col
          ><a-button type="primary" size="small" @click="xuanbu(record)">
            宣布
          </a-button></a-col
        >
      </a-row>
    </template>
    <template #action="{ record }">
      <a-row>
        <a-col
          ><a-button type="danger" size="small" @click="startShow(record)">
            开始表演
          </a-button></a-col
        >
      </a-row>
    </template>
  </a-table>
</template>

<script>
const columns = [
  { title: "序号", width: 50, dataIndex: "index", key: "index", fixed: "left" },
  {
    title: "歌手姓名",
    dataIndex: "SingerName",
    key: "SingerName",
    fixed: "left",
  },
  { title: "排名", dataIndex: "num", key: "num" },
  { title: "总电量", dataIndex: "DL", key: "dian" },
  {
    title: "表演状态",
    dataIndex: "IsShow",
    key: "playtype",
    slots: { customRender: "playtype" },
  },
  {
    title: "阵营宣布状态",
    dataIndex: "zyButton",
    key: "type",
    slots: { customRender: "type" },
  },
  {
    title: "阵营操作",
    dataIndex: "zyButton",
    key: "zyButton",
    slots: { customRender: "zyButton" },
  },
  {
    title: "其他操作",
    key: "action",
    fixed: "right",
    slots: { customRender: "action" },
  },
];

const data = [
  {
    num: 1,
    name: "张学友",
    list: 5,
    dian: "600",
    playType: 0,
    zyType: -1,
    zyButton: 0,
    avatar: "https://oss.canxingtv.com/wl/file/20220615180913921-601545299.png",
  },
  {
    num: 1,
    name: "张学友",
    list: 5,
    dian: "600",
    playType: 0,
    zyType: -1,
    zyButton: 0,
    avatar: "https://oss.canxingtv.com/wl/file/20220615180913921-601545299.png",
  },
];
import card from "@/components/card.vue";
import { entry } from "@/api/api";
import { notification } from "ant-design-vue";
const key = "updatable";
export default {
  components: {
    card,
  },
  data() {
    return {
      data,
      columns,
      SongerList: [],
      loading: true,
    };
  },
  created() {
    this.getSongerList();
  },
  methods: {
    start() {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {},
            asmName: "DJ_开始跑票",
          }).then((res) => {
            that.$message.success("已开始");
          });
        },
        onCancel() {},
      });
    },
    stop() {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {},
            asmName: "DJ_停止跑票",
          }).then((res) => {
            that.$message.success("已停止");
          });
        },
        onCancel() {},
      });
    },
    xuanbu(val) {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              SingerId: val.SingerId,
            },
            asmName: "DJ_宣布歌手",
          }).then((res) => {
            that.getSongerList();
          });
        },
        onCancel() {},
      });
    },
    startShow(val) {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              SingerId: val.SingerId,
            },
            asmName: "DJ_歌手开始表演",
          }).then((res) => {
            that.getSongerList();
          });
        },
        onCancel() {},
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toUpperCase()
          .indexOf(input.toUpperCase()) >= 0
      );
    },
    async getSongerList() {
      this.loading = true;
      let res = await entry({
        paramData: {},
        asmName: "DJ_所有歌手",
      });
      let SongerList = res.result.resultData.ResultTable;
      SongerList.map((item, index) => {
        item.index = index*1+1;
        item.zyButton = 0;
        if (index == 0) {
          this.singer = item;
        }
      });
      this.SongerList = SongerList;
      this.loading = false;
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
