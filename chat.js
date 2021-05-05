function StartChat(id)
{
    document.getElementById('chatPanel').removeAttribute('style');
    document.getElementById('divStart').setAttribute('style', 'display:none');
}
/////////////////////////////////////////
function showChatList()
{
    document.getElementById('side-1').classList.remove('d-none', 'd-md-block');
    document.getElementById('side-2').classList.add('d-none');

}
////////////////////////////////////////
function hideChatList()
{
    document.getElementById('side-1').classList.add('d-none', 'd-md-block');
    document.getElementById('side-2').classList.remove('d-none');

}
//////////////////////////////////////
function OnKeyDown()
{
    document.addEventListener('keydown', function (key)
    {
        if(key.which === 13)
        {
            SendMessage();
        }
    });
}

function SendMessage() {
    var text = document.getElementById('txtMessage').value;
    var message = "";
    message += "<div class=\"row justify-content-end\">";
    message+=  "<div class=\"col-6 col-sm-7 col-md-7\">"
    message += "<p class=\"sent  float-right\">"
    message += text;
    message += "<span class=\"time float-right\">1:28PM</span>"
    message += "</p>"
    message += "</div>"
    message += "<div class=\"col-2 col-sm-1 col-md-1 float-right\">"
    message += "<img src=\"images/pp.png\" class=\"chat-pic\"/>"
    message += "</div>"
    message += "</div>"
    document.getElementById('messages').innerHTML += message;
    document.getElementById('txtMessage').value = '';
    document.getElementById('txtMessage').focus();

    document.getElementById('messages').scrollTo(0, document.getElementById('messages').clientHeight);
}
//////////////////////////////////////////////////
function signIn()
{

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);

    //.then((userCredential) => {
    //             // Signed in
    //             alert("signed in");
    //             var user = userCredential.user;
    //             console.log(user);
    //             document.cookie = "accessToken=" + user.za;
    //             document.cookie = "uid=" + user.uid;
    //             window.location.href = "/updateInfo.html";
    //         })
    //         .catch((error) => {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             alert(errorCode);
    //         });

}

function signOut()
{
    firebase.auth().signOut();
}

function onFirebaseStateChanged()
{
    firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user)
{
    if (user) {

        document.getElementById('imgProfile').src = firebase.auth().currentUser.photoURL;
        document.getElementById('imgProfile').title = firebase.auth().currentUser.displayName;
    }
}

//// Call auth state changed
onFirebaseStateChanged();