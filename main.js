const divForClockAndInput = document.querySelector(".js-div");

const H1_CLASSNAME="js-clock",
    clockContainer = divForClockAndInput.querySelector("h1");
//시계를 보여주는 함수
function showClock(){
    clockContainer.classList.add(H1_CLASSNAME);

    const date = new Date();
    const getHours = date.getHours();
    const getMinutes = date.getMinutes();
    const getSeconds = date.getSeconds();

    clockContainer.innerText = `${getHours}:${getMinutes}:${getSeconds}`;
    
}

//로컬스토리지에 저장시켜주는 함수
/*function handleSaving(key, value){
    localStorage.setItem(key, value);
}*/

const INPUT_CLASSNAME = "js-input",
    inputContainer = divForClockAndInput.querySelector("input");
//유저의 이름을 받는 함수 : 이름을 인풋으로 받고 & 저장 & 화면에 보여주기 & 원하면 이름을 삭제했다가 바꿀 수 있도록
function getUserName(){
    inputContainer.classList.add(INPUT_CLASSNAME);

    const btnEnter = document.createElement("button");
    btnEnter.innerText = "Enter Name";
    divForClockAndInput.appendChild(btnEnter);

    btnEnter.addEventListener("click", function(event){
        const h1Greeting = document.createElement("h1");
        const name = inputContainer.value;
        divForClockAndInput.appendChild(h1Greeting); 
        h1Greeting.innerText = `Hello ${name}!`; 
    });
    //이름을 이미 입력하였다면 다시 지울 때까지 이름을 또 못 짓게 만들어야 한다.
    //저장기능을 만들어야 하는데... 그냥 함수로 만들어서 Todo를 저장할 때도 쓸 수는 없을까?
    localStorage.setItem("userName", inputContainer.value);
}

const divForTodoList = document.querySelector(".js-TodoList");

const LI_CLASSNAME = "js-li",
    inputContainerForTodoList = divForTodoList.querySelector("input"),
    todoArray = [];
//ToDo리스트를 만들 수 있는 함수. : 항목을 인풋으로 받고 & 리스트를 생성->항목을 리스트에 담고 & 저장 & 화면에 보여주기 & 삭제
function makeToDoList(){

    const btnEnter = document.createElement("button");
    btnEnter.innerText = "Enter Todo";
    divForTodoList.appendChild(btnEnter);

    btnEnter.addEventListener("click", function(event){
        const todoList = document.createElement("li");
        const todo = inputContainerForTodoList.value;
        divForTodoList.appendChild(todoList);
        todoList.append(todo);
        
        const objTodo = {key:todo.toString(), context:todo};
        todoArray.push(objTodo);
        localStorage.setItem(objTodo.key, objTodo.context);

        todoArray.forEach((item)=>{localStorage.getItem(objTodo.key)});

        const btnDone = document.createElement("button");
        btnDone.innerText = "Done";
        todoList.appendChild(btnDone);
        
        btnDone.addEventListener("click", function(event){todoList.remove()});
    });
    
}

//랜덤한 이미지를 랜덤한 순서로 화면에 띄우는 함수 : 이미지들의 array를 만들고 & 랜덤한 순서로 화면에 보여준다.
function rdmBackGroundImg(){
    const images = [
        "pink.png",
        "Test.png",
    ],
        chosenImg = images[Math.floor(Math.random()*images.length)];
    
    document.querySelector("body").setAttribute("background", `img/${chosenImg}`);

}

const API_KEY = "ddcb208a36c4405aebfca2a02ef4f1a0";
//날씨 보여주는 함수.
function getWeatherByLocation(){
    navigator.geolocation.getCurrentPosition(
        (position)=>{
            const lat = position.coords.latitude; 
            const lon = position.coords.longitude;
            const urls = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

            fetch(urls)
            .then((response)=>response.json())
            .then((data)=>{
                const weather = document.querySelector("#weather span:first-child"); 
                const city = document.querySelector("#weather span:last-child"); 
                city.innerText = data.name; 
                weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
            })
        }, 
        ()=>{
            alert("I cannot find your location");
        }
    );
}

function init(){
    setInterval(showClock, 1000);
    getUserName();
    makeToDoList();
    rdmBackGroundImg();
    getWeatherByLocation();
}

init();