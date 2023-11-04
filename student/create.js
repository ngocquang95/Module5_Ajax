$("#form-add-student").submit(function (event) {
  event.preventDefault(); // Không bị load lại trang
  // $('#form-add-student').s ubmit();
//   $("#error-score").text(""); //clear hết message lỗi
  $('[id^=error-]').text("");
  
  const name = $("#name").val();
  const score = $("#score").val();
  const classId = $("#classIdSelect").val();

  // Add vào list
  const student = {
    name: name,
    score: score,
    clazz: {
      id: classId,
    },
  };


  $.ajax({
    headers: {
        Accept: 'application/json', // Đặt kiểu dữ liệu được chấp nhận từ server là JSON.
        'Content-Type': 'application/json', // Đặt kiểu dữ liệu được gửi lên server là JSON.
    },
    type: 'POST', // Sử dụng phương thức POST để gửi dữ liệu lên server.
    data: JSON.stringify(student), // Chuyển đổi đối tượng 'student' thành chuỗi JSON để gửi lên server.
    url: 'http://localhost:8080/students', // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
    success: function () {
        display();
        $("#modalAddStudent").modal("hide");
        $(".toast").toast("show");
        // clear hết thông tin thẻ input
        $("input").val("");
    },
    error: function (error) {
        const messages = JSON.parse(error.responseText)
        messages.forEach(function(item){
            $(`#error-${item.filed.replace('.', '')}`).text(item.message)
        });
    }
});
});

$("#btn-create-student").click(function (event) {
  selectOptionClazz("#selectOptionCreate");
});
