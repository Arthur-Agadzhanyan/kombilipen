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