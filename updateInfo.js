
function updateInfo() {
    console.log("function called")
    var xhr = new XMLHttpRequest();
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
        xhr.open('POST', 'http://localhost:5001/flowing-gasket-304917/us-central1/updateInfo');
    }
    else {
        xhr.open('POST', 'http://localhost:5001/flowing-gasket-304917/us-central1/updateInfo');
    }

    xhr.setRequestHeader("Content-type", "application/json");
    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log("ok");
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        }
    };
     var userNow = firebase.auth().currentUser;
    // userNow.updateProfile({ //not working
    //         photoURL: document.getElementById("updateProPic"),
    //         displayName: document.getElementById('firstName').value + " " + document.getElementById('surname').value
    //
    //     }).then(function() {
    //         var displayName = userNow.displayName;
    //         var photoURL = userNow.photoURL;
    //          alert("het");
    //         alert(photoURL);
    //
    //         firebase.storage().ref('users/' + userNow.uid + '/profile.jpg').put(file).then(function () {
    //             console.log("success");
    //             alert("images!");
    //         }).catch(error => {
    //             console.log(error.message);
    //         })
    //         alert(displayName);
    //     }, function(error) {
    //
    //     });

    var userID = getCookie('uid');
    var storage = firebase.storage();
    var pathRef = storage.ref('users/' + userID + '/profile.jpg');
    xhr.send(JSON.stringify(
        {
            "firstName": document.getElementById('firstName').value,
            "surname": document.getElementById('surname').value,
            "age" : document.getElementById('age').value,
            "bio" : document.getElementById('bio').value,
            "uid" : getCookie('uid'),

        }
    ));
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let file = {};

function chooseFile(e) {
    file = e.target.files[0];
}


