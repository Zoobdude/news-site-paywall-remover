const SOURCE_URLS = ['https://www.dorsetecho.co.uk', 'https://www.thetimes.co.uk/', 'https://www.theguardian.com', 'https://www.express.co.uk', 'https://www.dailymail.co.uk/', 'https://www.telegraph.co.uk', 'https://www.thesun.co.uk', 'https://www.independent.co.uk', 'https://inews.co.uk', 'https://www.businessinsider.com', 'https://www.ft.com', 'https://thetimesweekly.com', 'https://businessweekly.co.uk', 'https://bloomberg.com', 'https://newsweek.com', 'https://newscientist.com', 'https://cruiseindustrynews.com', 'https://superyachtworld.com', 'https://nytimes.com', 'https://condenast.com']
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
      if (!url.includes("https://12ft.io/proxy?q=")) {
        if (!url.includes("https://txtify.it/")) {
          if (url.includes("www.telegraph.co.uk")) {
            await chrome.tabs.update(tab.id, {url: "https://txtify.it/" + url.split('?')[0]});
          } else {
          await chrome.tabs.update(tab.id, { url: "https://12ft.io/proxy?q=" + url.split('?')[0]});
        }
      }
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
