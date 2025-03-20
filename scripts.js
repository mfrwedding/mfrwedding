document.addEventListener("DOMContentLoaded", function () {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    console.log("Auth Check:", isAuthenticated); // ✅ Debugging

    // 🔹 Only redirect if NOT on the login page
    if (!isAuthenticated || isAuthenticated !== "true") {
        if (!window.location.pathname.includes("index.html")) { 
            console.warn("User is NOT authenticated. Redirecting to login...");
            window.location.href = "index.html"; 
        }
    }

    // ✅ Attach login function to form submission (Fixes Enter Key Issue)
    const passwordForm = document.getElementById("password-form");
    if (passwordForm) {
        passwordForm.addEventListener("submit", function (event) {
            event.preventDefault(); // ✅ Prevents refresh
            checkPassword();
        });
    }

    // ✅ Allow pressing "Enter" to submit password
    const passwordInput = document.getElementById("password-input");
    if (passwordInput) {
        passwordInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // ✅ Stops Enter from refreshing
                checkPassword();
            }
        });
    }
});

function revealWebsite() {
    document.getElementById("helloPage").style.display = "none";
    document.getElementById("websiteContent").style.display = "block";
    document.getElementById("passwordOverlay").style.visibility = "visible";
    document.getElementById("passwordOverlay").style.opacity = "1";
    document.getElementById("passwordOverlay").style.display = "flex";
    document.getElementById("passwordInput").focus(); // Focus input automatically
}
// Ensure Enter key submits the password correctly
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("passwordInput");
    const form = document.getElementById("password-form");

    if (passwordInput) {
        passwordInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent page refresh
                checkPassword(); // Call the function
            }
        });
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            checkPassword();
        });
    }
});

// Updated checkPassword function
function checkPassword() {
    const password = document.getElementById("passwordInput").value;

    if (password === "apple") {
        sessionStorage.setItem("authenticated", "true"); // ✅ Save authentication status
        window.location.href = "welcome.html"; // ✅ Redirect to welcome page
    } else {
        alert("Incorrect password. Try again.");
    }
}


//GALLERY 
document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    showSlides(slideIndex);

    // Attach event listeners to the dots
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function () {
            currentSlide(i + 1); // Calls currentSlide with the correct index
        });
    }

    // Next/Previous controls
    document.querySelector(".prev")?.addEventListener("click", function () {
        plusSlides(-1);
    });
    document.querySelector(".next")?.addEventListener("click", function () {
        plusSlides(1);
    });

    // Function to move to the next/previous slide
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Function to navigate directly to a specific slide
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");

        if (slides.length === 0) {
            console.warn("No slides found. Skipping slideshow setup.");
            return;
        }

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("active");
    }

    // Auto-slide function
    function autoSlide() {
        plusSlides(1);
        setTimeout(autoSlide, 5000); // Change image every 5 seconds
    }

    autoSlide();
});


function sendEmail(event) {
    event.preventDefault(); // Prevents page refresh

    const attendanceValue = document.querySelector('input[name="attendance"]:checked')?.value || "Not Provided";
    let attendanceColor = "black"; // Default color

    if (attendanceValue.toLowerCase() === "yes") {
        attendanceColor = "green";
    } else if (attendanceValue.toLowerCase() === "no") {
        attendanceColor = "red";
    }

    const formData = {
        attendance: attendanceValue,
        attendance_color: attendanceColor,  // Sending the color as a variable
        guest_names: document.getElementById("guest-names")?.value || "Not Provided",
        email: document.getElementById("email")?.value || "Not Provided",
        special_notes: document.getElementById("special-notes")?.value || "Not Provided"
    };

    console.log("Form Data Sent to EmailJS:", formData); // Debugging

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            service_id: "service_90c6i3h",
            template_id: "template_1a74b59",
            user_id: "IVJxwsFAz60sp9qjo",
            template_params: formData
        })
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("EmailJS Error: " + response.statusText);
        })
        .then(result => {
            console.log("Email Sent Successfully:", result);
            alert("✅ RSVP Submitted Successfully!");
            document.getElementById("rsvp-form").reset();
        })
        .catch(error => {
            console.error("EmailJS Error:", error);
            alert("❌ Failed to send RSVP. Please try again.");
        });
}