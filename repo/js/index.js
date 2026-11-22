
let currentGallery = [];
let currentGalleryIndex = -1;

// Open popup
function openPopup(src, altText, glow = false) {
  const modal = document.getElementById("popup-modal");

  const modalImg = document.getElementById("popup-image");
  const modalPdf = document.getElementById("popup-pdf");
  const captionText = document.getElementById("caption");

  // Find the image that was clicked
  const clickedImage = [...document.querySelectorAll(".clickable-image")]
    .find(img => img.src === src && img.alt === altText);

  // Determine whether this image belongs to a gallery
  const gallery = clickedImage?.closest(".gallery");

  if (gallery) {
    // Include visible and hidden gallery images
    currentGallery = [
      ...gallery.querySelectorAll(
        ".clickable-image, .gallery-hidden"
      )
    ];

    currentGalleryIndex = currentGallery.indexOf(clickedImage);
  } else {
    // Standalone image: no gallery navigation
    currentGallery = [];
    currentGalleryIndex = -1;
  }

  modal.style.display = "block";
  modalPdf.style.display = "none";
  modalImg.style.display = "block";

  showPopupImage(src, altText, glow);

  updateGalleryControls();

  // Prevent background scrolling
  document.body.style.overflow = "hidden";
}

// Display an image in the popup
function showPopupImage(src, altText, glow = false) {
  const modalImg = document.getElementById("popup-image");
  const captionText = document.getElementById("caption");

  modalImg.src = src;
  modalImg.alt = altText;
  captionText.textContent = altText;

  if (glow) {
    modalImg.classList.add("glow-effect");
  } else {
    modalImg.classList.remove("glow-effect");
  }
}

// Navigate through gallery
function navigateGallery(direction) {
  if (!currentGallery.length) return;

  currentGalleryIndex =
    (currentGalleryIndex + direction + currentGallery.length)
    % currentGallery.length;

  const img = currentGallery[currentGalleryIndex];

  showPopupImage(
    img.src,
    img.alt,
    img.classList.contains("glow-effect")
  );

  updateGalleryControls();
}

// Show or hide navigation controls
function updateGalleryControls() {
  const prev = document.getElementById("gallery-prev");
  const next = document.getElementById("gallery-next");
  const counter = document.getElementById("gallery-counter");

  const inGallery = currentGallery.length > 1;

  prev.style.display = inGallery ? "block" : "none";
  next.style.display = inGallery ? "block" : "none";

  counter.style.display = inGallery ? "block" : "none";

  if (inGallery) {
    counter.textContent =
      `${currentGalleryIndex + 1} / ${currentGallery.length}`;
  }
}

// Close popup
function closePopup() {
  document.getElementById("popup-modal").style.display = "none";

  document.body.style.overflow = "";

  currentGallery = [];
  currentGalleryIndex = -1;
}

// Keyboard navigation
document.addEventListener("keydown", function(event) {
  const modal = document.getElementById("popup-modal");

  if (modal.style.display !== "block") return;

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    navigateGallery(-1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    navigateGallery(1);
  }

  if (event.key === "Escape") {
    closePopup();
  }
});

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

