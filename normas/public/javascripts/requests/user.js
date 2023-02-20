$(document).ready(function () {
  $("#user").autocomplete({
    source: function (request, response) {
      // Fetch data
      $.ajax({
        url: "/account",
        type: "get",
        dataType: "json",
        data: {
          resp: "json",
          search: request.term,
        },
        success: function (data) {
          response(data);
        },
        error: function (data) {},
      });
    },
    select: function (event, ui) {
      // Set selection
      $("#user").val(ui.item.label); // display the selected text
      $("#user_id").val(ui.item.value); // save selected id to input
      return false;
    },
  });

  $(".last_name").on("keyup change", function (e) {
    // do stuff!
    let last_name = $(".last_name").val();
    let first_name = $(".first_name").val();
    var username = (first_name.split(" ")[0] + "" + last_name[0]).toLowerCase();

    $.ajax({
      url: "/account/"+username+"/username/",
      type: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      dataType: "json",
      success: function (data) {
        $("#username").val(data.username);
      },
      error: function (data) {
        console.log(data);
      },
    });
  });
});
