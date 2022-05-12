$(function () {
  let flag = false;
  $.ajax({
    type: "GET",
    url: "my/userinfo",
    success: (res) => {
      console.log(res + "piccc");
      if (res.status != 0) {
        return "用户头像获取失败";
      }
      $("#image").prop("src", res.data.user_pic);
      // 获取图片后再实现上传图片功能
      uploadpic();
    },
  });

  function uploadpic() {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $("#image");
    // 1.2 配置选项
    const options = {
      // 纵横比:裁剪框的宽高比
      aspectRatio: 1,
      // 指定预览区域
      preview: ".img-preview",
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);

    //   选择图片功能
    $(".chooseImg").on("click", function () {
      //   实现点击上传文件框事件
      $("#file").click();
      // input 添加change事件
      $("#file").on("change", function (e) {
        let fileList = e.target.files;
        if (fileList.length == 0) {
          return layui.layer.msg("请选择图片！");
        }
        // 1. 拿到用户选择的文件
        var file = e.target.files[0];
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
          .cropper("destroy") // 销毁旧的裁剪区域
          .attr("src", imgURL) // 重新设置图片路径
          .cropper(options); // 重新初始化裁剪区域
      });
    });
    $(".sure").on("click", function () {
      var dataURL = $image
        .cropper("getCroppedCanvas", {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100,
        })
        .toDataURL("image/png");
      console.log(dataURL);

      $.ajax({
        method: "POST",
        url: "my/update/avatar",
        data: {
          avatar: dataURL,
        },
        success: function (res) {
          console.log(res);
          if (res.status !== 0) {
            return layui.layer.msg("更换头像失败！");
          }
          layui.layer.msg("更换头像成功！");
          window.parent.getUserInfo();
        },
      });
    });
  }
});
