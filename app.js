let container = document.getElementById('commits');
let hpCharacters = [];

// Pagination DOM elements
const first = document.querySelector('.first');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const last = document.querySelector('.last');
let page = 0;
let arrayList = [];

// adding dropdown 
let dropdown = `
   <select class="changeBackgroundColor">
    <option value="">Choose a color</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
</select>`;


// adding input text
let inputText = `
 <div>
  <input type="text" name="fname" required>
  <button class="button" type="button">Click</button>
  </div>`;

const showError = (err) => {

    let errorLi = document.createElement('li');
    errorLi.style.cssText = 'color: red'
    errorLi.innerText = `Error ${err.status} (${err.statusText})`
    container.appendChild(errorLi);
    console.log(err);
}

const showEmployees = async () => {
    try {
        const res = await fetch('https://hiring.rewardgateway.net/list', {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + btoa('hard:hard') }
        }
        );
        hpCharacters = await res.json();
        displayEmployees(hpCharacters);
    } catch {
        showError('Error');
    }
};

const displayEmployees = async (characters) => {

    try {
        await characters.map(element => {

            let li = document.createElement('li');
            li.className = 'list-group-item';

            li.innerHTML = `
              <li>${dropdown}</li>
              <li>${inputText}</li>
              <li><a href="#"><b>uuid:</b> ${element.uuid}</a></li>
              <li><a href="#"><b>company:</b>  ${element.company}</a></li>
              <li><a href="#"><b>bio:</b> ${element.bio}</a></li>
              <li><a href="#"><b>title:</b> ${element.title}</a></li>
              <li class="addedInputText"><a href="#"><b>Inputed Text:</b> </a></li>
              <li><b>avatar</b><br/><a href="${element.avatar}" target="_blank"><img src="${element.avatar}" alt=""></a></li>
              `;
            arrayList.push(li);

        });

    } catch {
        showError('Error')
    }

    // Pagination for list items - 20 items per page
    for (let i = 1; i < page + 21; i++) {
        container.append(arrayList[i])
    }

    next.addEventListener('click', () => {

        page == arrayList.length - 21 ? (page = 0) : (page += 21);
        container.innerHTML = "";

        for (let i = page; i < page + 21; i++) {

            container.append(arrayList[i])
        }
    });

    previous.addEventListener('click', () => {

        page == 0 ? (page = arrayList.length - 21) : (page -= 21);
        container.innerHTML = "";

        for (let i = page; i < page + 21; i++) {

            container.append(arrayList[i])
        }
    });


    first.addEventListener('click', () => {
        page = 0;
        container.innerHTML = "";
        for (let i = page; i < page + 21; i++) {
            container.append(arrayList[i])

        }
    });

    last.addEventListener('click', () => {

        page = arrayList.length - 21;
        container.innerHTML = "";
        for (let i = page; i < page + 21; i++) {
            container.append(arrayList[i])

        }
    });

};


// Adding dropdown and change backgroud color for lists
const dropdownFunc = () => {
    let dropdownBtn = document.querySelector('.changeBackgroundColor');
    dropdownBtn.addEventListener('change', async () => {

        let backgroundColorValue = document.querySelector('.changeBackgroundColor').value;

        let listItem = document.querySelectorAll('#commits li');

        listItem.forEach(element => {
            element.style.backgroundColor = backgroundColorValue;
        });

        let listItemAnchorTag = document.querySelectorAll('#commits li li a');

        listItemAnchorTag.forEach(el => {
            el.style.color = 'white';
        })
    })
}

const appendInputText = () => {

    // Add input text input for each list item
    let addBtn = document.querySelector('.list-group-item button');

    addBtn.addEventListener('click', () => {

        let addInputTxt = document.querySelector('.list-group-item input').value;
        let addedTxtInput = document.querySelector('.addedInputText');

        addedTxtInput.append(addInputTxt)

    })
}

// Search appened text - jQuery helps
$('#search-input').on('keyup', function () {

    let value = $(this).val().toLowerCase();
    $('#commits > li li').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
})

// just trial - Persist the added background color and label data after page refresh
function persistRefreshing() {
    if (sessionStorage.getItem('colour')) {

        let listItem = document.querySelectorAll('#commits li');
        document.body.style.backgroundColor = sessionStorage.getItem('colour');
    }else{
        document.body.style.backgroundColor =  "#ff0000";
        sessionStorage.setItem('colour', "#ff0000");
    }
}


persistRefreshing();


setTimeout(() => {
    dropdownFunc();
    appendInputText();
    changeBackground();
}, 1500)

