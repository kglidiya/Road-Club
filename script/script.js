//Popup

const popupOpenBtn = document.querySelector(".header__button");
const popupCloseBtn = document.querySelector(".popup__button");
const popup = document.querySelector(".popup");
const popupLinks = document.querySelectorAll(".popup__link");
const anchorsPopup = document.querySelectorAll('.popup__link a[href*="#"]');

function openPopup() {
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

popupOpenBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);

//Pipup links

for (let anchor of anchorsPopup) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        closePopup();
        const blockID = anchor.getAttribute("href").substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}

const anchors = document.querySelectorAll('.header__links a[href*="#"]');
const bikes = document.querySelector("#bikes");

for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const blockID = anchor.getAttribute("href").substr(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}

//Button Intro (green)

const button = document.querySelector(".introduction__button");
button.addEventListener("click", changeBtnColor);

function changeBtnColor() {
    button.classList.add("introduction__button_animation");
    setTimeout(function () {
        button.classList.remove("introduction__button_animation");
        bikes.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, 500);

}


//Filter bikes

const filters = document.querySelectorAll(".card");
const radioBtns = document.querySelectorAll(
    ".bikes__header_invisible-checkbox"
);

radioBtns.forEach(function (btn) {
    let filterParameter = btn.dataset["type"];
    filters.forEach(function (card) {
        if (!btn.checked && card.classList.contains(filterParameter)) {
            card.style.display = "none";
        }
    });
});

radioBtns.forEach(function (btn) {
    btn.addEventListener("click", filter);
});

function filter(evt) {
    let filterParameter = evt.target.dataset["type"];
    filters.forEach(function (card) {
        if (card.classList.contains(filterParameter)) {
            card.style.display = "flex";
        } else card.style.display = "none";
    });
}

let sliderPosition = 0;
let slidesToShow = 2;
let slidesToScroll = 2;
const sliderTrack = document.querySelector(".slider__track");
const allItems = document.querySelectorAll(".slider__item");
const sliderTrackMobile = document.querySelector(".slider__track_mobile");
const allItemsMobile = document.querySelectorAll(".slider__item_mobile");
const itemCount = allItems.length;
const itemCountMobile = allItemsMobile.length;
const sliderItemWidth = sliderTrack.clientWidth / slidesToShow + 20;
const sliderItemWidthMobile = sliderTrackMobile.clientWidth / slidesToShow + 20;
const movePosition = slidesToScroll * sliderItemWidth;
const movePositionMobile = slidesToScroll * sliderItemWidthMobile;
const sliderButtonPrev = document.querySelector(".slider__button_back");
const sliderButtonNext = document.querySelector(".slider__button_forward");
const sliderButtonPrevMobile = document.querySelector(
    ".slider__button_mobile_back"
);
const sliderButtonNextMobile = document.querySelector(
    ".slider__button_mobile_forward"
);
const mediaQuery = window.matchMedia("(max-width: 576px)");

let move;
let widthCurrent;

function adjustWidth() {
    allItems.forEach(function (item) {
        item.style.width = `${sliderTrack.clientWidth / slidesToShow}px`;
    });
    widthCurrent = `${sliderTrack.clientWidth / slidesToShow + 40}`;
    move = widthCurrent * 2;

    if (mediaQuery.matches) {
        slidesToShow = 1;
    }
    if (!mediaQuery.matches) {
        slidesToShow = 2;
    }
}

adjustWidth();
window.addEventListener("resize", adjustWidth);

function adjustWidthMobile() {
    allItemsMobile.forEach(function (item) {
        item.style.width = `${sliderTrackMobile.clientWidth / slidesToShow}px`;
    });
    sliderPosition = 0;
    sliderTrack.style.transform = `translateX(${sliderPosition}px`;
    widthCurrent = `${sliderTrackMobile.clientWidth / slidesToShow + 40}`;
    moveMobile = widthCurrent * 2;
    if (mediaQuery.matches) {
        slidesToShow = 1;
    }
    if (!mediaQuery.matches) {
        slidesToShow = 2;
    }
}
adjustWidthMobile();
window.addEventListener("resize", adjustWidthMobile);

sliderButtonNext.addEventListener("click", function () {
    slideForward();
    checkBtn();
    changeSliderIconForward();
});
sliderButtonNextMobile.addEventListener("click", function () {
    slideForwardMobile();
    checkBtn();
    changeSliderIconForwardMob();
});

function slideForward() {
    sliderPosition -= move;
    sliderTrack.style.transform = `translateX(${sliderPosition}px`;
}

function slideForwardMobile() {
    sliderPosition -= moveMobile;
    sliderTrackMobile.style.transform = `translateX(${sliderPosition}px`;
}

sliderButtonPrev.addEventListener("click", function () {
    slideBack();
    checkBtn();
    changeSliderIconBackward();
});

sliderButtonPrevMobile.addEventListener("click", function () {
    slideBackMobile();
    checkBtn();
    changeSliderIconBackwardMob();
});

function slideBack() {
    sliderPosition += move;
    sliderTrack.style.transform = `translateX(${sliderPosition}px`;
}

function slideBackMobile() {
    sliderPosition += moveMobile;
    sliderTrackMobile.style.transform = `translateX(${sliderPosition}px`;
}

const checkBtn = function () {
    widthCurrent = `${sliderTrack.clientWidth / slidesToShow + 40}`;
    console.log( -sliderTrackMobile.clientWidth * 3)
    console.log(sliderPosition)

    if (sliderPosition === 0) {
        sliderButtonPrev.disabled = true;
        sliderButtonPrevMobile.disabled = true;
        sliderButtonNext.disabled = false;
        sliderButtonNextMobile.disabled = false;
    } 

    if (sliderPosition === -widthCurrent * 4) {
        sliderButtonNext.disabled = true;
      
    }

    if (sliderPosition === -(sliderTrackMobile.clientWidth * 3 + 472)) {
        sliderButtonNextMobile.disabled = true;
    }

    else if (sliderPosition < 0) {
        sliderButtonPrev.disabled = false;
        sliderButtonPrevMobile.disabled = false;
    }
 

};

checkBtn();

//Change slider icon

const sliderIcon = document.querySelector(".slider__icon");
let sliderTitles = document.querySelectorAll(".slider .title");
let sliderText = document.querySelector(".road-type .text");
const sliderIconMobile = document.querySelector(".slider__icon_mobile");

function changeSliderIconForward() {
    if (sliderPosition == -move) {
        sliderIcon.style.background = `url(./images/gravel.svg) no-repeat center, url(./images/green-rect.svg) no-repeat`;
    }
    if (sliderPosition == -(move * 2)) {
        sliderIcon.style.background = `url(./images/tt.svg) no-repeat center, url(./images/green-rect.svg) no-repeat`;
    }
}

function changeSliderIconBackward() {
    if (sliderPosition == -move) {
        sliderIcon.style.background = `url(./images/gravel.svg) no-repeat center, url(./images/green-rect.svg) no-repeat`;
    }
    if (sliderPosition == 0) {
        sliderIcon.style.background = `url(./images/highway.svg) no-repeat center, url(./images/green-rect.svg) no-repeat`;
    }
}

function changeSliderIconForwardMob() {
    if (sliderPosition == -moveMobile) {
        sliderIconMobile.style.background = `url(./images/gravel.svg) no-repeat 4px 8px, url(./images/green-small.svg) no-repeat`;
    }
    if (sliderPosition == -(moveMobile * 2)) {
        sliderIconMobile.style.background = `url(./images/tt.svg) no-repeat 4px 15px, url(./images/green-small.svg) no-repeat`;
    }
}

function changeSliderIconBackwardMob() {
    if (sliderPosition == -moveMobile) {
        sliderIconMobile.style.background = `url(./images/gravel.svg) no-repeat 4px 8px, url(./images/green-small.svg) no-repeat`;
    }
    if (sliderPosition == 0) {
        sliderIconMobile.style.background = `url(./images/highway.svg) no-repeat 4px 5px, url(./images/green-small.svg) no-repeat`;
    }
}

//Input 
const inputBtn = document.querySelector(".footer__button");
const input = document.querySelector(".footer__input");

inputBtn.style.display = "none";

function showBtn() {
    input.placeholder = "";
    inputBtn.style.display = "block";
}

function hideBtn() {
    inputBtn.style.display = "none";
    input.value = "";
    input.placeholder = "Круто!";
}

input.addEventListener("focus", showBtn);
inputBtn.addEventListener("click", hideBtn);

//Bikes filters

const bikesContainer = document.querySelector(".bikes__card-container");
const card = document.querySelector(".card");
const mediaQueryMobile = window.matchMedia("(max-width: 414px)");
const mediaQuerySmall = window.matchMedia("(max-width: 576px)");


//select

const select = document.querySelector(".bikes__select");
const options = document.querySelectorAll(".bikes__select_option");
const dots = document.querySelectorAll(".card__dot");


select.addEventListener("change", filterCards);

function filterCards() {
    options.forEach(function (option) {
        let curentOption = option.value;
        filters.forEach(function (card) {
            if (option.selected && card.classList.contains(curentOption)) {
                card.style.display = "flex";
            } else if (!option.selected && card.classList.contains(curentOption)) {
                card.style.display = "none";
            }
        });
    });
}

const cardsAll = [...filters];
const cardsActiveHighway = cardsAll.filter(function (card) {
    return card.classList.contains("highway");
});
const cardsActiveGravel = cardsAll.filter(function (card) {
    return card.classList.contains("gravel");
});
const cardsActiveTt = cardsAll.filter(function (card) {
    return card.classList.contains("tt");
});

let posX1 = 0;
let posX2 = 0;
let threShold;




bikesContainer.addEventListener("touchstart", handleTouchStart);
bikesContainer.addEventListener("touchmove", handleTouchMove);
bikesContainer.addEventListener("dragstart", dragstart);
bikesContainer.addEventListener("dragend", dragsend);


function handleTouchStart(evt) {

    posX2 = evt.target.clientWidth;
    const touch = evt.touches[0];
    posX1 = touch.clientX;

}


function dragstart(evt) {

    if (mediaQueryMobile.matches || mediaQuerySmall.matches) {
        posX1 = evt.offsetX;
    }

}


function dragsend(evt) {

    if (mediaQueryMobile.matches || mediaQuerySmall.matches) {
        posX2 = evt.offsetX;
        posDelta = posX1 - posX2;

        cardsActiveHighway.forEach(function (card) {
            dots.forEach(function () {
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveHighway[0].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveHighway[1].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth * 2 + 60}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.add('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveHighway[2].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveHighway[1].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(0px)`;
                    dots[0].classList.add('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.remove('card__dot_active');

                }
            })
        });





        cardsActiveGravel.forEach(function (card) {
            dots.forEach(function () {
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveGravel[0].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveGravel[1].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth * 2 + 60}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.add('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveGravel[2].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveGravel[1].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(0px)`;
                    dots[0].classList.add('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.remove('card__dot_active');

                }
            })
        });



        cardsActiveTt.forEach(function (card) {
            dots.forEach(function () {
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveTt[0].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveTt[1].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth * 2 + 60}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.add('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveTt[2].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveTt[1].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(0px)`;
                    dots[0].classList.add('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.remove('card__dot_active');

                }
            })
        });
    } else if (!mediaQueryMobile.matches || !mediaQuerySmall.matches) {
        return false;
    }
}


function handleTouchMove(evt) {
    if (mediaQueryMobile.matches || mediaQuerySmall.matches) {
        posX2 = evt.touches[0].clientX;
        posDelta = posX1 - posX2;

        cardsActiveHighway.forEach(function (card) {
            dots.forEach(function () {
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveHighway[0].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveHighway[1].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth * 2 + 60}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.add('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveHighway[2].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveHighway[1].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(0px)`;
                    dots[0].classList.add('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.remove('card__dot_active');

                }
            })
        });


        cardsActiveGravel.forEach(function (card) {
            dots.forEach(function () {
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveGravel[0].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveGravel[1].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth * 2 + 60}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.add('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveGravel[2].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveGravel[1].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(0px)`;
                    dots[0].classList.add('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.remove('card__dot_active');

                }
            })
        });



        cardsActiveTt.forEach(function (card) {
            dots.forEach(function () {
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveTt[0].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }
                if (
                    posDelta > 30 &&
                    evt.target === cardsActiveTt[1].childNodes[1].childNodes[1]
                ) {
                    card.style.transform = `translateX(-${card.clientWidth * 2 + 60}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.add('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveTt[2].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(-${card.clientWidth + 30}px)`;
                    dots[0].classList.remove('card__dot_active');
                    dots[1].classList.add('card__dot_active');
                    dots[2].classList.remove('card__dot_active');
                }

                if (posDelta <= -30 &&
                    evt.target === cardsActiveTt[1].childNodes[1].childNodes[1]) {
                    card.style.transform = `translateX(0px)`;
                    dots[0].classList.add('card__dot_active');
                    dots[1].classList.remove('card__dot_active');
                    dots[2].classList.remove('card__dot_active');

                }
            })
        });
    }
}



