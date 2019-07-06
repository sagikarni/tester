import aws from 'aws-sdk';
import { pick } from 'lodash';

const cache = [];

export const proxy = ({ accessKeyId, secretAccessKey, bucket }) => {
  const s3 = new aws.S3({ accessKeyId, secretAccessKey });

  return async (req, res, next) => {
    const fileKey = ((req.params && req.params[0]) || '').toLocaleLowerCase();
    const modified = req.header('If-Modified-Since');
    if (modified && cache[fileKey] === modified) {
      res.send(304);
      res.end();
      return;
    }

    const options = {
      Bucket: bucket,
      Key: fileKey,
    };

    s3.getObject(options)
      .on('httpHeaders', (code, headers) => {
        // console.log(
        //   'httpHeaders',
        //   pick(headers, 'content-type', 'content-length', 'last-modified')
        // );
        if (code < 300) {
          res.set(
            pick(headers, 'content-type', 'content-length', 'last-modified')
          );
          cache[fileKey] = headers['last-modified'];

          res.set('Cache-Control', `public, max-age=${3600 * 24 * 1}`); // one year
        }
      })
      .createReadStream()
      // .on('data', (chunk) => {
      //   console.log('chunk', chunk);
      // })
      .on('error', (err) => {
        console.log({ err });
        res.status(404).end();
      })
      .pipe(res);
  };
};
