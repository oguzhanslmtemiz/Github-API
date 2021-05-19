class UI {
    constructor() {
        this.searchResultsDiv = document.getElementById("searchResultsDiv")
        this.searchResults = document.getElementById("search-results")
        this.overview = document.getElementById("overview")
        this.ph_overview = document.getElementById("ph-overview")
        this.recentRepos = document.getElementById("recent-repos")
        this.userFollowing = document.getElementById("user-following")
        this.userFollowers = document.getElementById("user-followers")
        this.userReposResults = document.getElementById("user-repos-results")
        this.userFollowingResults = document.getElementById("user-following-results")
        this.userFollowersResults = document.getElementById("user-followers-results")
    }

    static addBoxShadow() {
        searchGroup.setAttribute("style", "box-shadow: 0px 0px 10px 2px #198754;")
        searchGroup.querySelectorAll("button").forEach(element => {
            element.setAttribute("style", "border-radius: 0;")
        });
    }

    static delBoxShadow() {
        searchGroup.setAttribute("style", "")
        searchGroup.querySelectorAll("button").forEach(element => {
            element.setAttribute("style", "")
        });
    }

    static searchType(e) {
        if (e.target.className === "dropdown-item") {
            searchSelect.innerText = e.target.innerText + " "
            searchInput.placeholder = "Search " + e.target.innerText
        }
    }

    static clearResults(element) {
        while (element.firstElementChild) element.removeChild(element.firstElementChild);
    }

    static addSearchResultsElement() {
        let div = document.createElement("div")
        div.className = "my-3 p-3 bg-body rounded shadow-sm"
        div.id = "search-results-div"

        let h6 = document.createElement("h6")
        h6.className = "border-bottom pb-2 mb-0"
        h6.innerText = "Search Results"
        div.appendChild(h6)

        let div2 = document.createElement("div")
        div2.className = "row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4"
        div2.id = "search-results"
        div.appendChild(div2)

        let nav = document.createElement("nav")
        nav.className = "mt-3"

        let ul = document.createElement("ul")
        ul.id = "search-pagination"
        ul.className = "pagination pagination-sm justify-content-center justify-content-xl-end"
        nav.appendChild(ul)

        div.appendChild(nav)
        searchResultsDiv.appendChild(div)
    }

    static hideResults() {
        userResultsDiv.setAttribute("style", "display:none")
        navigation.setAttribute("style", "display:none")
    }

    static clearPreviousResults() {
        UI.clearResults(document.getElementById("searchResultsDiv"))
        document.getElementById("user-following-count").innerText = ""
        document.getElementById("user-followers-count").innerText = ""
        document.getElementById("user-repos-count").innerText = ""
        UI.clearResults(document.getElementById("user-following-results"))
        UI.clearResults(document.getElementById("user-followers-results"))
        UI.clearResults(document.getElementById("user-repos-results"))
        UI.clearResults(document.getElementById("following-pagination"))
        UI.clearResults(document.getElementById("followers-pagination"))
        UI.clearResults(document.getElementById("repo-pagination"))
    }

    static showResults() {
        window.scrollTo(0, 0)
        userResultsDiv.setAttribute("style", "")
        navigation.setAttribute("style", "")
        document.querySelector("#user-overview-tab").click()
    }

    static goTo(id) {
        window.scrollTo(0, 0)
        document.querySelector(`#${id}`).click()
    }

    showUser(response) {
        document.getElementById("user-following-count").innerText = `${response.following}`
        document.getElementById("user-followers-count").innerText = `${response.followers}`
        document.getElementById("user-repos-count").innerText = `${response.public_repos}`
        document.getElementById("user-avatar").src = `${response.avatar_url}`
        document.getElementById("user-name").innerText = `${response.name}`
        document.getElementById("user-login").innerText = `@${response.login}`
        document.getElementById("user-html_url").href = `${response.html_url}`
        document.getElementById("user-bio").innerText = `${UI.hasNull(response.bio)}`
        document.getElementById("user-company").innerText = `${UI.hasNull(response.company)}`
        document.getElementById("user-location").innerText = `${UI.hasNull(response.location)}`
        document.getElementById("user-blog").innerText = `${UI.hasNull(response.blog)}`
        document.getElementById("user-blog").href = `${UI.hasNull(response.blog)}`
        document.getElementById("user-twitter").innerText = `${UI.hasNull(response.twitter_username)}`
        document.getElementById("user-twitter").href = `https://twitter.com/${UI.hasNull(response.twitter_username)}`
        let user_hireable = document.getElementById("user-hireable")
        user_hireable.innerText = `${response.hireable}`
        if (user_hireable.innerText === "true") {
            user_hireable.innerText = "Hireable"
        } else {
            user_hireable.innerText = "Not Hireable"
        }
    }

    static relativeTime(timestamp) {
        let elapsed = Date.now() - Date.parse(timestamp)
        let sec = Math.floor(elapsed / 1000)
        let min = Math.floor(sec / 60)
        let hour = Math.floor(min / 60)
        let day = Math.floor(hour / 24)
        let month = Math.floor(day / 30)
        let year = Math.floor(month / 12)

        if (sec < 60) {
            return (sec === 1) ? sec + " second ago" : sec + " seconds ago"
        } else if (min < 60) {
            return (min === 1) ? min + " minute ago" : min + " minutes ago"
        } else if (hour < 24) {
            return (hour === 1) ? hour + " hour ago" : hour + " hours ago"
        } else if (day < 30) {
            return (day === 1) ? day + " day ago" : day + " days ago"
        } else if (month < 12) {
            return (month === 1) ? month + " month ago" : month + " months ago"
        } else {
            return (year === 1) ? year + " year ago" : year + " years ago"
        }
    }

    static setColor(language) {
        if (githubLangColors[language] === undefined) {
            return githubLangColors.null
        } else {
            return githubLangColors[language]
        }
    }

    static hasNull(params) {
        if (params !== null) {
            return params
        } else {
            return ""
        }
    }

    static createUserElements(element) {
        let a = document.createElement("a")
        a.className = "col hover"
        a.setAttribute("onclick", `showUser('${element.user.login}')`)
        a.innerHTML = `
            <div class="d-flex align-items-center text-muted border-bottom py-3">
                <img class="img-thumbnail flex-shrink-0 me-2 p-0 border-0 rounded"
                    src="${element.user.avatar_url}" alt="avatar" width="64" height="64">
                <div class="small lh-sm w-100">
                    <div class="d-flex justify-content-between">
                        <strong>${element.user.login}</strong>
                    </div>
                    <span id="search-username" class="d-block">@${element.user.login}</span>
                </div>
            </div>`
        return a
    }

    static createRepoElements(element, type) {
        let a = document.createElement("a")
        a.className = "d-block hover"
        a.setAttribute("target", "_blank")
        a.href = `${element.html_url}`
        a.innerHTML = `
            <div class="border-bottom py-2 h-100">
                <div class="d-flex flex-column">
                    <h5 class="text-success">${(type === "repositories") ? element.full_name : element.name}</h5>
                    <p class="lh-1 text-muted mb-0">${this.hasNull(element.description)}</p>
                </div>
                <div class="d-flex justify-content-between justify-content-lg-start mt-2 flex-wrap">
                    <div class="d-flex align-items-center me-lg-4">
                        <span class="badge lang-color p-0 me-1" style="background-color: ${this.setColor(element.language)}"> </span>
                        <span class="text-muted">${this.hasNull(element.language)}</span>
                    </div>
                    <div class="d-flex align-items-center me-lg-4">
                        <svg class="svg me-1" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                            </path>
                        </svg>
                        <span class="text-muted">${element.stargazers_count}</span>
                    </div>
                    <div class="d-flex align-items-center me-lg-4">
                        <svg class="svg me-1" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                            </path>
                        </svg>
                        <span class="text-muted">${element.forks_count}</span>
                    </div>
                    <span class="text-muted">Updated ${this.relativeTime(element.pushed_at)}</span>
                </div>
            </div>`
        return a
    }

    showRepos(response, url, repos_count) {
        UI.clearResults(this.recentRepos)
        response.forEach(element => {
            let a = UI.createRepoElements(element)
            this.recentRepos.appendChild(a)
        });
        response.forEach(element => {
            let a = UI.createRepoElements(element)
            this.userReposResults.appendChild(a)
        });
        let elementId = document.getElementById("repo-pagination")
        this.pagination(url, repos_count, elementId)
    }

    static searchLoader(id) {
        return document.getElementById(`${id}`).innerHTML = `
        <div id="search-loader" class="d-flex justify-content-center mt-5 w-100">
            <div class="spinner-border spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="spinner-border spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`
    }

    static repoLoader() {
        document.getElementById("recent-repos").innerHTML = `
            <div class="mt-3 ph-item">
                <div class="ph-col-12">
                    <div class="ph-row">
                        <div class="ph-col-6 big"></div>
                        <div class="ph-col-4 empty big"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                    </div>
                    <p class="pb-3 mb-0 small lh-sm border-bottom"></p>
                </div>
                <div class="ph-col-12 mt-2">
                    <div class="ph-row">
                        <div class="ph-col-6 big"></div>
                        <div class="ph-col-4 empty big"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                    </div>
                    <p class="pb-3 mb-0 small lh-sm border-bottom"></p>
                </div>
                <div class="ph-col-12 mt-2">
                    <div class="ph-row">
                        <div class="ph-col-6 big"></div>
                        <div class="ph-col-4 empty big"></div>
                        <div class="ph-col-12"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                        <div class="ph-col-2"></div>
                        <div class="ph-col-2 empty"></div>
                    </div>
                    <p class="pb-3 mb-0 small lh-sm border-bottom"></p>
                </div>
            </div>`
    }

    pagination(url, total_count, elementId) {
        let totalPages = Math.ceil(total_count / 30)
        console.log(elementId.id, " total page: ", totalPages, "(max. 7 page)");
        let paginationItem = elementId

        function findActive() {
            for (let index = 0; index < paginationItem.childNodes.length; index++) {
                const element = paginationItem.childNodes[index];
                if (element.className === "page-item active") {
                    let activeElement = element
                    return activeElement
                }
            }
        }

        function setActive(target) {
            let tempActive = findActive()
            if (target.innerText === "Next") {

                if (tempActive.nextSibling.innerText !== "Next") {
                    tempActive.className = "page-item"
                    tempActive.nextSibling.classList.add("active")
                    return tempActive.nextSibling.innerText
                }

            } else if (target.innerText === "Previous") {
                if (tempActive.previousSibling.innerText !== "Previous") {
                    tempActive.className = "page-item"
                    tempActive.previousSibling.classList.add("active")
                    return tempActive.previousSibling.innerText
                }

            } else {
                tempActive.className = "page-item"
                target.classList.add("active")
                return target.innerText
            }
        }

        function setDisable() {
            let newActive = findActive()

            if (newActive.nextSibling.innerText === "Next") {
                newActive.nextSibling.classList.add("disabled")
            }
            if (newActive.previousSibling.innerText === "Previous") {
                newActive.previousSibling.classList.add("disabled")
            }
            if (newActive.previousSibling.innerText !== "Previous") {
                paginationItem.firstElementChild.classList.remove("disabled")
            }
            if (newActive.nextSibling.innerText !== "Next") {
                paginationItem.lastElementChild.classList.remove("disabled")
            }
        }

        function changeState(target) {
            let currentPage = setActive(target)
            setDisable()
            return currentPage
        }

        function createPageItem(active, disabled, content) {
            let li = document.createElement("li")
            li.className = "page-item"

            let a = document.createElement("a")
            a.className = "page-link"
            a.innerText = content
            a.addEventListener("click", function (e) {
                let currentPage = changeState(e.target.parentElement)
                changePage(url, currentPage)
            })

            if (active === true) {
                li.className = "page-item active"
            } else if (disabled === true) {
                li.className = "page-item disabled"
                a.setAttribute("tabindex", -1)
                a.setAttribute("aria-disabled", true)
            }
            li.appendChild(a)
            paginationItem.appendChild(li)
        }

        createPageItem(false, true, "Previous")
        createPageItem(true, false, 1)
        for (let page = 2; page <= totalPages; page++) {
            if (totalPages > 7) {
                totalPages = 7
            }
            createPageItem(false, false, page)
        }
        createPageItem(false, false, "Next")
        setDisable()
    }

    addUsersResults(response) {
        UI.clearResults(this.searchResults)
        if (response.total_count === 0) {
            this.searchResults.classList = ""
            this.searchResults.innerText = `We couldn’t find any ${response.transmitted.type} matching "${response.transmitted.input}"`
        } else {
            response.items.forEach(element => {
                let a = UI.createUserElements(element)
                this.searchResults.appendChild(a)
            })
        }
        this.searchResults.previousElementSibling.innerText = `Search Results: ${response.total_count} ${response.transmitted.type}`
    }

    addRepositoriesResults(response) {
        UI.clearResults(this.searchResults)
        if (response.total_count === 0) {
            this.searchResults.classList = ""
            this.searchResults.innerText = `We couldn’t find any ${response.transmitted.type} matching "${response.transmitted.input}"`
        } else {
            response.items.forEach(element => {
                let a = UI.createRepoElements(element.repository, response.transmitted.type)
                this.searchResults.appendChild(a)
            })
        }
        this.searchResults.previousElementSibling.innerText = `Search Results: ${response.total_count} ${response.transmitted.type}`
    }

    addIssuesResults(response) {
        UI.clearResults(this.searchResults)

        function issueState(state) {
            if (state === "open") {
                return `<svg height="16" class="svg text-success flex-shrink-0" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z">
                            </path>
                        </svg>`
            } else {
                return `<svg height="16" class="svg text-danger flex-shrink-0" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true">
                            <path fill-rule="evenodd" 
                                d="M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z">
                            </path>
                        </svg>`
            }
        }

        function titleColor(state, title) {
            if (state === "open") {
                return `<span class="text-success">${title}</span>`
            } else {
                return `<span class="text-danger">${title}</span>`
            }
        }
        if (response.total_count === 0) {
            this.searchResults.classList = ""
            this.searchResults.innerText = `We couldn’t find any ${response.transmitted.type} matching "${response.transmitted.input}"`
        } else {
            response.items.forEach(element => {
                this.searchResults.innerHTML += `
                    <a class="col hover" href="${element.issue.html_url}" target="_blank">
                        <div class="d-flex text-muted border-bottom py-2 h-100">
                            ${issueState(element.issue.state)}
                            <div class="ms-1 d-flex flex-column">
                                <div class="d-flex">
                                    <strong class="small">${element.issue.repository_url.substring(element.issue.repository_url.indexOf("repos/") + 6)}</strong>
                                    <span class="small ms-1">#${element.issue.number}</span>
                                </div>
                                ${titleColor(element.issue.state, element.issue.title)}
                                <div class="d-flex">
                                    <strong class="small">${element.issue.user.login} </strong>
                                    <span class="small ms-1">opened ${UI.relativeTime(element.issue.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    </a>`
            })
        }
        this.searchResults.previousElementSibling.innerText = `Search Results: ${response.total_count} ${response.transmitted.type}`
    }

    addEmptyResults() {
        this.searchResults.classList = ""
        this.searchResults.innerText = "Search Github API by typing a word in the search box."
        this.searchResults.previousElementSibling.innerText = "Search Results: 0"
    }

    changeSearchResults(response) {
        if (response.transmitted.type === "users") {
            this.addUsersResults(response)
        } else if (response.transmitted.type === "repositories") {
            this.addRepositoriesResults(response)
        } else if (response.transmitted.type === "issues") {
            this.addIssuesResults(response)
        } else {
            console.log("An unexpected error has occurred..");
        }
    }

    changeTabResults(response, type) {
        if (type === "following") {
            UI.clearResults(this.userFollowingResults)
            response.forEach(element => {
                let a = UI.createUserElements(element)
                this.userFollowingResults.appendChild(a)
            })

        } else if (type === "followers") {
            UI.clearResults(this.userFollowersResults)
            response.forEach(element => {
                let a = UI.createUserElements(element)
                this.userFollowersResults.appendChild(a)
            })

        } else if (type === "repos") {
            UI.clearResults(this.userReposResults)
            response.forEach(element => {
                let a = UI.createRepoElements(element)
                this.userReposResults.appendChild(a)
            });
        } else {
            console.log("Unexpected Type");
        }
    }

    static addRecentSearches(obj) {
        let searched
        if (obj.type === "DOMContentLoaded") {
            searched = JSON.parse(localStorage.getItem("searched") || '[]')
        } else {
            searched = [obj]
        }

        function removeDuplicate(element) {
            const divs = document.querySelectorAll("#recent-searches > div")
            let span = `${element.type} / ${element.input}`
            for (let i = 0; i < divs.length; i++) {
                const div = divs[i].innerText.toLowerCase().trim()
                if (element.type === "user" && `@${element.input}` === div) {
                    divs[i].remove()
                }
                if (span === div) {
                    divs[i].remove()
                }
            }
        }

        searched.forEach(element => {
            let color = "text-warning"
            let span = `<span class="text-capitalize text-truncate">${element.type} / ${element.input}</span>`
            let div = document.createElement("div")
            div.setAttribute("onclick", `search(event,'${element.type}','${element.input}')`)
            if (element.type === "users") {
                color = "text-danger"
            } else if (element.type === "repositories") {
                color = "text-success"
            } else if (element.type === "issues") {
                color = "text-primary"
            } else if (element.type === "user") {
                div.setAttribute("onclick", `showUser('${element.input}')`)
                span = `<span class="text-truncate">@${element.input}</span>`
            }
            removeDuplicate(element)
            div.className += " d-flex text-muted py-2 align-items-center hover"
            div.innerHTML = `
                <svg class="svg flex-shrink-0 me-2 rounded ${color}" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <rect width="100%" height="100%"></rect>
                </svg>
                ${span}`
            document.getElementById("recent-searches").prepend(div)
        })
    }

    static recentSearches(type, input) {
        UI.removeDuplicatesFromLS(type, input)
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
        UI.addRecentSearches(obj)
    }

    static clearRecentSearches() {
        localStorage.removeItem("searched")
        UI.clearResults(document.getElementById("recent-searches"))
    }

    static removeDuplicatesFromLS(type, input) {
        let searchedStr = localStorage.getItem("searched") || '[]'
        let searched = JSON.parse(searchedStr)
        let obj = {
            type,
            input
        }
        searched.forEach((element, index) => {
            if (JSON.stringify(obj) === JSON.stringify(element)) {
                searched.splice(index, 1)
                localStorage.setItem("searched", JSON.stringify(searched))
            }
        })
    }

    static showRateLimit(response) {
        function setTime(timestamp) {
            let time = Math.abs(Number(UI.relativeTime(new Date(timestamp * 1000)).split(" ")[0]))
            let minutes = Math.floor(time / 60)
            let seconds = time - minutes * 60
            return `${minutes}min ${seconds}s`
        }
        document.getElementById("rateLimitContent").innerHTML = `
            <table class="table table-hover text-secondary">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Core</th>
                        <th scope="col">Search</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Limit</th>
                        <td>${response.resources.core.limit}</td>
                        <td>${response.resources.search.limit}</td>
                    </tr>
                    <tr>
                        <th scope="row">Remaining</th>
                        <td>${response.resources.core.remaining}</td>
                        <td>${response.resources.search.remaining}</td>
                    </tr>
                    <tr>
                        <th scope="row">Used</th>
                        <td>${response.resources.core.used}</td>
                        <td>${response.resources.search.used}</td>
                    </tr>
                    <tr>
                        <th scope="row">Reset</th>
                        <td>${setTime(response.resources.core.reset)}</td>
                        <td>${setTime(response.resources.search.reset)}</td>
                    </tr>
                </tbody>
            </table>`
    }

    static darkMode() {
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
    }
}