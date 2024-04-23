<template>
  <Navbar />
  <div class="main_section">
  </div>
  <div id="app">
  <div class="accordion">
    <div v-for="(main, main_index) in permissionList" :key="main.id">
      <div class="accordion-header">
        <ul>
          <li>
            <label :for="'#header_'+main.id">
              <input type="checkbox" v-model="main.checked" :id="'header_'+main.id" @click="selectAllitems($event, main_index)"> {{ main.TitleName }}
            </label>  
            <span class="accordion-toggle" @click="toggleAccordion(main_index)"> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-down"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </li>
        </ul>
      </div>
      <div v-show="isOpen.includes(main_index)" class="accordion-body" id="accordion-body-1">
        <ul>
          <li v-for="sub in main.List" :key="sub.id">
            <label :for="`#${sub.id}`">
              <input type="checkbox" :id="sub.id" v-model="sub.checked" @change="isAllSelected(main_index)"> {{ sub.TitleName }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

</template>

<script setup>
import {
  ref,
  onMounted
} from 'vue';
import Navbar from "@/components/Navbar.vue";
import allPermission from "@/assets/json/permission.json"
  const permissionList = ref(allPermission.Data);
  const isOpen = ref([]);

  const isAllSelected = (main_index) => {
    const allSeleted = permissionList.value[main_index].List.every(sub => sub.checked);
    permissionList.value[main_index].checked = allSeleted;
  };
  onMounted(() => {
  });
  const selectAllitems = (event, main_index) => {
    permissionList.value[main_index].List.forEach((item)=>{
      item.checked = event.target.checked;
    })
  };

  const toggleAccordion = (accordionNumber) => {
    const indexToRemove = isOpen.value.findIndex(number => number === accordionNumber);
    if(indexToRemove !== -1) {
      isOpen.value.splice(indexToRemove, 1);
    } else {
      isOpen.value.push(accordionNumber);
    }
  };
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";
@import "@/assets/css/theme.css";
@import "@/assets/css/loading.css";

.accordion ul{
  padding-left:0;
  padding: 10px;
  margin-bottom: 0;
   li{
  list-style-type:none;
}
}
</style>
