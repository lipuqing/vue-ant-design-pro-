<template>
  <a-row style="margin: 10px 0 0 0">
    <a-col :span="6">
      <a-select ref="select" :defaultValue="currSingerName" style="width: 120px">
        <a-select-option
          v-for="item in songerList"
          :value="item.SingerName"
          :key="item.SingerId"
          @click="SingerChange(item)"
          >{{ item.SingerName }}</a-select-option
        >
      </a-select>
      <a-button type="primary" style="margin-left: 15px" @click="delAll()">
        显示全部
      </a-button>
    </a-col>
    <a-col :span="18">
      <div style="position: absolute; right: 20px">
        <span style="margin-right: 5px">设置赛事流程 : </span>
        <a-radio-group v-model:value="currProress" buttonStyle="solid">
          <a-radio-button
            :value="item.label"
            v-for="item in progress"
            :key="item.label"
            @click="setProress(item)"
            size="small"
          >
            {{ item.value }}
          </a-radio-button>
        </a-radio-group>

        <a-button type="primary" style="margin-left: 15px" @click="setrTime()">
          开始计时器
        </a-button>
        <a-button type="primary" style="margin-left: 15px" @click="changeTt()">
          切回天梯榜单
        </a-button>
      </div>
    </a-col>
  </a-row>
  <a-breadcrumb style="margin: 16px 0"> 电音人列表 </a-breadcrumb>
  <a-table
    :columns="columns"
    :data-source="listData"
    :pagination="false"
    :loading="loading"
    size="small"
  >
    <template #avatar="{ record }">
      <a-avatar :size="64" :src="record.avatar" />
    </template>
    <template #isCome="{ record }">
      <a-tag color="processing" v-if="record.OnShow == 1">出场中</a-tag>
      <a-tag color="default" v-else-if="record.OnShow == 0">未出场</a-tag>
      <a-tag color="success" v-else>已出场</a-tag>
    </template>
    <template #ccButton="{ record }">
      <a-row>
        <a-col>
          <a-button type="primary" @click="goBack(record)" size="small"> 出场 </a-button>
          <a-button
            type="primary"
            style="margin-left: 5px"
            @click="feat(record)"
            size="small"
          >
            feat
          </a-button>

          <a-button
            type="primary"
            size="small"
            style="margin-left: 5px"
            @click="changeTt('名字')"
          >
            名字 </a-button
          ><a-button
            type="primary"
            size="small"
            style="margin-left: 5px"
            @click="changeTt('标签')"
          >
            标签
          </a-button>
          <a-button
            type="primary"
            size="small"
            style="margin-left: 5px"
            @click="changeTt('自认为排名')"
          >
            自认为排名 </a-button
          ><a-button
            type="primary"
            size="small"
            style="margin-left: 5px"
            @click="changeTt('真实排名')"
          >
            真实排名
          </a-button>

          <a-button
            type="primary"
            style="margin-left: 5px"
            size="small"
            @click="addVisibleFun(record)"
          >
            增加电量
          </a-button>

          <!-- v-if="!record.SingerName" -->
          <a-button
            type="primary"
            style="margin-left: 5px"
            size="small"
            @click="changeVisibleFun(record)"
          >
            选择阵营
          </a-button>
        </a-col>
      </a-row>
    </template>
    <template #addButton="{ record }">
      <a-row>
        <a-col
          ><a-button type="primary" size="small" @click="addVisibleFun(record)">
            增加电量
          </a-button>
        </a-col>
      </a-row>
    </template>
    <template #changeButton="{ record }">
      <a-row>
        <a-col
          ><a-button
            type="primary"
            v-if="!record.SingerName"
            size="small"
            @click="changeVisibleFun(record)"
          >
            选择阵营
          </a-button>
        </a-col>
      </a-row>
    </template>
    <template #action="{ record }">
      <a-row>
        <a-col
          ><a-button type="danger" style="margin-left: 15px"> 开始表演 </a-button></a-col
        >
        <a-col
          ><a-button type="primary" style="margin-left: 15px"> 结束跑票 </a-button></a-col
        >
      </a-row>
    </template>
  </a-table>
  <a-modal v-model:visible="addVisible" title="增加电量">
    <template #footer>
      <a-button key="back" @click="this.addVisible = false">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleAdd"
        >增加</a-button
      >
    </template>
    <p>增加电量</p>
    <!-- <a-input v-model:value="addVisibleValue" placeholder="输入增加数量" /> -->
  </a-modal>
  <a-modal v-model:visible="changeVisible" title="切换阵营1">
    <template #footer>
      <a-button key="back" @click="this.changeVisible = false">取消</a-button>
      <a-button type="primary" :loading="loading" @click="featEnd">feat</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleChange"
        >确定</a-button
      >
    </template>
    <a-radio-group v-model:value="size">
      <a-radio-button :value="item.SingerName" v-for="item in songerList" :key="item">
        {{ item.SingerName }}
      </a-radio-button>
    </a-radio-group>
  </a-modal>

  <a-back-top />
</template>

