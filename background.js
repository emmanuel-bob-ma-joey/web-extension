var procrastinating;
var blackList = ["reddit","youtube","facebook"];
var listeners = 0;
var ticking = false; 

//currently only tracks whenever you change tabs
//need to add so it tracks when new tab is created or tab url changes

chrome.tabs.onActivated.addListener(function(){
    console.log("new tab activated");
    myScript();
});
chrome.runtime.onInstalled.addListener(function(){
    console.log("extension running!");
    myScript();
});


chrome.webNavigation.onCompleted.addListener(function(details){
    if (details.frameId===0){
        console.log("webnavigation complete");
        listeners+=1;
        console.log(listeners);
        chrome.tabs.get(details.tabId, function(tab) {
            let url = tab.url;
            console.log(url);
            procrastinating = checkBlackList(blackList,url);
            console.log(procrastinating);
            if (procrastinating){
                alert("tsk tsk");
            };
        
        });

    };
    
    
});
function myScript(){
    listeners+=1;
    console.log(listeners);
    chrome.tabs.query({active: true, /*lastFocusedWindow: true*/}, tabs => {
        let url = tabs[0].url;
        // only use 'url' here since asynchronous
        console.log(url);
        procrastinating = checkBlackList(blackList,url);
        console.log(procrastinating);
        if (procrastinating){
            alert("tsk tsk");
        };
    });
    return 1;

};

function checkBlackList(blackList,url){
    //returns true if url is backlisted, false if not
    //might have false positive e.g 
    //https://stackoverflow.com/questions/36808309/chrome-extension-page-update-twice-then-removed-on-youtube/36818991#36818991
    //contains youtube so is flagged
    let contains = false;
    blackList.forEach(element => {
        if (url.includes(element)){
            //return true;
            contains = true;
        };
    });
    return contains;

};








