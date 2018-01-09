$(document).ready(function() {
    console.log("inside document.ready");
    $('#signupModal').modal('show');

    $("#signupButton").on("click", function(event) {
        // Getting references to our form and inputs
        console.log("inside submit click");
        var signupForm = $("form#signup");
        // console.log(signupForm);
        var userNameInput = $("#user_name");
        // console.log(userNameInput);
        var passwordInput = $("#password");
        // console.log(passwordInput);
        var roleInput = $("#role");
        // console.log(roleInput);

        // When the form is submitted, we validate there's an user_name and password entered

        event.preventDefault();
        var userData = {
            user_name: userNameInput.val().trim(),
            password: passwordInput.val().trim(),
            role: roleInput.val().trim(),
        };

        console.log(userData);

        // if (!userData.user_name || !userData.password || !userData.role) {
        //   console.log("in err");
        //     return;
        // }
        // If we have an user_name and password, run the signUpUser function
        console.log("calling signUpUser");
        signUpUser(userData.user_name, userData.password, userData.role);

        userNameInput.val("");
        passwordInput.val("");
        roleInput.val(" ");


    });

    // Does a post to the signup route. If succesful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(user_name, password, role) {
      console.log('test')

      if (user_name === "lucky" && password === "12345" && role === "admin"){

       $.post("/api/signup", {
            user_name: user_name,
            password: password,
            role: role,
        }).then(function(data) {
            window.location.replace(data);
            // If there's an error, handle it by throwing up a boostrap alert
        }) } else {
          alert("you are not the administrator")
        }
    }
});
