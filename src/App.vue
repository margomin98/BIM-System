<template>
	<router-view />
</template>

<script>


export default {

}
</script>

<style lang="scss">
body {
	background-image: url('@/assets/body/bg.png');
}

a {
	color: white;
	text-decoration: none;
}

.ag-header-container {
	background: #1F4E5F;

	span {
		color: white;
		font-weight: 700;
		font-size: 18px;
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
}</style>
