module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),	
		concat: {
  			options: {
            	banner: '/** \n' +
		        		' * -------------------------------------------------------------\n' +
		        		' * Copyright (c) 2013 <%= pkg.name %>, All rights reserved. \n' +
		        		' *  \n' +
		        		' * @version: <%= pkg.version%> \n' +
		        		' * @author: <%= pkg.author%> \n' +
		        		' * @description: <%= pkg.description%> \n' +
						' * @project: <%= pkg.name %> \n' +
						' * @date: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
		        		' * -------------------------------------------------------------\n' +
		        		' */ \n\n',
		        		//'(function(window, undefined){ \n\n' +
			           // '"use strict";\n\n',
		        footer: '\n\n' +
		        		//'window.graph.<%= pkg.name %> = <%= pkg.name %>;' +
		        		'\n\n'
		        		//'})( window );'
  			},
			dist: {
				src: ['dest/main.js', 'dest/**/*.js'],
				dest: 'D:/mmdb/huawei/apache-tomcat-7.0.54/webapps/mmdb2/graph/js/<%= pkg.name %>.js'
			}
		},

		watch: {
			coffee: {
				files: ['src/**/*.coffee'],
				tasks: ['coffee', 'concat']
		    }
		},

		uglify: {
            options : {
        		banner: '/** \n' +
                		' * -------------------------------------------------------------\n' +
                		' * Copyright (c) 2013 <%= pkg.name %>, All rights reserved. \n' +
                		' *  \n' +
						' * @fileOverview <%= pkg.description%> \n' +
                		' * @version: <%= pkg.version%> \n' +
                		' * @since: 2013-08-01 \n' +
                		' * @author: <%= pkg.author%> \n' +
                		' * @description: <%= pkg.description%> \n' +
						' * @project: <%= pkg.name %> \n' +
						' * @date: <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                		' * ------------------------------------------------------------- \n' +
                		' */ \n\n',

				footer: '/** \n' +
						' * @fileOverview <%= pkg.description%> \n' +
                		' * @version: <%= pkg.version%> \n' +
                		' * @since: 2013-08-01 \n' +
                		' * @author: <%= pkg.author%> \n' +
						' */ \n\n'
            },
    		build : {
        		src : 'core.js',
        		dest : 'core.min.js'
    		}
		},
		copy: {
			dist: {
				src : ['build/<%= pkg.name %>.js'],
				dest: 'D:/mmdb/huawei/apache-tomcat-7.0.54/webapps/mmdb2/graph/js/<%= pkg.name %>.js'
			},
			css: {
				src : ['<%= pkg.name %>.css'],
				dest: 'D:/mmdb/huawei/apache-tomcat-7.0.54/webapps/mmdb2/graph/css/<%= pkg.name %>.css'
			}
		},

		less: {
			development: {
				files: {
					"D:/mmdb/huawei/apache-tomcat-7.0.54/webapps/mmdb2/graph/css/<%= pkg.name %>.css": "Toolbar.less"
				}
			}
		},

		coffee: {
			glob_to_multiple: {
				expand: true,
				flatten: true,
				cwd: 'src/',
				src: ['*.coffee'],
				dest: 'dest/',
				ext: '.js'
			}
		},
		
		min: {
			dist: {
    			src: ['build/search.js'],
    			dest: 'build/search.min.js'
			}
		}

	});

	//grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-yui-compressor');
 
    grunt.registerTask('default', ['concat']);
	
};
