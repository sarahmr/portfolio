// -------------- NAVBAR SCROLL --------------------------

window.onscroll = function() { positionNavBar() };

let navbar = document.querySelector(".nav");

let sticky = navbar.offsetTop

window.addEventListener("resize", () => {
  sticky = window.innerHeight - 50
})

function positionNavBar() {
  // console.log("nav")
  // console.log(sticky, window.pageYOffset)
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// -------------- SECTION VIEW ON NAV ---------------------

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

let projectFigures = document.querySelectorAll(".project")

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

    let projectDescArea = document.createElement("div")
    projectDescArea.classList.add("modal-project-desc")

    let projectDesc = document.createElement("p")


    if (evt.target.alt === "Adventure Creator") {

      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/9UvM23tCceg"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "In Adventure Creator users can create, review, and play works of interactive fiction. The story editor features a tree-based scene display where users can visualize the structure of their stories. Adventure Creator was built using Rails and Postgres on the backend and React, CSS, React Drag and Drop, and SVG on the frontend."

      projectDescArea.append(projectDesc)

    } else if (evt.target.alt === "Stitcher") {

      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/7DiEqGG_5jo"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "With Stitcher, users can discover and create cross stitch designs. Users can view needed supplies and track their progress as they stitch the design using a progress bar on their private project page. Stitcher was built with Rails and React."

      projectDescArea.append(projectDesc)

    } else if (evt.target.alt === "Arcade") {
      
      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/wPV7-hq8PW8"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "Arcade users can play custom-built games, view leaderboards, and track their stats. This app is a vanilla Javascript single page application that utilizes a custom-built API to track player stats and general global and game-level leaderboards."

      projectDescArea.append(projectDesc)
    }

    // add close button to modal
    let exitModalButton = document.createElement("button")
    exitModalButton.classList.add("modal-button")

    let exitImage = document.createElement("img")
    exitImage.src = "assets/icons8-delete-100.png"

    exitModalButton.append(exitImage)

    exitModalButton.addEventListener("click", (evt) => {
      projectModal.style.display = "none"
      insideModal.innerHTML = ""
    })

    insideModal.append(exitModalButton, video, projectDescArea)
  })

)

window.addEventListener("click", (evt) => {
  // console.log(evt.target)
  if (evt.target === projectModal) {
    projectModal.style.display = "none"
    insideModal.innerHTML = ""
  }
})

// ------ cautious coder feed ----------------

let recentPosts = []
let postArea = document.querySelector(".blog-posts-area")

fetch("https://sarahmr.github.io/cautious-coder/feed")
.then(res => res.text())
.then(str => new window.DOMParser().parseFromString(str, "text/xml"))
.then(data => {
  recentPosts = data.querySelectorAll("entry")

  recentPosts.forEach(post => {
    postToHTML(post)
  })
})

let postToHTML = (post) => {
  // console.log(post)
  let singlePost = document.createElement("div")
  singlePost.classList.add("blog-post")

  let postLink = document.createElement("a")
  postLink.classList.add("blog-post-link")

  postLink.target = "_blank"
  postLink.href = `https://${post.querySelector("id").innerHTML}`

  let innerPost = document.createElement("div")
  innerPost.classList.add("blog-post-inner")

  let postImage = document.createElement("img")
  postImage.src = `https://${post.getElementsByTagName("media:content")[0].getAttribute("url")}`

  postImage.classList.add("blog-post-image")

  let postTitle = document.createElement("h4")
  postTitle.innerText = post.querySelector("title").innerHTML

  let postDesc = document.createElement("p")
  postDesc.innerText = post.querySelector("summary").innerHTML

  innerPost.append(postImage, postLink, postDesc)

  postLink.append(postTitle)

  singlePost.append(innerPost)

  postArea.append(singlePost)
}