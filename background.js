chrome.runtime.onInstalled.addListener(()=>{
    console.log('Welcome')
});

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %c green', `color: ${color}`);
});
