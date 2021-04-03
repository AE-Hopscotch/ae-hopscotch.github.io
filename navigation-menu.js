(function(){
	let navPages = [
		{
			"title": "Home",
			"icon": "fa-home", //FontAwesome Icon
			"url": "/"
		},
		{
			"title": "Projects",
			"url": "/projects/",
			"subpages": [
				{
					"title": "Games",
					"icon": "fa-gamepad",
					"url": "/projects/games/"
				},
				{
					"title": "Templates",
					"icon": "fa-code",
					"url": "/projects/templates/"
				},
				{
					"title": "Concepts",
					"icon": "fa-flask",
					"url": "/projects/concepts/"
				}
			]
		},
		{
			"title": "Webplayer",
			"url": "/player/",
			"subpages": [
				{
					"title": "Documentation",
					"icon": "fa-file-text-o",
					"url": "/player/docs/"
				}
			]
		},
		/*{
			"title": "Builder",
			"url": "/hs-builder/",
			"subpages": [
				{
					"title": "Load & Save",
					"icon": "fa-cloud-download",
					"url": "/hs-builder/basics/#loading-and-saving"
				},
				{
					"title": "Secret Blocks",
					"icon": "fa-th-list",
					"url": "/hs-builder/basics/#secret-blocks"
				}
			]
		},
		{
			"title": "HPCX",
			"url": "/hpcx/",
			"subpages": [
				{
					"title": "Download",
					"icon": "fa-download",
					"url": "/hpcx/download/"
				},
				{
					"title": "Help Guide",
					"icon": "fa-info-circle",
					"url": "/hpcx/help/"
				},
				{
					"title": "Add-Ons",
					"icon": "fa-puzzle-piece",
					"url": "/hpcx/addons/"
				}
			]
		},*/
		{
			"title": "Scores",
			"url": "/high-scores/",
			"subpages": [
				{
					"title": "Games",
					"icon": "fa-h-square",
					"url": "/high-scores/games/"
				},
				{
					"title": "Speedruns",
					"icon": "fa-flag-checkered",
					"url": "/high-scores/speedruns/"
				},
				{
					"title": "Rankings",
					"icon": "fa-trophy",
					"url": "/high-scores/rankings/"
				}
			]
		}, 
		/* {
			"title": "Other",
			"url": "/other/",
			"subpages": [
				{
					"title": "Spotlight",
					"icon": "fa-star-o",
					"url": "/other/spotlight/"
				},
				{
					"title": "Community",
					"icon": "fa-group",
					"url": "/other/community/"
				},
				{
					"title": "Questions",
					"icon": "fa-question",
					"url": "/other/faq/"
				}
			]
		} */
	];
	const info = {
		iconUrl: "/hopscotch/images/icon.png",
		smallIconUrl: "/hopscotch/images/icon.png",
		rootPath: "/hopscotch/",
		siteName: "Awesome_E",
		navItemClass: "nav-item",
		sidenavBgColor: "#080808fd"
	}
	let topnav = document.createElement("div");
	topnav.classList.add("topnav");
	//Logo and Menu Button
	topnav.innerHTML = `<span class="small-screen">
			<span id="open-sidenav-btn">
				<i class="fa fa-bars fa-fw" style="margin: 8px 8px 8px 12px;"></i>
			</span>
			<a href="${info.rootPath}">
				<span style="background-image:url(${info.smallIconUrl});background-size:cover;width:25px;height:25px;margin:0 4px 0 -4px;">⁣</span>
				<b style="color:white;height:25px;">${info.siteName}</b>
			</a>
		</span>
		<a href="${info.rootPath}" class="large-screen"><img alt="site icon" src="${info.iconUrl}"><span class="hidden">homepage</span></a>`;
	let sidenav = document.createElement("ul");
	sidenav.classList.add("sidenav");
	sidenav.innerHTML = `<li id="close-sidenav-btn" style="position:fixed;width:244px;background-color:${info.sidenavBgColor};z-index:1;top:0;left:-250px;transition:0.5s">
		<span><i class="fa fa-fw fa-close" style="margin: 8px 4px;"></i>Close Menu</span></li><li style="line-height:24px;"><br/></li>`;
	navPages.forEach(page=>{
		if (page.subpages) {
			topnav.innerHTML += `<div><a href="${page.url.replace(/^\//,info.rootPath)}" class="${info.navItemClass}">${page.title}</a><div class="submenu">${
				page.subpages.repeatEach(subpage=>{return '<a href="'+subpage.url.replace(/^\//,info.rootPath)+'">'+subpage.title+'</a>'}).join('<br/>')
			}</div></div>`;
			let index = navPages.indexOf(page);
			sidenav.innerHTML += `<li><a href="javascript:void(0)" onmousedown="event.preventDefault()" onclick="sidenav.subsection('${index}')"><i id="c${index}" class="fa fa-fw fa-caret-right"></i><span class="hidden">open submenu</span></a><a href="${page.url.replace(/^\//,info.rootPath)}">${page.title}</a></li>
			<ul id="g${index}" hidden>${
				page.subpages.repeatEach(subpage=>{return '<li><a href="'+subpage.url.replace(/^\//,info.rootPath)+'"><i class="fa fa-fw '+subpage.icon+'"></i>'+subpage.title+'</a></li>'}).join('')
			}</ul>`
		} else {
			topnav.innerHTML += `<a href="${page.url.replace(/^\//,info.rootPath)}" class="${info.navItemClass}">${page.title}</a>`;
			sidenav.innerHTML += `<li><a href="${page.url.replace(/^\//,info.rootPath)}"><i class="fa fa-fw ${page.icon}"></i>${page.title}</a></li>`;
		}
	});
	sidenav.innerHTML += "<li><br/><br/><br/></li>";
	let overlay = document.createElement("div");
	overlay.classList.add("overlay");
	document.body.insertBefore(overlay, document.body.querySelector("*"));
	document.body.insertBefore(sidenav, overlay);
	document.body.insertBefore(topnav, sidenav);
})();
//Responsive Navigation
const	openNavBtn = document.getElementById("open-sidenav-btn"),
		overlayElm = document.querySelector(".overlay"),
		closeBtn = document.getElementById("close-sidenav-btn");
