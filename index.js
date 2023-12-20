async function fetchFunc() {
    const res = await fetch("https://notes-api.dicoding.dev/v1#/")

    console.log(res)
}

fetchFunc()