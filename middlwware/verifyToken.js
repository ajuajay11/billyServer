const verfiyToken = (req, res, next) => {
     const token =req.headers['authorization'];
        if(!token){
            return res.status(401).json({ message: 'No token provided' });
        }
        next();
}
module.exports = verfiyToken;