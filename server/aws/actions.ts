import {
    PutObjectCommand,
    GetObjectCommand,
    HeadObjectCommand,
} from '@aws-sdk/client-s3';
import type {
    PutObjectCommandInput,
    GetObjectCommandInput,
    HeadObjectCommandInput,
} from '@aws-sdk/client-s3';

/**
 * Upload object to bucket.
 * @param {PutObjectCommandInput} - Request options.
 * @returns - Command to execute.
 */
export const putObject = ({
    Bucket,
    Key,
    Body,
    ...rest
}: PutObjectCommandInput) => {
    return new PutObjectCommand({
        Bucket,
        Key,
        Body,
        ...rest,
    });
};

/**
 * Get object from bucket.
 * @param {GetObjectCommandInput} - Request options.
 * @returns - Command to execute.
 */
export const getObject = ({ Key }: GetObjectCommandInput) => {
    return new GetObjectCommand({
        Bucket: 'loldle',
        Key: Key,
    });
};

/**
 * Get object metadata from bucket.
 * Useful for determining if object already exists.
 * @param {HeadObjectCommandInput} - Request options.
 * @returns - Command to execute.
 */
export const getObjectMetaData = ({
    Bucket = 'loldle',
    Key,
    ...rest
}: HeadObjectCommandInput) => {
    return new HeadObjectCommand({
        Bucket,
        Key,
        ...rest,
    });
};
