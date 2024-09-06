<!-- resources/js/components/NRICValidator.vue -->
<template>
    <div>
        <label for="icfield" class="form-label">NRIC Number<span style="color:red">*</span></label>
                            
      <input
        type="text"
        v-model="nricno"
        class="form-control"
        @input="validateNRIC"
        placeholder="Enter NRIC number"
      />
      <span v-if="nricError" style="color:red">{{ nricError }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialNRIC: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        nricno: this.initialNRIC,
        nricError: null,
      };
    },
    methods: {
      validateNRIC(event) {
        // Remove any non-digit characters from the input
        this.nricno = this.nricno.replace(/\D/g, '');
  
        // Check if the NRIC number exceeds 12 digits
        if (this.nricno.length > 12) {
          this.nricno = this.nricno.slice(0, 12); // Limit to 12 digits
          this.nricError = 'NRIC number must be 12 digits only.';
        } else {
          this.nricError = null; // Clear error if within limits
        }
      },
    },
    watch: {
      nricno(newValue) {
        this.$emit('update:nricno', newValue);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any styles specific to the NRIC validation component here */
  </style>
  