function usersList(url) {
    try {
        return fetch(url)
            .then(response => response.json())
    } catch (Error) {
        throw new Error('Данные с сервера не получены')
    }
}

async function paragraph(repos_url) {
    if (repos_url) {
        let repos = await usersList(repos_url)
        repos.forEach(rep => {
            if (rep.name) {
                let text = document.createElement('p')
                text.innerText = rep.name
                document.body.appendChild(text)
            }
        })
    }
}

function avatar(avatar_url) {
    if (avatar_url) {
        let image = document.createElement('img')
        image.src = avatar_url
        document.body.appendChild(image)
    }
}


async function users() {
    let users = await usersList('https://api.github.com/users?since=250')
    for (var user of users) {
        await avatar(user.avatar_url)
        await paragraph(user.repos_url)
    }

}
users()