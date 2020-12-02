import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from 'regenerator-runtime/runtime';
import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;
var upvoteStatus;

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
				reqType: "getFb"
			}
			})
			.then(function (response) {
				populateList(response.data, "feedback");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "solvecomplaint") {
		// console.log(options.compId);
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "solvecomplaint",
				id: options.compId
			}
			})
			.then(function (response) {
				// console.log("heyy, heyy");
				document.getElementById("divComplaints").innerHTML = "";
				getDBData({reqType: "getComp"});
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "votecheck") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "votecheck",
				voteType: options.voteType,
				fbId: options.fbId,
				email: options.email
			}
			})
			.then(function (response) {
				// console.log(response);
				if (response.data.length > 0) {
					if (options.voteType == "upvote")
						var voteBtns = document.getElementsByClassName("btnUpvote");
					if (options.voteType == "downvote")
						var voteBtns = document.getElementsByClassName("btnDownvote");
					for (var i = 0; i < voteBtns.length; i++) {
						if (voteBtns[i].fbId == options.voteType + options.fbId) {
							// console.log(options.voteType);
							if (options.voteType == "upvote") {
								voteBtns[i].voteStatus = 1;
								voteBtns[i].style.backgroundColor = "black";
								voteBtns[i].style.color = "rgb(255, 38, 0)";
							}
							else {
								voteBtns[i].voteStatus = 1;
								voteBtns[i].style.backgroundColor = "black";
								voteBtns[i].style.color = "rgb(0, 121, 235)";
							}
							break;
						}
					}
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "voteremove") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "voteremove",
				voteType: options.voteType,
				fbId: options.fbId,
				email: options.email
			}
			})
			.then(function (response) {
				if (options.voteType == "upvote")
					var divVoteCount = document.getElementById("divFbUpvoteCount" + options.fbId);
				if (options.voteType == "downvote")
					var divVoteCount = document.getElementById("divFbDownvoteCount" + options.fbId);
				divVoteCount.innerHTML -= 1;

				if (options.voteType == "upvote")
					var voteBtns = document.getElementsByClassName("btnUpvote");
				if (options.voteType == "downvote")
					var voteBtns = document.getElementsByClassName("btnDownvote");
				for (var i = 0; i < voteBtns.length; i++) {
					if (voteBtns[i].fbId == options.voteType + options.fbId) {
						// console.log(options.voteType);
						voteBtns[i].voteStatus = 0;
						voteBtns[i].style.backgroundColor = "white";
						voteBtns[i].style.color = "black";
						break;
					}
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "voteadd") {
		if (options.voteType == "upvote")
			var voteBtns = document.getElementsByClassName("btnDownvote");
		if (options.voteType == "downvote")
			var voteBtns = document.getElementsByClassName("btnUpvote");
		if (options.voteType == "upvote") {
			for (var i = 0; i < voteBtns.length; i++) {
				if (voteBtns[i].fbId == "downvote" + options.fbId) {
					if (voteBtns[i].voteStatus == 1) {
						getDBData({reqType: "voteremove", voteType: "downvote", email: loginProfile.getEmail(), fbId: options.fbId});
					}
					break;
				}
			}
		}
		else {
			for (var i = 0; i < voteBtns.length; i++) {
				if (voteBtns[i].fbId == "upvote" + options.fbId) {
					if (voteBtns[i].voteStatus == 1) {
						getDBData({reqType: "voteremove", voteType: "upvote", email: loginProfile.getEmail(), fbId: options.fbId});
					}
					break;
				}
			}
		}
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "voteadd",
				voteType: options.voteType,
				fbId: options.fbId,
				email: options.email
			}
			})
			.then(function (response) {
				if (options.voteType == "upvote")
					var divVoteCount = document.getElementById("divFbUpvoteCount" + options.fbId);
				if (options.voteType == "downvote")
					var divVoteCount = document.getElementById("divFbDownvoteCount" + options.fbId);
				divVoteCount.innerHTML++;

				if (options.voteType == "upvote")
					var voteBtns = document.getElementsByClassName("btnUpvote");
				if (options.voteType == "downvote")
					var voteBtns = document.getElementsByClassName("btnDownvote");
				for (var i = 0; i < voteBtns.length; i++) {
					if (voteBtns[i].fbId == options.voteType + options.fbId) {
						if (options.voteType == "upvote") {
							voteBtns[i].voteStatus = 1;
							voteBtns[i].style.backgroundColor = "black";
							voteBtns[i].style.color = "rgb(255, 38, 0)";
						}
						else {
							voteBtns[i].voteStatus = 1;
							voteBtns[i].style.backgroundColor = "black";
							voteBtns[i].style.color = "rgb(0, 121, 235)";
						}
						break;
					}
				}
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
};

const upvote = evt => {
	// console.log("upvote");
	if (evt.target.voteStatus == 0) {
		getDBData({reqType: "voteadd", voteType: "upvote", email: loginProfile.getEmail(), fbId: evt.target.fbId.substring(6)});
	}
	else {
		getDBData({reqType: "voteremove", voteType: "upvote", email: loginProfile.getEmail(), fbId: evt.target.fbId.substring(6)});
	}
}

const downvote = evt => {
	// console.log("downvote");
	if (evt.target.voteStatus == 0) {
		getDBData({reqType: "voteadd", voteType: "downvote", email: loginProfile.getEmail(), fbId: evt.target.fbId.substring(8)});
	}
	else {
		getDBData({reqType: "voteremove", voteType: "downvote", email: loginProfile.getEmail(), fbId: evt.target.fbId.substring(8)});
	}
}

const createFbItem = item => {
	// console.log(item);
	const divFbItem = document.createElement('div');
	divFbItem.className = "divFbItem";

	const divFbUpvote = document.createElement('div');
	divFbUpvote.className = "divFbVote";
	const btnUpvote = document.createElement('input');
	btnUpvote.type = "button";
	btnUpvote.className = "btnUpvote";
	btnUpvote.fbId = "upvote" + item.fbId;
	btnUpvote.id = "upvote" + item.fbId;
	btnUpvote.value = "⥣";
	btnUpvote.voteStatus = 0;
	getDBData({reqType: "votecheck", voteType: "upvote", fbId: item.fbId, email: loginProfile.getEmail()});
	btnUpvote.addEventListener("click", upvote);
	divFbUpvote.appendChild(btnUpvote);

	const divFbUpvoteCount = document.createElement('div');
	divFbUpvoteCount.id = "divFbUpvoteCount" + item.fbId;
	divFbUpvoteCount.className = "divFbUpvoteCount";
	divFbUpvoteCount.innerHTML = item.upvoteCount;

	const divFbDownvote = document.createElement('div');
	divFbDownvote.className = "divFbVote";
	const btnDownvote = document.createElement('input');
	btnDownvote.type = "button";
	btnDownvote.className = "btnDownvote";
	btnDownvote.fbId = "downvote" + item.fbId;
	btnDownvote.id = "downvote" + item.fbId;
	btnDownvote.value = "⥥";
	btnDownvote.voteStatus = 0;
	getDBData({reqType: "votecheck", voteType: "downvote", fbId: item.fbId, email: loginProfile.getEmail()});
	btnDownvote.addEventListener("click", downvote);
	divFbDownvote.appendChild(btnDownvote);

	const divFbDownvoteCount = document.createElement('div');
	divFbDownvoteCount.id = "divFbDownvoteCount" + item.fbId;
	divFbDownvoteCount.className = "divFbDownvoteCount";
	divFbDownvoteCount.innerHTML = item.downvoteCount;

	const divFbCat = document.createElement('div');
	divFbCat.className = "divFbCat";
	divFbCat.innerHTML = item.catDesc;

	const divFbSubj = document.createElement('div');
	divFbSubj.className = "divFbSubj";
	divFbSubj.innerHTML = item.fbSubj;

	const divFbDesc = document.createElement('div');
	divFbDesc.className = "divFbDesc";
	divFbDesc.innerHTML = "<b>Discription</b> : "+item.fbDesc;

	const divfbEmail = document.createElement('div');
	divfbEmail.className ="divfbEmail";
	divfbEmail.innerHTML= item.fbEmail;
	// let datetime = document.createElement('div');
	// datetime.className="date-time";

	// var dt = new Date();
	// document.getElementsByClassName("date-time").innerHTML = dt.toLocaleString();


	divFbItem.appendChild(divFbUpvote);
	divFbItem.appendChild(divFbUpvoteCount);
	divFbItem.appendChild(divFbDownvote);
	divFbItem.appendChild(divFbDownvoteCount);
	divFbItem.appendChild(divFbCat);
	divFbItem.appendChild(divFbSubj);
	divFbItem.appendChild(divfbEmail);

	divFbItem.appendChild(divFbDesc);
	return divFbItem;
};

const solveComplaint = (evt) => {
	// console.log(evt.target.compId);

	getDBData({reqType: "solvecomplaint", compId: evt.target.compId});
}

const createCompItem = item => {
	// console.log(item);
	const divComplaintItem = document.createElement('div');
	divComplaintItem.className = "divComplaintItem";
	const divCompSolve = document.createElement('div');
	divCompSolve.className = "divCompSolve";
	const btnCompSolve = document.createElement('input');
	btnCompSolve.type = "button";
	btnCompSolve.className = "btnCompSolve";
	btnCompSolve.compId = item.compId;
	if (item.compStatus == 3) {
		divComplaintItem.style.backgroundColor = "#9aeca5";
		btnCompSolve.value = "Solved";
		btnCompSolve.disabled = "true";
	}
	if (item.compStatus == 2) {
		btnCompSolve.value = "Solve";
		btnCompSolve.addEventListener("click", solveComplaint);
	}
	if (item.compStatus == 1) {
		divComplaintItem.style.backgroundColor = "#ec9d9a";
		btnCompSolve.value = "Solve";
		btnCompSolve.addEventListener("click", solveComplaint);
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
	// let datetime = document.createElement('span');
	// datetime.className="datetime";
	if (item.compStatus == 1)
		divCompStatus.innerHTML = "Overtime";
	if (item.compStatus == 2)
		divCompStatus.innerHTML = "Unresolved";
	if (item.compStatus == 3)
		divCompStatus.innerHTML = "Resolved";

	// var dt = new Date();
	// document.getElementsByClassName("datetime").innerHTML = dt.toLocaleString();
	divComplaintItem.appendChild(divCompSolve);
	divComplaintItem.appendChild(divCompCat);
	divComplaintItem.appendChild(divCompSubcat);
	divComplaintItem.appendChild(divCompDesc);
	// divComplaintItem.appendChild(datetime);
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
		getDBData({reqType: "getComp"});
		getDBData({reqType: "getFb"});
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