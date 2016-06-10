# Wordpress Website theme Starter Kit

webpack + babel + sass + browserSync  + wordpress

# set up and Installation for development

run  ```npm install``` to set up dependencies

We are using browserSync to sync changes made in the code with the browser

To have this working we start up a browserSync server which proxies requests to the wordpress virtual host

set up a virtual host for the wordpress site as below and then add the new domain to your hosts file.

apache2 VirtualHost file
```
<VirtualHost *:80>
    ServerAdmin admin@website.org
    DocumentRoot "/Users/user/apps/www/html/wordpress-webpack-browsersync/wp"
    ServerName example.dev
    ErrorLog "/private/var/log/apache2/example.dev-error_log"
    CustomLog "/private/var/log/apache2/example.dev-com-access_log" common
</VirtualHost>

```
hosts file commonly found in /etc/hosts
```
127.0.0.1       localhost
127.0.0.1       example.dev
```

run ``` npm start ``` for the browserSync dev server to run

all requests to the dev server eg ```localhost:3000/about``` will be

proxied to the virtual host ```example.dev/about```

# set up and Installation for production

run  ```npm install``` to set up dependencies

run ```npm run build ``` to build JS and css bundles

# why Webpack

- allows us to use ES6 Javascript which we can compile to ES5
- Can do all the other tasks we would have gotten from grunt or gulp such as compressing files (uglifying)
- Can create multiple JS bundles that we can use where needed instead of outputting everything in one bundle
- Can do tree shaking hence eliminating dead code
- Works well with browserSync for live reloading hence no need to manually refresh a page on updating code during development

# Disclaimer

 I borrowed some ideas from this [starter kit](https://github.com/bionikspoon/webpack-hmr-wordpress)
