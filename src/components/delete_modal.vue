<template>
  <!-- delete Modal -->
  <div class="modal fade delete_modal" id="deleteModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          確定刪除這筆項目嗎？
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">否</button>
          <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal" @click="props.delete(props.id)">是</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['delete','id']);
</script>

<style lang="scss" scoped>
  @import '@/assets/css/global.scss';
  .delete_modal {
    .modal-content {
      border: solid 1px black;
      border-radius: 0;
      .modal-body {
        background: #E94B4B;
        text-align: center;
        font-weight: 700;
        color: white;
        border-bottom: solid 1px black;
      }
      .modal-footer {
        margin: auto;
        gap: 10px;
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
</style>