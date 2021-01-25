var procrastinating;
var blackList = ["reddit","youtube","facebook"];
var listeners = 0;

//currently only tracks whenever you change tabs
//need to add so it tracks when new tab is created or tab url changes

chrome.tabs.onActivated.addListener(function(){
    listeners+=1;
    console.log(listeners);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // only use 'url' here since asynchronous
        console.log(url);
        procrastinating = checkBlackList(blackList,url);
        console.log(procrastinating);
        if (procrastinating){
            alert("tsk tsk");
        };
    });
});

function checkBlackList(blackList,url){
    //returns true if url is backlisted, false if not
    let contains = false;
    blackList.forEach(element => {
        if (url.includes(element)){
            //return true;
            contains = true;
        };
    });
    return contains;

};








