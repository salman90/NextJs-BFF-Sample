import * as fs from 'fs';

export const cachePlugin = (CACHE_LOCATION) => {
    const beforeCacheAccess = async (cacheContext) => {
        return new Promise(async (resolve, reject) => {
            if (fs.existsSync(CACHE_LOCATION)) {
                fs.readFile(CACHE_LOCATION, 'utf-8', (err, data) => {
                    if (err) {
                        reject();
                    } else {
                        cacheContext.tokenCache.deserialize(data);
                        resolve();
                    }
                });
            } else {
                fs.writeFile(CACHE_LOCATION, cacheContext.tokenCache.serialize(), (err) => {
                    if (err) {
                        reject();
                    }
                });
            }
        });

    };

    const afterCacheAccess = async (cacheContext) => {
        if (cacheContext.cacheHasChanged) {
            fs.writeFile(CACHE_LOCATION, cacheContext.tokenCache.serialize(), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    };

    return {
        beforeCacheAccess,
        afterCacheAccess,
    };


};
