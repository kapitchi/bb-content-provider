const rp = require('request-promise-native');
const _ = require('lodash');
const {AbstractService, Joi} = require('@kapitchi/bb-service');

/**
 * Youtube service
 */
class ProviderYoutube extends AbstractService {

  /**
   * Get upload method
   *
   * @param {Object} params
   * @param {string} params.accessToken
   * @param {number} params.size
   * @param {string} params.mime
   * @param {string} params.privacy
   * @param {Object} params.meta
   * @param {string} params.meta.title
   * @param {string} params.meta.description
   * @returns {Promise.<{type: string, url: string, method: string, headers: Object}>}
   */
  async getUploadMethod(params) {
    params = this.params(params, {
      accessToken: Joi.string(),
      size: Joi.number(),
      mime: Joi.string(),
      privacy: Joi.string().allow('private', 'public', 'unlisted'),
      meta: Joi.object({
        title: Joi.string(),
        description: Joi.string()
      })
    });

    //https://developers.google.com/youtube/v3/guides/using_resumable_upload_protocol##Start_Resumable_Session
    const res = await rp({
      method: 'post',
      url: 'https://www.googleapis.com/upload/youtube/v3/videos',
      json: true,
      resolveWithFullResponse: true,
      headers: {
        'Authorization': 'Bearer ' + params.accessToken,
        'X-Upload-Content-Length': params.size,
        'x-upload-content-type': params.mime
      },
      qs: {
        uploadType: 'resumable',
        part: 'snippet,status',
        //notifySubscribers: false
      },
      body: {
        snippet: {
          title: _.get(params, 'meta.title'),
          description: _.get(params, 'meta.description')
        },
        status: {
          privacyStatus: params.privacy
        }
      }
    });

    return {
      type: 'http',
      url: res.headers.location,
      method: 'put',
      headers: {
        'authorization': 'bearer ' + params.accessToken,
        'content-type': params.mime,
        'content-length': params.size
      }
    };
  }
}

module.exports = ProviderYoutube;
