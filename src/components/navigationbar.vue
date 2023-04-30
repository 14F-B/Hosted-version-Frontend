<template>

    <div id="header" class="fixed-top d-flex align-items-cente">
      
      <div class="container-fluid container-xl d-flex flex-row">
        <a href="/" class="logo me-auto me-lg-0"><img id="logo" src="../assets/pictures/logo.png" alt="" class=""></a>

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><a class="nav-link scrollto active" href="/#welcome-screen" >Home</a></li>
            <li><a class="nav-link scrollto" href="/#about" >Ismertető</a></li>
            <li><a class="nav-link scrollto" href="/#actually" >Programok</a></li>
            <li><a class="nav-link scrollto" href="/#media">Média</a></li>
            <li><a class="nav-link scrollto" href="/#map">Helyszín</a></li>
            <li><a class="nav-link scrollto" href="/#contact">Kapcsolat</a></li>
        
            <div v-if="!isLoggedIn" class="navbar-buttons m-3">
                <label class="modal-btn" for="modal-toggle">Bejelentkezés/<br>Regisztráció</label>
            </div>
            <div v-if="isLoggedIn" class="navbar-buttons m-3 ">
            <form action="/userpage">
              <button class="logoutbtn navbar-buttons" type="submit">Fiók</button>
            </form> 
            </div>
            <div v-if="isLoggedIn" class="navbar-buttons m-3">
            <form @click="logout">
              <button class="logoutbtn navbar-buttons" type="submit">Kijelentkezés</button>
            </form> 
            </div>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </div>

    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import { on, select } from '../assets/js/main.js'


export default {
  computed: {
    ...mapGetters([
      'getEmail'
    ]),
    isLoggedIn() {
      return this.getEmail !== ''
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  },
mounted() {
  // Hamburger menü gombra kattintás eseménykezelő
  this.$el.querySelector('.mobile-nav-toggle').addEventListener('click', (e) => {
    this.$el.querySelector('#navbar').classList.toggle('navbar-mobile')
    e.target.classList.toggle('bi-list')
    e.target.classList.toggle('bi-x')
  })

  // Navbar dropdown elemre kattintás eseménykezelő
  this.$el.querySelector('.navbar .dropdown > a').addEventListener('click', (e) => {
    if (this.$el.querySelector('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      e.target.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = this.$el.querySelectorAll('#navbar .scrollto');
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = this.$el.querySelector(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  window.addEventListener('scroll', navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = this.$el.querySelector('#header');
    let offset = header.offsetHeight;
    let elementPos = this.$el.querySelector(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = this.$el.querySelector('#header');
  let selectTopbar = this.$el.querySelector('#topbar');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled');
        }
      } else {
        selectHeader.classList.remove('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled');
        }
      }
    };
    window.addEventListener('load', headerScrolled);
    window.addEventListener('scroll', headerScrolled);
  }
  /**
   * Scroll with offset on page load with hash links in the URL
   */
  if (window.location.hash) {
    if (this.$el.querySelector(window.location.hash)) {
      scrollto(window.location.hash);
    }
  }
}

}
</script>


