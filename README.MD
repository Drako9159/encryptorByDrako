## Aplicación completa de encriptado y desencriptado

#### Función para encriptar: 🔒
````Javascript
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
````
````Javascript
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
````
Se añaden funciones para distintas animaciones y validaciones, así como un toast para dar feedback al usuario
- wiritter = input de texto

#### Función para desencriptar: 🔓
````Javascript
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
````
````Javascript
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
````
El desencriptado resulta más sencillo, ya que solo se reemplazan las palabras por las letras correspondientes.


- Adicionalmente se añade un botón para copiar el texto encriptado:
````Javascript
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
````
- Las alertas son activadas con la siguiente función: 📝
````Javascript
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
````
- Es necesario conocer los estilos para aplicar las animaciones:

- Las validaciones se realizan con la siguiente función: 📝
````Javascript
function validations(check) {
  if (check.match(/[0-9]/g)) {
    return "No admine números";
  } else if (check.match(/[A-Z]/g)) {
    return "Solo letras minúsculas";
  } else if (!check.match(/^[a-z\s]+$/g)) {
    return "No debe tener acentos";
  }
  return "passed";
}
`````
Con las validaciones se compueba que no existan números, letras mayúsculas o acentos, de lo contrario se muestra una alerta.


Este proyecto fue realizado para el Challenge de ALURA by Oracle Dec 2022. ✔


- Twitter [@drako9159](https://twitter.com/Drako9159)
- Linkedin [Antonio Jaramillo](https://www.linkedin.com/in/antonio-jaramillo-099a77250)