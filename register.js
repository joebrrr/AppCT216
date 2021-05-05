

function signUp() {
    alert("got here");
    let email = document.getElementById('emailHolder').value
    let password = document.getElementById('pwordHolder').value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert("inside!");

            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;

            window.location.href = "/updateInfo.html";
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });

}




