import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;
var validate;

const getDBData = async (options) => {
	// console.log(options);
	if (options.reqType == "getCat") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getCat"
			}
			})
			.then(function (response) {
				addOptions(response.data, "category");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "submitFeedback") {
		var catSelected = document.getElementById("slctCat").value;
		var txtSubject = document.getElementById("txtSubject");
		var txtDescrip = document.getElementById("txtDiscrip");
		console.log(txtSubject.value);
		console.log(txtDescrip.value);

		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "submitfeedback",
				catId: catSelected,
				subject: txtSubject.value,
				description: txtDiscrip.value,
				fromEmail: loginProfile.getEmail()
			}
			})
			.then(function (response) {
				
			})
			.catch((err) => {
				throw new Error(err);
			});
			
		Swal.fire({
			title: 'Feedback submitted',
			text: 'Your feedback will be visible to everyone',
			icon: 'success',
			confirmButtonText: 'OK'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.replace("home.html");
			}
		});
	}else
	{
		alert("something went wrong");
	}
	// }
	// console.log(options.target.value);
};

const createCatOption = item => {
	const option = document.createElement('option');
	option.value = item.catId;
	option.appendChild(document.createTextNode(item.catDesc));
	return option;
};

const createSubcatOption = item => {
	const option = document.createElement('option');
	option.value = item.subcatId;
	option.appendChild(document.createTextNode(item.subcatDesc));
	return option;
};

const addOptions = (categoryList, selectType) => {
	// console.log(categoryList);
	if (selectType == "category") {
		const slctCat = document.getElementById("slctCat");

		if (Array.isArray(categoryList) && categoryList.length > 0) {
			categoryList.map(category => {
				slctCat.appendChild(createCatOption(category));
			});
		} else if (categoryList) {
			slctCat.appendChild(createCatOption(categoryList));
		}
	}
	else if (selectType == "subcategory") {
		const slctSubcat = document.getElementById("slctSubcat");
		document.getElementById('slctSubcat').innerHTML = '';

		if (Array.isArray(categoryList) && categoryList.length > 0) {
			categoryList.map(category => {
				slctSubcat.appendChild(createSubcatOption(category));
			});
			slctSubcat.appendChild(createSubcatOption({subcatDesc: "Other"}));
		} else if (categoryList) {
			slctSubcat.appendChild(createSubcatOption(categoryList.subcatDesc));
		}
	}
};



function checkforcat()
{
	var catSelected = document.getElementById("slctCat").value;
	if(catSelected==0)
	{
		return true;
	}else
	{
	return false;
	}
}

const validateData = () => {
	// Validation not complete
	var txtSubject = document.getElementById("txtSubject");
	var txtDescrip = document.getElementById("txtDiscrip");
	var check=checkforcat();
	if(check){
		alertify.error("please select category");
		// Swal.fire({
		// 	title: "oops!",
		// 	text: "Please Select Category",
		// 	icon: "error",
		//   });
	}
	else
	{
	var regex = /^[A-Za-z0-9. ,]+$/
		
	var discontent= regex.test(document.getElementById("txtSubject").value);
	var subcontent= regex.test(document.getElementById("txtDiscrip").value);

	
	if(txtSubject.value=="" || txtDescrip.value=="")
	{
		alertify.error("Hey! Don't leave blank");
		// console.log("heyyy blank");
		// Swal.fire({
		// 	title: "oops!",
		// 	text: "Hey! Don't leave Blank",
		// 	icon: "error",
		//   });
		validate=false;
	}else if (!discontent || !subcontent) {

		alertify.error("Special Characters are not allowed exept . and ,");
		// Swal.fire({
		// 	title: "oops!",
		// 	text: "Special Characters are not allowed exept . and ,",
		// 	icon: "error",
		//   });
	}
	else
	{
	console.log("heyyy heyy");
	getDBData({reqType: "submitFeedback"});
	validate=true;
	}
}
};

// const getSubcat = async () => {
// 	await getDBData({reqType: "getSubcat"});
// };

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
		document.getElementById("slctCat").reqType = "getSubcat";
		// document.getElementById("slctCat").addEventListener("change", getSubcat);
		document.getElementById("sign-out").addEventListener("click", signOut);
		document.getElementById("btnSubmit").addEventListener("click", validateData);
		getDBData({reqType: "getCat"});
		// await getDBData({reqType: "getFb"});
	}
	else {
		// Swal.fire({
		// 	title: 'Inactive login',
		// 	text: 'Please login to view this page',
		// 	icon: 'error',
		// 	confirmButtonText: `Save`
		// }).then((result) => {
		// 	if (result.isConfirmed) {
		// 		window.location.replace("login.html");
		// 	}
		// });
		window.location.replace("login.html?redirect=true");
	}
}

init();