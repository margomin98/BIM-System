<template>
  <div class="item" :class="{ 'failed_storage': AssetData.Failed }">
    <div class="col" v-if="edit_btn">
      <button class="change_btn" data-bs-toggle="modal" data-bs-target="#searchModal" @click="editBtn">更換</button>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">資產編號：</div>
        <input type="text" class="form-control readonly_box " aria-label="Default"
          aria-describedby="inputGroup-sizing-default" v-model="AssetData.AssetsId" readonly />
      </div>
    </div>
    <div class="col">
      <div class="input-group mb-3">
        <div class="input-group-prepend">物品名稱：</div>
        <input type="text" class="form-control readonly_box " aria-label="Default"
          aria-describedby="inputGroup-sizing-default" v-model="AssetData.AssetName" readonly />
      </div>
    </div>
    <div class="col count d-flex">
      <div class="input-group">
        <div class="input-group-prepend">數量：</div>
        <div class="num_wrap d-flex ">
          <div class="number-input-box">
            <input class="input-number readonly_box " type="text" v-model="AssetData.Number" readonly />
          </div>
          <div class="btn_section" v-if="delete_btn">
            <button class="delete_btn" @click="deleteBtn">刪除</button>
          </div>
          <p>{{ AssetData.error_msg }}</p>
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
  setup(props, { emit }) {
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

.main_section {
  .btn_section {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.item_wrap {
  .item {
    background-color: #526f8e;
    border-radius: 10px;
    padding: 20px;
    height: fit-content;
  }

  .failed_storage {
    background-color: #8a2828 !important;
    border: 1px solid white;
  }
}

.delete_btn {
  @include content_delete_button;
}

.change_btn {
  @include change_btn;
}

.input-number {
  @include count_btn;
}

.input-group-prepend {
  white-space: nowrap;
  color: white;
  font-weight: 700;
  font-size: 20px;
  width: 100px;
  text-align: end;
}

.readonly_box {
  @include readonly_box;
}

@media only screen and (max-width: 767px) {
  .main_section {
    .item_wrap {
      .input-group {
        .input-group-prepend {
          text-align: left;
        }

        flex-direction: column;

        input,
        .number-input-box {
          width: 100%;
        }
      }

      .input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: unset;
      }
    }
  }
}</style>