<template>
  <div class="item" :class="{ 'failed_storage': AssetData.Failed }">
    <div class="col" v-if="edit_btn">
      <button class="change_btn" data-bs-toggle="modal" data-bs-target="#searchModal" @click="editBtn" >更換</button>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">資產編號：</div>
        <input type="text" class="form-control readonly_box " aria-label="Default" aria-describedby="inputGroup-sizing-default"
          v-model="AssetData.AssetsId"  readonly/>
      </div>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">物品名稱：</div>
        <input type="text" class="form-control readonly_box " aria-label="Default" aria-describedby="inputGroup-sizing-default"
          v-model="AssetData.AssetName"  readonly/>
      </div>
    </div>
    <div class="col count d-flex">
      <div class="input-group">
        <div class="input-group-prepend">數量：</div>
        <div class="num_wrap d-flex ">
          <div class="number-input-box">
            <input class="input-number readonly_box " type="text" v-model="AssetData.Number"  readonly/>
          </div>
          <div class="btn_section" v-if="delete_btn">
            <button class="delete_btn" @click="deleteBtn">刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    edit_btn: Boolean,
    delete_btn: Boolean,
    failed: Boolean,
    AssetData: null,
  },
  setup(props, {emit}) {
    function editBtn() {
      emit('editAction', props.AssetData)
    }
    function deleteBtn() {
      emit('deleteId', props.AssetData)
    }
    return {
      editBtn,
      deleteBtn,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/global.scss";

span {
  @include red_star
}

@media only screen and (min-width: 1200px) {
  .main_section {
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
          width: 100%;

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
          justify-content: right;
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
            width: 100px;
            text-align: end;
          }
        }

        .search_section {
          background: #B5C9D0;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 40px;

          .input-group-prepend {
            color: black;
          }

          .btn_section {
            display: flex;
            justify-content: center;

            button.send_btn {
              @include search_and_send_btn;
              font-size: 18px;
              padding: 5px;

              &:hover {
                background-color: #5e7aa2;
              }
            }
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

        button.send_btn {
          @include search_and_send_btn;

          &:hover {
            background-color: #5e7aa2;
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

        .failed_storage {
          background-color: #8A2828;
          border: 1px solid white;
        }
      }
    }

    .info_wrap:nth-child(3) {
      margin-top: 3%;

      .count {
        .input-group {
          justify-content: left
        }

        .btn_section {
          margin-left: 10px;

          .delete_btn {
            display: flex;
            align-items: center;
            @include delete_button;
            height: 100%;
            padding: 5px;

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
      border-radius: 0 !important;
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
        margin-bottom: 20px;
        background: #48658C;
        color: white;
        font-weight: 700;
        width: 100px;
        font-size: 18px;
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
        padding: 10px 80px;

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

        // .dropdown {
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

  .change_btn {
    @include change_btn
  }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
  .main_section {
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
      padding: 0 5%;

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
          width: 100%;

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
          justify-content: right;
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
            width: 100px;
            text-align: end;
          }
        }

        .search_section {
          background: #B5C9D0;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;

          .input-group-prepend {
            color: black;
          }

          .btn_section {
            display: flex;
            justify-content: center;

            button.send_btn {
              @include search_and_send_btn;
              font-size: 18px;
              padding: 5px;

              &:hover {
                background-color: #5e7aa2;
              }
            }
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

        button.send_btn {
          @include search_and_send_btn;

          &:hover {
            background-color: #5e7aa2;
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
            font-size: 18px;
            color: black;
            font-weight: normal;
          }
        }
      }
    }

    .info_wrap:nth-child(3) {
      margin-top: 3%;

      .count {
        .input-group {
          justify-content: left
        }

        .btn_section {
          margin-left: 10px;

          .delete_btn {
            display: flex;
            align-items: center;
            @include delete_button;
            height: 100%;
            padding: 5px;

            &:hover {
              background: #FF7272
            }
          }
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

      .failed_storage {
        background-color: #8A2828;
        border: 1px solid white;
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
      border-radius: 0 !important;
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
        margin-bottom: 20px;
        background: #48658C;
        color: white;
        font-weight: 700;
        width: 100px;
        font-size: 18px;
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
        padding: 10px 80px;

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

        // .dropdown {
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

  .change_btn {
    @include change_btn
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

        .search_section {
          background: #B5C9D0;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;

          .input-group-prepend {
            color: black;
          }

          .btn_section {
            display: flex;
            justify-content: center;

            button.send_btn {
              @include search_and_send_btn;
              font-size: 18px;
              padding: 5px;

              &:hover {
                background-color: #5e7aa2;
              }
            }
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

          &:hover {
            background-color: #5d85bb;
          }
        }

        button.send_btn {
          @include search_and_send_btn;
          padding: 5px;

          &:hover {
            background-color: #5e7aa2;
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

        .failed_storage {
          background-color: #8A2828;
          border: 1px solid white;
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
      border-radius: 0 !important;
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

      .submit_btn {
        margin-bottom: 20px;
        background: #48658C;
        color: white;
        font-weight: 700;
        width: 100px;
        font-size: 18px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #5d85bd;
        }
      }

      .wrap1 {
        justify-content: space-evenly;
        padding: 20px 20px 0;

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
            white-space: nowrap;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
          }
        }
      }
    }
  }

  .change_btn {
    @include change_btn
  }
}</style>