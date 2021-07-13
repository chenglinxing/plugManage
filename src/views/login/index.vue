<template>
  <div class="login-index">
    <div class="dowebok" :class="{ 's--signup': isToggleView }">
      <div class="form sign-in">
        <h2>欢迎回来</h2>
        <!-- <label>
          <span>用户名</span>
          <input type="email" v-model="loginForm.userName" />
        </label>
        <label>
          <span>密码</span>
          <input type="password" v-model="loginForm.userPassword" />
          <span class="focus-input100"></span>
        </label> -->
        <el-form
          :model="loginForm"
          ref="loginForm"
          size="mini"
          label-position="top"
        >
          <el-form-item
            label="用户名"
            :rules="{ required: true, message: '用户名不能为空' }"
            prop="userName"
          >
            <el-input
              v-model="loginForm.userName"
              @change="loginIn('loginForm')"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="密码"
            :rules="{ required: true, message: '用户密码不能为空' }"
            prop="userPassword"
          >
            <el-input
              v-model="loginForm.userPassword"
              @change="loginIn('loginForm')"
            ></el-input>
          </el-form-item>
        </el-form>
        <p class="forgot-pass"><a href="javascript:">忘记密码？</a></p>
        <el-button type="primary" class="submit" @click="loginIn('loginForm')"
          >登 录</el-button
        >
      </div>
      <div class="sub-cont">
        <div class="img">
          <div class="img__text m--up">
            <h2>还未注册？</h2>
            <p>立即注册，发现大量机会！</p>
          </div>
          <div class="img__text m--in">
            <h2>已有帐号？</h2>
            <p>有帐号就登录吧，好久不见了！</p>
          </div>
          <div class="img__btn" @click="toggleView">
            <span class="m--up">注 册</span>
            <span class="m--in">登 录</span>
          </div>
        </div>
        <div class="form sign-up">
          <h2>立即注册</h2>
          <el-form
            :model="registerForm"
            ref="registerForm"
            size="mini"
            label-position="top"
          >
            <el-form-item
              label="用户名"
              :rules="[
                { required: true, message: '用户名不能为空', trigger: 'blur' },
                { message: '用户名的长度必须大于3' },
              ]"
              prop="userName"
            >
              <el-input v-model="registerForm.userName" clearable></el-input>
            </el-form-item>

            <el-form-item
              label="密码"
              :rules="[{ required: true, message: '密码不能为空' }]"
              prop="userPassword"
            >
              <el-input
                show-password
                v-model="registerForm.userPassword"
                clearable
              ></el-input>
            </el-form-item>

            <el-form-item
              label="邮箱"
              :rules="[
                { required: true, message: '邮箱不能为空', trigger: 'blur' },
                {
                  type: 'email',
                  message: '邮箱格式错误',
                  trigger: ['blur', 'change'],
                },
              ]"
              prop="userEmail"
            >
              <el-input
                v-model="registerForm.userEmail"
                clearable
                placeholder="xx@xx"
              ></el-input>
            </el-form-item>

            <el-form-item label="账户类型" prop="userRights">
              <el-select v-model="registerForm.userRights">
                <el-option
                  v-for="(item, index) in rightsList"
                  :key="index"
                  :label="item.label"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-button class="submit" @click="registerIn('registerForm')">
            注 册
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable */
import throttle from "lodash.throttle";
import { userRegister, userLoginIn } from "@api/index.js";
import { test } from "../../utils/lodash.js";
export default {
  data() {
    return {
      routh: "",
      isToggleView: false,
      loginForm: {
        userName: "",
        userPassword: "",
        // status: "login",
      }, //登录的form表单
      registerForm: {
        userName: "",
        userPassword: "",
        userEmail: "",
        lastLoginTime: "",
        userRights: 3, //默认账户类型为普通用户
        // status: "register",
      }, //注册的form表单
      rightsList: [
        { key: 2, label: "管理员" },
        { key: 3, label: "普通用户" },
      ],
    };
  },

  methods: {
    /**登录 */
    loginIn: throttle(function (formName) {
      console.log(formName, "formName");
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const data = await userLoginIn(this.loginForm);
            console.log(data);
            if (data.code == 200) {
              //清除表单
              this.$refs[formName].resetFields();
              //提示
              this.$message.success(data.msg);

              //登录成功后存用户名
              localStorage.setItem("userName", data.data[0].userName);
              //存userId
              // this.$store.commit("getUserId", data.data[0].userId);
              localStorage.setItem("userId", data.data[0].userId);
              //修改登录状态
              this.$store.commit("getLoginStatus", true);
              //存取用户信息
              this.$store.commit("getUserInfo", data.data[0]);
              //跳转首页
              this.$router.push("/home");
            } else {
              this.$message.error(data.msg);
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          this.$message.error("用户名或密码不能为空！");
          return false;
        }
      });
    }, 2000),

    /**注册 */
    registerIn: throttle(function (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = await userRegister(this.registerForm);
          if (data.code == 200) {
            //清除表单
            this.$refs[formName].resetFields();
            //提示
            this.$message.success(data.msg);
            //切换登录页面
            this.toggleView();
          } else if (data.code == 201) {
            this.$message.info(data.msg);
          } else {
            this.$message.error(data.msg);
          }
        } else {
          this.$message.error("用户名、密码或邮箱不能为空！");
          return false;
        }
      });
    }, 2000),

    /**登录注册切换 */
    toggleView() {
      this.isToggleView = !this.isToggleView;
    },
  },
  // 1.C 2.C 3.C 4.D 5.C   6.ABC 7.C 8.A 9.B 10.D
  /**
   * 1.未销毁定时器 会影响性能，其次将定时器写在created中，会影响页面的挂载，也就是页面渲染
   *
   * 2.ts在js的基础上做了更多让开发更便捷且可维护性高的操作，例如变量声明类型、添加类的、模型等，更利于重构
   *
   * 3. 渐进式就是分层。在vue全家桶中通过vuex、vue-router等搭建一个完整的框架，且这些功能相互独立，可以在此基础上任意使用其他组件，恰好体现出vue的核心理念：视图模板引擎
   *
   * 4.合理使用防抖节流及本地缓存、图片过多或table请求数据过长等可以考虑懒加载、减少http请求次数
   *
   * 5.优点：单页面相对于传统的多页面，局部刷新就是最大的优点， 不会刷新整个页面从而添加服务器压力，通过组件化思想可以减少冗余代码
   *   缺点：不利于seo优化，页面复杂度提高、初次加载耗时多
   *
   *
   * 6. let arr=[{"name":1,"age":1},{"name":2,"age":2},{"name":1,"age":1}] //测试数组
   *    let res=[],newArr=[]
   *    for(let i=0;i<arr.length;i++){
   *      if(newArr.indexOf(JSON.stringify(arr[i]))===-1){
   *        res.push(arr[i])
   *        newArr.push(JSON.stringify(arr[i]))
   *      }
   *    }
   *
   *
   * 7.let showNum = (function(){
   *    let num = 1
   *    return function(){
   *      console.log('num:'+num)
   *    }
   * })()
   *
   * showNum() // num:1
   * 闭包就是A函数内部的B函数调用了A函数的变量
   * 优点：让变量有独立的块级作用域，变量可以长期存在、可以避免全局变量的污染
   * 缺点：闭包会使函数中的变量被保存在内存中，内存消耗大，所以不能滥用闭包，会引起性能问题，甚至内存泄漏
   *
   */
  created() {
    console.log(this.$route.path);
    test()
  },
};
</script>

