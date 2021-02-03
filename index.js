const Router = require('./router');
const newLink = require('./routes/new');
const getLink = require('./routes/link');
/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    try {
        const r = new Router();

        r.get('/', request => {
            return Response.redirect('https://chand1012.dev/', 301);
        }); // this will be changed
        r.post('/', request => newLink(request, LINKS));
        r.get('.*/.*', request => getLink(request, LINKS));

        const resp = await r.route(request);
        return resp;
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
