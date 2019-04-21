import { Router } from 'express';
import aws from 'aws-sdk';
import { async } from 'express-zone';

const router = Router();

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET } = process.env;

aws.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

router.get(
  '/*',
  async((req, res, next) => {
    // http://localhost:8080/storage/Speech/Articulation/B/4997825.jpg
    const fileKey = req.params[0];

    const s3 = new aws.S3();
    const options = {
      Bucket: BUCKET,
      Key: fileKey,
    };

    res.attachment(fileKey);

    s3.getObject(options)
      .createReadStream()
      .on('error', (err) => {
        console.log({ err });
        res.status(404).end(); //sendStatus(404);
        // return;
      })
      .pipe(res);
  })
);

export { router as storage };
