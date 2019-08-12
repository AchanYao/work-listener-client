<template>
  <div class="container">
    <b-table
      hover
      outlined
      :thead-class="headClass"
      :busy="isBusy"
      :items="items"
      :fields="fields"
      show-empty
      :emptyText="empty.emptyText"
    >
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <template slot="empty" slot-scope="scope">
        <h4 class="text-center" style="font-family: 楷体;">{{ scope.emptyText }}</h4>
      </template>
      <template slot="option" slot-scope="data">
        <a href="javascript:void(0);" @click="removeMember(`${data.value}`)">删除</a>
      </template>
    </b-table>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="输入您的密码"
      @show="resetModal"
      @hidden="handleCancel"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Password"
          label-for="password-input-allmember"
          invalid-feedback="Password is required"
        >
          <b-form-input id="password-input-allmember" v-model="password" type="password" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal id="error-modal" title="密码错误" header-bg-variant="danger" header-text-variant="light"></b-modal>
  </div>
</template>

<script>
import service from "../service";
import qs from "qs";
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "number",
          label: "学号"
        },
        {
          key: "name",
          label: "姓名"
        },
        {
          key: "email",
          label: "邮箱"
        },
        {
          key: "option",
          label: "操作",
          formatter: (value, key, item) => {
            return item.number;
          }
        }
      ],
      isBusy: false,
      headClass: ["thead-light"],
      empty: {
        emptyText: "暂无数据"
      },
      password: ""
    };
  },
  methods: {
    removeMember: function(number) {
      this.$bvModal
        .msgBoxConfirm("您将要删掉一些东西", {
          title: "确认？",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value == true) {
            service({
              method: "POST",
              url: "/users/delete",
              data: qs.stringify({
                number: number,
                password: this.password
              })
            }).then(result => {
              this.getData();
            });
          }
        });
    },
    intputPassword: function() {
      this.$root.$emit("bv::show::modal", "modal-prevent-closing");
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    resetModal() {
      this.password = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
      this.getData();
    },
    handleCancel() {
      if (this.password == null || this.password == "")
        this.$router.push({ path: "/" });
    },
    getData() {
      service({
        url: "/users/get",
        method: "POST",
        data: qs.stringify({
          password: this.password
        })
      })
        .then(res => {
          this.items = res.data.data.users;
        })
        .catch(err => {
          console.log(err);
          this.empty.emptyText = "Error";
          this.items = [];
        })
        .finally(() => {
          this.isBusy = false;
        });
    }
  },
  mounted: function() {
    this.isBusy = true;
    this.password = this.$route.params.password;
    if (this.password == null || this.password == "") this.intputPassword();
    else this.intputPassword();
  }
};
</script>

<style scoped>
div.container {
  padding-top: 3rem;
  padding-bottom: 3rem;
  overflow-x: auto;
}
@media (max-width: 768px) {
  table {
    min-width: 505;
  }
}
</style>
