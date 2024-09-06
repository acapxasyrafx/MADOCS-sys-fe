<!-- resources/js/components/PhoneNumberValidator.vue -->
<template>
    <div>
      <label for="contactfield" class="form-label">Contact Number<span style="color:red">*</span></label>                      
      <input
        type="text"
        v-model="contact"
        class="form-control"
        @input="validatePhoneNumber"
        @keydown="allowOnlyNumbers"
        placeholder="Enter mobile phone number"
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
        contact: this.initialPhoneNumber,
        phoneError: null,
      };
    },
    methods: {
      validatePhoneNumber() {
        // Ensure input only contains numbers
        this.contact = this.contact.replace(/[^0-9]/g, ''); 
  
        // Check if the phone number is within a reasonable length (e.g., 10 to 15 digits)
        if (this.contact.length < 10 || this.contact.length > 15) {
          this.phoneError = 'Mobile number must be between 10 to 15 digits.';
        } else {
          this.phoneError = null; // Clear error if within limits
        }
      },
      allowOnlyNumbers(event) {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
          event.preventDefault();
        }
      },
    },
    watch: {
      contact(newValue) {
        this.$emit('update:contact', newValue);
      },
    },
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  </style>
  