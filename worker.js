addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取国家地区
  const country = request.cf.country
  console.log('请求来源地区为：',country);
  const json = await fetch(`https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${country}`, {
    method: 'GET',
  })
    .then((response) => { return response.json(); })
    .catch((error) => {
      console.log(error);
      return new Response('获取数据出错');
    });
  const url = json.images[0].url;
  const imageResponse = await fetch('https://www.bing.com' + url);

  return new Response(imageResponse.body, {
    headers: { 'Content-Type': imageResponse.headers.get('Content-Type') || 'image/jpeg' },
    status: imageResponse.status,
    statusText: imageResponse.statusText,
  });
}
