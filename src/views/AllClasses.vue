<template>
  <div class="wrapper">
    <div class="container">
      <b-table
        hover
        fixed
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
        <template slot="emptyfiltered" slot-scope="scope">
          <h4 class="text-center" style="font-family: 楷体;">{{ scope.emptyFilteredText }}</h4>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import service from "../service";
export default {
  data() {
    return {
      items: [],
      fields: {
        id: {
          label: "班级id"
        },
        name: {
          label: "班级"
        },
        workNum: {
          label: "作业数目"
        }
      },
      isBusy: false,
      headClass: ["thead-light"],
      empty: {
        emptyText: "暂无数据"
      }
    };
  },
  mounted: function() {
    this.isBusy = true;
    service({
      url: "/classes/all",
      method: "POST"
    })
      .then(res => {
        this.items = res.data.data.class_list;
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
};
</script>

<style scoped>
div.container {
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>