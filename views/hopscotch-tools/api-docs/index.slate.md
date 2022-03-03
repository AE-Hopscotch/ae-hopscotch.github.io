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

## Information About a Specific Block

>`GET https://hs-tools-api.up.railway.app/hopscotch-data/blocks/19`

>200 OK
<pre><div>{
  <span class="cm-property">"about"</span>: <span class="cm-string">"Community Description"</span>,
  <span class="cm-property">"authors"</span>: [<span class="cm-string">"Awesome_E"</span>],
  <span class="cm-property">"availability"</span>: <span class="cm-string">"all"</span>,
  <span class="cm-property">"blockHTML"</span>: <span class="cm-string">"fish &lt;i class=\"ps fa fa-volume-up\"&gt;&lt;/i&gt; "</span>,
  <span class="cm-property">"collapsible"</span>: <span class="cm-atom">false</span>,
  <span class="cm-property">"community_links"</span>: [<span class="cm-string">"..."</span>],
  <span class="cm-property">"community_links"</span>: [
  <span class="cm-property">"description"</span>: <span class="cm-string">"N/A –&nbsp;There is no app description"</span>,
  <span class="cm-property">"id"</span>: <span class="cm-number">-1</span>,
  <span class="cm-property">"key"</span>: <span class="cm-string">"-1"</span>,
  <span class="cm-property">"name"</span>: <span class="cm-string">"fish"</span>,
  <span class="cm-property">"other_info"</span>: [<span class="cm-string">"..."</span>],
  <span class="cm-property">"parameters"</span>: <span class=" CodeMirror-matchingbracket">[</span><span class="cm-string">"..."</span><span class=" CodeMirror-matchingbracket">]</span>,
  <span class="cm-property">"type"</span>: <span class="cm-string">"old"</span>,
  <span class="cm-property">"useful_for"</span>: [<span class="cm-string">"Fishing"</span>]
}</div></pre>

`GET /hopscotch-data/blocks/:id`


