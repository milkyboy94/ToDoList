const form = document.querySelector(".js-form"),
  input = form.querySelector("input");
greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem("currentUser", text);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();
  paintGreeting(input.value);
  saveName(input.value);
}

function askForName() {
  form.classList.add("showing");
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
    // 유저가 있을때에는 로컬 스토리지에서 가져온 텍스트와 함께 paintGreeting 함수 호출
  }
}

function init() {
  loadName();
}

init();
