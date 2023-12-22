(() => {
    window.DynamicInstall.msstore = {
        launch: () => {
            KumoBridge.Execute_OpenUrl("ms-windows-store://navigatetopage/?Id=Gaming");
        },
        menu: [
            {
                name: "设置启动板块",
                icon: "/res/icon/settings.svg",
                click: () => {

                }
            },
            {
                name: "修复商店",
                icon: "/res/icon/",
                click: () => {
                    KumoBridge.Execute_Program("C:\\Windows\\System32\\WSReset.exe");
                }
            }
        ]
    }
})();