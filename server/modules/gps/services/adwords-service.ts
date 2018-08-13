
const auth = "Basic " + new Buffer(process.env.APP_ADWORDS_USERNAME + ":" + process.env.APP_ADWORDS_PASSWORD).toString("base64");

function get(keyword) {

    return new Promise((resolve, reject) => {
       
        //  request.post({
        //     url: 'https://api.dataforseo.com/v2/kwrd_for_keywords',
        //     body: {
        //         "data": [{
        //             "language": "en",
        //             "loc_name_canonical": "United States",
        //             "keys": [
        //                 keyword
        //             ]
        //         }],
        //     },
        //     headers: {
        //         "Authorization": auth
        //     },
        //     json: true
        // }, function (error, response, body) {
        //    console.log('++++', body);
        //     resolve(body);
        // });
    });

}

function search(keyword) {
    return get(keyword).then(parse);
}

function parse(adwordsRaw) {
    // var items = [];
    // var formatter = new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //     minimumFractionDigits: 2, /* this might not be necessary */
    // });

    // _.chain(adwordsRaw.results).take(9).each(function (d) {
    //     items.push({
    //         id: random(),
    //         text: _.get(d, 'key'),
    //         volume: _.get(d, 'sv').toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //         cpc: formatter.format(_.get(d, 'cpc')),
    //         score: parseInt((_.get(d, 'cmp') * 100)) + '%',
    //         value: formatter.format(parseFloat(_.get(d, 'cpc')) * parseFloat(_.get(d, 'sv'))),
    //         spm: _.get(d, 'ms.[0].count').toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //     });
    // }).value();
    // return items;
}

export { search as searchAdwords };
