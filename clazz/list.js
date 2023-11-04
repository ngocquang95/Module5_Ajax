function selectOptionClazz(htmlId, classId) {
    $.ajax({
        type: "GET", // Sử dụng phương thức GET để yêu cầu dữ liệu từ server.
        url: "http://localhost:8080/clazzes", // Đây là địa chỉ của API hoặc trang web bạn muốn tương tác.
        success: function (clazzes) {
          //200-299
          let contentSelect = `<select  class="form-select" id="classIdSelect">
          <option value="">Chọn lớp</option>`;
    
          clazzes.forEach((clazz) => {
            contentSelect += `
            <option value="${clazz.id}" ${clazz.id == classId ? 'selected' : ''}>${clazz.name}</option>
            `;
          });

          contentSelect += '</select>'
    
          $(htmlId).html(contentSelect);
        },
        error: function (error) {
          //!= 200-299
        },
      });
}