import aws from 'aws-sdk';

export const proxy = ({ accessKeyId, secretAccessKey, bucket }) => {
  const s3 = new aws.S3({ accessKeyId, secretAccessKey });

  return (req, res) => {
    const fileKey = (req.params && req.params[0]) || '';

    const options = {
      Bucket: bucket,
      Key: fileKey,
    };

    res.attachment(fileKey);

    s3.getObject(options)
      .createReadStream()
      .on('error', (err) => {
        console.log({ err });
        res.status(404).end();
      })
      .pipe(res);
  };
};
