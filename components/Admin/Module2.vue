<template>
  <div class="content-subtab border-top-left">
    <form class="g-3 mt-3" method="post" @submit.prevent="onAddsubModule">
      <div class="row mb-4 align-items-center">
        <div class="col-md-4">
          <label for="" class="form-label">Module</label>
          <select
            v-model="ModuleId"
            class="form-select"
            aria-label="Default select example"
          >
         <option value="0">Please Select</option>
            <option
              v-for="md in modulelist"
              v-bind:key="md.id"
              v-bind:value="md.id"
            >
              {{ md.module_name }}
            </option>
          </select>
        </div>

        <div class="col-md-3">
          <label for="" class="form-label">Sub Module Code</label>
          <input type="text" class="form-control" placeholder="Enter Code" v-model="subcode" />
        </div>

        <div class="col-md-4">
          <label for="" class="form-label">Sub Module Name</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter Sub Module Name" v-model="subname"
          />
        </div>
      </div>
      <p v-if="errors.length">
<ul>
        <li style="color:red"  v-for='err in errors'
    :key='err' >
          {{ err }}
        </li>
      </ul>
        </p>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success btn-text" v-if="Id">
        <i class="fa fa-save"></i> Update
        </button>
         <button type="submit" class="btn btn-success btn-text" v-if="!Id">
          <i class="fa fa-plus"></i> Add New
        </button>
      </div>
    </form>



    <div class="table-title">
      <h3>List of Modules</h3>
    </div>
    <table class="table table-striped data-table5 font-13 display nowrap" style="width: 100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Module</th>
          <th>Sub Module Code</th>
          <th>Sub Module Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
           <tr v-for="(smod, index) in list" :key="index">
         <td>{{index+1}}</td>
          <td>{{smod.module_name}}</td>
         <td>{{smod.sub_module_code}}</td>
         <td>{{smod.sub_module_name}}</td>
          <td class="td">
            <a class="view" @click="editsubmodule(smod)"
              ><i class="fa fa-edit"></i
            ></a>
            <a @click="deletesubmodule(smod)" class="action-icon icon-danger"
              ><i class="fa fa-trash-alt"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "Module2",
  setup() {},
  data() {
    return {
      Id: 0,
      ModuleId: 0,
      subcode: "",
      subname: "",
      errors: [],
      userdetails: null,
      modulelist: [],
      list: [],
    };
  },
  mounted() {
    const headers = {
      Authorization: "Bearer " + this.userdetails.access_token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const axios = require("axios").default;
    axios
      .get(
        `${this.$axios.defaults.baseURL}` +
          "screen-module/sub-module-list",
        { headers }
      )
      .then((resp) => {
        this.list = resp.data.list;
        console.log(this.list);
        $(document).ready(function () {
          $(".data-table5").DataTable({
            searching: false,
            bLengthChange: false,
            bInfo: false,
            // autoWidth: false,
            // responsive: true,
            scrollX: true,
            language: {
              paginate: {
                next: '<i class="fad fa-arrow-to-right"></i>', // or '→'
                previous: '<i class="fad fa-arrow-to-left"></i>', // or '←'
              },
            },
          });
          $('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
            $($.fn.dataTable.tables(true))
              .DataTable()
              .columns.adjust()
              .responsive.recalc();
          });
        });
      })
      .catch ((err) => {
        this.loader = false;
        this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + err,
                  footer: ''
                });

        console.error(err);
      });
  },
  beforeMount() {
    this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    this.GetModuleList();
  },
  methods: {
    async onAddsubModule() {
      this.errors = [];
      try {
        if (this.ModuleId <= 0) {
          this.errors.push("Module is required.");
        }
        if (!this.subcode) {
          this.errors.push("Sub Module Code is required.");
        }
        if (!this.subname) {
          this.errors.push("Sub Module Name is required.");
        } else {
          const headers = {
            Authorization: "Bearer " + this.userdetails.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          };
          if (this.Id <= 0) {
            const response = await this.$axios.post(
              "screen-module/add-sub-module",
              {
                module_id: this.ModuleId,
                added_by: this.userdetails.user.id,
                sub_module_name: this.subname,
                sub_module_code: this.subcode,
              },
              { headers }
            );
            if (response.data.code == 200 || response.data.code == "200") {
              this.$swal.fire('Successfully Added', '', 'success');
              this.resetmodel();
            } else {
              this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + this.error,
                  footer: ''
                });
            }
          } else {
           
            const response = await this.$axios.post(
              "screen-module/updateSubModule",
              {
                id :  this.Id,
                module_id: this.ModuleId,
                added_by: this.userdetails.user.id,
                sub_module_name: this.subname,
                sub_module_code: this.subcode,
              },
              { headers }
            );
            if (response.data.code == 200 || response.data.code == "200") {
              this.$swal.fire('Successfully Updated', '', 'success');
              this.resetmodel();
            } else {
              this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + this.error,
                  footer: ''
                });
            }
          }
        }
      } catch (e) {
        this.errors.push = e;
      }
    },
    async resetmodel() {
      this.subcode = "";
      this.subname = "";
      this.ModuleId = 0;
      this.Id = 0;
      this.errors = [];
      this.GetList();
    },
    async GetModuleList() {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.get("screen-module/list", { headers });
      if (response.data.code == 200 || response.data.code == "200") {
        this.modulelist = response.data.list;
      } else {
        this.modulelist = [];
      }
    },
    async GetList() {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.get("screen-module/sub-module-list", {
        headers,
      });
      if (response.data.code == 200 || response.data.code == "200") {
        this.list = response.data.list;
      } else {
        this.list = [];
      }
    },
    async editsubmodule(data) {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.post(
        "screen-module/sub-module-list-by-sub-module-id",
        { sub_module_id: data.id },
        {
          headers,
        }
      );
      console.log('my response',response.data.list[0].sub_module_name);
      if (response.data.code == 200) {
        this.subname = response.data.list[0].sub_module_name;
        this.ModuleId = response.data.list[0].module_id;
        this.subcode = response.data.list[0].sub_module_code;
        this.Id = data.id;
      } else {
        this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + this.error,
                  footer: ''
                });
      }
    },
    async deletesubmodule(data) {
      try {
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.post(
          "screen-module/removeSubModule",
          { added_by: this.userdetails.user.id, sub_module_id: data.id },
          { headers }
        );
        if (response.data.code == 200) {
          this.$swal.fire('Deleted Successfully', '', 'success');
          this.GetList();
        } else {
          this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + JSON.stringify(response.data.message),
                  footer: ''
                });
        }
      } catch (e) {this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + JSON.stringify(response.data.message),
                  footer: ''
                });
      }
    },
  },
};
</script>
