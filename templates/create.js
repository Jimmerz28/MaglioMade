function createFile(singlePage, dir)
{    
    var options = { pretty: true, page: singlePage };
    
    jade.renderFile("templates/project_page.jade", options, function(err, html)
    {
        if ( err )
        {
            console.log(err);
        }
        
        var filename = (singlePage.title).toLowerCase();
        filename = filename.replace(/ /g,"_");
        
        fs.writeFile( dir + "/" + filename + ".html", html);
    });
}

var jade = require("jade");
var fs = require("fs");
var dir = "src/projects";
var projects = fs.readFileSync("templates/config.json", "utf-8");
projects = JSON.parse(projects);

(projects.pages).forEach(function(singlePage)
{
    createFile(singlePage, dir);
});