<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>刪除收貨單</h1>
    </div>
    <div class="info_wrap col">
      <div class="warn">
        <h4>
          確定刪除以下項目嗎？
        </h4>
      </div>
      <div class="fixed_info">
        <div>
          <p>收貨資訊</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">收貨單號：</div>
            <input type="text" class="form-control text-center readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物流單號：</div>
            <input type="text" class="form-control text-center readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">貨運公司：</div>
            <input type="text" class="form-control text-center readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly/>
          </div>
        </div>
        <div class="col">
          <div class="input-group  mb-3">
        <div class="input-group-prepend">到貨件數：</div>
        <div class="num_wrap d-flex ">
          <div class="number-input-box">
            <input class="input-number readonly_box" type="number" min="0" value="0" readonly/>
          </div>
      
        </div>
      </div>
        </div>
        <div class="row g-0">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
            <div class="input-group mb-3">
              <div class="input-group-prepend">收件人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">收件日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info_wrap col">

      <div class="fixed_info">
        <div>
          <p>物流文件上傳</p>
        </div>
      </div>
      <div class="content row g-0">
    
  <div class="d-flex selected_file col">
 
    <div class="icon">
  <p>外盒包裝.jpg</p>
  
  <div>
    <img src="@/assets/view.png" data-bs-toggle="modal" data-bs-target="#exampleModal">
    </div>
</div>
<div class="icon">
  <p>認證文件.png</p>
  
  <div>
    <img src="@/assets/view.png" data-bs-toggle="modal" data-bs-target="#exampleModal2">
    </div>
</div>
 <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
    </div>
     
     
      </div>
    </div>
    <div class="info_wrap mt-5 col">

<div class="fixed_info">
  <div>
    <p>照片上傳</p>
  </div>
</div>
<div class="content">
   <swiper-container class='swiper_section' :autoHeight="true" :space-between="40" :pagination="pagination" :modules="modules" :breakpoints="{0: {slidesPerView: 1,},768: {slidesPerView: 3,},1200: {slidesPerView: 3,},}">
            <swiper-slide data-bs-toggle="modal" data-bs-target="#photo1" class="custom-slide">
        <img src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*" alt="">
             
            </swiper-slide>
            <swiper-slide  data-bs-toggle="modal" data-bs-target="#photo2" class="custom-slide">
        <img src="https://i0.wp.com/www.lowcostpetvaccinations.net/wp-content/uploads/2017/04/puppy-1207816_1920.jpg?fit=1920%2C1386&ssl=1" alt="">
             
            </swiper-slide>
            <swiper-slide  data-bs-toggle="modal" data-bs-target="#photo3" class="custom-slide">
        <img src="https://s.yimg.com/ny/api/res/1.2/EZEK5GzpMlq._h78wAHZCA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/en/pethelpful_915/9aa1987931d5905e8c42d7306b59ee14" alt="">
             
            </swiper-slide>
            <swiper-slide  data-bs-toggle="modal" data-bs-target="#photo4" class="custom-slide">
        <img src="https://i.pinimg.com/1200x/5f/4b/83/5f4b83282d834386a8ef3414a5cc3fb0.jpg" alt="">
             
            </swiper-slide>
          </swiper-container>
          <div class="swiper_pagination">
          </div>
          <div class="modal fade" id="photo1" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
<div class="modal fade" id="photo1" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
<div class="modal fade" id="photo2" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
<div class="modal fade" id="photo3" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
<div class="modal fade" id="photo4" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="photoModalLabel">瀏覽</h5>
        <div class="close_icon"> <p type="button" data-bs-dismiss="modal" aria-label="Close">x</p></div>
       
      </div>

      <div class="modal-body">
         </div>

    
    </div>
  </div>
</div>
</div>
<div class="col button_wrap">
  <button class="back_btn" @click="goBack">回上一頁</button>
  <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
