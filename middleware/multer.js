const multer = require('multer')
const path = require('path')



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'upload/')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()
        cb(null,Date.now()+path.extname(file.originalname))
    }
})


const fileFilter = (req,file,cb)=>{
    const alloewdTypes = ['image/png','image/jpeg','image/jpg']

    if(alloewdTypes.includes(file.mimetype)){
        cb(null,true)
    }else{
        cb(new Error("This type of file is not allowed"),false)
    }
}


const upload = multer({storage,fileFilter})

module.exports = upload 