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
let rateLimit = document.getElementById("rate-limit")

searchInput.addEventListener("focusin", UI.addBoxShadow)
searchInput.addEventListener("focusout", UI.delBoxShadow)
searchSelectList.addEventListener("click", UI.searchType)
searchInput.addEventListener("search", search)
searchSubmit.addEventListener("click", search)
followingTab.addEventListener('shown.bs.tab', showFollow)
followersTab.addEventListener('shown.bs.tab', showFollow)
document.addEventListener("DOMContentLoaded", UI.addRecentSearches)
rateLimit.addEventListener('click', showRateLimit)

UI.darkMode()
let github = new Github()

function search(e, t, i) {
    UI.hideResults()
    UI.clearResults(document.getElementById("searchResultsDiv"))
    UI.addSearchResultsElement()
    UI.searchLoader("search-results")
    let paginationElement = document.getElementById("search-pagination")
    let type = (t === undefined) ? searchSelect.innerText.trim().toLowerCase() : t
    let input = (i === undefined) ? searchInput.value.trim() : i
    let ui = new UI()
    if (input !== "" || (t && i) !== undefined) {
        UI.recentSearches(type, input.toLowerCase())
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

    if (typeof (transmitted) === "string") {
        let type = transmitted.split("/")[5]
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
            console.log("Unexpected Type");
        }
    } else { // Search, transmitted = object
        UI.searchLoader("search-results")
        github.getPageData(transmitted, page)
            .then(response => ui.changeSearchResults(response))
    }
}

let userResponse

function showUser(username) {
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
    UI.recentSearches("user", username)
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

function showRateLimit() {
    UI.searchLoader("rateLimitContent")
    github.getRateLimit()
        .then(resp => UI.showRateLimit(resp))
}

showUser("oguzhanslmtemiz")