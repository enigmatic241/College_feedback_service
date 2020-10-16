

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
		window.location.replace("login.html");
    });
}