<template>
    <div id="layoutSidenav">
      <CommonSidebar />
      <div id="layoutSidenav_content">
        <CommonHeader />
        <main>
          <div class="container-fluid px-4">
            <div class="page-title">
              <h1>Staff Management</h1>
              <div class="btn-group-a">
                <a @click="addstaff()" class="add-btn"><em class="fa fa-plus"></em></a>
              </div>
            </div>
  
            <div class="card mb-4">
                <div class="card-header icon-title">
                            <a href="#"><i class="fa fa-users"></i></a>
                            <h4>List of Staff</h4>
                        </div>
              <div class="card-body">
                <div class="search-table">
                  <div class="row mt-2">
  
                    <div class="col-lg-4 col-sm-6 mb-3">
                      <div class="input-group">
                        <span class="input-group-text bg-transparent br-0"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control" v-model="filterText" placeholder="Filter by name or nric number"/>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- search-table -->
                <div style="overflow-x:auto;">
                  <table class="table table-striped data-table display nowrap" style="width: 100%">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Staff Name</th>
                      <th>NRIC No</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Role</th>
                      <th>Reporting Manager</th>
                      <th>Status</th>
                      <th style="width:5%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(staff,index) in paginatedStaffList" :key="index">
                      <td>#{{ index+1}}</td>
                      <td>{{ staff.name }}</td>
                      <td>{{ staff.nric_no }}</td>
                      <td>{{ staff.email }}</td>
                      <td>{{ staff.contact_no }}</td>
                      <td>{{ staff.role }}</td>
                      <td>{{staff.manager}}</td>
                      <td>{{staff.status}}</td>
                      <td>
                        <a @click="edit(staff)" class="view" title="edit staff profile"><em class="fa fa-edit"></em></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <nav aria-label="Page navigation" style="overflow-x:auto; float: right;">
                <ul class="pagination">
                  <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                    <a class="page-link custom-prev-button " @click="prevPage">Previous</a>
                  </li>
                  <li class="page-item" v-for="page in pages" :key="page" :class="{ 'active': page === currentPage }">
                    <a class="page-link" @click="changePage(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                    <a class="page-link custom-prev-button" @click="nextPage">Next</a>
                  </li>
                </ul>
              </nav>
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
  import CommonSidebar from '../../../components/CommonSidebar.vue';

  export default {
    components: { CommonSidebar, CommonHeader },
    name: "staff-record",
    setup() {},
   
    data() {
      return {
        itemsPerPage: 10,
        currentPage: 1,

        term: null,
        Id: 0,
        name: "",
        userdetails: null,
        alllist:[],
        filterText: '',
      };
    },
  
    mounted() {
     this.GetList();
  
    },
    beforeMount() {
      this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
  
    },
    computed: {
    filteredStaffList() {
      return this.alllist.filter(item => {
        return (
          item.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
          item.nric_no.toString().includes(this.filterText)
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredStaffList.length / this.itemsPerPage);
    },
    paginatedStaffList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredStaffList.slice(startIndex, endIndex);
    },
    pages() {
      const pagesArray = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
      return pagesArray;
    }
  },
    methods: {
      changePage(page) {
          this.currentPage = page;
        },
        prevPage() {
          if (this.currentPage > 1) {
            this.currentPage--;
          }
        },
        nextPage() {
          if (this.currentPage < this.totalPages) {
            this.currentPage++;
          }
        },
      async GetList() {
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.get("staff-record/getStaffList",{headers,});
        console.log("my resp", response.data);
        if (response.data.code == 200 || response.data.code == "200") {
          

          this.alllist=response.data.list;
        } else {
         
          this.alllist = [];
        }
      },
      async edit(data) {
    
        this.$router.push({
          path: "/modules/staff-management/edit-staff",
          query: { id: data.staff_id },
        });
      },

      addstaff() {
        
        this.$router.push({
          path: "/modules/Staff-Management/register-staff"
        });
      },

      Onview(data) {
  
        this.$router.push({
          path: "/modules/Staff-Management/usermatrix-view",
        query: {staff_id: data.staff_id ,user_id:data.user_id },
        });
        },
      },

      OnSearch() {
      if (this.search) {
        this.stafflist=this.alllist.filter((notChunk) => {
          return (
            notChunk.name
              .toLowerCase()
              .indexOf(this.search.toLowerCase())
          );
        });
      } 
    },
   
  };
  </script>
  <style>


</style>
 
 
  