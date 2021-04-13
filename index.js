let searchSelectList = document.querySelector("#search-select-list")
let hamburgerMenu = document.querySelector("#hamburger-menu")
let searchSubmit = document.querySelector("#search-submit")
let searchSelect = document.querySelector("#search-select")
let searchInput = document.querySelector("#search-input")
let searchGroup = document.querySelector("#search-group")
let main = document.querySelector("#main")
let navigation = document.querySelector("#navigation")
let userResults = document.querySelector("#userResults")


searchInput.addEventListener("focusin", UI.addBoxShadow)
searchInput.addEventListener("focusout", UI.delBoxShadow)
searchSelectList.addEventListener("click", UI.searchType)
searchInput.addEventListener("search", search)
searchSubmit.addEventListener("click", search)

let github = new Github()
//catch leri ekle
function search() {
    UI.hideResults()
    document.getElementById("searchResultsDiv").innerHTML = ""
    UI.addSearchResultsElement()
    let ui = new UI()
    if (searchInput.value.trim() !== "" && searchSelect.innerText === "Users ") {
        github.getSearchData(searchSelect.innerText.trim().toLowerCase(), searchInput.value.trim())
            .then(response => {
                ui.addUsersResults(response)
                ui.pagination(response.transmitted.url, response.total_count)
            })
    } else if (searchInput.value.trim() !== "" && searchSelect.innerText === "Repositories ") {
        github.getSearchData(searchSelect.innerText.trim().toLowerCase(), searchInput.value.trim())
            .then(response => {
                ui.addRepositoriesResults(response)
                ui.pagination(response.transmitted.url, response.total_count)
            })
    } else if (searchInput.value.trim() !== "" && searchSelect.innerText === "Issues ") {
        github.getSearchData(searchSelect.innerText.trim().toLowerCase(), searchInput.value.trim())
            .then(response => {
                ui.addIssuesResults(response)
                ui.pagination(response.transmitted.url, response.total_count)
            })
    } else {
        ui.addEmptyResults()
    }
    hamburgerMenu.classList.remove("open")
}

function changePage(url, page) {
    let ui = new UI()
    github.getPageData(url, page)
        .then(response => ui.changeResults(response)) //sadece users
}

function showUser(username) {
    document.getElementById("searchResultsDiv").innerHTML = ""
    UI.showResults()
    let ui = new UI()
    console.log(username);
    github.getUserData(username)
        .then(response => {
            ui.showUser(response)
            console.log("nebunebu", response)
        })
}