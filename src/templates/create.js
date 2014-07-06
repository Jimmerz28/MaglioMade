function createFile(singlePage, dir)
{    
    var options = { pretty: true, page: singlePage };
    
    jade.renderFile("src/templates/project_page.jade", options, function(err, html)
    {
        if ( err )
        {
            console.log(err);
        }
        
        var filename = (singlePage.title).toLowerCase();
        filename = filename.replace(/ /g,"_");
        
        if ( !fs.existsSync(dir) )
        {
            fs.mkdirSync(dir);
        }
        
        fs.writeFile( dir + "/" + filename + ".html", html);
    });
}

var jade = require("jade");
var fs = require("fs");
var dir = "dist/projects";
var projects = fs.readFileSync("src/templates/config.json", "utf-8");
projects = JSON.parse(projects);

(projects.pages).forEach(function(singlePage)
{
    createFile(singlePage, dir);
});