import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from 'regenerator-runtime/runtime';
import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;

const getDBData = async (options) => {
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
	}else if (options.reqType == "getSubcat") {
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
	else if (options.reqType == "getComp") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getComp"
			}
			})
			.then(function (response) {
				populateList(response.data, "complaint");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "getFb") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getFb",
				categoryName: categorySelected
			}
			})
			.then(function (response) {
				populateList(response.data, "feedback");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
};

const createCompItem = item => {
	// <div class="divComplaintItem">
	// 	<div class="divCompCat">Hostel</div>
	// 	<div class="divCompSubcat">Light</div>
	// 	<div class="divCompDesc">Room: 3523 Floor: 5 Needs cleaning</div>
	// </div>
	console.log(item);
	const divComplaintItem = document.createElement('div');
	divComplaintItem.className = "divComplaintItem";
	const divCompCat = document.createElement('div');
	divCompCat.className = "divCompCat";
	divCompCat.innerHTML = item.catId;
	const divCompSubcat = document.createElement('div');
	divCompSubcat.className = "divCompSubcat";
	divCompSubcat.innerHTML = item.subcatId;
	const divCompDesc = document.createElement('div');
	divCompDesc.className = "divCompDesc";
	divCompDesc.innerHTML = item.compDesc;
	divComplaintItem.appendChild(divCompCat);
	divComplaintItem.appendChild(divCompSubcat);
	divComplaintItem.appendChild(divCompDesc);
	return divComplaintItem;
};

const populateList = (list, selectType) => {
	// console.log(categoryList);
	if (selectType == "complaint") {
		const divComplaints = document.getElementById("divComplaints");

		if (Array.isArray(list) && list.length > 0) {
			list.map(category => {
				divComplaints.appendChild(createCompItem(category));
			});
		} else if (list) {
			divComplaints.appendChild(createCompItem(list));
		}
	}
	else if (selectType == "subcategory") {
	}
}

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
			slctCat.appendChild(createCatOption("Other"));
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
			slctSubcat.appendChild(createSubcatOption("Other"));
		} else if (categoryList) {
			slctSubcat.appendChild(createSubcatOption(categoryList.subcatDesc));
		}
	}
};

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

const init = () => {
	var auth2;
	gapi.load('auth2', function(){
		auth2 = gapi.auth2.init({
			client_id: '75701767404-m5ba2b22tne027448ia86dogn3v95r5v.apps.googleusercontent.com'
		});
		auth2.currentUser.listen(userChanged);
	});
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

const initGUI = () => {
	document.getElementById("slctCat").addEventListener("change", getSubcat);
	console.log(loginStatus);
	if (loginStatus) {
		divGreeting = document.getElementById("divGreeting");
		divGreeting.innerHTML += loginProfile.getName();
		document.getElementById("sign-out").addEventListener("click", signOut);
		getDBData({reqType: "getCat"});
		getDBData({reqType: "getComp"});
		// await getDBData({reqType: "getFb"});
	}
	else {
		window.location.replace("login.html");
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
	}
}

init();