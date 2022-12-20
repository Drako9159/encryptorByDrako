const writter = document.querySelector("#writter");
const btnEncrypt = document.querySelector("#encrypt");
const btnDecrypt = document.querySelector("#decrypt");
const displayEncrypt = document.querySelector("#displayEncrypt");
const copyText = document.querySelector("#copyText");

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
btnEncrypt.addEventListener("click", (e) => {
  let check = "";
  for (let letter in writter.value) {
    check += encrypt(writter.value[letter]);
  }
  displayEncrypt.value = check;
});

btnDecrypt.addEventListener("click", (e) => {
  displayEncrypt.value = decrypt(writter.value);
});

copyText.addEventListener("click", async (e) => {
  displayEncrypt.focus();
  displayEncrypt.select();
  
  await navigator.clipboard.writeText(displayEncrypt.value);
  /*
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }*/
});
