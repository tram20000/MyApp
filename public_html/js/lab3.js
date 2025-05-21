
document.addEventListener('DOMContentLoaded', function () {
    const form = document.forms["commentForm"];
    if (form) {
        form.addEventListener('submit', function (event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
    }


    showSuccessMessage();
});

function validateForm() {
    let name = document.forms["commentForm"]["name"].value.trim();
    let comment = document.forms["commentForm"]["comment"].value.trim();
    let rating = document.forms["commentForm"]["rating"].value;

    if (name === "" || comment === "" || rating === "") {
        alert("Please fill out all fields before submitting!");
        return false;
    }
    return true;
}

function loadComments() {
    fetch('../data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const commentsDiv = document.getElementById('commentsSection');
            commentsDiv.innerHTML = '';
            if (data.length === 0) {
                commentsDiv.innerHTML = '<p>No comments yet.</p>';
            } else {
                data.reverse();
                data.forEach(entry => {
                    const commentBox = document.createElement('div');
                    commentBox.className = 'comment';
                    commentBox.innerHTML = `
                        <strong>${entry.name}</strong> (${entry.rating}) 
                        <em>${entry.timestamp}</em><br>
                        ${entry.comment.replace(/\n/g, '<br>')}
                    `;
                    commentsDiv.appendChild(commentBox);
                });
            }
        })
        .catch(error => {
            console.error('Error loading comments:', error);
            document.getElementById('commentsSection').innerHTML = '<p>Could not load comments.</p>';
        });
}

function showSuccessMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = '✅ Your comment has been saved!';
        const container = document.querySelector('.container');
        container.insertBefore(messageDiv, container.firstChild);

        setTimeout(() => {
            messageDiv.remove();
        }, 4000); 
    }
}
