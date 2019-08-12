<template>
  <div class="container">
    <div
      class="align-items-center"
      id="spinner"
      :class="{'d-none': !isBusying, 'd-flex': isBusying}"
    >
      <b-spinner small class="ml-auto" label="Spinner"></b-spinner>
    </div>
    <b-form @submit="onSubmit">
      <div class="form-row">
        <b-form-group class="col-md-6" label="学号：" label-for="input-number">
          <b-form-input
            id="input-number"
            v-model="form.number"
            type="text"
            required
            placeholder="请输入学号"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">请输入11位的学号</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">好的👌</b-form-valid-feedback>
        </b-form-group>
        <b-form-group class="col-md-6" label="姓名：" label-for="input-name">
          <b-form-input
            id="input-name"
            v-model="form.name"
            type="text"
            required
            placeholder="请输入姓名"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email address:" label-for="input-email">
          <b-form-input
            id="input-email"
            v-model="form.email"
            type="email"
            required
            placeholder="请输入电子邮件"
          ></b-form-input>
        </b-form-group>
        <b-form-group class="col-md-6" label="班级选择" label-for="input-class">
          <b-form-select id="input-class" v-model="form.classId" required>
            <template slot="first">
              <option :value="null" disabled>-- 请选择您的班级 --</option>
            </template>
            <option
              v-for="option in options"
              :key="option.id"
              v-bind:value="option.id"
            >{{option.name}}</option>
          </b-form-select>
        </b-form-group>
      </div>
      <div style="padding-top: 15px;">
        <button type="submit" class="btn btn-primary">添加用户</button>
      </div>
    </b-form>
  </div>
</template>

<script>
import service from "../service";
import { Message } from "element-ui";
export default {
  name: "Apply",
  data() {
    return {
      options: [],
      form: {
        email: "",
        name: "",
        number: "",
        classId: null
      },
      isBusying: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.isBusying = true;
      this.$bvModal
        .msgBoxConfirm("确认邮箱：" + this.form.email, {
          title: "添加成员",
          // okVariant: "primary",
          centered: true
        })
        .then(value => {
          if (value === true)
            service({
              method: "POST",
              url: "/users/apply",
              data: this.form
            })
              .then(result => {
                let error_code = result.data.error_code;
                switch (error_code) {
                  case 1011:
                    Message.error("非法邮件地址");
                    this.form.email = "";
                    break;
                  case 1002:
                    Message.error("服务器异常");
                    break;
                  case 0:
                    Message.success("提交成功，请等待管理员同意");
                    this.form = {
                      email: "",
                      name: "",
                      number: "",
                      classId: null
                    };
                    break;
                  default:
                    Message.warning("");
                    break;
                }
              })
              .catch(error => {
                console.log(error);
              })
              .finally(() => {
                this.isBusying = false;
              });
        });
    }
  },
  mounted: function() {
    service({
      method: "POST",
      url: "/classes/get"
    })
      .then(res => {
        this.options = res.data.data.class_list;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    validation() {
      return this.form.number.length == 11;
    }
  }
};
</script>

<style scoped>
div.container {
  padding: 50px;
}
.form-group {
  width: 100%;
  padding: 5px;
}
#spinner {
  position: absolute;
  top: 70px;
  right: 20px;
}
</style>
