const zlib = require('zlib');

function compressionMiddleware(req, res, next) {
  const encoding = req.headers['content-encoding'];

    if (encoding === 'gzip') {
        console.log("Handling gzip encoding");

        const gunzip = zlib.createGunzip();
        const chunks = [];

        req.pipe(gunzip)
            .on('data', (chunk) => {
                chunks.push(chunk);
            })
            .on('end', () => {
                const rawBody = Buffer.concat(chunks);
                try {
                    req.body = JSON.parse(rawBody.toString()); // Parse JSON if applicable
                } catch (err) {
                    console.error('JSON parsing error:', err);
                    return res.status(400).send('Invalid JSON');
                }
                next();
            })
            .on('error', (err) => {
                console.error('Gzip decompression error:', err);
                res.status(400).send('Invalid gzip encoding');
            });

    } else {
        console.log("No compression detected, proceeding to next middleware");
        next(); // Proceed to the next middleware or route handler
    }
}

module.exports = compressionMiddleware;
