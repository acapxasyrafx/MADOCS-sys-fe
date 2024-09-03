<template>
    <div id="layoutSidenav">
      <CommonSidebar />
      <div id="layoutSidenav_content">
        <CommonHeader />
        <main>
          <div class="container-fluid px-4">
            <div class="page-title">
              <h1>Staff Management</h1>
            </div>
            <div class="row">
              <div class="card mb-4">
                <div class="card-header icon-title"><a href="#"><i class="fa fa-users"></i></a><h4>Staff Profile</h4></div>
                <div class="card-body">
                  <nav>
                    <ul id="nav-tab" role="tablist" class="nav sub-tab">
                      <li class="nav-item">
                        <a data-bs-toggle="tab" href="#nav-home1" role="tab" aria-controls="nav-home" aria-selected="true" class="nav-link active">Edit Staff Profile</a>
                      </li>
                    </ul>
                  </nav>
                 
                  <div id="nav-home1" role="tabpanel" class="tab-pane fade show active">
                    <div class="content-subtab">
                      <form id="staffForm" class="g-3 mt-3">
                        <!--row 1-->
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="namefield" class="form-label">Name<span style="color:red">*</span></label>
                            <input
                              id="namefield"
                              type="text"
                              class="form-control"
                              placeholder="Enter Name"
                              v-model="name"
                              v-on:keypress="isLetter($event)"
                            />
                          </div>

                          <div class="col-md-6 mb-4">
                            <label for="icfield" class="form-label">NRIC Number<span style="color:red">*</span></label>
                            <input
                            id="icfield"
                              type="text"
                              :maxlength="12"
                              class="form-control"
                              placeholder="Enter NRIC Number"
                              v-model="nricno"
                              v-on:keypress="NumbersOnly"/>
                              <Error :message="nricerror" v-if="nricerror" />
                          </div>
                        </div>
                        <!--row 2-->
                        <div class="row">
                          <div class="col-md-6 mb-4">
                            <label for="contactfield" class="form-label">Contact Number<span style="color:red">*</span></label>
                            <input
                              id="contactfield"
                              type="text"
                              class="form-control"
                              placeholder="Enter Contact Number"
                              v-model="contact"
                              :maxlength="12"
                              v-on:keypress="NumbersOnly" />
                          </div>
                          <div class="col-md-6 mb-4">
                            <label for="emailfield" class="form-label">Email Address<span style="color:red">*</span></label>
                            <input
                              id="emailfield"
                              type="text"
                              class="form-control"
                              placeholder="Enter Email Address"
                              v-model="email"
                              @blur="validateEmail" />
                          </div>
                        </div>
                        <!--row 3-->
                        <div class="row">
                        <div class="col-md-6 mb-4">
                        <label for="rolefield" class="form-label">Role<span style="color:red">*</span></label>
                        <select
                          id="rolefield"
                          v-model="roleId"
                          class="form-select"
                          aria-label="Default select example"
                        >
                        <option value="">Please Select</option>
                          <option
                            v-for="role in rolelist"
                            v-bind:key="role.id"
                            v-bind:value="role.id"
                          >
                            {{ role.role_name }}
                          </option>
                        </select>
                        </div>
                        <div class="col-md-6 mb-4">
                        <label for="managerfield" class="form-label">Reporting Manager<span style="color:red">*</span></label>
                        <select
                          id="managerfield"
                          v-model="managerId"
                          class="form-select"
                          aria-label="Default select example"
                        >
                        <option value="">NOT APPLICABLE</option>
                          <option
                            v-for="manager in managerlist"
                            v-bind:key="manager.staff_id"
                            v-bind:value="manager.staff_id"
                          >
                            {{ manager.name }}
                          </option>
                        </select>
                        </div>
                        </div>
                        <!--row 4-->
                        <div class="row">
                        <div class="col-md-6 mb-4">
                        <label for="rolefield" class="form-label">Status<span style="color:red">*</span></label>
                        <select
                          id="rolefield"
                          v-model="status"
                          class="form-select"
                          aria-label="Default select example"
                        >
                        <option value="">Please Select</option>
                          <option value="0">Active</option>
                          <option value="1">Inactive</option>
                          
                        </select>
                        </div>
                        
                        </div>
                        
                        <!-- error message -->
                        <p v-if="errors.length"><ul><li style="color:red"  v-for='err in errors' :key='err'>{{ err }}</li></ul></p>
                        <br>
                        <br>
                        <!--button-->
                        <div class="form-foter mt-3">
                          <a href="/app/modules/staff-management/staff-record" class="btn btn-primary btn-text"><i class="fa fa-arrow-alt-to-left"></i> Back</a>
                          <div class="ml-auto" id="hidebutton" ref="hidebutton">
                            <button type="submit" @click.prevent="onDelete()" class="btn btn-danger btn-text"> <i class="fa fa-trash"></i> delete</button>
                            <button type="submit" @submit.prevent="onUpdate" class="btn btn-success btn-text"> <i class="fa fa-save"></i> update</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  <script>
  import CommonHeader from '../../../components/CommonHeader.vue';
  import CommonSidebar from "../../../components/CommonSidebar.vue";
  export default {
    components: { CommonSidebar, CommonHeader },
    name: "new-staff",
    data() {
      return {
        name: "",
        nricno: "",
        loginId: "",
        roleId: "",
        email: "",
        contact:"",
        status:"0",
        managerId:"",
        rolelist:[],
        managerlist:[],
        errors: [],
        userdetails: null,
        nricerror: null,
        
      };
    },
    beforeMount() {
    this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    let urlParams = new URLSearchParams(window.location.search);
    this.Id = urlParams.get("id"); //staff_id
  
      this.GetRoleList();
      this.GetManagerList();
      this.GetStaffInfo();

      this.status="0";
      this.managerId="";
    },
    mounted() {
    
    },
    methods: {
      async GetStaffInfo() {
      const headers = {
        Authorization: "Bearer " + this.userdetails.access_token,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const response = await this.$axios.post(
        "staff-record/getStaffListbyId",
        { staff_id: this.Id },
        { headers }
      );
  
     
      if (response.data.code == 200 || response.data.code == "200") {
       

        this.name = response.data.list.name;
        this.nricno = response.data.list.nric_no;
        this.contact = response.data.list.contact_no;
        this.email = response.data.list.email;
        this.roleId = response.data.list.role_id;
        this.managerId = response.data.list.manager_id;
        if (response.data.list.manager_id == "" || response.data.list.manager_id == null)
        {this.managerId=""
        };
        this.status = response.data.list.status;
        
      }
    },
      async GetRoleList() {
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.get("role/getRoleList",{headers});
        this.rolelist = response.data.list;
      },
      async GetManagerList() {
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };

        const response = await this.$axios.get("staff-record/getStaffList/" + "manager",{headers,});
        this.managerlist = response.data.list;
      },
   
      async onUpdate() {
  
        this.$swal.fire({title: 'Update this record?',showCancelButton: true,confirmButtonText: 'Yes',cancelButtonText: 'Cancel',reverseButtons: true}
        ).then(async (result) =>{

          if (result.isConfirmed){
          this.errors = [];
          if (!this.name) {this.errors.push("Name is required.");}
          if (!this.nricno) {this.errors.push("NRIC Number is required.");}
          if (!this.contact) {this.errors.push("Contact Number is required.");}
          if (!this.email) {this.errors.push("Email is required.");}
          if (!this.roleId) {this.errors.push("Role  is required.");}

          if ((this.name && this.nricno && this.contact && this.email && this.roleId)) {
           
            this.loader = true;
            const headers = {
              Authorization: "Bearer " + this.userdetails.access_token,
              Accept: "application/json",
              "Content-Type": "application/json",
            };


            let body = new FormData();
            body.append("name", this.name);
            body.append("nric_no", this.nricno);
            body.append("contact_no", this.contact);
            body.append("email", this.email);
            body.append("role_id", this.roleId);
            body.append("reporting_manager_id", this.managerId);
            body.append("added_by", this.userdetails.user.id);
            body.append("status",this.status);
            body.append("editId",this.Id);
           
            const response = await this.$axios.post("staff-record/createNewStaff",body,{headers});

            if (response.data.code == 200 || response.data.code == "200") {
              this.loader = false;
              await this.$swal.fire('Successfully Updated');
              this.$router.push("/Modules/Staff-Management/staff-record");

            } else {
              this.loader = false;
              this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + JSON.stringify(response.data.message)});
            }
          }
        }
        })
      },

      async onDelete() {
        
            
        this.$swal.fire({title: 'Are you sure you want to delete this record? <br>This action cannot be reverted.',showCancelButton: true,confirmButtonText: 'Yes',cancelButtonText: 'Cancel',reverseButtons: true}
                ).then(async (result) =>{

                if (result.isConfirmed){
                this.errors = [];
                    this.loader = true;
                    const headers = {
                    Authorization: "Bearer " + this.userdetails.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    };


                
                    const response = await this.$axios.post("staff-record/deleteStaff",{staff_id:this.Id},{headers});

                    if (response.data.code == 200 || response.data.code == "200") {
                    this.loader = false;
                    if(response.data.message == 'deleted'){
                    await this.$swal.fire('Successfully Deleted','', 'success');
                    this.$router.push("/Modules/staff-management/staff-record");
                    }
                    if(response.data.message == 'existed'){
                    await this.$swal.fire('This record cannot be deleted. This staff member is associated with a sales transaction record.','', 'warning');
                    }

                    } else {
                    this.loader = false;
                    this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + JSON.stringify(response.data.message)});
                    }
                
                }
                })
               
      },
  
      //validation-email
      async validateEmail() {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
          this.emailerror = null;
        } else {
          this.emailerror = "Please Enter Valid Email";
          this.email = "";
        }
      },
      //validation-name
      async isLetter(e){
          let char = String.fromCharCode(e.keyCode);
          if(/^[A-Za-z\'@ ]+$/.test(char)) return true;
          else e.preventDefault();
      },
      //validation-ic and contact no
      NumbersOnly(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      },
      //isExist-Nric
      async CheckNric(event) {
        console.log("my body", event.target.value);
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.post(
          "staff-record/isExistNric",
          { nric_no: event.target.value },
          { headers }
        );
        console.log("response", response.data);
        if (response.data.code == 200) {
          this.nricerror = "NRIC No already exists";
        } else {
          this.nricerror = null;
        }
      },
     
    },
  };
  </script>
  <style scoped>
  .hide {
    display: none !important;
  }
  </style>
  