<template>
    <!-- ViewFile Modal -->
    <div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">標題</h5>
                    <p data-bs-dismiss="modal" class='close_icon' style="cursor: pointer;">X</p>
                </div>
                <div class="modal-body">
                    <img src="https://i.pinimg.com/736x/ad/a2/ed/ada2edc637fc1dac75afed1c70fd71db.jpg" alt="Uploaded Image" class="w-100" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .modal {
        .modal-body {
            text-align: center;
            padding: 20px;
            margin: auto;
            img {
                width: 100%;
                height: auto;
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
        }
        .modal-header {
            h5 {
                font-weight: 700;
            }
            background: #528091;
            color: white;
            display: flex;
            justify-content: center;
        }
    }
</style>