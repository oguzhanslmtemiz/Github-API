class Github {
    constructor() {
        this.searchUrl = `https://api.github.com/search/`
        this.userUrl = `https://api.github.com/users/`
    }

    filter(items) {
        let arr = []
        items.forEach(element => {
            arr.push({
                user: {
                    login: element.login,
                    html_url: element.html_url,
                    avatar_url: element.avatar_url,
                    url: element.url
                },
                repository: {
                    created_at: element.created_at,
                    description: element.description,
                    forks_count: element.forks_count,
                    full_name: element.full_name,
                    homepage: element.homepage,
                    html_url: element.html_url,
                    language: element.language,
                    name: element.name,
                    open_issues_count: element.open_issues_count,
                    owner: element.owner,
                    stargazers_count: element.stargazers_count,
                    pushed_at: element.pushed_at,
                    watchers_count: element.watchers_count
                },
                issue: {
                    comments: element.comments,
                    created_at: element.created_at,
                    html_url: element.html_url,
                    number: element.number,
                    repository_url: element.repository_url,
                    state: element.state,
                    title: element.title,
                    user: element.user
                },
            })
        })
        return arr
    }

    async getSearchData(type, input) {
        let response = await fetch(this.searchUrl + `${type}?q=${input}`)
        let json = await response.json()
        console.log(this.searchUrl + `${type}?q=${input}`)
        return {
            transmitted: {
                url: this.searchUrl + `${type}?q=${input}`,
                type: type,
                input: input
            },
            total_count: json.total_count,
            items: this.filter(json.items)
        }
    }

    async getPageData(transmitted, page) {
        let response = await fetch(transmitted.url + `&page=${page}`)
        let json = await response.json()
        console.log("getPageData() ", transmitted.url + `&page=${page}`)
        return {
            transmitted: transmitted,
            total_count: json.total_count,
            items: this.filter(json.items)
        }
    }

    async getUserData(username) {
        let response = await fetch(this.userUrl + username)
        let json = await response.json()
        console.log("getUserData() ", this.userUrl + username)
        return json
    }

    async getUserRepo(url, page) {
        let response = await fetch(url + "?sort=pushed" + `&page=${page}`)
        let json = await response.json()
        console.log("getUserRepo() ", url + "?sort=pushed" + `&page=${page}`);
        return json
    }
    
    async getFollowData(url, page) {
        let response = await fetch(url + `?page=${page}`)
        let json = await response.json()
        console.log("getFollowData() ", url + `?page=${page}`)
        return this.filter(json)
    }

    async getRateLimit() {
        let response = await fetch(`https://api.github.com/rate_limit`)
        let json = await response.json()
        console.log("getRateLimit()")
        return json
    }
}