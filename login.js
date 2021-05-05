
function login() {
    let email = document.getElementById('emailHolder').value;

    let password = document.getElementById('pwordHolder').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            alert("signed in");
            var user = userCredential.user;
            console.log(user);
            document.cookie = "accessToken=" + user.za;
            document.cookie = "uid=" + user.uid;
            window.location.href = "/updateInfo.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode);
        });



}
