// -------------- NAVBAR SCROLL --------------------------

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
let navbar = document.querySelector(".nav");

// Get the offset position of the navbar
let sticky = navbar.offsetTop

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// -------------- SECTION VIEW ---------------------

let navItems = document.querySelectorAll(".nav-item a")
let mainDisplay = document.querySelector(".main-display")
let pageSections = document.querySelectorAll("section")

let currentPage = "bio"

navStyleSelected(currentPage)

navItems.forEach(nav => {
  nav.addEventListener("click", (evt) => {
    currentPage = evt.target.innerText.toLowerCase()
    navStyleSelected(currentPage)
  })
})

function navStyleSelected(currentPage){
  navItems.forEach(item => {
    if (item.innerText.toLowerCase() === currentPage) {
      item.classList.add("active")
    } else {
      item.classList.remove("active")
    }
  })
}

function sectionScroll(){
  let index = pageSections.length

  while(--index && window.scrollY + 100 < pageSections[index].offsetTop) {}

  navItems.forEach(item => item.classList.remove("active"))

  if (index > 0) {
    navItems[index - 1].classList.add("active")
  }
}

window.addEventListener("scroll", sectionScroll)

