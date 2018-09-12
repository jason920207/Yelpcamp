var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport =require("passport");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override")
var Campground=require("./models/campground")
var Comment=require("./models/comment")
var User=require("./models/user")
var seedDB=require("./seeds")

var commentRoutes=require("./routes/comments");
var campgroundsRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index")



mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(__dirname+"/public"))
app.use(methodOverride("_method"));
seedDB();
// Campground.create({name:"aaa",image:"https://assets.pokemon.com/assets/cms2/img/pokedex/full/197.png",description:"aaa"},function(err,newlycreated){
//         if(err){
//             console.log(err);
//         }
//     })
//passport configuration

app.use(require("express-session")({
    secret:"once again",
    resave:false,
    saveUnitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
})
    







function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.use(indexRoutes);
app.use(campgroundsRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelpcamp server has started")
});