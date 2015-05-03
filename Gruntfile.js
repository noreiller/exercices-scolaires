function mountFolder (connect, dir) {
	return connect.static(require('path').resolve(dir));
}

module.exports = function(grunt) {

	// set Underscore as a shortcut
	var _ = grunt.util._;

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')

		, 'gh-pages': {
			options: {
				base: 'dist'
			}
			, src: ['**']
		}

		, jshint: {
			all: ['Gruntfile.js', 'src/js/*.js']
			, options: {
				laxbreak: true
				, laxcomma: true
				, smarttabs: true
			}
		}

		, clean: {
			dist: ['dist']
		}

		, copy: {
			data: {
				files: [
					{ expand: true, flatten: true, src: ['src/data/*'], dest: 'dist/data' }
				]
			}
			, tpl: {
				files: [
					{ expand: true, flatten: true, src: ['src/tpl/*'], dest: 'dist/tpl' }
				]
			}
			, js: {
				files: [
					{ expand: true, flatten: true, src: ['src/js/*.js'], dest: 'dist/js' }
					, { expand: true, flatten: true, src: ['bower_components/requirejs/require.js'], dest: 'dist/js' }
				]
			}
		}

		, less: {
			styles: {
				options: {
					paths: ["src/less"]
					, yuicompress: true
				}
				, files: {
					"dist/css/styles.css": [
						"bower_components/bootstrap/dist/css/bootstrap.min.css"
						, "src/less/main.less"
					]
				}
			}
		}

		, requirejs: {
			app: {
				options: {
					baseUrl : "src/js"
					, mainConfigFile: "src/js/app.js"
					, out: "dist/js/app.js"
					, name: "app"
					, optimizeCss: "none"
					, fileExclusionRegExp: /^\./
					, optimize: 'uglify'
					, preserveLicenseComments: true
				}
			}
		}

		, html: {
			dist: {}
		}

		, watch: {
			js: {
				files: ['src/js/*.js']
				, tasks: ['jshint', 'copy:js', 'replace:dev']
				, options: {
					spawn: false
					, livereload: true
				}
			}
			, css: {
				files: ['src/less/*.less']
				, tasks: ['less']
				, options: {
					spawn: false
					, livereload: false
				}
			}
			, html: {
				files: ['src/data/**', 'src/*.html', 'src/partials/*.html']
				, tasks: ['html']
				, options: {
					spawn: false
					, livereload: true
				}
			}
			, data: {
				files: ['src/data/**', 'src/tpl/**']
				, tasks: ['copy:data', 'copy:tpl']
				, options: {
					spawn: false
					, livereload: true
				}
			}
		}

		, replace: {
			dev: {
				options: {
					usePrefix: false
					, variables: {
						'../../bower_components': '/bower_components'
					}
				}
				, files: [
					{expand: true, flatten: true, src: ['dist/js/app.js'], dest: 'dist/js/'}
				]
			}
		}

		, connect: {
			dev: {
				options: {
					port: 1337
					// change this to '0.0.0.0' to access the server from outside
					, hostname: 'localhost'
					, middleware: function (connect) {
						return [
							require('connect-livereload')()
							, mountFolder(connect, 'dist')
							// , mountFolder(connect, 'bower_components')
							, connect().use(
								'/bower_components',
								connect.static('./bower_components')
							)
						];
					}
				}
			}
		}
	});

	// Generating html pages
	grunt.registerMultiTask('html', 'Generating html pages', function () {
		var
			data = grunt.file.readJSON('src/data/data.json')
			, includes = {
				header: grunt.file.read('src/partials/header.html')
				, footer: grunt.file.read('src/partials/footer.html')
				, works: grunt.file.read('src/partials/works.html')
				, 'checkbox-checker': grunt.file.read('src/partials/checkbox-checker.html')
			}
			, options = { encoding : 'utf8' }
		;

		/**
		 * Process the HTML page for the work
		 * @param	{object} work Object including name, title and can include works
		 */
		function processWork(work) {
			var
				srcPath = 'src/' + work.name + '.html'
				, destPath = 'dist/' + work.name + '.html'
			;

			// if file does not exists, get the template
			if (!grunt.file.exists(srcPath)) {
				srcPath = 'src/partials/tpl-' + (work.works ? 'parent' : 'work') + '.html';
			}

			// copy the file
			grunt.file.copy(srcPath, destPath, options);

			// read the file
			grunt.log.writeln(('Reading "' + destPath + '".').green);
			var fileContent = grunt.file.read(destPath);

			// replace the includes
			_.each(includes, function (include, ind) {
				grunt.log.writeln('Replacing "' + ind + '" inclusion.');
				fileContent = fileContent.replace(new RegExp('@@include.' + ind, "g"), include);
			});

			// process the template
			var tpl = _.template(fileContent);
			fileContent = tpl({
				work: work
				, app: data.app
			});

			// write the file
			try {
				grunt.file.write(destPath, fileContent, options);
			}
			catch (e) {
				grunt.log.writeln(e.toString().red);
			}

			// process the sub works
			if (work.works) {
				_.each(work.works, function (subWork) {
					subWork.parent = _.omit(work, 'works');
					processWork(subWork);
				});
			}
		}

		// process the homepage
		processWork(data.app.index);

		// process the works
		_.each(data.app.works, function (work) {
			processWork(work);
		});
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-gh-pages');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('copy:assets', ['copy:data', 'copy:tpl', 'copy:js']);
	grunt.registerTask('build', ['jshint', 'clean', 'less', 'copy:assets', 'requirejs', 'html']);

	grunt.registerTask('dev', ['jshint', 'clean', 'less', 'copy:assets', 'html', 'replace:dev', 'connect:dev', 'watch']);

	grunt.registerTask('default', ['build']);

	grunt.registerTask('deploy', ['build', 'gh-pages']);
};
