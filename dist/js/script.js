function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
});;

AOS.init()

// Intro

const introBox = document.getElementById('intro_box')
const introBoxSecond = document.getElementById('intro_box_second')
const radioFirst = document.getElementById('radio_btn_1')
const radioSecond = document.getElementById('radio_btn_2')

let currBox = 1;

radioFirst.addEventListener('click',()=>{
  if(currBox == 1){
    return false
  }

  introBoxSecond.style.opacity = '0';
  introBoxSecond.style.position = 'absolute'
  introBoxSecond.style.display = 'none'

  
  setTimeout(()=>{
    introBoxSecond.style.display = 'none'
  }, 100),

  setTimeout(()=>{
    introBox.style.opacity = '1'
    
  }, 100)

  introBox.style.display = 'initial'
  introBox.style.position = 'initial'
  
  currBox = 1
})

radioSecond.addEventListener('click',()=>{
  if(currBox == 2){
    return false
  }

  introBox.style.opacity = '0';
  introBox.style.position = 'absolute'

  setTimeout(()=>{
    introBox.style.display = 'none'
  }, 100),

  setTimeout(()=>{
    introBoxSecond.style.opacity = '1'
  }, 100)

  introBoxSecond.style.position = 'relative'
  introBoxSecond.style.display = 'initial'
  
  currBox = 2
})


// Navigation
const navbarBtn = document.getElementById("navbar__btn")
const mobileBar = document.querySelector(".mobile_bar")
const listLinks = document.querySelectorAll('.list__link')

navbarBtn.addEventListener('click',(e)=>{

    e.currentTarget.classList.toggle('burger_active')

    mobileBar.classList.toggle("mb_bar_closed")

    if(mobileBar.classList.contains('bot_0')){
        mobileBar.classList.remove("bot_0")
    }else{
        setTimeout(()=>{
            mobileBar.classList.add("bot_0")
        },500)
    } 
})

listLinks.forEach((link)=>{

    link.addEventListener('click',(e)=>{
        mobileBar.classList.add("mb_bar_closed")
        mobileBar.classList.remove("bot_0")
        navbarBtn.classList.remove('burger_active')
    })

})

const anchors = document.querySelectorAll('a[href*="#"]')

const path = window.location.pathname

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    if(path !== "/" && path !== '/index.html'){
      window.location.pathname = '/index.html'
    }

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}