let session;
const isFake=()=>{
    return false;
}
async function prework(){
    let startBut = document.getElementById("StartButton");
    startBut.style.backgroundColor = 'green';
    try{
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
    var script = document.createElement("script");
    script.src = chrome.runtime.getURL('ortScript.js');
    script.onload = async function () {
        console.log("onload");
    };
    // append and execute script
    document.documentElement.firstChild.appendChild(script);
    var script = document.createElement("script");
    script.src = chrome.runtime.getURL('run.js');
    script.onload = async function () {
        console.log("onload");
    };
    document.documentElement.firstChild.appendChild(script);
}

