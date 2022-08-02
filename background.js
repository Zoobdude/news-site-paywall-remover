const SOURCE_URLS = ['https://www.dorsetecho.co.uk', 'https://www.thetimes.co.uk/', 'https://www.theguardian.com', 'https://www.express.co.uk', 'https://www.dailymail.co.uk/', 'https://www.telegraph.co.uk', 'https://www.thesun.co.uk', 'https://www.independent.co.uk', 'https://www.mirror.co.uk', 'https://inews.co.uk', 'businessinsider.com', 'ft.com', 'thetimesweekly.com', 'businessweekly.co.uk', 'bloomberg.com', 'newsweek.com', 'newscientist.com', 'cruiseindustrynews.com', 'superyachtworld.com', 'nytimes.com', 'condenast.com']
const ERROR_CANNOT_EDITED = 'Error: Tabs cannot be edited right now (user may be dragging a tab).'

chrome.tabs.onCreated.addListener(tabOnCreated);
chrome.tabs.onUpdated.addListener(tabOnUpdated);

chrome.tabs.onRemoved.removeListener(tabOnCreated);
chrome.tabs.onRemoved.removeListener(tabOnUpdated);

async function redirectTo(tab, sourceUrls) {
  length = sourceUrls.length
  url = tab.url
  for(let i = 0; i < length; i++){
    if (url.includes(sourceUrls[i])) {
      if (!url.includes("12ft.io")) {
        await chrome.tabs.update(tab.id, { url: "https://12ft.io/" + url});
       }
   }
  }
}

async function tabOnCreated(tab) {
  try {
    await redirectTo(tab, SOURCE_URLS)
  } catch (error) {
    if (error == ERROR_CANNOT_EDITED) {
      setTimeout(() => tabOnCreated(tab), 50);
    } else {
      console.error(error);
    }
  }
}

async function tabOnUpdated(tabId, changeInfo, tab) {
  try {
    await redirectTo(tab, SOURCE_URLS)
  } catch (error) {
    if (error == ERROR_CANNOT_EDITED) {
      setTimeout(() => tabOnUpdated(tabId, changeInfo, tab), 50);
    } else {
      console.error(error);
    }
  }
}