import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from 'regenerator-runtime/runtime';
// import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;
var upvoteStatus;

const getDBData = async (options) => {
	if (options.reqType == "getCat") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getCat"
				// email: loginProfile.getEmail()
                
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
	else if (options.reqType == "getCompUser") {
		axios.get('http://127.0.0.1:8080', {
			params: {
                reqType: "getCompUser",
				email: options.email
				// email: loginProfile.getEmail()
			}
			})
			.then(function (response) {
				populateList(response.data, "complaint");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "getCompSearch") {
		// console.log(options.compId);
		
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getCompSearch",
				catId: options.catId,
				subcatId:options.subcatId,
				email:options.email	
		
			}
			})
			.then(function (response) {
				// console.log("heyy, heyy");
				document.getElementById("divComplaints").innerHTML = "";
				// getDBData({reqType: "getComp"});
				populateList(response.data, "complaint");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}

	else if (options.reqType == "getFbUser") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getFbUser",
				email: options.email
				// email:loginProfile.getEmail()
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

const searchBycat = () => {
	var searchItem = document.getElementById("searchByEmail").value;
	var catSelected = document.getElementById("slctCat").value;
	var subcatSelected = document.getElementById("slctSubcat").value;

	console.log(searchItem);
	console.log(catSelected);
	console.log(subcatSelected);

	getDBData({reqType:"getCompSearch", catId:catSelected , subcatId: subcatSelected, email:loginProfile.getEmail()});
}

var btnsearch= document.getElementById('searchbtn');
btnsearch.addEventListener("click",searchBycat);


const createFbItem = item => {
	// console.log(item);
	const divFbItem = document.createElement('div');
	divFbItem.className = "divFbItem";

	const divFbUpvote = document.createElement('div');
	const divFbCat = document.createElement('div');
	divFbCat.className = "divFbCat";
	divFbCat.innerHTML = item.catDesc;

	const divFbSubj = document.createElement('div');
	divFbSubj.className = "divFbSubj";
	divFbSubj.innerHTML = item.fbSubj;

	const divFbDesc = document.createElement('div');
	divFbDesc.className = "divFbDesc";
	divFbDesc.innerHTML = item.fbDesc;

	
	divFbItem.appendChild(divFbCat);
	divFbItem.appendChild(divFbSubj);
	divFbItem.appendChild(divFbDesc);
	return divFbItem;
};

const createCompItem = item => {
	// console.log(item);
	const divComplaintItem = document.createElement('div');
	divComplaintItem.className = "divComplaintItem";
	const divCompSolve = document.createElement('div');
	divCompSolve.className = "divCompSolve";
	const btnCompSolve = document.createElement('input');
	btnCompSolve.type = "button";
	// btnCompSolve.className = "btnCompSolve";
	btnCompSolve.compId = item.compId;
	if (item.compStatus == 3) {
		divComplaintItem.style.backgroundColor = "#9aeca5";
	
	}
	if (item.compStatus == 2) {
		
	}
	if (item.compStatus == 1) {
		divComplaintItem.style.backgroundColor = "#ec9d9a";
		
	}
	divCompSolve.appendChild(btnCompSolve);
	const divCompCat = document.createElement('div');
	divCompCat.className = "divCompCat";
	divCompCat.innerHTML = item.catDesc;
	const divCompSubcat = document.createElement('div');
	divCompSubcat.className = "divCompSubcat";
	divCompSubcat.innerHTML = item.subcatDesc;
	const divCompDesc = document.createElement('div');
	divCompDesc.className = "divCompDesc";
	divCompDesc.innerHTML = item.compDesc;
	const divCompStatus = document.createElement('div');
	divCompStatus.className = "divCompStatus";
	if (item.compStatus == 1)
		divCompStatus.innerHTML = "Overtime";
	if (item.compStatus == 2)
		divCompStatus.innerHTML = "Unresolved";
	if (item.compStatus == 3)
		divCompStatus.innerHTML = "Resolved";

	divComplaintItem.appendChild(divCompSolve);
	divComplaintItem.appendChild(divCompCat);
	divComplaintItem.appendChild(divCompSubcat);
	divComplaintItem.appendChild(divCompDesc);
	divComplaintItem.appendChild(divCompStatus);
	return divComplaintItem;
};

const populateList = (list, selectType) => {
	// console.log(categoryList);
	if (selectType == "complaint") {
		const divComplaints = document.getElementById("divComplaints");

		if (Array.isArray(list) && list.length > 0) {
			list.map(complaint => {
				divComplaints.appendChild(createCompItem(complaint));
			});
		}
	}
	else if (selectType == "feedback") {
		const divFeedback = document.getElementById("divFeedback");

		if (Array.isArray(list) && list.length > 0) {
			list.map(feedback => {
				divFeedback.appendChild(createFbItem(feedback));
			});
		}
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

const getSubcat = async () => {
	await getDBData({reqType: "getSubcat"});
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

var userChanged = function (user) {
	// Check if user is logged in
	var profile = user.getBasicProfile();
	// console.log(profile);
	if (profile) {
		loginStatus = true;
	}
	loginProfile = profile;
	initGUI();
};

function signOut() {
	// console.log("signout");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
		// console.log('User signed out.');
		loginStatus = false;
		window.location.replace("login.html");
    });
}

const initGUI = () => {
	document.getElementById("slctCat").addEventListener("change", getSubcat);
	// console.log(loginStatus);
	if (loginStatus) {
		divGreeting = document.getElementById("divGreeting");
		divGreeting.innerHTML += loginProfile.getName().substring(0, 18);
		divDisplayPicture = document.getElementById("divDisplayPicture");
		console.log(loginProfile.getImageUrl());
		divDisplayPicture.style.backgroundImage = "url('" + loginProfile.getImageUrl() + "'";
		document.getElementById("sign-out").addEventListener("click", signOut);
		getDBData({reqType: "getCat"});
		getDBData({reqType: "getCompUser", email: loginProfile.getEmail()});
		getDBData({reqType: "getFbUser", email: loginProfile.getEmail()});
		// getDBData({reqType:"getFb"});
	}
	else 
	{
		location.replace("login.html?redirect=true");
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