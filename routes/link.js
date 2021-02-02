const getLink = async (request, LINKS) => {
    const url = request.url.split('/')
    const endpoint = url[url.length - 1]
    console.log(endpoint);
    const data = await LINKS.get(endpoint)

    if (data !== null) {
        const now = new Date(Date.now())
        if (now < data.expire) {
            return Response.redirect(data.link, 302)
        }
    }

    if (data !== null) {
        await LINKS.delete(endpoint)
    }

    return new Response('Link not found.', {
        status: 404,
    })
}

module.exports = getLink;