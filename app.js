document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const userInfoDiv = document.getElementById('userInfo');

    // Clear previous user info
    userInfoDiv.innerHTML = '';

    // Fetch user info from GitHub API
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === "Not Found") {
                userInfoDiv.innerHTML = `<p>User not found</p>`;
            } else {
                displayUserInfo(data);
                fetchUserRepos(username);
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            userInfoDiv.innerHTML = `<p>Error fetching user data</p>`;
        });
});

function displayUserInfo(user) {
    const userInfoDiv = document.getElementById('userInfo');
    const userInfoHtml = `
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}" alt="${user.login}" width="150">
        <p>Name: ${user.name}</p>
        <p>Bio: ${user.bio}</p>
        <p>Public Repos: ${user.public_repos}</p>
        <h3>Repositories:</h3>
        <ul id="repoList"></ul>
    `;
    userInfoDiv.innerHTML = userInfoHtml;
}

function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(repos => {
            const repoList = document.getElementById('repoList');
            repos.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.textContent = repo.name;
                repoList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching repos:', error);
            const repoList = document.getElementById('repoList');
            repoList.innerHTML = `<p>Error fetching repos</p>`;
        });
}