<script>
const columns = [
  { title: "序号", width: 50, dataIndex: "index", key: "index", fixed: "left" },
  {
    title: "姓名",
    dataIndex: "PlayerName",
    key: "PlayerName",
    fixed: "left",
  },
  { title: "排名", dataIndex: "num", key: "num" },
  { title: "电量", dataIndex: "DL", key: "dian" },
  {
    title: "增加的电量",
    dataIndex: "DLBuff",
    key: "addDian",
    slots: { customRender: "addDian" },
  },
  {
    title: "是否已出场",
    dataIndex: "OnShow",
    key: "isCome",
    slots: { customRender: "isCome" },
  },
  {
    title: "歌手阵营",
    dataIndex: "SingerName",
    key: "songer",
    slots: { customRender: "songer" },
  },
  {
    title: "操作按钮",
    dataIndex: "ccButton",
    key: "ccButton",
    slots: { customRender: "ccButton" },
  },
  // {
  //   title: "增加电量",
  //   dataIndex: "addButton",
  //   key: "addButton",
  //   slots: { customRender: "addButton" },
  // },
  // {
  //   title: "选择阵营",
  //   dataIndex: "changeButton",
  //   key: "changeButton",
  //   slots: { customRender: "changeButton" },
  // },
];
import card from "@/components/card.vue";
import { entry } from "@/api/api";
const key = "updatable";
export default {
  components: {
    card,
  },
  data() {
    return {
      progress: [
        { label: 0, value: "选手出场" },
        { label: 1, value: "显示金牌榜" },
        { label: 2, value: "金牌榜显示电量" },
        { label: 3, value: "显示背景" },
      ],
      listData: [],
      columns,
      addVisible: false, //change
      changeVisible: false,
      size: "",
      addVisibleValue: 0,
      currItem: {},
      currSingerName: "选择要查看的阵营",
      songerList: [],
      loading: true,
      currProress: "0",
    };
  },
  created() {
    this.getList({ name: "" });
    this.getSongerList();
  },
  methods: {
    async getSongerList() {
      let res = await entry({
        paramData: {},
        asmName: "DJ_所有歌手",
      });
      let that = this;
      that.$nextTick(() => {
        that.songerList = res.result.resultData.ResultTable;
      });
      that.$forceUpdate();
      console.log(that.songerList);
    },
    async getList(data) {
      this.loading = true;
      if (data.name == "选择要查看的阵营") {
        data.name = "";
      }
      let res = await entry({
        paramData: data,
        asmName: "DJ_天梯榜后台",
      });
      let arr = res.result.resultData.ResultTable;
      arr.map((item, index) => {
        item.index = index * 1 + 1;
      });
      this.listData = arr;
      this.loading = false;
    },
    setProress(v) {
      console.log(v);
      // this.currProress = v.target.value * 1;
      // return;
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              Status: v.value,
            },
            asmName: "DJ_设置当前阶段",
          }).then((res) => {
            if (res.success) {
              that.$message.success("操作完成");
              // notification.open({
              //   message: "操作通知",
              //   description: "大屏已切换",
              // });
            }
          });
        },
        onCancel() {},
      });
    },
    setrTime() {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              Id: 9,
              Display: "开始倒计时",
            },
            asmName: "DJ_大屏切换",
          }).then((res) => {
            if (res.success) {
              that.$message.success("操作完成");
            }
          });
        },
        onCancel() {},
      });
    },
    changeTt(text) {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              Display: text ? text : "天梯榜",
              Id: 1,
            },
            asmName: "DJ_大屏切换",
          }).then((res) => {
            if (res.success) {
              that.$message.success("操作完成");
              // notification.open({
              //   message: "操作通知",
              //   description: "大屏已切换",
              // });
            }
          });
        },
        onCancel() {},
      });
    },
    SingerChange(val) {
      this.currSingerName = val.SingerName;
      this.getList({ name: val.SingerName });
    },
    delAll() {
      this.currSingerName = "选择要查看的阵营";
      this.getList({ name: "" });
      this.$forceUpdate();
    },
    goBack(val) {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              PlayerId: val.PlayerId,
            },
            asmName: "DJ_电音人出场",
          }).then((res) => {
            that.getList({ name: that.currSingerName });
          });
        },
        onCancel() {},
      });
    },
    feat(val) {
      let that = this;
      that.$confirm({
        title: "提示",
        content: "确定执行该操作嘛？",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          entry({
            paramData: {
              PlayerId: val.PlayerId,
            },
            asmName: "DJ_设定Feat选手",
          }).then((res) => {
            that.getList({ name: that.currSingerName });
          });
        },
        onCancel() {},
      });
    },
    handleAdd() {
      this.addVisible = false;
      console.log(this.currItem);
      entry({
        paramData: {
          PlayerId: this.currItem.PlayerId,
          DL: 500,
        },
        asmName: "DJ_增加电量",
      }).then((res) => {
        this.addVisibleValue = 0;
        this.getList({ name: this.currSingerName });
      });
    },
    featEnd() {
      // this.changeVisible = false;
      entry({
        paramData: {
          SingerName: this.size,
          PlayerId: this.currItem.PlayerId,
        },
        asmName: "DJ_FEAT结算",
      }).then((res) => {
        this.getList({ name: this.currSingerName });
      });
    },
    handleChange() {
      this.changeVisible = false;
      console.log(this.currItem);
      entry({
        paramData: {
          Name: this.size,
          PlayerId: this.currItem.PlayerId,
        },
        asmName: "DJ_选择阵营",
      }).then((res) => {
        this.getList({ name: this.currSingerName });
      });
    },
    addVisibleFun(val) {
      this.addVisible = true;
      this.currItem = val;
      this.$forceUpdate();
    },
    changeVisibleFun(val) {
      this.changeVisible = true;
      this.currItem = val;
      console.log(this.currItem);
      this.size = val.SingerName;
    },
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
