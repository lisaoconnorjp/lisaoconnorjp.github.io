// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission (page reload)

  // Collect the form field values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const weddingDate = document.getElementById('weddingDate').value;
  const weddingVenue = document.getElementById('weddingVenue').value;
  const message = document.getElementById('message').value;

  // Construct the email content
  const emailContent = `
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Wedding Date and Time: ${weddingDate}
    Wedding Venue: ${weddingVenue}
    Message: ${message}
  `;

  const formResult = document.querySelector('.form_result');

  // Send the email using EmailJS
  emailjs.send('service_215p8t8', 'wedding_template', {
    name: name,
    email: email,
    message: emailContent
  })
  .then(function(response) {
    console.log('Success:', response);
    // Update the form result with a success message
    formResult.textContent = 'Your message has been sent successfully! Thank you for choosing Mona Lisa Weddings.';
    formResult.style.color = 'green'; // Set the success message color
  }, function(error) {
    console.log('Error:', error);
    // Update the form result with an error message
    formResult.textContent = 'There was an error sending your message. Please try again.';
    formResult.style.color = 'red'; // Set the error message color
  });
}

// Add event listener to the form submission
document.getElementById('emailForm').addEventListener('submit', handleFormSubmit);
