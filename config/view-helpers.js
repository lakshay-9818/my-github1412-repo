const env= require('./environment');
const fs= require('fs');    
const path =require('path');


module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if(env.name== 'development')return filePath;

        let x= '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];
        console.log('path is ***********'+ x);
        return x;
    }
}


