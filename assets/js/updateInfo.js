$(function () {
  // 调用函数
  getUserInfo();
  //   提交修改按钮事件
  $(".updateUserForm").on("submit", (e) => {
    // 阻止表单默认提交
    e.preventDefault();
    // 修改用户信息
    console.log(userid + "ididiid");
    updateUserInfo();
    getUserInfo();
  });
});

let userid;
//
// 获取user信息函数
const getUserInfo = () => {
  $.ajax({
    type: "get",
    url: "my/userinfo",
    success: (res) => {
      console.log(res + "ccv");
      userid = res.data.id;
      initUserInfo(res.data);
    },
  });
};
// 初始化input框内容
const initUserInfo = (info) => {
  $(".updateUserForm [name=username]").val(info.username);
  if (info.nickname != "") {
    $(".updateUserForm [name=nickname]").val(info.nickname);
  }
  if (info.email != "") {
    $(".updateUserForm [name=email]").val(info.email);
  }
};
// 修改函数
const updateUserInfo = () => {
  let data = {
    id: userid,
    nickname: $(".updateUserForm [name=nickname]").val(),
    email: $(".updateUserForm [name=email]").val(),
  };
  $.ajax({
    type: "post",
    url: "my/userinfo",
    data,
    success: (res) => {
      console.log(res + "updateuser");
      if (res.status != 0) {
        return layui.layer.msg(res.message);
      }
      layui.layer.msg("修改信息成功！");
      //   调用index页面的方法，更新修改后的信息
      window.parent.getUserInfo();
    },
  });
};
