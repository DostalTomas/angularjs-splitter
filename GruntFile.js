module.exports = (grunt) => {
    const pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        'extract-comments': {
            'docs/comments.js': ['src/**/*.ts']
        },
        copy: {
            files: {
                expand: true,
                cwd: 'dist',
                src: ['angularjs-splitter.js', 'angularjs-splitter.css'],
                dest: 'docs'
            }
        },
        watch: {
            files: ['src/**/*.ts', 'src/**/*.ngdoc'],
            tasks: ['docs:build'],
            options: {
                atBegin: true,
                interrupt: true
            }
        },
        'dgeni-alive': {
            options: {
                packages: [
                    'dgeni-packages/jsdoc',
                    'dgeni-packages/ngdoc',
                    'dgeni-packages/links',
                    'dgeni-packages/examples',
                    './packages/jsdoc-ext',
                    './packages/ngdoc-ext',
                    './packages/links-ext',
                    './packages/examples-ext'
                ],
                deployments: [{
                    name: 'default',
                    examples: {
                        commonFiles: {
                            scripts: [
                                'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.7/angular.js',
                                'https://unpkg.com/@kpsys/angularjs-register@1.1.4/dist/register.js',
	                            `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-splitter.js`
                            ],
                            stylesheets: [
                                `${process.env.EXAMPLES_SCRIPTS_URL_PREFIX || ''}/angularjs-splitter.css`
                            ]
                        }
                    }
                }],
                deploymentTarget: 'default'
            },
            api: {
                title: 'AngularJS Splitter Doc',
                version: pkg.version,
                expand: false,
                dest: 'docs',
                src: [
                    'docs/comments.js',
                    'src/**/*.ngdoc'
                ]
            }
        },
        dtsGenerator: {
            options: {
                project: '.',
                out: 'dist/angularjs-splitter.d.ts',
                exclude: ['node_modules/**/*.*', 'demo/**/*.*']
            },
            default: {
                src: [ 'src/angularjs-splitter/**/*.ts' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-extract-comments');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('dgeni-alive');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('dts-generator');

    grunt.registerTask('docs:build', ['extract-comments', 'copy', 'dgeni-alive']);
    grunt.registerTask('docs:watch', ['watch']);
};
