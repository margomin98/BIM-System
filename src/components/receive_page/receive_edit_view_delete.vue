<template>
    <viewmodal />
    <div class="main_section">
        <div class="info_wrap col">
            <warn />
            <div class="fixed_info">
                <div>
                    <p>收貨資訊</p>
                </div>
            </div>
            <div class="content">
                <!-- 收貨單號 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">收貨單號：</div>
                        <input type="text" class="form-control readonly_box " aria-label="Default"
                            aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
                <!-- 物流單號 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="red_star">*</span>物流單號：</div>
                        <input type="text" class="form-control readonly_box " aria-label="Default"
                            aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
                <!-- 貨運公司 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="red_star">*</span>貨運公司：</div>
                        <input type="text" class="form-control readonly_box " aria-label="Default"
                            aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
                <!-- 到貨件數 -->
                <div class="col-xl-6 col-lg-6 col-md-6 col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend"><span class="red_star">*</span>到貨件數：</div>
                        <input class="form-control  readonly_box " type="number" readonly />
                    </div>
                </div>
                <!-- 收件人員/收件日期 -->
                <div class="row row_wrap g-0">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                收件人員：
                            </div>
                            <input class="form-control readonly_box " type="text" readonly />
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-12">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class='red_star'>*</span>收件日期：
                            </div>
                            <input class="form-control readonly_box " type="date" readonly />
                        </div>
                    </div>
                </div>
                <!-- 通知對象 -->
                <div class="col">
                    <div class="input-group  mb-3">
                        <div class="input-group-prepend">通知對象：</div>
                        <div class="multi_user_select">
                            <!-- :taggable="true"可以直接新增新的一個資料，@tag="tagFn"  -->
                            <multiselect v-model="value" tag-placeholder="Add this as new tag"
                                placeholder="Search or add a tag" label="name" track-by="code" :options="options"
                                :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                        </div>
                    </div>
                </div>
                <!-- 備註 -->
                <div class="col">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">備註：</div>
                        <textarea class="form-control " style="height: 250px;" placeholder="最多輸入500字"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="info_wrap col my-5">
            <div class="fixed_info">
                <div>
                    <p>物流文件上傳 已上傳物流文件</p>
                </div>
            </div>
            <div class="content">
                <div class="col-xl-2 col-lg-2 col-md-2 col-12">
                    <button class="upload_file_pt1" @click="openFileInput(0)">選擇檔案</button>
                    <input type="file" id="fileInput" ref="fileInput1" style="display: none"
                        @change="handleDocumentFile($event)" multiple />
                </div>
                <div class="d-flex selected_file col-12">
                    <!-- 已上傳文件 -->
                    <p class="text-start mt-3 mb-2 uploaded_file">已上傳文件</p>
                    <!-- <div class="icon"  :key="index">
                        <p class="uploded_file_name">XX
                          <img src="@/assets/view.png" @click="handlePreview(file)">
                          <img class="close_icon" src="@/assets/trash.png" @click="deleteFile('document',index , file)">
                        </p>
                      </div> -->
                    <!-- 新上傳檔案 -->
                    <p class="text-start mb-0 uploaded_file">已選擇檔案</p>
                    <div class="icon" :key="index">
                        <p class="uploded_file_name">XXX
                            <img src="@/assets/view.png" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                            <img class="close_icon" src="@/assets/trash.png"
                                @click="deleteFile('document', index, file)">
                        </p>
                    </div>
                    <div class="icon" :key="index">
                        <p class="uploded_file_name">文件名字文件名字文件名字文件名字
                            <img src="@/assets/view.png" data-bs-toggle="modal" data-bs-target="#viewFile_modal">
                            <img class="close_icon" src="@/assets/trash.png"
                                @click="deleteFile('document', index, file)">
                        </p>
                    </div>
                    <!-- doc/docx download hidden Link -->
                    <!-- <a href="" style="display: none;" id="download-link"></a> -->
                    <!-- Modal Trigger -->
                    <!-- <button type="button" style="display: none" id="openModal" data-bs-toggle="modal" data-bs-target="#photoModal"></button> -->
                    <!-- Photo Modal -->
                    <!-- <div class="modal fade" id="photoModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="photoModalLabel">照片</h5>
                              <div class="close_icon">
                                <p type="button" data-bs-dismiss="modal" aria-label="Close">X</p>
                              </div>
                            </div>
                            <div class="modal-body">
                              <img  class="w-100">
                            </div>
                          </div>
                        </div>
                      </div> -->
                </div>
            </div>
        </div>
        <div class="info_wrap col">
            <div class="fixed_info">
                <div>
                    <p>照片上傳</p>
                </div>
            </div>
            <div class="content">
                <div class="col-xl-2 col-lg-2 col-md-2 col-12">
                    <button class="upload_file_pt1" @click="openFileInput(0)">選擇檔案</button>
                    <input type="file" id="fileInput" ref="fileInput1" style="display: none"
                        @change="handleDocumentFile($event)" multiple />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import viewmodal from '@/components/view_modal.vue';
