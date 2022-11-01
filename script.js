const form = document.querySelector(".form");
const email = form.querySelector("#email");
const country = form.querySelector("#country");
const zip = form.querySelector("#zip");
const password = form.querySelector("#password");
const cPassword = form.querySelector("#confirm-password");
const button = form.querySelector(".submit");
const errorSpans = form.querySelectorAll(".error");

let isValid = true;

form.addEventListener("submit", (event) => {
  showErrorOnSubmit();
  if (!isValid) {
    event.preventDefault();
  } else {
    console.log("form submitted");
  }
});

email.addEventListener("blur", (e) => {
  const span = document.querySelector(`.${email.id}-error`);
  span.textContent = "";
  span.classList.remove("active-error");
  email.classList.remove("input-invalid");

  if (
    !String(email.value).match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    span.textContent = "Enter a valid email";
    span.classList.add("active-error");
    email.classList.add("input-invalid");
  }
  checkValueMissing(email);
});

country.addEventListener("blur", (e) => {
  const span = document.querySelector(`.${country.id}-error`);
  span.textContent = "";
  span.classList.remove("active-error");
  country.classList.remove("input-invalid");

  checkValueMissing(country);
});

zip.addEventListener("blur", (e) => {
  const span = document.querySelector(`.${zip.id}-error`);
  span.textContent = "";
  span.classList.remove("active-error");
  span.classList.remove("input-invalid");

  if (zip.validity.rangeUnderflow || zip.validity.rangeOverflow) {
    span.textContent = "Enter a valid zip code";
    span.classList.add("active-error");
    zip.classList.add("input-invalid");
  }

  checkValueMissing(zip);
});

password.addEventListener("blur", () => {
  const span = document.querySelector(`.${password.id}-error`);
  span.textContent = "";
  span.classList.remove("active-error");
  password.classList.remove("input-invalid");

  // check if minimum eight characters, at least one letter, one number and one special character
  if (
    !String(password.value).match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
  ) {
    span.textContent =
      "Password should contain minimum eight characters, at least one letter, one number and one special character";
    span.classList.add("active-error");
    password.classList.add("input-invalid");
  }

  // check if password too long
  if (password.value.length > 20) {
    span.textContent = "Password too long";
    span.classList.add("active-error");
    password.classList.add("input-invalid");
  }

  checkValueMissing(password);
});

cPassword.addEventListener("blur", () => {
  const span = document.querySelector(`.${cPassword.id}-error`);
  span.textContent = "";
  span.classList.remove("active-error");
  cPassword.classList.remove("input-invalid");

  passwordMismatch();
});

//

//

// will run when submit button is clicked
function showErrorOnSubmit() {
  // isValid remains true if none other error found below
  isValid = true;

  resetAllErrorSpan();

  checkValueMissing(email);
  checkValueMissing(country);
  checkValueMissing(zip);
  checkValueMissing(password);

  passwordMismatch();
}

// check if an element is empty and if it is show the error
function checkValueMissing(element) {
  const span = document.querySelector(`.${element.id}-error`);
  if (element.validity.valueMissing) {
    isValid = false;
    span.textContent = "Field Required";
    span.classList.add("active-error");
    element.classList.add("input-invalid");
  }
}

//check if passwords match
function passwordMismatch() {
  const span = document.querySelector(`.${cPassword.id}-error`);

  if (password.value !== cPassword.value) {
    isValid = false;
    const span = document.querySelector(`.${cPassword.id}-error`);
    span.textContent = "Passwords must match";
    span.classList.add("active-error");
    cPassword.classList.add("input-invalid");
  }
}

// reset all spans to default
function resetAllErrorSpan() {
  errorSpans.forEach((span) => {
    span.textContent = "";
    span.classList.remove(".active-error");
  });

  email.classList.remove("input-invalid");
  country.classList.remove("input-invalid");
  zip.classList.remove("input-invalid");
  password.classList.remove("input-invalid");
}
