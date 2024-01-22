<template>
    <div class="main_section">
        <Navbar />
        <ConfirmModal/>
        <div class="title col">
            <h1>
                編輯快速入庫單
            </h1>
        </div>
              <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="save_btn" @click="temp" data-bs-toggle="modal" data-bs-target="#staticBackdrop">暫存</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
</template>
  
<script>
    import Navbar from '@/components/Navbar.vue';
    import ConfirmModal from '@/components/Confirm_modal.vue'
    export default {
        components: {
            Navbar,
            ConfirmModal
        }
    }
</script>
  
<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    h1 {
        margin-top: 50px;
        text-align: center;
        font-weight: 600;
        @include title_color;
    }
    .button_wrap {
  display: flex;
  justify-content: center;
  margin: 30px auto 5%;
  gap: 20px;
}


.back_btn {
  @include back_to_previous_btn;

  &:hover {
    background-color: #5d85bb;
  }
}

.send_btn {
  @include search_and_send_btn;

  &:hover {
    background-color: #5D85BD;
  }
}
.save_btn{
@include search_and_send_btn;
              &:hover {
                background-color: #5e7aa2;
                  }    }
    @media only screen and (min-width: 1200px) {
        .main_section {
            h1 {
                font-size: 55px;
            }
        }
    }
    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .main_section {
            h1 {
                font-size: 55px;
            }
        }
    }
    @media only screen and (max-width: 767px) {
        .main_section {
            h1 {
                font-size: 50px;
            }
        }
    }
</style>