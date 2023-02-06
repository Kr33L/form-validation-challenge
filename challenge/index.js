const form = document.querySelector('form');
const inputs = document.querySelectorAll('input, textarea');
form.setAttribute('novalidate', '');

inputs.forEach((input) => {
  const feedback = document.createElement('p');
  const id = input.id + "Error";
  feedback.setAttribute('id', id);

  const previousIds = input.getAttribute('aria-describedBy');
  const describedBy = previousIds ? previousIds + ' ' + id : id;
  input.setAttribute('aria-describedBy', describedBy);

  input.after(feedback);

  input.setAttribute("aria-invalid", "false");

  input.addEventListener('invalid', () => {
    input.setAttribute("aria-invalid", "true");
    feedback.textContent = input.validationMessage;
  });

  input.addEventListener('input', () => {
    input.setAttribute('aria-invalid', 'false');
    feedback.textContent = "";
  })

  input.addEventListener('blur', () => {
    input.checkValidity();
  });
});

form.addEventListener('submit', (event) => {
  const allValid = event.target.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
})