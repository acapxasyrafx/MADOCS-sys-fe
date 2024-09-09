<!-- NetworkStatus.vue -->
<template>
    <div v-if="!isOnline" class="network-status-popup">
      <p>No network connectivity. Please check your internet connection.</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOnline: navigator.onLine
      };
    },
    created() {
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    },
    destroyed() {
      window.removeEventListener('online', this.updateOnlineStatus);
      window.removeEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
      updateOnlineStatus() {
        this.isOnline = navigator.onLine;
      }
    }
  };
  </script>
  
  <style>
  .network-status-popup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: red;
    color: white;
    text-align: center;
    padding: 10px;
    z-index: 1000;
  }
  </style>
  