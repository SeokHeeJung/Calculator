let monitor = document.getElementById("monitor"); //화면에 표시되는 계산식
let monitor2 = document.getElementById("monitor2");

let clearButton = document.getElementById("clearButton"); // 버튼 요소 가져오기

//JS에서 계산식
var result = "";  //monitor2 값
var Calculation = ""; //monitor 값

// 버튼 클릭 기능
function append(value) {

  //calculate()해서 계산식이 띄워졌을 때
  if (Calculation !== "") {
    Calculation = "";
    monitor.value = "";

    // 그 때 만약에 숫자를 입력했을 때
    if (!(value === "+" || value === "-" || value === "*" || value === "/" || value === "%")) {
      result = "";
      monitor2.value = "";
    }
  }

  // JS에서 계산되는 식
  result += value;

  //화면에 띄워지는 식
  if (value === "*" || value === "/") {
    monitor2.value += value === "*" ? "×" : "÷";
  } else {
    monitor2.value += value;
  }
  updateClearButton();
}

// 마지막에 입력한 값 부호 바꾸는 기능(미완)
function fix() {

  // 입력값 중에 부호가 있나 먼저 찾기
  let match = result.match(/([+\-*/])(\d+\.?\d*)$/);
  lastNumber = match[2];
  lastOperator = match[1];

  // 입력값이 계산할 수 있는 상태가 아닐 때
  if (!match) {

  }

  updateClearButton();
}

// '=' 버튼을 눌렀을 때의 기능(계산)
function calculate() {

  try {

    // 한 번 계산을 하고 나온 값에서 연속으로 '='을 눌렀을 경우
    if (!/[+\-*/]/.test(result) && /[+\-*/]/.test(Calculation)) {
      // 마지막으로 입력한 연산자와 숫자 저장
      let match = Calculation.match(/([+\-*/])(\d+\.?\d*)$/);
      let lastOperator = match[1];
      let lastNumber = match[2];

      // 한 번 계산을 하고 나온 값과 마지막으로 입력한 연산자와 숫자로 또 계산
      if (match) {
        Calculation = result + lastOperator + lastNumber
        monitor.value = Calculation.replace(/\*/g, "×").replace(/\//g, "÷");
        result = eval(result + lastOperator + lastNumber).toString();
        monitor2.value = result;
      }
    }

    // 연속으로 누른 경우가 아닐 때
    else {
      // 계산식 저장 -> 계산식 보여주는 칸에 출력 -> 입력값에 계산 결과값 저장 -> 입력값 칸에 출력
      Calculation = result;
      monitor.value = Calculation.replace(/\*/g, "×").replace(/\//g, "÷");
      result = eval(result).toString();
      monitor2.value = result;
    }
  } catch {
    result = "Error";
  }

  updateClearButton();
}

// 초기화 기능
function clearResult() {
  //clearButton의 저장된 텍스트값에 따라 초기화 기능을 다르게 설정
  if (clearButton.textContent === "AC") {
    result = "";
    Calculation = "";
  } else {
    result = result.slice(0, -1); // 뒤에서 부터 하나씩 자름
    Calculation = Calculation.slice(0, -1);
  }

  // 입력값과 저장값에 있는 *와 /를 x와 ÷로 출력하도록 하는 식
  if (Calculation.includes("*") || Calculation.includes("/") || result.includes("*") || result.includes("*")) {
    monitor.value = Calculation.replace(/\*/g, "×").replace(/\//g, "÷");
    monitor2.value = result.replace(/\*/g, "×").replace(/\//g, "÷");
  } else {
    monitor.value = Calculation;
    monitor2.value = result;
  }

  updateClearButton();
}

// 입력값이 있을 때 버튼 텍스트를 "C"로, 비어 있으면 "AC"로 변경하는 함수
function updateClearButton() {
  let isCalculationMatch = false;
  if (Calculation.value !== "") {
    // try-catch의 좋은 점: eval() 함수가 예외를 발생시킬 수 있기 때문에, 안전하게 처리하기 위해 try-catch를 사용합니다.
    try {
      isCalculationMatch = (result === eval(Calculation).toString());
    } catch {
      isCalculationMatch = false;
    }
  }
  if (result === "" || result === "Error" || isCalculationMatch) {
    clearButton.textContent = "AC";
  } else {
    clearButton.textContent = "⬅";
  }
}