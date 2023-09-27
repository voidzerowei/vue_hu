<template>
  <div class="father">
    <el-card class="login-card">
      <h2 class="mb30">登录</h2>
      <el-form
        label-position="right"
        label-width="80px"
        :model="formItem"
        ref="formItem"
        :rules="rules"
        size="large"
        class="login"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model.trim="formItem.phone"
            placeholder="请输入手机号"
            maxlength="11"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="formItem.password"
            show-password
            placeholder="请输入密码"
            clearable
            @keyup.enter="login"
          />
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="primary"
          class="m20 w300 pos_center"
          size="large"
          @click="login"
        >
          登录
        </el-button>
      </div>
      <div>
        <el-button link>忘记密码</el-button>
        <el-button link @click="toRegister">注册新账号</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      const reg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[2567]|7[013-8]|8\d|9\d)\d{8}$/;
      if (value) {
        if (reg.test(value)) {
          return callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      } else {
        return callback(new Error("请输入手机号"));
      }
    };
    const checkPassword = (rule, value, callback) => {
      if (value) {
        return callback();
      } else {
        return callback(new Error("请输入密码"));
      }
    };
    return {
      formItem: {
        phone: "",
        password: "",
      },
      rules: {
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
      },
      isRegister: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
:deep(.el-input--large .el-input__wrapper) {
  background: rgba(255, 255, 255, 0.5);
}

:deep(.el-button--large) {
  opacity: 0.9;
}
.father {
  position: relative;
}
.login-card {
  width: 450px;
  margin-top: 200px;
  text-align: center;
  box-shadow: -10px 20px 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.85);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login {
  width: 300px;
  display: inline-block;
}
</style>
