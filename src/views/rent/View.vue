<template>
  <Navbar />
  <div class="main_section">
    <div class="title col">
      <h1>
        檢視出庫填報
      </h1>
    </div>
    <rent_view_component></rent_view_component>
    <div class="col button_wrap">
      <button class="back_btn" @click="utilsStore.goBack">回上一頁</button>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import rent_view_component from '@/components/rent_page/rent_view_component.vue';
import {
  onMounted,
  onUnmounted,
} from 'vue';
import { useRentStore } from '@/store/rent/_index';
import { useAPIStore, useUtilsStore } from '@/store';
import { useRoute } from 'vue-router';
const rentStore = useRentStore();
const utilsStore = useUtilsStore();
const apiStore = useAPIStore();

const route = useRoute();
const AO_ID = route.query.search_id;
onMounted(async () => {
  rentStore.$reset();
  utilsStore.getUserName();
  utilsStore.getDate();
  await rentStore.getDetails(AO_ID);
});
onUnmounted(() => {
  rentStore.$dispose();
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.readonly_box {
  @include readonly_box;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

.project_details #project_name {
  height: 100%;
}

.button_wrap {
            display: flex;
            justify-content: space-between;
            margin: 30px auto 5%;
            width: 210px;

  button {
    @include back_to_previous_btn;

    &:hover {
      background-color: #5d85bb;
    }
  }
}

@media only screen and (min-width: 1200px) {
  .main_section {
    .info_wrap {
      margin: auto;
      width: 1000px;

      #readonly_box {
        border-left: black 1px solid;
      }

      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      form {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;

        .row:nth-child(3) {
          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-check {
          margin-left: 10px;
        }

        .wrap {
          background: white;
          border-bottom: 0.5px solid black;
          align-items: center;

          label.use {
            border-right: 1px solid black;
          }

          .option {
            @include readonly_box;
            height: 100%;
            width: 100%;
            align-items: center;
            display: flex;

            .content {
              display: flex
            }
          }
        }

        .form-label {
          font-weight: 700;
          font-size: 20px;
          white-space: nowrap;
          height: 50px;
          align-items: center;
          margin: 0;
          display: flex;
          justify-content: center;
          padding: 0 30px;

          p {
            width: 100px;
            margin-bottom: 0;
            text-align: center;
          }
        }
      }

      .input-group {
        height: 100%;
      }
    }

    #project_name {
      border-left: 1px solid black;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
    .info_wrap {
      margin: auto;
      padding: 0 5%;

      #readonly_box {
        border-left: 1px solid black;
      }

      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      form {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;

        .row:nth-child(3) {
          textarea {
            padding: 5px 10px 0;
          }
        }

        .form-check {
          margin-left: 10px;
        }

        .wrap {
          background: white;
          border-bottom: 0.5px solid black;
          align-items: center;

          label.use {
            border-right: 1px solid black;
          }

          .option {
            @include readonly_box;
            height: 100%;
            width: 100%;
            align-items: center;
            display: flex;

            .content {
              display: flex
            }
          }
        }

        .form-label {
          font-weight: 700;
          font-size: 20px;
          white-space: nowrap;
          height: 50px;
          align-items: center;
          margin: 0;
          display: flex;
          justify-content: center;
          padding: 0 30px;

          p {
            width: 100px;
            margin-bottom: 0;
            text-align: center;
          }
        }
      }

      .input-group {
        height: 100%;
      }
    }

    #project_name {
      border-left: 1px solid black;
    }
  }
}

@media only screen and (max-width: 767px) {
  .main_section {
    .info_wrap {
      margin: auto;
      padding: 0 5%;

      .fixed_info {
        @include fixed_info;
        background: #528091;
        border-radius: 0;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;
        flex-direction: column;
        height: unset;
        padding: 10px;

        p {
          font-size: 20px;
          margin-bottom: 0;
        }
      }

      .column_section {
        flex-direction: column;
      }

      form {
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-right: 1px solid black;

        .row:nth-child(3) {
          textarea {
            padding: 10px;
          }
        }

        .form-check {
          margin-left: 10px;
        }

        .wrap {
          background: white;
          border-bottom: 0.5px solid black;
          align-items: center;
          flex-direction: column;

          label.use,
          .form-label {
            border-bottom: 1px solid black;
            width: 100%;
            height: 30px;
          }

          .option {
            height: 100%;
            width: 100%;
            font-size: 18px;
            background: #B4B4B4;
            font-weight: 700;

            .content {
              padding: 5px;
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-rows: 1fr 1fr;
              gap: 0px 0px;
              grid-auto-flow: row;
              grid-template-areas: ". . ." ". . .";
              white-space: nowrap;
              justify-items: center;

              div {
                width: 90px;
              }
            }
          }
        }

        .form-label {
          font-weight: 700;
          font-size: 20px;
          white-space: nowrap;
          height: 50px;
          align-items: center;
          margin: 0;
          display: flex;
          justify-content: center;
          padding: 0 30px;

          p {
            width: 100px;
            margin-bottom: 0;
            text-align: center;
          }
        }
      }
    }
  }
}</style>