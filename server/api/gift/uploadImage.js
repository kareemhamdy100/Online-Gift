const multer = require('multer');

// const storage = multer.diskStorage(
//     {
//         destination: (req, file, cb)=>{
//             cb(null, 'public/images');
//         },
//         filename:(req, file, cb)=>{
//             cb(null, file.originalname);
//         }
//     });


const imageFileFilter = (req, file, cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('you can\'t upload only image files'), false);
    }
    cb(null, true);
}


module.exports = multer({
    fileFilter: imageFileFilter,
limits:{
    fileSize: 2000000
}});

