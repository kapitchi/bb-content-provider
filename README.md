# Content Provider Services

Implements services providing upload methods to various services:

* Youtube
* S3
* ... TODO

# Installation
```
npm i @kapitchi/bb-content-provider
```

# Usage

TODO

# Development

Build

```
npm run build
```

Generates README.md
```
npm run docs
```

Tests

```
npm test
```

# API

## Classes

<dl>
<dt><a href="#ProviderS3">ProviderS3</a></dt>
<dd><p>S3 service</p>
</dd>
<dt><a href="#ProviderYoutube">ProviderYoutube</a></dt>
<dd><p>Youtube service</p>
</dd>
</dl>

<a name="ProviderS3"></a>

## ProviderS3
S3 service

**Kind**: global class  
<a name="ProviderS3+getUploadMethod"></a>

### providerS3.getUploadMethod(params) ⇒ <code>Promise.&lt;{type: string, url: string, method: string}&gt;</code>
Get upload method

**Kind**: instance method of [<code>ProviderS3</code>](#ProviderS3)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> |  |
| params.key | <code>string</code> |  |
| params.accessKeyId | <code>string</code> |  |
| params.secretAccessKey | <code>string</code> |  |
| params.region | <code>string</code> |  |
| params.bucket | <code>string</code> |  |
| params.expires | <code>number</code> |  |
| params.privacy | <code>string</code> | Options: 'private', 'public-read', 'public-read-write',                       'aws-exec-read', 'authenticated-read', 'bucket-owner-read',                       'bucket-owner-full-control' |

<a name="ProviderYoutube"></a>

## ProviderYoutube
Youtube service

**Kind**: global class  
<a name="ProviderYoutube+getUploadMethod"></a>

### providerYoutube.getUploadMethod(params) ⇒ <code>Promise.&lt;{type: string, url: string, method: string, headers: Object}&gt;</code>
Get upload method

**Kind**: instance method of [<code>ProviderYoutube</code>](#ProviderYoutube)  

| Param | Type |
| --- | --- |
| params | <code>Object</code> | 
| params.accessToken | <code>string</code> | 
| params.size | <code>number</code> | 
| params.mime | <code>string</code> | 
| params.privacy | <code>string</code> | 
| params.meta | <code>Object</code> | 
| params.meta.title | <code>string</code> | 
| params.meta.description | <code>string</code> | 

