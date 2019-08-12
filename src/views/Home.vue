<template>
  <div>
    <div class="container">
      <h2>概览</h2>
      <a-block title="应用说明">
        <p>山西农业大学软件学院教务系统作业监听服务，由我独立开发独立维护，用来实现当教务系统有新作业布置时发送提醒，防止不知道有作业而错过提交。</p>
      </a-block>
      <a-block title="原理说明">
        <b-link
          href="http://blog.yaoyuxuan.cn/2019/05/25/%E5%AD%A6%E9%99%A2%E6%95%99%E5%8A%A1%E7%B3%BB%E7%BB%9F%E4%BD%9C%E4%B8%9A%E7%9B%91%E5%90%AC%E7%9A%84%E5%AE%9E%E7%8E%B0/"
          target="_blank"
        >点击查看</b-link>
      </a-block>
      <a-block title="使用教程">
        <ol>
          <li>从班级查看中查找到自己对应的班级</li>
          <li>若没有需要联系作者添加</li>
          <li>用户管理>申请加入</li>
          <li>等待班级管理员同意</li>
          <li>Success</li>
        </ol>
      </a-block>
      <a-block title="注意">
        <ul>
          <li>新作业提醒是以邮件方式提醒，微信通知之类暂时还没做的打算</li>
          <li>为了确保邮箱正确性以及确认是所申请班级成员，每个班级会有管理员进行审核，申请流程比较繁琐敬请见谅</li>
          <li>暂时就这些了，想到再加</li>
        </ul>
      </a-block>
      <a-block title="意见反馈">
        <b-list-group-item
          variant="info"
          href="https://github.com/AchanYao/WorkLinstenerService/issues/1"
          target="_blank"
        >点击添加意见</b-list-group-item>
      </a-block>
    </div>
    <footer class="footer mt-auto py-3">
      <div class="text-center container">
        <p class="text-muted">&copy; 2019-2020</p>
        <p class="text-muted font-italic">到底了呢</p>
      </div>
    </footer>
  </div>
</template>

<script>
import ABlock from "@/components/AnnouncementBlock";
import service from "../service";
export default {
  name: "Home",
  components: {
    ABlock
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped>
footer {
  background-color: #f5f5f5;
  bottom: 0;
  width: 100%;
}
</style>
