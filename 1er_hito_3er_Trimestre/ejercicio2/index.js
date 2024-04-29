const API_URL = "https://jsonplaceholder.typicode.com/users";

const HTMLResponse = document.querySelector("#app");

fetch(API_URL)
    .then((response) => response.json())
    .then((users) => {
        const tpl = users.map(user => `<li>${user.name} - ${user.email}</li>`);
        HTMLResponse.innerHTML = `<ul>${tpl.join('')}</ul>`;
    });
