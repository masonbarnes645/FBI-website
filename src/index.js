// One reuseable function for getting data from a URL
function getData(url, func) {
    fetch(url)
    .then(res => res.json())
    .then(returnValue => func(returnValue))
    .catch(err => console.log(err))
}


function handleFBIReturn(jsonObj){
    jsonObj.items.forEach(extractInfo)
}

function handleFriendReturn(list) {
    list.forEach(extractFriendInfo)
}

getData('https://api.fbi.gov/wanted/v1/list', handleFBIReturn)
getData('http://localhost:3000/friends', handleFriendReturn)

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
    const path = wantedObj.path;

    const reward = wantedObj.reward_text;
    const warning = wantedObj.warning_message;

    //If statement to exclude missing persons 
    if (!path.includes("missing-persons")) {
        // Run appendChild here instead of in the create wanted div function so that we can re-use
        // createWantedDiv but prepend a div with our friends on it
            createWantedDiv(name, image, description, path, reward, warning, "append")
        }
}


// Create the div elements for each wanted person
function createWantedDiv (name, image, description, path, reward, warning, position, id) {
    

    // Create div and children elements
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const img = document.createElement("img")
    const pDescription = document.createElement("p")
    const pWarning = document.createElement("p")
    const pReward = document.createElement("p")



    //Give each div a unique id and a class name for CSS
    div.id = name.split(' ').join("-").split(",").join('')
    div.className = "wanted-divs"


    img.src = image
    img.alt = name

    h3.textContent = name

    pDescription.textContent = description

    div.append(h3, img, pDescription)
    
    // Add event listener for mouseover
    div.addEventListener("mouseover", (e) => {
        pWarning.textContent = warning
        pReward.textContent = reward
        div.classList.add("detail-view")

        div.append(pWarning, pReward)
    })

    // Add event listener for mouse leave
    div.addEventListener("mouseleave", (e) => {
       pWarning.remove()
       pReward.remove()

       div.classList.remove("detail-view")
    })

    // Ternary to determine whether to append or prepend the div element based on 
    // the arg passed to the function
    position === "prepend" ? wantedList.prepend(div) : wantedList.append(div)

    // If the object was created by us, it will have the path friends
    // If it has the path friends, add a trash can icon with a click listener
    if (path.includes("friends")){
        div.innerHTML += `<i id="trash-${div.id}" class="fa-solid fa-trash"></i>`
        const trashIcon = document.querySelector(`#trash-${div.id}`)
        trashIcon.addEventListener("click", (e) => deleteFriend(div, id))
    }

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

//Creates function to handle form submission 
function handleSubmit(e) {
    e.preventDefault();
    
    const newCriminal = {
        name: e.target.name.value,
        image: e.target.image.value,
        crimes: e.target.crimes.value,
        warning: e.target.warning.value,
        reward: e.target.reward.value,
        path: "/wanted/friends",
        id: uuidv4().slice(0,4)     // Create unique 4 character id for JSON obj
    }
    
    
    fetch("http://localhost:3000/friends", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCriminal)
    }) 
    .then(res => {
        if (!res.ok) {
            wantedList.children[0].remove()
        }

        else {
            e.target.reset()
        }
    })
    .catch(err => console.log(err))
    
    // Optimistic approach
    extractFriendInfo(newCriminal)
    
}

// Extract info from a friend obj for page load 
function extractFriendInfo(friendObj) {
    const name = friendObj.name.toUpperCase();
    const image = friendObj.image;
    const crimes = friendObj.crimes;
    const warning = friendObj.warning.toUpperCase();
    const reward = `The FBI is offering a reward of $${friendObj.reward} for information that leads to the the capture of ${friendObj.name}.`;
    const path = friendObj.path;
    const id = friendObj.id


    createWantedDiv(name, image, crimes, path, reward, warning, "prepend", id)
}


// Function to delete a friend div we have created using a DELETE request
function deleteFriend(wantedDiv, id) {
    // Pessimistic approach 
    fetch(`http://localhost:3000/friends/${id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(() => wantedDiv.remove())
    .catch(err => console.log(err))
}