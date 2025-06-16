import { S3Client } from '@aws-sdk/client-s3';

export const client: S3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACC_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_BUCKET_KEY!,
        secretAccessKey: process.env.R2_BUCKET_SECRET!,
    },
});
