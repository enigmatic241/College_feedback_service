// document.getElementById("navbar").innerHTML='<object type="text/html" data="header.html" ></object>';
// fetch('header.html')
//   .then(data => data.text())
//   .then(html => document.getElementById('navbar').innerHTML = html);
// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// // var $ = require('jquery')(window);
// var jquery = require('jquery');
// var $ = jquery.create();



		// $("#navbar").load("header.html", function() {
		// 	const body = document.body;
		// 	const menuLinks = document.querySelectorAll(".admin-menu a");
		// 	const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
		// 	const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
		// 	const collapsedClass = "collapsed";
			// console.log("heyy heyy");
			
		// 	collapseBtn.addEventListener("click", function() {
		// 		this.getAttribute("aria-expanded") == "true"
		// 			? this.setAttribute("aria-expanded", "false")
		// 			: this.setAttribute("aria-expanded", "true");
		// 		this.getAttribute("aria-label") == "collapse menu"
		// 			? this.setAttribute("aria-label", "expand menu")
		// 			: this.setAttribute("aria-label", "collapse menu");
		// 		body.classList.toggle(collapsedClass);
		// 	});
			
		// 	toggleMobileMenu.addEventListener("click", function() {
		// 		this.getAttribute("aria-expanded") == "true"
		// 			? this.setAttribute("aria-expanded", "false")
		// 			: this.setAttribute("aria-expanded", "true");
		// 		this.getAttribute("aria-label") == "open menu"
		// 			? this.setAttribute("aria-label", "close menu")
		// 			: this.setAttribute("aria-label", "open menu");
		// 		body.classList.toggle("mob-menu-opened");
		// 	});
			
		// 	for (const link of menuLinks) {
		// 		link.addEventListener("mouseenter", function() {
		// 			body.classList.contains(collapsedClass) &&
		// 			window.matchMedia("(min-width: 768px)").matches
		// 			? this.setAttribute("title", this.textContent)
		// 			: this.removeAttribute("title");
		// 		});
		// 	}
		// });