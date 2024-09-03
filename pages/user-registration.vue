<template>
    <div class="bg-login bg-login-1">
      <div class="row login-box">
        <img src="~/assets/images/logo-login.png" />
        <h4>Create New Account</h4>
        <Loader v-if="loader" />
        <form class="mt-3" method="post" @submit.prevent="register">
          <Error :message="companynameerror" v-if="companynameerror" />
          <div class="mb-3">
            <input
              class="form-control"
              type="text"
              placeholder="Enter your name"
              v-model="name"
            />
          </div>
  
          <Error :message="emailerror" v-if="emailerror" />
          <div class="mb-3">
            <input
              class="form-control"
              id="inputEmail"
              type="text"
              placeholder="Enter your email"
              v-model="email"
            />
          </div>
  
          <Error :message="passerror" v-if="passerror" />
          <div class="mb-3 password">
            <input
              class="form-control"
              id="inputPassword"
              type="password"
              placeholder="Password"
              v-model="password"
            />
          </div>
  
          <Error :message="cnfpasserror" v-if="cnfpasserror" />
          <div class="mb-3 password">
            <input
              class="form-control"
              id="inputPassword"
              type="password"
              placeholder="Confirm password"
              v-model="cnfpassword"
            />
          </div>
          <Error :message="passnotmatch" v-if="passnotmatch" />
  
          <div class="d-flex align-items-center">
            <input type="submit" class="btn login-btn" style="margin-right: 0" value="Register"/>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Error from "~/components/Error";
  export default {
    name: "new-account",
    head: {
      script: [
        {
          src: "/app/js/bootstrap.bundle.min.js",
          body: true,
          crossorigin: "anonymous",
        },
        {
          src: "/app/js/scripts.js",
          body: true,
          crossorigin: "anonymous",
        },
      ],
    },
    data() {
      return {
        name: "",
        email: "",
        password: "",
        cnfpassword: "",
        emailerror: null,
        cnfpasserror: null,
        passerror: null,
        nameerror: null,
        passnotmatch: null,
        loader: false,
      };
    },
  
    methods: {
  
      async register() {
        this.emailerror = null;
        this.passerror = null;
        this.cnfpasserror = null;
        this.nameerror = null;
        this.passnotmatch = null;
        try {
          if (!this.name) {
            this.nameerror = "Please enter your name!";
          }
          if (!this.email) {
            this.emailerror = "Please enter your email!";
          }
          if (!this.password) {
            this.passerror = "Please enter your password";
          }
          if (!this.cnfpassword) {
            this.cnfpasserror = "Please confirm your password";
          }
          if (this.password == this.cnfpassword) {
            if (this.email && this.password) {
              this.loader = true;
              const response = await this.$axios.post("mails/registerEmployee", {
                email: this.email,
                password: this.password,
                company_name: this.company_name,
                contact_number: this.contact_no,
                type: "employer",
              });
              this.userdetail = response.data;
              if (this.userdetail.code == 200) {
                this.$swal.fire(
                    'Thank You for your registration. Please Login to continue',
                  );
                this.$router.push("/employer-login");
  
              } else if(this.userdetail.code == 201){
                this.loader = false;
                this.$swal.fire({
                    icon: 'error',
                    title: 'User has not right to access any form. Please contact to Admin.',
                    // text: 'the error is: ' + this.error,
                    footer: ''
                  });
              } else {
                this.loader = false;
                this.emailerror = this.userdetail.message.email[0];
                this.passerror = this.userdetail.message.password[0];
              }
            }
          } else {
            this.passnotmatch = "Password and Confirm Password does not match";
          }
        } catch (e) {
          this.loader = false;
          this.emailerror = "Email is already registered"; //$user.message.email; //e.response.data.message;
        }
      },
    },
  };
  </script>
  