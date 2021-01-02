// -------------- NAVBAR SCROLL --------------------------

window.onscroll = function() { positionNavBar() };

let navbar = document.querySelector(".nav");

let sticky = navbar.offsetTop

window.addEventListener("resize", () => {
  sticky = navbar.offsetTop
})

function positionNavBar() {
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
    let projectBulletPoints = document.createElement("ul")


    if (evt.target.alt === "Adventure Creator") {

      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/9UvM23tCceg"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "Built using Rails & React, in Adventure Creator users can create, review, and play works of interactive fiction."

      // let bulletPointA = document.createElement("li")
      // bulletPointA.innerText = "Developed a user-friendly, tree-based story editor with React, React Drag and Drop, and SVG"

      // let bulletPointC = document.createElement("li")
      // bulletPointC.innerText = "Built a reviews API that allows users to view, add, and aggregate reviews and display average ratings"

      // let bulletPointD = document.createElement("li")
      // bulletPointD.innerText = "RESTful API backend utilizing JSON Web Tokens for user authentication"

      // projectBulletPoints.append(bulletPointA, bulletPointC, bulletPointD)

      projectDescArea.append(projectDesc)

    } else if (evt.target.alt === "Stitcher") {

      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/7DiEqGG_5jo"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "With Stitcher, users can discover & create cross stitch designs, view needed supples, and track their progress as they stitch the design."

      // let bulletPointA = document.createElement("li")
      // bulletPointA.innerText = "Developed a design-creator with React and CSS where users can create cross stitch patterns and identify required thread supplies for a list on the design-details page"

      // let bulletPointB = document.createElement("li")
      // bulletPointB.innerText = "Implemented a progress bar and visual cues that allow users to track their progress as they're stitching a design"      

      // projectBulletPoints.append(bulletPointA, bulletPointB)

      projectDescArea.append(projectDesc)

    } else if (evt.target.alt === "Arcade") {
      
      video.width = "560"
      video.height = "315"
      video.src = "https://www.youtube.com/embed/wPV7-hq8PW8"
      video.allowfullscreen = true
      video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

      projectDesc.innerText = "Users can play custom-built games, view leaderboards, and track their stats."

      // let bulletPointA = document.createElement("li")
      // bulletPointA.innerText = "Developed a dynamic single-page application with several different views using pure Javascript"

      // let bulletPointB = document.createElement("li")
      // bulletPointB.innerText = "Built an API to track player stats and generate global and game-level leaderboards"

      // projectBulletPoints.append(bulletPointA, bulletPointB)

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
  let singlePost = document.createElement("div")
  singlePost.classList.add("blog-post")

  let postTitleLink = document.createElement("a")
  postTitleLink.classList.add("blog-post-link")

  postTitleLink.target = "_blank"
  postTitleLink.href = `https://${post.querySelector("id").innerHTML}`

  let innerPost = document.createElement("div")
  innerPost.classList.add("blog-post-inner")

  let postImage = document.createElement("img")
  postImage.src = `https://${post.getElementsByTagName("media:content")[0].getAttribute("url")}`

  postImage.classList.add("blog-post-image")

  let postTitle = document.createElement("p")
  postTitle.innerText = post.querySelector("title").innerHTML

  innerPost.append(postImage, postTitle)

  postTitleLink.append(innerPost)

  singlePost.append(postTitleLink)

  postArea.append(singlePost)
}