function getUsers()
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5001/flowing-gasket-304917/us-central1/getusers');
// Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var sHTML = "";
                var data = JSON.parse(xhr.responseText);
                var firstName = document.getElementsByClassName("profile-name");
                var sname = document.getElementsByClassName("");
                var bio = document.getElementsByClassName("profile-bio");
                var age = document.getElementsByClassName("profile-age");

                for(var i=0; i<3; i++)
                {
                   var fullName = data[i].firstName + " " + data[i].surname + ", ";
                   firstName[i].innerHTML = fullName;
                   firstName[i].innerHTML += data[i].age;
                   bio[i].innerHTML = data[i].bio;

                }
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }}};
// Send the request to https://us-central1-my-cool-web-app37271.cloudfunctions.net/getcomments
    xhr.send(null);
}

function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5001/flowing-gasket-304917/us-central1/getusers');
// Track the state changes of the request.
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        var currUserId = firebase.auth().currentUser.uid;
        console.log(currUserId);
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                var data = JSON.parse(xhr.responseText);

                var name = document.getElementById("fullname");
                var bio = document.getElementById("about");
                //var proPic = document.getElementById("proPic");
                for(var i=0; i<data.length; i++)
                {
                    if(firebase.auth().currentUser.uid == data[i].uid){
                        
                        var fullName = data[i].firstName + " " + data[i].surname;
                        console.log(data[i].fname + " " + data[i].surname);
                        name.innerHTML = fullName;
                        bio.innerHTML = data[i].bio;
                        //alert(firebase.auth().currentUser.photoURL);
                        //document.getElementById("proPic").src = data[i].imageUrl;
                    }
                }

            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }}};
// Send the request to https://us-central1-my-cool-web-app37271.cloudfunctions.net/getcomments
    xhr.send(null);
}