<style lang="scss" scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  background: #ededed;
}

input,
button {
  border: none;
  outline: none;
  background: none;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}

.tip {
  font-size: 20px;
  margin: 40px auto 50px;
  text-align: center;
}

.dowebok {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 900px;
  height: 550px;
  margin: -300px 0 0 -450px;
  background: #fff;
}

.form {
  position: relative;
  width: 640px;
  height: 100%;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
  padding: 50px 30px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.dowebok.s--signup .sub-cont {
  -webkit-transform: translate3d(-640px, 0, 0);
  transform: translate3d(-640px, 0, 0);
}

button {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}

.img:before {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  background-image: url("../../assets/images/bg.jpg");
  background-size: cover;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.dowebok.s--signup .img:before {
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.img__text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out;
}

.img__text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}

.img__text p {
  font-size: 14px;
  line-height: 1.5;
}

.dowebok.s--signup .img__text.m--up {
  -webkit-transform: translateX(520px);
  transform: translateX(520px);
}
.img__text.m--in {
  -webkit-transform: translateX(-520px);
  transform: translateX(-520px);
}

.dowebok.s--signup .img__text.m--in {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.img__btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}
.img__btn:after {
  content: "";
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img__btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: -webkit-transform 0.6s;
  transition: transform 0.6s;
  transition: transform 0.6s, -webkit-transform 0.6s;
}

.img__btn span.m--in {
  -webkit-transform: translateY(-72px);
  transform: translateY(-72px);
}

.dowebok.s--signup .img__btn span.m--in {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.dowebok.s--signup .img__btn span.m--up {
  -webkit-transform: translateY(72px);
  transform: translateY(72px);
}

h2 {
  width: 100%;
  font-size: 26px;
  text-align: center;
}

label {
  display: block;
  width: 260px;
  margin: 25px auto 0;
  text-align: center;
}

label span {
  font-size: 12px;
  color: #909399;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 5px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  text-align: center;
}

.input-jur {
  border-bottom: 1px solid red;
}

.span-jur {
  color: red;
}

.forgot-pass {
  margin-top: 15px;
  text-align: center;
  font-size: 12px;
  color: #cfcfcf;
}

.forgot-pass a {
  color: #cfcfcf;
}

.submit {
  margin-top: 40px;
  margin-bottom: 20px;
  background: #d4af7a;
  text-transform: uppercase;
}

.fb-btn {
  border: 2px solid #d3dae9;
  color: #8fa1c7;
}
.fb-btn span {
  font-weight: bold;
  color: #455a81;
}

.sign-in {
  transition-timing-function: ease-out;
}
.dowebok.s--signup .sign-in {
  transition-timing-function: ease-in-out;
  transition-duration: 0.6s;
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.sign-up {
  -webkit-transform: translate3d(-900px, 0, 0);
  transform: translate3d(-900px, 0, 0);
}
.dowebok.s--signup .sign-up {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>