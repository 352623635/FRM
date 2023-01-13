const dynamicLoadScript = src => {
    return new Promise((resolve, reject) => {
        const existingScript = document.getElementById(src);
        if (existingScript) resolve();
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = src;
            script.id = src;
            document.body.appendChild(script);
            script.onload = resolve;
            script.onerror = reject;
        }
    });
};

export default dynamicLoadScript;
