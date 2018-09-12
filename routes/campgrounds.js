var express=require("express");
var router=express.Router();
var Campground=require("../models/campground")
var Comment=require("../models/comment")



router.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds})
        }
    })
   
    
});


router.post("/campgrounds",isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var description=req.body.description
    var author ={
        id:req.user._id,
        username:req.user.username
    }
    var newcampground={name:name,
                        image:image,
                        description:description,
                        author:author
    };

    Campground.create(newcampground,function(err,newlycreated){
        if(err){
            console.log(err);
        }
        else{
            console.log(newlycreated)
            res.redirect('/campgrounds')
        }
    })
    

});

router.get("/campgrounds/new",isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err)
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});


router.get("/campgrounds/:id/edit",function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
           res.render("campgrounds/edit",{campground:foundCampground})
        }
    });
})

router.put("/campgrounds/:id",function(req,res){

   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatecampground){
       if(err){
           res.redirect("/campgrounds");
       }
       else{
           res.redirect("/campgrounds/"+req.params.id);
       }
   }) 
});


router.delete("/campgrounds/:id",function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    })
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;