module.exports = (req,res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        res.json({error : true, message : "Forbidden"});
    }
}