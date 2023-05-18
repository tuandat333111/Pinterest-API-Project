const jwt = require('jsonwebtoken');
const { successCode } = require('./response');

// tạo token
const generateToken = (data) => {

    // data: string, number, object, buffer => ko có tham số thứ 3, nếu có thì ko dc truyền string

    let token = jwt.sign(data, "pinterest-api", { algorithm: "HS256", expiresIn: "30m" });

    return token;
}

// kiểm tra token
const checkToken = (token) => {
    let data = jwt.verify(token, "pinterest-api");
    return data;
}

// giải mã token
const decodeToken = (token) => {
    return jwt.decode(token);
}

const privateAPI = (req, res, next) => {

    let { refreshToken } = req.params;
    let { token } = req.headers;
    try {
        // kiểm tra token        
        checkToken(token);
        next();
    } 
    catch (err) {

        if (err.name == "TokenExpiredError" && refreshToken == true) {
            let decoded=checkToken(accessToken);
            if(decoded){
                const {email,pass_word,full_name,age}=decoded;
                const newdata={email,pass_word,full_name,age}
                const newToken=jwt.sign(newdata, "pinterest-api", { algorithm: "HS256", expiresIn: "30m" });
                successCode(res,"Token is renewed", newToken);
            }            
        } 
        else {
            res.status(401).send(err.message);
        }
    }

}

module.exports = {
    generateToken,
    checkToken,
    decodeToken,
    privateAPI
}