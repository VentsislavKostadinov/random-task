async function showEmployees() {

    const container = document.getElementById('commits');
    const baseUrl = 'https://hiring.rewardgateway.net/list';


    fetch(baseUrl, {
        method: 'GET',
        headers: {'Authorization': 'Basic ' + btoa('hard:hard')}
    })

        .then(res => {

            if (res.status < 400) {
                return res.json();

            } else {
                throw ({
                    status: res.status,
                    statusText: res.statusText
                })
            }
        })

        .then(data => {
            console.log(data)
            data.forEach(element => {

                let li = document.createElement('li');

                li.innerText = `uuid: ${element.uuid}
                  company: ${element.company} 
                  bio: ${element.bio}
                  name: ${element.name}
                  title: ${element.title}
                  avatar: ${element.avatar}
                  \n`;

                container.appendChild(li);
            });
        })

        .catch(err => {                                      // If return an error -  resolve a new promise here (catch)
            let errorLi = document.createElement('li');
            errorLi.style.cssText = 'color: red'
            errorLi.innerText = `Error ${err.status} (${err.statusText})`
            container.appendChild(errorLi)
            console.log(err)
        })

}

/*  async function showEmployees() {

    const username = 'hard';
    const password = username;

    const baseUrl = 'https://hiring.rewardgateway.net/list';

    fetch(baseUrl, {
        headers: {

            "Authorization": "Basic" + username + password,

        }

    })

    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
} */

/*  async function showEmployees() {

    const baseUrl = 'https://hiring.rewardgateway.net/list';

    try {
        const res = await axios.get(baseUrl, {
            // Axios looks for the `auth` option, and, if it is set, formats a
            // basic auth header for you automatically.
            auth: {
                username: 'hard',
                password: 'hard'
            }
        });

        console.log(res)
    } catch (error) {
        throw new Error(error.message)
    }

}*/

