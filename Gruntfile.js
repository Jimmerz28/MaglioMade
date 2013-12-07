module.exports = function(grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON("package.json"),
		aws: grunt.file.readJSON("grunt-aws.json"),
		uglify:
		{
			dist:
			{
				options:
				{
					"report": "gzip",
					mangle:
					{
						except: ["jQuery"]
					},
					dead_code: false,
					quote_keys: true
					
				},
				files:
				{
					"src/js/brains.min.js": ["js/brains.js"]
				}
			},
			dev:
			{
				files:
				{
					"js/brains.min.js": ["js/brains.js"]
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
					includePaths: ["node_modules/node-bourbon/assets/stylesheets/"],
					outputStyle: "compressed"
				},
				files:
				{
					"src/css/mm.css": "sass/mm.scss"
				}
			},
			dev:
			{
				options:
				{
					includePaths: ["node_modules/node-bourbon/assets/stylesheets/"],
					outputStyle: "nested"
				},
				files:
				{
					"css/mm.css": "sass/mm.scss"
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
		},
		jshint:
		{
			options:
			{
				curly: true,
				eqeqeq: true,
				forin: true,
				indent: true,
				newcap: true,
				latedef: true,
				nonew: true,
				quotmark: "double",
				trailing: true,
				maxcomplexity: 4,
				globals:
				{
					jQuery: true
				}
			},
			brains:
			{
				files:
				{
					src: ["js/brains.js"]
				}
			},
			gruntfile:
			{
				files:
				{
					src: ["Gruntfile.js"]
				}
			}
		},
		s3:
		{
			options:
			{
				key: "<%= aws.key %>",
				secret: "<%= aws.secret %>",
				bucket: "<%= aws.bucket %>",
				access: "public-read",
				headers:
				{
					// 30 Day Cache Policy
					"Cache-Control": "max-age=2678400, public",
					"Expires": new Date(Date.now() + 2678400).toUTCString()
				}
			},
			prod:
			{
				upload:
				[
					{
						src: "src/css/*.css",
						dest: "css",
						options: { gzip: true }
					},
					{
						src: "src/js/*.js",
						dest: "js",
						options: { gzip: true }
					},
					{
						src: "images/*",
						dest: "images",
						options: { gzip: true, gzipExclude: [".jpg", ".png"] }
					},
					{
						src: "images/social/*",
						dest: "images/social",
						options: { gzip: true, gzipExclude: [".jpg", ".png"] }
					},
					{
						src: "images/work/*",
						dest: "images/work",
						options: { gzip: true, gzipExclude: [".jpg", ".png"] }
					},
					{
						src: "index.html",
						dest: ".",
						options: { gzip: true }
					},
					{
						src: "fonts/*",
						dest: "fonts",
						options: { gzip: true }
					}
					
				]
			}
		},
		phplint:
		{
			devs: ["*.php"]
		},
		watch:
		{
			options:
			{
				// Makes the task not take over a minute
				spawn: false,
				debounceDelay: 500,
			},
			scripts:
			{
				files: ["js/brains.js"],
				tasks: ["jshint:brains","uglify:dev"]
			},
			gruntfile:
			{
				files: ["Gruntfile.js"],
				tasks: ["jshint:gruntfile"]
			},
			css:
			{
				files: ["sass/mm.scss"],
				tasks: ["sass:dev"]
			},
			html:
			{
				files: ["index.html"],
				tasks: ["htmlhint"]
			},
			php:
			{
				files: ["*.php"],
				tasks: ["phplint:devs"]
			}
		}
	});
	
	grunt.loadNpmTasks("grunt-htmlhint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-svgmin");
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-s3");
	grunt.loadNpmTasks("grunt-phplint");
	
	grunt.registerTask("default", ["svgmin","uglify:dist","imagemin","sass:dist","htmlhint","jshint:brains","copy"]);
	grunt.registerTask("deploy", "s3:prod");

};