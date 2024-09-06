<!-- resources/js/components/EmailValidator.vue -->
<template>
    <div>
      <label for="emailfield" class="form-label">Email Address<span style="color:red">*</span></label>
      <input type="email"  class="form-control" v-model="email" @input="validateEmail" placeholder="Enter a Valid Email Address" />

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
        email: this.initialEmail,
        emailError: null,
      };
    },
    methods: {
      validateEmail() {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailPattern.test(this.email)) {
          this.emailError = null;
        } else {
          this.emailError = 'Please Enter Valid Email';
        }
      },
    },
    watch: {
      email(value) {
        this.$emit('update:email', value);
        if (!value) this.emailError = null; // Clear error when email is reset
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any styles specific to the validation component here */
  </style>
  