$(function () {
  // 在发送ajax请求前ajax会自动调用方法ajaxPrefilter
  $.ajaxPrefilter(function (option) {
    // 原来的option.url = api/login
    option.url = "http://www.liulongbin.top:3007/" + option.url;

    // 为有权限的接口设置统一headers
    // 如果请求地址中包含/my/路径，需要加上请求头
    if (option.url.indexOf("/my/") != -1) {
      option.headers = { Authorization: localStorage.getItem("token") };
    }

    //   用户不能在浏览器直接访问后台首页index，得先登录
    option.complete = (res) => {
      res = res.responseJSON;
      console.log(res);
      if (res.status != 0 && res.message == "身份认证失败！") {
        location.href = "/login.html";
        localStorage.removeItem("token");
      }
    };
  });
});
