const form = document.querySelector(".signup__form");
const inputs = form.querySelectorAll(".signup__form-input");
const errorMessages = form.querySelectorAll(".signup__form-error");

function displayErrorMessage(input, errorMessage, message) {
  if (input.value.trim() === "") {
    errorMessage.textContent = message;
    input.classList.add("signup__form-input--error");
    return false;
  } else {
    errorMessage.textContent = "";
    input.classList.remove("signup__form-input--error");
    return true;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return emailRegex.test(email);
}

function handleSubmit(event) {
  let isValid = true;

  inputs.forEach((input, index) => {
    const errorMessage = errorMessages[index];

    switch (input.id) {
      case "first-name":
        isValid =
          displayErrorMessage(
            input,
            errorMessage,
            "First Name cannot be empty"
          ) && isValid;
        break;
      case "last-name":
        isValid =
          displayErrorMessage(
            input,
            errorMessage,
            "Last Name cannot be empty"
          ) && isValid;
        break;
      case "email":
        if (!validateEmail(input.value.trim())) {
          errorMessage.textContent = "Looks like this is not an email";
          input.placeholder = "email@example.com";
          input.classList.add("signup__form-input-email");
          input.classList.add("signup__form-input--error");
          isValid = false;
        } else {
          errorMessage.textContent = "";
          input.classList.remove("signup__form-input-email");
          input.classList.remove("signup__form-input--error");
        }
        break;
      case "password":
        if (input.value.trim() === "") {
          errorMessage.textContent = "Password cannot be empty";
          input.classList.add("signup__form-input--error");
          isValid = false;
        } else {
          const passwordValue = input.value.trim();
          const passwordRegex = /^.{8,}$/;
          if (!passwordRegex.test(passwordValue)) {
            errorMessage.textContent = "Password must be at least 8 characters";
            input.classList.add("signup__form-input--error");
            isValid = false;
          } else {
            errorMessage.textContent = "";
            input.classList.remove("signup__form-input--error");
          }
        }

        break;
    }
  });

  if (!isValid) {
    event.preventDefault();
  }
}

form.addEventListener("submit", handleSubmit);
