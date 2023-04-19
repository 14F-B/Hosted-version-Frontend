<script>
export default {
  mounted() {
    let preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove();
      });
    }
  }
};
</script>

<template>    
    <RouterView />
    <div id="preloader"></div>
</template>

<style>
.form-control:disabled, .form-control:read-only {
    background-color: #1b1b1b !important;
    opacity: 1 !important;
}
</style>

