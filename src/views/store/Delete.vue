<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        刪除項目
      </h1>
    </div>
    <div class="info_wrap col">
      <div class="warn">
        <h4>
          確定刪除以下項目嗎？
        </h4>
      </div>
      <div class="fixed_info">
        <div>
          <p>
            申請人員 : {{ details.Applicant }}
          </p>
        </div>
        <div>
          <p>
            申請入庫日期 : {{ details.ApplicationDate }}
          </p>
        </div>
        <div>
          <p>
            資產類型 : {{ details.IsConsumable ? '耗材' : '資產' }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AI_ID">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              入庫單狀態：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Status">
          </div>
        </div>
        <div v-if="details.AssetsId" class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              資產編號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetsId">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備總類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipTypeName">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                設備分類：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.EquipCategoryName">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              物品名稱：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.AssetName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              廠商：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.VendorName">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              規格：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductSpec">
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              型號：
            </div>
            <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.ProductType">
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend info">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="資產數量 ex: 3包螺絲釘">數量：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Count">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                單位：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.Unit">
            </div>
          </div>
        </div>
        <div v-if="details.IsConsumable" class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend info">
                <img class="info_icon" src="@/assets/info.png" data-bs-toggle="tooltip" data-bs-placement="top" title="每單位資產所包裝的內容物數量 ex:100根螺絲釘/包">包裝數量：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.PackageNum">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                包裝單位：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.PackageUnit">
            </div>
          </div>
        </div>
        <div class='row'>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyDate">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固開始日：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyStartDate">
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-4">
              <div class="input-group-prepend">
                保固到期日：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default" aria-describedby="inputGroup-sizing-default" readonly v-model="details.WarrantyEndDate">
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-4">
            <div class="input-group-prepend">
              備註：
            </div>
            <textarea style="height: 200px;" class="form-control readonly_box" aria-label="With textarea" readonly v-model="details.Memo"></textarea>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <!-- Modal Trigger -->
        <button class="delete_btn" data-bs-toggle="modal" data-bs-target="#deleteModal">刪除</button>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-sm">
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
  import Navbar from '@/components/Navbar.vue'
  import {
    useRoute,
    useRouter
  } from 'vue-router';
  import {
    onMounted,
    ref
  } from 'vue';
import { Form } from 'v3-easyui';
  export default {
    components: {
      Navbar
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const AI_ID = route.query.search_id;
      const details = ref({});
      // console.log(AI_ID);
      async function getDetails() {
        const axios = require('axios');
        try {
          const response = await axios.get(`http://192.168.0.176:7008/GetDBdata/GetApplicationInfo?ai_id=${AI_ID}`);
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Details Get成功 資料如下\n', data.resultList);
            details.value = data.resultList;
            if (details.value.WarrantyStartDate && details.value.WarrantyEndDate) {
              details.value.WarrantyStartDate = details.value.WarrantyStartDate.replace(/-/g, '/');
              details.value.WarrantyEndDate = details.value.WarrantyEndDate.replace(/-/g, '/');
            }
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error(error);
        }
      }

      async function deleteData() {
        const form = new FormData();
        form.append('AI_ID' , AI_ID);

        const axios = require('axios');
        const response = await axios.post(`http://192.168.0.176:7008/AssetsInMng/ApplicationDelete`,form);
        try {
          const data = response.data;
          if(data.state === 'success') {
            let msg = data.messages + '\n';
            msg+= '單號為'+data.resultList.AI_ID;
            alert(msg);
            router.push({name: 'Store_Datagrid'});
          }
          else if(data.state === 'error') {
            alert(data.messages);
          }
        } catch (error) {
          console.error(error);
        }
      }
      onMounted(() => {
        getDetails();
      });
      function goBack() {
        window.history.back();
      }
      return {
        goBack,
        AI_ID,
        details,
        deleteData,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss'; // .main_section {
  //   .readonly_box {
  //     @include readonly_box;
  //   }
  //   h1 {
  //     margin-top: 50px;
  //     text-align: center;
  //     font-size: 55px;
  //     font-weight: 600;
  //     @include title_color;
  //   }
  //   .info_wrap {
  //     padding: 1% 31% 0;
  //     .fixed_info {
  //       @include fixed_info;
  //       p {
  //         font-size: 20px;
  //         margin-bottom: 0;
  //       }
  //     }
  //     .content {
  //       @include content_bg;
  //       .check_box_wrap {
  //         font-weight: 700;
  //         align-items: center;
  //         color: white;
  //         font-size: 20px;
  //         .check_box {
  //           margin-right: 5px;
  //         }
  //       }
  //       .dropdown {
  //         .dropdown-menu {
  //           width: 100%;
  //         }
  //         button {
  //           @include dropdown-btn;
  //           width: 187px;
  //           color: black;
  //           justify-content: space-between;
  //           align-items: center;
  //         }
  //       }
  //       .input-group {
  //         .input-number {
  //           @include count_btn;
  //         }
  //         .form-control {
  //           height: 35px;
  //           border-radius: 0;
  //         }
  //         .input-group-prepend {
  //           color: white;
  //           font-weight: 700;
  //           font-size: 20px;
  //           width: 120px;
  //           text-align: end;
  //           span {
  //             @include red_star
  //           }
  //         }
  //       }
  //     }
  //     .button_wrap {
  //       display: flex;
  //       margin-top: 30px;
  //       justify-content: center;
  //       padding: 0 28%;
  //       margin-bottom: 5%;
  //       button {
  //         &:nth-child(1) {
  //           @include back_to_previous_btn;
  //           &:hover {
  //             background-color: #5d85bb;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  @media only screen and (min-width: 1200px) {
    .main_section {
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
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 55px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        width: 700px;
        .input-group-prepend {
          color: white;
          font-weight: 700;
          font-size: 20px;
          width: calc(100px + 6%);
          text-align: end;
          white-space: nowrap;
          span {
            @include red_star
          }
        }
        .input-number {
          @include count_btn;
          width: 200px;
        }
        .fixed_info {
          @include fixed_info;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .input-group-prepend {
            width: 120px;
          }
          .check_box_wrap {
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 20px;
            .check_box {
              margin-right: 5px;
            }
          }
          .row_wrap {
            .input-group {
              flex-wrap: nowrap
            }
            .flex {
              width: 130px
            }
          }
          .dropdown {
            width: 218px;
            .dropdown-menu {
              width: 100%;
              p {
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .dropdown-toggle {
              width: 100%;
              @include dropdown-btn;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
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
        }
      }
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
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
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
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
        .content {
          .check_box_wrap {
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 20px;
            .check_box {
              margin-right: 5px;
            }
          }
          .row_wrap {
            .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
              margin-left: 6px;
              border-radius: 5px;
            }
          }
          @include content_bg;
          .dropdown {
            .dropdown-menu {
              width: 100%;
              p {
                &:hover {
                  cursor: pointer;
                }
              }
            }
            button {
              @include dropdown-btn;
              width: 199px;
              color: black;
              justify-content: space-between;
              align-items: center;
            }
          }
          .input-group {
            .input-number {
              width: 199px;
              @include count_btn;
            }
            .form-control {
              height: 35px;
              border-radius: 0;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              width: 120px;
              text-align: end;
              white-space: nowrap;
              span {
                @include red_star
              }
            }
          }
          #size_wrap {
            flex: 0.74
          }
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
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
        }
        #unit,
        #number {
          flex-wrap: nowrap
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .main_section {
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
      .readonly_box {
        @include readonly_box;
      }
      h1 {
        margin-top: 50px;
        text-align: center;
        font-size: 40px;
        font-weight: 600;
        @include title_color;
      }
      .info_wrap {
        margin: auto;
        padding: 0 5%;
        .fixed_info {
          display: flex;
          background: #3D4E61;
          color: white;
          font-size: 25px;
          font-weight: 700;
          align-items: center;
          border-radius: 10px 10px 0px 0px;
          flex-direction: column;
          padding: 10px;
          p {
            font-size: 20px;
            margin-bottom: 0;
          }
        }
        .content {
          @include content_bg;
          .dropdown {
            .dropdown-menu {
              width: 100%;
              p {
                &:hover {
                  cursor: pointer;
                }
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
          .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
            margin-left: unset;
            border-radius: 5px;
          }
          .input-group {
            flex-direction: column;
            .input-number {
              width: 100%;
              @include count_btn;
            }
            .form-control {
              height: 35px;
              width: 100%;
              margin-top: 5px;
            }
            .input-group-prepend {
              color: white;
              font-weight: 700;
              font-size: 20px;
              white-space: nowrap;
              span {
                @include red_star
              }
            }
          }
          .check_box_wrap {
            flex-direction: row;
            font-weight: 700;
            align-items: center;
            color: white;
            font-size: 20px;
            .check_box {
              margin-right: 5px;
            }
          }
          .info {
            display: flex;
            flex-direction: row-reverse;
            justify-content: flex-end;
          }
        }
        .button_wrap {
          display: flex;
          justify-content: center;
          margin: 30px auto 5%;
          button {
            &:nth-child(1) {
              @include back_to_previous_btn;
              &:hover {
                background-color: #5d85bb;
              }
            }
            &:nth-child(2) {
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
        }
      }
    }
  }
</style>