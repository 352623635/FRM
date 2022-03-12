<template>
    <el-upload
            ref="upload"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            action="http://127.0.0.1:3001/web/essay_img_upload"
            class="upload-demo"
            name="essay"
    >
        <template #trigger>
            <el-button type="primary">select file</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload"
        >upload to server</el-button
        >
        <template #tip>
            <div class="el-upload__tip" style="color: red">
                limit 1 file, new file will cover the old file
            </div>
        </template>
    </el-upload>
</template>

<script setup>
    import { ref } from 'vue'
    const upload = ref()

    const handleExceed = (files) => {
        upload.value.clearFiles()
        upload.value.handleStart(files[0])
    }
    const submitUpload = () => {
        upload.value.submit()
    }
</script>

