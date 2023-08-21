<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>資產入庫作業</h1>
    </div>
    <div class="info_wrap col">
      <div class="fixed_info">
        <div>
          <p>申請人員: 陳奕迅</p>
        </div>
        <div>
          <p>申請入庫日期: 2023/04/01</p>
        </div>
        <div>
          <p>資產類型:耗材</p>
        </div>
      </div>
      <div class="content">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">編號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                狀態：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly placeholder="備料中">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備總類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">設備分類：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">物品名稱：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">廠商：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">型號：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">規格：</div>
            <input type="text" class="form-control readonly_box" aria-label="Default"
              aria-describedby="inputGroup-sizing-default" readonly />
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">數量：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">單位：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                保固期限：
              </div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固開始日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">保固到期日：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫人員：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-12">
            <div class="input-group mb-3">
              <div class="input-group-prepend">入庫日期：</div>
              <input type="text" class="form-control readonly_box" aria-label="Default"
                aria-describedby="inputGroup-sizing-default" readonly />
            </div>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">備註：</div>
            <input class="form-control readonly_box" aria-label="With textarea" readonly>
          </div>
        </div>
      </div>
      <div class="tab_section mt-5">
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab"
              aria-selected="true">
              1
            </button>
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab"
              aria-selected="false">
              2
            </button>
            <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab"
              aria-selected="false">
              3
            </button>
          </div>
        </nav>
        <div v-if="formData.length >0" class="tab-content" id="nav-tabContent">

          <div v-for="(item, index) in formData" :key="index"
            :class="['tab-pane', 'fade', { 'show active': index === 0 }]" :id="'tab' + (index + 1)" role="tabpanel"
            aria-labelledby="tab1-tab">
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>物品名稱：</div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                  v-model="item.AssetName" />
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend"><span>*</span>資產編號：</div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"
                  v-model="item.AssetsId" />
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span>區域：
                  </div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="areaDropdown" data-bs-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false" @click="getAreaName(index)">
                      {{ item.AreaName || '請選擇' }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="areaDropdown">
                      <p v-for="(item, area_index) in item.AreaArray" :key="area_index" class="dropdown-item"
                        @click="selectArea(index ,`${item}`)">
                        {{ item }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span>*</span> 櫃位：
                  </div>
                  <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="cabinetDropdown" data-bs-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false" :disabled="item.AreaName === ''">
                      {{ item.LayerName || item.LayerInit }}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="cabinetDropdown">
                      <p v-for="(item, layer_index) in item.LayerArray" :key="layer_index" class="dropdown-item"
                        @click="selectLayer(index , `${item}`)">{{
                          item }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">S/N：</div>
                <input type="text" class="form-control" aria-label="Default"
                  aria-describedby="inputGroup-sizing-default" v-model="item.SN"/>
              </div>
            </div>
            <div class="col">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  備註：
                </div>
                <input class="form-control" aria-label="With textarea" v-model="item.Memo">
              </div>
            </div>
            <div class="col">
              <!-- 選擇檔案button -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">資產照片：</div>
                <div class="mb-3 file_wrap">
                  <button class='choose_btn' @click="openFileExplorer(index)">選擇檔案</button>
                  <input type="file" accept="image/*" ref="fileInputs" style="display: none;" multiple @change="handleFileChange(index)" />
                </div>
                <div class='selected_file'>
                  <p class='title'>已選擇的檔案:</p>
                  <p class='file_upload_wrap' v-for="(file, img_index) in item.File" :key="img_index"
                    style="cursor: pointer;">
                  <p @click="showImage(index, img_index)" data-bs-toggle="modal" data-bs-target="#img_modal">{{ file.name
                  }}</p>
                  <img class='delete_icon' src="@/assets/trash.png" @click="deleteFile(index, img_index)"
                    style="margin-left: 10px;">
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!-- 列出已選擇檔案 -->
        <div class="modal fade" id="img_modal" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel"
          aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="imageModalLabel">{{ modalTitle }}</h5>
                <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
              </div>
              <div v-if="formData" class="modal-body">
                <img :src="imageUrl" alt="Uploaded Image" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col button_wrap">
        <button class="back_btn" @click="goBack">回上一頁</button>
        <button class="save_btn">暫存</button>
        <button class="send_btn" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, nextTick } from 'vue';
import Navbar from "@/components/Navbar.vue";
import { useRoute } from 'vue-router';

export default {
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const tabNumber = route.query.tab_number;
    onMounted(() => {
      initFormDataArray();
    });
    //下半部表單部分
    const formData = reactive([]);
    const fileInputs = reactive([]);
    const selectedData = ref(0);
    const selectedImage = ref(0);
    const imageUrl = ref('');
    const modalTitle = ref('');
    function initFormDataArray() {
      for (let i = 0; i < tabNumber; i++) {
        formData.push({
          AssetName: '1',
          AssetsId: '',
          AreaName: '',
          AreaArray: [],
          LayerName: '',
          LayerArray: [],
          LayerInit: '請先選擇區域',
          Count: '',
          Unit: '',
          SN: '',
          Memo: '',
          File: [],
          previewUrl: [],
        });
      }
    }

    
    async function getAreaName(index) {
      if (formData[index].AreaArray.length == 0) {
        const axios = require('axios');
        try {
          const response = await axios.get('http://192.168.0.176:7008/GetParameter/GetAreaName');
          console.log(response);
          const data = response.data;
          if (data.state === 'success') {
            console.log('Area Get成功 資料如下\n', data.resultList.AreaName);
            formData[index].AreaArray = data.resultList.AreaName;
          } else if (data.state === 'error') {
            alert(data.messages);
          } else if (data.state === 'account_error') {
            alert(data.messages);
            router.push('/');
          }
        } catch (error) {
          console.error('Error sending applicant info request to backend');
        }
      }
    }

    async function getLayerName(index) {
      const axios = require('axios');
      try {
        const response = await axios.get(`http://192.168.0.176:7008/GetParameter/GetLayerName?id=${formData[index].AreaName}`);
        console.log(response);
        const data = response.data;
        if (data.state === 'success') {
          console.log('Layer Get成功 資料如下\n', data.resultList.LayerName);
          formData[index].LayerArray = data.resultList.LayerName;
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

    function selectArea(index , item) {
      formData[index].AreaName = item ;
      getLayerName(index);
      formData[index].LayerInit = '請選擇';
    }

    function selectLayer(index , item) {
      formData[index].LayerName = item ;
    }

    function submit() {
      console.log(formData);
    }

    
    function openFileExplorer(index) {
      fileInputs[index].click();
    }
    
    function handleFileChange(index) {
      const files = event.target.files;
      if( formData[index].File.length + files.length >5) {
        alert('上傳至多5張圖片');
        return
      }
      console.log(event.target.files);
      var imgArray = formData[index].File;
      for (let i = 0; i < files.length; i++) {
        imgArray.push(files[i]);
      }
      const previewUrl = formData[index].previewUrl;
      for (let i = 0; i < files.length; i++) {
        // console.log(imgArray[i].name);
        const reader = new FileReader();
        reader.onload = (e) => {
          previewUrl.push(e.target.result);
        }
        reader.readAsDataURL(files[i]);
      }
      console.log(previewUrl);
      console.log(formData[index].previewUrl);
    }

    function showImage(index, img_index) {
      selectedData.value = index;
      selectedImage.value = img_index;
      getImageUrl();
    }
    function deleteFile(index, img_index) {
      formData[index].File.splice(img_index, 1);
      formData[index].previewUrl.splice(img_index, 1);
    }
    function getImageUrl() {
      imageUrl.value = formData[selectedData.value].previewUrl[selectedImage.value];
      modalTitle.value = formData[selectedData.value].File[selectedImage.value].name;
    }
    return {
      formData,
      selectedData,
      selectedImage,
      fileInputs,
      imageUrl,
      modalTitle,
      getAreaName,
      getLayerName,
      selectArea,
      selectLayer,
      submit,
      openFileExplorer,
      handleFileChange,
      showImage,
      deleteFile,
      getImageUrl,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

@media only screen and (min-width: 1200px) {
  .main_section {
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
      padding: 1% 31% 0;

      .fixed_info {
        @include fixed_info;

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
          }

          button {
            @include dropdown-btn;
            width: 187px;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }

        .input-group {
          .input-number {
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
          }
        }
      }

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include empty_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }

          &:nth-child(3) {
            display: inline-flex;
            padding: 10px 10px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #385E96;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;

            &:hover {
              background-color: #57677c;
            }
          }

          &:nth-child(4) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }

      .tab_section {
        .nav-tabs {
          button {
            @include tab_section_num;
            background: #5C7897;
          }

          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
        }

        .tab-content {
          background: #3E4E5F;
          padding: 50px 30px;

          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;

              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }

          .input-group {
            span {
              @include red_star
            }

            .selected_file {
              margin-left: 20px;

              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }

              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;

                img {
                  width: 25px;
                  height: 25px;
                }

                p {
                  margin-bottom: 0;
                  font-weight: 700;
                  color: white;

                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
              }
            }

            .input-number {
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
            }

            .file_wrap {
              display: flex;
              flex-direction: column;

              .choose_btn {
                margin-bottom: 10px;
                @include choose_file_btn;

                &:hover {
                  background: #3f608f;
                }
              }

              .upload_btn {
                @include upload_file_btn;

                &:hover {
                  background: #2f507e;
                }
              }
            }
          }
        }
      }
    }
  }
}


@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
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
      padding: 1% 5% 0;

      .fixed_info {
        @include fixed_info;

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
          }

          button {
            @include dropdown-btn;
            width: 187px;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }

        .input-group {
          .input-number {
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
          }
        }
      }

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include empty_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }

          &:nth-child(3) {
            display: inline-flex;
            padding: 10px 10px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #385E96;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;

            &:hover {
              background-color: #57677c;
            }
          }

          &:nth-child(4) {
            @include search_and_send_btn;

            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }

      .tab_section {
        .nav-tabs {
          button {
            @include tab_section_num;
            background: #5C7897;
          }

          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
        }

        .tab-content {
          background: #3E4E5F;
          padding: 50px 30px;

          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;

              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }

          .input-group {
            span {
              @include red_star
            }

            .selected_file {
              margin-left: 20px;

              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }

              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;

                img {
                  width: 25px;
                  height: 25px;
                }

                p {
                  margin-bottom: 0;
                  font-weight: 700;
                  color: white;

                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
              }
            }

            .input-number {
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
            }

            .file_wrap {
              display: flex;
              flex-direction: column;

              .choose_btn {
                margin-bottom: 10px;
                @include choose_file_btn;

                &:hover {
                  background: #3f608f;
                }
              }

              .upload_btn {
                @include upload_file_btn;

                &:hover {
                  background: #2f507e;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .readonly_box {
      @include readonly_box;
    }

    h1 {
      margin-top: 50px;
      text-align: center;
      font-size: 50px;
      font-weight: 600;
      @include title_color;
    }

    .info_wrap {
      padding: 1% 5% 0;

      .fixed_info {
        @include fixed_info;
        flex-direction: column;
        padding: 10px;
        height: unset;

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
          }

          button {
            @include dropdown-btn;
            width: 187px;
            color: black;
            justify-content: space-between;
            align-items: center;
          }
        }

        .input-group {
          .input-number {
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
          }
        }
      }

      .button_wrap {
        display: flex;
        margin-top: 30px;
        justify-content: center;
        gap: 20px;
        margin-bottom: 5%;

        button {
          &:nth-child(1) {
            @include back_to_previous_btn;
            padding: 10px;

            &:hover {
              background-color: #5d85bb;
            }
          }

          &:nth-child(2) {
            @include empty_btn;
            padding: 10px;

            &:hover {
              background-color: #5e7aa2;
            }
          }

          &:nth-child(3) {
            display: inline-flex;
            padding: 10px 10px;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            background: #385E96;
            height: 40px;
            width: 90px;
            color: #FFF;
            text-align: center;
            font-size: 20px;
            font-weight: 700;
            border: none;
            padding: 10px;

            &:hover {
              background-color: #57677c;
            }
          }

          &:nth-child(4) {
            @include search_and_send_btn;
            padding: 10px;

            &:hover {
              background-color: #5e7aa2;
            }
          }
        }
      }

      .tab_section {
        .nav-tabs {
          button {
            @include tab_section_num;
            background: #5C7897;
          }

          .active {
            @include tab_section_num;
            background: #3E4E5F;
          }
        }

        .tab-content {
          background: #3E4E5F;
          padding: 50px 30px;

          .modal {
            .modal-header {
              background: #3D4E61;
              color: white;

              .close_icon {
                color: white;
                font-weight: 700;
                margin-bottom: 0;
              }
            }
          }

          .input-group {
            span {
              @include red_star
            }

            .selected_file {
              margin-left: 20px;

              p.title {
                font-weight: 700;
                color: white;
                margin-bottom: 5px;
              }

              .file_upload_wrap {
                margin-bottom: 0;
                display: flex;

                img {
                  width: 25px;
                  height: 25px;
                }

                p {
                  margin-bottom: 0;
                  font-weight: 700;
                  color: white;

                  &::before {
                    margin-right: 10px;
                    content: '·';
                    font-weight: 700;
                    color: white;
                  }
                }
              }
            }

            .input-number {
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
            }

            .file_wrap {
              display: flex;
              flex-direction: column;

              .choose_btn {
                margin-bottom: 10px;
                @include choose_file_btn;

                &:hover {
                  background: #3f608f;
                }
              }

              .upload_btn {
                @include upload_file_btn;

                &:hover {
                  background: #2f507e;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
