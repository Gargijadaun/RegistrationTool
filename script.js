const scriptURL = 'https://script.google.com/macros/s/AKfycbxvM0SQI6HoQ2wYzaVyOSi7kQ7Sbvd9eeDFys-6vDlwOHj_SFi2leWczf7fZagcfuV4/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Check if all form fields are filled
  if (validateForm()) {
    // Get the selected project value from the dropdown
    const selectedProject = form.elements['country'].value;

    // Create a new FormData object and append the selected project
    const formData = new FormData(form);
    formData.append('selectedProject', selectedProject);

    // Make the fetch request
    fetch(scriptURL, { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) {
          alert('Thank you! Your form is submitted successfully.');
          window.location.href = './welcome.html'; // Change this URL to the desired next page URL
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => console.error('Error!', error.message));
  } else {
    alert('Please fill in all the fields before submitting the form.');
  }
});

// Function to validate the form fields
function validateForm() {
  let isValid = true;
  const formElements = form.elements;

  for (let i = 0; i < formElements.length; i++) {
    if (
      formElements[i].type !== 'submit' &&
      formElements[i].value.trim() === ''
    ) {
      isValid = false;
      break;
    }
  }

  return isValid;
} 