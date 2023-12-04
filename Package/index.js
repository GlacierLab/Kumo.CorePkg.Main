"use strict";
const Module = {
    //自动初始化
    AutoInit: {
        run: () => {
            Object.entries(Module).forEach(([key, value]) => {
                if (value.init) {
                    value.init();
                }
            });
        }
    },
    //浮动菜单
    FloatMenu: {
        init: () => {
            console.log(this);
            document.getElementById("btn-menu").addEventListener("click", () => {
                const menu = document.getElementById("float-menu");
                menu.style.display = getComputedStyle(menu).display == "none" ? "flex" : "none";
            });
            //默认菜单内容
            Module.FloatMenu.add("/res/icon/developer_mode.svg", "开发者工具", () => { chrome.webview.hostObjects.sync.KumoBridge.Window_OpenDevTools() })
        },
        add: (icon, name, callback) => {
            let menuItem = document.createElement("div");
            menuItem.className = "menu-item";
            let iconEle = document.createElement("div");
            iconEle.className = "menu-icon";
            iconEle.style.backgroundImage = "url(" + icon + ")";
            menuItem.appendChild(iconEle);
            let nameEle = document.createElement("span");
            nameEle.innerText = name;
            nameEle.className = "menu-name";
            menuItem.appendChild(nameEle);
            menuItem.addEventListener("click", callback);
            document.getElementById("float-menu").appendChild(menuItem);
            return menuItem;
        },
        remove: ele => {
            document.getElementById("float-menu").removeChild(ele);
        }
    }
};
const Callback = {
    Window_State: max => {
        document.getElementById("btn-maximize").style.backgroundImage = max ? 'url(res/icon/fullscreen_exit.svg)' : 'url(res/icon/fullscreen.svg)';
    }
}
Module.AutoInit.run();