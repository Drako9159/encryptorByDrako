const writter = document.querySelector("#writter");
const btnEncrypt = document.querySelector("#encrypt");
const btnDecrypt = document.querySelector("#decrypt");
const displayEncrypt = document.querySelector("#displayEncrypt");
const copyText = document.querySelector("#copyText");
const animationLock = document.querySelector(".animation");
const haveAnimation = document.querySelector("#have-animation");
const haveExtraAnimation = document.querySelector("#have-animation-extra");
const toastAlert = document.querySelector("#toastAlert");

function encrypt(letter) {
  const values = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  if (values[letter]) return values[letter];
  return letter;
}
function decrypt(letter) {
  let check = "";
  const exp = [
    { e: /enter/g },
    { i: /imes/g },
    { a: /ai/g },
    { o: /ober/g },
    { u: /ufat/g },
  ];

  exp.forEach((e) => {
    letter = letter.replace(Object.values(e)[0], Object.keys(e)[0]);
    check = letter;
  });
  return check;
}
function activeAnimation(lock) {
  let pushed = `<img src="./icons/${lock}.svg" class="animation" alt="lock-unlock">`;
  haveAnimation.innerHTML = pushed;
}
function activeAnimationExtra(lock) {
  if (lock === "none") return (haveExtraAnimation.innerHTML = "");
  let pushed = `<img class="animation-charge" src="./icons/${lock}.svg" />

  `;
  haveExtraAnimation.innerHTML = pushed;
}
let switchAnimation = "lock";
let cicle = null;
function timer(lock) {
  cicle = setInterval(() => {
    if (lock === "lock") {
      lock = "unlock";
    } else if (lock === "unlock") {
      lock = "lock";
    } else {
      activeAnimationExtra("none");
    }
    activeAnimationExtra(lock);
  }, 2000);
}
function toast(message, color) {
  toastAlert.style.opacity = "1";
  toastAlert.classList.add("activeAnimation");
  let pushed = `<p class="toastAlert" style="background-color: ${color};">${message}</p>`;
  toastAlert.innerHTML = pushed;

  setTimeout(() => {
    toastAlert.style.opacity = "0";
    toastAlert.classList.remove("activeAnimation");
  }, 3000);
}

timer(switchAnimation);

btnEncrypt.addEventListener("click", (e) => {
  if (writter.value) {
    activeAnimation("lock");
    activeAnimationExtra("none");
    clearInterval(cicle);
    let check = "";
    for (let letter in writter.value) {
      check += encrypt(writter.value[letter]);
    }
    displayEncrypt.value = check;
    writter.value = "";
    toast("Encriptado", "green");
  } else {
    toast("Ingresa un texto", "red");
  }
});

btnDecrypt.addEventListener("click", (e) => {
  if (writter.value) {
    activeAnimation("unlock");
    displayEncrypt.value = decrypt(writter.value);
    writter.value = "";
    toast("Desencriptado", "green");
  } else {
    toast("Ingresa un texto", "red");
  }
});

copyText.addEventListener("click", async (e) => {
  if (displayEncrypt.value) {
    displayEncrypt.focus();
    displayEncrypt.select();
    toast("Copiado", "green");
    await navigator.clipboard.writeText(displayEncrypt.value);
    
  } else {
    toast("Nada que copiar", "gray");
  }
});
