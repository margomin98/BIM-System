<template>
    <div class="warn">
        <h4>
            確定刪除以下項目嗎？
        </h4>
    </div>
</template>

<style lang="scss" scoped>
    .warn {
        text-align: center;
        padding: 10px 0;
        background: #9f0000;
        margin-bottom: 10px;
        border-radius: 5px;
        h4 {
            color: white;
            margin-bottom: 0;
            font-weight: 700;
            &::before {
                content: "\26A0";
            }
        }
    }
</style>