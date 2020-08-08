function setCookie(name, value) {
    var date = new Date();
    var l = ";samesite=strict";
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + value + ";" + "expires=" + date.toUTCString() + l + ";path=/";
  }
  
  function getCookie(cookieName) {
    cookieName += "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    console.log(cookieName);
    console.log(cookieArray);
    console.log(cookieArray[0].indexOf(cookieName));
    for (var i = 0; i < cookieArray.length; i++) {
      var cookiePair = cookieArray[i];
      while (cookiePair.charAt(0) == " ") {
        cookiePair = cookiePair.substring(1);
      }
      if (cookiePair.indexOf(cookieName) == 0) {
        return cookiePair.substring(cookieName.length, cookiePair.length);
      }
    }
    return "";
  }
  function deleteCookie() {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  function firebaseSignIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
  
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
          $(".loading").css("display", "none");
          return;
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }
  function logout() {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          location.reload();
          console.log("Signed Out");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
    deleteCookie();
  }