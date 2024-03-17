
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


// function validateForm(event) {
//   event.preventDefault();
//   const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   var msg="";
//   const getmail=document.getElementById("email");
//   const getName = document.getElementById("name");
//   const getGender = document.getElementById("gender");
//   const getMessage = document.getElementById("message");

//        if (!getName.value) {
//         getName.classList.add("error-style");
//         msg= msg + "Enter your name\n";
//       } 
//       else {
//        getName.classList.remove("error-style");
//        }

//       if(!getmail.value){
//       getmail.classList.add("error-style");
//        msg=msg + "Enter email \n";
     
//       }
//       else
//       {
//       if(!pattern.test(getmail.value)){
//           getmail.classList.add("error-style");
//           msg=msg + "Invalid email address \n";
//        }
//       else {
//           getmail.classList.remove("error-style");
//       }
      
//       }

//       if(!getGender.value){
//         getGender.classList.add("error-style");
//        msg=msg +"Select option \n";
//       }  else {
//         getGender.classList.remove("error-style");
//     }
        
//       if (!getMessage.value) {
//         getMessage.classList.add("error-style");
//         msg =msg + "Enter your message\n";
//        } else {
//         getMessage.classList.remove("error-style");
//     }

//       if (getMessage.value &&  getName.value && getGender.value && pattern.test(getmail.value) && getmail.value){
//        msg="You have Submitted";
//        getmail.classList.remove("error-style");

//       }
     
//       alert(msg);
//   }

