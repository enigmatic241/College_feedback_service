import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;


var userChanged = function (user) {
	// Check if user is logged in
	var profile = user.getBasicProfile();
	console.log(profile);
	if (profile) {
		loginStatus = true;
	}
	loginProfile = profile;
	initGUI();
};

function signOut() {
	console.log("signout");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
		console.log('User signed out.');
		loginStatus = false;
		window.location.replace("login.html?signout=true");
    });
}

const init = () => {
	var auth2;
	gapi.load('auth2', function(){
		auth2 = gapi.auth2.init({
			client_id: '75701767404-m5ba2b22tne027448ia86dogn3v95r5v.apps.googleusercontent.com'
		});
		auth2.currentUser.listen(userChanged);
	});
};

const initGUI = () => {
	console.log(loginStatus);
	if (loginStatus) {
		document.getElementById("sign-out").addEventListener("click", signOut);
		// getDBData({reqType: "getCatRole"});
	}
	else {
		window.location.replace("login.html?redirect=true");
	}
}

init();