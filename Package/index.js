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
            document.getElementById("float-menu").addEventListener("click", () => {
                document.getElementById("float-menu").style.display = "none";
            });
            //默认菜单内容
            Module.FloatMenu.add("/res/icon/update.svg", "检查更新", async (e) => {
                //先检查扩展包
                //再检查运行时
            });
            Module.FloatMenu.add("/res/icon/settings.svg", "设置", async (e) => {
                await Module.PreferenceManager.sync(true);
                chrome.webview.hostObjects.KumoBridge.Kumo_OpenPreferenceWindow();
            })
            Module.FloatMenu.add("/res/icon/developer_mode.svg", "开发者工具", () => { chrome.webview.hostObjects.sync.KumoBridge.Window_OpenDevTools() })
            Module.FloatMenu.add("/res/icon/info.svg", "关于", () => { Module.FloatFrame.show("/subframe/about.html"); })
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
    },
    //浮动页面
    FloatFrame: {
        show: url => {
            let frame = document.createElement("iframe");
            frame.id = "frame-page";
            frame.src = url;
            let message = async (event) => {
                console.log(event.data)
                if (typeof event.data == "string") {
                    if (event.data == "close") {
                        Module.FloatFrame.hide();
                        window.removeEventListener("message", message);
                    }
                }
            }
            window.addEventListener("message", message);
            document.getElementById("float-frame").appendChild(frame);
            document.getElementById("float-frame").style.display = "flex";
            document.getElementById("float-layer").style.display = "block";
        },
        hide: () => {
            document.getElementById("float-frame").removeChild(document.getElementById("frame-page"));
            document.getElementById("float-frame").style.display = "none";
            document.getElementById("float-layer").style.display = "none";
        }
    },
    //配置同步
    PreferenceManager: {
        init: () => {
            Module.PreferenceManager.sync();
        },
        sync: async (readonly = false) => {
            window.Preference = JSON.parse(await chrome.webview.hostObjects.KumoBridge.Kumo_SyncPreference(readonly ? null : window.Preference ? JSON.stringify(window.Preference) : null));
        }
    },
    //队列任务管理工具
    TaskScheduler: {
        add: (name, callback) => {

        },
        list: []
    }
};
const Callback = {
    Window_State: max => {
        document.getElementById("btn-maximize").style.backgroundImage = max ? 'url(res/icon/fullscreen_exit.svg)' : 'url(res/icon/fullscreen.svg)';
    },
    Preference_Change: () => {
        Module.PreferenceManager.sync();
    }
}
Module.AutoInit.run();