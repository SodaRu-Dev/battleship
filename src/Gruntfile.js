module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        sass: {
            dist: {
                options: {
                sourcemap: false,
                compress: false,
                yuicompress: false,
                style: 'expanded',
            },
            files: {
                "../dist/styles/styles.css" : ["./styles/**/*.scss"]
            }
        }
    },
        watch: {
            scripts: {
                files: [
                    "./scripts/**/*.js",
                    "./index.html",
					//"./styles/**/*.scss",
					//"./img/*",
                    "!node_modules/**/*.js"
                ],
                tasks: ["browserify", "uglify", "copy"],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: "./styles/**/*.scss",
                tasks: ['sass']
            }
        },
        browserify: {
		    options: {
			    browserifyOptions: {
	    			debug: true,
    				paths: ["./scripts"],
	    		}
	    	},
	    	dist: {
		    	files: {
                    "../dist/scripts/bundle.js": ["scripts/**/*.js"],
                }
            }
        },
	uglify: {
		options:{
			banner: "/* <%= pkg.name %> <%= grunt.template.today(`yyyy-mm-dd`) %> */"
		},
		build:{
			files: [{
				expand: true,
				cwd: "../dist",
				src: "bundle.js",
				dest: "../dist",
				ext: ".min.js"
			}]
		}
	},
        copy: {
            main: {
                files: [
                    // includes files within path
                    { expand: true, src: ["index.html"], dest: "../dist/", filter: "isFile" }//,
					//{ expand: true, src: ["styles/*.css"], dest: "../dist/", filter: "isFile"},
					//{ expand: true, src: ["img/*"], dest: "../dist/", filter: "isFile"}
                ]
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-copy");
    // Default task(s).
    grunt.registerTask("default", ["browserify", "copy", "sass", "watch"]);
};