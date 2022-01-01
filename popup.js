let session;
const isFake=()=>{
    return false;
}
async function targetWebSitePreWork(){
    let script = document.createElement("script");
    script.src = chrome.runtime.getURL('ortScript.js');
    script.onload = async function () {
        console.log("ortScript onload");
        let script = document.createElement("script");
        script.src = chrome.runtime.getURL('min.js');
        script.onload = async function () {
            console.log("min onload");
            let script = document.createElement("script");
            script.src = chrome.runtime.getURL('image-loader.js');
            script.onload = async function () {
                console.log("image-loader onload");
                let script = document.createElement("script");
                script.src = chrome.runtime.getURL('ndarray-browser-min.js');
                script.onload = async function () {
                    console.log("ndarray-browser-min onload");
                    let script = document.createElement("script");
                    script.src = chrome.runtime.getURL('imagenet.js');
                    script.onload = async function () {
                        console.log("imagenet onload");
                    };
                    document.documentElement.firstChild.appendChild(script);
                };
                document.documentElement.firstChild.appendChild(script);
            };
            document.documentElement.firstChild.appendChild(script);
        };
        document.documentElement.firstChild.appendChild(script);
    };
    document.documentElement.firstChild.appendChild(script);
}
async function prework(){
    let startBut = document.getElementById("StartButton");
    startBut.style.backgroundColor = 'black';
    try{
        let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        chrome.scripting.executeScript({
            target:{ tabId: tab.id},
            function: targetWebSitePreWork
        })
        startBut.addEventListener("click", async()=>{
            // chrome.storage.sync.set({ort:res});
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: main
            });
        });
    }
    catch(e){
        console.log(e);
    }
}
prework();
async function main(){
    let script = document.createElement("script");
    script.src = chrome.runtime.getURL('run.js');
    script.onload = async function () {
        console.log("run onload");
    };
    document.documentElement.firstChild.appendChild(script);
}

