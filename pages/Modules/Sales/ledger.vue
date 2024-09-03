<template>
  <div id="layoutSidenav">
    <CommonSidebar />
    <div id="layoutSidenav_content">
      <CommonHeader />
      <main>
        <div class="container-fluid">
          <div class="card mb-4">
          <div class="card-header icon-title"><a href="#"><i class="fa fa-shield-alt"></i></a><h4>General Ledger</h4></div>
         
          <div class="image-container">
            <img class="center" height="30%" width="30%" src="~/assets/images/comingsoon.png" />
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
  name: "chart-account",
  
  
  data() {
    return {
     
    };
  },

  mounted() {
   
  },
  beforeMount() {
   

  },
  methods: {
  
  }
};
</script>
<style scoped>

</style>

