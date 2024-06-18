function getData(url) {
    fetch(url)
    .then(res => res.json())
    .then(jsonObj => jsonObj.items.forEach(extractInfo))
    .catch(err => console.log(err))
}

getData('https://api.fbi.gov/wanted/v1/list')


//! Global variables
const wantedList = document.querySelector("#wanted-list")

// Extracts info from a wanted obj and creates a div for it 
// as long as that person is not a missing person
function extractInfo(wantedObj) {
    let name = wantedObj.title;
    
    /* Eliminates what follows a dash, which is often the 
    name of a city or a crime, which we do not want to include 
    in our name*/
    if(name.includes(" - ")){
        const nameArray = name.split(" - ")
        const cleanerName = nameArray[0]

       name = cleanerName
    }

    const image = wantedObj.images[0].large;
    const description = wantedObj.description;
    const path = wantedObj.path

    const reward = wantedObj.reward_text
    const warning = wantedObj.warning_message

    //If statement to exclude missing persons 
    if (!path.includes("missing-persons")) {
            createWantedDiv(name, image, description, path, reward, warning)
        }
}


// Create the div elements for each wanted person
function createWantedDiv (name, image, description, path, reward, warning) {
    

    // Create div and children elements
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const img = document.createElement("img")
    const pDescription = document.createElement("p")
    const pPath = document.createElement("p")

    const pWarning = document.createElement("p")
    const pReward = document.createElement("p")


    //Give each div a unique id and a class name for CSS
    div.id = name.split(' ').join("-").split(",").join('')
    div.className = "wanted-divs"


    img.src = image
    img.alt = name

    h3.textContent = name

    pDescription.textContent = description
    pPath.textContent = path

    div.append(h3, img, pDescription, pPath)
    
    div.addEventListener("mouseover", (e) => {
        pWarning.textContent = warning
        pReward.textContent = reward
        div.classList.add("detail-view")

        div.append(pWarning, pReward)
    })

    div.addEventListener("mouseleave", (e) => {
       pWarning.remove()
       pReward.remove()

       div.classList.remove("detail-view")
    })

    wantedList.appendChild(div)

}


const searchBar = document.querySelector('#search-bar input')
searchBar.addEventListener('input', searchData)
function searchData() {
    const fugitiveList = document.querySelectorAll('#wanted-list > div');
    const fugitiveArray = Array.from(fugitiveList);
    fugitiveArray.forEach(function (child) {
        const childText = child.querySelector('h3').textContent.toUpperCase()
        if (!childText.includes(searchBar.value.toUpperCase())) {
            child.style.display = "none"
        }
        else {
            child.style.display = ""
        }

    })
};

const formRevealButton = document.querySelector("#new-criminal-button")
formRevealButton.addEventListener("click", (e) => console.log(`Button was clicked ${e}`))

const form = document.querySelector('#new-criminal-form')
form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    console.log(e)

    const newCriminal = {
        name: e.target.name.value,
        image: e.target.image.value,
        
    }

}











   
       