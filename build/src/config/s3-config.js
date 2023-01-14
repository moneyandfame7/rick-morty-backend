import multer from 'multer';
import pkg from 'env-var';
import { S3Client } from '@aws-sdk/client-s3';
const { get } = pkg;
export default class S3Bucket {
    static storage = multer.memoryStorage();
    static upload = multer({ storage: this.storage });
    static bucketName = get('BUCKET_NAME').default('rick-morty-images').asString();
    static bucketRegion = get('BUCKET_REGION').default('eu-central-1').asString();
    static accessKey = get('ACCESS_KEY').default('AKIAS25MCMZS57S2ZDZN').asString();
    static secretAccessKey = get('SECRET_ACCESS_KEY')
        .default('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')
        .asString();
    static s3 = new S3Client({
        credentials: {
            accessKeyId: this.accessKey,
            secretAccessKey: this.secretAccessKey,
        },
        region: this.bucketRegion,
    });
}
