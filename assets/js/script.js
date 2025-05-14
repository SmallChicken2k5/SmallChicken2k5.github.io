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
emailjs.init("zRPklF_kQUCgS5tQL"); // Replace with your EmailJS User ID

// Declare variables
let generatedOTP = null; // This will store the OTP
let isOTPVerified = false; // Track if OTP is verified

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const otpInput = document.querySelector("#otp-input");


// Function to generate a random OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP to the user's email
const sendOTP = (email) => {
  generatedOTP = generateOTP(); // Generate a new OTP

  const otpData = {
    to_email: email,
    otp: `${generatedOTP}`,
  };

  return emailjs.send("personal-site3", "template_jp41kjr", otpData);
};

// Function to send contact form data to your email
const sendContactForm = (formData) => {
  return emailjs.send("personal-site3", "template_712wypv", formData);
};

// Hàm kiểm tra email qua API
const validateEmail = async (email) => {
  const apiKey = "ca1bae69729266b399114125e5d088fb"; // Thay bằng API Key của bạn
  const url = `https://apilayer.net/api/check?access_key=${apiKey}&email=${email}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.format_valid && data.smtp_check) {
      return true; // Email hợp lệ
    } else {
      return false; // Email không hợp lệ
    }
  } catch (error) {
    console.error("Error validating email:", error);
    return false;
  }
};

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = form.email.value;
  const fullname = form.fullname.value;
  const message = form.message.value;
  const isValidEmail = await validateEmail(email);
  if (isValidEmail) {
    if (!isOTPVerified) {
      // Nếu OTP chưa được xác minh
      if (otpInput.style.display === "none") {
        // Gửi OTP nếu chưa được gửi
        try {
          await sendOTP(email);
          alert("OTP has been sent to your email. Please check your inbox.");
          otpInput.style.display = "block"; // Hiển thị trường nhập OTP
          formBtn.textContent = "Verify OTP"; // Đổi nút thành "Verify OTP"
        } catch (error) {
          console.error("Failed to send OTP:", error);
          alert("Failed to send OTP. Please try again.");
        }
      } else {
        // Xác minh OTP
        if (otpInput.value === generatedOTP) {
          isOTPVerified = true; // Đánh dấu OTP đã được xác minh
          alert("OTP verified successfully!");
          formBtn.textContent = "Send Message"; // Đổi nút thành "Send Message"
        } else {
          alert("Invalid OTP. Please try again.");
        }
      }
    } else {
      // Nếu OTP đã được xác minh, gửi thông tin liên hệ
      const formData = {
        fullname: fullname,
        email: email,
        message: message,
      };

      try {
        await sendContactForm(formData);
        alert("Your message has been sent successfully!");
        form.reset();
        otpInput.style.display = "none"; // Ẩn trường nhập OTP
        formBtn.textContent = "Send Message"; // Đặt lại nút
        isOTPVerified = false; // Đặt lại trạng thái xác minh OTP
        generatedOTP = null; // Đặt lại OTP
      } catch (error) {
        console.error("Failed to send contact form:", error);
        alert("Failed to send your message. Please try again.");
      }
    }
  }
  else {
    alert("Invalid email address. Please enter a valid email.");
  }
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
    left: certificatesItems[currentCertificateIndex].offsetLeft - certificatesList.scrollLeft,
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
