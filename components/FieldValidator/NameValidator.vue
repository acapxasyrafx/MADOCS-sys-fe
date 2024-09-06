<!-- resources/js/components/NameValidator.vue -->
<template>
    <div>
      <label for="namefield" class="form-label">Name<span style="color:red">*</span></label>
      <input
        type="text"
        v-model="name"
        class="form-control"
        @input="handleInput"
        @keypress="validateName"
        placeholder="Enter the Staff Name"
      />
      <span v-if="nameError" style="color:red">{{ nameError }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialName: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        name: this.initialName,
        nameError: null,
      };
    },
    methods: {
      handleInput(event) {
      // Convert the input to uppercase
      this.name = this.name.toUpperCase();
    },
    validateName(event) {

      const char = String.fromCharCode(event.keyCode);
      if (/^[A-Za-z'@ ]+$/.test(char)) {
        this.nameError = null; // Clear error if the input is valid
      } else {
        event.preventDefault(); // Prevent invalid character input
        this.nameError = 'Only letters, spaces, apostrophes, and @ are allowed.';
      }
    },
  },
  watch: {
    name(newValue) {
      this.$emit('update:name', newValue);
      if (!newValue) this.nameError = null; // Clear error when name is reset
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to the validation component here */
</style>
