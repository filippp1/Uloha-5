fetch("js/books.json")
    .then(response => response.json())
    .then(data => {
        const randomBook = data[Math.floor(Math.random() * data.length)]

        let bookCover = document.getElementById('bookCover')
        bookCover.src = `${randomBook.coverPhoto}.jpeg`
        bookCover.className = "artistPickBook"

        document.getElementById('bookName').innerHTML = `<b>${randomBook.bookName}</b>`
        document.getElementById('description').innerText = `${randomBook.description}`
        document.getElementById('price').innerText = `${randomBook.price} CZK`

        let authorPic = document.getElementById('authorPic')
        authorPic.src = `${randomBook.author.image}.jpeg`
        authorPic.className = "authorPicture"

        document.getElementById('authorName').innerHTML = `<b>${randomBook.author.name}</b> (${calculateAge(randomBook.author.birthDate)} years)`
        document.getElementById('authorDesc').innerText = `${randomBook.author.bio}`
    })

function calculateAge(birthdate) {
    const birthDate = new Date(birthdate)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--
    }

    return age
}
