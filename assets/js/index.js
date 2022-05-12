$(function () {
  getUserInfo();
  //   点击退出，退到登录页面
  $(".quit").on("click", () => {
    layui.layer.confirm(
      "确认退出系统吗?",
      { icon: 3, title: "提示" },
      function (index) {
        layui.layer.close(index);
        // 点击确认按钮时，需清空localstorage缓存
        localStorage.removeItem("token");
        location.href = "login.html";
      }
    );
  });
});
// 获取用户信息函数
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "my/userinfo",
    success: (res) => {
      if (res.status != 0) {
        return "用户信息获取失败";
      }
      renderUserInfo(res.data);
    },
  });
}

// 渲染用户信息函数
const renderUserInfo = (user) => {
  let name = user.nickname || user.username;
  $(".username").html(name);
  if (user.user_pic == null) {
    $(".nouser").css("display", "inline-block");
    $(".nouser").html(name[0].toUpperCase());
    $(".layui-nav-img").hide();
  } else {
    $(".nouser").css("display", "none");
    $(".layui-nav-img").prop("src", user.user_pic).show();
  }
};
