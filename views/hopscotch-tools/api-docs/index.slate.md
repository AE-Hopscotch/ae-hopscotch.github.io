{
  "title": "HS Tools API Reference",
  "meta_description": "Documentation on how to use the public HS Tools API",
  "meta_keywords": "hopscotch, api, coding, projects, modding",
  "meta_title": "HS Tools API Documentation",
  "docs_logo": "assets/documentation-logo.png"
}
---

# Introduction
This is the official documentation for Awesome_E's Public HS Tools API.

## API Endpoint
The HS Tools API Endpoint is `https://hs-tools-api.up.railway.app/`. It will be the URL at the start of every request.

## Source Code
This project is open-source. You can find the source code [on GitHub](https://github.com/AE-Hopscotch/hs-tools-api), where you can file an issue, create PRs, and see the code behind the API.

# Getting Hopscotch Data

With this API, you can get hand-created data that the HS Tools website uses. Currently, this includes information about different blocks and objects.

## All Hopscotch Blocks

Returns the entire list of blocks being used by HS Tools


>To get the list of Hopscotch blocks, you can use this code:

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/hopscotch-data/blocks')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/blocks
```

### HTTP Request
`GET /hopscotch-data/blocks`

### Request Parameters

There are no request parameters

>This endpoint will return an array of dictionaries that contain info about Hopscotch blocks

```json
200 OK

[
  { ... },
  { ... },
  ...
]
```
### Reponse Data

Key|Description
:-:|:-:
&ndash;|An array of dictionaries that contain data about Hopscotch blocks

## Info About a Specific Block

Returns information about the block with the specified ID

>To get the block with ID `-1`, you can run the following:

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/hopscotch-data/blocks/-1')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/blocks/-1
```

### HTTP Request
`GET /hopscotch-data/blocks/:id`

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
id|Yes|The numeric ID of the Hopscotch block you want information about

>The response will contain JSON with this structure:

!<div data-copy></div>
```json
200 OK

{
  "about": "Community Description",
  "authors": ["Awesome_E"],
  "availability": "all",
  "blockHTML": "fish <i class=\"ps fa fa-volume-up\"></i> ",
  "collapsible": false,
  "community_links": ["..."],
  "description": "N/A – There is no app description",
  "id": -1,
  "key": "-1",
  "name": "fish",
  "other_info": ["..."],
  "parameters": ["..."],
  "type": "old",
  "useful_for": ["Fishing"]
}
```

>If the block does not exist, it will return this error:
```json
404 Not Found

{
  "status": "error",
  "error": "No block was found with ID -1"
}
```

### Response Data

Key|Type|Description
:-:|:-:|:-:
about|string|The community-written description of the Hopscotch block
authors|array|People who contributed to writing information about this block
availability|string|The availability of the block<sup>*</sup>
blockHTML|string|An HTML render of the block
collapsible|boolean|Whether the block can contain other blocks of code inside it
community_links|array|A list of links, in HTML, of relevant tutorials or projects
description|string|The Hopscotch iOS App description provided for this block
id|number|The numeric ID of the block
key|string|Same as above, but as a string
name|string|The name of the block
other_info|array|Additional information about this block
parameters|array|A list of parameters for this block
type|string|The block type as shown in the Hopscotch iOS App
useful_for|array|Use cases for the block

### <sup>*</sup>Block Availability
Key|Description
:-:|:-:
all|Available for Everyone
json|Accessible with JSON Editing only
beta|Advanced mode only
jsonbeta|Formerly JSON only, now in advance mode
old|Non-editor, not in use
gone|Removed from newer players

## Specific Trait of a Block

## All Hopscotch Objects

Returns the entire list of object types tracked in HS Tools.

>To get the list of Hopscotch objects, you can use this code:

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/hopscotch-data/objects')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/objects
```

### HTTP Request
`GET /hopscotch-data/objects`

### Request Parameters

There are no request parameters

>This endpoint will return an array of dictionaries that have information about Hopscotch objects

```json
200 OK

[
  { ... },
  { ... },
  ...
]
```
### Reponse Data

Key|Description
:-:|:-:
&ndash;|An array of dictionaries that contain data about Hopscotch objects


## Info About a Specific Object

Returns information about the object with the specified ID

>To get the object with ID `1`, you can run the following:

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/hopscotch-data/objects/1')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/objects/1
```

### HTTP Request
`GET /hopscotch-data/objects/:id`

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
id|Yes|The numeric ID of the Hopscotch object you want information about

>The response will contain JSON with this structure:

!<div data-copy></div>
```json
200 OK

{
  "codename": "text",
  "description": "An alphabet soup of letters, numbers, symbols, and emoji.",
  "id": 1,
  "key": "1",
  "name": "Text"
}
```

>If the object does not exist, it will return this error:
```json
404 Not Found

{
  "status": "error",
  "error": "No object was found with ID 1"
}
```

### Response Data

Key|Type|Description
:-:|:-:|:-:
codename|string|The name of the object stored in the project JSON file
description|string|The Hopscotch iOS App description provided for this object
id|number|The numeric ID of the object
key|string|Same as above, but as a string
name|string|The name of the object, as seen in the Hopscotch Editor

## Specific Trait of an Object

# Retrieving Webplayer Files

## Webplayer Metadata

This retrieves the file path, modification date, and version of the latest minor releases under each major webplayer version.

>To retrieve information about the latest webplayer release for *every* major version (1.0, 1.1, 1.2, 1.3, 2.0, etc.):

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/metadata')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/webplayer/metadata
```
### HTTP Request
`GET /webplayer/metadata/:version`

>To retrieve information about the latest webplayer release for *only 1.5.x* webplayers:

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/metadata/1.5')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/webplayer/metadata/1.5
```

### Request Parameters
Name|Required|Description
:-:|:-:|:-:
Version|No|Results will only show metadata of the latest minor webplayer release under this major version (i.e. 1.5 or 2.0) &ndash; see example requests

>A sample response for getting the latest webplayer metadata for all major releases

```json
200 OK

{
  "1.0": {
    "path": "versions/1.0.14/webplayer.min.js",
    "date": 1593469128976,
    "pixi": "4.8.6",
    "player": "1.0.14"
  },
  "1.1": { ... },
  "1.2": { ... },
  "1.3": { ... },
  "1.4": { ... },
  "1.5": {
    "path": "versions/1.5.20/webplayer.min.js",
    "date": 1637679789463,
    "pixi": "4.8.6",
    "player": "1.5.20"
  }
}
```


>Example response for getting the latest webplayer metadata for only 1.5.x

```json
200 OK

{
  "path": "versions/1.5.20/webplayer.min.js",
  "date": 1637679789463,
  "pixi": "4.8.6",
  "player": "1.5.20"
}
```

>Example Response for a non-existent webplayer version
```json
404 Not Found

null
```

### Response Data

- If a major version is specified in your request, the response will only contain metadata about the latest release under that major version (i.e. only the latest 1.5.x webplayer info).
- If no major version is specified, it will return the latest release for all major webplayer versions.

The metadata of each webplayer follows this structure:
Key|Type|Description|Example
:-:|:-:|:-:|:-:
path|string|The file path to this webplayer|versions/1.5.21/webplayer.min.js
date|number|The unix timestamp of when this webplayer file was last modified|1645448507469
pixi|string|The latest version of PIXI that accompanies this webplayer|4.8.6
player|string|The exact version number of this minor webplayer release|1.5.21

## Getting Webplayer Files

Using this API endpoint, you can also get the any Hopscotch webplayer file.

>Get the latest 1.5.x webplayer

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/1.5.0')
  .then(r => r.text())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/webplayer/1.5.0
```
### HTTP Request
`GET /webplayer/:version`

>This will also get the latest 1.5.x player, even though a minor version is specified

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/1.5.7')
  .then(r => r.text())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl 'https://hs-tools-api.up.railway.app/webplayer/1.5.7'
```

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
version|Yes|The version of the webplayer file you want

>Get webplayer with exact version 1.5.12

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/1.5.12?newest=0')
  .then(r => r.text())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl 'https://hs-tools-api.up.railway.app/webplayer/1.5.12?newest=0'
```

### Request Query

Name|Required|Default|Description
:-:|:-:|:-:|:-:
newest|No|1|`0` or `1`, whether you want to get the newest release for the major version provided

For example, if you `GET /webplayer/1.5.11` but the latest is `1.5.20`, the response will be the `1.5.20` webplayer instead of the version you provided (webplayer `1.5.11`). Set the newest flag to `0` if you do not want this behavior.

>Sample Response for existing version (truncated for obvious reasons):
```js
200 OK

/**
 * Hopscotch Technologies
 * Webplayer v1.5.20 - 2021/11/23 (production)
 */
console.log("Webplayer v1.5.20 - 2021/11/23 (production)");
!function(e){var t={}; ...
```

>Sample Response for non-existent version:
```json
404 Not Found

null
```
### Response Data

The response contains the JavaScript code for the webplayer, exactly as retrieved from Hopscotch's servers.

## Project Data Types

This endpoint will retrieve the webplayer file, and from it, determine all of the block, object, and parameter types.

>Get data types for the latest 1.5.x webplayer

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/1.5.0/project-datatypes')
  .then(r => r.json())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl https://hs-tools-api.up.railway.app/webplayer/1.5.0/project-datatypes
```
!<div data-copy></div>
```js
200 OK

{
  "blocks": {
    "19": "WaitTilTimestamp",
    "20": "WaitUntilInputIsDone",
    ...
  },
  "objects": {
    "0": "monkey",
    "1": "text",
    ...
  },
  "parameters": {
    "42": "Default",
    "43": "LineWidth",
    ...
  },
  "length": 3
}
```

### HTTP Request
`GET /webplayer/:version/project-datatypes`

>This will return JavaScript that sets a variable to the data types in the latest 1.5.x player (even though a specific version is present):

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/1.5.7/project-datatypes?var=datatypes')
  .then(r => r.text())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl 'https://hs-tools-api.up.railway.app/webplayer/1.5.7/project-datatypes?var=datatypes'
```
```js
200 OK

datatypes = {
  "blocks": {
    "19": "WaitTilTimestamp",
    "20": "WaitUntilInputIsDone",
    ...
  },
  ...
  "length": 3
}
```

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
version|Yes|The version of the webplayer file you want

>Call a function called `foo` with the data types as input, based on webplayer 1.5.12 instead of the newest version:

!<div data-copy data-language="js"></div>
```js
fetch('https://hs-tools-api.up.railway.app/webplayer/1.5.12/project-datatypes?newest=0&callback=foo')
  .then(r => r.text())
  .then(d => console.log(d))
```
!<div data-copy data-language="shell"></div>
```shell
curl 'https://hs-tools-api.up.railway.app/webplayer/1.5.12/project-datatypes?newest=0&callback=foo'
```

### Request Query

Name|Required|Default|Description
:-:|:-:|:-:|:-:
newest|No|1|`0` or `1`, whether you want to get the newest release for the major version provided

For example, if you `GET /webplayer/1.5.11` but the latest is `1.5.20`, the response will be the `1.5.20` webplayer instead of the version you provided (webplayer `1.5.11`). Set the newest flag to `0` if you do not want this behavior.

>Sample Response for non-existent version:
```json
404 Not Found

null
```
### Response Data

The response contains the JavaScript code for the webplayer, exactly as retrieved from Hopscotch's servers.

<aside class="notice">All data types are in the format of an Object, with keys being the ID of the instance, and values being the name.</aside>

For example, in `19: "waitTilTimestamp"`, `19` is the ID of the block, and `"waitTilTimestamp"` is the name.
The same applies to objects and parameters.


