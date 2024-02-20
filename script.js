const scriptURL = 'https://script.google.com/macros/s/AKfycbz6ILJmTMZozttoY5AnwaiPtFsKDAPYApt0uCWj3ATKyyluoRXYSqdLC6ExycLPiZ85/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (validateForm()) {
    const selectedGender = form.elements['gender'].value;
    const selectedCountry = form.elements['country'].value;

    try {
      const jsonFile = (selectedGender === 'male') ? 'males.json' : 'females.json';
      const couponData = await fetchData(jsonFile);

      if (couponData.coupons.length === 0) {
        alert('No available coupons. Plsease try again later.');
        return;
      }

      const selectedCoupon = couponData.coupons.shift();

// Add the following lines to remove the selected coupon from the array
couponData.coupons = couponData.coupons.filter((coupon) => coupon !== selectedCoupon);

const formData = new FormData(form);

formData.append('selectedGender', selectedGender);
formData.append('selectedCountry', selectedCountry);
formData.append('selectedCoupon', selectedCoupon);

      const response = await fetch(scriptURL, { method: 'POST', body: formData });

      if (response.ok) {
        alert('Thank you! Your form is submitted successfully.');
        window.location.href = './welcome.html'; // Change this URL to the desired next page URL
      } else {
        throw new Error(`Server returned ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  } else {
    alert('Please fill in all the fields before submitting the form.');
  }
});

function validateForm() {
  let isValid = true;
  const formElements = form.elements;

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
      isValid = false;
      break;
    }
  }

  return isValid;
}

// Helper function to fetch JSON data
// Helper function to fetch JSON data
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
