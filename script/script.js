const div1 = document.body.querySelector('#div1');
const button = document.body.querySelector('#btn');
const h1 = document.body.querySelector('h1');
const back = document.body.querySelector('.back');


button.addEventListener('click', function (event) {
    event.preventDefault();
    div1.innerHTML = '';

    const input = document.querySelector('#inputLang');
    let text = input.value;

    h1.innerText = text.toUpperCase();
    h1.style.textAlign = "center";
    h1.style.color = "hsl(200, 95%, 50%)";


    inputReady(input);
})
function inputReady(lang) {
    const url = `https://restcountries.com/v3.1/lang/${lang.value}`;

    fetch(url).then(function (response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw 'Fetch failed';
        }
    }).then(function (data) {
        let highestPop = [];
        for (let i = 0; i < data.length; i++) {

            const divNew = document.createElement('div');
            div1.append(divNew);

            const p1 = document.createElement('p');
            const p2 = document.createElement('p');
            const p3 = document.createElement('p');
            const p4 = document.createElement('p');
            p4.setAttribute("id", `population`);
            const flag = document.createElement('img');

            p1.innerText = data[i].name.official;
            p2.innerText = data[i].subregion;
            p3.innerText = data[i].capital;
            p4.innerText = data[i].population;


            flag.src = data[i].flags.png;
            flag.style.width = "60%";

            divNew.append(p1);
            divNew.append(p2);
            divNew.append(p3);
            divNew.append(p4);
            divNew.append(flag);
            divNew.style.width = "40vw";
            divNew.style.height = "40vw";
            divNew.style.alignSelf = "center";
            divNew.style.textAlign = "center";
            divNew.style.border = "solid 5px hsl(200, 95%, 50%)";
            divNew.style.display = "flex";
            divNew.style.flexFlow = "column nowrap";
            divNew.style.justifyContent = "center";

            p4.style.alignSelf = "center";
            flag.style.alignSelf = "center";


            highestPop.push(data[i].population);

            console.log(highestPop);
            divNew.style.backgroundColor = "hsl(20, 80%, 80%)";
        }
        console.log(Math.max(...highestPop));
        let HighNum = Math.max(...highestPop);
        console.log(HighNum);

        for (let i = 0; i < data.length; i++) {

            const alla = back.querySelectorAll("div")[i + 1].children[3];
            console.log(alla);
            if (HighNum == alla.innerHTML) {
                alla.style.backgroundColor = "hsl(300, 90%, 40%)";
                alla.style.width = "30%";
                const parent = alla.parentNode;
                console.log(parent);
                parent.style.backgroundImage = `repeating-conic-gradient(hsl(210, 80%, 70%) 10%, hsl(260, 80%, 70%) 20%)`;
                parent.firstChild.style.fontSize = "30px";
                parent.style.color = "white";


            }
        }

    }).catch(function (error) {
        console.log(error);
        const h4 = document.createElement('h4');
        div1.appendChild(h4);
        h4.innerText = "Språk hittas ej :(";
    });
}

div1.style.display = "flex";
div1.style.flexFlow = "row wrap";
div1.style.justifyContent = "space-around";
div1.style.gap = "10vh";
back.style.backgroundImage = "linear-gradient(hsl(70, 60%, 90%), hsl(200, 95%, 70%))";
back.style.minHeight = "100vh";
back.style.padding = "5vh";









