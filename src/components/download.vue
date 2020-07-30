<template>
    <div class="download">
        <div class="banner">
            <img src="../assets/banner.png" alt="">
        </div>
        <div class="success" >
            <img v-if="this.$route.query.show === 'kouyu'" src="../assets/success.png" alt="">
            <img v-else-if="this.$route.query.show === '30day'" src="../assets/already.png" alt="">
            <!-- <img v-if="this.$route.query.show === 'success'" src="../assets/sussess.png" alt="">
            <img v-else-if="this.$route.query.show === 'already'" src="../assets/already.png" alt="">-->
            <img v-else style="width:70%;" src="../assets/fail.png" alt="">
        </div>
        <div class="downloadbutton" @click="download">
            <img src="../assets/download.png" alt="">
        </div>
        <!-- 底部 -->
        <div class="footer">
            <img src="../assets/logo.png" style="display:none;" alt="">
            <img src="../assets/underbar.png" alt="">
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            download() {
                var u = navigator.userAgent;
                if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
                    window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.jinghang.ai.xjenglish");
                } else if (u.indexOf("iPhone") > -1) {
                    window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.jinghang.ai.xjenglish");
                } else if (u.indexOf("Windows Phone") > -1) {
                    alert("对不起，暂时不支持此操系统");
                }else{
                    alert("对不起，暂时不支持此操系统");
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .download{
        width:100%;
        height:100%;
        overflow: hidden;
        .banner{
            width:100%;
            img{
                width:100%;
            }
        }
        .success{
            width:100%;
            img{
                width:100%;
                display: block;
                margin:0 auto;
            }
        }
        .downloadbutton{
            width:100%;
            margin-top:30px;
            img{
                width:80%;
                display: block;
                margin:0 auto;
            }
        }
        .footer{
            margin-top:50px;
            width:100%;
            img:nth-child(1){
                width:30%;
                margin-left: 30%;
                margin-bottom:20px;
            }
            img:nth-child(2){
                width:100%;
            }
        }
    }
</style>