openNavBtn.addEventListener("click",function(){
	document.querySelector(".sidenav").style.left = document.querySelector("#close-sidenav-btn").style.left = "0";
	document.querySelector(".overlay").style.display = "block";
	setTimeout(function(){document.querySelector(".overlay").style.opacity = "0.75";},12);
	//Disable Body Scrolling
		document.body.style.overflow = "hidden";
		document.body.style.touchAction = "none";
		document.body.ontouchmove = (e) => {if(!document.querySelector(".sidenav").contains(e.target))e.preventDefault()};
});
overlayElm.onclick = overlayElm.ontouchend = closeBtn.onclick = function() {
	document.querySelector(".sidenav").style.left = document.querySelector("#close-sidenav-btn").style.left = "-250px";
	document.querySelector(".overlay").style.opacity = "0";
	setTimeout(function(){document.querySelector(".overlay").style.display = "none";},500);
	//Enable Body Scrolling
		document.body.style.overflow = "";
		document.body.style.touchAction = "";
		document.body.ontouchmove = (e) => {void(0);};
};
var sidenav = {
	subsection: function (id){
		let cid = "c" + id,
			gid = "g" + id,
			caret = document.getElementById(cid),
			group = document.getElementById(gid);
		if (group.hidden){
			group.hidden = false;
			caret.classList.add('fa-caret-down');
			caret.classList.remove('fa-caret-right');
		} else {
			group.hidden = true;
			caret.classList.add('fa-caret-right');
			caret.classList.remove('fa-caret-down');
		}
	}
};
let mgGlobalVars = {
	screenTouched: false
}
document.body.addEventListener("touchstart", function() {mgGlobalVars.screenTouched = true;});
document.body.addEventListener("touchend", function() {setTimeout(function(){mgGlobalVars.screenTouched = false;},10)});
function resizeOuterDivs(event) {
	document.querySelectorAll(".topnav > div").forEach(div=>{
		let anchorStyle = getComputedStyle(div.querySelector("a"));
		div.style.width = Math.ceil(Number(anchorStyle.width.replace(/px/,"")) + Number(anchorStyle.paddingLeft.replace(/px/,""))*2) + "px";
	});
}
resizeOuterDivs();
window.addEventListener('load',resizeOuterDivs);
document.querySelector(".topnav").addEventListener("mouseenter", resizeOuterDivs);

document.querySelectorAll(".topnav > div a").forEach(elm=>{
	elm.addEventListener("mouseenter",function(event){
		elm.onclick = function(e) {
			resizeOuterDivs();
			if (mgGlobalVars.screenTouched && e.timeStamp - event.timeStamp < 1) e.preventDefault();
		}
	});
});

{
	let footer = document.createElement("div");
	footer.setAttribute('class', 'section footer');
	footer.innerHTML = `<p>Awesome_E, 2021</p><p>
		<a class="user-page button" target="_blank" href="https://github.com/AE-Hopscotch"><i class="fa fa-github"></i><span class="hidden">GitHub</span></a>
		<a class="user-page button" target="_blank" href="https://forum.gethopscotch.com/u/awesome_e"><i class="fa fa-feed"></i><span class="hidden">Forum</span></a>
		<a class="user-page button" target="_blank" href="/hs-tools/explore-channel/user?u=coq5v-1kwk_7m"><i class="fa fa-h-square"></i><span class="hidden">Hopscotch</span></a>
		<a class="user-page button" target="_blank" href="/hs-tools/"><i class="fa fa-globe"></i><span class="hidden">Website</span></a>
		</p>${AE_REFERENCE.onIos?'<br/><br/><br/><br/>':''}`;
	(document.querySelector(".wrapper")||document.body).appendChild(footer);
}