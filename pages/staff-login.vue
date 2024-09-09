<template>
  <div class="bg-login bg-login-1">
    <div class="row login-box">
      <img src="~/assets/images/logo-3.png" />
      <Loader v-if="loader" />
      <form method="post" @submit.prevent="login">
        <div class="mb-3">
          <label for="inputEmail">Login ID</label>
          <input
            class="form-control"
            id="inputEmail"
            v-model="email"
            type="text"
          />
        </div>

        <div class="mb-3 password">
          <label for="inputPassword">Password</label>
          <a class="small ml-auto forgot-password" href="/forget-password"
            >Forgot Password?</a
          >
          <input
            class="form-control"
            id="inputPassword"
            v-model="password"
            type="password"
          />
        </div>
        <Error :message="emailerror" v-if="emailerror" />
    
        <div class="d-flex align-items-center mt-3">
          <input type="submit" class="btn login-btn" value="Login" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Error from "~/components/Error";
import Loader from "../components/loader.vue";
export default {
  components: { Loader },
  name: "staff-login",
  head: {
    script: [
      {
        src: "/js/bootstrap.bundle.min.js",
        body: true,
        crossorigin: "anonymous",
      },
      {
        src: "/js/scripts.js",
        body: true,
        crossorigin: "anonymous",
      },
    ],
  },
  data() {
    return {
      loader: false,
      email: "",
      password: "",
      emailerror: null,
      passerror: null,
      userdetail: null,
    };
  },
  methods: {
    async login() {
      this.emailerror = null;
      this.passerror = null;
      try {
        if (!this.email) {
          this.emailerror = "Email is Required!";
        }
        if (!this.password) {
          this.passerror = "Password is Required!";
        }
        if (this.email && this.password) {
          this.loader = true;
          const response = await this.$axios.post("auth/login", {
            email: this.email,
            password: this.password,
            type:""
          });
          this.userdetail = response.data;
          
          if (this.userdetail.code == 200) {
            localStorage.setItem(
              "userdetails",
              JSON.stringify(this.userdetail)
            );
          
            this.loader = false;
            this.$router.push(this.userdetail.route_alt);
          } else {
            this.loader = false;
            this.emailerror = this.userdetail.message;
          }
        }
      } catch (e) {
        console.log("my error", e);
        console.log("api not working");
        this.loader = false;
        this.emailerror = "Email and Password does not match";
      }
      console.log("my data", this.userdetail);
    },
  },
};
</script>
