<template>
  <div>
    <label for="namefield" class="form-label">Name<span style="color:red">*</span></label>
    <input
      id="namefield"
      type="text"
      v-model="localName"
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
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localName: this.value,
      nameError: null,
    };
  },
  methods: {
    handleInput() {
      // Convert the input to uppercase
      this.localName = this.localName.toUpperCase();

      // Remove any numbers or unwanted characters
      this.localName = this.localName.replace(/[^A-Z'@ ]/g, '');

      // Emit the input event to update parent
      this.$emit('input', this.localName); 
    },
    validateName(event) {
      const char = event.key;
      // Allow only letters, spaces, apostrophes, and '@'
      if (/^[A-Za-z'@ ]$/.test(char) || ['Backspace', 'Tab'].includes(event.key)) {
        this.nameError = null; // Clear error if the input is valid
      } else {
        event.preventDefault(); // Prevent invalid character input
        this.nameError = 'Only letters, spaces, apostrophes, and @ are allowed.';
      }
    },
  },
  watch: {
    value(newValue) {
      this.localName = newValue; // Sync localName with the prop value
      if (!newValue) this.nameError = null; // Clear error when name is reset
    },
  },
};
</script>

<style scoped>
/* Add any styles specific to the validation component here */
</style>
