let multer = require('multer');

let avatarStorage = multer.diskStorage({
    destination: process.cwd() + "/public/Images",
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${req.params.user_id}_avatar.${ext}`);
       
    }
})
let imageStorage=multer.diskStorage({
    destination: process.cwd() + "/public/Images",
    filename: (req, file, callback) => {   
        const ext = file.mimetype.split('/')[1];
        callback(null, `${req.params.user_id}_${Date.now()}_${file.originalname}.${ext}`);   
    }
})
let uploadAvatar = multer({
    storage:avatarStorage,
    limits:{
        fileSize:5000000
    }
});
let uploadImage=multer({
    storage:imageStorage,
    limits:{
        fileSize:5000000
    }
})
module.exports = {
    uploadImage,
    uploadAvatar
};
