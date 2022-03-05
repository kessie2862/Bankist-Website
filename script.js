"use strict";

///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

// MODAL WINDOW
// Removing the hidden style from the css for the modal to show
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Adding back the hidden style to the css to hide the modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// looping over the btnsOpenModal where [i] is the current element
// and then listening to event on it
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

// listening to event on the overlay and btnCloseModal btns
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Removing the modal when the escape key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////
// BUTTON SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  // console.log(
  //   "height/width viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling (from 'learn more' btn to 'Features' section)
  // Current position + Current scroll
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Smooth scrolling (from 'learn more' btn to 'Features' section)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Best solution to scrolling (This 👇 does all the above)
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////
// Page Navigation
// adding an eventListener to each nav__Link

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log(this);
//     // reading the 'href' attributes in the 'nav__links;
//     const id = this.getAttribute("href");

//     // Selecting an "id" element and scrolling to it
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Best Alternative👇👇(Best solution to scrolling using event delegation)
// 1. Add Event Listener to a common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  // Matching Strategy(Checking if the target element contains "nav__link")
  if (e.target.classList.contains("nav__link")) {
    // reading the 'href' attribute from the 'nav__links (target element)
    const id = e.target.getAttribute("href");
    console.log(id);

    // Selecting an "id" element and scrolling to it
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Adding event listener to the buttons i.e tabs
// tabs.forEach(function (tab) {
//   tab.addEventListener("click", function () {
//     console.log("Tab");
//   });
// });

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // removing the active class from the "operations__tab--active"
  tabs.forEach(function (tab) {
    tab.classList.remove("operations__tab--active");
  });

  // removing the active class from the "operations__content--active"
  tabsContent.forEach(function (content) {
    content.classList.remove("operations__content--active");
  });

  // Adding back or activating the active tab
  clicked.classList.add("operations__tab--active");

  // Activating the content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/*
// Selecting elements
console.log(document.documentElement); // Selects the whole document
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header"); // Selects the first element that matches the selector
console.log(header);
const allSections = document.querySelectorAll(".section"); // Returns all elemente that matches the selector
console.log(allSections);
const section1 = document.getElementById("section--1");
console.log(section1);
const allBtns = document.getElementsByTagName("button");
console.log(allBtns);
console.log(document.getElementsByClassName("btn"));

// Creating and Inserting elements
// creating a div element and adding "cookie-message" class to it
const message = document.createElement("div");
message.classList.add("cookie-message");
// Inserting a text into the div element
// message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true)); //Inserts multiple copy of the same element i.e message

header.before(message); //Inserts the message element before the header element
// header.after(message); //Inserts the message element after the header element

let div = document.createElement("div");
let p = document.createElement("p");
let span = document.createElement("span");
div.prepend(p);
div.append(span);
console.log(div.childNodes);

// header.before(message);
// header.after(message);

// Delete the div element i.e message from the DOM
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    message.parentElement.removeChild(message);
  }); */

/*
// Event Propagetion or Event Bubbling

// rgb(255, 255, 255)
// Function that always returns a random number
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Creating a random color
const randomColor = function () {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(
    0,
    255
  )})`;
};

// In an eventHandler, the this keyword always points to the element on
// which that event handler is attached
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  // Event.target is where an events originates or where an event happened
  console.log("LINK", e.target, e.currentTarget);
  // e.currentTarget and this keyword are the same in any event handler.
  console.log(e.currentTarget === this);

  // stop event propagation\
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
});

const h1 = document.querySelector("h1");

function alertH1(e) {
  alert("addEventLister: Great! You are reading the heading :D");

  // removing eventListener from the h1
  h1.removeEventListener("mouseenter", alertH1);
}

h1.addEventListener("mouseenter", alertH1);


const h1 = document.querySelector("h1");

// Going downwards: Selecting child elements of h1
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = "red";
h1.lastElementChild.style.color = "blue";

// Going upwards: Selecting Parent elements of h1
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest(".header").style.background = "orange";
h1.closest("h1").style.background = "green";

// Going sideways: Selecting Sibling elements of h1
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.parentElement.children);
*/
