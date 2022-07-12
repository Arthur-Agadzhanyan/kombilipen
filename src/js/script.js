@@include('webpTest.js');

AOS.init()

// Intro
const path = window.location.pathname

if(path == "/" || path == '/index.html'){
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
}

// Navigation
const navbarBtn = document.getElementById("navbar__btn")
const mobileBar = document.querySelector(".mobile_bar")
const listLinks = document.querySelectorAll('.list__link')
const navbarBtnLink = document.querySelector('.navbar__btn_link')

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

navbarBtnLink.addEventListener('click',(e)=>{
  mobileBar.classList.add("mb_bar_closed")
  mobileBar.classList.remove("bot_0")
  navbarBtn.classList.remove('burger_active')
})

const anchors = document.querySelectorAll('a[href*="#"]')



for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    if(anchor.getAttribute('href') === "#"){
      return false
    }

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

// MODAL

const specModalBtn = document.querySelector('#spec_modal_btn')
const specModalCheckbox = document.querySelector('#spec_modal_checkbox')
const specModalCheckboxText = document.querySelector('#spec_modal_checkbox_text')
const specModalText = document.querySelector('#spec_modal_text')


if(specModalBtn && MicroModal){
  MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: 'data-custom-open', // [3]
    closeTrigger: 'data-custom-close', // [4]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: true // 
  });
  // check__text-error
  
  
  specModalBtn.addEventListener('click',()=>{
    if(!specModalCheckbox.checked){
      specModalCheckboxText.classList.remove('check__text-error')
      specModalCheckboxText.classList.add('check__text-error')
    }else{
      specModalCheckbox.checked = false
    }
  })
  
  specModalCheckbox.addEventListener('change',()=>{
    if(specModalCheckbox.checked){
      specModalText.classList.remove('content__info-hidden')
      specModalCheckboxText.classList.remove('check__text-error')
      specModalBtn.href = 'https://combilipen.medicina360.ru'
    }else{
      specModalText.classList.add('content__info-hidden')
      specModalBtn.href = '#'
    }
  })
  
  specModalBtn.addEventListener
}