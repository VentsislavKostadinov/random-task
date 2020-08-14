
async function showEmployees() {

    const username = 'hard';
    const password = username;

    const baseUrl = 'https://hiring.rewardgateway.net/list';


    fetch(baseUrl, {
        headers: {
            // remove all those random headers you added
            //"api-key": apiKeySecured
            method: "GET",
            "Content-Type": "application/json",
            'Authorization': 'Basic' + username + password,
            "Access-Control-Allow-Origin": "*" // Required for CORS support to work
            
        },
        mode: 'cors' // add this 
    }).then(response => response.json())

        .then(myJson => {

            console.log(JSON.stringify(myJson));
        })

        .catch(error => console.error(error.message));

}