var s={getBase64:a=>new Promise(r=>{const e=new FileReader;e.onload=()=>{r(e.result)},e.readAsDataURL(a)})};export{s as b};
