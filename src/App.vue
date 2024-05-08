<template>
    <router-view v-slot="{ Component }">
        <keep-alive :include="[/Datagrid/]" :max="1">
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import "./assets/css/global.scss";

h1 {
    margin-top: 40px !important;
    text-align: center;
    font-weight: 700 !important;
    color: #132238 !important;
}

nav .navbar-collapse {
    z-index: 999;
}

.datagrid_section .multiselect__tags {
    min-height: 35px;
    display: flex;
    align-items: end;
    padding: unset;
    padding-left: 5px;
}

body {
    min-height: 100vh;
}

.multiselect__single {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#brandingLogo {
    display: none !important;
}

.ag-chart-no-data-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
}

body {
    background-image: url('@/assets/body/bg.png');
    padding-right: unset !important;
    background-size: cover;
}

a {
    color: white;
    text-decoration: none;
}

.dropdown-menu p,
.dropdown-item {
    padding: 5px 10px !important;
    font-size: 18px !important;
    margin-bottom: 0 !important;

    &:hover {
        color: white !important;
        background-color: #2D4864 !important;
    }

    :active {
        color: white !important;
    }
}

.dropdown .dropdown-toggle {
    padding: 0;
    display: flex;
    border: none;
}

.dropdown-item {
    text-align: left;
}

.ag-body .ag-cell {
    border: 0;
}

.ag-cell-value {
    display: flex;
    align-self: center;
    font-size: 18px;

    div {
        display: flex;
        align-items: center;
    }
}

.ag-header-container {
    background: #1F4E5F;

    span {
        color: white;
        font-weight: 700;
        font-size: 18px;
    }

    .ag-header-cell-text {
        text-align: center;
        flex-grow: 1;
    }

    .ag-header-group-cell-label,
    .ag-header-cell-label {
        justify-content: space-between;
    }
}

.ag-root-wrapper {
    border: unset !important
}

.ag-body {
    .ag-cell {
        border-bottom: 1px solid #babfc7 !important;
        border-left: 1px solid #babfc7 !important;
        border-right: 1px solid #babfc7 !important;
        align-items: center;
        display: flex;
    }
}

.grid_checkbox {
    display: flex;
    justify-content: center;
    align-items: center;

    .ag-selection-checkbox {
        margin-right: 0 !important;
    }
}

.gold-header {
    .ag-header-cell-text {
        cursor: pointer;
        background: #98CCD3;
        padding: 5px;
        border-radius: 7px;
    }
}

.ag-paging-panel {
    background: #1F4E5F;
    font-weight: 700;
    height: 40px;

    span {
        color: white
    }
}

.info_icon {
    height: 14.5px;
    width: 14.5px;
    margin: 0 2px 5px;
}

.swiper-button-next {
    color: pink !important;
}

.readonly_box {
    // pointer-events: none;
    justify-content: left !important;
    padding: 0 10px;
    user-select: none;
    overflow: hidden;

    &:focus {
        outline: none !important;
        background-color: #B4B4B4 !important;
        box-shadow: unset !important;
        cursor: pointer;
    }
}

.main_section {

    // .content .dropdown button{
    // 	padding: 0!important;
    // }
    input {
        text-align: left !important;
    }

    .input-number {
        padding: 0 10px;
    }

    .dropdown-menu {
        padding: 0 !important;
        background: white !important;
    }
}

.modal {
    .input-number {
        padding: 0 10px;
        text-align: left !important;
    }

    .modal-header {
        .close_icon {
            cursor: pointer;
            display: flex;
            align-self: baseline;
            margin-bottom: 0;
            font-size: 18px;
            height: 30px;
            font-weight: 800;
        }

        .modal-title {
            width: 100%;
            word-break: break-word;
            margin: 0 auto;
            display: flex;
            align-self: baseline;
        }
    }
}

.p-datatable-wrapper {
    border: 1px solid black
}

.datatable_checkbox {
    text-align: center;

    input {
        display: inline-block !important;
    }
}

//放大Swiper圖片
.swiper_section swiper-slide {
    position: relative;

    .swiper_bottom_img {
        filter: brightness(40%);
        width: 100%;
        height: auto;
    }

    .zoom_img {
        background: transparent;
        border: none;
        position: absolute;
        top: 50%;
        left: 50%;
        justify-content: center;
        display: flex;
        align-items: center;
        transform: translate(-50%, -50%);

        img {
            width: 40px !important;
        }
    }
}

.zoom_img_modal {
    .modal-header {
        h5 {
            font-weight: 700;
        }

        background: #528091;
        color: white;
        display: flex;
        justify-content: center;

        .close_icon {
            cursor: pointer;
        }

        .modal-title {
            margin: auto;
        }
    }

    .modal-body {
        img {
            width: 100%;
            height: auto;
        }
    }
}

//放大Swiper圖片
@media only screen and (min-width: 1200px) {

    .main_button_wrap {
        justify-content: left !important;
    }

    h1 {
        font-size: 55px;
    }

    .container-fluid {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    .modal {
        padding: 0 !important;

        .modal-body {
            padding: 3% !important;
        }
    }

    p.readonly_box,
    .form-control,
    .main_section .dropdown-toggle,
    .main_section .dropdown-item {
        font-size: 16px !important;
    }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_button_wrap {
        justify-content: left !important;
    }

    h1 {
        font-size: 55px;
    }

    .modal {
        padding: 0 !important;

        .modal-dialog {
            padding: 0 5%;
        }

        .modal-body {
            padding: 5% !important;
        }
    }

    p.readonly_box,
    .form-control,
    .main_section .dropdown-toggle,
    .main_section .dropdown-item {
        font-size: 16px !important;
    }
}

@media only screen and (max-width: 767px) {

    h1 {
        font-size: 40px;
    }

    .modal {
        padding: 0 !important;

        .modal-dialog {
            padding: 0 5%;
        }

        .modal-body {
            padding: 5% !important;
        }
    }

    p.readonly_box,
    .form-control,
    .main_section .dropdown-toggle,
    .main_section .dropdown-item {
        font-size: 16px !important;
    }
}
</style>
