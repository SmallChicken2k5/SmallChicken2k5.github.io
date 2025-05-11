'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// // contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");

// // add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }
'use strict';

// Initialize EmailJS
emailjs.init("zRPklF_kQUCgS5tQL"); // Thay YOUR_USER_ID bằng User ID từ EmailJS

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event listener to the form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form

  // Lấy dữ liệu từ form
  const formData = {
    fullname: form.fullname.value,
    email: form.email.value,
    message: form.message.value,
  };

  // Gửi email qua EmailJS
  emailjs.send("personal-site3", "template_712wypv", formData)
    .then(() => {
      alert("Email sent successfully!");
      form.reset(); // Reset form sau khi gửi thành công
      formBtn.setAttribute("disabled", ""); // Vô hiệu hóa nút gửi
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again later.");
    });
});

// Enable/disable submit button based on form validation
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    pages.forEach((page) => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});


// ...existing code...

// Auto-scroll testimonials
const testimonialsList = document.querySelector("#testimonials-list");
const testimonialsItems = document.querySelectorAll(".testimonials-item");

let currentIndex = 0;

const autoScrollTestimonials = () => {
  // Scroll to the current item
  testimonialsList.scrollTo({
    left: testimonialsItems[currentIndex].offsetLeft,
    behavior: "smooth",
  });

  // Move to the next item
  currentIndex = (currentIndex + 1) % testimonialsItems.length;
};

// Set interval for auto-scrolling
setInterval(autoScrollTestimonials, 3000); // Adjust the time (3000ms = 3 seconds) as needed
// Auto-scroll clients
const clientsList = document.querySelector(".clients-list");
const clientsItems = document.querySelectorAll(".clients-item");

let currentClientIndex = 0;

const autoScrollClients = () => {
  // Scroll to the current client item
  clientsList.scrollTo({
    left: clientsItems[currentClientIndex].offsetLeft,
    behavior: "smooth",
  });

  // Move to the next client item
  currentClientIndex = (currentClientIndex + 1) % clientsItems.length;
};

// Set interval for auto-scrolling
setInterval(autoScrollClients, 3000); // Adjust the time (3000ms = 3 seconds) as needed
// Auto-scroll certificates
const certificatesList = document.querySelector("#certificates-list");
const certificatesItems = document.querySelectorAll(".certificates-item");

let currentCertificateIndex = 0;

const autoScrollCertificates = () => {
  // Scroll to the current certificate item
  certificatesList.scrollTo({
    left: certificatesItems[currentCertificateIndex].offsetLeft,
    behavior: "smooth",
  });

  // Move to the next certificate item
  currentCertificateIndex = (currentCertificateIndex + 1) % certificatesItems.length;
};

// Set interval for auto-scrolling
setInterval(autoScrollCertificates, 3000); // Adjust the time (3000ms = 3 seconds) as needed

// Certificates modal functionality
const certificateImages = document.querySelectorAll(".certificates-item img");
const certificatesModal = document.getElementById("certificates-modal");
const modalCertificateImage = document.getElementById("modal-certificate-image");
const certificatesOverlay = document.getElementById("certificates-overlay");
const certificatesCloseBtn = document.getElementById("certificates-close-btn");

// Open modal when a certificate is clicked
certificateImages.forEach((item) => {
  item.addEventListener("click", () => {
    modalCertificateImage.src = item.src;
    modalCertificateImage.alt = item.alt;
    certificatesModal.classList.add("active");
    certificatesOverlay.classList.add("active");
  });
});

// Close modal when overlay or close button is clicked
certificatesOverlay.addEventListener("click", () => {
  certificatesModal.classList.remove("active");
  certificatesOverlay.classList.remove("active");
});

certificatesCloseBtn.addEventListener("click", () => {
  certificatesModal.classList.remove("active");
  certificatesOverlay.classList.remove("active");
});
