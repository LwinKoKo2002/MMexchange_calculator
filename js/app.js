let from = document.getElementById("from");
let to = document.getElementById("to");
let output = document.getElementById("output");
let input = document.getElementById("input");
let historyList = document.getElementById("historyList");

function createOption(select, index, data) {
  let option = document.createElement("option");
  let text = document.createTextNode(index);
  option.setAttribute("value", toNum(data));
  option.appendChild(text);
  select.appendChild(option);
}

function createTr(element) {
  let rowspacer = document.getElementById("rowspacer");
  if (rowspacer) {
    rowspacer.remove();
  }
  let tr = document.createElement("tr");
  element.map((record) => {
    let td = document.createElement("td");
    let data = document.createTextNode(record);
    td.appendChild(data);
    tr.appendChild(td);
  });
  historyList.appendChild(tr);
  makeRecord(historyList.innerHTML);
}

function makeRecord(record) {
  localStorage.setItem("record", record);
}

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // get Text
  let inputText = input.value;
  let fromText = from.value;
  let toText = to.value;

  // Make Process
  let first = inputText * fromText;
  let second = first / toText;
  let result = second.toFixed(2);
  let fromElement =
    inputText + " " + from.options[from.selectedIndex].innerText;
  let toElement = to.options[to.selectedIndex].innerText;
  let date = new Date().toLocaleString();
  let item = [date, fromElement, toElement, result];
  createTr(item);

  // Set Text
  output.innerText = result;
  from.value = "";
  to.value = 1;
  input.focus();
  input.value = "";
});

(function () {
  if (localStorage.getItem("record")) {
    historyList.innerHTML = localStorage.getItem("record");
  } else {
    historyList.innerHTML = `<tr id="rowspacer"><td colspan="4">There is no record</td></tr>`;
  }
})();
function toNum(numb) {
  return Number(numb.replace(",", ""));
}

for (x in data.rates) {
  createOption(from, x, data.rates[x]);
  createOption(to, x, data.rates[x]);
}
