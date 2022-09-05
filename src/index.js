import { stringify } from 'postcss';
import './style.css';
// slider section
const slider = document.getElementById('myRange');
const output = document.getElementById('outputLength');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const specialEl = document.getElementById('special');
const outputShow = document.getElementById('output'); //result
const clipboard = document.getElementById('clipboardBtn');
const generateBtn = document.getElementById('generateBtn');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  special: getRandomSpecial,
};
// Copy to clipbourd
clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = outputShow.innerText;
  if (!password) {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('copied');
});

generateBtn.addEventListener('click', () => {
  const Length = +slider.value;
  // console.log(Lenght);
  const hasUpper = upperEl.checked;
  const hasLower = lowerEl.checked;
  const hasNumber = numberEl.checked;
  const hasSpecial = specialEl.checked;
  outputShow.innerText = generatePasswordHandler(
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    Length
  );
});

function generatePasswordHandler(lower, upper, number, special, Length) {
  let generatedPassword = '';
  const typesCounter = lower + upper + number + special;
  const typesArr = [{ lower }, { upper }, { number }, { special }].filter(
    (item) => Object.values(item)[0]
  );
  // console.log(typesArr);
  if (typesCounter === 0) {
    return '';
  }
  for (let i = 0; i < Length; i += typesCounter) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPass = generatedPassword.slice(0, Length);
  const finalPassRandomized = finalPass
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
  console.log(finalPass);
  return finalPassRandomized;
}

output.innerHTML = slider.value;
slider.oninput = function () {
  output.innerHTML = this.value;
};

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * (121 - 97) + 97));
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * (90 - 65) + 65));
}
function getRandomSpecial() {
  let specialLetters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";
  let k = Math.floor(Math.random() * 9);

  return specialLetters[k];
}
// console.log(getRandomSpecial());
function getRandomNumber() {
  return Math.floor(Math.random() * 9);
}
