<template>
	<div>
		<div class="info_wrap col">
			<div v-show="!hidden.div.warning" class="warn">
				<h4>
					確定刪除以下項目嗎？
				</h4>
			</div>
			<!-- 承辦人員 -->
			<div class="fixed_info">
				<div>
					<p>
						承辦人員 : {{ formParams.Executor }}
					</p>
				</div>
			</div>
			<div class="content">
				<form>
					<!-- 編號 -->
					<div v-show="!hidden.input.PO_ID" class="col-12">
						<div class="input-group mb-3">
							<div class="input-group-prepend">
								編號：
							</div>
							<input ref="inputElement" type="text" class="form-control readonly_box" readonly v-model="formParams.PO_ID">
						</div>
					</div>
					<!-- 訂單編號： -->
					<div class="col-12">
						<div class="input-group mb-3">
							<div class="input-group-prepend">
								<span>*</span>訂單編號：
							</div>
							<input ref="inputElement" type="text" class="form-control" :placeholder="props.placeholder.PurchaseNum"
								v-model="formParams.PurchaseNum">
						</div>
					</div>
					<!-- 採購來源 -->
					<div class="col-12">
						<div class="input-group mb-3">
							<div class="input-group-prepend">
								採購來源：
							</div>
							<input ref="inputElement" type="text" class="form-control" :placeholder="props.placeholder.Source" v-model="formParams.Source">
						</div>
					</div>
					<!-- 使用專案 -->
					<div class="col-12">
						<div class="input-group mb-3">
							<div class="input-group-prepend">
								使用專案：
							</div>
							<input ref="inputElement" type="text" class="form-control" :placeholder="props.placeholder.Use" v-model="formParams.Use">
						</div>
					</div>
					<!-- 下訂日期 -->
					<div class="row g-0">
						<div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
							<div class="input-group mb-3">
								<div class="input-group-prepend"><span>*</span>下訂日期：</div>
								<div class="date-selector">
									<input type="date" class="date-input" v-model="formParams.PurchaseDate" />
								</div>
							</div>
						</div>
						<!-- 採購件數 -->
						<div class="col-xl-6 col-lg-6 col-md-6 col-12 d-flex">
							<div class="input-group  mb-3">
								<div class="input-group-prepend"><span>*</span>採購件數：</div>
								<div class="num_wrap d-flex ">
									<div class="number-input-box">
										<input class="input-number " type="number" min="1" v-model="formParams.Quantity" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- 文件上傳 -->
					<div class="col-12 repair_photo_section">
						<div class="input-group ">
							<div class="input-group-prepend"> <span>*</span>文件上傳：</div>
							<div class="mb-3 file_wrap">
								<button type="button" class="choose_btn" @click="openFileExplorer(fileInputs)">選擇檔案</button>
								<input type="file" ref="fileInputs" accept="image/*,.doc,.docx,.pdf" multiple style="display: none;"
									@change="handleDocumentFile($event,fileParams)">
							</div>
						</div>
					</div>
					<!-- 已選擇的檔案 -->
					<div class="col-12 selected_file">
						<div class="input-group">
							<div class="input-group-prepend">已選擇檔案：</div>
							<div class="file_upload_box">
								<div v-for="(item, index) in fileParams.viewDoc" :key="index" class="file_upload_wrap">
									<p>{{ item.FileName }}
										<img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="handlePreview(item,modalParams)">
										<img v-show="!hidden.file_trashcan" class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteDocument(index,item,fileParams)">
									</p>
								</div>
							</div>
						</div>
					</div>
					<!-- 已上傳的檔案 -->
					<div v-show="!hidden.div.existFile" class="col-12 selected_file">
						<div class="input-group">
							<div class="input-group-prepend">已上傳文件：</div>
							<div class="file_upload_box">
								<div v-for="(item, index) in fileParams.viewDoc" :key="index" class="file_upload_wrap">
									<p>{{ item.FileName }}
										<img class="view_icon" src="@/assets/view.png" style="margin-left: 10px;" @click="handlePreview(item,modalParams)">
										<img v-show="!hidden.file_trashcan" class="trash_icon" src="@/assets/trash.png" style="margin-left: 10px;" @click="deleteDocument(index,item,fileParams)">
									</p>
								</div>
							</div>
						</div>
					</div>
					<!-- Modal Trigger -->
					<button type="button" style="display: none" id="open_modal" data-bs-toggle="modal" data-bs-target="#viewFile_modal"></button>
					<!-- ViewFile Modal -->
					<div class="modal fade" id="viewFile_modal" tabindex="-1" role="dialog" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title">{{ modalParams.title }}</h5>
									<p data-bs-dismiss="modal" class='close_icon'>X</p>
								</div>
								<div class="modal-body">
									<img :src="modalParams.src" alt="Uploaded Image" class="w-100" />
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	inject,
	onMounted,
	reactive,
	ref,
} from 'vue';
import router from '@/router';
import {
	getDate, handleDocumentFile, openFileExplorer,handlePreview,deleteDocument,
} from '@/assets/js/common_fn.js'
import {
	getApplication,
	getAssets
} from '@/assets/js/common_api.js'
import axios from 'axios';
const props = defineProps(['hidden','placeholder']);
const ApplicationDate = ref('');
const modalParams = reactive({
	title: '',
	src: '',
})
const fileInputs = ref(null);
const formParams = inject('form');//表單參數
const fileParams = inject('file');//表單參數
const Applicant = ref('');//申請人員參數
onMounted(() => {
	ApplicationDate.value = getDate()
	Applicant.value = props.applicant;
});

