<template>
  <Navbar/>
  <div class="main_section">
    <div class="title col">
      <h1>
        入庫填報
      </h1>
    </div>
    <div class="col">
      <div class="button_wrap d-flex">
        
        <router-link to="/store_new">
<button class="add_btn"> 
 新品入庫
 </button>
        </router-link>
      
        <button class="return_btn">
  歸還入庫
      </button>
      </div>
    </div>
    <div class="container-fluid datagrid_section">
      <div class="row row1">
        <div class="col">
          <p>設備總類</p>
          <input type="text">
        </div>
        <div class="col">
          <p>
            設備分類
          </p>
          <input type="text">
        </div>
        <div class="col">
          <p>
            資產編號
          </p>
          <input type="text">
        </div>
        <div class="col">
          <p>
            物品名稱
          </p>
          <input type="text">
        </div>
        <div class="col">
          <p>狀態</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="statusDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ selectedItem || '請選擇' }}
          </button>
            <div class="dropdown-menu" aria-labelledby="statusDropdown">
              <p class="dropdown-item" @click="selectStatus('選項1')">選項1</p>
              <p class="dropdown-item" @click="selectStatus('選項2')">選項2</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row row2">
        <div class="col">
          <p>區域</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ selectedAreaItem || '請選擇' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="areaDropdown">
              <p class="dropdown-item" @click="selectArea('選項1')">選項1</p>
              <p class="dropdown-item" @click="selectArea('選項2')">選項2</p>
            </div>
          </div>
        </div>
        <div class="col">
          <p>櫃位</p>
          <div class="dropdown">
            <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ selectedLocateItem || '請選擇' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
              <p class="dropdown-item" @click="selectCabinet('選項1')">選項1</p>
              <p class="dropdown-item" @click="selectCabinet('選項2')">選項2</p>
            </div>
          </div>
        </div>
        <div class="col">
          <p>
            申請入庫日期（起）
          </p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="selectedDate" class="date-input" @focus="showDatePicker = true" @blur="showDatePicker = false" />
              <span class="icon" @click="showDatePicker = !showDatePicker">
          <i class="fas fa-calendar"></i>
        </span>
              <div class="date-picker" v-if="showDatePicker">
                <datepicker v-model="selectedDate"></datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <p>
            申請入庫日期(迄)
          </p>
          <div class="date-selector">
            <div class="input-container">
              <input type="date" v-model="selectedEndDate" class="date-input" @focus="showEndDatePicker = true" @blur="showEndDatePicker = false" />
              <span class="icon" @click="showEndDatePicker = !showEndDatePicker">
          <i class="fas fa-calendar"></i>
        </span>
              <div class="date-picker" v-if="showEndDatePicker">
                <datepicker v-model="selectedEndDate"></datepicker>
              </div>
            </div>
          </div>
        </div>
        <div class="col d-xl-block d-lg-block d-md-block d-none"></div>
      </div>
    </div>
    <div class="col justify-content-center d-flex">
      <div class="button_wrap d-flex">
        <button class="search_btn">
        檢索
      </button>
        <button class="empty_btn" @click="clear">
  清空
      </button>
      </div>
    </div>
    <DataGrid :columnResizing="true" style="height:300px" :virtualScroll="true" :pagination="true" :data="data" :total="total" :pageSize="pageSize" :pagePosition="pagePosition" :pageLayout="customPageLayout">
      <GridColumn field="status">
      </GridColumn>
      <GridColumn field="inv" title="編號" :sortable="true"></GridColumn>
      <GridColumn field="name" title="設備總類" :sortable="true"></GridColumn>
      <GridColumn field="amount" title="設備分類" align="right" :sortable="true"></GridColumn>
      <GridColumn field="price" title="資產編號" align="right" :sortable="true"></GridColumn>
      <GridColumn field="cost" title="物品名稱" align="right" :sortable="true"></GridColumn>
      <GridColumn field="note" title="狀態" :sortable="true" width="6%"></GridColumn>
      <GridColumn field="amount" title="區域" align="right" :sortable="true" width="5%"></GridColumn>
      <GridColumn field="price" title="櫃位" align="right" :sortable="true" width="5%"></GridColumn>
      <GridColumn field="cost" title="申請入庫日期" align="right" :sortable="true" width="10%"></GridColumn>
      <GridColumn field="note" title="申請人員" :sortable="true" width="8%"></GridColumn>
      <GridColumn field="status">
      </GridColumn>
    </DataGrid>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue';
  export default {
    components: {
      Navbar
    },
    props: {
      label: String,
    },
    computed: {
      customPageLayout() {
        return ['first', 'prev', 'sep', 'manual', 'sep', 'next', 'last', 'sep', 'refresh', 'list', 'sep', 'info', 'sep', 'pages'];
      },
    },
    data() {
      return {
        selectedItem: '',
        selectedLocateItem: '',
        selectedAreaItem: '',
        selectedStartDate: null,
        selectedEndDate: null,
        showStartDatePicker: false,
        showEndDatePicker: false,
        total: 100,
        pageSize: 20,
        data: [],
        pagePosition: "bottom",
        pageOptions: [{
            value: "bottom",
            text: "Bottom"
          },
          {
            value: "top",
            text: "Top"
          },
          {
            value: "both",
            text: "Both"
          }
        ]
      };
    },
    created() {
      this.data = this.getData(this.total);
    },
    methods: {
      selectStatus(item) {
        this.selectedItem = item;
        this.showDatePicker = false;
      },
      selectArea(item) {
        this.selectedAreaItem = item;
        this.showDatePicker = false;
      },
      selectCabinet(item) {
        this.selectedLocateItem = item;
        this.showDatePicker = false;
      },
      // Clear other data properties if needed
      clear() {
        // Clear input fields
        const inputFields = document.querySelectorAll('.datagrid_section input[type="text"]');
        inputFields.forEach((input) => {
          input.value = '';
        });
        // Clear dropdowns
        this.selectedItem = '';
        this.selectedAreaItem = '';
        this.selectedLocateItem = '';
        // Clear selected date
        this.selectedDate = null;
        // Clear other data properties if needed
      },
      getData(total) {
        let data = [];
        for (let i = 1; i <= total; i++) {
          let amount = Math.floor(Math.random() * 1000);
          let price = Math.floor(Math.random() * 1000);
          data.push({
            inv: "Inv No " + i,
            name: "Name " + i,
            amount: amount,
            price: price,
            cost: amount * price,
            note: "Note " + i
          });
        }
        return data;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .main_section {
    padding: 0 10%;
    h1 {
      margin-top: 30px;
      text-align: center;
      font-size: 55px;
      font-weight: 600;
      @include title_color;
    }
    .button_wrap {
      margin-bottom: 25px;
      gap: 20px;
      .add_btn {
        @include datagrid_button_no1;
      }
      button.add_btn:hover {
        background-color: #537EBC;
      }
      button.return_btn:hover {
        background-color: #708FBA;
      }
      button.search_btn:hover {
        background-color: #5e7aa2;
      }
      button.empty_btn:hover {
        background-color: #5D85BD;
      }
      .return_btn {
        @include datagrid_button_no2
      }
      .search_btn {
        @include search_and_send_btn
      }
      .empty_btn {
        @include empty_btn
      }
    }
    .datagrid_section {
      padding: 40px 125px;
      height: 270px;
      @include datagrid_bg;
      p {
        @include datagrid_title
      }
      input {
        @include dropdown_btn;
        width: 200px;
        height: 35px;
      }
      button {
        padding: 0;
        width: 100%;
        font-size: 18px;
        height: 100%;
      }
      .dropdown {
        width: 200px;
        height: 35px;
        @include dropdown_btn;
        .dropdown-toggle::after {
          font-size: 20px;
          margin-left: 60%;
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
    .row1 {
      @include row_margin
    }
    .datagrid-header-row {
      background: var(--c-7, #1F4E5F);
    }
    .datagrid-header .datagrid-cell {
      text-align: left importtant;
    }
  }
</style>