
import { timeoutPromise } from "./utilities";

//Fetch top stories from hacker news API

const getNewsDetails = (id) => {
    return new Promise((resolve, reject) => {
        timeoutPromise(10000, new Error('Timed Out!'),
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
            .then((response) => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch(error => {
                reject(error);
            });
    });
};
export default getNewsDetails;