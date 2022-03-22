<template>
    <div style="width: 100%;">
        <div class="footer">
            <div class="footer-box">
                <div class="site">
                    <div class="site-img">
                        <img alt="暂无图片">
                    </div>
                    <div class="text">微信公众号</div>
                    <div v-for="(VX,index) in footer[0].VX" :key="index.VX" class="account">
                        <div class="txt-img">
                            <img :src=VX.img alt="暂无图片" class="txt-img">
                        </div>
                        <p class="txt">{{VX.title}}</p>
                    </div>
                </div>
                <ul class="about">
                    <a href="" >关于我们</a>
                </ul>
                <div class="site">
                    <div class="text">友情链接：</div>
                    <div v-for="(link,index) in footer[0].link" :key="index.link" class="account">
                        <a :href=link.url class="txt">{{link.title}}</a>
                    </div>
                </div>
                <div class="icp">
                    <ul>
                        <li>
                            <a :href=footer[0].icp.urlG target="_blank">
                                <img :src=footer[0].icp.govimg alt="">
                                {{footer[0].icp.gov}}</a>
                        </li>
                        <li>
                            <a :href=footer[0].icp.urlB target="_blank">
                                {{footer[0].icp.BeiAn}}</a>
                        </li>
                    </ul>
                    <p class="bottom">Copyright © 2022-2022 重庆大数据实验室 版权所有</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Footer",
        props:{
            footer:Object,
        },
    }
</script>

<style lang="scss">
    .footer{
      border-radius: 5px 5px 0 0 ;
        background-color: rgba(124,156,151,0.5);
        padding-top: 20px;
        width: 100%;
        text-align: center;

        margin: auto;
        a{
            color: rgba(0,71,255,0.46);
        }
        a:hover{
            background-color: black;
            color: #f9f9f9;
        }
    }
    .site{
        display: flex;
        justify-content: center;
        .site-img{
            margin: auto 20px auto 20px;
            width: auto;
        }
        .text{
            margin: auto 20px auto 20px;
            width: auto;
            font-size: 15px;
        }
        .account{
            margin-left: 10px;
            font-size: 10px;
            .txt-img{
                width: 40px;
                height: 40px;
                margin: auto;
            }
            .txt{
                margin: 5px 0 0 0;
            }
        }
        a{
            text-decoration:none;
        }

    }
    .icp{
        display: flex;
        flex-direction: column;
        text-align: center;
        ul{
            list-style: none;
            margin: auto;
        }
        li{
            display: inline;
            line-height: 40px;
            float:left;
            margin-left: 10px;
            a{
                font-size: 15px;
                img{
                    height: 1rem;
                    width: 1rem;
                }
            }

        }
    }

</style>