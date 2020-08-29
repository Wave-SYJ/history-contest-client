<template>
  <div class="login-container">
    <el-card class="login-card" shadow="never">
      <div slot="header" style="text-align: center">
        校史校情知识竞赛
      </div>

      <el-form ref="loginForm" label-width="0" :model="loginForm" :rules="loginRules">
        <!-- 用户名 -->
        <el-form-item>
          <el-input
            prefix-icon="el-icon-user"
            placeholder="账号"
            v-model="loginForm.sid"
          />
        </el-form-item>

        <!-- 密码 -->
        <el-form-item>
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="密码"
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="onSubmit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        sid: "JS219107",
        password: "213192947",
        code: "CODE"
      },
      loginRules: {
        sid: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ]
        //code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      redirect: ""
    };
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return;
        this.$store.dispatch("login", this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
        })
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background: #2b4b6b;
  height: 100%;
}

.login-card {
  max-width: 450px;
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
