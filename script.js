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
            alert("Message sent successfully");
        })
        .catch((error) => {
            console.error(error);
            alert("Email not sent");
        });
}