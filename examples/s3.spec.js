const rp = require('request-promise-native');
const ProviderS3 = require('../src/services/provider/s3');

describe('Example: S3', () => {
  let runner = it;
  let msg = '';
  if (!process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_BUCKET ||
    !process.env.AWS_REGION) {
    msg = ' - AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_BUCKET needs to be set to run this example';
    runner = it.skip;
  }

  runner('Upload file to the bucket' + msg, async () => {
    const provider = new ProviderS3();

    const method = await provider.getUploadMethod({
      key: 'bb-content-provider-test-file.txt',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_BUCKET,
      expires: 1000,
      privacy: 'private'
    });

    await rp({
      method: method.method,
      url: method.url,
      body: 'Test passed ;)'
    });
  });
});
