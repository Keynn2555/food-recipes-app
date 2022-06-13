function addGlobalEventListener(
	type,
	selector,
	callback,
	options,
	parent = document
) {
	parent.addEventListener(
		type,
		(e) => {
			if (e.target.matches(selector)) callback(e);
		},
		options
	);
}

function qs(selector, parent = document) {
	return parent.querySelector(selector);
}

function qsa(selector, parent = document) {
	return [...parent.querySelector(selector)];
}

function createElement(type, options = {}) {
	const element = document.createElement(type);
	Object.entries(options).forEach(([key, value]) => {
		if (key == 'class') {
			element.classList.add(value);
			return;
		}

		if (key == 'dataset') {
			Object.entries(value).forEach(([dataKey, dataValue]) => {
				element.dataset[dataKey] = dataValue;
			});
			return;
		}

		if (key == 'text') {
			element.textContent = value;
			return;
		}

		element.setAttribute(key, value);
	});

	return element;
}

/**
 * Selectors
 */

const mobileMenu = qs('#mobile-menu');
const yearNow = qs('#year-now');

/**
 * Event Listeners
 */

addGlobalEventListener('click', '#mobile-menu', handleClickBurger);
addGlobalEventListener('click', '.mobile-link', handleClickLink);
addGlobalEventListener('click', '#scroll-to-home', handleScrollToHome);
addGlobalEventListener('click', '#scroll-to-about', handleScrollToAbout);
addGlobalEventListener('click', '#scroll-to-contact', handleScrollToContact);
window.addEventListener('resize', closeMobileMenu);
// searchBar.addEventListener('focus', setFocusColor);

/**
 * Footer copyright set current year
 */

let year = new Date().getFullYear();
yearNow.append(year);

/**
 * Navigation click handler with toggle
 */

let isActive = false;
function handleClickBurger() {
	isActive = !isActive ? true : false;
	let state = isActive ? 'block' : 'none';
	mobileMenu.style.display = state;
}

function handleClickLink() {
	isActive = false;
	mobileMenu.style.display = 'none';
}

function closeMobileMenu() {
	if (window.innerWidth >= 640) {
		isActive = false;
		mobileMenu.style.display = 'none';
	}
}

/**
 * Scroll to ID functions with offset
 */

const yOffset = -150;

function handleScrollToHome() {
	const element = qs('#home');
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
}

function handleScrollToAbout() {
	const element = qs('#about');
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
}

function handleScrollToContact() {
	const element = qs('#contact');
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
}
