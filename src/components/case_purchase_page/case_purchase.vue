<template>
    <div class="main_section">
        <div class="info_wrap col">
            <div class="fixed_info">
         
                <div>
                    <p>申請人員：</p>
                </div>
                <div>
                    <p>申請入庫日期：</p>
                </div>
            </div>
            <div class="content">
         <!-- 專案 -->
         <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">         <span class="red_star">*</span>專案：</div>
                        <input type="text" class="form-control readonly_box" readonly />
                    </div>
                </div>
                <!-- 説明 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">         <span class="red_star">*</span>説明：</div>
                        <textarea style="height: 150px;" class="form-control readonly_box" aria-label="With textarea" readonly></textarea>
                    </div>
                </div>
                    <!-- 交貨期限 -->
                    <div class="row expire_date_wrap">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="red_star">*</span>交貨期限：
                            </div>
                            
                            <input type="date" class="form-control readonly_box" >
                         
                        </div>  
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                     <span class="date_note">若有多個交貨期限，請填寫最接近的交貨日期</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "@/assets/css/global.scss";
  
    span.red_star{@include red_star}
    .date_note{
        color:white;
        font-weight: 700;
    }
    .expire_date_wrap{
        align-items: center;
    }
    @media only screen and (min-width: 1200px) {
        .main_section {
          .info_wrap{
            width: 850px;
        margin: auto;
            .fixed_info {
                @include fixed_info;
                    p {
                        font-size: 20px;
                        margin-bottom: 0;
                    }
                }
                .content {
          @include content_bg;
          .input-group {
                        .input-number {
                            @include count_btn;
                        }
                        .form-control {
                            height: 35px;
                        }
                        .input-group-prepend {
                            color: white;
                            font-weight: 700;
                            font-size: 20px;
                            width: 120px;
                            text-align: end;
                        }
                    }
                }
          }
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1199px){
        .main_section {
            h1 {
                font-size: 55px;
            }
        }
}
@media only screen and (max-width: 767px) {
    .main_section {
            h1 {
                font-size: 40px;
            }
        }
}

    </style>