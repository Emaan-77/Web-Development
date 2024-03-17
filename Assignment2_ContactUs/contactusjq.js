
$(document).ready(function() {
  $('#btnclick').click(function(event) {
      event.preventDefault();

      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var msg = "";
      
      const getName = $('#name');
      const getMail = $('#email');
      const getGender = $('#gender');
      const getMessage = $('#message');

      if (!getName.val()) {
          getName.addClass("error-style");
          msg += "Enter your name\n";
      } else {
          getName.removeClass("error-style");
      }

      if (!getMail.val()) {
          getMail.addClass("error-style");
          msg += "Enter email\n";
      } else if (!pattern.test(getMail.val())) {
          getMail.addClass("error-style");
          msg += "Invalid email address\n";
      } else {
          getMail.removeClass("error-style");
      }

      if (!getGender.val()) {
          getGender.addClass("error-style");
          msg += "Select option\n";
      } else {
          getGender.removeClass("error-style");
      }

      if (!getMessage.val()) {
          getMessage.addClass("error-style");
          msg += "Enter your message\n";
      } else {
          getMessage.removeClass("error-style");
      }

      if (getMessage.val() && getName.val() && getGender.val() && pattern.test(getMail.val()) && getMail.val()) {
          msg = "You have Submitted";
          getMail.removeClass("error-style");
      }

      alert(msg);
  });

  $('input, select, textarea').on('input', function() {
      $(this).removeClass('error-style');
  });
});

