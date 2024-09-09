<!-- resources/js/components/PhoneNumberValidator.vue -->
<template>
    <div>
      <label for="contactfield" class="form-label">Contact Number<span style="color:red">*</span></label>                      
      <input
      id="contactfield"
        type="text"
        v-model="localcontact"
        class="form-control"
        @input="validatePhoneNumber"
        @keydown="allowOnlyNumbers"
        placeholder="Enter mobile phone number"
        maxlength="15"
      />
      <span v-if="phoneError" style="color:red">{{ phoneError }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialPhoneNumber: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        localcontact: this.initialPhoneNumber,
        phoneError: null,
      };
    },
    methods: {
      validatePhoneNumber() {
        // Ensure input only contains numbers
        this.localcontact = this.localcontact.replace(/[^0-9]/g, ''); 
  
        // Check if the phone number is within a reasonable length (e.g., 10 to 15 digits)
        if (this.localcontact.length < 10 || this.localcontact.length > 15) {
          this.phoneError = 'Mobile number must be between 10 to 15 digits.';
        } else {
          this.phoneError = null; // Clear error if within limits
        }
         // Emit updated value
         this.$emit('input', this.localcontact);
      },
      allowOnlyNumbers(event) {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
          event.preventDefault();
        }
      },
    },
    watch: {
      value(newValue) {
      this.localcontact = newValue; 
      if (!newValue) this.phoneError = null; 
    },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  