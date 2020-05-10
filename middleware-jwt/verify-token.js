const jwt = require("jsonwebtoken");

module.exports = (req,res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || this.req.query.token;

    if(token){
        jwt.verify(token,req.app.get('api_secret_key'),(err,decoded)=>{
            if(err){
                res.json({
                    status:false,
                    message:"Wrong token is provided"
                });
            }else{
                req.decode = decoded,
                next();
            }

        });

    }else {
        this.res.json({
            status: false ,
            message: 'Token is not provided'
        })
    }
}

