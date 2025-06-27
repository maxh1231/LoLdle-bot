import dotenv from 'dotenv';
dotenv.config();
import { S3Client } from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import https from 'https';

let agent = new https.Agent({
    maxSockets: 50,
});

export const client: S3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACC_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_BUCKET_KEY!,
        secretAccessKey: process.env.R2_BUCKET_SECRET!,
    },
    requestHandler: new NodeHttpHandler({
        requestTimeout: 3_000,
        httpsAgent: agent,
    }),
});
