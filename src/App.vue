<template>
	<router-view />
</template>

<script>
	export default {}
</script>

<style lang="scss">
	.container-fluid {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
	body {
		background-image: url('@/assets/body/bg.png');
		padding-right: unset !important;
	}
	a {
		color: white;
		text-decoration: none;
	}
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
    pointer-events: none;
    user-select: none;
  }
</style>
