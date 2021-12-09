let changeColor = document.getElementById("changeColor")


chrome.storage.sync.get("color", ({color}) => {
    changeColor.style.backgroundColor = color;
});


function drawImgs(){
    chrome.storage.sync.get("color", ({color}) => {
        var images = document.getElementsByTagName('img'); 
        var srcList = [];
        for(var i = 0; i < images.length; i++) {
            srcList.push(images[i].src);
            images[i].style.backgroundColor=color;
            images[i].style.border='red 5px solid';
            images[i].style.boxSizing = "border-box";
        }
    });
}


changeColor.addEventListener("click", async()=>{
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: drawImgs
    });
});