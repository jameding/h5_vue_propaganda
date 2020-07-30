<template>
    <div class="register">
        <!-- 图片 -->
        <div class="banner">
            <img src="../assets/banner.png" alt="">
            <img src="../assets/ticket.png" alt="">
        </div>
        <!-- 输入框 -->
        <div class="input">
            <input type="text" class="phoneNumber" placeholder="请输入手机号" v-model="phoneNumber " autofocus>
            <div>
                <input class="yzm" type="text" placeholder="短信验证码" v-model="code " >
                <span @click="getAuthCode">{{authCode}}</span>
            </div>
            <button @click="receive" class="btn">领取会员</button>
        </div>
        <div class="rule">
            <p>* 每个用户仅限领取一次</p>
            <p>* 本次活动赠送总数：1000个送完即止</p>
        </div>
        <!-- 底部 -->
        <div class="footer">
            <img src="../assets/logo.png" style="display: none;" alt="">
            <img src="../assets/underbar.png" alt="">
        </div>
        <!-- 弹窗 -->
        <div class="popup" v-if="popup">
            {{errorMsg}}
        </div>
    </div>
</template>
<script>
    export default {
        name:"register",
        data(){
            return {
                phoneNumber : "",  //手机号
                code : "",   //输入的验证码
                errorMsg: "",
                popup:false,
                show:false,
                schoolId:'',
                getCode:false,
                authCode:'点击验证',
                // vipCount:0,
                // api:'http://jztest.jinghangapps.com:5432/'
                api:'http://www.jinghangapps.com/jingxiaoai/'
            }
        },
        created(){
            let url = window.location.href;
            this.schoolId = this.$route.query.schoolId?this.$route.query.schoolId:'';
        },
        methods:{
            getAuthCode(){
                let getCode = this.getCode;
                if (getCode) {
                    return;
                }
                let phoneNumber  = this.phoneNumber ;
                let myreg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
                if (phoneNumber .length === 0) {
                    this.errorMsg = "手机号码不能为空！";
                    this.popup = true;
                    setTimeout(()=>{
                    this.popup = false;
                    },2000);
                    return;
                } else if (
                    phoneNumber .length !== 11 ||
                    !myreg.test(phoneNumber )
                ) {
                    this.errorMsg = "手机号码格式错误，请重新输入！";
                    this.popup = true;
                    setTimeout(()=>{
                    this.popup = false;
                    },2000);
                    return;
                }
                this.getCode = true;
                let count = 60;
                this.authCode = '60s';
                let timer = setInterval(() => {
                    count -= 1;
                    this.authCode = `${count}s`;
                    if (count === 0) {
                    this.authCode = `重新获取`;
                    clearInterval(timer);
                    this.getCode = false;
                    }
                }, 1000);
                this.popup=true;
                this.errorMsg="已获取验证码";
                setTimeout(()=>{
                    this.popup=false;
                },2000)
                let formData = new FormData();
                formData.append("phoneNumber", phoneNumber );
                this.$http
                    .post(
                    this.api+"sendSms",
                    formData
                    )
                    .then(res => {}, res => {});
            },
            receive(){
                let formData = new FormData();
                let phoneNumber  = this.phoneNumber  || "";
                let code  = this.code  || "";
                let myreg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
                if (phoneNumber .length === 0) {
                    this.errorMsg = "手机号码不能为空！";
                    this.popup = true;
                    setTimeout(()=>{
                    this.popup = false;
                    },2000);
                    return;
                } else if (
                    phoneNumber .length !== 11 ||
                    !myreg.test(phoneNumber )
                ) {
                    this.errorMsg = "手机号码格式错误，请重新输入！";
                    this.popup = true;
                    setTimeout(()=>{
                            this.popup = false;
                            },2000);
                    return;
                } else if (code .length === 0) {
                    this.errorMsg = "验证码不能为空！";
                    this.popup = true;
                    setTimeout(()=>{
                    this.popup = false;
                    },2000);
                    return;
                }
                if(this.schoolId == ''){
                    this.errorMsg = "网址错误不能领取";
                    this.popup = true;
                    setTimeout(()=>{
                    this.popup = false;
                    },2000);
                    return;
                }
                formData.append("phoneNumber", phoneNumber );
                formData.append("code", code );
                formData.append("schoolId", this.schoolId);
                this.$http.post(this.api+"ncReceiveReward", formData).then( res => {
                        if (res.data.code === "401") {
                            if(res.data.msg === "会员名额已用完！"){
                                this.errorMsg="会员名额已用完！";
                                this.popup=true;
                                setTimeout(()=>{
                                    this.popup=false;
                                    this.$router.push({
                                        name: "download",
                                        params: { show:"fail" }
                                    });
                                },2000)
                                return;
                            }
                            if(res.data.msg === "该帐号已领取过会员！"){
                                this.errorMsg="该帐号已领取过会员！";
                                this.popup=true;
                                setTimeout(()=>{
                                    this.popup=false;
                                    this.$router.push({
                                        name: "download",
                                        params: { show:"already" }
                                    });
                                },2000)
                                return;
                            }
                            this.errorMsg = res.data.msg;
                            this.popup = true;
                            setTimeout(()=>{
                                this.popup = false;
                            }, 2000);
                            return;
                        }else if(res.data.code === "500"){
                              this.errorMsg="领取错误，请重试";
                                this.popup=true;
                                setTimeout(()=>{
                                    this.popup=false;
                                },2000)
                                return;
                        }
                        console.log('res',res);
                        if(res.data.data.rewardInfo === '口语课会员'){
                          this.$router.push('download?show=kouyu');
                          // this.$router.push('download?show=kouyu');
                          // location.href = 'download?show=kouyu';
                        }else if(res.data.data.rewardInfo === '30天备考计划优惠券'){
                          this.$router.push('download?show=30day');
                          // this.$router.push('download?show=30day');
                          // location.href = 'download?show=30day';
                        }else{
                          this.$router.push('download?show=fail');
                          this.$router.push('download?show=fail');
                        }
                    },
                    res => {}
                );
            },
        }
    }
