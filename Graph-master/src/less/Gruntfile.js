module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			style: {
				files: ['src/style/**/*.less'],
				tasks: ['less:style']
		    },
			jstree: {
				files: ['src/jstree/**/*.less'],
				tasks: ['less:jstree']
			},
			user: {
				files: ['src/user/**/*.less'],
				tasks: ['less:user']
			},
			portal: {
				files: ['src/portal/**/*.less'],
				tasks: ['less:portal']
			},
			tree: {
				files: ['src/tree/**/*.less'],
				tasks: ['less:tree']
			}
		},

		less: {
			style: {
				files: {
					"<%= pkg.basepath %>css/style.css": "src/style/main.less"
				}
			},
			jstree: {
				files: {
					"<%= pkg.basepath %>plugins/jstree/themes/custom/style.css": "src/jstree/style.less"
				}
			},
			user: {
				files: {
					"<%= pkg.basepath %>css/view/user.css": "src/user/main.less"
				}
			},
			portal: {
				files: {
					"<%= pkg.basepath %>css/view/portal.css": "src/portal/main.less"
				}
			},
			tree: {
				files: {
					"<%= pkg.basepath %>css/view/tree.css": "src/tree/main.less"
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask('default', ['concat']);
};
