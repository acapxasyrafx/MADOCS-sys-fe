<template>
    <div id="layoutSidenav">
        <CommonSidebar />
        <div id="layoutSidenav_content">
            <CommonHeader />
            <main>
                <Loader v-if="loader" />
                <div class="container-fluid px-4">
                    <div class="card mb-4">
                        <div class="card-header icon-title">
                            <a href="#"><i class="fa fa-shield-alt"></i></a>
                            <h4>Inventory</h4>
                        </div>
                        <div class="card-body">
                            
                            <ul class="sub-tab">
                                <li class=""><a href="#" class="active">Inventory Record</a></li>
                            </ul>
    
                            <div class="content-subtab">
                                <form class="g-3 mt-3" method="post" @submit.prevent="OnSubmit">
                                    <div class="row align-items-center">
                                        <div class="col-sm-3 mb-4">
                                        <label for="" class="form-label">Category</label>
                                        <select
                                            id="rolefield"
                                            v-model="categoryId"
                                            class="form-select"
                                            aria-label="Default select example"
                                            >
                                            <option value="">Please Select</option>
                                            <option
                                                v-for="cat in categorylist"
                                                v-bind:key="cat.id"
                                                v-bind:value="cat.id"
                                            >
                                                {{ cat.section_value }}
                                            </option>
                                        </select>
                                        </div>
                                        <div class="col-md-7 mb-4">
                                            <label for="item" class="form-label">Item Name</label>
                                            <input type="text" id="item" class="form-control" placeholder="Enter Item Name" v-model="item" />
                                        </div>
                                        <div class="col-lg-3 col-sm-2 mb-4">
                                            <label class="form-label">UOM</label>
                                            <select
                                            v-model="uomId"
                                            class="form-select"
                                            aria-label="Default select example"
                                            >
                                            <option value="">Select</option>
                                            <option
                                                v-for="uom in uomlist"
                                                v-bind:key="uom.id"
                                                v-bind:value="uom.id"
                                            >
                                                {{ uom.section_value }}
                                            </option>
                                        </select>
                                        </div>
                                        <div class="col-lg-2 col-sm-2 mb-4">
                                            <label class="form-label">Unit Price(RM)</label>
                                            <input type="text" class="form-control" placeholder="0" v-model="unitPrice" v-on:keypress="validateCurrency"/>
                                        </div>
                                        <div class="col-lg-2 col-sm-2 mb-4">
                                            <label class="form-label">COGS(RM)</label>
                                            <input type="text" class="form-control" placeholder="0" v-model="cogs" v-on:keypress="validateCurrency" />
                                        </div>
                                        <div class="col-lg-5 col-sm-2 mb-4">
                                            <label class="form-label">Description</label>
                                            <input type="text" class="form-control" placeholder="Enter item description" v-model="description" />
                                        </div>
    
                                        <div class="col-sm-3 mb-4">
                                        <label for="" class="form-label">Status</label>
                                        <select class="form-select" v-model="status">
                                        <option value=0>Enable</option>
                                        <option value=1>Disable</option>
                                        </select>
                                        </div>
                                    </div>
                                    <p v-if="errorList.length"><ul><li style="color:red" v-for='err in errorList' :key='err'>{{ err }}</li></ul></p>
                                    <!-- close-row -->
                                    <div class="d-flex justify-content-center" id="sidebar" ref="sidebar">
                                        <button type="submit" class="btn btn-success btn-text" v-if="itemId">
                                            <i class="fa fa-save"></i>Update
                                        </button>
                                        <button type="submit" class="btn btn-success btn-text" v-if="!itemId">
                                            <i class="fa fa-plus"></i> Add New
                                        </button>
                                    </div>
                                </form>
                                <div class="table-title">
                                    <h3>List of Category</h3>
                                </div>
                                <div class="search-table">
                                <div class="row mt-2">
                
                                    <div class="col-lg-4 col-sm-6 mb-3">
                                    <div class="input-group">
                                        <span class="input-group-text bg-transparent br-0"><i class="fa fa-search"></i></span>
                                        <input type="text" class="form-control" v-model="filterText" placeholder="Filter by category or item name"/>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <table class="table table-striped data-table1 display nowrap" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th style="width:3%">No</th>
                                            <th>Category</th>
                                            <th>Item Name</th>
                                            <th>UOM</th>
                                            <th>Unit Price (RM)</th>
                                            <th>COGS (RM)</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th style="width:3%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <tr v-for="(item,index) in paginatedItemList" :key="index">
                                            <td>#{{ index+1}}</td>
                                            <td>{{ item.category }}</td>
                                            <td>{{ item.item_name }}</td>
                                            <td>{{ item.uom }}</td>
                                            <td>{{ item.unit_price }}</td>
                                            <td>{{ item.cogs }}</td>
                                            <td>{{ item.item_description }}</td>
                                            <td>{{ item.status }}</td>
                                            <td class="td">
                                                <a class="view" @click="edititem(item)"><i class="fa fa-edit"></i></a>
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
                                <br>
                                <br>
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
        components: {
            CommonSidebar,
            CommonHeader
        },
        name: "category",
        data() {
            return {
                loader: false,
                itemsPerPage: 10,
                currentPage: 1,
                filterText:"",

                errorList: [],
                itemlist: [],
                categorylist:[],
                uomlist:[],
                itemId: 0,
                status: 0,
                cogs:0.00,
                unitPrice:0.00,
                item:"",
                categoryId:"",
                uomId:"",
                description:"",
                userdetails: null,

                
            };
        },
        beforeMount() {
            this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
        },
        mounted() {
            this.loader = true;
            this.GetCategoryList();
            this.GetItemList();
            this.GetUomList();
        },
        computed: {
            filteredItemList() {
                return this.itemlist.filter(item => {
                    return (
                    item.item_name.toLowerCase().includes(this.filterText.toLowerCase()) ||
                    item.category.toLowerCase().includes(this.filterText.toLowerCase())
                    );
                });
                },
    
                totalPages() {
                return Math.ceil(this.filteredItemList.length / this.itemsPerPage);
                },
                paginatedItemList() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.filteredItemList.slice(startIndex, endIndex);
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
            async GetCategoryList(){
            const headers = {
                Authorization: "Bearer " + this.userdetails.access_token,
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            const axios = require("axios").default;
            axios
                .get(`${this.$axios.defaults.baseURL}` + "general-setting/lists?section=" + "itemcategory", {headers})

                .then((resp) => {
                    this.categorylist = resp.data.list;
                    this.loader = false;
                   
                })
                .catch ((err) => {
                 this.loader = false;
                    this.$swal.fire({icon: 'error', title: 'Oops... Something Went Wrong!',text: 'the error is: ' + err, footer: ''});
    
                    this.loader = false
                    console.error(err);
                    this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + err,footer: ''});
                });
            },
            async GetUomList(){
            const headers = {
                Authorization: "Bearer " + this.userdetails.access_token,
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            const axios = require("axios").default;
            axios
                .get(`${this.$axios.defaults.baseURL}` + "general-setting/lists?section=" + "uom", {headers})

                .then((resp) => {
                    this.uomlist = resp.data.list;
                    this.loader = false;
                   
                })
                .catch ((err) => {
                 this.loader = false;
                    this.$swal.fire({icon: 'error', title: 'Oops... Something Went Wrong!',text: 'the error is: ' + err, footer: ''});
    
                    this.loader = false
                    console.error(err);
                    this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + err,footer: ''});
                });
            },
            async OnSubmit() {
                this.$swal.fire({title: 'Save this record?',showCancelButton: true,confirmButtonText: 'Yes',cancelButtonText: 'Cancel',reverseButtons: true}
                ).then(async (result) =>{

                if (result.isConfirmed){
                this.errors = [];
                try {
                    if (!this.categoryId) {this.errorList.push("Category is required");}
                    if (!this.item) {this.errorList.push("Item is required");}
                    if (!this.uomId) {this.errorList.push("UOM is required");}
                    if (!this.cogs) {this.errorList.push("COGS is required");}
                    if (!this.unitPrice) {this.errorList.push("Unit Price is required");}
                    
                    if ((this.categoryId && this.item && this.uomId && this.cogs && this.unitPrice)){
                        this.loader = true;
                        const headers = {
                            Authorization: "Bearer " + this.userdetails.access_token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        };
                   
                        const response = await this.$axios.post("/inventory/createNewItem", { 
                               item_name: this.item,
                               category_id: this.categoryId,
                               unit_price : this.unitPrice,
                               uom_id : this.uomId,
                               cogs : this.cogs,
                               item_description : this.description,
                               status : this.status,
                               added_by : this.userdetails.user.id,
                               item_id : this.itemId}, {headers}
                        );
                        if (response.data.code == 200) {
                            this.loader = false;
                            if (this.itemId > 0) {
                                this.$swal.fire('Successfully Updated', '', 'success');
                            } else {
                                this.$swal.fire('Successfully Added', '', 'success');
                            }

                            //upon success
                            this.GetItemList();
                            this.reset();

                        } else {
                            this.loader = false;
                            this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!', text: 'the error is: ' + JSON.stringify(response.data.message),footer: ''});
                        }
                    }
                 }catch (e) {
                    this.loader = false;
                    this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + e,footer: ''});
                }
            }
            },)
            },
            async GetItemList() {
                const headers = {
                    Authorization: "Bearer " + this.userdetails.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                };
                const response = await this.$axios.get(
                    "inventory/getItemList", {headers}
                );
                if (response.data.code == 200 || response.data.code == "200") {
                    this.itemlist = response.data.list;
                } else {
                    this.itemlist = [];
                }
            },
         
            async edititem(data) {
                this.itemId= data.item_id;
            
                this.loader = true;
                const headers = {
                    Authorization: "Bearer " + this.userdetails.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                };
                const response = await this.$axios.post("/inventory/getItembyId", {item_id: data.item_id}, {headers}
                );
                if (response.data.code == 200) {
                  
                    this.loader = false;
                    this.item = response.data.list.item_name;
                    this.categoryId = response.data.list.category_id;
                    this.uomId = response.data.list.uom_id;
                    this.cogs = response.data.list.cogs;
                    this.unitPrice = response.data.list.unit_price;
                    this.status=response.data.list.status;
                    this.description=response.data.list.item_description;

                 
                } else {
                    this.loader = false;
                    this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + JSON.stringify(response.data.message),footer: ''});
                }
            },
            
            reset(){
                this.categoryId = "";
                this.item ="";
                this.uomId ="",
                this.unitPrice = 0.00,
                this.cogs = 0.00,
                this.itemId = 0;
                this.status= 0;
                this.errorList="";
                this.description="";
                
            },
            validateCurrency(evt) {
                evt = (evt) ? evt : window.evt;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
                } else {
                return true;
                }
            },

        },
    };
    </script>
    