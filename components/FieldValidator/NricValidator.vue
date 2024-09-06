<template>
  <div>
    <label for="icfield" class="form-label">
      NRIC Number<span style="color: red">*</span>
    </label>
    <input
      id="icfield"
      type="text"
      v-model="localnricno"
      class="form-control"
      @input="validateNRIC"
      placeholder="Enter NRIC number"
      maxlength="12"
    />
    <span v-if="nricError" style="color: red">{{ nricError }}</span>
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
      localnricno: this.initialNRIC,
      nricError: null,
    };
  },
  methods: {
    validateNRIC(event) {
      // Remove any non-digit characters from the input
      this.localnricno = this.localnricno.replace(/\D/g, '');

      // Check if the NRIC number is not exactly 12 digits
      if (this.localnricno.length !== 12) {
        this.nricError = 'NRIC number must be exactly 12 digits.';
      } else {
        this.nricError = null; // Clear error if exactly 12 digits
      }

      // Emit updated value
      this.$emit('input', this.localnricno);
    },
  },
  watch: {
    initialNRIC(newValue) {
      this.localnricno = newValue;
      if (!newValue) this.nricError = null;
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to the NRIC validation component here */
</style>