import warn from '@/components/utils/warn_title.vue';
export default {
    components: {
        Multiselect,
        viewmodal,
        warn
    },
    data() {
        return {
            value: [{
                name: 'Javascript',
                code: 'js'
            }],
            options: [{
                name: 'Vue.js',
                code: 'vu'
            },
            {
                name: 'Javascript',
                code: 'js'
            },
            {
                name: 'Open Source',
                code: 'os'
            }
            ]
        }
    },
    methods: {
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            this.options.push(tag)
            this.value.push(tag)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.fixed_info {
    @include fixed_info;

    p {
        font-size: 20px;
        margin-bottom: 0;
    }
}

.input-group {
    .input-number {
        @include count_btn;
    }

    .form-control,
    .multi_user_select {
        height: 35px;
        margin-left: unset !important;
    }

    .input-group-prepend {
        white-space: nowrap;
        color: white;
        font-weight: 700;
        font-size: 20px;
    }
}

p {
    margin-bottom: 0;
}

.selected_file {
    flex-direction: column;

    .uploaded_file,
    .uploded_file_name {
        font-weight: 700;
        color: white;
        margin-top: 5px;
    }

    p.uploded_file_name::before {
        margin-right: 10px;
        content: '·';
        font-weight: 700;
        color: white;
    }

    .icon {
        margin: 0 10px;
        gap: 5px;
        display: flex;
        width: 100%;

        img {
            cursor: pointer;
            margin: 0 5px
        }

        .close_icon {
            scale: 1.5
        }
    }
}

.upload_file_pt1,
.upload_file_pt2 {
    width: 100px;
    text-align: center;
    font-weight: 700;
    border: none;
    display: flex;
    padding: 10px;
    background: #314F7A;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: white;

    &:hover {
        background: #586d8b
    }
}

@media only screen and (min-width: 1200px) {
    .main_section {
        .info_wrap {
            margin: auto;
            width: 800px;

            .content {
                @include content_bg;

                .input-group {
                    flex-wrap: nowrap;

                    .input-group-prepend {
                        width: 152px;
                        text-align: end;
                    }
                }

                .date-selector {
                    width: 200px;

                    input {
                        width: 109%
                    }
                }

                .multi_user_select {
                    width: 80%
                }
            }
        }
    }
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
    .main_section {
        .info_wrap {
            margin: auto;
            width: 700px;

            .content {
                @include content_bg;

                .input-group {
                    flex-wrap: nowrap;

                    .input-group-prepend {
                        width: 152px;
                        text-align: end;
                    }
                }

                .date-selector {
                    width: 200px;

                    input {
                        width: 109%
                    }
                }

                .multi_user_select {
                    width: 80%
                }
            }
        }
    }
}

@media only screen and (max-width: 767px) {
    .main_section {
        .info_wrap {
            padding: 0 5%;

            .content {
                @include content_bg;

                input,
                textareA {
                    width: 100%;
                }

                .input-group {
                    flex-direction: column;

                    .input-group-prepend {
                        width: 152px;
                        text-align: left;
                    }
                }

                .date-selector {
                    width: 200px;

                    input {
                        width: 109%
                    }
                }
            }
        }
    }
}
</style>