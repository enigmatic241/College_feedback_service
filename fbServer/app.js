// var url = require('url');
// const request = require('request');
// var url_parts = url.parse(request.url, true);
var mysql = require('mysql');
const express = require('express');
const app = express();
const port = 8080;
var con = mysql.createConnection({
	host: "0.0.0.0",
	user: "root",
	password: "Inferno@241",
	database: "feedback"
});

con.connect(function(err) {
	app.get('/', (req, res) => {
		if (req.query.reqType == "getCat") {
			if (err) throw err;
			var sql = "SELECT catId, catDesc FROM category";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		
		else if (req.query.reqType == "getSubcat") {
			if (err) throw err;
			var sql = "SELECT subcatId, subcatDesc FROM subcategory where catId='" + req.query.catId + "'";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "submitcomplaint") {
			if (err) throw err;
			var sql = "INSERT INTO complaint (catId, subcatId, compDesc, compStatus, compEmail) VALUES ('";
			sql += req.query.catId + "', '" + req.query.subcatId + "', '" + req.query.description + "', 2, '" + req.query.fromEmail + "')";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				// res.send(result);
			});
		}
		else if (req.query.reqType == "solvecomplaint") {
			// console.log(req.query.reqType);
			if (err) throw err;
			// var sql = "UPDATE categorysupervisor SET catRoleEmail='" + req.query.newEmail;
			// sql += "' WHERE catRoleId=" + req.query.id;
			var sql = "UPDATE complaint SET compStatus=" + 3 + " WHERE compId=" + req.query.id;
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "submitfeedback") {
			if (err) throw err;
			console.log(req.query);
			var sql = "INSERT INTO feedbacks (catId, fbSubj, fbDesc, fbEmail) VALUES ('";
			sql += req.query.catId + "', '" + req.query.subject + "', '" + req.query.description + "', '" + req.query.fromEmail + "')";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				// res.send(result);
			});
		}
		else if (req.query.reqType == "getComp") {
			if (err) throw err;
			var sql = "SELECT complaint.*, subcategory.*, category.* FROM complaint, subcategory, category ";
			sql += "WHERE complaint.subcatId = subcategory.subcatId AND complaint.catId = subcategory.catId AND ";
			sql += "category.catId = subcategory.catId ORDER BY complaint.compStatus";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "getCompUser") {
			if (err) throw err;
			var sql = "SELECT complaint.*, subcategory.*, category.* FROM complaint, subcategory, category ";
			sql += "WHERE complaint.subcatId = subcategory.subcatId AND complaint.catId = subcategory.catId AND ";
			sql += "category.catId = subcategory.catId AND complaint.compEmail= '" + req.query.email;
			sql += "' ORDER BY complaint.compStatus";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "getCatRole") {
			if (err) throw err;
			var sql = "SELECT categorysupervisor.*, category.* FROM category ";
			sql += "LEFT JOIN categorysupervisor ";
			sql += "ON categorysupervisor.catId = category.catId";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "updateRole") {
			if (err) throw err;
			// var sql = "SELECT * FROM complaint GROUP BY compstatus";
			var sql = "UPDATE categorysupervisor SET catRoleEmail='" + req.query.newEmail;
			sql += "' WHERE catRoleId=" + req.query.id;
			// var sql = "INSERT INTO categorysupervisor (catId, catRoleEmail) VALUES(" + req.query.catId;
			// sql += ", '" + req.query.newEmail + "') ";
			// sql += "ON DUPLICATE KEY UPDATE";
			// sql += " catRoleEmail='" + req.query.newEmail + "'";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "addRole") {
			if (err) throw err;
			// var sql = "SELECT * FROM complaint GROUP BY compstatus";
			var sql = "INSERT INTO categorysupervisor (catId, catRoleEmail) VALUES(" + req.query.id;
			sql += ", '" + req.query.newEmail + "')";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "deleteRole") {
			if (err) throw err;
			// var sql = "SELECT * FROM complaint GROUP BY compstatus";
			var sql = "DELETE FROM categorysupervisor";
			sql += " WHERE catRoleId=" + req.query.id;
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "getFb") {
			if (err) throw err;
			var sql = "SELECT feedbacks.*, category.*, ";
			sql += "(SELECT COUNT(*) FROM fbupvote WHERE fbupvote.fbId = feedbacks.fbId) as upvoteCount, "
			sql += "(SELECT COUNT(*) FROM fbdownvote WHERE fbdownvote.fbId = feedbacks.fbId) as downvoteCount "
			sql += "FROM feedbacks, category "
			sql += "WHERE category.catId = feedbacks.catId";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "getFbUser") {
			if (err) throw err;
			var sql = "SELECT feedbacks.*, category.*, ";
			sql += "(SELECT COUNT(*) FROM fbupvote WHERE fbupvote.fbId = feedbacks.fbId) as upvoteCount, "
			sql += "(SELECT COUNT(*) FROM fbdownvote WHERE fbdownvote.fbId = feedbacks.fbId) as downvoteCount "
			sql += "FROM feedbacks, category "
			sql += "WHERE category.catId = feedbacks.catId "
			// sql += "AND feedbacks.fbEmail='"+ req.query.email;
			sql += "AND feedbacks.fbEmail='"+ req.query.email + "'";
			console.log(sql);
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log(result);
				res.header("Access-Control-Allow-Origin", "*");
				res.send(result);
			});
		}
		else if (req.query.reqType == "votecheck") {
			if (err) throw err;
			if (req.query.voteType == "upvote") {
				var sql = "SELECT * FROM fbupvote WHERE upvoteEmail='" + req.query.email;
				sql += "' AND fbId=" + req.query.fbId;
				con.query(sql, function (err, result) {
					if (err) throw err;
					// console.log(result);
					res.header("Access-Control-Allow-Origin", "*");
					res.send(result);
				});
			}
			else {
				var sql = "SELECT * FROM fbdownvote WHERE downvoteEmail='" + req.query.email;
				sql += "' AND fbId=" + req.query.fbId;
				con.query(sql, function (err, result) {
					if (err) throw err;
					// console.log(result);
					res.header("Access-Control-Allow-Origin", "*");
					res.send(result);
				});
			}
		}
		else if (req.query.reqType == "voteremove") {
			if (err) throw err;
			if (req.query.voteType == "upvote") {
				var sql = "DELETE FROM fbupvote WHERE upvoteEmail='" + req.query.email;
				sql += "' AND fbId=" + req.query.fbId;
				con.query(sql, function (err, result) {
					if (err) throw err;
					// console.log(result);
					res.header("Access-Control-Allow-Origin", "*");
					res.send(result);
				});
			}
			else {
				var sql = "DELETE FROM fbdownvote WHERE downvoteEmail='" + req.query.email;
				sql += "' AND fbId=" + req.query.fbId;
				con.query(sql, function (err, result) {
					if (err) throw err;
					// console.log(result);
					res.header("Access-Control-Allow-Origin", "*");
					res.send(result);
				});
			}
		}
		else if (req.query.reqType == "voteadd") {
			if (err) throw err;
			if (req.query.voteType == "upvote") {
				// INSERT INTO fbupvote VALUES (2, 3, 'LIT2018007@iiitl.ac.in');
				var sql = "INSERT INTO fbupvote (fbId, upvoteEmail)";
				sql += " VALUES (" + req.query.fbId + ", '" + req.query.email + "')";
				con.query(sql, function (err, result) {
					if (err) throw err;
					// console.log(result);
					res.header("Access-Control-Allow-Origin", "*");
					res.send(result);
				});
			}
			else {
				var sql = "INSERT INTO fbdownvote (fbId, downvoteEmail)";
				sql += " VALUES (" + req.query.fbId + ", '" + req.query.email + "')";
				con.query(sql, function (err, result) {
					if (err) throw err;
					// console.log(result);
					res.header("Access-Control-Allow-Origin", "*");
					res.send(result);
				});
			}
		}
	})
});

app.listen(port, '0.0.0.0', () => {
	console.log(`Example app listening at http://localhost:${port}`);
})
