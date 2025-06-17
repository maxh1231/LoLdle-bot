import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

export const putObject = (Key: string, Body: any) => {
    return new PutObjectCommand({
        Bucket: 'loldle',
        Key: Key,
        Body: Body,
        ContentType: 'image/png',
    });
};

export const getObject = (Key: string) => {
    return new GetObjectCommand({
        Bucket: 'loldle',
        Key: Key,
    });
};
