<template>
  <Navbar/>
   <div>
    
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
components:{
  Navbar
},
setup() {
  console.log('document.cookie:', document.cookie);
}
}
</script>