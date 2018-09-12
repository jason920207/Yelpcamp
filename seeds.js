var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment")

var data=[
    {name:"Vaporeon",
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/134.png',
    description:"Vaporeon underwent a spontaneous mutation and grew fins and gills that allow it to live underwater. This Pokémon has the ability to freely control water."
    },
    {name:"Jolteon",
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/135.png',
    description:"Jolteon's cells generate a low level of electricity. This power is amplified by the static electricity of its fur, enabling the Pokémon to drop thunderbolts. The bristling fur is made of electrically charged needles."
    },
    {name:"Flareon",
    image:'https://assets.pokemon.com/assets/cms2/img/pokedex/full/136.png',
    description:"Flareon's fluffy fur has a functional purpose—it releases heat into the air so that its body does not get excessively hot. This Pokémon's body temperature can rise to a maximum of 1,650 degrees Fahrenheit."
    },
    ]
//Remove all campground
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log("err")
        }
    console.log("removed campgrounds")
    })
    data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log(err)
            }
            else{
                console.log("add compground")
                Comment.create({
                    text:"This place is great but i",
                    author:"Homer"
                },function(err,comment){
                    if(err){
                        console.log(err)
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("created new campground")
                    }

                    
                })
            }
        })
    })

}


module.exports=seedDB;