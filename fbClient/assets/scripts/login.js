var googleUser = {};

var userChanged = function (user) {
	// Check if user is logged in
	var profile = user.getBasicProfile();
	console.log(profile);
	if (profile) {
		window.location.replace("home.html");
	}
};

var startApp = function() {
	// console.log("hey, hey");
	const params = new URLSearchParams(document.location.search);
	console.log(params.get("redirect"));
	if (params.get("redirect")) {
		alertify.error("Please login to view the portal");
	}

	gapi.load('auth2', function(){
		// Retrieve the singleton for the GoogleAuth library and set up the client.
		auth2 = gapi.auth2.init({
			client_id: '75701767404-m5ba2b22tne027448ia86dogn3v95r5v.apps.googleusercontent.com',
			cookiepolicy: 'single_host_origin',
			hd: 'iiitl.ac.in',
			redirect_uri: 'localhost:3000/home.html'
		});
		auth2.currentUser.listen(userChanged);
		attachSignin(document.getElementById('customBtn'));
	});
};

function attachSignin(element) {
	// console.log(element);
	auth2.attachClickHandler(element, {},
		function(googleUser) {ddd
			// console.log(googleUser);
			window.location.replace("home.html");
			// document.getElementById('name').innerText = "Signed in: " + googleUser.getBasicProfile().getName();
		}, function(Err) {
			// alert(JSON.stringify(Err.error, undefined, 2));
		});
}

startApp();