export async function onRequest(request, { forward }) {
  console.log(request.url.host, 'FSDFDS');
  if (request.url.host === 'www.covle.com') {
    const { pathname, search, hash } = request.url;
    return Response.redirect(`https://covle.com${pathname}${search}${hash}`, 301);
  }
  return forward(request);
}