</script>

<style scoped lang="scss">
    $sc:25;
    .register{
        width:100%;
        height:100%;
        overflow: hidden;
        background:#fff;
        .banner{
            width:100%;
            img{
                width:100%;
            }
        }
        .input{
            .phoneNumber{
                border:2px solid #DDE0E9;
                border-radius:40/$sc+rem;
                margin:0 auto;
                margin-top:20/$sc+rem;
                display: block;
                width:70%;
                height:40/$sc+rem;
                background:#f4f4f4;
                margin-bottom:20/$sc+rem;
                text-indent: 10%;
                font-size:14/$sc+rem;
                outline: none;
                box-sizing: border-box;
                -webkit-appearance: none;
            }
           div{
                box-sizing: border-box;
                position:relative;
                clear: both;
                width: 70%;
                height:40/$sc+rem;
                border:2px solid #DDE0E9;
                border-radius:40/$sc+rem;
                margin:0 auto;
                background:#f4f4f4;
                margin-bottom:20/$sc+rem;
                .yzm{
                    box-sizing: border-box;
                    border:none;
                    width:100%;
                    height:100%;
                    float: left;
                    background:#f4f4f4;
                    text-indent: 10%;
                    outline: none;
                    font-size:14/$sc+rem;
                    border-radius:40/$sc+rem;
                    -webkit-appearance: none;
                }
                span{
                    position:absolute;
                    right:0;
                    top:0;
                    text-align: center;
                    line-height:38/$sc+rem;
                    display:block;
                    box-sizing: border-box;
                    float: left;
                    border:none;
                    width:40%;
                    height:100%;
                    border-radius:40/$sc+rem;
                    outline: none;
                    color:#fff;
                    font-weight:400;
                    background:#067FFF;
                    font-size:14/$sc+rem;
                }
            }
            .btn{
                border:2px solid #DDE0E9;
                border-radius:40/$sc+rem;
                margin:0 auto;
                margin-top:20/$sc+rem;
                display: block;
                width:70%;
                height:40/$sc+rem;
                margin-bottom:20/$sc+rem;
                font-size:14/$sc+rem;
                outline: none;
                box-sizing: border-box;
                background:#067FFF;
                color:#fff;
            }

        }
        .rule{
            clear:both;
            p{
                width:80%;
                margin:0 auto;
                text-align: center;
                font-size:14/$sc+rem;
                color:#ccc;
                margin-bottom:10/$sc+rem;
            }
        }
        .footer{
            margin-top:50/$sc+rem;
            width:100%;
            img:nth-child(1){
                display:block;
                margin:0 auto;
                width:30%;
                margin-bottom:10/$sc+rem;
            }
            img:nth-child(2){
                display: block;
                width:100%;
            }
        }
        .popup{
            position: absolute;
            left:50%;
            top:60%;
            margin-left: -35%;
            background:rgba(0,0,0,.5);
            width:75%;
            height:40px;
            margin-top:50/$sc+rem;
            text-align:center;
            line-height:40px;
            border-radius:20/$sc+rem;
            font-size:14/$sc+rem;
            color:#fff;
        }
    }
</style>
