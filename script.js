// function send(){
//     const templateParams ={
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         message: document.getElementById("message").value,
//     };
//     emailjs.send("service_2pvvrp5", "template_vx4fttl", templateParams).then(
//         ()=> alert("Message sent successfully").catch((error)=> alert("Email not sended"))
//     );
// }



// function send() {
//     const templateParams = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         message: document.getElementById("message").value,
//     };

//     emailjs
//         .send("service_2pvvrp5", "template_vx4fttl", templateParams)
//         .then(() => {
//             alert("Message sent successfully");
//         })
//         .catch((error) => {
//             console.error(error);
//             alert("Email not sent");
//         });
// }



// function send(event) {
//     event.preventDefault();

//     const templateParams = {
//         name: document.getElementById("name").value,
//         email: document.getElementById("email").value,
//         message: document.getElementById("message").value,
//     };

// emailjs
//         .send("service_2pvvrp5", "template_vx4fttl", templateParams)
//         .then(() => {
//             alert("Message sent successfully");
//         })
//         .catch((error) => {
//             console.error(error);
//             alert("Email not sent");
//         });
// }





function send(event) {
    event.preventDefault();

    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };

    emailjs
        .send("service_2pvvrp5", "template_vx4fttl", templateParams)
        .then(() => {

            showAlert(
                "Message Sent!",
                "Thank you for contacting me. I will get back to you soon.",
                "✓"
            );

            // Clear form
            document.querySelector(".contact-form").reset();

        })
        .catch((error) => {

            console.error(error);

            showAlert(
                "Message Failed",
                "Something went wrong. Please try again later.",
                "!"
            );
        });
}

function showAlert(title, message, icon) {
    document.getElementById("alert-title").textContent = title;
    document.getElementById("alert-message").textContent = message;
    document.getElementById("alert-icon").textContent = icon;

    document.getElementById("custom-alert").classList.add("show");
}

function closeAlert() {
    document.getElementById("custom-alert").classList.remove("show");
}

/* =========================================
   SKILL SECTION INTERACTIVITY & ANIMATIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll-triggered reveal using IntersectionObserver
    const skillCategories = document.querySelectorAll(".skill-category");
    
    if ("IntersectionObserver" in window && skillCategories.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        });

        skillCategories.forEach(category => {
            skillObserver.observe(category);
        });
    } else {
        // Fallback for older browsers
        skillCategories.forEach(category => {
            category.classList.add("in-view");
        });
    }

    // 2. Interactive 3D Card Hover & Tilt Effect
    const skillCards = document.querySelectorAll("#skill .card");
    
    skillCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.03)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    // 3. Gallery Scroll-Triggered Reveal
    const galleryCards = document.querySelectorAll(".gallery-card");
    
    if ("IntersectionObserver" in window && galleryCards.length > 0) {
        const galleryObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("in-view");
                    }, (idx % 4) * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        });

        galleryCards.forEach(card => {
            galleryObserver.observe(card);
        });
    } else {
        galleryCards.forEach(card => {
            card.classList.add("in-view");
        });
    }

    // 4. Initialize Gallery Card Click Handlers for Lightbox
    initGalleryLightbox();
});

/* =========================================
   GALLERY LIGHTBOX LOGIC
========================================= */

let currentGalleryIndex = 0;
let galleryData = [];

function initGalleryLightbox() {
    const cards = document.querySelectorAll(".gallery-card");
    galleryData = [];

    cards.forEach((card, index) => {
        const img = card.querySelector("img");
        const title = card.getAttribute("data-title") || "Highlight";
        const tag = card.getAttribute("data-tag") || "Moment";
        const src = img ? img.getAttribute("src") : "";

        galleryData.push({ src, title, tag });

        card.addEventListener("click", () => {
            openLightbox(index);
        });
    });

    // Keyboard support for Lightbox
    document.addEventListener("keydown", (e) => {
        const lightbox = document.getElementById("gallery-lightbox");
        if (lightbox && lightbox.classList.contains("active")) {
            if (e.key === "Escape") {
                closeLightbox();
            } else if (e.key === "ArrowRight") {
                nextLightboxImage();
            } else if (e.key === "ArrowLeft") {
                prevLightboxImage();
            }
        }
    });
}

function openLightbox(index) {
    if (!galleryData.length || index < 0 || index >= galleryData.length) return;
    
    currentGalleryIndex = index;
    updateLightboxContent();

    const lightbox = document.getElementById("gallery-lightbox");
    if (lightbox) {
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("gallery-lightbox");
    if (lightbox) {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }
}

function updateLightboxContent() {
    const current = galleryData[currentGalleryIndex];
    if (!current) return;

    const imgElem = document.getElementById("lightbox-img");
    const titleElem = document.getElementById("lightbox-title");
    const tagElem = document.getElementById("lightbox-tag");
    const counterElem = document.getElementById("lightbox-counter");

    if (imgElem) {
        imgElem.style.opacity = "0.4";
        imgElem.src = current.src;
        imgElem.onload = () => {
            imgElem.style.opacity = "1";
        };
        imgElem.alt = current.title;
    }

    if (titleElem) titleElem.textContent = current.title;
    if (tagElem) tagElem.textContent = current.tag;
    if (counterElem) counterElem.textContent = `${currentGalleryIndex + 1} / ${galleryData.length}`;
}

function nextLightboxImage() {
    if (!galleryData.length) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
}

function prevLightboxImage() {
    if (!galleryData.length) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
}

