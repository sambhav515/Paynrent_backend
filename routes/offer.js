var express = require('express');
var router = express.Router();
var pool = require('./pool');
var upload =require('./multer');
var fs    = require('fs');

router.post('/offersubmit',upload.any(), function(req, res, next) {
    pool.query("insert into offers(title,description,image) values(?,?,?)",
    [req.body.title,req.body.description,req.files[0].filename],
    function(error,result){
    if(error)
    {  console.log(error)
        res.status(500).json({status:false,message:'server Error'})
    }
    else
    {
        res.status(200).json({status:true,message:'offer Submitted'})
    }
    
    })
    });

    router.get('/display_all_offer',function(req,res,next){
        pool.query("select * from offers",function(error,result){
        if(error)
        {
            res.status(500).json({status:false,message:'Server Error'})
        }
        else
        {console.log('resulttttt:',result)
            res.status(200).json({status:true, data:result})
        }
        })
        
        })

        router.post('/edit_picture',upload.any(), function(req, res, next) {
            pool.query("update  offers set image=? where offerid=?",
            [req.files[0].filename,req.body.offerid],
            function(error,result){
            if(error)
            {
                res.status(500).json({status:false,message:'server Error'})
            }
            else
            { 
                 fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
                res.status(200).json({status:true,message:'Icon updated  Successfully'})
            }
            
            })
            });
        
            router.post('/edit_data', function(req, res, next) {
                pool.query("update offers set title=?,description=? where offerid=?",
                [req.body.title,req.body.description,req.body.offerid],
                function(error,result){
                if(error)
                {
                    res.status(500).json({status:false,message:'server Error'})
                }
                else
                {
                    res.status(200).json({status:true,message:'Offer updated  Successfully'})
                }
                
                })
                });
        
                router.post('/delete_data',upload.any(), function(req, res, next) {
                    pool.query("delete from offers where offerid=?",
                    [req.body.offerid],
                    function(error,result){
                    if(error)
                    {
                        res.status(500).json({status:false,message:'server Error'})
                    }
                    else
                    { 
                 fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
                        res.status(200).json({status:true,message:'Offer Deleted  Successfully'})
                    }
                   
        
                    })
                    });
           
   
            module.exports = router;