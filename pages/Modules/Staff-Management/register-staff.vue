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
                <div class="card-header icon-title"><a href="#"><i class="fa fa-users"></i></a><h4>New Staff Registration</h4></div>
                <div class="card-body">
                  <nav>
                    <ul id="nav-tab" role="tablist" class="nav sub-tab">
                      <li class="nav-item">
                        <a data-bs-toggle="tab" href="#nav-home1" role="tab" aria-controls="nav-home" aria-selected="true" class="nav-link active">Add New</a>
                      </li>
                    </ul>
                  </nav>
                 
                  <div id="nav-home1" role="tabpanel" class="tab-pane fade show active">
                    <div class="content-subtab">
                      <form id="staffForm" class="g-3 mt-3" method="post"
                      @submit.prevent="onCreate">
                        <!--row 1-->
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <NameValidator v-model:name="name" />
                          </div>

                          <div class="col-md-6 mb-4">
                            <NricValidator v-model:name="nricno" />
                          </div>
                        </div>
                        <!--row 2-->
                        <div class="row">
                          <div class="col-md-6 mb-4">
                           <ContactValidator v-model:name="contact" />
                          </div>
                          <div class="col-md-6 mb-4">
                            <EmailValidator v-model:email="email" />
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
                            <button type="submit" class="btn btn-success btn-text"> <i class="fa fa-save"></i> Add New</button>
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
  import EmailValidator from '../../../components/FieldValidator/EmailValidator.vue';
  import NameValidator from '../../../components/FieldValidator/NameValidator.vue';
  import NricValidator from '../../../components/FieldValidator/NricValidator.vue';
  import ContactValidator from '../../../components/FieldValidator/ContactValidator.vue';

  export default {
    components: { CommonSidebar, CommonHeader, EmailValidator, NameValidator, NricValidator, ContactValidator },
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
        rolelist:[],
        errors: [],
        userdetails: null,
        nricerror:'',
        
      };
    },
    beforeMount() {
       
      this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
      this.GetRoleList();

      this.status="0";
    },
    mounted() {
    
    },
    methods: {
      async GetRoleList() {
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.get("role/getRoleList",{headers});
        this.rolelist = response.data.list;
      },
   
      async onCreate() {
  
        this.$swal.fire({title: 'Save this record?',showCancelButton: true,confirmButtonText: 'Yes',cancelButtonText: 'Cancel',reverseButtons: true}
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
            body.append("added_by", this.userdetails.user.id);
            body.append("status",this.status);
            body.append("editId","");
           
            const response = await this.$axios.post("staff-record/createNewStaff",body,{headers});

            if (response.data.code == 200 || response.data.code == "200") {
              this.loader = false;
              await this.$swal.fire('Successfully Updated','', 'success');
              this.$router.push("/Modules/Staff-Management/staff-record");

            } else {
              this.loader = false;
              this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + JSON.stringify(response.data.message)});
            }
          }
        }
        })
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
  