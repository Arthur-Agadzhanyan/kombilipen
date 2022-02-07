@@include('webpTest.js');

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