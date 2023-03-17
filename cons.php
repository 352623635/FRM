# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
worker_connections 52100;
}

http {
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
'$status $body_bytes_sent "$http_referer" '
'"$http_user_agent" "$http_x_forwarded_for"';

access_log  /var/log/nginx/access.log  main;

sendfile            on;
tcp_nopush          on;
tcp_nodelay         on;
keepalive_timeout   65;
types_hash_max_size 2048;

include             /etc/nginx/mime.types;
default_type        application/octet-stream;

# Load modular configuration files from the /etc/nginx/conf.d directory.
# See http://nginx.org/en/docs/ngx_core_module.html#include
# for more information.
include /etc/nginx/conf.d/*.conf;

server {
listen       80 default_server;
server_name  www.biostudio.cn;
#        root         /www/meta/dist;

# Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;

location / {
root         /www/meta/dist;
index index.php index.html index.htm;

}

location /api {
rewrite ^.+api/?(.*)$ /$1 break;
proxy_pass http://localhost:3001;

proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

}


server {
listen       8080;
root         /www/iip_test/dist;
server_name 8.130.10.7;
# Load configuration files for the default server block.
include /etc/nginx/default.d/*.conf;

location / {
index index.php index.html index.htm;
try_files $uri $uri/ /index.html;
}

location /api {
rewrite ^.+api/?(.*)$ /rest/v1/$1 break;
proxy_pass http://localhost:8000;

proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
add_header Access-Control-Allow-Origin * always;
add_header Access-Control-Allow-Headers *;
add_header Access-Control-Allow-Methods *;
}


}

server {
listen       8001;
root         /www/iip/vue/dist;
server_name 8.130.10.7;
# Load configuration files for the default server block.
include /etc/nginx/default.d/*.conf;

location / {
index index.php index.html index.htm;
try_files $uri $uri/ /index.html;
}

location /api {
rewrite ^.+api/?(.*)$ /rest/v1/$1 break;
proxy_pass http://localhost:8000;

proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
add_header Access-Control-Allow-Origin * always;
add_header Access-Control-Allow-Headers *;
add_header Access-Control-Allow-Methods *;
}


}

server {
listen 8000;
server_name  8.130.10.7;
set        $root    /www/iip/tp/src/BAP/public;
root    $root;
index    index.html index.php;
location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
root $root;
}

location / {
#         }
if ( !-e $request_filename) {
rewrite ^(.*)$ /index.php?s=/$1 last;
break;
}
}

location ~\.php$ {

#         }
fastcgi_pass    127.0.0.1:9000;

fastcgi_index    index.php;
#         fastcgi_param    PATH_INFO    $path_info;
fastcgi_param    SCRIPT_FILENAME    $document_root$fastcgi_script_name;
#        fastcgi_param    SCRIPT_NAME    $script;
include        fastcgi_params;
}


}


server {
listen       8002;
root         /www/word/dist;
server_name 8.130.10.7;
# Load configuration files for the default server block.
include /etc/nginx/default.d/*.conf;

location / {
index index.php index.html index.htm;
try_files $uri $uri/ /index.html;
}

location /api {


rewrite ^.+api/?(.*)$ /$1 break;
proxy_pass http://localhost:8003;

proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
add_header Access-Control-Allow-Origin * always;
add_header Access-Control-Allow-Headers *;
add_header Access-Control-Allow-Methods *;
}

}


server {
listen 8003;
server_name  8.130.10.7;
set        $root    /www/word/word_api/public;
root    $root;
index    index.html index.php;
location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
root $root;
}

location / {
#         }
if ( !-e $request_filename) {
rewrite ^(.*)$ /index.php?s=/$1 last;
break;
}
}

location ~\.php$ {

#         }
fastcgi_pass    127.0.0.1:9000;

fastcgi_index    index.php;
#         fastcgi_param    PATH_INFO    $path_info;
fastcgi_param    SCRIPT_FILENAME    $document_root$fastcgi_script_name;
#        fastcgi_param    SCRIPT_NAME    $script;
include        fastcgi_params;
}


server {
listen       8004;
root         /www/frm/vue/dist;
server_name 8.130.10.7;
# Load configuration files for the default server block.
include /etc/nginx/default.d/*.conf;

location / {
index index.php index.html index.htm;
try_files $uri $uri/ /index.html;
}

location /api {


rewrite ^.+api/?(.*)$ /$1 break;
proxy_pass http://localhost:8005;

proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
add_header Access-Control-Allow-Origin * always;
add_header Access-Control-Allow-Headers *;
add_header Access-Control-Allow-Methods *;
}

}


server {
listen 8005;
server_name  8.130.10.7;
set        $root    /www/frm/meta_tp5.1/public;
root    $root;
index    index.html index.php;
location ~ .*\.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$ {
root $root;
}

location / {
#         }
if ( !-e $request_filename) {
rewrite ^(.*)$ /index.php?s=/$1 last;
break;
}
}

location ~\.php$ {

#         }
fastcgi_pass    127.0.0.1:9000;

fastcgi_index    index.php;
#         fastcgi_param    PATH_INFO    $path_info;
fastcgi_param    SCRIPT_FILENAME    $document_root$fastcgi_script_name;
#        fastcgi_param    SCRIPT_NAME    $script;
include        fastcgi_params;
}


}


# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2 default_server;
#        listen       [::]:443 ssl http2 default_server;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        location / {
#        }
#
#        error_page 404 /404.html;
#            location = /40x.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#            location = /50x.html {
#        }
#    }

}