</div>
<div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-body">
            確定刪除這筆項目嗎？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="deleteData">是</button>
          </div>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
 import {
    register
  } from 'swiper/element/bundle';
  import {
    Pagination
  } from 'swiper/modules';
  register();
  import Navbar from "@/components/Navbar.vue";
  // import {
  //   onMounted,
  //   ref
  // } from "vue";
  // import {
  //   useRoute,
  //   useRouter
  // } from "vue-router";
  export default {
  components: {
    Navbar,
  },
 
  setup(){
    
return{
  pagination: {
          clickable: true,
        },
        modules: [Pagination],
}
  },
 
}
</script>
<style lang="scss" scoped>
  @import "@/assets/css/global.scss";
  span {
    @include red_star
  }
  
  .modal-dialog {
    width: 80% !important;
    max-width: unset
  }
  .selected_file{
    flex-direction:column;
    .icon{
      margin: 0 10px;
    gap: 5px;
    display: flex;;
    img{
      cursor:pointer;
    margin:0 5px
    }
  .close_icon{
    scale:1.5
  }
    }
  }
 
      .modal {
    .modal-body {
      padding: 20px
;
    margin: auto;
    }
    .modal-content {
      margin: auto;
    }
    .modal-input-group-prepend {
      width: auto;
      font-weight: 700;
      font-size: 20px;
    }
    .modal-footer {
      padding: 0 12px 12px;
      border: none;
    }
    .modal-header {
      h5 {
        font-weight: 700;
      }
      background: #528091;
    color: white;
    display: flex;
    justify-content: center;
    padding: 0 16px 16px;
      .close_icon {
        height:40px;
        cursor: pointer;
      }
      .modal-title{
        margin: auto;
    padding-top: 16px;
      }
    }
  }
   .delete_modal {
    .modal-content {
      border: solid 1px black;
      border-radius: 0;
      width: 500px;
      .modal-body {
        margin: unset;
        background: #E94B4B;
        text-align: center;
        font-weight: 700;
        color: white;
        border-bottom: solid 1px black;
      }
      .modal-footer {
        margin: auto;
    gap: 10px;
    padding: 20px;
    background: white;
    width: 100%;
    justify-content: center;
        button:nth-child(1) {
          background-color: #7E7E7E;
          border: none;
          color: white;
          width: 50px;
          font-weight: 700;
          &:hover {
            background-color: #464242;
          }
        }
        button:nth-child(2) {
          background-color: #E94B4B;
          border: none;
          color: white;
          width: 50px;
          font-weight: 700;
          &:hover {
            background-color: #a70e0e;
          }
        }
      }
    }
  }
  @media only screen and (min-width: 1200px) {
    .main_section {
      input {
        @include dropdown_btn;
        height: 35px;
      }
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
      }
      .swiper_section {
        swiper-slide {
          align-self: baseline;
         
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 800px;
    
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .add_btn {
          display: inline-flex;
          padding: 10px 25px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 174px;
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border: none;
          margin-bottom: 20px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
          .dropdown {
            width: 55%;
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
              }
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 135px;
              text-align: end;
            }
          }
         
          .date-selector {
            width: 200px;
            input {
              width: 100%
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          .delete_btn {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
            }
          }
        }
        .dropdown {
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
              padding-top: 5px;
              text-align: left;
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 3%;
      }
      .row:nth-child(3) {
        .input-group {
          justify-content: flex-start;
        }
      }
    }
  
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
      input {
        @include dropdown_btn;
        height: 35px;
      }
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
      }
      .readonly_box{
        width: 150px !important;
      }
      .swiper_section {
        swiper-slide {
          align-self: baseline;
         
        }
        swiper-slide img {
          width: 100%;
          height: auto;
          padding: 40px 0;
        }
      }
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 80px;
        margin-bottom: 40px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 700px;
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .fixed_title {
          @include fixed_title;
        }
        .add_btn {
          display: inline-flex;
          padding: 10px 25px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 174px;
          color: #FFF;
          text-align: center;
          font-size: 20px;
          font-weight: 700;
          border: none;
          margin-bottom: 20px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          .organizer_wrap {
            --bs-gutter-x: unset;
            .flex:nth-child(1) {
              width: 210px
            }
          }
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
            color: white;
          }
          .dropdown {
            .dropdown-menu {
              width: 100%;
              p {
                text-align: left;
                padding: 0 10px
              }
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            flex-wrap: nowrap;
            .input-number {
              @include count_btn;
            }
            .form-control {
              height: 35px;
              width: 55%;
            }
            .input-group-prepend {
              white-space: nowrap;
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 170px;
              text-align: end;
            }
          }
         
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 28%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            &:hover {
              background-color: #5d85bb;
            }
          }
          .delete_btn {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
            }
          }
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
          }
          .dropdown-menu {
            width: 100%;
            transform: translate3d(-1px, 35px, 0px) !important;
            p {
              padding-top: 5px;
              text-align: left;
              font-size: 18px;
              color: black;
              font-weight: normal;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        margin-top: 5%;
      }
    }
    .modal {
      .dropdown-toggle {
        width: 100%
      }
      padding: 0 5%;
      .modal-content {
        background: unset;
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0!important;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 20px;
          margin-bottom: 0;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          align-self: start;
        }
      }
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        p.content {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          background: white;
          height: 35px;
          border-radius: 5px;
        }
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          display: flex;
          justify-content: space-evenly;
          padding: 20px;
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          } // .dropdown {
          //   button {
          //     background: white;
          //     width: 100%;
          //     border: none;
          //     display: flex;
          //     justify-content: space-between;
          //     align-items: center;
          //   }
          //   .dropdown-menu {
          //     width: 225px;
          //     .dropdown-item {
          //       text-align: left;
          //     }
          //   }
          // }
          div {
            padding: 0 5px;
            p {
              color: black;
              text-align: center;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .delete_modal .modal-content .modal-body{
      height:50px;
      display:flex;
      justify-content: center;
      align-items:center
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
      .readonly_box {
        @include readonly_box;
      }
      .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
          color: white;
          margin-bottom: 0;
          font-weight: 700;
          &::before {
            content: "\26A0";
          }
        }
      }
      .selected_file{
        margin-top: 10px;
    color: white;
    align-items: flex-start;
    font-weight: 700;
    flex-direction: column;
    .icon{
      margin: 0 10px;
    gap: 5px;
    display: flex;
    align-items:flex-start;
   
    img{
      margin: 0 5px;
    }
   }
      }
      .number-input-box{
        width:100%
      }
      input {
        @include dropdown_btn;
        height: 35px;
        width: 100%
      }
      .swiper_section swiper-slide {
        
        img {
          width: 100%;
          height: auto;
          padding: 40px;
        }
      }
      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: 0 !important;
        border-radius: 5px;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        padding: 1% 5% 0;
        .fixed_title {
          @include fixed_title;
        }
        .fixed_info {
          @include fixed_info;
          flex-direction: column;
          height: unset;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .add_btn {
          display: inline-flex;
          padding: 10px;
          justify-content: center;
          align-items: center;
          border-radius: 9px;
          background: #314F7A;
          height: 50px;
          width: 150px;
          color: #FFF;
          text-align: center;
          font-size: 18px;
          font-weight: 700;
          border: none;
          margin-bottom: 15px;
          &:hover {
            background-color: #456ca7
          }
        }
        .content {
          @include content_bg;
          .row {
            gap: 10px 0;
          }
          .dropdown {
            margin-left: unset !important;
            .dropdown-menu {
              width: 100%;
            }
            button {
              @include dropdown-btn;
              width: 100%;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            flex-direction: column;
            .input-number {
              @include count_btn;
              width: 100%;
            }
            .form-control {
              width: 100%;
              height: 35px;
              border-radius: 0;
              margin-left: unset !important;
            }
            .input-group-prepend {
              margin-bottom: 5px;
              color: white;
              font-weight: 700;
              font-size: 20px;
            }
          }
        }
        .button_wrap {
          display: flex;
          margin-top: 30px;
          justify-content: center;
          padding: 0 20%;
          margin-bottom: 5%;
          gap: 20px;
          button.back_btn {
            @include back_to_previous_btn;
            padding: 5px;
            &:hover {
              background-color: #5d85bb;
            }
          }
          .delete_btn {
            background: var(--c-5, #E94B4B);
            justify-content: center;
            align-items: center;
            display: inline-flex;
            border-radius: 10px;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            margin: 0 10px;
            &:hover {
              background-color: #a51e1e;
            }
          }
        }
        .item_wrap {
          height: 350px;
          overflow: auto;
          .item {
            background-color: #526F8E;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
          }
        }
      }
      .info_wrap:nth-child(3) {
        .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
          margin-left: unset !important;
          border-radius: 5px;
        }
        margin-top: 3%;
        .count {
          .number-input-box {
            width: 100%;
            margin-left: unset !important;
          }
          .btn_section {
            margin-left: 10px;
            .delete_btn {
              display: flex;
              align-items: center;
              @include delete_button;
              height: 100%;
              padding: 5px;
              width: 80px;
              font-size: 18px;
              &:hover {
                background: #FF7272
              }
            }
          }
        }
      }
    }
    .modal {
      padding: 0 5%;
      .modal-content {
        background-color: unset;
        border: 0;
        .modal-body {
          padding: 0;
        }
      }
      .fixed_info {
        @include fixed_info;
        background: #528091 !important;
        border-radius: 0!important;
        border: 1px solid black;
        padding: 0 10px;
        div {
          flex-grow: 1;
          text-align: center;
        }
        p {
          font-size: 18px;
          margin-bottom: 0;
        }
        button {
          border: none;
          background: none;
          color: white;
          font-weight: 700;
          font-size: 22px;
          position: absolute;
          right: 3%;
        }
      }
      .list {
        border-left: 1px solid black;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
      }
      .second_content {
        border-left: 1px solid black;
        border-right: 1px solid black;
        background: #D9D9D9;
        padding: 20px;
        .submit_btn {
          margin-top: 20px;
          background: #48658C;
          color: white;
          font-weight: 700;
          width: 80px;
          font-size: 20px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background-color: #5d85bd;
          }
        }
        .wrap1 {
          p.content {
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            background: white;
            height: 35px;
            border-radius: 5px;
          }
          .input-number {
            @include count_btn;
          }
          .number-input-box {
            color: black;
            .input-number {
              width: 100%;
            }
          }
          .form-label {
            white-space: nowrap;
            font-weight: 800;
            font-size: 18px;
          }
          .dropdown {
            button {
              background: white;
              width: 100%;
              border: none;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .dropdown-menu {
              width: 100%;
              .dropdown-item {
                text-align: left;
              }
            }
          }
          div {
            margin: 10px 0;
            p {
              padding: 5px;
              white-space: nowrap;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 5px;
            }
          }
        }
      }
    }
    .delete_modal .modal-content .modal-body{
      height:50px;
      display:flex;
      justify-content: center;
      align-items:center
    }
  }
</style>