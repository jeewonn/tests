//json 파일로부터 아이템을 받아옴 <2>
//fetch를 이용해 데이터를 받아오고, 받아오면 데이터가 성공적이면 json 으로 변환하고, json 안에 있는 items를 리턴함.
function loadItems() {
  return fetch("data/data.json") //네트워크를 통해 데이터 받아오기
    .then((response) => response.json()) //fetch는 response 라는 object 를 받아옴, response obj 에 있는 json 이라는 api 를 이용해 response 바디를 response obj로 변환.
    .then((json) => json.items);
}

//items 이라는 인자를 받아옴.
//받아온 items 라는 데이터를 html 요소로 변환해서 페이지에 표기가 되도록 만든다.
function displayItems(items) {
  const container = document.querySelector(".items"); //먼저, 부모 컨테이너안에 추가 해야됨.
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

//받은 아이템으로 html 만들기
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item_thumnail" />
  <span class="item_descrition">${item.gender}, ${item.size}</span> 
</li>
`;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
  console.log(filtered);
}

function setEventListners(items) {
  const logo = document.querySelector(".logo");
  const button = document.querySelector(".button");
  logo.addEventListener("click", () => displayItems(items));
  button.addEventListener("click", (event) => onButtonClick(event, items));
}

// main, 아이템을 받아옴 (맨처음 만듦, 아직 없는 함수 3개를 호출.) <1>
loadItems()
  .then((items) => {
    // 프로미스가 성공적이면 아이템을 받아옴
    displayItems(items); //아이템을 html에 보여줌...
    setEventListners(items); //필터링
  })
  .catch(console.log); // 성공적으로 아이템 받아오지 못할경우
