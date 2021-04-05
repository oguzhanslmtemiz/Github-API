let searchSelectList = document.querySelector("#search-select-list")
let hamburgerMenu = document.querySelector("#hamburger-menu")
let searchSubmit = document.querySelector("#search-submit")
let searchSelect = document.querySelector("#search-select")
let searchInput = document.querySelector("#search-input")
let searchGroup = document.querySelector("#search-group")
let main = document.querySelector("#main")


searchInput.addEventListener("focusin", UI.addBoxShadow)
searchInput.addEventListener("focusout", UI.delBoxShadow)
searchSelectList.addEventListener("click", UI.searchType)
searchInput.addEventListener("search", search)
searchSubmit.addEventListener("click", search)

let github = new Github()

function search() {
    UI.clearResults()
    UI.addSearchResultsElement()
    let ui = new UI()
    if (searchInput.value.trim() !== "" && searchSelect.innerText === "Users ") {
        github.getData(searchSelect.innerText.trim().toLowerCase(), searchInput.value.trim())
            .then(response => {
                ui.addUsersResults(response)
                ui.pagination(response.transmitted.url, response.total_count)
            })
    } else if (searchInput.value.trim() !== "" && searchSelect.innerText === "Repositories ") {
        github.getData(searchSelect.innerText.trim().toLowerCase(), searchInput.value.trim())
            .then(response => {
                ui.addRepositoriesResults(response)
                ui.pagination(response.transmitted.url, response.total_count)
            })
    } else if (searchInput.value.trim() !== "" && searchSelect.innerText === "Issues ") {
        github.getData(searchSelect.innerText.trim().toLowerCase(), searchInput.value.trim())
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
        .then(response => ui.changeResults(response))
}

