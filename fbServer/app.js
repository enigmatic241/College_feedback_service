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
    password: "root",
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
        else if (req.query.reqType == "submitcomplaint") {
            if (err) throw err;
            var sql = "INSERT INTO complaint (catId, subcatId, compDesc, compStatus) VALUES ('";
            sql += req.query.catId + "', '" + req.query.subcatId + "', '" + req.query.description + "', 2)";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.header("Access-Control-Allow-Origin", "*");
                // res.send(result);
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
        else if (req.query.reqType == "getComp") {
            if (err) throw err;
            // var sql = "SELECT * FROM complaint GROUP BY compstatus";
            var sql = "SELECT complaint.*, subcategory.*, category.* FROM complaint, subcategory, category ";
            sql += "WHERE complaint.subcatId = subcategory.subcatId AND complaint.catId = subcategory.catId AND ";
            sql += "category.catId = subcategory.catId";
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.header("Access-Control-Allow-Origin", "*");
                res.send(result);
            });
        }
        // else if (req.query.reqType == "getFb") {
        //     if (err) throw err;
        //     var sql = "SELECT subcategoryname FROM subcategory where catId='" + req.query.catId + "'";
        //     con.query(sql, function (err, result) {
        //         if (err) throw err;
        //         console.log(result);
        //         res.header("Access-Control-Allow-Origin", "*");
        //         res.send(result);
        //     });
        // }
        // res.send('Hello World!');
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})