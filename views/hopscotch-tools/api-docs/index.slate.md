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
!<div data-copy data-language="curl"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/blocks
```

### HTTP Request
`GET /hopscotch-data/blocks`

### Request Parameters

There are no request parameters

>This endpoint will return, with status `200 OK`, an array of blocks

```json
[
  {...},
  {...},
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
!<div data-copy data-language="curl"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/blocks/-1
```

### HTTP Request
`GET /hopscotch-data/blocks/:id`

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
id|Yes|The numeric ID of the Hopscotch block you want information about

>A `200 OK` response will return a JSON with this structure:

!<div data-copy></div>
```json
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

>If the block does not exist, it will return this error with status `404 Not Found`:
```json
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
!<div data-copy data-language="curl"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/objects
```

### HTTP Request
`GET /hopscotch-data/objects`

### Request Parameters

There are no request parameters

>This endpoint will return, with status `200 OK`, an array of objects

```json
[
  {...},
  {...},
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
!<div data-copy data-language="curl"></div>
```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/objects/1
```

### HTTP Request
`GET /hopscotch-data/objects/:id`

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
id|Yes|The numeric ID of the Hopscotch object you want information about

>A `200 OK` response will return a JSON with this structure:

!<div data-copy></div>
```json
{
  "codename": "text",
  "description": "An alphabet soup of letters, numbers, symbols, and emoji.",
  "id": 1,
  "key": "1",
  "name": "Text"
}
```

>If the object does not exist, it will return this error with status `404 Not Found`:
```json
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
