const jwt = require('jsonwebtoken')
blacklistedTokens = require('./blacklist');

module.exports = {
    local: (req, res, next) =>{

        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        console.log(token)

        if (!token) return res.status(401).json({ msg: "Acesso negado!" });

        if (blacklistedTokens.includes(token)) {
            return res.status(401).send('Token JWT inválido');
        }
        
        try {
        const secret = process.env.SECRET;

        const decoded = jwt.verify(token, secret);

        if (decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({ msg: 'Token expirado. Faça login novamente.' });
            
        }
      
        req.user = decoded;
        next();

        } catch (err) {
            res.status(401).json({ msg: "O Token foi expirado ou esta invalido!", redirect: '/login' });
        }
    }
}


