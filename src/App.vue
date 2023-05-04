
<script>
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
  }
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
