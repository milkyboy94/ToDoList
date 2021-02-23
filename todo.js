const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];
//할일 목록을 저장해야하므로 array 생성

function deleteToDo(event) {
  const li = event.target.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  //   filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고
  //   새로운 array를 만든다.
  //   즉, 위 사례에서 cleanTodos와 filter가 하는 것은 filterFn이 체크된 아이템들의
  //   array를 주는 것이다.
  toDos = cleanToDos;
  saveToDos();
}

// Q.why not crushing with const li in paintToDo? as its both const li?
// A.Because is inside of another function.
// This 'li' only lives inside of deleteToDo :)
// When you create a const inside of a function, it is only alive inside of the function.

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //자바스크립트는 localstorage에 있는 모든 데이터를 string으로 저장하려한다
  // stringify는 자바스크립트 object를 string으로 바꿔준다
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "👍";
  delBtn.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();

  //push를 써서 array 안에 element 하나를 넣어줄 수 있음
}

function handleSubmit(event) {
  event.preventDefault();

  if (toDos.length > 4) {
    alert(`하루일과 다섯개 초과해서 쓰지마셈
어차피 다 못하잖아`);
  } else {
    paintToDo(toDoInput.value);
    toDoInput.value = "";
  }
}

function something(toDo) {
  paintToDo(toDo.text);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    //parse는 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 기능
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(something);
  }
  //loadedToDos가 null일때는 아무것도 하지 않는다.
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
