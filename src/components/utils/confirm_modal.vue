<template>
    <!-- Modal -->
    <div class="modal fade" :id="props.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">警示</h5>
                    <div class="close_icon">
                        <p type="button" data-bs-dismiss="modal" aria-label="Close" @click="cancel">X</p>
                    </div>
                </div>
                <div class="modal-body">
                    <p>{{ props.text }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn confirm" data-bs-dismiss="modal" @click="confirm">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['id', 'text']);
const emit = defineEmits(['cancel', 'confirm']);
const confirm = () =>{
    emit('confirm');
}
const cancel = () =>{
    emit('cancel');
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
                background-color: #5d85bd;
                &:hover {
                    background-color: #6d92b3;
                }
            }
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
                align-self: unset;
            }
            .modal-title {
                margin: auto;
            }
        }
    }
</style>