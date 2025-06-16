import {
    PutObjectCommand,
    PutObjectRequest,
    GetObjectCommand,
    GetObjectRequest,
} from '@aws-sdk/client-s3';

export const putObject = ({ Key, Body }: PutObjectRequest) => {
    return new PutObjectCommand({
        Bucket: 'loldle',
        Key: Key,
        Body: Body,
    });
};

export const getObject = ({ Key }: GetObjectRequest) => {
    return new GetObjectCommand({
        Bucket: 'loldle',
        Key: Key,
    });
};
