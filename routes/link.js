const getLink = async (request, LINKS) => {
    const url = request.url.split('/')
    const endpoint = url[url.length - 1]
    const data = JSON.parse(await LINKS.get(endpoint))

    if (data !== null) {
        const now = new Date(Date.now())
        const date = new Date(Date.parse(data.expire))
        if (now < date){
            return Response.redirect(data.link, 302)
        } else {
            await LINKS.delete(endpoint)
        }
    }

    return new Response({error: 'Link not found.'}, {
        status: 404,
    })
}

module.exports = getLink;