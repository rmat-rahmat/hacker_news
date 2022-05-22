
//Handle request timeout
export const timeoutPromise = (timeout, err, promise) => {
  return new Promise(function (resolve, reject) {
    promise.then(resolve, reject);
    setTimeout(reject.bind(null, err), timeout);
  });
}

export const chunk = (array, size) => {
  let result = []
  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
    // do whatever
  }
  return result;
}

export const timeSince = date => {

  var seconds = Math.floor((new Date() - date * 1000) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}

export const extractHostname = url => {
  if (isValidUrl(url)) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    hostname = hostname.split(".");

    if (hostname.length > 2) {
      hostname.shift();
    };

    return hostname.join(".");
  }
}

function isValidUrl(_string) {
  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
}
