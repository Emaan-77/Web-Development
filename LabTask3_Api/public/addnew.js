
$(document).ready(function() {
    $('#btnclick_addnew').click(function(event) {
        event.preventDefault();
  
        var msg = "";
        
        const getTitle = $('#title_addnew');
        const getGenre = $('#genre_addnew');
        const getAuthor = $('#author_addnew');
        const getPrice = $('#price_addnew');
  
        if (!getTitle.val()) {
            getTitle.addClass("error-style");
            msg += "Enter Title\n";
        } else {
            getTitle.removeClass("error-style");
        }
  
        if (!getGenre.val()) {
            getGenre.addClass("error-style");
            msg += "Enter Genre\n";
        }  else {
            getGenre.removeClass("error-style");
        }
  
        if (!getAuthor.val()) {
            getAuthor.addClass("error-style");
            msg += "Enter Author\n";
        } else {
            getAuthor.removeClass("error-style");
        }
  
        if (!getPrice.val()) {
            getPrice.addClass("error-style");
            msg += "Enter Price\n";
        } else {
            getPrice.removeClass("error-style");
        }
  
        if ( getTitle.val() && getGenre.val() && getAuthor.val() && getPrice.val()) {
            msg = "You have Submitted";
        }
        $('form').submit();
        alert(msg);
    });
  
    $('input, select, textarea').on('input', function() {
        $(this).removeClass('error-style');
    });
  });
  
  
  