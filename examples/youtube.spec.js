const fs = require('fs');
const rp = require('request-promise-native');
const ProviderYoutube = require('../src/services/provider/youtube');

describe('Example: Youtube', () => {
  let runner = it;
  let msg = '';
  if (!process.env.YOUTUBE_ACCESS_TOKEN) {
    msg = ' - YOUTUBE_ACCESS_TOKEN needs to be set to run this example';
    runner = it.skip;
  }

  runner('Upload video' + msg, async () => {
    const provider = new ProviderYoutube();

    const filePath = __dirname + '/video.mp4';
    const stats = fs.statSync(filePath);

    const method = await provider.getUploadMethod({
      accessToken: process.env.YOUTUBE_ACCESS_TOKEN,
      size: stats.size,
      mime: 'video/mp4',
      privacy: 'private',
      meta: {
        title: 'bb-content-provider test video',
        description: 'Check out https://www.npmjs.com/package/@kapitchi/bb-content-provider'
      }
    });

    await rp({
      method: method.method,
      url: method.url,
      body: fs.createReadStream(filePath),
      headers: method.headers
    });
  });
});
