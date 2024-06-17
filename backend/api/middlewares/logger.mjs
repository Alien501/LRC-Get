const logger = (req, res, next) => {
    console.log(`Log: ${req.method}: ${req.url}`);
    next();
}

export {
    logger
}