</script>

<style lang="scss" scoped>
@import '@/assets/css/global.scss';

.readonly_box {
	@include readonly_box;
}

.view_icon,
.trash_icon {
	cursor: pointer;
}

.modal {
	.modal-body {
		padding: 20px;
		margin: auto;
	}

	.modal-content {
		margin: auto;
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

.warn {
	text-align: center;
	padding: 10px 0;
	background: #9f0000;
	margin-bottom: 10px;
	border-radius: 5px;
	margin: 30px auto 20px;

	h4 {
		color: white;
		margin-bottom: 0;
		font-weight: 700;

		&::before {
			content: "\26A0";
		}
	}
}

.fixed_info {
	@include fixed_info;

	p {
		font-size: 20px;
		margin-bottom: 0;
	}
}

.input-group-prepend {
	color: white;
	font-weight: 700;
	font-size: 20px;

	span {
		@include red_star
	}
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
}

.selected_file {
	.file_upload_box {
		.file_upload_wrap {
			margin-bottom: 0;
			display: flex;
			word-break: break-word;

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
}

@media only screen and (min-width: 1200px) {
	.info_wrap {
		margin: 30px auto 0;
		width: 800px;

		.warn {
			width: 800px;
		}

		.content {
			@include content_bg;
			padding: 35px 50px;

			.input-group {
				.num_wrap {
					.number-input-box {
						width: 200px;

						.input-number {
							width: 100%;
							@include count_btn;
						}
					}
				}

				.readonly_box {
					height: 37px;
				}

				.form-control {
					height: 37px;
					border-radius: 0;
				}

				.date-selector {
					width: 190px;

					input {
						width: 100%;
						border: none;
						height: 35px;
						border-radius: 5px;
						padding: 5px;
					}
				}

				.input-group-prepend {
					text-align: end;
					width: 140px;
				}
			}
		}

		.selected_file {
			.input-group {
				flex-wrap: unset;
			}

			.input-group-prepend {
				white-space: nowrap;
			}
		}
	}
}

@media only screen and (min-width: 768px) and (max-width: 1199px) {
	.main_section {
		h1 {
			margin-top: 100px;
			text-align: center;
			font-size: 55px;
			font-weight: 600;
			@include title_color;
		}

		.info_wrap {
			margin: 30px auto 0;
			width: 750px;

			.warn {
				width: 750px;
			}

			.content {
				@include content_bg;
				padding: 35px 50px;

				.input-group {
					.num_wrap {
						.number-input-box {
							width: 175px;

							.input-number {
								width: 100%;
								@include count_btn;
							}
						}
					}

					.readonly_box {
						height: 35px;
						margin-left: unset !important;
					}

					.form-control {
						height: 37px;
						border-radius: 0;
					}

					.date-selector {
						width: 175px;

						input {
							width: 100%;
							border: none;
							height: 35px;
							border-radius: 5px;
							padding: 5px;
						}
					}

					.input-group-prepend {
						text-align: end;
						width: 140px;
					}
				}
			}

			.selected_file {
				.input-group {
					flex-wrap: unset;
				}

				.input-group-prepend {
					white-space: nowrap;
				}
			}
		}
	}
}

@media only screen and (max-width: 767px) {
	.main_section {
		.readonly_box {
			height: 35px;
			margin-left: unset !important;
		}

		h1 {
			margin-top: 80px;
			text-align: center;
			font-size: 40px;
			font-weight: 600;
			@include title_color;
		}

		.info_wrap {
			padding: 0 5%;

			.fixed_info {
				height: unset;
				flex-direction: column;
				padding: 10px;
			}

			.content {
				@include content_bg;

				.input-group {
					flex-direction: column;

					.input-group> :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {
						margin-left: unset;
						border-radius: 5px;
						margin-top: 5px;
						height: 35px;
					}

					.num_wrap {
						margin-left: unset !important;

						.number-input-box {
							width: 100%;

							input {
								width: 100%;
								@include count_btn;
							}
						}
					}

					.date-selector {
						margin-left: unset !important;

						input {
							width: 100%;
							border: none;
							border-radius: 5px;
							padding: 5px;
						}
					}

					.form-control {
						height: 35px;
						width: 100%;
						border-radius: 0;
						margin-left: unset !important;
					}

					.input-group-prepend {
						width: 100px;
						white-space: nowrap;
					}

					.file_wrap {
						margin-left: unset !important;
					}
				}
			}
		}
	}
}
</style>