//Theme dark

const switchers = document.querySelectorAll(".footer__switcher");

const switcherThumb = window.getComputedStyle(
    document.querySelector(".footer__switcher"),
    ":after"
);
const page = document.querySelector(".page");
const footer = document.querySelector(".footer");
const titles = document.querySelectorAll(".title");
const texts = document.querySelectorAll(".text");
const linksHeader = document.querySelectorAll(".header__links-item");
const linkIntro = document.querySelector(".introduction__link");
const imagesIntro = document.querySelectorAll(".introduction__image");
const titleMoto = document.querySelector(".motto__quote");
const authorMoto = document.querySelector(".motto__author");
const filterLinks = document.querySelectorAll(".bikes__header_radio");
const cards = document.querySelectorAll(".card__image-container");
const cardLinks = document.querySelectorAll(".card__link");
const links = document.querySelectorAll(".link");
const footerTitle = document.querySelector(".footer__title");
const popupLinksAll = document.querySelectorAll(".popup__links-item");
const switcherMobile = document.querySelector(".footer__switch-icon_mobile");


switchers.forEach(function (el) {
    el.addEventListener("click", switchThemeDark);
});


function switchThemeDark() {

    switchers.forEach(function (el) {
        el.classList.toggle("footer__switcher_theme_dark");
        el.classList.toggle("footer__switcher_active");
    });
    popup.classList.toggle("popup_opened_theme_dark");
    popupOpenBtn.classList.toggle("header__button_theme_dark");
    popupLinksAll.forEach(function (link) {
        link.classList.toggle("popup__links-item_theme_dark");
    });
    popupCloseBtn.classList.toggle("popup__button_theme_dark");
    page.classList.toggle("page_theme_dark");
    footer.classList.toggle("footer_theme_dark");
    titles.forEach(function (title) {
        title.classList.toggle("title_theme_dark");
    });
    texts.forEach(function (text) {
        text.classList.toggle("text_theme_dark");
    });
    linksHeader.forEach(function (link) {
        link.classList.toggle("header__links-item_theme_dark");
    });
    linkIntro.classList.toggle("introduction__link_theme_dark");
    imagesIntro.forEach(function (image) {
        image.classList.toggle("introduction__image_theme_dark");
    });
    titleMoto.classList.toggle("title_theme_dark");
    authorMoto.classList.toggle("title_theme_dark");
    sliderButtonPrev.classList.toggle("slider__button_back_theme_dark");
    sliderButtonNext.classList.toggle("slider__button_forward_theme_dark");
    filterLinks.forEach(function (link) {
        link.classList.toggle("bikes__header_radio_theme_dark");
    });
    cards.forEach(function (card) {
        card.classList.toggle("card__image-container_theme_dark");
    });
    cardLinks.forEach(function (link) {
        link.classList.toggle("card__link_theme_dark");
    });
    links.forEach(function (link) {
        link.classList.toggle("link_theme_dark");
    });
    footerTitle.classList.toggle("footer__title_theme_dark");
    input.classList.toggle("footer__input_theme_dark");
    inputBtn.classList.toggle("footer__button_theme_dark");
    bikesContainer.classList.toggle("bikes__card-container_theme_dark");
    select.classList.toggle("bikes__select_theme_dark");
    switcherMobile.classList.toggle("footer__switch-icon_mobile_theme_dark");
}

