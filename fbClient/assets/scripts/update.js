import axios from 'axios';
import "core-js/stable";
import "regenerator-runtime/runtime";
import Swal from 'sweetalert2';

var loginStatus;
var loginProfile;

const getDBData = async (options) => {
	// console.log(options);
	if (options.reqType == "getCatRole") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "getCatRole",
				permissionLevel: "admin"
			}
			})
			.then(function (response) {
				addOptions(response.data, "categoryroles");
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "updateRole") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "updateRole",
				id: options.id,
				catId: options.catId,
				newEmail: options.newEmail
			}
			})
			.then(function (response) {
				const divRoleTotalContainer = document.getElementById("divRoleTotalContainer");
				divRoleTotalContainer.innerHTML = "";
				getDBData({reqType: "getCatRole"});
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "addRole") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "addRole",
				id: options.id,
				newEmail: options.newEmail
			}
			})
			.then(function (response) {
				const divRoleTotalContainer = document.getElementById("divRoleTotalContainer");
				divRoleTotalContainer.innerHTML = "";
				getDBData({reqType: "getCatRole"});
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	else if (options.reqType == "deleteRole") {
		axios.get('http://127.0.0.1:8080', {
			params: {
				reqType: "deleteRole",
				id: options.id
			}
			})
			.then(function (response) {
				const divRoleTotalContainer = document.getElementById("divRoleTotalContainer");
				divRoleTotalContainer.innerHTML = "";
				getDBData({reqType: "getCatRole"});
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
	// console.log(options.target.value);
};

function roleUpdate(evt) {
	var newEmail = document.getElementById("txt" + evt.target.updateId);
	Swal.fire({
		title: 'Update supervisor',
		text: 'confirm updating ' + newEmail,
		icon: 'question',
		confirmButtonText: 'OK'
	}).then((result) => {
		if (result.isConfirmed) {
			getDBData({reqType: "updateRole", catId: evt.target.catId, id: evt.target.updateId, newEmail: newEmail.value});
		}
	});
}

function roleAdd(evt) {
	// console.log(evt);
	// var newEmail = document.getElementById("txt" + evt.target.addId);
	// var newEmail = document.querySelector('input[catId="' + CSS.escape(evt.target.addId) + '"]');
	// var newEmail = document.querySelector('input[type="text"][catId="101"]');
	var newEmail;
	var allNewEmails = document.getElementsByClassName("txtNewRoleEmail");
	for (var i = 0; i < allNewEmails.length; i++) {
		if (allNewEmails.item(i).catId == evt.target.addId) {
			newEmail = allNewEmails.item(i);
			break;
		}
	}
	// console.log(newEmail);
	Swal.fire({
		title: 'Add supervisor',
		text: 'confirm adding ' + newEmail.value,
		icon: 'question',
		confirmButtonText: 'OK'
	}).then((result) => {
		if (result.isConfirmed) {
			getDBData({reqType: "addRole", id: newEmail.catId, newEmail: newEmail.value});
		}
	});
}

function roleDelete(evt) {
	var newEmail = document.getElementById("txt" + evt.target.updateId);
	Swal.fire({
		title: 'Remove supervisor',
		text: 'confirm remove',
		icon: 'question',
		confirmButtonText: 'OK'
	}).then((result) => {
		if (result.isConfirmed) {
			getDBData({reqType: "deleteRole", id: evt.target.deleteId});
		}
	});
}

const createUpdateOption = item => {
	const divRoleContainer = document.createElement('div');
	divRoleContainer.className = "divRoleContainer";
	
	const divRole = document.createElement('div');
	divRole.className = "divRole";
	divRole.appendChild(document.createTextNode(item.catDesc + " supervisor"));

	const divRoleText = document.createElement('div');
	divRoleText.className = "divRoleText";
	const txtRoleEmail = document.createElement('input');
	txtRoleEmail.type = "text";
	txtRoleEmail.disabled = "true";
	txtRoleEmail.className = "txtRoleEmail";
	// console.log(item.catRoleEmail);
	if (item.catRoleEmail == null) txtRoleEmail.value = "No supervisor assigned";
	else txtRoleEmail.value = item.catRoleEmail;
	divRoleText.appendChild(txtRoleEmail);

	const divNewText = document.createElement('div');
	divNewText.className = "divNewText";
	const txtNewRoleEmail = document.createElement('input');
	txtNewRoleEmail.type = "text";
	txtNewRoleEmail.className = "txtNewRoleEmail";
	txtNewRoleEmail.id = "txt" + item.catRoleId;
	txtNewRoleEmail.catId = item.catId;
	divNewText.appendChild(txtNewRoleEmail);

	const divUpdateContain = document.createElement('div');
	divUpdateContain.className = "divUpdateContain";
	const btnRoleUpdate = document.createElement('input');
	btnRoleUpdate.type = "button";
	btnRoleUpdate.className = "btnRoleUpdate";
	btnRoleUpdate.updateId = item.catRoleId;
	btnRoleUpdate.catId = item.catId;
	// console.log(item.catRoleId);
	btnRoleUpdate.addEventListener("click", validateData);
	btnRoleUpdate.value = "Update";
	if (item.catRoleEmail == null) btnRoleUpdate.disabled = "true";
	divUpdateContain.appendChild(btnRoleUpdate);

	const divAddContain = document.createElement('div');
	divAddContain.className = "divAddContain";
	const btnRoleAdd = document.createElement('input');
	btnRoleAdd.type = "button";
	btnRoleAdd.className = "btnRoleUpdate";
	btnRoleAdd.addId = item.catId;
	btnRoleAdd.addEventListener("click", validateData);
	btnRoleAdd.value = "Add";
	divAddContain.appendChild(btnRoleAdd);

	const divDeleteContain = document.createElement('div');
	divDeleteContain.className = "divDeleteContain";
	const btnRoleDelete = document.createElement('input');
	btnRoleDelete.type = "button";
	btnRoleDelete.className = "btnRoleDelete";
	btnRoleDelete.deleteId = item.catRoleId;
	btnRoleDelete.addEventListener("click", validateData);
	btnRoleDelete.value = "Delete";
	if (item.catRoleEmail == null) btnRoleDelete.disabled = "true";
	divDeleteContain.appendChild(btnRoleDelete);

	divRoleContainer.appendChild(divRole);
	divRoleContainer.appendChild(divRoleText);
	divRoleContainer.appendChild(divNewText);
	divRoleContainer.appendChild(divAddContain);
	divRoleContainer.appendChild(divUpdateContain);
	divRoleContainer.appendChild(divDeleteContain);
	return divRoleContainer;
};

const addOptions = (list, selectType) => {
	console.log(list);
	if (selectType == "categoryroles") {
		const divRoleTotalContainer = document.getElementById("divRoleTotalContainer");

		if (Array.isArray(list) && list.length > 0) {
			list.map(category => {
				// console.log(category);
				divRoleTotalContainer.appendChild(createUpdateOption(category));
			});
		} else if (categoryList) {
			slctCat.appendChild(createUpdateOption(categoryList));
		}
	}
};

const validateData = (evt) => {
	// console.log(evt.target.addId);
	if (evt.target.updateId) roleUpdate(evt);
	else if (evt.target.addId) roleAdd(evt);
	else if (evt.target.deleteId) roleDelete(evt);
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
		getDBData({reqType: "getCatRole"});
	}
	else {
		window.location.replace("login.html?redirect=true");
	}
}

init();