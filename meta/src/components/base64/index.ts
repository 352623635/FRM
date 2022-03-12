
export default {
    getBase64: (value:any) => (
        new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.readAsDataURL(value);
        })
    )
}