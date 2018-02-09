const {AbstractService, Joi} = require('@kapitchi/bb-service');
const AWS = require('aws-sdk');

/**
 * S3 service
 */
class ProviderS3 extends AbstractService {

  /**
   * Get upload method
   *
   * @param {Object} params
   * @param {string} params.key
   * @param {string} params.accessKeyId
   * @param {string} params.secretAccessKey
   * @param {string} params.region
   * @param {string} params.bucket
   * @param {number} params.expires
   * @param {string} params.privacy Options: 'private', 'public-read', 'public-read-write',
   *                       'aws-exec-read', 'authenticated-read', 'bucket-owner-read',
   *                       'bucket-owner-full-control'
   * @returns {Promise.<{type: string, url: string, method: string}>}
   */
  async getUploadMethod(params) {
    params = this.params(params, {
      key: Joi.string(),
      accessKeyId: Joi.string(),
      secretAccessKey: Joi.string(),
      region: Joi.string(),
      bucket: Joi.string(),
      expires: Joi.number().default(1000),
      privacy: Joi.string().allow('private', 'public-read', 'public-read-write',
        'aws-exec-read', 'authenticated-read', 'bucket-owner-read', 'bucket-owner-full-control')
    });
    const s3 = new AWS.S3({
      accessKeyId: params.accessKeyId,
      secretAccessKey: params.secretAccessKey,
      region: params.region,
      params: {
        Bucket: params.bucket
      }
    });
    //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    const signedUrl = s3.getSignedUrl('putObject', {
      Key: params.key,
      Expires: params.expires,
      ACL: params.privacy
    });
    return {
      type: 'http',
      url: signedUrl,
      method: 'put'
    };
  }
}

module.exports = ProviderS3;
