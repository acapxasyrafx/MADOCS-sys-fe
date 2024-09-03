<template>
    <div id="layoutSidenav">
      <CommonSidebar />
      <div id="layoutSidenav_content">
        <CommonHeader />
        <main>
          <div class="container-fluid px-4">
            <div class="page-title">
              <h1>Sales Report</h1>
            </div>
  
            <div class="card mb-4">
                <div class="card-header icon-title">
                            <a href="#"><i class="fa fa-users"></i></a>
                            <h4>Monthly Sales Report</h4>
                        </div>
              <div class="card-body">
                <div class="search-table">
                  <div class="row mt-2">
                    
                    <div class="col-lg-4 col-sm-6 mb-3">
                      <select
                        v-model="selectedYear"
                        class="form-select"
                        aria-label="Default select example"
                        @change="onchange(event)">

                        <option value="">Select Year</option>
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                        </select>
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-3">
                      <select
                        v-model="selectedMonth"
                        class="form-select"
                        aria-label="Default select example"
                        @change="onchange(event)">

                        <option value="">All Month</option>
                        <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
                        </select>
                    </div>

                  </div>
                </div>
                <!-- search-table -->
                <div style="overflow-x:auto;">
                  <table class="table table-striped data-table display nowrap" style="width: 100%">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Total excl.Tax</th>
                      <th>Total Tax</th>
                      <th>Total incl.Tax</th>
                     
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="monthlylist.length" v-for="(sales,index) in monthlylist" :key="index">
                      <td>{{ sales.month }}</td>
                      <td>RM {{ formatPrice(sales.total_excl_tax) }}</td>
                      <td>RM {{ formatPrice(sales.total_tax)}}</td>
                      <td>RM {{ formatPrice(sales.total_incl_tax)}}</td>
                    </tr>
                    <tr v-if="monthlylist.length">
                        <td style="text-align: right;"><b>Total Amount</b></td>
                        <td><b>RM {{ formatPrice(this.sumexcl) }}</b></td>
                        <td><b>RM {{ formatPrice(this.sumtax)}}</b></td>
                        <td><b>RM {{ formatPrice(this.sumincl) }}</b></td>
                    </tr>
                    <tr v-if="!monthlylist.length">
                    <td colspan="4"><p style=" padding: 0px;
                      margin: 10px;
                      color: red;
                      display: flex;
                      justify-content: center;">
                      No Record Found
                    </p></td>
                      
                    </tr>
                  </tbody>
                </table>
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
    name: "monthly-report",
  
    data() {
      return {
        Id: 0,
        name: "",
        userdetails: null,
        monthlylist: [],
        dataReady: false,
        dataReady2: false,

        months: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ],
        years: [],
        selectedMonth: '',
        selectedYear: '',

        sumexcl:0.00,
        sumtax:0.00,
        sumincl:0.00,

      };
    },
  
    mounted() {
       // Populate the years array with a range of years
       const currentYear = new Date().getFullYear();
        for (let year = currentYear - 7; year <= currentYear; year++) {
            this.years.push(year);
        }
        // Set a default selected year
        this.selectedYear = currentYear;
      
        this.GetList();
  
    },
    beforeMount() {
      this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
  
    },
    
    methods: {
    
     async GetList() {
      //alert(this.selectedYear + "|" + this.selectedMonth)
          this.sumexcl = 0.00;
          this.sumtax = 0.00;
          this.sumincl= 0.00;
      
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.post(
          "sales/getMonthlySales",{staff_id:this.userdetails.user.staff_id, year:this.selectedYear, month:this.selectedMonth},
          {headers,}
        );
        console.log("my resp", response.data);
        if (response.data.code == 200 || response.data.code == "200") {
          
          this.monthlylist = response.data.list;
          this.sumexcl = response.data.sumexcl;
          this.sumtax = response.data.sumtax;
          this.sumincl= response.data.sumincl;

        } else {
          this.monthlylist = [];
        }
      },
     
      formatPrice(value) {
                return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },
    
       async onchange(data) {
         this.GetList();
        },
      },
  };
  </script>
  <style scoped>

  
  </style>
  