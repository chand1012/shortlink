const randomstring = require('randomstring')

const newLink = async (request, LINKS) => {
    for (let i = 5; i < 11; i++) {
        let randstr = randomstring.generate(i)
        let linkData = await LINKS.get(randstr)
        if (linkData === null) {
            const body = await request.json()
            const value = {
                link: body.link,
                expire: body.expire || new Date(Date.now() + 3600000),
                endpoint: randstr
            }
            const respData = JSON.stringify(value)
            await LINKS.put(randstr, respData)
            return new Response(respData, {
                status: 200,
            })
        }
    }
    let error = JSON.stringify({ error: 'Cannot find valid short ID.' })
    return new Response(error, {
        status: 500,
    })
}

module.exports = newLink
