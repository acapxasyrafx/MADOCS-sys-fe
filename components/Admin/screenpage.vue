<template>
  <div class="content-subtab border-top-left">
    <form class="g-3 mt-3" method="post" @submit.prevent="onAddscreen">
      <div class="row mb-4">
        <div class="col-md-6">
          <label for="" class="form-label">Module</label>
          <select v-model="ModuleId" class="form-select" aria-label="Default select example"
            @change="onsubmodelbind($event)">
            <option value="">Please Select</option>
            <option v-for="mod in modulelist" v-bind:key="mod.id" v-bind:value="mod.id">
              {{ mod.module_name }}
            </option>
          </select>
        </div>

        <div class="col-md-6" v-show="IsSubmodule">
          <label for="" class="form-label">Sub Module</label>
          <select v-model="SubmoduleId" class="form-select" aria-label="Default select example">
            <option value="0">Please Select</option>
            <option v-for="submod in submodulelist" v-bind:key="submod.id" v-bind:value="submod.id">
              {{ submod.sub_module_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-md-6">
          <label for="" class="form-label">Screen Name</label>
          <input type="text" class="form-control" placeholder="Enter Screen Name" v-model="screenname" />
        </div>

        <div class="col-md-6">
          <label for="" class="form-label">Page Route</label>
          <input type="text" class="form-control" placeholder="Enter Page Route" v-model="pageroute" />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-6">
          <label for="" class="form-label">Description</label>
          <input type="text" class="form-control" placeholder="Enter Description" v-model="description" />
        </div>
        <div class="col-md-6">
          <label for="" class="form-label">Icon</label>
          <input type="text" class="form-control" placeholder="Enter Icon" v-model="icon" />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-md-6">
          <label for="" class="form-label">Index</label>
          <input type="text" class="form-control" placeholder="Enter Index" v-model="index" />
        </div>
      </div>
      <p v-if="errors.length">
      <ul>
        <li style="color:red" v-for='err in errors' :key='err'>
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
      <h3>List of Screens</h3>
    </div>
    <table class="table table-striped data-table6 font-13 display nowrap" style="width: 100%">
      <thead>
        <tr>
          <th>No</th>
          <th>Module</th>
          <th>Sub Module</th>
          <th>Screen Name</th>
          <th>Page Route</th>
          <th>Description</th>
          <th width="80px">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(scn, index) in list" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ scn.module_name }}</td>
          <td>{{ scn.sub_module_name }}</td>
          <td>{{ scn.screen_name }}</td>
          <td>{{ scn.screen_route }}</td>
          <td>{{ scn.screen_description }}</td>
          <td class="td">
            <a class="edit" @click="editsscreen(scn)"><i class="fa fa-edit"></i></a>
            <a @click="deletescreen(scn)" class="action-icon icon-danger"><i class="fa fa-trash-alt"></i></a>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div class="modal fade" id="errorpopupscreen" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm test-connection">
          <div class="modal-content">
            <div class="modal-body">
              <p>Something went wrong!</p>
              <a>
                {{ this.message }}
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "screenpage",
  data() {
    return {
      Id: 0,
      ModuleId: "",
      SubmoduleId: "0",
      screenname: "",
      pageroute: "",
      description: "",
      icon: "",
      index: 1,
      errors: [],
      userdetails: null,
      modulelist: [],
      submodulelist: [],
      list: [],
      IsSubmodule: true,
      loader: false,
      message: "The screen route has already been taken.",
    };
  },
  mounted() {
    this.loader = false;
    const headers = {
      Authorization: "Bearer " + this.userdetails.access_token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const axios = require("axios").default;
    axios
      .get(
        `${this.$axios.defaults.baseURL}` + "screen-module/getScreenPageList",
        { headers }
      )
      .then((resp) => {
        this.list = resp.data.list;
        this.loader = false;
        $(document).ready(function () {
          $(".data-table6").DataTable({
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
    async onsubmodelbind(event) {
      this.IsSubmodule = true;
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.post(
        "screen-module/sub-module-list-by-module-id",
        { module_id: event.target.value },
        { headers }
      );

      if (response.data.code == 200 || response.data.code == "200") {
        this.submodulelist = response.data.list;
      } else {
        this.IsSubmodule = false;
        this.submodulelist = [];
      }
    },
    async onAddscreen() {
      this.errors = [];
      try {
        if (!this.ModuleId) {
          this.errors.push("Module is required.");
        }
        if (!this.screenname) {
          this.errors.push("Screen Name is required.");
        }
        if (!this.pageroute) {
          this.errors.push("Page Route is required.");
        }
        if (!this.description) {
          this.errors.push("Description is required.");
        }
        if (!this.icon) {
          this.errors.push("Icon is required.");
        }
        if (!this.index) {
          this.errors.push("Index is required.");
        }
        if (
          this.ModuleId &&
          this.SubmoduleId &&
          this.screenname &&
          this.pageroute &&
          this.description &&
          this.icon &&
          this.index
        ) {
          const headers = {
            Authorization: "Bearer " + this.userdetails.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
          };
          if (this.Id <= 0) {
            const response = await this.$axios.post(
              "screen-module/add-screen-page",
              {
                module_id: this.ModuleId,
                sub_module_id: this.SubmoduleId,
                added_by: this.userdetails.user.id,
                screen_name: this.screenname,
                screen_route: this.pageroute,
                screen_description: this.description,
                icon: this.icon,
                index: this.index,
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
            })
            }
          } else {
            const response = await this.$axios.post(
              "screen-module/updateScreenModule",
              {
                id: this.Id,
                module_id: this.ModuleId,
                sub_module_id: this.SubmoduleId,
                added_by: this.userdetails.user.id,
                screen_name: this.screenname,
                screen_route: this.pageroute,
                screen_description: this.description,
                icon: this.icon,
                index: this.index,
              },
              { headers }
            );
            console.log(response.data.message);
            if (response.data.code == 200 || response.data.code == "200") {
              this.$swal.fire('Successfully Updated', '', 'success');
              this.resetmodel();
            } else {
              this.message = JSON.stringify(response.data.message);
              this.$swal.fire({
              icon: 'error',
              title: 'Oops... Something Went Wrong!',
              text: 'the error is: ' + this.error,
            })
            }
          }
        }
      } catch (e) {
        this.errors.push = e;
      }
    },
    async resetmodel() {
      this.ModuleId = "";
      this.SubmoduleId = 0;
      this.screenname = "";
      this.pageroute = "";
      this.description = "";
      this.Id = 0;
      this.index = 1;
      this.icon = "";
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
      const response = await this.$axios.get(
        "screen-module/getScreenPageList",
        {
          headers,
        }
      );
      if (response.data.code == 200 || response.data.code == "200") {
        this.list = response.data.list;
      } else {
        this.list = [];
      }
    },
    async editsscreen(data) {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.get(
        "screen-module/getScreenModuleListById?screen_id=" + data.screen_id,
        {
          headers,
        }
      );
      if (response.data.code == 200) {
        this.screenname = response.data.list[0].screen_name;
        this.pageroute = response.data.list[0].screen_route;
        this.description = response.data.list[0].screen_description;
        this.ModuleId = response.data.list[0].module_id;
        this.SubmoduleId = response.data.list[0].sub_module_id;
        this.icon = response.data.list[0].icon;
        this.index = response.data.list[0].index_val;
        this.Id = data.screen_id;
        const response1 = await this.$axios.post(
          "screen-module/sub-module-list-by-module-id",
          { module_id: response.data.list[0].module_id },
          { headers }
        );
        if (response1.data.code == 200 || response1.data.code == "200") {
          this.submodulelist = response1.data.list;
        } else {
          this.submodulelist = [];
        }
      } else {
        this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + this.error,
                  footer: ''
                });
      }
    },
    async deletescreen(data) {
      try {
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.post(
          "screen-module/removeScreenModule",
          { added_by: this.userdetails.user.id, screen_id: data.screen_id },
          { headers }
        );
        console.log("my delete resp", response.data);
        if (response.data.code == 200) {
          this.$swal.fire('Successfully Delete', '', 'success');
          this.GetList();
        } else {
            this.message = JSON.stringify(response.data.message);
            this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + JSON.stringify(response.data.message),
                  footer: ''
                });
        }
      } catch (e) {
        this.$swal.fire({
                  icon: 'error',
                  title: 'Oops... Something Went Wrong!',
                  text: 'the error is: ' + e,
                  footer: ''
                });
      }
    },
  },
};
</script>
