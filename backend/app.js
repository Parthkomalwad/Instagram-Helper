const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const qs = require("qs")
const app = express();
const cors = require("cors"); // Import the cors package

app.use(cors());

app.get("/", (req, res) => {
    const url = 'https://saveig.app/api/ajaxSearch'
    const downloadUrl = req.header('X-Download-URL')

    const data = {
        q: `${downloadUrl}`,
        t: 'media',
        lang: 'en',
    };

    const headers = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://saveig.app",
        "Referer": "https://saveig.app/",
        "Sec-Ch-Ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203",
    };

    axios.post(url, qs.stringify(data), { headers }).then((response) => {
        const data = response.data.data
        const $ = cheerio.load(data)

        const filteredData = $('.download-items');

        const maindataUrl = filteredData.find('.download-items__btn').find('a').attr('href');
        console.log('Connection Successfull')
        res.send(maindataUrl)
    }).catch((error) => {
        console.log("Error", error)
        res.status(500).send("Error fetching URL");
    })


});

app.get("/caption", (req, res) => {

    const downloadUrl = req.header('X-Download-URL')
    // const downloadUrl = 'https://www.instagram.com/reel/Cvw2BFKtm2V/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA=='

    axios.get(downloadUrl).then((response) => {
        const data = response.data
        const $ = cheerio.load(data)

        const titleTag = $('title');
        const titleContent = titleTag.text();

        // Remove usernames and hashtags
        // const cleanTitle = titleContent.replace(/(@\w+|#\w+)/g, '');

        // const cleanTitle = titleContent.replace(/(@\w+(\.\w+)*|#\w+(\.\w+)*)/g, '');

        console.log('Connection Successfull')
        res.send(titleContent)
    }).catch((error) => {
        console.log("Error", error)
        res.status(500).send("Error fetching URL");
    })


});

app.get("/post", (req, res) => {

    const url = 'https://saveig.app/api/ajaxSearch'
    const downloadUrl = req.header('X-Download-URL')

    const data = {
        q: `${downloadUrl}`,
        t: 'media',
        lang: 'en',
    };

    const headers = {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://saveig.app',
        'Referer': 'https://saveig.app/',
        'Sec-Ch-Ua': '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203',
    };

    axios.post(url, qs.stringify(data), { headers }).then((response) => {
        const responseData = response.data.data;
        const $ = cheerio.load(responseData);
        const linkDictionary = {};

        const liElements = $('.download-box li');

        liElements.each((index, element) => {
            const aTag = $(element).find('a'); // Find <a> tag within the current <li> element
            const href = aTag.attr('href'); // Get the "href" attribute value of the <a> tag
            const linkName = `link ${index + 1}`; // Create link name, e.g., "link 1", "link 2"
            linkDictionary[linkName] = href; // Store the link in the dictionary
        });
        console.log('linkDictionary', linkDictionary)

        // Send the link dictionary as a response
        res.send(linkDictionary);
    }).catch((error) => {
        console.log("Error", error);
        res.status(500).send("Error fetching URL");
    });


});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
