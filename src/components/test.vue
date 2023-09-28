<template>
    <!-- Your custom content here -->
    <div>
        <!-- This could be your custom content, e.g., a button -->
        <button @click="handleButtonClick">Custom Button</button>
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
  