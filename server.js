const http = require("http");

const port = 3000;
const hostname = 'localhost';

const methods = {
    getWeather : function(date){
        conditions = ["Sunny", "Rainy", "Snowing", "Gloomy"];
        var parts = date.split('-');
        if(parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2){
            let x = Math.floor(Math.random() * 4)
            return conditions[x];
        }
    },
    useUmbrella : function(date){
        let flag = false;
        let condition = methods["getWeather"](date);
        if(condition === "Rainy"){
            flag = true;
        }
        return flag;
    }
}

const server = http.createServer(function(req,res){
    res.statusCode = 200;
    var parts = req.url.split('/'),
        method = methods[parts[1]],
        date = parts[2];

    if(typeof method === 'function'){
        let result = method(date);
        res.end(result.toString());
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// Methods: getWeather, useUmbrella
// date: YYYY/MM/DD
// api example http://localhost:3000/[method]/[YYYY-MM-DD]
// eg. http://localhost:3000/getWeather/2021-03-11
// sample result: "Gloomy"
