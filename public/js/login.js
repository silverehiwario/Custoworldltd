$(document).ready(function(){
  console.log("inside document.ready");
  $('#LoginModal').modal('show');

  $("#loginButton").on("click", function(event) {
        // Getting references to our form and inputs
        console.log("inside submit click");
        var loginForm = $("form#Login");
        console.log(loginForm);
        var userNameInput = $("#user_name");
        console.log(userNameInput);
        var passwordInput = $("#password");
        console.log(passwordInput);

      // When the form is submitted, we validate there's an email and password entered

        event.preventDefault();
        var userData = {
            user_name: userNameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.user_name || !userData.password)
        {
          return;
        }

        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.user_name, userData.password);
        userNameInput.val("");
        passwordInput.val("");

    });

      // loginUser does a post to our "api/login" route and if successful, redirects us the the admin page
      function loginUser(user_name, password) {
        $.post("/api/login", {
          user_name: user_name,
          password: password
        }).then(function(data) {

          window.location.replace(data);
                // If there's an error, log the error
        }).catch(function(err) {
          console.log(err);
          alert("signup")
          location.reload();
        });
      };

});
