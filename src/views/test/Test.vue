<template>
  <Navbar />
  <div class="main_section">
  </div>
  <div id="app">
    <div class="accordion setting_tab">
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


.setting_tab {
  width: 400px;

  li,
  ul {
    padding-left: 0;
    list-style-type: none;
  }

  .inner_form_check,
  .header_wrap input {
    margin-right: 8px;
  }

  .header_wrap {

    padding: 10px;
    height: 38px;
    margin-bottom: 0;
    align-content: center;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .icon {
      height: 10px;
      width: 15px;
      cursor: pointer;
      transition: transform 0.3s ease;
      transform: rotate(180deg);
    }

    .icon:hover {
      transform: rotate(0deg);
    }
  }

  .accordion-header {
    background-color: #86abb0;
    font-weight: 700;
    color: white;
  }

  .accordion-body {
    background: #dedede;
    padding: 16px;

    ul {
      margin-bottom: 0;

      .check_wrap {
        display: flex;
        font-size: 15px;
        font-weight: 700;
        color: black;

        input {
          border: none
        }

      }
    }
  }

}
</style>
