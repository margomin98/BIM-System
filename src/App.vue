<template>
	<router-view />
</template>

<script>
	export default {}
</script>

<style lang="scss">
.ag-chart-no-data-overlay{
  display: flex;
  justify-content: center;
  align-items: center;
}
	body {
		background-image: url('@/assets/body/bg.png');
		padding-right: unset !important;
		background-size: cover;
	}
	a {
		color: white;
		text-decoration: none;
	}
	.main_section .dropdown-menu {
		padding: 0;
		background: white !important;
	}
	.dropdown-item {
		font-size: 18px!important;
		margin-bottom: 0!important;
		&:hover {
			color: white !important;
			background-color: #2D4864 !important;
		}
		:active {
			color: white !important;
		}
	}
	// ::-webkit-scrollbar {
	// 	height: 6px;
	// 	border: 1px solid rgb(219, 218, 218);
	// 	border-radius: 5px;
	// 	width: 8px;
	// }
	//  ::-webkit-scrollbar-thumb {
	// 	display: block;
	// 	border-radius: 5px;
	// 	background-color: rgb(176, 175, 175);
	// 	border: 1px solid rgb(86, 85, 85);
	// }
	.ag-body .ag-cell {
		border: 0;
	}
	.ag-cell-value {
		display: flex;
		align-self: center;
		font-size: 18px;
		div {
			display: flex;
			align-items: center;
		}
	}
	.ag-header-container {
		background: #1F4E5F;
		span {
			color: white;
			font-weight: 700;
			font-size: 18px;
		}
		.ag-header-cell-text {
			text-align: center;
			flex-grow: 1;
		}
		.ag-header-group-cell-label,
		.ag-header-cell-label {
			justify-content: space-between;
		}
	}
	.ag-root-wrapper {
		border: unset !important
	}
	.ag-body {
		.ag-cell {
			border-bottom: 1px solid #babfc7 !important;
			border-left: 1px solid #babfc7 !important;
			border-right: 1px solid #babfc7 !important;
			align-items: center;
			display: flex;
		}
	}
	.grid_checkbox {
		display: flex;
		justify-content: center;
		align-items: center;
		.ag-selection-checkbox {
			margin-right: 0 !important;
		}
	}
	.gold-header {
		.ag-header-cell-text {
			cursor: pointer;
			background: #98CCD3;
			padding: 5px;
			border-radius: 7px;
		}
	}
	.ag-paging-panel {
		background: #1F4E5F;
		font-weight: 700;
		height: 40px;
		span {
			color: white
		}
	}
	.info_icon {
		height: 14.5px;
		width: 14.5px;
		margin: 0 2px 5px;
	}
	.swiper-button-next {
		color: pink !important;
	}
	.readonly_box {
		// pointer-events: none;
		user-select: none;
		overflow: hidden;
		&:focus {
			outline: none !important;
			background-color: #B4B4B4 !important;
			box-shadow: unset!important;
			cursor: pointer;
		}
	}
	.modal {
		.modal-header {
			.close_icon {
				cursor: pointer;
				display: flex;
				align-self: baseline;
				margin-bottom: 0;
			}
			.modal-title {
				width: 100%;
				word-break: break-word;
				margin: 0 auto;
				display: flex;
				align-self: baseline;
			}
		}
	}
	.p-datatable-wrapper {
		border: 1px solid black
	}
	@media only screen and (min-width: 1200px) {
		.container-fluid {
			padding-left: 0 !important;
			padding-right: 0 !important;
		}
	}
</style>
