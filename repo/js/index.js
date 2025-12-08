
// Function to open the popup
function openPopup(src, altText, glow) {
  // Get the modal
  var modal = document.getElementById("popup-modal");
  // Get the image and insert it inside the modal
  var modalImg = document.getElementById("popup-image");
  var modalPdf = document.getElementById("popup-pdf");
  var captionText = document.getElementById("caption");
  
  
  modal.style.display = "block";
  modalPdf.style.display = "none";
  modalImg.style.display = "block";
  modalImg.src = src;
  captionText.innerHTML = altText;

  // Apply or remove glow effect
  if (glow) {
    modalImg.classList.add("glow-effect");
  } else {
    modalImg.classList.remove("glow-effect");
  }
}

// Function to open the popup for PDFs
function openPdf(pdfSrc, altText) {
  var modal = document.getElementById("popup-modal");
  var modalImg = document.getElementById("popup-image");
  var modalPdf = document.getElementById("popup-pdf");
  var captionText = document.getElementById("caption");

  modal.style.display = "block";
  captionText.innerHTML = altText;

  // Hide the image and show the embedded PDF
  modalImg.style.display = "none";
  modalPdf.style.display = "block";
  modalPdf.src = pdfSrc;
}


// Function to close the popup
function closePopup() {
  var modal = document.getElementById("popup-modal");
  modal.style.display = "none";
}

// Get the menu icon, popup menu, and header
const menuIcon = document.getElementById('menu-icon');
const popupMenu = document.getElementById('popup-menu');
const header = document.querySelector('header');

// Function to close the popup menu
function closePopupMenu() {
  popupMenu.style.transform = 'translateY(-100%)'; // Slide up behind the header
  setTimeout(() => {
    popupMenu.style.display = 'none'; // Hide after animation
  }, 300); // Matches the transition duration

  setTimeout(() => {
    header.style.borderRadius = '0 0 7vh 2vh'; // Reset border-radius after 0.2s
  }, 200);
}

// Listen for keydown events on the entire document
document.addEventListener('keydown', function(event) {
  // Check if the Escape key is pressed
  if (event.key === "Escape") {
      // Call the closePopup function
      closePopup();
  }
});

// Toggle the popup menu when the menu icon is clicked
menuIcon.addEventListener('click', () => {
  if (popupMenu.style.transform === 'translateY(0%)') {
    closePopupMenu();
  } else {
    popupMenu.style.display = 'block';

    setTimeout(() => {
      popupMenu.style.transform = 'translateY(0%)'; // Slide down
    }, 10);

    setTimeout(() => {
      header.style.borderRadius = '0 0 7vh 0'; // Change border-radius after 0.2s
    }, 200);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// Close the popup menu when the viewport resizes
window.addEventListener('resize', closePopupMenu);

