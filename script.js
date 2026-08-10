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