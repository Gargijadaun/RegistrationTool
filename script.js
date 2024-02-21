// const scriptURL = 'https://script.google.com/macros/s/AKfycbz6ILJmTMZozttoY5AnwaiPtFsKDAPYApt0uCWj3ATKyyluoRXYSqdLC6ExycLPiZ85/exec';
// const form = document.forms['contact-form'];

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();

//   if (validateForm()) {
//     const selectedGender = form.elements['gender'].value;
//     const selectedCountry = form.elements['country'].value;

//     try {
//       const jsonFile = (selectedGender === 'male') ? 'males.json' : 'females.json';
//       const couponData = await fetchData(jsonFile);

//       if (couponData.coupons.length === 0) {
//         alert('No available coupons. Please try again later.');
//         return;
//       }

//       const selectedCoupon = couponData.coupons.shift();

//       // Add the following lines to remove the selected coupon from the array
//       couponData.coupons = couponData.coupons.filter((coupon) => coupon !== selectedCoupon);

//       const formData = new FormData(form);

//       formData.append('selectedGender', selectedGender);
//       formData.append('selectedCountry', selectedCountry);
//       formData.append('selectedCoupon', selectedCoupon);

//       const response = await fetch(scriptURL, { method: 'POST', body: formData });

     
// if (response.ok) {
//     // Save the selected coupon in localStorage
   
//     localStorage.setItem('selectedCoupon', selectedCoupon);
//     console.log('Selected Coupon:', selectedCoupon);

//     // Redirect to welcome.html without passing the coupon in the URL
//     window.location.href = './welcome.html';
// } else {
//     throw new Error(`Server returned ${response.status} ${response.statusText}`);
// }

//     } catch (error) {
//       console.error('Error during form submission:', error);
//       alert('An error occurred while submitting the form. Please try again.');
//     }
//   } else {
//     alert('Please fill in all the fields before submitting the form.');
//   }
// });


// function validateForm() {
//   let isValid = true;
//   const formElements = form.elements;

//   for (let i = 0; i < formElements.length; i++) {
//     if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
//       isValid = false;
//       break;
//     }
//   }

//   return isValid;
// }

// // Helper function to fetch JSON data
// // Helper function to fetch JSON data
// async function fetchData(url) {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Server returned ${response.status} ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     throw new Error(`Error fetching data: ${error.message}`);
//   }
// }
const scriptURL = 'https://script.google.com/macros/s/AKfycbz6ILJmTMZozttoY5AnwaiPtFsKDAPYApt0uCWj3ATKyyluoRXYSqdLC6ExycLPiZ85/exec';
const form = document.forms['contact-form'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (validateForm()) {
    const selectedGender = form.elements['gender'].value;
    const selectedCountry = form.elements['country'].value;

    try {
      const selectedCoupon = generateCouponCode(selectedGender);

      const formData = new FormData(form);

      formData.append('selectedGender', selectedGender);
      formData.append('selectedCountry', selectedCountry);
      formData.append('selectedCoupon', selectedCoupon);

      const response = await fetch(scriptURL, { method: 'POST', body: formData });

      if (response.ok) {
        // Save the selected coupon in cookies
        localStorage.setItem('selectedCoupon', selectedCoupon);
        setCookie('selectedCoupon', selectedCoupon);

        // Redirect to welcome.html without passing the coupon in the URL
        window.location.href = './welcome.html';
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

function generateCouponCode(gender) {
  const genderCode = (gender === 'male') ? 'M#' : 'F#';
  const couponCount = getAndIncrementCouponCount();

  // Define separate alphabet cycles for male and female
  const maleAlphabetCycle = 'ABC';
  const femaleAlphabetCycle = 'XYZ';

  // Choose the appropriate alphabet cycle based on gender
  const alphabetCycle = (gender === 'male') ? maleAlphabetCycle : femaleAlphabetCycle;

  // Calculate the alphabet part based on the count and cycle through the selected alphabet
  const alphabetIndex = (couponCount - 1) % alphabetCycle.length;
  const alphabet = alphabetCycle[alphabetIndex];

  return `${genderCode}${alphabet}${pad(couponCount % 1000)}`;
}


function getAndIncrementCouponCount() {
  let couponCount = getCookie('couponCount') || 0; // Start from 0
  setCookie('couponCount', ++couponCount);
  return couponCount;
}

function pad(count) {
  return count.toString().padStart(3, '0');
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}

function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? Number(cookieValue.pop()) : null;
}


