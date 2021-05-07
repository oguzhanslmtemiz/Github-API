let searchSelectList = document.querySelector("#search-select-list")
let hamburgerMenu = document.querySelector("#hamburger-menu")
let searchSubmit = document.querySelector("#search-submit")
let searchSelect = document.querySelector("#search-select")
let searchInput = document.querySelector("#search-input")
let searchGroup = document.querySelector("#search-group")
let main = document.querySelector("#main")
let navigation = document.querySelector("#navigation")
let userResultsDiv = document.querySelector("#userResultsDiv")
let userResults = document.querySelector("#userResults")
let followingTab = document.getElementById("user-following-tab")
let followersTab = document.getElementById("user-followers-tab")


searchInput.addEventListener("focusin", UI.addBoxShadow)
searchInput.addEventListener("focusout", UI.delBoxShadow)
searchSelectList.addEventListener("click", UI.searchType)
searchInput.addEventListener("search", search)
searchSubmit.addEventListener("click", search)
followingTab.addEventListener('shown.bs.tab', showFollow)
followersTab.addEventListener('shown.bs.tab', showFollow)
document.addEventListener("DOMContentLoaded", addRecentSearches);

let github = new Github()
//catch leri ekle
function search(e, t, i) {
    console.log("event:", e, "t:", t, "i:", i)
    UI.hideResults()
    UI.clearResults(document.getElementById("searchResultsDiv"))
    UI.addSearchResultsElement()
    UI.searchLoader("search-results")
    let paginationElement = document.getElementById("search-pagination")
    let type = (t === undefined) ? searchSelect.innerText.trim().toLowerCase() : t
    let input = (i === undefined) ? searchInput.value.trim() : i
    let ui = new UI()
    console.log("type:", type, "input:", input);
    if (input !== "" || (t && i) !== undefined) {
        ((t && i) === undefined) ? recentSearch(type, input.toLowerCase()): null
        if (type === "users") {
            github.getSearchData(type, input)
                .then(response => {
                    ui.addUsersResults(response)
                    ui.pagination(response.transmitted, response.total_count, paginationElement)
                })
        } else if (type === "repositories") {
            github.getSearchData(type, input)
                .then(response => {
                    ui.addRepositoriesResults(response)
                    ui.pagination(response.transmitted, response.total_count, paginationElement)
                })
        } else if (type === "issues") {
            github.getSearchData(type, input)
                .then(response => {
                    ui.addIssuesResults(response)
                    ui.pagination(response.transmitted, response.total_count, paginationElement)
                })
        } else {
            console.log("Unexpected Search Type")
        }
    } else {
        ui.addEmptyResults()
    }
    hamburgerMenu.classList.remove("open")
}

function changePage(transmitted, page) {
    window.scrollTo(0, 0)
    let ui = new UI()
    console.log("changePage() ", transmitted, "page=", page);
    console.log(typeof (transmitted));

    if (typeof (transmitted) === "string") {
        let type = transmitted.split("/")[5]
        console.log("type", type);

        if (type === "following") { // following Tab
            UI.searchLoader("user-following-results")
            github.getFollowData(transmitted, page)
                .then(response => {
                    ui.changeTabResults(response, type)
                })
        } else if (type === "followers") { // followers Tab
            UI.searchLoader("user-followers-results")
            github.getFollowData(transmitted, page)
                .then(response => {
                    ui.changeTabResults(response, type)
                })
        } else if (type === "repos") { // Repositories Tab
            UI.searchLoader("user-repos-results")
            github.getUserRepo(transmitted, page)
                .then(response => {
                    ui.changeTabResults(response, type)
                })
        } else {
            console.log("WTFFFFFFF");
        }
    } else { // Search, transmitted = object
        UI.searchLoader("search-results")
        github.getPageData(transmitted, page)
            .then(response => ui.changeSearchResults(response))
    }
}

let userResponse

function showUser(username) {
    console.log("searchResultsDiv temizlendi");
    UI.clearPreviousResults()
    UI.showResults()
    let ui = new UI()

    ui.overview.setAttribute("style", "display:none !important")
    ui.ph_overview.setAttribute("style", "display:block !important")
    UI.repoLoader()

    github.getUserData(username)
        .then(response => {
            ui.showUser(response)
            userResponse = response
            github.getUserRepo(response.repos_url)
                .then(responseRepo => {
                    ui.showRepos(responseRepo, response.repos_url, response.public_repos)
                })
        }).then(function () {
            ui.overview.setAttribute("style", "")
            ui.ph_overview.setAttribute("style", "")
        })
    let type = "user"
    let input = "@" + username
    // recentSearch(type, input) // burda kaldim
}

function showFollow(event) {
    let ui = new UI()
    let followingPagination = document.getElementById("following-pagination")
    let followersPagination = document.getElementById("followers-pagination")
    let followingUrl = userResponse.following_url.split("{")[0]
    let followersUrl = userResponse.followers_url
    let followingCount = document.getElementById("user-following-count").innerText
    let followersCount = document.getElementById("user-followers-count").innerText

    if (event.target.id === "user-following-tab" && followingPagination.childElementCount === 0 && followingCount > 0) {
        UI.searchLoader("user-following-results")
        github.getFollowData(followingUrl)
            .then(resp => {
                ui.changeTabResults(resp, "following")
                ui.pagination(followingUrl, followingCount, followingPagination)
            })
    }
    if (event.target.id === "user-followers-tab" && followersPagination.childElementCount === 0 && followersCount > 0) {
        UI.searchLoader("user-followers-results")
        github.getFollowData(followersUrl)
            .then(resp => {
                ui.changeTabResults(resp, "followers")
                ui.pagination(followersUrl, followersCount, followersPagination)
            })
    }
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("dark-mode").innerText = "Light Mode"
}
document.getElementById("dark-mode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode")
    document.getElementById("dark-mode").innerText = "Dark Mode"
    let theme = "light";
    if (document.body.classList.contains("dark-mode")) {
        document.getElementById("dark-mode").innerText = "Light Mode"
        theme = "dark";
    }
    localStorage.setItem("theme", theme);
})

function addRecentSearches(obj) {
    let searched
    if (obj.type === "DOMContentLoaded") {
        searched = JSON.parse(localStorage.getItem("searched") || '[]')
    } else {
        searched = [obj]
    }
    console.log(searched);

    searched.forEach(element => {
        let color = "text-warning"
        if (element.type === "users") {
            color = "text-primary"
        } else if (element.type === "repositories") {
            color = "text-success"
        } else if (element.type === "issues") {
            color = "text-danger"
        }
        let div = document.createElement("div")
        div.className = "d-flex text-muted py-3 align-items-center hover"
        div.setAttribute("onclick", `search(event,'${element.type}','${element.input}')`)
        div.innerHTML = `
            <svg class="svg flex-shrink-0 me-2 rounded ${color}" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="100%" height="100%"></rect>
            </svg>
            <span class="text-capitalize">${element.type} / ${element.input}</span>`
        document.getElementById("recent-searches").prepend(div)
    })
}

function recentSearch(type, input) {
    let searchedStr = localStorage.getItem("searched") || '[]'
    let searched = JSON.parse(searchedStr)
    let obj = {
        type,
        input
    }
    if (searchedStr.includes(JSON.stringify(obj)) === false) {
        searched.push(obj);
    }
    localStorage.setItem("searched", JSON.stringify(searched))
    // addRecentSearchtoUI(searched)
    addRecentSearches(obj)
}

function clearRecentSearch() {
    localStorage.removeItem("searched")
    UI.clearResults(document.getElementById("recent-searches"))
}



//recent searches
//loader
//image placeholder