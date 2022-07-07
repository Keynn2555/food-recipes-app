/**
 * Utility functions
 * @function addGlobalEventListener()
 * @function qs()
 * @function qsa()
 * @function createElement()
 */

/**
 * @function addGlobalEventListener()
 * @description create event listener
 * @param {*} type
 * @param {*} selector
 * @param {*} callback
 * @param {*} options
 * @param {*} parent
 */

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

/**
 * @function qs()
 * @description use query selector
 * @param {*} selector
 * @param {*} parent
 * @returns
 */

function qs(selector, parent = document) {
	return parent.querySelector(selector);
}

/**
 * @function qsa()
 * @description use query selector all
 * @param {*} selector
 * @param {*} parent
 * @returns
 */

function qsa(selector, parent = document) {
	return [...parent.querySelector(selector)];
}

/**
 * @function createElement()
 * @description create an element
 * @param {*} type
 * @param {*} options
 * @returns
 */

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
 * Optimization functions
 */

/**
 * @function debounce()
 * @function throttle()
 * @description call the function at certain delay to improve performace
 */

/**
 * @function debounce()
 * @param {*} callback
 * @param {*} delay
 * @returns
 */

function debounce(callback, delay = 1000) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			callback(...args);
		}, delay);
	};
}

/**
 * @function throttle()
 * @param {*} callback
 * @param {*} delay
 * @returns
 */

function throttle(callback, delay = 1000) {
	let shouldWait = false;
	let waitingArgs;
	const timeoutFunction = () => {
		if (waitingArgs == null) {
			shouldWait = false;
		} else {
			callback(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFunction, delay);
		}
	};

	return (...args) => {
		if (shouldWait) {
			waitingArgs = args;
			return;
		}

		callback(...args);
		shouldWait = true;
		setTimeout(timeoutFunction, delay);
	};
}

/**
 * @description Selectors
 */

const mobileMenu = qs('#mobile-menu');
const yearNow = qs('#year-now');

/**
 * @function throttleMobileMenu()
 * @function debounceSearchField()
 * @description Event Listeners
 */

addGlobalEventListener('click', '#mobile-menu', handleClickBurger);
addGlobalEventListener('click', '.mobile-link', handleClickMenu);

// addGlobalEventListener('click', '#scroll-to-about', handleScrollToAbout);
// addGlobalEventListener('click', '#scroll-to-contact', handleScrollToContact);

window.addEventListener('resize', () => {
	throttleMobileMenu();
});

const throttleMobileMenu = throttle(() => {
	console.log(window.innerWidth);
	if (window.innerWidth >= 640) {
		isActive = false;
		mobileMenu.style.display = 'none';
	}
}, 100);

/**
 * @description Footer copyright set current year
 */

let year = new Date().getFullYear();
yearNow.append(year);

/**
 * @function handleClickBurger()
 * @function handleClickLink()
 * @description Navigation click handler with toggle
 */

let isActive = false;
function handleClickBurger() {
	isActive = !isActive ? true : false;
	let state = isActive ? 'block' : 'none';
	mobileMenu.style.display = state;
}

function handleClickMenu() {
	isActive = false;
	mobileMenu.style.display = 'none';
}

/**
 * @function handleScrollToId()
 * @description Scroll to id with offset
 */

/**
 * Scroll y-axis offset value
 */

const yOffset = -150;

addGlobalEventListener('click', '#scroll-to-home', () => {
	handleScrollToId('#home');
});
addGlobalEventListener('click', '#scroll-to-about', () => {
	handleScrollToId('#about');
});
addGlobalEventListener('click', '#scroll-to-contact', () => {
	handleScrollToId('#contact');
});

function handleScrollToId(id) {
	const element = qs(id);
	const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
	window.scrollTo({ top: y, behavior: 'smooth' });
}

/**
 * Grid images
 */

const searchField = qs('#search-recipe');
const gridRecipes = qs('.grid-recipes');

async function searchRecipe(recipe) {
	const request = await fetch(
		`https://themealdb.com/api/json/v1/1/search.php?s=${recipe}`
	);
	return request.json();
}

const debounceSearchField = debounce((e) => {
	console.log(e.target.value);
	getItem(e.target.value);
	async function getItem(recipe) {
		const recipes = await searchRecipe(recipe);
		console.log(recipes.meals);
		recipes.meals.forEach((item) => {
			const gridItem = createElement('div', { class: 'item' });
			gridItem.innerHTML = `
				<img class="item-image" src="${item.strMealThumb}" alt="${item.strMeal}">
			`;
			gridRecipes.append(gridItem);
		});
	}
}, 1000);

addGlobalEventListener('input', '#search-recipe', (e) => {
	debounceSearchField(e);
});

/**
 * TODO: implement modal when image is clicked
 */

addGlobalEventListener('click', '.item-image', () => {
	alert('Hey!');
});
