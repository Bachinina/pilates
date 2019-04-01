// menu
const menu = document.querySelector(".header__menu");
const menuButton = document.querySelector(".header__button");

menuButton.addEventListener("click", function () {
  if (menuButton.classList.contains("header__button--open")) {
    menuButton.classList.remove("header__button--open");
    menuButton.classList.add("header__button--close");
    menu.classList.remove("hidden");
  } else {
    menuButton.classList.remove("header__button--close");
    menuButton.classList.add("header__button--open");
    menu.classList.add("hidden")
  }
});

// feedback-slider
const commentsButton = [...document.querySelectorAll(".feedback__button")];
const comments = [...document.querySelectorAll(".comment")];

function checkComment(button, comment) {
  button.addEventListener("focus", function () {
    commentsButton.forEach((btn) => btn.classList.remove("feedback__button--checked"));
    button.classList.add("feedback__button--checked");

    comments.forEach((cmt) => cmt.classList.add("hidden"));
    comment.classList.remove("hidden");
  })
};

for (let i = 0; i < commentsButton.length; i++) {
  checkComment(commentsButton[i], comments[i]);
}

// modal
const registrationButton = [...document.querySelectorAll(".card__button")];
const registrationClose = document.querySelector(".modal__button-close");
const registration = document.querySelector(".modal");

registrationButton.forEach(btn => {
  btn.addEventListener("click", function (evt) {
    evt.preventDefault();
    registration.classList.remove("hidden");
  })
});

registrationClose.addEventListener("click", function () {
  registration.classList.add("hidden");
});

document.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    registration.classList.add("hidden");
  };
})
