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

let currentPage = "bio"

navStyleSelected(currentPage)

navItems.forEach(nav => {
  nav.addEventListener("click", (evt) => {
    currentPage = evt.target.innerText.toLowerCase()
    resetMainDisplay(currentPage)
    navStyleSelected(currentPage)
  })
})


let resetMainDisplay = (currentPage) => {
  for (let i = 0; i < mainDisplay.children.length; i++) {
    if (mainDisplay.children[i].id === currentPage) {
      mainDisplay.children[i].style.display = "grid"
    } else {
      mainDisplay.children[i].style.display = "none"
    } 
  }
}

// why does this override my text color hover? how to get it back?
function navStyleSelected(currentPage){
  navItems.forEach(item => {
    if (item.innerText.toLowerCase() === currentPage) {
      item.style["border-bottom"] = "2px solid black"
      item.style.color = "pink"
    } else {
      item.style["border-bottom"] = "none"
      item.style.color = "white"
    }
  })
}


