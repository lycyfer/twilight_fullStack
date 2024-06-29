import { createContext, useEffect, useState } from "react";

const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId, setState }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        if (!loaded) {
            const uwScript = document.getElementById("uw");
            if (!uwScript) {
                // Если не загружен, создаем и загружаем скрипт
                const script = document.createElement("script");
                script.setAttribute("async", "");
                script.setAttribute("id", "uw");
                script.src = "https://upload-widget.cloudinary.com/global/all.js";
                script.addEventListener("load", () => setLoaded(true));
                document.body.appendChild(script);
            } else {
                setLoaded(true);
            }
        }
    }, [loaded]);

    const initializeCloudinaryWidget = () => {
        if (loaded) {
            var myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log("Готово! Вот информация об изображении: ", result.info);
                        setState(prev => [...prev, result.info.secure_url])
                    }
                }
            );

            document.getElementById("upload_widget").addEventListener(
                "click",
                function () {
                    myWidget.open();
                },
                false
            );
        }
    };

    return (
        <CloudinaryScriptContext.Provider value={{ loaded }}>
            <button
                id="upload_widget"
                className="cloudinary-button"
                onClick={initializeCloudinaryWidget}
            >
                Загрузить
            </button>
        </CloudinaryScriptContext.Provider>
    );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };