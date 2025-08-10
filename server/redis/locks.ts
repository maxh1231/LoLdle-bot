const locks = new Map<string, Promise<unknown>>();

/**
 * @template T
 * @param {string} key - Identifier for the lock scope.
 * @param {() => Promise<T>} fn - Function to execute under the lock.
 * @returns {Promise<T>} - Resolves with the result of `fn`.
 */
export const withLock = async <T>(
    key: string,
    fn: () => Promise<T>
): Promise<T> => {
    const prev = locks.get(key) ?? Promise.resolve();

    let resolve!: (v: T) => void;
    let reject!: (e: unknown) => void;
    const run = new Promise<T>((res, rej) => ((resolve = res), (reject = rej)));

    const chained = prev
        .catch(() => {})
        .then(fn)
        .then(resolve, reject)
        .finally(() => {
            if (locks.get(key) === chained) locks.delete(key);
        });

    locks.set(key, chained);
    return run;
};
