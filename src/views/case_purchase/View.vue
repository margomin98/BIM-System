<template>
    <Navbar />
    <div class="main_section">
        <div class="title col">
            <h1>檢視專案採購單</h1>
        </div>
        <case_purchase_view></case_purchase_view>
        <div class="col button_wrap">
            <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
        </div>
    </div>
</template>
<script setup>
    import Navbar from '@/components/Navbar.vue';
    import case_purchase_view from '@/components/case_purchase_page/case_purchase_view.vue';
    import {
        usePurchaseStore
    } from '@/store/purchase/_index'
    import {
        useUtilsStore
    } from '@/store';
    import {
        onMounted,
        onUnmounted
    } from 'vue';
    import {
        useRoute
    } from 'vue-router';
    const purchaseStore = usePurchaseStore();
    const utilsStore = useUtilsStore();
    const route = useRoute();
    const PP_ID = route.query.search_id;
    onMounted(async() => {
        purchaseStore.$reset();
        purchaseStore.PageType = 'view';
        purchaseStore.getDetails(PP_ID);
    });
    onUnmounted(() => {
        purchaseStore.$dispose();
        utilsStore.$dispose();
    })
</script>

<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
    .main_section {
        h1 {
            margin-top: 50px;
            text-align: center;
            font-weight: 600;
            @include title_color;
        }
    }
    .button_wrap {
        display: flex;
        justify-content: center;
        margin: 30px auto 5%;
        gap: 20px;
        .back_btn {
            @include back_to_previous_btn;
            &:hover {
                background-color: #5d85bb;
            }
        }
    }
    @media only screen and (min-width: 1200px) {
        h1 {
            font-size: 55px;
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        h1 {
            font-size: 40px;
        }
    }
    @media only screen and (max-width: 767px) {
        h1 {
            font-size: 30px;
        }
    }
</style>