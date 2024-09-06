<!-- resources/js/components/EmailValidator.vue -->
<template>
    <div>
      <label for="emailfield" class="form-label">Email Address<span style="color:red">*</span></label>
      <input id="emailfield" type="email"  class="form-control" 
      v-model="localemail" @input="validateEmail" placeholder="Enter a Valid Email Address" />

      <span v-if="emailError" style="color:red">{{ emailError }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialEmail: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        localemail: this.initialEmail,
        emailError: null,
      };
    },
    methods: {
      validateEmail() {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailPattern.test(this.localemail)) {
          this.emailError = null;
        } else {
          this.emailError = 'Please Enter Valid Email';
        }
          // Emit updated value
          this.$emit('input', this.localemail);
      },
      
    },
    watch: {
      value(newValue) {
      this.localemail = newValue; 
      if (!newValue) this.emailErrorError = null; 
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any styles specific to the validation component here */
  </style>
  