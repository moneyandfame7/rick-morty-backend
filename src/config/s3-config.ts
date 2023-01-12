import multer, { StorageEngine } from 'multer';
import pkg from 'env-var';
import { S3Client } from '@aws-sdk/client-s3';

const { get } = pkg;
export default class S3Bucket {
  private static readonly storage: StorageEngine = multer.memoryStorage();
  public static readonly upload = multer({ storage: this.storage });
  public static readonly bucketName: string = get('BUCKET_NAME').default('rick-morty-images').asString();
  private static readonly bucketRegion: string = get('BUCKET_REGION').default('eu-central-1').asString();
  private static readonly accessKey: string = get('ACCESS_KEY').default('AKIAS25MCMZS57S2ZDZN').asString();
  private static readonly secretAccessKey: string = get('SECRET_ACCESS_KEY')
    .default('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')
    .asString();

  public static readonly s3 = new S3Client({
    credentials: {
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretAccessKey,
    },
    region: this.bucketRegion,
  });
}
