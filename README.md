# grunt-switch-to-minified

> appends static files sha1 checksum as a get param for versioning

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-django-static-hash-append --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-switch-to-minified');
```

## The "switch_to_minified" task

### Overview
In your project's Gruntfile, add a section named `switch_to_minified` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  switch_to_minified: {
    django_app1: {
        files: [{
            expand: true,
            cwd: 'django_app/templates/django_app/', //path to your html files
            src: '*.html'
            sourceTypes: 'js|css',
            pathToReplace: 'non_min_folder',
            targetPath: 'minified_folder',
            exclude: []
        }]
    }
  }
});
```


### Usage Examples

```js
grunt.initConfig({
  django_static_hash_append: {
    main: {
      files: [{
          expand: true,
          cwd: 'main/templates/',
          src: '*.html',
          sourceTypes: 'js|css',
          pathToReplace: 'orig_',
          targetPath: '_',
          exclude: []
      }]
    },
    content: {
       files: [{
           expand: true,
           cwd: 'content/templates/content/',
           src: '*.html',
           sourceTypes: 'js|css',
           pathToReplace: 'orig_',
           targetPath: '_',
           exclude: []
       }]
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.1.0 
initial release
