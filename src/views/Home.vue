<template>
  <Navbar/>
   <div>
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Cookies from 'js-cookie';

export default {
components:{
  Navbar
},
setup() {
  console.log('js-cookies:' , Cookies.get());
  console.log('document.cookie:', document.cookie);
}
}
</script>