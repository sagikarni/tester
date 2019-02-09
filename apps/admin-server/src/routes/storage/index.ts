import { Router } from 'express';
import { values, groupBy, entries, toPairs } from 'lodash';

const router = Router();

const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAI54TZXRSE6JGWPCQ',
  secretAccessKey: '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',
  // region: 'ap-southeast-1',
});

router.get('/*', (req, res, next) => {
  try {
    console.log('xx', req.params[0]);

    const fileKey = req.params[0];
    console.log('Trying to download file', fileKey);

    const s3 = new AWS.S3();
    const options = {
      Bucket: 'sagi-tera-files',
      Key: fileKey,
    };

    res.attachment(fileKey);
    const fileStream = s3
      .getObject(options)
      .createReadStream()
      .on('error', (err) => {
        console.log('download failed');
        res.sendStatus(404);
        res.end();
      });
    fileStream.pipe(res);
  } catch (ex) {
    console.log({ ex });

    res.sendStatus(404);

    res.end();
  }
});

export { router as storage };
