<template>
  <Navbar />
<div class="main_section">
      

    <DataTable  v-model:selection="selectedProduct"  :value="data" lazy  resizableColumns columnResizeMode="fit" showGridlines  scrollable scrollHeight="300px"  tableStyle="min-width: 50rem"
        @page="onPage($event)"
        paginator :rows="5" :totalRecords="totalRecords"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
    >
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="code" header="Code" sortable ></Column>
      <Column field="name" header="Name" sortable ></Column>
      <Column field="category" header="Category" sortable ></Column>
      <Column field="quantity" header="Quantity" sortable ></Column>
    </DataTable>
    <button @click="add" type="button" class="btn btn-primary">increase totalRecords</button>
    <!-- <Paginator :rows="rows" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator> -->
     </div>
</template>

<script>
import { ref } from 'vue';
import Navbar from "@/components/Navbar.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import Paginator from 'primevue/paginator';

export default {
  name: 'App',
  components: {
    DataTable,
    Column,
    Navbar,
    // Paginator,
  },
  setup() {
    const data = ref([
      {
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
      },
      {
      code: 'zxccczxc',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
      },
      {
      code: 'asdasdasd',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
      },
      {
      code: 'addwqzxc',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
      },
      {
      code: 'bbfddfbvsd',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 24,
      },
    ]);
    const data2 =ref([
    {
      code: '123456789 ',
      name: ' Watch',
      category: 'Accessories',
      quantity: 1,
      },
      {
      code: '44aas5d4w5',
      name: 'Bamboo',
      category: 'zxca',
      quantity: 23,
      },
      {
      code: 'ax22c1a2w',
      name: 'Bamboo asdwqWatch',
      category: 'Accessories',
      quantity: 60,
      },
      {
      code: 'cccsq',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 54,
      },
      {
      code: 'zzxccaw',
      name: 'Bamboo Watch',
      category: 'Accessories',
      quantity: 13,
      },
    ])
    const totalRecords = ref(1000);
    const rows = ref(10);
    const currentPage = ref(1); // 当前页
    const selectedProduct = ref();
    function onPage(event) {
      // console.log(event);
      console.log('pagesize:',rows.value);
      console.log('需要第'+event.page+'頁(page從0開始)');
      console.log('排序的key:',event.sortField);
      console.log('升冪or降冪:',event.sortOrder);
      console.log('-----------------------------');
      data.value = data2.value
    }
    function add() {
      totalRecords.value ++;
    }
    return {
      data,
      selectedProduct,
      totalRecords,
      rows,
      currentPage,
      onPage,
      add,
    }
  },
}
</script>

<style src="@/assets/css/theme.css"></style>
<style lang="scss" scoped>

</style>