class UI {
    constructor() {
        this.searchResultsDiv = document.getElementById("searchResultsDiv")
        this.paginationElement = document.getElementById("pagination")
        this.paginationItem = document.getElementById("pagination-item")
        this.searchResults = document.getElementById("search-results")
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
        userResultsDiv.setAttribute("style", "")
        navigation.setAttribute("style", "")
    }

    showUser(response) {
        let overview = document.getElementById("overview")
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
        }else{
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

    pagination(url, total_count) {
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

    }

    addUsersResults(response) {
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
                                    <strong class="text-gray-dark">${element.user.login}</strong>
                                </div>
                                <span id="search-username" class="d-block">@${element.user.login}</span>
                            </div>
                        </div>
                    </a>`
            })
        }
        this.searchResults.previousElementSibling.innerText += `: ${response.total_count} ${response.transmitted.type}`
    }

    addRepositoriesResults(response) {
        console.log("post response: ", response)
        if (response.total_count === 0) {
            this.searchResults.classList = ""
            this.searchResults.innerText = `We couldn’t find any ${response.transmitted.type} matching "${response.transmitted.input}"`
        } else {
            response.items.forEach(element => {
                this.searchResults.innerHTML += `
                    <a class="col hover" href="${element.repository.html_url}" target="_blank">
                        <div class="d-flex align-items-center text-muted border-bottom py-3">
                            <span class="d-block">${element.repository.created_at}</span>
                            <div class="small lh-sm w-100">
                                <div class="d-flex justify-content-between">
                                    <strong class="text-gray-dark">${element.repository.name}</strong>
                                </div>
                                <span id="search-username" class="d-block">${element.repository.description}</span>
                                <span class="d-block">${element.repository.stargazers_count}</span>
                            </div>
                        </div>
                    </a>`
            })
        }
        this.searchResults.previousElementSibling.innerText += `: ${response.total_count} ${response.transmitted.type}`
    }

    addIssuesResults(response) {
        console.log("post response: ", response)
        if (response.total_count === 0) {
            this.searchResults.classList = ""
            this.searchResults.innerText = `We couldn’t find any ${response.transmitted.type} matching "${response.transmitted.input}"`
        } else {
            response.items.forEach(element => {
                this.searchResults.innerHTML += `
                    <a class="col hover" href="${element.issue.html_url}" target="_blank">
                        <div class="d-flex align-items-center text-muted border-bottom py-3">
                            <span class="d-block">${element.issue.created_at}</span>
                            <div class="small lh-sm w-100">
                                <div class="d-flex justify-content-between">
                                    <strong class="text-gray-dark">${element.issue.state}</strong>
                                </div>
                                <span id="search-username" class="d-block">${element.issue.title}</span>
                                <span class="d-block">${element.issue.comments}</span>
                            </div>
                        </div>
                    </a>`
            })
        }
        this.searchResults.previousElementSibling.innerText += `: ${response.total_count} ${response.transmitted.type}`
    }

    addEmptyResults() {
        this.searchResults.classList = ""
        this.searchResults.innerText = "Search Github API by typing a word in the search box."
        this.searchResults.previousElementSibling.innerText += ": 0"
    }

    changeResults(response) { // bura sadece user da sayfa degisince oluyor
        console.log("post response: ", response)
        this.searchResults.innerHTML = ""
        response.items.forEach(element => {
            this.searchResults.innerHTML += `
                <a class="col hover" onclick="showUser('${element.user.login}')">
                    <div class="d-flex align-items-center text-muted border-bottom py-3">
                        <img class="bd-placeholder-img flex-shrink-0 me-2 rounded"
                            src="${element.user.avatar_url}" alt="avatar" width="64">
                        <div class="small lh-sm w-100">
                            <div class="d-flex justify-content-between">
                                <strong class="text-gray-dark">${element.user.login}</strong>
                            </div>
                            <span id="search-username" class="d-block">@${element.user.login}</span>
                        </div>
                    </div>
                </a>`
        })
    }
}