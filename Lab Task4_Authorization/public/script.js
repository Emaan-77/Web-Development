


function validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var msg="";
    const getmail=document.getElementById("emailinput");
    const getform=document.getElementById("membershipOptions");
        if(!getmail.value){
        getmail.classList.add("error-style");
         msg=msg + "Enter email \n";
       
        }
        else
        {
        if(!pattern.test(getmail.value)){
            getmail.classList.add("error-style");
            msg=msg + "Invalid email address \n";
         

          }}

        if(!getform.value){
         msg=msg +"Select option";
        }  
        if(getform.value && pattern.test(getmail.value) && getmail.value){
         msg="You have Subscribed";
         getmail.classList.remove("error-style");

        }
       
        alert(msg);
    }

