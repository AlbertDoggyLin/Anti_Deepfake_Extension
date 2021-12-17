async function main(){
    try{
        session = await ort.InferenceSession.create('chrome-extension://mphenioebcpfeiodeaohhhlghodnkned/AntiDeepfake_mobilenetv3_small.onnx');
        let color={fakeColor: 'red', realColor: 'green'}
        let images = document.getElementsByTagName('img');
        for(let i = 0; i < images.length; i++) {
            images[i].style.boxSizing = "border-box";
            if(false){
                images[i].style.border=`${color.fakeColor} 5px solid`;
            }
            else{
                images[i].style.border=`${color.realColor} 5px solid`;
            }
        }
    }
    catch(e){
        console.log(e);
    }
}
main();