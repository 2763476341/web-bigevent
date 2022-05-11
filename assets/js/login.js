$(function () {
  // 点击“去注册账号”的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击“去登录”的链接
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  //   自定义表单正则
  //   先获得layui表单
  let form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (val) => {
      // val参数表示repwd的值
      //   获取密码框的值
      let pwd = $(".reg-box [name = password]").val();
      if (pwd != val) {
        return "两次密码不一致";
      }
    },
  });

  //   layui的提示框
  //   注册功能
  let layer = layui.layer;
  $("#form_reg").on("submit", (e) => {
    e.preventDefault();
    let data = {
      username: $("#form_reg [name = username]").val(),
      password: $("#form_reg [name = password]").val(),
    };
    $.ajax({
      type: "post",
      url: "api/reguser",
      data: data,
      success: (res) => {
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录");
        // 注册成功跳转到登录页面
        $("#link_login").click();
      },
    });
  });

  //   登录
  $("#form_login").on("submit", (e) => {
    e.preventDefault();
    let data = {
      username: $("#form_login [name = username]").val(),
      password: $("#form_login [name = password]").val(),
    };
    $.ajax({
      type: "post",
      url: "api/login",
      data: data,
      success: (res) => {
        if (res.status != 0) {
          return layer.msg(res.message);
        }
        layer.msg("登录成功!");
        // 存储登录成功后的token
        localStorage.setItem("token", res.token);
        // 登录成功跳转到后台主页
        location.href = "./index.html";
      },
    });
  });
});
