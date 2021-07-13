#### 后台管理系统，主要目的用于自己搭建简单的模板放在项目中使用

#### 前端使用的技术栈主要是 vue 全家桶（vue-cli、vue-router、vuex、axios）、ElementUI，包括一些常用的 vue 生态的插件，例如 lodash；后端主要是 nodejs（用的 express 框架），数据库是 mysql

#### 如果要启动前后端的项目，则需要下载前后端的项目
    下载后端    git clone -b plugBack https://github.com/chenglinxing/plugManage.git
    下载前端    git clone -b plugFront https://github.com/chenglinxing/plugManage.git
    下载数据库就在master主分支下面

#### 注意事项：下载完前后端的项目 首先npm i,  
               前端启动项目命令：npm run serve 
               后端启动项目命令 nodemon start
               前端默认的端口是8080，如果接口未调通，请检查/src/api/baseUrl.js的映射关系