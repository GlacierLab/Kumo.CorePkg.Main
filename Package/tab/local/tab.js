(() => {
    const installed = ["msstore"];
    console.log("加载本地项目");

    const M = {
        RightMenu: {
            clear: () => {
                document.getElementById("local-menu").innerHTML = "";
            },
            add: (icon, name, callback) => {
                let menuItem = document.createElement("div");
                menuItem.className = "local-menu-item";
                let iconEle = document.createElement("img");
                iconEle.className = "local-menu-icon";
                iconEle.src = icon;
                menuItem.appendChild(iconEle);
                let nameEle = document.createElement("span");
                nameEle.innerText = name;
                nameEle.className = "local-menu-text";
                menuItem.appendChild(nameEle);
                menuItem.addEventListener("click", callback);
                document.getElementById("local-menu").appendChild(menuItem);
                return menuItem;
            },
            batchAdd: key => {
                window.DynamicInstall[key].menu.forEach(item => {
                    M.RightMenu.add(item.icon, item.name, item.click);
                });
            }
        }
    }
    M.RightMenu.add("/res/icon/cloud.svg", "云原神", () => { alert("原神，启动！") });
})()