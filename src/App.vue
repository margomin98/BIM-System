<template>
  <router-view/>
</template>

<script>


export default{

}
</script>

<style lang="scss">
body{
  background-image: url('@/assets/body/bg.png');
}
a{
  color:white;
  text-decoration: none;
}
.pagination-info {
    float: right;
    margin: 0 6px;
    padding: 0;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    font-weight: 700;
    color: white;
}
.l-btn-left .l-btn-empty {
    margin: 0 6px;
    width: 16px;
}
.pagination span {
    font-size: 14px;
    color: white;
    font-weight: 600;
}
.datagrid .datagrid-pager {
    padding: 2px 4px;
    display: inherit;
    background-color: #1F4E5F;
}
.datagrid-header-row {
    background: #1F4E5F !important;
    color: white!important;
    font-weight: 700 !important;
    height: 40px !important;
}
.datagrid-row-over {
    background: #eaf2ff !important;
    color: #000000 !important;
    cursor: default 
}
.datagrid-cell {
    text-align: left!important;
    height: auto!important;
    font-size: inherit!important;
    display: flex !important;
    justify-content: space-between!important;
    padding: 0 10px !important;
}
</style>
