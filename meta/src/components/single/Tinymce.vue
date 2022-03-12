<template>
    <div :id="id"></div>
</template>
<script>
    import { onMounted, onUnmounted } from "vue";
    import dynamicLoadScript from "@/assets/loadScript.js"
    import request from "../../utils/request";
    export default {
        props: {
            value: {
                type: String,
                default: ""
            }
        },
        watch:{
          value(val){
              val = val.replace(/"/g,'\\"');

              console.log(val)
          }
        },
        setup(props, { emit }) {
            const server='http://127.0.0.1:3001';
            //当前服务器地址
            const id = "tinymce-" + new Date().getTime();
            const init = () => {
                window.tinymce.init({
                    selector: `#${id}`,
                    // skin: "oxide-dark",
                    language: "zh_CN",


                    plugins: `print preview searchreplace autolink directionality visualblocks visualchars
            fullscreen image link media template code codesample table charmap hr pagebreak
            nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern
            help emoticons autosave autoresize`,
                    toolbar: `code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor
            | alignleft aligncenter alignright alignjustify outdent indent | \
            styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
            table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs`,

                    min_height: 300,

                    fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
                    font_formats: `微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;
            仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;
            Book Antiqua=book antiqua,palatino;`,
                    toolbar_sticky: true,
                    autosave_ask_before_unload: false,
                    // 图片上传
                    images_upload_handler: function (blobInfo, success, failure) {
                        if (blobInfo.blob().size > 1024*2048) {
                            failure('文件体积过大')
                        }
                        // if (self.accept>= 0) {
                        //     uploadPic()
                        // }
                        else {
                            uploadPic()
                            // failure('图片格式错误')
                        }
                        function uploadPic () {
                            let formData = new FormData()
                            // 服务端接收文件的参数名，文件数据，文件名
                            formData.append('essay', blobInfo.blob(), blobInfo.filename());
                            request.post('/web/essay_img_upload',formData).then((res) => {
                                // 这里返回的是你图片的地址
                                success(server+res.data)
                            })
                                .catch(() => {
                                    failure('上传失败')
                                })
                        }
                    },
                    branding: false, // 去水印
                    init_instance_callback: editor => {
                        if (props.value) {
                            editor.setContent(props.value);
                        }

                        editor.on("NodeChange Change KeyUp SetContent", () => {
                            emit("update:value", editor.getContent());
                        });
                    },
                });
            };
            onMounted(async () => {
                await dynamicLoadScript ("/tinymce/tinymce.min.js");
                init();
            });
            return { id };
        }
    };
</script>