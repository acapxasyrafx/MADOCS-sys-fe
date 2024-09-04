<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark px-4">
    <!-- Sidebar Toggle-->
    <button
      class="btn btn-link btn-sm order-1 order-lg-0 me-4 mobile-menu"
      id="sidebarToggle"
      href="#!"
    >
      <i class="fal fa-bars"></i>
    </button>

    <!-- Navbar Brand-->
    <a class="navbar-brand" v-bind:href="route_alt">
      <img src="~/assets/images/logo-login.png" />
    </a>
    <!-- Navbar Brand-->

    <div class="d-flex ms-auto" >
     
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle user-icon psychiatrist"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fad fa-user"></i>
            <span>
              {{name}}
              <!-- <small>Psychiatrist</small> -->
            </span>
          </a>
          <ul
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
           
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" style="cursor:pointer;" @click="Logout()">Logout</a></li>
            <li><a href="/app/modules/change-password" class="dropdown-item">Change Password</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import moment from 'moment';
export default {
  name: "CommonHeader",
  data() {
    return {
      userdetails: null,
      name:"",
      id:"",
      message:"",
      try:[],
      route_alt: "",
    };
  },
   beforeMount() {
    this.userdetails = JSON.parse(localStorage.getItem("userdetails"));
    if(this.userdetails){
      this.name=this.userdetails.detail.name;
      this.id=this.userdetails.user.id;
      this.email=this.userdetails.user.email;
      this.role=this.userdetails.role.role;
      this.route_alt=this.userdetails.route;
    }

  },
  mounted() {
   
    },
   methods: {
    async Logout() {
       localStorage.removeItem('userdetails');
        this.$router.push("/staff-login");
    },
   


    getFormattedDate(date) {
            return moment(date).format("DD-MM-YYYY")
        },
  },
};
</script>
