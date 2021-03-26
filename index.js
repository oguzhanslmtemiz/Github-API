let searchGroup = document.querySelector("#search-group")
let searchInput = document.querySelector("#search-input")
let searchSubmit = document.querySelector("#search-submit")
let searchSelect = document.querySelector("#search-select-menu")

searchInput.addEventListener("focusin", addStyle)
searchInput.addEventListener("focusout", delStyle)
searchSelect.addEventListener("click", searchType)

function addStyle() {
    searchGroup.setAttribute("style", "box-shadow: 0px 0px 10px 2px seagreen;")
}

function delStyle() {
    searchGroup.setAttribute("style", "")
}


function searchType(e) {
    searchSelect.previousElementSibling.textContent = e.target.textContent
    searchInput.placeholder = "Search " + e.target.textContent
}