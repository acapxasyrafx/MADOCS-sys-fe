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
                            <h4>Yearly Sales Report</h4>
                        </div>
              <div class="card-body">
                <div class="search-table">
                  <div class="row mt-2">
                    
                    <div class="col-lg-4 col-sm-6 mb-3">
                      <label for="" class="form-label">From</label>
                      <input type="date" name="" class="form-control" v-model="start_date" />
                    </div>
                    <div class="col-lg-4 col-sm-6 mb-3">
                        <label for="" class="form-label">Until</label>
                       <input type="date" name="" class="form-control" v-model="end_date" @change="onchange($event)" />
                     </div>
                   

                  </div>
                </div>
                <!-- search-table -->
                <div style="overflow-x:auto;">
                  <table class="table table-striped data-table display nowrap" style="width: 100%">
                  <thead>
                    <tr>
                      <th>Marketing Agent</th>
                      <th>Jan</th>
                      <th>Feb</th>
                      <th>Mar</th>
                      <th>Apr</th>
                      <th>May</th>
                      <th>Jun</th>
                      <th>Jul</th>
                      <th>Aug</th>
                      <th>Sept</th>
                      <th>Oct</th>
                      <th>Nov</th>
                      <th>Dec</th>
                     
                     
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(sales,index) in monthlylist" :key="index">
                      <td>{{ sales.name }}</td>
                      <td>RM {{ formatPrice(sales.jan) }}</td>
                      <td>RM {{ formatPrice(sales.feb) }}</td>
                      <td>RM {{ formatPrice(sales.mar) }}</td>
                      <td>RM {{ formatPrice(sales.apr) }}</td>
                      <td>RM {{ formatPrice(sales.may) }}</td>
                      <td>RM {{ formatPrice(sales.jun) }}</td>
                      <td>RM {{ formatPrice(sales.jul) }}</td>
                      <td>RM {{ formatPrice(sales.aug) }}</td>
                      <td>RM {{ formatPrice(sales.sept) }}</td>
                      <td>RM {{ formatPrice(sales.oct) }}</td>
                      <td>RM {{ formatPrice(sales.nov) }}</td>
                      <td>RM {{ formatPrice(sales.december) }}</td>
                    </tr>
                   
                    <tr v-for="(excl,index) in totalExcllist" :key="index">
                        <td style="text-align: right;color:blue;"><b>Total excl.Tax</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexcljan) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclfeb) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclmar) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclapr) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclmay) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexcljun) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexcljul) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclaug) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclsept) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexcloct) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexclnov) }}</b></td>
                        <td><b>RM {{ formatPrice(excl.totalexcldec) }}</b></td>
                    </tr>
                    <tr v-for="(tax,index) in totalTaxlist" :key="index">
                        <td style="text-align: right;color:blue;"><b>Total Tax</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxjan) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxfeb) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxmar) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxapr) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxmay) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxjun) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxjul) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxaug) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxsept) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxoct) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxnov) }}</b></td>
                        <td><b>RM {{ formatPrice(tax.totaltaxdec) }}</b></td>
                    </tr>
                    <tr v-for="(incl,index) in totalIncllist" :key="index">
                        <td style="text-align: right;color:blue;"><b>Total Tax</b></td>
                        <td><b>RM {{ formatPrice(incl.totalincljan) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclfeb) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclmar) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclapr) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclmay) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalincljun) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalincljul) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclaug) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclsept) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalincloct) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalinclnov) }}</b></td>
                        <td><b>RM {{ formatPrice(incl.totalincldec) }}</b></td>
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
  import moment from 'moment';
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
        totalExcllist:[],
        totalTaxlist:[],
        totalIncllist:[],

       
        start_date: '',
        end_date: '',

        sumexcl:0.00,
        sumtax:0.00,
        sumincl:0.00,

      };
    },
  
    mounted() {
  
  
    },
    beforeMount() {
      this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
  
    },
    
    methods: {

        async OnSearch() {
           this.GetList();
        },
    
     async GetList() {
          this.sumexcl = 0.00;
          this.sumtax = 0.00;
          this.sumincl= 0.00;
      
        const headers = {
          Authorization: "Bearer " + this.userdetails.access_token,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        const response = await this.$axios.post(
          "sales/getYearlySales",{staff_id:this.userdetails.user.staff_id, start_date:this.start_date, end_date:this.end_date},
          {headers,}
        );
        console.log("my resp", response.data);
        if (response.data.code == 200 || response.data.code == "200") {
         
          this.monthlylist = response.data.list;
          this.totalExcllist = response.data.totalExclTax;
          this.totalTaxlist = response.data.totalTax;
          this.totalIncllist = response.data.totalInclTax;
          //alert(JSON.stringify(this.totalIncllist));
         

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
  