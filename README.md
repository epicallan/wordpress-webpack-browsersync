# DI Wordpress Website

webpack + browserSync  + php (wordpress)

# set up and Installation for development

run  ```npm install``` to set up dependencies

We are using browserSync to sync changes made in the code with the browser

To have this working we start up a browserSync server which proxies requests to a virtual host

set up a virtual host for your wordpress site as below and then add the new domain to your hosts file.

apache2 VirtualHost file
```
<VirtualHost *:80>
    ServerAdmin admin@website.org
    DocumentRoot "/Users/user/apps/www/html/devinit/wp"
    ServerName devinit.dev
    ErrorLog "/private/var/log/apache2/deinit.dev-error_log"
    CustomLog "/private/var/log/apache2/devinit.dev-com-access_log" common
</VirtualHost>

```
hosts file commonly found in /etc/hosts
```
127.0.0.1       localhost
127.0.0.1       devinit.dev
```

run ``` npm start ``` for the browserSync dev server to run

all requests to the dev server eg ```localhost:3000/about``` will be

proxied to the virtual host ```devinit.dev/about```

# set up and Installation for production

run  ```npm install``` to set up dependencies

run ```npm run build ``` to build JS and css bundles

# why Webpack

- allows us to use ES6 Javascript which we can compile to ES5
- Can do all the other tasks we would have gotten from grunt or gulp such as compressing files (uglifying)
- Can output create multiple JS bundles that we can use where needed instead of outputting everything in one bundle
- Works well with browserSync for live reloading hence no need to manually refresh a page on updating code during development
