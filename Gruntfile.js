module.exports = function(grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON("package.json"),
		uglify:
		{
			options:
			{
				"report": "gzip"
			},
			my_target:
			{
				files:
				{
					"src/js/brains.min.js": ["js/brains.js"]
				}
			}
		},
		imagemin:
		{
			dynamic:
			{
				options:
				{
					optimizationLevel: 7,
					
				},
				files:
				[{
					expand: true,
					cwd: "images/",
					src: ["**/*.{png,jpg,gif}"],
					dest: "src/images/"
				}]
			}
		},
		svgmin:
		{
			options:
			{
				plugins:
				[{
					removeViewBox: true,
					removeUselessStrokeAndFill: true,
					removeEmptyAttrs: true
				}]
			},
			dist:
			{
				files:
				[{
					expand: true,
					cwd: "images/",
					src: ["**/*.svg"],
					dest: "src/images/"
				}]
			}
		},
		sass: 
		{
			dist: 
			{
				options: 
				{
					includePaths: ['node_modules/node-bourbon/assets/stylesheets/'],
					outputStyle: 'compressed'
				},
				files: 
				{
					'src/css/mm.css': 'sass/mm.scss'
				}
			}
		},
		copy:
		{
			main:
			{
				files:
				[
					{expand: true, src:["fonts/*"], dest: "src/"},
					{src: ["index.html"], dest: "src/"},
					{src:["js/jquery.min.js"], dest: "src/"}
				]
			}
		},
		htmlhint:
		{
			html1:
			{
				options:
				{
					"tag-pair": true
				},
				src: ["index.html"]
			}
		}
	});	
	
	grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-svgmin");
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.registerTask("default", ["svgmin","uglify","imagemin","sass","htmlhint","copy"]);

};