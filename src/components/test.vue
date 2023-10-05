<template>
    <!-- Your custom content here -->
    <div>
        <button class="view_btn" @click="handleButtonClick">檢視</button>
    </div>
</template>
  
<script>
    export default {
        methods: {
            handleButtonClick() {
                // Handle the button click event here
                alert("Custom button clicked!");
            },
        },
    };
</script>

<style lang="scss" scoped>
.view_btn{
  border: none;
    border-radius: 10px;
    background: #5d85bd;
    color: white;
    font-weight: 700;
    &:hover{
        background: rgb(159, 180, 242);
    }
}</style>
  