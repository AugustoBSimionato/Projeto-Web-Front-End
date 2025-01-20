window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm");
  const userList = document.getElementById("userList");
  const clearFormButton = document.getElementById("clearForm");
  const clearListButton = document.getElementById("clearList");
  const searchInput = document.getElementById("search");

  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const date = new Date().toLocaleString();

    const user = { username, email, date };
    saveUser(user);
    displayUsers();
    userForm.reset();
  });

  clearFormButton.addEventListener("click", function () {
    userForm.reset();
  });

  clearListButton.addEventListener("click", function () {
    localStorage.removeItem("users");
    displayUsers();
  });

  searchInput.addEventListener("input", function () {
    displayUsers(searchInput.value);
  });

  userList.addEventListener("click", function (e) {
    // Change this line to match the delete-btn class
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      deleteUser(index);
      displayUsers();
    }
  });

  function saveUser(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
  }

  function displayUsers(search = "") {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    userList.innerHTML = "";
    users.forEach((user, index) => {
      if (user.username.includes(search) || user.email.includes(search)) {
        const li = document.createElement("li");
        li.innerHTML = `${user.date} - ${user.username} - ${user.email} <button class="delete-btn" data-index="${index}">Excluir</button>`;
        userList.appendChild(li);
      }
    });
  }

  displayUsers();
});
