const hashContainer = document.querySelector(".hash");
const resultContainer = document.querySelector(".result");

const passwordInput = document.querySelector('input[name="password"]');
const checkInput = document.querySelector('input[name="check"]');
const hashInput = document.querySelector('input[name="hash"]');

const checkButton = document.querySelector(".check_button");
const hashButton = document.querySelector(".hash_button");
const plusButton = document.querySelector(".plus_button");
const minusButton = document.querySelector(".minus_button");
const roundsContainer = document.querySelector(".rounds");

let rounds = 8;

const increment = () => {
  rounds++;
  roundsContainer.innerText = rounds;
};

const decrement = () => {
  rounds--;
  roundsContainer.innerText = rounds;
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(hashContainer.innerText);
};

const getHash = () => {
  fetch("/hash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ pass: passwordInput.value, rounds }),
  })
    .then((res) => res.json())
    .then((res) => (hashContainer.innerHTML = res));
};

const compare = () => {
  fetch("/compare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      pass: checkInput.value,
      hash: hashInput.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => (resultContainer.innerHTML = res));
};

hashButton.addEventListener("click", getHash);
checkButton.addEventListener("click", compare);
plusButton.addEventListener("click", increment);
minusButton.addEventListener("click", decrement);
hashContainer.addEventListener("click", copyToClipboard);
