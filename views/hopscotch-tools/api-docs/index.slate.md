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

>`GET https://hs-tools-api.up.railway.app/hopscotch-data/blocks`

> 200 OK

<pre><div>[
<span class="cm-tab" role="presentation" cm-text="	">  </span>{...},
<span class="cm-tab" role="presentation" cm-text="	">  </span>{...},
<span class="cm-tab" role="presentation" cm-text="	">  </span>...
]</div></pre>

`GET /hopscotch-data/blocks`

Returns the entire list of blocks being used by HS Tools

## Info About a Specific Block

<div data-copy data-language="js"></div>

```js
fetch({
  url: 'https://hs-tools-api.up.railway.app/hopscotch-data/blocks/1',
  method: 'GET'
}).then(r => r.json())
  .then(d => console.log(d))
```

<div data-copy data-language="curl"></div>

```shell
curl https://hs-tools-api.up.railway.app/hopscotch-data/blocks/1
```

>A 200 OK response will return a JSON with this structure:
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

Returns information about the block with the specified ID

### HTTP Request
`GET https://hs-tools-api.up.railway.app/hopscotch-data/blocks/:id`

### Request Parameters

Name|Required|Description
:-:|:-:|:-:
id|Yes|The numeric ID of the Hopscotch block you want information about

### Response Data

Key|Description
:-:|:-:


