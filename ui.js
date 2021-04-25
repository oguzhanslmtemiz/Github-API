class UI {
    constructor() {
        this.searchResultsDiv = document.getElementById("searchResultsDiv")
        this.paginationElement = document.getElementById("pagination")
        this.paginationItem = document.getElementById("pagination-item")
        this.searchResults = document.getElementById("search-results")

        this.overview = document.getElementById("overview")
        this.ph_overview = document.getElementById("ph-overview")

        this.recentRepos = document.getElementById("recent-repos")

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
        nav.id = "pagination"

        let ul = document.createElement("ul")
        ul.id = "pagination-item"
        ul.className = "pagination pagination-sm justify-content-center justify-content-xl-end"
        nav.appendChild(ul)

        div.appendChild(nav)
        searchResultsDiv.appendChild(div)
    }

    static hideResults() {
        userResultsDiv.setAttribute("style", "display:none")
        navigation.setAttribute("style", "display:none")
    }

    static showResults() {
        window.scrollTo(0, 0)
        document.getElementById("searchResultsDiv").innerHTML = ""
        userResultsDiv.setAttribute("style", "")
        navigation.setAttribute("style", "")
    }

    showUser(response) {

        let user_following = document.getElementById("user-following")
        let user_followers = document.getElementById("user-followers")
        let user_repos = document.getElementById("user-public_repos")
        let user_avatar = document.getElementById("user-avatar")
        let user_name = document.getElementById("user-name")
        let user_login = document.getElementById("user-login")
        let user_html = document.getElementById("user-html_url")
        let user_bio = document.getElementById("user-bio")
        let user_hireable = document.getElementById("user-hireable")
        let user_company = document.getElementById("user-company")
        let user_location = document.getElementById("user-location")
        let user_blog = document.getElementById("user-blog")
        let user_twitter = document.getElementById("user-twitter")


        user_following.innerText = `${response.following}`
        user_followers.innerText = `${response.followers}`
        user_repos.innerText = `${response.public_repos}`
        user_avatar.src = `${response.avatar_url}`
        user_name.innerText = `${response.name}`
        user_login.innerText = `@${response.login}`
        user_html.href = `${response.html_url}`
        user_bio.innerText = `${response.bio}`
        user_hireable.innerText = `${response.hireable}`
        user_company.innerText = `${response.company}`
        user_location.innerText = `${response.location}`
        user_blog.innerText = `${response.blog}`
        user_blog.href = `${response.blog}`
        user_twitter.innerText = `${response.twitter_username}`


        if (user_bio.innerText === "null") {
            user_bio.innerText = ""
        }

        if (user_hireable.innerText === "true") {
            user_hireable.innerText = "Hireable"
        } else {
            user_hireable.innerText = "Not Hireable"
        }

        if (user_company.innerText === "null") {
            user_company.innerText = ""
        }
        if (user_location.innerText === "null") {
            user_location.innerText = ""
        }
        if (user_blog.innerText === "null") {
            user_blog.innerText = ""
        }
        if (user_twitter.innerText === "null") {
            user_twitter.innerText = ""
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

    showRepos(response) {
        this.recentRepos.innerHTML = ""
        response.forEach(element => {
            let a = UI.createRepoElements(element)
            this.recentRepos.appendChild(a)
        });
    }

    static searchLoader() {
        document.getElementById("search-results").innerHTML = `
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

    pagination(transmitted, total_count) {
        let totalPages = Math.ceil(total_count / 30)
        console.log("toplam sayfa: ", totalPages);
        let paginationItem = this.paginationItem

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
                paginationItem.firstChild.classList.remove("disabled")
            }
            if (newActive.nextSibling.innerText !== "Next") {
                paginationItem.lastChild.classList.remove("disabled")
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
                changePage(transmitted, currentPage)
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
        this.searchResults.innerHTML = ""
        console.log("post response: ", response)
        if (response.total_count === 0) {
            this.searchResults.classList = ""
            this.searchResults.innerText = `We couldn’t find any ${response.transmitted.type} matching "${response.transmitted.input}"`
        } else {
            response.items.forEach(element => {
                this.searchResults.innerHTML += `
                    <a class="col hover" onclick="showUser('${element.user.login}')"> 
                        <div class="d-flex align-items-center text-muted border-bottom py-3">
                            <img class="bd-placeholder-img flex-shrink-0 me-2 rounded"
                                src="${element.user.avatar_url}" alt="avatar" width="64">
                            <div class="small lh-sm w-100">
                                <div class="d-flex justify-content-between">
                                    <strong>${element.user.login}</strong>
                                </div>
                                <span id="search-username" class="d-block">@${element.user.login}</span>
                            </div>
                        </div>
                    </a>`
            })
        }
        this.searchResults.previousElementSibling.innerText = `Search Results: ${response.total_count} ${response.transmitted.type}`
        // document.getElementById("search-loader").remove()
    }

    addRepositoriesResults(response) {
        this.searchResults.innerHTML = ""
        console.log("post response: ", response)
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
        // document.getElementById("search-loader").remove()
    }

    addIssuesResults(response) {
        this.searchResults.innerHTML = ""

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
        console.log("addIssuesResults() post response: ", response)
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
        // document.getElementById("search-loader").remove()
    }

    addEmptyResults() {
        this.searchResults.classList = ""
        this.searchResults.innerText = "Search Github API by typing a word in the search box."
        this.searchResults.previousElementSibling.innerText = "Search Results: 0"
    }

    changeResults(response) { // bura sadece user da sayfa degisince oluyor
        console.log("type: ", response.transmitted);
        console.log("post response: ", response)
        this.searchResults.innerHTML = ""
        if (response.transmitted.type === "users") {
            this.addUsersResults(response)
        } else if (response.transmitted.type === "repositories") {
            this.addRepositoriesResults(response)
        } else if (response.transmitted.type === "issues") {
            this.addIssuesResults(response)
        } else {
            console.log("Beklenmedik bir hata olustu..");
        }
    }
}