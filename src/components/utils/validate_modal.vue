<template>
  <div class="modal fade" :id="props.modal_id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title">{{ props.user.title }}</h5>
          <p class='m-0 close_icon' data-bs-dismiss="modal">X</p>
        </div>
        <div class="modal-body">
          <div class="col">
            <div class="input-group mb-3">
              <div class="modal-input-group-prepend">帳號：</div>
              <input type="text" class="form-control" aria-label="Default" v-model="props.user.userName" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <div class="modal-input-group-prepend">密碼：</div>
              <input type="password" class="form-control" aria-label="Default" v-model="props.user.userPassword" />
            </div>
          </div>
        </div>
        <div class="modal-footer m-auto">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
            @click="apiStore.validateUser(props.user)">驗證</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAPIStore } from '@/store';
import { onUnmounted } from 'vue';

const props = defineProps(['user', 'modal_id']);
const apiStore = useAPIStore();
onUnmounted(() => {
  apiStore.$dispose();
})
</script>

<style lang="scss" scoped>
.modal {
  .modal-body {
    padding: 16px 16px 0;
  }

  button {
    background: #506b91;
    border: none;
    font-weight: 700;
    font-size: 18px;

    &:hover {
      background: #6d92b3;
    }
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

    background: #3D4E61;
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

  .modal-dialog {
    padding: 0 !important
  }
}
</style>