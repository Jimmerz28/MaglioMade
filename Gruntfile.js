module.exports = function(grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON("package.json"),
		validation: 
		{ 
			// Grunt w3c validation plugin
			options: 
			{
				reset: grunt.option('reset') || false,
				stoponerror:false,
				relaxerror: ["Bad value X-UA-Compatible for attribute http-equiv on element meta.","Element title must not be empty."]
			},
			files: 
			{
				src: ["index.html"]
			}
		}
	});	
	
	grunt.loadNpmTasks("grunt-html-validation");
	
	grunt.registerTask("default", ["validation"]);
};