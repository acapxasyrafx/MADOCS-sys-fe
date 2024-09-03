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
                            <h4>Sales Transaction</h4>
                        </div>
                        <div class="card-body">
                            <ul class="sub-tab">
                                <li class=""><a href="#" class="active">New Cash Sale</a></li>
                            </ul>
    
                            <div class="content-subtab">
                               
                                    <div class="row">
                                        <div class="col-md-7 mb-2">
                                            
                                            <label for="" class="form-label"><b>Marketing Agent : {{this.staff}}</b></label><br>
                                            <label for="" class="form-label"><b>Date : {{ this.currentdate }}</b></label>
                                       </div>
                                    </div>
                                  <br>
                                    <div class="row">
                                        <div class="col-md-6 mb-1">
                                            <label for="" class="form-label">Client Name<span style="color:red">*</span></label>
                                            <input type="text" class="form-control" placeholder="Enter Client Name" v-model="client_name" required />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-1">
                                            <label for="" class="form-label">Address</label>
                                            <textarea class="form-control textarea" rows="3" v-model="client_address"></textarea>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-md-3 mb-1">
                                        <label for="contactfield" class="form-label">Contact Number</label>
                                        <input
                                        id="contactfield"
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter Contact Number"
                                        v-model="client_contact_no"
                                        :maxlength="12"
                                        v-on:keypress="NumbersOnly" />
                                        </div>
                                    </div>
                                   
                                    <!-- Table item selection -->
                                    <div class="table-responsive">
                                        <table class="job-search-table" id="itemdetail">
                                            <thead>
                                                <tr>
                                                    <th>Item Name <span style="color:red">*</span></th>
                                                    <th>uom</th>
                                                    <th>Qty<span style="color:red">*</span></th>
                                                    <th>Unit Price(RM)</th>
                                                    <th>Total(RM)</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody class="optionBox">
                                                <tr class="block">
                                                    <td style="width: 30%;"><select
                                                        v-model="newItem.selectedItem"
                                                        required class="form-select item"
                                                        aria-label="Default select example"
                                                        @change="onchangeItem($event)"
                                                        >
                                                        <option value="">Select</option>
                                                        <option
                                                            v-for="item in itemlist"
                                                            v-bind:key="item.item_id"
                                                            v-bind:value="item.item_id">
                                                            {{ item.item_name }}
                                                        </option>
                                                        </select>
                                                        <input type="text"  v-model="newItem.selectedItem_name" hidden/>
                                                    </td>
                                                    <td style="width: 10%;"><input type="text" required class="form-control uom" v-model="newItem.uom" disabled/></td>
                                                    <td style="width: 10%;"><input class="form-control qty" v-model.number="newItem.quantity" type="number" placeholder="Quantity" @keyup="updateUnitPrice" /></td>
                                                    <td style="width: 20%;"><input required class="form-control unitprice" v-model.number="newItem.unitPrice" type="number" placeholder="Unit Price" disabled /></td>
                                                    <td style="width: 20%;"><input required class="form-control total" v-model.number="newItem.total" type="number" placeholder="Total" disabled /></td>
                                                    <td style="width: 20%;" @click="addItem"><a class="add-row"><i class="fa fa-plus"></i></a></td>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="form-title"><h5>List of Item</h5></div>
                                    <div class="table-responsive">
                                        <table class="job-search-table" id="itemdetail">
                                            <thead>
                                                <tr>
                                                    <th style="width: 30%;">Item Name</th>
                                                    <th style="width: 10%;">Uom</th>
                                                    <th style="width: 10%;">Qty</th>
                                                    <th style="width: 20%;">Unit Price(RM)</th>
                                                    <th style="width: 20%;">Total(RM)</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody class="optionBox">
                                                <tr class="block" v-for="(item, index) in newList.items" :key="index">
                                                <td style="width: 30%;">{{ item.selectedItem_name }}</td>
                                                <td style="width: 30%;" hidden>{{ item.selectedItem }}</td>
                                                <td style="width: 10%;">{{ item.uom }}</td>
                                                <td style="width: 10%;">{{ item.quantity }}</td>
                                                <td style="width: 20%;">{{ formatPrice(item.unitPrice) }}</td>
                                                <td style="width: 20%;">{{ formatPrice(item.total) }}</td>
                                                <td> <span class="remove remove-ui" @click="removeItem(index)"><i class="fal fa-times"></i></span></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" style="text-align: right;"><b>Total Amount</b></td>
                                                    <td><b>{{ formatPrice(calculateTotalAmount) }}</b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" style="text-align: right;"><b>Discount</b></td>
                                                    <td><b><input type="text" required class="form-control" v-model="discount" @keyup="updateTotal"/></b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" style="text-align: right;"><b>SST 6%</b></td>
                                                    <td><b>{{ formatPrice(calculateSST) }}</b></td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" style="text-align: right;"><b>Total Incl.SST</b></td>
                                                    <td><b>{{ formatPrice(calculateTotalinclsst) }}</b></td>
                                                    <td></td>
                                                </tr>
                                                </tbody>
                                        </table>
                                    </div>
                                    <br>
                                    <br>
                                    <p v-if="errors.length"><ul><li style="color:red" v-for='err in errors' :key='err'>{{ err }}</li></ul></p>
                                    
                                    <!--button-->
                                    <div class="form-foter mt-3">
                                    <a href="/app/modules/sales/sales-transaction" class="btn btn-primary btn-text"><i class="fa fa-arrow-alt-to-left"></i> Back</a>
                                    <div class="ml-auto" id="hidebutton" ref="hidebutton">
                                        <button type="submit" class="btn btn-success btn-text" @click="addSales()"> <i class="fa fa-save"></i>Save Transaction</button>
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
    import moment from 'moment';
    import CommonHeader from '../../../components/CommonHeader.vue';
    import CommonSidebar from '../../../components/CommonSidebar.vue';
    export default {
        components: {
            CommonSidebar,
            CommonHeader
        },
        name: "new-sales",
        data() {
            return {
                addedItem:[],
                errorList: [],
                itemlist:[],
                uomlist:[],
                userdetails: null,
                loader: false,
                errors: [],

                client_name:"",
                client_address:"",
                client_contact_no:"",
                currentdate:"",
                staff:"",
             
                currentdate:"",
                staff:"",
                discount:0.00,
              
                sales: {lists: []},
                newList: {items: []},
                newItem: {
                selectedItem_name:'',
                selectedItem: '',
                uom:'',
                quantity: 0,
                unitPrice: 0.00,
                total:0.00,
                
                },

            };
        },
        beforeMount() {
            this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
        },
        mounted() {
          this.staff=this.userdetails.detail.name;
          this.currentdate=moment().format('DD-MM-YYYY');
          this.GetItemList();
          this.GetUomList();

        },

        computed: {
            calculateTotalAmount() {
            let val = this.newList.items.reduce((total, item) => total + item.total, 0) ;
            let newval = val - this.discount;
            return newval.toFixed(2);
            
            },

            calculateSST() {
            let val = this.newList.items.reduce((total, item) => total + item.total, 0) ;
            let newval = val - this.discount;
            let sst = newval * 0.06;
            
            return sst.toFixed(2);
            },

            calculateTotalinclsst() {
            let val = this.newList.items.reduce((total, item) => total + item.total, 0) ;
            let newval = val - this.discount;
            let newsst = newval * 0.06;
            return (newval + newsst).toFixed(2);
            }

        },
        methods: {
           
            async onchangeItem(event) {

            const headers = {
            Authorization: "Bearer " + this.userdetails.access_token,
            Accept: "application/json",
            "Content-Type": "application/json",
            };
            const response = await this.$axios.post(
            "inventory/getItembyId",
            {
                item_id: this.newItem.selectedItem,
            },
            { headers }
            );
            console.log("my screen list", response.data);
            if (response.data.code == 200 || response.data.code == "200") {
            
            this.newItem.selectedItem_name = response.data.list.item_name;
            this.newItem.uom = response.data.list.uom;
            this.newItem.unitPrice = response.data.list.unit_price;
            this.newItem.quantity = 0;
            this.newItem.total =0.00;

            }

            },

            async GetItemList() {
                const headers = {
                Authorization: "Bearer " + this.userdetails.access_token,
                Accept: "application/json",
                "Content-Type": "application/json",
                };
                const response = await this.$axios.get("inventory/getItemList",{headers});
                this.itemlist = response.data.list;
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
                this.errorList = [];
                try {
                    if (!this.citizenship) {
                        this.errorList.push("citizenship is required");
                    }
                    if (!this.index) {
                        this.errorList.push("Index is required");
                    } else {
                        this.loader = true;
                        const headers = {
                            Authorization: "Bearer " + this.userdetails.access_token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        };
                        const response = await this.$axios.post(
                            "/general-setting/add", {
                                added_by: this.userdetails.user.id,
                                section: "citizenship",
                                section_value: this.citizenship,
                                section_order: this.index,
                                setting_id: this.settingId,
                                request_type: this.requesttype,
                                status: this.status,
                            }, {
                                headers
                            }
                        );
                        if (response.data.code == 200) {
                            this.loader = false;
                            if (this.settingId > 0) {
                                this.$swal.fire(
                                    'Successfully Update',
                                );
                            } else {
                                this.$swal.fire(
                                    'Successfully Update',
                                );
                            }
                            this.GetSettingList();
                            this.index = 0;
                            this.citizenship = "";
                            this.settingId = 0;
                            this.status= 1;
                            this.requesttype = "insert";
                        } else {
                            this.loader = false;
                            this.$swal.fire({
                                icon: 'error',
                                title: 'Oops... Something Went Wrong!',
                                text: 'the error is: ' + JSON.stringify(response.data.message),
                                footer: ''
                            });
                        }
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

           
            NumbersOnly(evt) {
                evt = (evt) ? evt : window.evt;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
                } else {
                return true;
                }
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
            formatPrice(value) {
                return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            },
            updateUnitPrice() {
            
                this.newItem.total = (this.newItem.quantity * this.newItem.unitPrice).toFixed(2);

             
            },
            updateTotal() {
            this.calculateTotalAmount; 
            this.calculateSST;
            this.calculateTotalinclsst;

            },
                
            addItem() {
                if (this.newItem.selectedItem && this.newItem.quantity) {
                this.newItem.total = this.newItem.quantity * this.newItem.unitPrice;
            
                
                this.newList.items.push({ selectedItem:this.newItem.selectedItem,selectedItem_name:this.newItem.selectedItem_name,uom:this.newItem.uom, quantity:this.newItem.quantity,unitPrice:this.newItem.unitPrice,total:this.newItem.total });

                
                // Clear the input fields
                this.newItem.selectedItem = '';
                this.newItem.selectedItem_name = '';
                this.newItem.quantity = 0;
                this.newItem.unitPrice = 0.00;
                this.newItem.uom="";
                this.newItem.total=0.00
                }
            },

            removeItem(index) {
            // Use the index to remove the item from newList.items
            this.newList.items.splice(index, 1);
            },

            addSales() {
               
                if (!this.client_name) {this.errors.push("Client name is required");}
                if (this.newList.items.length < 1) {this.errors.push("Item is required");}

                if (this.client_name && this.newList.items.length > 0) {
                
                const dataSales = {
                    created_by: this.userdetails.user.staff_id,
                    client_name: this.client_name,
                    client_address:this.client_address,
                    client_contact_no: this.client_contact_no,
                    transaction_Date: moment(),
                    lists: this.newList.items,
                    discount:this.discount,
                };

                this.$swal.fire({title: 'Save this transaction?',showCancelButton: true,confirmButtonText: 'Yes',cancelButtonText: 'Cancel',reverseButtons: true}
                ).then(async (result) =>{

                if (result.isConfirmed){
                this.errors = [];
                if (!this.client_name) {this.errors.push("Client Name is required.");}

                if (this.client_name) {
                
                    this.loader = true;
                    const headers = {
                    Authorization: "Bearer " + this.userdetails.access_token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    };


                
                    const response = await this.$axios.post("sales/createNewSales",dataSales,{headers});

                    if (response.data.code == 200 || response.data.code == "200") {
                    this.loader = false;
                    await this.$swal.fire('Successfully Saved','', 'success');
                    this.$router.push("/Modules/Sales/sales-transaction");

                    } else {
                    this.loader = false;
                    this.$swal.fire({icon: 'error',title: 'Oops... Something Went Wrong!',text: 'the error is: ' + JSON.stringify(response.data.message)});
                    }
                }
                }
                })
                }}


        },
    };
    </script>
    