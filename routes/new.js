const randomstring = require('randomstring');

const newLink = async (request, LINKS) => {
    for (let i = 5; i < 11; i++) {
        let randstr = randomstring.generate(i);
        let linkData = await LINKS.get(randstr);
        if (linkData === null) {
            const body = await request.json();
            const value = {
                link: body.link,
                expire: body.expire || null,
                resetTime: body.resetTime || false,
                count: 0,
            };
            let respData = value;
            respData['endpoint'] = randstr;
            const kvData = JSON.stringify(value);
            await LINKS.put(randstr, kvData);
            return new Response(JSON.stringify(respData), {
                status: 200,
            });
        }
    }
    let error = JSON.stringify({ error: 'Cannot find valid short ID.' });
    return new Response(error, {
        status: 500,
    });
};

module.exports = newLink;
