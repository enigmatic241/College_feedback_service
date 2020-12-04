import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;

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
	else if (options.reqType == "submitComplaint") {
		var catSelected = document.getElementById("slctCat").value;
		var subcatSelected = document.getElementById("slctSubcat").value;
		var txtHostel = document.getElementById("txtHostel");
		var txtFloor = document.getElementById("txtFloor");
		var txtRoom = document.getElementById("txtRoom");
		var txtDiscrip = document.getElementById("txtDiscrip");
		var description = "";
		if (txtHostel.value != "") description += "Hostel: " + txtHostel.value;
		if (txtFloor.value != "") description += "; Floor: " + txtFloor.value;
		if (txtRoom.value != "") description += "; Room: " + txtRoom.value;
		if (txtDiscrip.value != "") description += "; " + txtDiscrip.value;
		console.log(description);
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "submitcomplaint",
				catId: catSelected,
				subcatId: subcatSelected,
				description: description,
				fromEmail: loginProfile.getEmail()
			}
			})
			.then(function (response) {
				
			})
			.catch((err) => {
				throw new Error(err);
			});
		Swal.fire({
			title: 'Complaint submitted',
			text: 'Your complaint will be addressed in approx hrs',
			icon: 'success',
			confirmButtonText: 'OK'
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.replace("home.html");
			}
		});
	}
	else if (options.reqType == "getSubcat") {
		var catSelected = document.getElementById("slctCat").value;
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getSubcat",
				catId: catSelected
			}
			})
			.then(function (response) {
				addOptions(response.data, "subcategory");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
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
	var txtHostel = document.getElementById("txtHostel");
	var txtFloor = document.getElementById("txtFloor");
	var txtRoom = document.getElementById("txtRoom");
	var txtDiscrip = document.getElementById("txtDiscrip");
	
	var check=checkforcat();
	if(check){
		
		
		alertify.error("Ooops! Please Select Category");
	}
	else
	{

	var regex = /^[A-Za-z0-9. ,]+$/
	let isnum = /^\d+$/
	var Hostelcontent=isnum.test(document.getElementById("txtHostel").value);
	var Floorcontent=isnum.test(document.getElementById("txtFloor").value);
	var roomcontent= regex.test(document.getElementById("txtRoom").value);
	var discontent= regex.test(document.getElementById("txtDiscrip").value);

		
	if(txtRoom.value=="" || txtDiscrip.value=="")
	{
		
		alertify.error("Hey! Don't Leave Blank");

		// console.log("heyyy blank");
		validate=false;
	}
	else if(!Hostelcontent || !Floorcontent)
	{
			alertify.error("Please Enter Positive Numeric Values in Hostel name and Floor name");
	}else if(!roomcontent || !discontent)
	{
		alertify.error("Special Characters are not allowed exept . and ,");
	}
	else
	{
	     getDBData({reqType: "submitComplaint"});
	}
}
}

const getSubcat = async () => {
	await getDBData({reqType: "getSubcat"});
};

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
	document.getElementById("slctCat").addEventListener("change", getSubcat);
	console.log(loginStatus);
	if (loginStatus) {
		document.getElementById("slctCat").reqType = "getSubcat";
		document.getElementById("slctCat").addEventListener("change", getSubcat);
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