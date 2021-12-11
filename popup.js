let session;
async function prework(){
    let startBut = document.getElementById("StartButton")
    startBut.style.backgroundColor = 'green';
    session = await ort.InferenceSession.create('./AntiDeepfake_mobilenetv3_small.onnx');
    startBut.addEventListener("click", async()=>{
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: main
        });
    });
}
prework();
async function main(){
    try{
        let color={fakeColor: 'red', realColor: 'green'}
        console.log(`session=${session}`)
        function isFake(img){
            return false;
        };
        let images = document.getElementsByTagName('img');
        for(let i = 0; i < images.length; i++) {
            images[i].style.boxSizing = "border-box";
            if(isFake(images[i])){
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

