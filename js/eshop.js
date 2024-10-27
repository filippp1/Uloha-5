let books = []

fetch("js/books.json")
    .then(response => response.json())
    .then(data => {
        books = data
        data.forEach(currentItem => {
            createNewBook(currentItem, "books")
        })

        let expensiveBook = findExpensive(books)
        createNewBook(expensiveBook, "mostExpensive")

        let oldestBook = findOldest(books)
        createNewBook(oldestBook, "oldest")

        createBookBundle(books)
    })

function createNewBook(book, parentID) {
    const parent = document.getElementById(`${parentID}`)
    let wrapperDiv = document.createElement('div')
    if (parentID === "books") {
        wrapperDiv.className = "bookItem"
    }

    let img = document.createElement('img')
    img.src = `${book.coverPhoto}.jpeg`
    img.className = "bookCover"

    let author = document.createElement('h5')
    author.textContent = `${book.author.name}`

    let title = document.createElement('h3')
    title.textContent = `${book.bookName}`

    let releaseDate = document.createElement('h6')
    releaseDate.textContent = `Released: ${book.releaseDate}`

    let price = document.createElement('h4')
    price.textContent = `${book.price} CZK`

    wrapperDiv.appendChild(img)
    wrapperDiv.appendChild(releaseDate)
    wrapperDiv.appendChild(author)
    wrapperDiv.appendChild(title)
    wrapperDiv.appendChild(price)

    parent.appendChild(wrapperDiv)
}

function createBookBundle(books) {
    const parent = document.getElementById("bundleWrapper")
    const bundleParent = document.getElementById("bundle")
    books.forEach(book => {
        let img = document.createElement('img')
        img.src = `${book.coverPhoto}.jpeg`
        img.className = "bookBundle"

        parent.appendChild(img)
    });
    let bundleName = document.createElement("h3")
    bundleName.innerText = `Bundle of all ${books.length} books`

    let bundlePrice = document.createElement("h4")
    bundlePrice.innerText = `${totalPrice(books)} CZK`

    bundleParent.appendChild(bundleName)
    bundleParent.appendChild(bundlePrice)
}

function findExpensive(books) {
    let result = books[0]

    books.forEach(currentItem => {
        if (currentItem.price > result.price) {
            result = currentItem
        }
    })

    return result
}

function findOldest(books) {
    let result = books[0]

    books.forEach(currentItem => {
        if (new Date(currentItem.releaseDate) < new Date(result.releaseDate)) {
            result = currentItem
        }
    })

    return result
}

function totalPrice(books) {
    let result = 0
    books.forEach(currentItem => {
        result += currentItem.price
    })
    return result
}