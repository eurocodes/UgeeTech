const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const navLogo = document.querySelector("#navbar__logo");

// Display mobile menu
const mobileMenu = () => {
	menu.classList.toggle("is-active");
	menuLinks.classList.toggle("active");
}

menu.addEventListener("click", mobileMenu);

// Show active menu when Scrolling
const highlightMenu = () => {
	const element = document.querySelector(".highlight");
	const homeMenu = document.querySelector("#home-page");
	const aboutMenu = document.querySelector("#about-page");
	const services = document.querySelector("#services-page");
	let scrollPos = window.scrollY;
	// console.log("ScrollPos:", scrollPos);

	// Add "highlight" class to menu items
	if (window.innerWidth > 960 && scrollPos <= 100) {
		homeMenu.classList.add("highlight");
		aboutMenu.classList.remove("highlight");
		return
	} else if (window.innerWidth > 960 && scrollPos <= 600) {
		aboutMenu.classList.add("highlight");
		homeMenu.classList.remove("highlight");
		services.classList.remove("highlight");
		return
	} else if (window.innerWidth > 960 && scrollPos <= 1800) {
		services.classList.add("highlight");
		aboutMenu.classList.remove("highlight");
		return
	}

	if (element && window.innerWidth < 960 && scrollPos < 600 || element) {
		element.classList.remove("highlight");
	}
}

window.addEventListener("scroll", highlightMenu);
window.addEventListener("click", highlightMenu);

// Close mobile menu
const hideMobileMenu = () => {
	const menuBars = document.querySelector(".is-active");
	if (window.innerWidth <= 768 && menuBars) {
		menu.classList.toggle("is-active");
		menuLinks.classList.remove("active");
	}
}

menuLinks.addEventListener("click", hideMobileMenu);
navLogo.addEventListener("click", hideMobileMenu);

/**SUBMIT FORM */
const form = document.getElementById("form-field");
form.onsubmit = async function (e) {
	e.preventDefault();
	const req = JSON.stringify({
		email: form.email.value,
		name: form.name.value,
		// phone: form.phone.value,
		subject: form.subject.value,
		message: form.message.value
	});
	const response = await fetch('https://ugee-forms.herokuapp.com/contact', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: req,
	})

	if (response.status == 200) {
		const result = await response.json();
		alert(result.message)
	} else {
		const { message } = await response.json();
		alert(message)
	}
	this.reset();
}