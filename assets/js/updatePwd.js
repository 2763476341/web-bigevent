$(function () {
  layui.form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (val) => {
      // val参数表示repwd的值
      //   获取密码框的值
      let pwd = $(".updatePwdForm [name = newPwd]").val();
      if (pwd != val) {
        return "两次密码不一致";
      }
    },
  });
  $(".updatePwdForm").on("submit", (e) => {
    e.preventDefault();
    layui.layer.confirm(
      "确认修改密码吗?",
      { icon: 3, title: "提示" },
      function (index) {
        layui.layer.close(index);
        $.ajax({
          type: "POST",
          url: "my/updatepwd",
          data: {
            oldPwd: $(".updatePwdForm [name = oldPwd]").val(),
            newPwd: $(".updatePwdForm [name = newPwd]").val(),
          },
          success: (res) => {
            // console.log(res);
            if (res.status != 0) {
              return layui.layer.msg(res.message);
            }
            layui.layer.msg(res.message);
            // 清空表单
            $(".updatePwdForm")[0].reset();
          },
        });
      }
    );
  });
});
