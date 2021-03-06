const express = require('express');
const router = express.Router();

const { Post } = require("../models/Post");

const { auth } = require("../middleware/auth");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        console.log(ext);
        if (ext !== '.mp4' && ext !== '.mov' && ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
            cb(res.status(400).end('only video and pic are allowed'), false);
        }
        cb(null, true);
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Post
//=================================


router.post('/uploadFile', (req, res) => {
    //클라이언트에서 업로드한 파일 저장
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        else {
            return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
        }
    })
});


router.post('/uploadPost', (req, res) => {
    //클라이언트에서 업로드한 게시물 저장
    const post = new Post(req.body);
    post.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    });

});


router.get('/getPost', (req, res) => {
    //DB에서 게시물 정보 가져옴

    Post.find()
        .populate('writer')
        .sort([['updatedAt', -1]])
        .exec((err, posts) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, posts })
        })
});

router.post('/getPostDetail', (req, res) => {
    //DB에서 게시물 정보 가져옴
    Post.findOne({ "_id": req.body.postId })
        .populate('writer')
        .sort([['updatedAt', -1]])
        .exec((err,postDetail)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, postDetail})
        })
});

module.exports = router;