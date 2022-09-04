import './style.css';
let slider = document.getElementById('myRange');
let output = document.getElementById('outputLength');
output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};
