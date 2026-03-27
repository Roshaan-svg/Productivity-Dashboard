function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var FullElemsPage = document.querySelectorAll(".fullElems");
  var allFullElemsPageBackBtn = document.querySelectorAll(".fullElems .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      FullElemsPage[elem.id].style.display = "block";
    });
  });

  allFullElemsPageBackBtn.forEach(function (elem) {
    elem.addEventListener("click", function () {
      FullElemsPage[elem.id].style.display = "none";
    });
  });
}

openFeatures();

function taskList() {
  var currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("list is empty");
  }

  function renderTasks() {
    var allTasks = document.querySelector(".alltask");
    let sum = "";

    currentTask.forEach(function (e, idx) {
      sum =
        sum +
        `<div class="task">
         <div class="task-name">
                <h5>${e.task} <span class = "${e.imp}">imp</span></h5>
                <button id=${idx}>Mark as Completed</button>
                </div>
                <div class="task-details"></div>              
                </div>`;
    });

    allTasks.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTasks();
      });
    });

    document.querySelectorAll(".task").forEach(function (taskElem, index) {
      const taskName = taskElem.querySelector(".task-name");
      const detailsBox = taskElem.querySelector(".task-details");

      detailsBox.style.display = "none";

      detailsBox.innerText =
        currentTask[index].details || "No details provided";

      taskName.addEventListener("click", function () {
        if (detailsBox.style.display === "none") {
          detailsBox.style.display = "block";
        } else {
          detailsBox.style.display = "none";
        }
      });
    });
  }

  renderTasks();

  let form = document.querySelector(".addtask form");
  let taskInput = document.querySelector(".addtask form #task-input");
  let taskDetails = document.querySelector(".addtask form textarea");
  let taskCheckBox = document.querySelector(".addtask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    currentTask.push({
      task: taskInput.value,
      details: taskDetails.value,
      imp: taskCheckBox.checked,
    });
    renderTasks();

    taskCheckBox.checked = false;
    taskInput.value = "";
    taskDetails.value = "";
  });
}

taskList();

function dailyPlanner() {
  var dayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`,
  );

  var wholeDaySum = "";

  hours.forEach(function (elem, idx) {
    var savedData = dayPlanData[idx] || "";
    wholeDaySum += `<div class="day-planner-time">
  <p>${elem}</p>
  <input id = ${idx} type="text" placeholder="..." value = "${savedData}" >
  </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlanner();

function motivation() {
  var motivationQuote = document.querySelector(".motivation2 h1");
  var motivationAuther = document.querySelector(".motivation3 h2");

  async function fetchQuote() {
    let response = await fetch("https://dummyjson.com/quotes/random");
    let data = await response.json();

    console.log(data);

    motivationQuote.innerHTML = data.quote;
    motivationAuther.innerHTML = "- " + data.author;
  }

  fetchQuote();
}

motivation();

function pomodoro() {
  let timer = document.querySelector(".pomo-timer h1");
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");

  let timerInterval = null;

  totalSeconds = 25 * 60;

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    timer.innerHTML = `${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        timer.innerHTML = "25:00";
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoro();

function weatherFunctionality() {
  var apiKey = "2990730e53ee4d867accb36c636d7d0c";
  var city = "delhi";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${city}`;

  var headerTime = document.querySelector(".header1 h1");
  var headerdate = document.querySelector(".header1 h2");
  var headerTemp = document.querySelector(".header2 h2");
  var headerHumidity = document.querySelector(".header2 h3");
  var headerWind = document.querySelector(".header2 h4");
  var headerWeather = document.querySelector(".header2 h5");

  var data = null;
  async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    data = await response.json();
  }
  checkWeather();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var totalMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    var date = new Date();
    var daysOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var realDate = date.getDate();
    var month = totalMonths[date.getMonth()];
    var year = date.getFullYear();
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var Wind = data.wind.speed;
    var showweather = data.weather[0].main;

    headerdate.innerHTML = `${realDate}, ${month}, ${year}`;
    headerTemp.innerHTML = `${Math.floor(temp)}°C`;
    headerHumidity.innerHTML = `Humidity: ${humidity}%`;
    headerWind.innerHTML = `wind: ${Wind}km/h`;
    headerWeather.innerHTML = `${showweather}`;

    let displayHours = hours % 12 || 12; // 0 -> 12
    let period = hours >= 12 ? "PM" : "AM";

    headerTime.innerHTML = `${daysOfWeek}, ${String(displayHours).padStart("2", "0")}:${String(minutes).padStart("2", "0")} ${period}`;

    // if (hours > 12) {
    //   headerTime.innerHTML = `${daysOfWeek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")} PM`;
    //   // :${String(seconds).padStart('2','0')}
    // } else {
    //   headerTime.innerHTML = `${daysOfWeek}, ${hours - 12}:${minutes}:${seconds} AM`;
    // }
  }
  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality();

function changeTheme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;

  console.log(rootElement);

  var flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#381C0A");
      rootElement.style.setProperty("--tri1", "#FEBA17");
      rootElement.style.setProperty("--tri2", "#74512D");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#F1EFEC");
      rootElement.style.setProperty("--sec", "#030303");
      rootElement.style.setProperty("--tri1", "#D4C9BE");
      rootElement.style.setProperty("--tri2", "#12345B");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#F8F4E1");
      rootElement.style.setProperty("--sec", "#222831");
      rootElement.style.setProperty("--tri1", "#948979");
      rootElement.style.setProperty("--tri2", "#393E46");
      flag = 0;
    }
  });
}
changeTheme();

function dailyGoals() {
  const goalInputs = document.querySelectorAll(".day-goal input");

  let weeklyGoals = JSON.parse(localStorage.getItem("weeklyGoals")) || {};

  // load saved data
  goalInputs.forEach((input, index) => {
    if (weeklyGoals[index]) {
      input.value = weeklyGoals[index];
    }

    input.addEventListener("input", function () {
      weeklyGoals[index] = input.value;
      localStorage.setItem("weeklyGoals", JSON.stringify(weeklyGoals));
    });
  });
}

dailyGoals();
