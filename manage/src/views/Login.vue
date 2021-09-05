<template>
  <div class="login-wrapper">
    <div class="form-body">
      <!-- 此时绑定数据用于存储数据和校验规则:model="user" -->
      <!-- ref提供了一个操作原生DOM的一个具点，el-form提供了一个校验方法validate -->
      <el-form :model="user" status-icon :rules="rules" ref="userForm"> 
        <div class="title">地球</div>
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <!-- 此处的绑定用于校验，比如此时绑定的user.userName -->
          <el-input type="text" prefix-icon="el-icon-user" v-model="user.userName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="userPwd">
          <el-input type="password" prefix-icon="el-icon-view" v-model="user.userPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" id="btn-primary" style="width:100%" @click="login">提交</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      user:{
        userName:'',
        userPwd:''
      },
      rules:{
        userName:[{
          required:true,message:"请输入用户名",trigger:"blur"
        }],
        userPwd:[{
          required:true,message:"请输入密码",trigger:"blur"
        }]
      }
    }
  },
  methods: {
    login(){
      // el-form提供了一个校验方法validate
      // console.log(this.$refs.userForm);
      this.$refs.userForm.validate(valid=>{
        if(valid){
          
          this.$api.login(this.user).then(res=>{
            this.$store.commit("saveUserInfo",res);
            this.$router.push('/welcome');
          })
        }else{
          return false
        }
      })
    },
    goHome(){
      this.$router.push('/welcome');
    }
  }
};
</script>

<style lang='scss'>
.login-wrapper{
  display:flex;
  justify-content: center;
  align-items: center;
  background: #f9fcff;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  .form-body{
    width:500px;
    padding: 50px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 3px #c7c9cb4d;

    .title{
    text-align: center;
    font-size: 50px;
    line-height: 50px;
    padding-bottom: 30px;
    // font-weight: bolder;

  }
  }
}
</style>
