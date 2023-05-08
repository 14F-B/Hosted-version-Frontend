
<script>
import jwt_decode from 'jwt-decode';

export default {
  mounted() {
    let preloader = document.querySelector('#preloader');
    if (preloader) {
      preloader.style.display = 'block';
      window.addEventListener('load', () => {
        preloader.style.display = 'none';
      });
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 5000);
    }
    const backtotop = document.querySelector('.back-to-top');
    if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    window.addEventListener('scroll', toggleBacktotop);
  }
  },
  created() {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      this.$store.dispatch('logout');
    }
  }
},

};
</script>

<template>    
    <RouterView />
    <div id="preloader"></div>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-square-fill text-light"></i></a>
</template>

<style>
.form-control:disabled, .form-control:read-only {
    background-color: #1b1b1b !important;
    opacity: 1 !important;
}
</style>
