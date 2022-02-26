let playerDiv = document.createElement("div");
playerDiv.id = "aehs-player-frame", playerDiv.style = "transform:scale(0);-webkit-transform:scale(0);z-index:10000;width:100vw;height:100%;top:0;left:0;position:fixed;transition:0.5s;";
playerDiv.innerHTML = `<button id="close-player-btn" onclick="showEmbeddedPlayer('about:blank')" aria-label="Close embedded player"><i class="fa fa-close"></i></button><iframe allowfullscreen title="Hopscotch player frame" frameborder="0" style="background-color:black;width:100%;height:100%;top:0;left:0;position:absolute" src=""></iframe>`;
document.body.appendChild(playerDiv);

document.querySelectorAll('.game-link, img[src*="hs-thumbnails\/"]').forEach(btn=>{
    btn.addEventListener("click", function(e) {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault(); //Don't follow link redirect
        if (btn.href) showEmbeddedPlayer(btn.getAttribute("data-url").replace(/\{href\}/g,btn.href));
        else showEmbeddedPlayer("/hs-tools/play-project/?id="+btn.src.replace(/.*hs-thumbnails\/|\.png$/g,"")+"&play=1");
    });
});
function showEmbeddedPlayer(url) {
    if (url == "about:blank") {
        document.body.classList.remove('scroll-lock');
        setTimeout(function(){playerFrame.style.webkitTransform = playerFrame.style.transform = "scale(0)";},20);
        setTimeout(function(){playerFrame.querySelector('iframe').src="about:blank"; playerIsOpen = false;},1000);
    } else {
        document.body.classList.add('scroll-lock');
        setTimeout(function(){
            playerFrame.style.webkitTransform = playerFrame.style.transform = "scale(1)";
            playerFrame.querySelector('iframe').src = url;
            playerIsOpen = true;
        },20);
    }
}
document.body.onpointermove = document.body.ontouchmove = function(e) {
    if (!playerIsOpen) {
        document.documentElement.style.setProperty("--mouse-x",e.clientX+"px");
        document.documentElement.style.setProperty("--mouse-y",e.clientY+"px");
    }
}
const playerFrame = document.getElementById('aehs-player-frame');
let playerIsOpen = false;
playerFrame.style.webkitTransformOrigin = playerFrame.style.transformOrigin = "var(--mouse-x) var(--mouse-y)";