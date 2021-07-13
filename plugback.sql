/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : plugback

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 13/07/2021 17:07:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fileinfo
-- ----------------------------
DROP TABLE IF EXISTS `fileinfo`;
CREATE TABLE `fileinfo`  (
  `fileId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件上传生成的二进制名称',
  `fileName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件名',
  `fileNewName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '新文件名 格式为 年月日时分秒_文件名',
  `fileType` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件类型',
  `filePath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `fileSize` double NOT NULL COMMENT '文件大小 以1字节为单位',
  PRIMARY KEY (`fileId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fileinfo
-- ----------------------------
INSERT INTO `fileinfo` VALUES ('03e08f2886aab09b4818e269bcd55b04', 'test.png', '20210702102207_test.png', 'png', 'public\\uploadFile\\03e08f2886aab09b4818e269bcd55b04', 25642);
INSERT INTO `fileinfo` VALUES ('12e7a6d3cba7e2a4c553c9834008cee0', '屏幕截图(4).png', '20210531134545_屏幕截图(4).png', 'png', 'public\\uploadFile\\12e7a6d3cba7e2a4c553c9834008cee0', 291586);
INSERT INTO `fileinfo` VALUES ('1e35f4b47cebeb1ba30b11acf8e0a794', 'desk2.jpg', '20210531143121_desk2.jpg', 'jpg', 'public\\uploadFile\\1e35f4b47cebeb1ba30b11acf8e0a794', 25220);
INSERT INTO `fileinfo` VALUES ('26eaf4e2c661fa8af4d9f9ae82f7f33d', '下载.jpg', '20210531142916_下载.jpg', 'jpg', 'public\\uploadFile\\26eaf4e2c661fa8af4d9f9ae82f7f33d', 31102);
INSERT INTO `fileinfo` VALUES ('29559917261f0d4d3b1bd8f5610000ba', '1.jpg', '20210531135414_1.jpg', 'jpg', 'public\\uploadFile\\29559917261f0d4d3b1bd8f5610000ba', 38868);
INSERT INTO `fileinfo` VALUES ('2da1d8759119eafaaf3a92466bdfac44', 'desk.png', '20210702102423_desk.png', 'png', 'public\\uploadFile\\2da1d8759119eafaaf3a92466bdfac44', 287012);
INSERT INTO `fileinfo` VALUES ('4f22554f7bc77089e766d7c1a8335c46', 'login-bg.jpg', '20210531134857_login-bg.jpg', 'jpg', 'public\\uploadFile\\4f22554f7bc77089e766d7c1a8335c46', 70587);
INSERT INTO `fileinfo` VALUES ('5d59bc33293317add683413ac98d0b2a', 'desk1.jpg', '20210531141555_desk1.jpg', 'jpg', 'public\\uploadFile\\5d59bc33293317add683413ac98d0b2a', 126940);
INSERT INTO `fileinfo` VALUES ('692601e15a90cc046fd9b28c5dc5bc35', 'a4bafdca-66a1-4511-ade4-746d9da63ee2.png', '20210531135740_a4bafdca-66a1-4511-ade4-746d9da63ee2.png', 'png', 'public\\uploadFile\\692601e15a90cc046fd9b28c5dc5bc35', 1175360);
INSERT INTO `fileinfo` VALUES ('6d6a5aebfca64c8ea95691ec435d3739', '屏幕截图(2).png', '20210531134705_屏幕截图(2).png', 'png', 'public\\uploadFile\\6d6a5aebfca64c8ea95691ec435d3739', 186584);
INSERT INTO `fileinfo` VALUES ('8b7b970462b84fdc09d96bae4a7ff466', '2.jpg', '20210616133137_2.jpg', 'jpg', 'public\\uploadFile\\8b7b970462b84fdc09d96bae4a7ff466', 25279);
INSERT INTO `fileinfo` VALUES ('8f7444739507e95dc0854bfa0c79a471', 'desk.jpg', '20210713142558_desk.jpg', 'jpg', 'public\\uploadFile\\8f7444739507e95dc0854bfa0c79a471', 38868);
INSERT INTO `fileinfo` VALUES ('907748a81f2edbaa86e535ee9da12a8a', 'desk.jpg', '20210531135633_desk.jpg', 'jpg', 'public\\uploadFile\\907748a81f2edbaa86e535ee9da12a8a', 25049);
INSERT INTO `fileinfo` VALUES ('918c58a36009c9f9b24c1c145c2761cb', '屏幕截图(1).png', '20210531134525_屏幕截图(1).png', 'png', 'public\\uploadFile\\918c58a36009c9f9b24c1c145c2761cb', 368631);
INSERT INTO `fileinfo` VALUES ('ad0c3bd0ff16283b249c4c2183d0e924', 'LICENSE', '20210713141904_LICENSE.LICENSE', 'LICENSE', 'public\\uploadFile\\ad0c3bd0ff16283b249c4c2183d0e924', 10174);
INSERT INTO `fileinfo` VALUES ('db044a1ab5f16d897a44f59d4148b9ce', '4.jpg', '20210531134904_4.jpg', 'jpg', 'public\\uploadFile\\db044a1ab5f16d897a44f59d4148b9ce', 25772);
INSERT INTO `fileinfo` VALUES ('e47827d6af32ef97556235ad493033c6', 'timg.jpg', '20210531135744_timg.jpg', 'jpg', 'public\\uploadFile\\e47827d6af32ef97556235ad493033c6', 42360);

-- ----------------------------
-- Table structure for pluginfo
-- ----------------------------
DROP TABLE IF EXISTS `pluginfo`;
CREATE TABLE `pluginfo`  (
  `plugId` int(11) NOT NULL AUTO_INCREMENT COMMENT '插件id',
  `plugName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '插件名称',
  `plugLink` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '插件链接地址',
  `plugDes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '插件描述',
  `insertPlugDate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '添加插件的日期',
  `userId` int(11) NOT NULL COMMENT '用户ID 添加该插件的人  与userinfo的id关联',
  `plugTypeId` int(11) NULL DEFAULT NULL COMMENT '插件类型id  与plugTypeInfo的id关联',
  `lastUpdatePlugDate` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后更新时间',
  `isDel` int(11) NULL DEFAULT NULL COMMENT '是否删除 1是 2或空为否',
  PRIMARY KEY (`plugId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pluginfo
-- ----------------------------
INSERT INTO `pluginfo` VALUES (1, 'vxe-table', 'https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install', '一个基于 vue 的 PC 端表格组件，支持增删改查、虚拟滚动、懒加载、快捷菜单、数据校验、树形结构、打印导出、表单渲染、数据分页、虚拟列表、模态窗口、自定义模板、渲染器、贼灵活的配置项、扩展接口等。', '2021-05-10 10:36:00', 1, 1, NULL, 1);
INSERT INTO `pluginfo` VALUES (2, 'vuepress', 'https://www.vuepress.cn/', 'Vue 驱动的静态网站生成器（个人也是仿照vuepress做的博客）', '2021-05-10 13:05:00', 1, 1, NULL, NULL);
INSERT INTO `pluginfo` VALUES (3, 'lodash', 'https://www.lodashjs.com/', 'Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库', '2021-05-10 16:04:00', 1, 2, NULL, NULL);
INSERT INTO `pluginfo` VALUES (4, 'echarts', 'https://echarts.apache.org/zh/index.html', '一个基于 JavaScript 的开源可视化图表库', '2021-05-10 18:05:00', 2, 2, '2021-05-24 14:19:52', NULL);
INSERT INTO `pluginfo` VALUES (5, 'v-charts', 'https://vue-echarts.github.io/guide/data.html', '基于 Vue2.0 和 echarts 封装的 v-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表', '2021-05-10 18:06:00', 1, 1, NULL, NULL);
INSERT INTO `pluginfo` VALUES (6, 'clipboard', 'http://www.clipboardjs.cn/', '打印文本插件', '2021-05-11 13:25:13', 3, 1, NULL, NULL);
INSERT INTO `pluginfo` VALUES (7, 'DataV', 'http://datav.jiaminghi.com/', 'Vue 大屏数据展示组件库', '2021-05-11 13:29:53', 3, 1, NULL, NULL);
INSERT INTO `pluginfo` VALUES (8, '我是插件1', 'https://www.shargoodata.com', 'https://www.shargoodata.com/#/', '2021-05-14 11:44:14', 1, 2, '2021-05-26 13:45:02', NULL);
INSERT INTO `pluginfo` VALUES (9, '我是插件', 'https://www.shargoodata.com', 'https://www.shargoodata.com/#/', '2021-05-14 11:54:07', 1, 2, NULL, 1);
INSERT INTO `pluginfo` VALUES (10, '我是插件', 'https://www.shargoodata.com', 'https://www.shargoodata.com/#/', '2021-05-14 12:11:51', 1, 2, NULL, 1);
INSERT INTO `pluginfo` VALUES (11, '我是插件', 'https://www.shargoodata.com', 'https://www.shargoodata.com/#/', '2021-05-14 12:11:57', 1, 2, '2021-05-14 12:30:14', 1);
INSERT INTO `pluginfo` VALUES (12, '1', 'https://www.baidu.com', '123', '2021-05-14 13:11:31', 1, 1, '2021-05-14 13:11:35', 1);
INSERT INTO `pluginfo` VALUES (13, '中伟', 'https://blog.csdn.net/qq_39009348/article/details/82224166', 'https://blog.csdn.net/qq_39009348/article/details/82224166', '2021-05-17 09:05:17', 3, 3, '2021-05-17 09:05:17', 1);
INSERT INTO `pluginfo` VALUES (14, '123', 'https://www.runoob.com/nodejs/nodejs-fs.html', '123', '2021-05-28 14:42:46', 3, 2, '2021-05-28 14:42:46', NULL);
INSERT INTO `pluginfo` VALUES (15, '123', 'https://www.runoob.com/nodejs/nodejs-fs.html', 'https://www.runoob.com/nodejs/nodejs-fs.html', '2021-05-28 14:43:11', 3, 2, '2021-05-28 14:43:11', NULL);
INSERT INTO `pluginfo` VALUES (16, '12', 'https://www.runoob.com/nodejs/nodejs-fs.html', 'https://www.runoob.com/nodejs/nodejs-fs.html', '2021-05-28 14:43:31', 3, 2, '2021-06-16 13:31:21', NULL);

-- ----------------------------
-- Table structure for plugtypeinfo
-- ----------------------------
DROP TABLE IF EXISTS `plugtypeinfo`;
CREATE TABLE `plugtypeinfo`  (
  `plugTypeId` int(11) NOT NULL AUTO_INCREMENT COMMENT '插件类型Id',
  `plugTypeName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '插件类型名称 例如vue、java等',
  `plugTypeDes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '插件类型描述',
  `addTypeTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '添加插件类型时间',
  `userId` int(11) NULL DEFAULT NULL COMMENT '添加该插件类型的用户Id',
  `isDel` int(11) NULL DEFAULT NULL COMMENT '是否删除 1是 2 或空否',
  `lastUpdateTypeTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`plugTypeId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of plugtypeinfo
-- ----------------------------
INSERT INTO `plugtypeinfo` VALUES (1, 'Vue', 'vue相关生态及插件', '2021-05-11 13:38:00', NULL, NULL, NULL);
INSERT INTO `plugtypeinfo` VALUES (2, 'JavaScript', 'js通用', '2021-05-11 13:40:00', NULL, NULL, NULL);
INSERT INTO `plugtypeinfo` VALUES (3, '测试', '1123', '2021-05-14 14:01:44', 1, NULL, '2021-05-14 14:01:44');
INSERT INTO `plugtypeinfo` VALUES (4, '11', '2', '2021-05-14 14:23:19', 1, NULL, '2021-05-14 14:23:19');
INSERT INTO `plugtypeinfo` VALUES (5, '测试01', 'https://www.runoob.com/nodejs/nodejs-fs.html', '2021-05-28 14:44:00', 3, NULL, '2021-05-28 14:44:00');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户Id',
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `userPassword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户密码',
  `userEmail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户邮箱',
  `userRights` int(11) NOT NULL COMMENT '用户权限 如：超级管理员、管理员、普通用户',
  `lastLoginTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户最后登录时间',
  `registerTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户注册时间',
  `isDel` int(11) NULL DEFAULT NULL COMMENT '是否删除（物理删除） 是 1 否 2',
  `fileId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户头像  与fileinfo的fileId关联',
  PRIMARY KEY (`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, 'test', '123456', '123@qq.com', 3, '2021-05-31 14:31:14', '2021-05-07 17:42:07', NULL, '5d59bc33293317add683413ac98d0b2a');
INSERT INTO `userinfo` VALUES (2, 'autotest', '123456', '123456@qq.com', 2, '2021-05-21 09:40:40', '2021-05-07 18:00:13', NULL, NULL);
INSERT INTO `userinfo` VALUES (3, 'admin', '123456', '123@qq.com', 1, '2021-07-13 13:27:36', '2021-04-08 11:01:30', NULL, '8f7444739507e95dc0854bfa0c79a471');
INSERT INTO `userinfo` VALUES (4, 'tony', '123456', '1232qq.com', 3, '2021-04-08 11:11:13', '2021-05-08 11:11:06', NULL, NULL);
INSERT INTO `userinfo` VALUES (5, 'xiaopeng', '123456', '123@qq.com', 3, '2021-05-28 09:16:21', '2021-05-08 14:58:34', NULL, NULL);
INSERT INTO `userinfo` VALUES (6, 'baokun', '123456', '123@qq.com', 3, '2021-07-08 11:00:27', '2021-05-08 17:08:32', NULL, '26eaf4e2c661fa8af4d9f9ae82f7f33d');
INSERT INTO `userinfo` VALUES (7, 'test0520', '132456', '132@qq.com', 3, '2021-03-28 09:20:40', '2021-05-20 13:30:25', NULL, NULL);
INSERT INTO `userinfo` VALUES (8, 'test0520', '123456', '123@qq.com', 3, '2021-02-28 09:20:40', '2021-05-20 13:30:44', NULL, NULL);
INSERT INTO `userinfo` VALUES (9, '123', '123', '123', 3, '2021-02-28 09:20:40', '2021-06-01 10:35:29', NULL, NULL);
INSERT INTO `userinfo` VALUES (10, '12321', '123', '123', 3, '2021-02-28 09:20:40', '2021-06-01 10:40:38', NULL, NULL);

-- ----------------------------
-- Table structure for usermenuinfo
-- ----------------------------
DROP TABLE IF EXISTS `usermenuinfo`;
CREATE TABLE `usermenuinfo`  (
  `menuId` int(11) NOT NULL AUTO_INCREMENT COMMENT '路由对应的菜单id',
  `menuName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单中文名',
  `menuPath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '菜单路径',
  `menuIcon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单icon',
  `isIncludedChildMenu` int(255) NOT NULL COMMENT '是否包含子级菜单 是0 否1',
  `parentMenuId` int(11) NOT NULL COMMENT '对应的父级菜单id 0 则代表没有',
  `menuRights` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单权限  与 userrightinfo表中的id对应 （但是类型为一个字符串）',
  PRIMARY KEY (`menuId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of usermenuinfo
-- ----------------------------
INSERT INTO `usermenuinfo` VALUES (1, '首页', '/home', 'el-icon-set-up', 1, 0, '1,2,3');
INSERT INTO `usermenuinfo` VALUES (2, '插件信息', '/plugUnit', 'el-icon-set-up', 0, 0, '1,2,3');
INSERT INTO `usermenuinfo` VALUES (3, '插件列表', '/plugList', 'el-icon-set-up', 1, 2, '1,2,3');
INSERT INTO `usermenuinfo` VALUES (4, '插件类型', '/plugType', 'el-icon-set-up', 1, 2, '1,2,3');
INSERT INTO `usermenuinfo` VALUES (5, '用户信息', '/userInfo', 'el-icon-user', 0, 0, '1,2,3');
INSERT INTO `usermenuinfo` VALUES (6, '用户列表', '/userList', 'el-icon-set-up', 1, 5, '1,2');
INSERT INTO `usermenuinfo` VALUES (7, '用户权限', '/userRights', 'el-icon-set-up', 1, 5, '1,2');
INSERT INTO `usermenuinfo` VALUES (8, '用户信息', '/personInfo', 'el-icon-user', 1, 5, '1,2,3');

-- ----------------------------
-- Table structure for userrightinfo
-- ----------------------------
DROP TABLE IF EXISTS `userrightinfo`;
CREATE TABLE `userrightinfo`  (
  `userRightId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户权限：1 超级管理员、2 管理员、3 普通用户 ',
  `rightName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户权限名称',
  PRIMARY KEY (`userRightId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of userrightinfo
-- ----------------------------
INSERT INTO `userrightinfo` VALUES (1, '超级管理员');
INSERT INTO `userrightinfo` VALUES (2, '管理员');
INSERT INTO `userrightinfo` VALUES (3, '普通用户');

SET FOREIGN_KEY_CHECKS = 1;
