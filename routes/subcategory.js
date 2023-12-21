var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer');
var fs=require('fs')
var dotenv = require("dotenv");

dotenv.config();

const filepath = process.env.FILEPATH;
 
router.post('/fetch_all_subcategory_by_category',function(req,res,next){
   pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S where S.categoryid=?",[req.body.categoryid],function(error,result){
      if(error)
      { console.log(error)
         res.status(500).json({status:false,message:'Server Error',result:[]})
      }
      else
      {
 
         res.status(200).json({status:true,result:result})
      }
   })
})
/* GET users listing. */
router.post('/submitsubcategory',upload.any(),function(req, res, next) {
     console.log(req.files)
    pool.query("insert into subcategory(categoryid,subcategoryname,icon,priority) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.files[0].filename,req.body.priority],function(error,result){
     if(error)
     { console.log(error)
        res.status(500).json({status:false,message:'Server Error'})
     }
     else
     {

        res.status(200).json({status:true,message:'SubCategory Submitted Successfully'})
     }



    })
  
});

router.post('/edit_picture',upload.single('icon'),function(req, res, next) {
   console.log(req.file)
  pool.query("update subcategory set icon=? where subcategoryid=?",[req.file.filename,req.body.subcategoryid],function(error,result){
   if(error)
   { console.log(error)
      res.status(500).json({status:false,message:'Server Error'})
   }
   else
   {
      fs.unlinkSync(`${filepath}/${req.body.oldicon}`)
      res.status(200).json({status:true,message:'Icon Updated Successfully'})
   }
   


  })

});

router.post('/edit_data',upload.single('icon'),function(req, res, next) {
   console.log(req.file)
  pool.query("update subcategory set subcategoryname=? where subcategoryid=?",[req.body.subcategoryname,req.body.subcategoryid],function(error,result){
   if(error)
   { console.log(error)
      res.status(500).json({status:false,message:'Server Error'})
   }
   else
   {

      res.status(200).json({status:true,message:'SubCategory Updated Successfully'})
   }



  })

});

router.post('/delete_data',upload.single('icon'),function(req, res, next) {
   console.log(req.file)
  pool.query("delete from  subcategory where subcategoryid=?",[req.body.subcategoryid],function(error,result){
   if(error)
   { console.log(error)
      res.status(500).json({status:false,message:'Server Error'})
   }
   else
   {
      fs.unlinkSync(`${filepath}/images/${req.body.oldicon}`)
      res.status(200).json({status:true,message:'SubCategory Deleted Successfully'})
   }



  })

});

router.get('/display_all_subcategory',function(req, res, next) {
pool.query("select SC.*,(select categoryname from category C where C.categoryid=SC.categoryid) as cname from subcategory SC",function(error,result){

if(error)
{
   res.status(500).json({status:false,message:'Server Error'})
}
else
{
   res.status(200).json({status:true,data:result})
}

})
})





module.exports = router;
