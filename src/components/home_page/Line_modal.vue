<template>
    <!-- Modal -->
    <div class="modal fade" :id="props.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">提醒</h5>
                    <div class="close_icon">
                        <p type="button" data-bs-dismiss="modal" aria-label="Close" @click="cancelChange">X</p>
                    </div>
                </div>
                <div class="modal-body">
                    <!-- 綁定訊息 -->
                    <p v-show="props.isChecked">完成LINE通知綁定</p>
                    <!-- 取消訊息 -->
                    <p v-show="!props.isChecked">取消LINE通知綁定</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn cancel" data-bs-dismiss="modal" @click="cancelChange">取消</button>
                    <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="confirm">確定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['text', 'cancel', 'id', 'isChecked']);
const emit = defineEmits(['cancel', 'confirm']);
const cancelChange = ()=>{
    emit('cancel');
}
const confirm = () =>{
    emit('confirm');
}
</script>

<style lang="scss" scoped>
    @import '@/assets/css/global.scss';
    .modal {
        .modal-body {
            padding: 20px;
            margin: auto;
            p {
                text-align: center;
                font-weight: 800;
            }
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
            justify-content: center;
            .confirm {
                color: white;
                font-weight: 700;
                background-color: #0C9D0C;
                &:hover {
                    background-color: #1dc21d;
                }
            }
            .cancel {
                color: white;
                font-weight: 700;
                background-color: #B4B4B4;
                &:hover {
                    background-color: #B4B4B4;
                }
            }
        }
        .modal-header {
            h5 {
                font-weight: 700;
            }
            background: #00C200;
            color: white;
            display: flex;
            justify-content: center;

            .close_icon {
                cursor: pointer;
                align-self: unset;
            }
            .modal-title {
                margin: auto;
                justify-content: center;
            }
        }
    }
</style>