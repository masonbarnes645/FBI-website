function getData(url) {
    fetch(url)
    .then(res => res.json())
    .then(people => people.items.forEach(extractInfo))
    .catch(err => console.log(err))
}
getData('https://api.fbi.gov/wanted/v1/list')

//! Global variables
const wantedList = document.querySelector("#wanted-list")
const overlay = document.querySelector("#overlay");

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

    //If statement to exclude missing persons 
    if (!path.includes("missing-persons")) {
            createWantedDiv(name, image, description, path, wantedObj)
        }
}


// Create the div elements for each wanted person
function createWantedDiv (name, image, description, path, wantedObj) {
    

    // Create div and children elements
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const img = document.createElement("img")
    const pDescription = document.createElement("p")
    const pPath = document.createElement("p")

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
        if (!overlay.innerHTML) {
            populateDivOverlay(name, image, wantedObj)
        }

        })

    //div.addEventListener("mouseleave", (e) => onMouseLeave())

    wantedList.appendChild(div)

}

function populateDivOverlay(cleanerName, image, wantedObj) {
    

    const h3 = document.createElement("h3")
    const img = document.createElement("img")
    const pWarning = document.createElement("p")
    const pReward = document.createElement("p")
    const pDescription = document.createElement("p")

    h3.textContent = cleanerName
    pWarning.textContent = wantedObj.warning_message
    pReward.textContent = wantedObj.reward_text
    pDescription.textContent = wantedObj.description


    img.src = image
    img.alt = cleanerName

    overlay.append(h3, img, pWarning, pReward, pDescription)

}

function onMouseLeave() {
    overlay.innerHTML = ""
}
