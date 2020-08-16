const first = document.querySelector('.first');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const last = document.querySelector('.last');
let page = 0;
let arrayList = [];

let dropdownBtn = `
     <div class="dropdown">
       <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select background</button>
       <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Black</a>
    <a class="dropdown-item" href="#">Red</a>
    </div>
   </div>
   `;

async function showEmployees() {

    const container = document.querySelector('.list-group');
    const baseUrl = 'https://hiring.rewardgateway.net/list';

    fetch(baseUrl, {
        method: 'GET',
        headers: { 'Authorization': 'Basic ' + btoa('hard:hard') }
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

            data.map(element => {

                let li = document.createElement('li');
                li.className = 'list-group-item';

                li.innerHTML = `
                    <div>
                    ${dropdownBtn}
                    <p><b>uuid</b>: ${element.uuid}</p>
                    <p><b>company</b>: ${element.company}</p>
                    <p><b>bio</b>: ${element.bio}</p>
                    <p><b>name</b>: ${element.name}</p>
                    <p><b>title</b>: ${element.title}</p>
                    <p><b>avatar</b><br/><a href="${element.avatar}" target="_blank"><img src="${element.avatar}" alt=""></a></p>
                    </div>
                    `;
                arrayList.push(li);
            })

            for (let i = 1; i < page + 21; i++) {
                container.appendChild(arrayList[i])
            }

            next.addEventListener('click', () => {

                page == arrayList.length - 21 ? (page = 0) : (page += 21);
                container.innerHTML = "";

                for (let i = page; i < page + 21; i++) {

                    container.appendChild(arrayList[i])
                }
            });

            previous.addEventListener('click', () => {

                page == 0 ? (page = arrayList.length - 21) : (page -= 21);
                container.innerHTML = "";

                for (let i = page; i < page + 21; i++) {

                    container.appendChild(arrayList[i])
                }
            });


            first.addEventListener('click', () => {
                page = 0;
                container.innerHTML = "";
                for (let i = page; i < page + 21; i++) {
                    container.appendChild(arrayList[i])
                }
            });

            last.addEventListener('click', () => {

                page = arrayList.length - 21;
                container.innerHTML = "";
                for (let i = page; i < page + 21; i++) {
                    container.appendChild(arrayList[i])
                }
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

setTimeout( () => {
    let drpBtn = document.querySelector('.dropdown-item:first-child');
    drpBtn.style.color = 'tomato'
    console.log(drpBtn);
}, 3500)



