(() => {
    const listener = e => {
        if (e.source == document.getElementById("navi-frame").contentWindow) {
            console.log(e.data)
        }
    }
    window.addEventListener("message", listener);
    Module.MainTab.getPage("navi").callRemove = () => {
        window.removeEventListener("message", listener);
    }
})()