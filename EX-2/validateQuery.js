const validateQuery = () => (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    if(minCredits && isNaN(parseInt(minCredits))) {
        return res.status(400).send('minCredits must be an integer');
    }

    if(maxCredits && isNaN(parseInt(maxCredits))) {
        return res.status(400).send('maxCredits must be an integer');
    }

    if(minCredits && maxCredits && parseInt(minCredits) > parseInt(maxCredits)) {
        return res.status(400).send('minCredits cannot be greater than maxCredits');
    }

    next();
};

export default validateQuery;