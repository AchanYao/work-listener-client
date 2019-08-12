<template>
  <div class="container text-center">
    <div :class="{'d-none': !isShow}">
      <b-spinner style="width: 3rem; height: 3rem;" variant="info" type="grow" label="Spinning"></b-spinner>
    </div>
    <b-alert :show="isSuccess" variant="success">
      <h4 class="alert-heading text-center">Success!</h4>
    </b-alert>
    <b-alert :show="isFail" variant="warning">
      <h4 class="alert-heading text-center">Failed!</h4>
    </b-alert>
  </div>
</template>

<script>
import service from "../service";
import qs from "qs";
export default {
  data() {
    return {
      isShow: true,
      isSuccess: false,
      isFail: false
    };
  },
  mounted: function() {
    this.isShow = true;
    var toAdmin = this.$route.query.toadmin;
    var url = "/users/";
    if (toAdmin == null || toAdmin == undefined || toAdmin != 1) {
      url = "/users/confirm";
    } else if (toAdmin == 1) {
      url = "/users/add";
    }
    service({
      url: url,
      method: "POST",
      data: qs.stringify({
        n: this.$route.query.n,
        r: this.$route.query.r
      })
    })
      .then(res => {
        if (res.data.error_code == 0) {
          this.isSuccess = true;
        } else {
          this.isFail = true;
          console.log(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        this.isFail = true;
      })
      .finally(() => {
        this.isShow = false;
      });
  }
};
</script>

<style scoped>
</style>