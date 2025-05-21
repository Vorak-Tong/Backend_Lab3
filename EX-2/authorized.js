const authorized = (expectedToken = 'xyz123') => (req, res, next) => {
    const { token } = req.query;

    if(!token || token !== expectedToken) {
        return res.status(401).send('Unauthorized: Invalid token');
    }

    next();
} 

export default authorized;