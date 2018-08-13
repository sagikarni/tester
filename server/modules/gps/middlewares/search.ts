import { searchAdwords } from '../services';
import { setTimeout, AppHttpError } from '@server/core';

export const keywordsWithResults = async (req, res) => {
  const { keyword } = req.params;
  // if (cache.get('keywordsWithResults' + keyword)) return res.status(200).json(cache.get('keywordsWithResults' + keyword));

  Promise.all([
    searchAdwords(keyword),
    //   amazon.search(keyword),
    //   aliexpress.search(keyword)
  ]).then(function(promises) {
    //   var searchResults = results(keyword, promises[0], promises[1], promises[2]);
    //   cache.put('keywordsWithResults' + keyword, searchResults, parseInt(process.env.APP_EXPIRE, 10));
    //   res.status(200).send(searchResults);
  });
};

export const keywords = async (req, res, next) => {
  // setTimeout(() => {
  //     throw new Error('oh no');

  // }, 3000, next);

  // //const user = await User.findOne({ email });
  // var user = null;
  // if (!user) return next(new AppHttpError(400, 'EXIST'));

  res.send({
    HttpCode: "HttpCodes.OK",
    env: process.env.DEBUG_ENV,
    app: process.env.APP_NAME,
  });
  // return next(new AppHttpError(400, 'EXIST'));
  // //throw new Error('something happend');

  // const { keyword } = req.params;
  // // if (cache.get('keyword' + keyword)) return res.status(200).json(cache.get('keyword' + keyword));

  // searchAdwords(keyword).then(results => {
  // //   var result = results[0];
  // //   cache.put('keyword' + keyword, result, parseInt(process.env.APP_EXPIRE, 10));

  // //   res.status(200).send(result);
  // });

  // var q = "select 1 waitfor delay '00:00:10'";

  // sequelize.query(q, { type: sequelize.QueryTypes.SELECT})
  //   .then((r) => {
  //     res.status(200).json({ r });
  //   });
};
