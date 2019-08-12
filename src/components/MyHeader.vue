<template>
  <div @mouseleave="close">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">作业监听系统</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" @click="clickButton"></b-navbar-toggle>

      <b-collapse id="nav-collapse" v-bind:visible.sync="this.visible" is-nav>
        <b-navbar-nav>
          <b-nav-item href="javascript:void(0);" @click="intputPassword">服务管理</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="用户管理">
            <b-dropdown-item to="/apply">申请加入</b-dropdown-item>
            <b-dropdown-item to="/delete">删除用户</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item to="/classes">班级查看</b-nav-item>
        </b-navbar-nav>

        <b-modal
          id="modal-password-navbar"
          ref="modal"
          title="输入您的密码"
          @show="resetModal"
          @hidden="resetModal"
        >
          <div class="align-items-center" :class="{'d-none': !isBusying, 'd-flex': isBusying}">
            <b-spinner small class="ml-auto" label="Spinner"></b-spinner>
          </div>
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="Password"
              label-for="password-input-mynavbar"
              invalid-feedback="Password is required"
            >
              <b-form-input
                id="password-input-mynavbar"
                v-model="password"
                type="password"
                required
              ></b-form-input>
            </b-form-group>
          </form>

          <template slot="modal-footer" class="w-100">
            <b-button variant="dark" @click="hideModal">Close</b-button>
            <b-button
              type="submit"
              variant="primary"
              @click="handleSubmit(stopService)"
              v-show="isRunning"
            >Stop</b-button>
            <b-button
              type="submit"
              variant="primary"
              @click="handleSubmit(startService)"
              v-show="!isRunning"
            >Start</b-button>
          </template>
        </b-modal>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="https://github.com/AchanYao/WorkLinstenerService/issues/3">联系作者</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import qs from "qs";
import service from "../service";
import { Message } from "element-ui";
export default {
  name: "MyHeader",
  data() {
    return {
      visible: false,
      isRunning: true,
      password: "",
      isBusying: false
    };
  },
  methods: {
    close: function() {
      this.visible = false;
    },
    clickButton: function() {
      this.visible = !this.visible;
    },
    startService: function() {
      if (this.password == "" || this.password == null) return;
      this.isBusying = true;
      service({
        method: "POST",
        url: "/listener/start",
        data: qs.stringify({
          password: this.password
        })
      })
        .then(result => {
          if (result.data.error_code == 1001) {
            Message.error("密码错误！");
          } else if (result.data.error_code == 0) {
            this.getState();
          } else {
            Message.error("未知错误");
          }
        })
        .catch(err => {
          console.log(err);
          alert("出错啦！");
        })
        .finally(() => {
          this.isBusying = false;
          this.hideModal();
        });
    },
    stopService: function() {
      if (this.password == "" || this.password == null) return;
      this.isBusying = true;
      service({
        method: "POST",
        url: "/listener/stop",
        data: qs.stringify({
          password: this.password
        })
      })
        .then(result => {
          if (result.data.error_code == 1001) {
            Message.error("密码错误！");
          } else if (result.data.error_code == 0) {
            this.getState();
          } else {
            Message.error("未知错误");
          }
        })
        .catch(err => {
          console.log(err);
          alert("出错啦！");
        })
        .finally(() => {
          this.isBusying = false;
          this.hideModal();
        });
    },
    intputPassword: function() {
      this.$root.$emit("bv::show::modal", "modal-password-navbar");
      this.isBusying = false;
    },
    resetModal() {
      this.password = "";
    },
    hideModal() {
      this.$refs["modal"].hide();
    },
    handleSubmit(serviceFunction) {
      if (this.password == "" || this.password == null) return;
      if (
        serviceFunction == null ||
        serviceFunction == undefined ||
        typeof serviceFunction != "function"
      ) {
        if (this.isRunning) {
          this.stopService();
        } else {
          this.startService();
        }
      } else {
        serviceFunction();
      }
    },
    getState() {
      service({
        method: "POST",
        url: "/listener/isRunning"
      })
        .then(res => {
          this.isRunning = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {
    this.getState();
  }
};
</script>

<style scoped>
a.navbar-brand {
  font-family: 黑体;
}
</style>
