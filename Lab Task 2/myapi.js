
function displayStories() {
    $.ajax({
      url: "https://65f3d829105614e654a13f96.mockapi.io/customer/reviews",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var container = $("#review-container");
        container.empty();
  
        $.each(data, function (index,reviews) {
          container.append(
            `<div class="mb-3">
                  <h3 class="name-style">Name: ${reviews.name}</h3>
                  <div class="email-style"><b class="bold-style">Email:</b> ${reviews.email}</div>
                  <div class="review-style"><b class="bold-style">Review:</b> ${reviews.message}</div>
                  <div>
                      <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${reviews.id}">Edit</button>
                      <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${reviews.id}">Delete</button>
                  </div>
              </div>
              <hr />
              `
          );
        });
      },
      error: function (error) {
        console.error("Error fetching stories:", error);
      },
    });
  }

  function deleteStory() {
    let reviewId = $(this).attr("data-id");
    $.ajax({
      url: "https://65f3d829105614e654a13f96.mockapi.io/customer/reviews/" + reviewId,
      method: "DELETE",
      success: function () {
        displayStories(); 
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  function handleFormSubmission(event) {
    event.preventDefault();

    let reviewId = $("#createBtn").attr("data-id");
    var name = $("#createName").val();
    var email=$("#createEmail").val();
    var message = $("#createContent").val();
    if (reviewId) {
      $.ajax({
        url: "https://65f3d829105614e654a13f96.mockapi.io/customer/reviews/" + reviewId,
        method: "PUT",
  
        data: { name, message, email },
        success: function () {
          displayStories(); 
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    } else {
      $.ajax({
        url: "https://65f3d829105614e654a13f96.mockapi.io/customer/reviews",
        method: "POST",
        data: { name,email, message },
        success: function () {
          displayStories();
        },
        error: function (error) {
          console.error("Error creating story:", error);
        },
      });
    }
    document.getElementById("createForm").reset();

  }
  function editBtnClicked(event) {
    event.preventDefault();
    let reviewId = $(this).attr("data-id");
    $.ajax({
      url: "https://65f3d829105614e654a13f96.mockapi.io/customer/reviews/" + reviewId,
      method: "GET",
      success: function (data) {
        console.log(data);
        $("#clearBtn").show();
        $("#createName").val(data.name);
        $("#createEmail").val(data.email);
        $("#createContent").val(data.message);
        $("#createBtn").html("Update");
        $("#createBtn").attr("data-id", data.id);
      },
      error: function (error) {
        console.error("Error deleting story:", error);
      },
    });
  }
  $(document).ready(function () {
  
    displayStories();
    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editBtnClicked);

    $("#createForm").submit(handleFormSubmission);
    $("#clearBtn").on("click", function (e) {
      e.preventDefault();
      $("#clearBtn").hide();
      $("#createBtn").removeAttr("data-id");
      $("#createBtn").html("Create");
      $("#createName").val("");
      $("#createEmail").val("");
      $("#createContent").val("");
    });
  });