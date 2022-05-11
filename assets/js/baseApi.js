$(function () {
  // 在发送ajax请求前ajax会自动调用方法ajaxPrefilter
  $.ajaxPrefilter(function (option) {
    // 原来的option.url = api/login
    option.url = "http://www.liulongbin.top:3007/" + option.url;
  });
});
