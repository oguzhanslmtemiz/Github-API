class Github {
    constructor() {
        this.url = `https://api.github.com/search/`
    }

    filter(items) {
        let arr = []
        items.forEach(element => {
            arr.push({
                user: {
                    login: element.login,
                    html_url: element.html_url,
                    avatar_url: element.avatar_url
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
                    updated_at: element.updated_at,
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
                    updated_at: element.updated_at,
                    user: element.user
                },
            })
        })
        return arr
    }

    async getData(type, input) {
        let response = await fetch(this.url + `${type}?q=${input}`)
        let json = await response.json()
        console.log(this.url + `${type}?q=${input}`)
        console.log("fetch: ", json)
        return {
            transmitted: {
                url: this.url + `${type}?q=${input}`,
                type: type,
                input: input
            },
            total_count: json.total_count,
            items: this.filter(json.items)
        }
    }

    async getPageData(url, page) {
        let response = await fetch(url + `&page=${page}`)
        let json = await response.json()
        console.log("getPageData: ", url + `&page=${page}`)
        console.log("getPageData fetch: ", json)
        return {
            total_count: json.total_count,
            items: this.filter(json.items)
        }
    }
}