const slider = document.querySelector('.slider')
const sliderList = document.querySelector('.slider-list')
const sliderItems = document.querySelectorAll('.slider-list__item')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
let activeSlide = 0
let timeMove = 1000
let moveSlide = 100
let dir = 'x'

sliderItems.forEach(function(slide, key){
    if(key != activeSlide){
        slide.style.transform = `translate${dir}(${moveSlide}%)`
    }
    if(key == sliderItems.length - 1){
        slide.style.transform = `translate${dir}(${-moveSlide}%)`
    }
})

prevBtn.addEventListener('click', function(){move(prevBtn)})
nextBtn.addEventListener('click', function(){move(nextBtn)})

function move(btn){
    nextBtn.disabled = true
    prevBtn.disabled = true
    setTimeout(() => {
        nextBtn.disabled = false
        prevBtn.disabled = false
    },timeMove + 200);

    let btnPrevOrNext = btn == nextBtn ? -moveSlide : moveSlide
    sliderItems.forEach(function(slide, key){
        if(key != activeSlide){
            slide.style.transform = `translate${dir}(${-btnPrevOrNext}%)`
            slide.style.transition = '0ms'
        }
    })
    setTimeout(() => {
        sliderItems[activeSlide].style.transform = `translate${dir}(${btnPrevOrNext}%)`
        sliderItems[activeSlide].style.transition = `${timeMove}ms`
        sliderDots[activeSlide].classList.remove('active')
        if(btn == nextBtn){
            activeSlide++
            if(activeSlide > sliderItems.length - 1){
                activeSlide = 0
            }
        }else if(btn == prevBtn){
            activeSlide--
            if(activeSlide < 0){
                activeSlide = sliderItems.length - 1
            }
        }
        sliderItems[activeSlide].style.transform = `translate${dir}(0%)`
        sliderItems[activeSlide].style.transition = `${timeMove}ms`
        sliderDots[activeSlide].classList.add('active')
    });
}

// dots 
const ul = document.createElement('ul')
ul.classList.add('slider-dots')
sliderItems.forEach(function(){
    const li = document.createElement('li')
    ul.append(li)
})
slider.append(ul)
const sliderDots = document.querySelectorAll('.slider-dots li')
sliderDots[activeSlide].classList.add('active')
sliderDots.forEach(function(dot, key){
    dot.addEventListener('click', function(){controllersDots(key)})
})
let active = true 
function controllersDots(dotKey){
    if(active && dotKey != activeSlide){
        sliderItems.forEach(function(slide){
            slide.style.transition = `0ms`
        })
        nextBtn.disabled = true
        prevBtn.disabled = true
        active = false
        sliderDots.forEach(function(dot){dot.classList.remove('active')})
        let moveLeftOrRight = dotKey > activeSlide ? -moveSlide : moveSlide
        sliderItems[dotKey].style.transform = `translate${dir}(${-moveLeftOrRight}%)`
        setTimeout(() => {
            sliderItems[activeSlide].style.transform = `translate${dir}(${moveLeftOrRight}%)`
            sliderItems[activeSlide].style.transition = `${timeMove}ms`
            sliderDots[activeSlide].classList.remove('active')
            activeSlide = dotKey   
            sliderItems[activeSlide].style.transform = `translate${dir}(0%)`
            sliderItems[activeSlide].style.transition = `${timeMove}ms`
            sliderDots[activeSlide].classList.add('active')   
        });
        setTimeout(() => {
            nextBtn.disabled = true
            prevBtn.disabled = true
            active = true
        }, timeMove+200);
    }
}


// mouseenter mouseleave
let autoPlay = setInterval(() => {
    move(nextBtn)
}, timeMove + 1000);
slider.addEventListener('mouseenter', function(){
    clearInterval(autoPlay)
})
slider.addEventListener('mouseleave', function(){
    autoPlay = setInterval(() => {
        move(nextBtn)
    }, timeMove + 1000);
})