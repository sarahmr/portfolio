// -------------- NAVBAR SCROLL --------------------------

// When the user scrolls the page, execute myFunction
window.onscroll = function() { myFunction() };

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

// --------- PROJECT MODALS ------------------------------------

// on click pop out video in modal with brief description

let projectFigures = document.querySelectorAll("figure")

let projectModal = document.querySelector(".modal")
let insideModal = document.querySelector(".modal-content")

projectFigures.forEach(figure => 
  figure.addEventListener("click", (evt) => {
    // open modal
    projectModal.style.display = "block"

    // embed youtube
    // add text to modal

    let video = document.createElement("iframe")
    video.classList.add("modal-video")

    let projectDesc = document.createElement("p")
    projectDesc.classList.add("modal-project-desc")

    if (evt.target.alt === "Adventure Creator") {

      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/9UvM23tCceg"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "Built using Rails & React, in Adventure Creator users can create, review, and play works of interactive fiction."

    } else if (evt.target.alt === "Stitcher") {

      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/7DiEqGG_5jo"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "With Stitcher, users can discover & create cross stitch designs, view needed supples, and track their progress as they stitch the design."

    } else if (evt.target.alt === "Arcade") {
      
      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/wPV7-hq8PW8"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "Users can play custom-built games, view leaderboards, and track their stats."

    }

    // add close button to modal
    let exitModalButton = document.createElement("button")
    exitModalButton.classList.add("modal-button")

    exitModalButton.innerText = "X"

    exitModalButton.addEventListener("click", (evt) => {
      projectModal.style.display = "none"
      insideModal.innerHTML = "none"
    })

    insideModal.append(exitModalButton, video, projectDesc)
  })

)

window.addEventListener("click", (evt) => {
  // console.log(evt.target)
  if (evt.target === projectModal) {
    projectModal.style.display = "none"
    insideModal.innerHTML = ""
  }
})