var express = require("express");
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");
var fs = require("fs");
var dotenv = require("dotenv");

dotenv.config();
router.get("/display_all_category", function (req, res, next) {
  pool.query("select * from category", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: "Server Error" });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.post("/fetch_all_subcategory_by_category", function (req, res, next) {
  pool.query(
    "select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname from subcategory S where S.categoryid=?",
    [req.body.categoryid],
    function (error, result) {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ status: false, message: "Server Error", result: [] });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.get("/display_all_cities", function (req, res, next) {
  pool.query("select * from cities", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: "Server Error" });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.get("/all_feature", function (req, res, next) {
  pool.query("select * from featured", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: "Server Error" });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
});
router.get("/get_offers", function (req, res, next) {
  pool.query("select * from offers", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: "Server Error" });
    } else {
      console.log("resulttttt:", result);
      res.status(200).json({ status: true, data: result });
    }
  });
});

router.get("/get_why", function (req, res, next) {
  pool.query("select * from whypnp", function (error, result) {
    if (error) {
      res.status(500).json({ status: false, message: "Server Error" });
    } else {
      console.log("resulttttt:", result);
      res.status(200).json({ status: true, data: result });
    }
  });
});
router.get("/display_all_vehicle", function (req, res, next) {
  pool.query(
    "select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CM.companyname from company CM where CM.companyid=V.companyid) as companyname,(select M.modelname from model M where M.modelid=V.modelid) as modelname  from vehicle V",
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: "Server Error" });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.get("/display_all_company", function (req, res, next) {
  pool.query(
    "select Cmp.*,(select categoryname from category C where C.categoryid=Cmp.categoryid)as categoryname,(select subcategoryname from subcategory SC where SC.subcategoryid=Cmp.subcategoryid )as subcategoryname from company Cmp",
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: "Server Error" });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});

router.post("/display_all_vehicle_seraching", function (req, res, next) {
  pool.query(
    "select V.*,(select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname, (select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,(select CM.companyname from company CM where CM.companyid=V.companyid) as companyname,(select M.modelname from model M where M.modelid=V.modelid) as modelname  from vehicle V where V.companyid in(select C.companyid  from company C where C.companyid in(?))",
    [req.body.companyid],
    function (error, result) {
      if (error) {
        res.status(500).json({ status: false, message: "Server Error" });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
});


router.post("/check_user_mobileno", function (req, res, next) {
   pool.query(
     "select * from userdetails where mobileno=?",
     [req.body.mobileno],
     function (error, result) {
       if (error) {
         res.status(500).json({ status: false, message: "Server Error" });
       } else {
         if(result.length==1)
         {
         res.status(200).json({ status: true, data: result[0] });
         }
         else
         {
            res.status(200).json({ status: false, data:[] });
         }
       }
     }
   );
 });
 


router.post("/submituserdetails", function (req, res, next) {
  pool.query(
    "insert into userdetails(mobileno,emailid,fullname,birthdate,aadharno,licenseno) values(?,?,?,?,?,?)",
    [
      req.body.mobileno,
      req.body.emailid,
      req.body.fullname,
      req.body.birtdate,
      req.body.aadharno,
      req.body.licenseno

    ],
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Server Error" });
      } else {
        res
          .status(200)
          .json({
            status: true,
            message: "SubCategory Submitted Successfully",
          });
      }
    }
  );
});

module.exports = router;
