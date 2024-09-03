<template>
    <div id="layoutSidenav">
      <CommonSidebar />
      <div id="layoutSidenav_content">
        <CommonHeader />
        <main>
          <div class="container-fluid px-4">
            <div class="page-title">
              <h1>Sales Transaction</h1>
              <div class="btn-group-a">
                <a @click="newSales()" class="add-btn"><em class="fa fa-plus"></em></a>
              </div>
            </div>
  
            <div class="card mb-4">
                <div class="card-header icon-title">
                            <a href="#"><i class="fa fa-users"></i></a>
                            <h4>List of Sales Record</h4>
                        </div>
              <div class="card-body">
                <div class="search-table">
                  <div class="row mt-2">
  
                    <div class="col-lg-4 col-sm-6 mb-3">
                      <div class="input-group">
                        <span class="input-group-text bg-transparent br-0"><i class="fa fa-search"></i></span>
                        <input type="text" class="form-control" v-model="filterText" placeholder="Filter by reference number"/>
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
                      <th>Transaction Date</th>
                      <th>Reference Number</th>
                      <th>Total excl.Tax</th>
                      <th>Tax Amount</th>
                      <th>Total incl.Tax</th>
                      <th>Create By</th>
                      <th>Latest Update</th>
                      <th style="width: 15%;">Remark</th>
                      <th>isCancel</th>
                      <th style="width:5%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(cs,index) in paginatedSalesList" :key="index">
                      <td>#{{ index+1}}</td>
                      <td>{{ cs.created_at}}</td>
                      <td>{{ cs.reference_no }}</td>
                      <td>RM {{ formatPrice(cs.total_excl_tax) }}</td>
                      <td>RM {{ formatPrice(cs.tax_amount) }}</td>
                      <td>RM {{ formatPrice(cs.total_incl_tax) }}</td>
                      <td>{{ cs.name}}</td>
                      <td>{{ cs.updated_at }}</td>
                      <td>{{ cs.remark }}</td>
                      <td><i class="fa fa-trash" v-if="cs.isCancel== 1" style="font-size:15px;color:red"></i></td>
                      <td>
                        <a @click="view(cs)" class="view" title="view detail transaction"><em class="fa fa-eye"></em></a>
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
    name: "staff-management",
    setup() {},
    head: {
      script: [
  
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js",
          async: true,
          crossorigin: "anonymous",
        },
      ],
    },
    data() {
      return {
        itemsPerPage: 10,
        currentPage: 1,
        Id: 0,
        name: "",
        userdetails: null,
        saleslist: [],
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
      filteredSalesList() {
      return this.saleslist.filter(item => {
        return (
          item.reference_no.toLowerCase().includes(this.filterText.toLowerCase())
        );
      });
    },
    totalPages() {
      return Math.ceil(this.filteredSalesList.length / this.itemsPerPage);
    },
    paginatedSalesList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredSalesList.slice(startIndex, endIndex);
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
        const response = await this.$axios.post(
          "sales/getSalesListbyStaffId",
          { staff_id: this.userdetails.user.staff_id },
          {headers,}
        );
        console.log("my resp", response.data);
        if (response.data.code == 200 || response.data.code == "200") {
          
          this.saleslist = response.data.list;
        } else {
          this.saleslist = [];
        }
      },
      async view(data) {
        
        this.$router.push({
          path: "/modules/Sales/edit-sales",
          query: { id: data.sales_id},
        });
      },

      newSales() {
        
        this.$router.push({
          path: "/modules/Sales/new-sales"
        });
      },
  
      formatPrice(value) {
                return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },
  
     
      },
  };
  </script>
  <style scoped>

  
  </style>
  