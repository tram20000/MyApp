document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("darkModeToggle");
    const dropdowns = document.querySelectorAll(".dropdown");

   
    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
            toggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
        });

        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            toggle.textContent = "Light Mode";
        } else {
            toggle.textContent = "Dark Mode";
        }
    }

    function AllPages() {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
            if (toggle) toggle.textContent = "Light Mode";
        } else {
            document.body.classList.remove("dark-mode");
            if (toggle) toggle.textContent = "Dark Mode";
        }
    }
    AllPages();

  
    dropdowns.forEach((dropdown) => {
        const dropbtn = dropdown.querySelector(".dropbtn");
        const dropdownContent = dropdown.querySelector(".dropdown-content");

        dropbtn.addEventListener("click", function (e) {
            e.preventDefault();
            dropdownContent.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
            if (!dropdown.contains(e.target)) {
                dropdownContent.classList.remove("show");
            }
        });
    });

    
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("formMessage");
            if (!name || !email) {
                e.preventDefault();
                message.textContent = "All fields are required!";
                message.style.color = "red";
            } else {
                message.textContent = "Form submitted successfully!";
                message.style.color = "green";
            }
        });
    }
      const url = new URL(window.location.href);
  if (url.searchParams.get("status") === "sent") {
    const msg = document.getElementById("confirmationMessage");
    if (msg) {
      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
        url.searchParams.delete("status");
        history.replaceState(null, "", url.pathname);
      }, 3000);
    }
  }


    
    const myForm = document.getElementById("myForm");
    if (myForm) {
        myForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message");

            if (name === "" || email === "") {
                message.textContent = "Please fill out all fields.";
                message.style.color = "red";
            } else {
                message.textContent = "Form submitted successfully!";
                message.style.color = "green";
            }
        });
    }

   
    const skills = document.querySelectorAll(".skill-fill");
    skills.forEach(skill => {
        const level = skill.getAttribute("data-level");
        skill.style.width = level;
    });
});
