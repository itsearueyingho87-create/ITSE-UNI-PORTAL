const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next");
const backBtns = document.querySelectorAll(".back");
const progressBar = document.getElementById("progressBar");
const form = document.getElementById("applicationForm");

let currentStep = 0;

function updateStep() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  const visibleSteps = steps.length - 1; // exclude success
  const progress = Math.min(
    ((currentStep + 1) / visibleSteps) * 100,
    100
  );
  progressBar.style.width = progress + "%";
}

nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 2) {
      currentStep++;
      updateStep();
    }
  });
});

backBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      updateStep();
    }
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const fullNameInput = document.getElementById("fullName");
  const fullName = fullNameInput && fullNameInput.value
    ? fullNameInput.value
    : "Applicant";

  document.getElementById("successName").textContent =
    `Dear ${fullName}, your application has been successfully submitted.`;

  currentStep = steps.length - 1;
  updateStep();
});

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const email = params.get("email");

  const nameField = document.getElementById("fullName");
  const emailField = document.getElementById("emailAddress");

  if (name && nameField) nameField.value = name;
  if (email && emailField) emailField.value = email;
});



