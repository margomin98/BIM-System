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

</template>

<script setup>
import {
  computed,
  ref,
  reactive,
  onMounted
} from 'vue';
import Navbar from "@/components/Navbar.vue";
import allPermission from "@/assets/json/permission.json"
  const permissionList = ref(allPermission.Data);
  const items = ref([
    { id: 1, name: 'Fluffy' },
    { id: 2, name: 'Whiskers' },
    { id: 3, name: 'Mittens' },
  ]);

  const selecteditemIds = ref([]);
  const selecteditemIds2 = ref([]);
  const isOpen = ref([]);

  const isAllSelected = (main_index) => {
    // return List.every(sub => sub.checked);
    // console.log(permissionList.value[main_index].List);
    const allSeleted = permissionList.value[main_index].List.every(sub => sub.checked);
    permissionList.value[main_index].checked = allSeleted;
    // return true;
  };
  const isAllSelected2 = computed(() => selecteditemIds2.value.length === items.value.length);
  onMounted(() => {
  });
  const selectAllitems = (event, main_index) => {
    permissionList.value[main_index].List.forEach((item)=>{
      item.checked = event.target.checked;
    })
  };

  const selectAllitems2 = (event) => {
    if (event.target.checked) {
      selecteditemIds2.value = items.value.map(item => item.id);
    } else {
      selecteditemIds2.value = [];
    }
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

@media only screen and (min-width: 1200px) {
  .main_section {
    padding: 0 10%;

    .button_wrap {
      margin-bottom: 25px;
      gap: 20px;

      .add_btn {
        @include datagrid_button_no1;
        width: 195px;

        &:hover {
          background-color: #537ebc;
        }
      }

      .search_btn {
        @include search_and_send_btn;

        &:hover {
          background-color: #5e7aa2;
        }
      }

      .empty_btn {
        @include empty_btn;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .export_btn {
        @include export_btn;

        &:hover {
          background-color: #274266;
        }
      }
    }

    .datagrid_section {
      .content {
        background: rgba(82, 136, 156, 0.8);
        border-radius: 10px;
        margin-bottom: 30px;
        height: 250px;
        align-items: center;
        display: flex;
        justify-content: center;
        padding: 0 2%;
      }

      .row {
        gap: 20px 30px;
        padding: 40px;

        p {
          @include datagrid_title;
        }

        input {
          @include dropdown_btn;
          width: calc(100% - 10%);
          height: 35px;
        }

        button {
          border: none;
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
        }

        .dropdown {
          width: calc(100% - 10%);
          height: 35px;
          @include dropdown_btn;

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;
            max-height: 250px;
            overflow-y: auto;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left !important;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    padding: 0 5%;

    .button_wrap {
      margin-bottom: 25px;
      gap: 20px;

      .add_btn {
        @include datagrid_button_no1;
        width: 190px;

        &:hover {
          background-color: #537ebc;
        }
      }

      .export_btn {
        @include export_btn;

        &:hover {
          background-color: #274266;
        }
      }

      .search_btn {
        @include search_and_send_btn;

        &:hover {
          background-color: #5e7aa2;
        }
      }

      .empty_btn {
        @include empty_btn;

        &:hover {
          background-color: #5d85bd;
        }
      }
    }

    .datagrid_section {
      .row {
        gap: 10px 0;
        padding: 30px;
        @include datagrid_bg;

        p {
          @include datagrid_title;
        }

        input {
          @include dropdown_btn;
          width: 100%;
          height: 35px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          text-align: left;
        }

        .dropdown {
          width: 100%;
          height: 35px;
          @include dropdown_btn;

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
      }
    }

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left !important;
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    padding: 5%;

    .button_wrap {
      margin-bottom: 25px;
      justify-content: center;
      gap: 20px;

      .add_btn {
        @include datagrid_button_no1;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #537ebc;
        }
      }

      .export_btn {
        @include export_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #274266;
        }
      }

      .search_btn {
        @include search_and_send_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #5e7aa2;
        }
      }

      .empty_btn {
        @include empty_btn;
        font-size: 18px;
        width: 100%;
        height: auto;

        &:hover {
          background-color: #5d85bd;
        }
      }
    }

    .datagrid_section {
      .row {
        gap: 10px 0;
        padding: 30px;
        @include datagrid_bg;

        p {
          @include datagrid_title;
          font-size: 18px;
        }

        input {
          @include dropdown_btn;
          width: 100%;
          height: 35px;
        }

        button {
          padding: 0;
          width: 100%;
          font-size: 18px;
          height: 100%;
          text-align: left;
        }

        .dropdown {
          width: 100%;
          height: 35px;
          @include dropdown_btn;

          .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: none;
          }

          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;

            p {
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
      }
    }

    .datagrid-header-row {
      background: var(--c-7, #1f4e5f);
    }

    .datagrid-header .datagrid-cell {
      text-align: left !important;
    }
  }
}
</style>
