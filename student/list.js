function display() {
  // Sử dụng ajax để lấy dữ liệu từ API
  $.ajax({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"), // Đính kèm token trong tiêu đề
    },
    type: "GET", // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
    url: "http://localhost:8080/students", // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.

    success: function (data) {
      //200-299
      const students = data.content;

      let contentBody = "";

      students.forEach((student, index) => {
        contentBody += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${student.clazz?.name || "Chưa có lớp"}</td>
            `;

        if (localStorage.getItem("roleList").includes("ADMIN")) {
          contentBody += `
              <td><button onclick="editStudent(${index})" data-bs-toggle="modal" data-bs-target="#modalEditStudent" type="button" class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button></td>
              <td><button type="button" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button></td>
              `;
        }
        contentBody += `
          </tr>
        `;
      });

      $("#list-student").html(contentBody);
    },
    error: function (error) {
      //!= 200-299
    },
  });
}
