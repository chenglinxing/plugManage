(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d9d2588"],{"0418":function(s,e,a){"use strict";a.r(e);var t=function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("div",{staticClass:"header-index"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!s.isCollapse,expression:"!isCollapse"}],staticClass:"left",class:{"left-no-collapse":!s.isCollapse}},[a("img",{attrs:{src:s.logoImg,alt:""}}),a("span",[s._v("前端生态")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:s.isCollapse,expression:"isCollapse"}],staticClass:"left",class:{"left-collapse":s.isCollapse}},[a("img",{attrs:{src:s.logoImg,alt:""}})]),a("div",{staticClass:"center",class:{"center-no-collapse":!s.isCollapse,"center-collapse":s.isCollapse}},[a("div",{staticClass:"collapse"},[a("i",{class:{"el-icon-s-unfold":s.isCollapse,"el-icon-s-fold":!s.isCollapse},attrs:{type:"text"},on:{click:s.handleCollapse}})]),a("div",{staticClass:"breadcrumb"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",{attrs:{to:{path:"/home"}}},[s._v("首页")]),a("el-breadcrumb-item",[s._v(s._s(s.$route.meta.title))])],1)],1)]),a("div",{staticClass:"right"},[a("div",{staticClass:"right-operate"},[a("i",{staticClass:"el-icon-s-operation"}),a("i",{staticClass:"el-icon-picture-outline-round",on:{click:s.jumpOffWebsite}})]),a("div",{staticClass:"out-login"},[a("el-avatar",{attrs:{icon:"el-icon-user-solid"}}),a("el-dropdown",{on:{command:s.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[s._v(" "+s._s(s.userName)),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"out"}},[s._v("退出登录")])],1)],1)],1)])])},l=[],o={data:function(){return{isCollapse:!1,userName:localStorage.getItem("userName"),logoImg:a("9a2c")}},methods:{handleCollapse:function(){this.isCollapse=!this.isCollapse,this.$bus.$emit("isCollapse",this.isCollapse)},handleCommand:function(s){var e="out"==s;e&&(this.$router.push("/login"),localStorage.removeItem("userName"))},jumpOffWebsite:function(){this.$router.push("/offWebsite")}}},i=o,n=(a("682a"),a("2877")),r=Object(n["a"])(i,t,l,!1,null,"2a35fcf7",null);e["default"]=r.exports},"682a":function(s,e,a){"use strict";a("88ab")},"88ab":function(s,e,a){},"9a2c":function(s,e,a){s.exports=a.p+"img/logo6.433ff782.png"}}]);
//# sourceMappingURL=chunk-5d9d2588.08436f36.js.map