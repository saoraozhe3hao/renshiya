-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2016 年 01 月 20 日 00:05
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `renshiya`
--

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_type` int(11) NOT NULL COMMENT '服务类型编号',
  `service_id` int(11) NOT NULL COMMENT '服务ID',
  `comment_by` int(11) NOT NULL COMMENT '评论人',
  `commont_to` int(11) NOT NULL COMMENT '被评论人',
  `score` int(11) NOT NULL COMMENT '评分',
  `content` varchar(1024) NOT NULL COMMENT '评论内容',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`),
  KEY `commont_to` (`commont_to`),
  KEY `comment_by` (`comment_by`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='评价表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `county`
--

CREATE TABLE IF NOT EXISTS `county` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `province` varchar(30) NOT NULL COMMENT '所属省份',
  `city` varchar(30) NOT NULL COMMENT '所属城市',
  `name` varchar(60) NOT NULL COMMENT '区县名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='区县表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `manager`
--

CREATE TABLE IF NOT EXISTS `manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `village_id` int(11) NOT NULL,
  `surname` varchar(20) NOT NULL COMMENT '姓氏',
  `card_num` varchar(20) NOT NULL COMMENT '身份证号',
  `building_num` varchar(20) NOT NULL COMMENT '楼号',
  `door_num` varchar(20) NOT NULL COMMENT '门牌号',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `status` int(11) NOT NULL COMMENT '状态码，0：未开启；1：正常；2：关闭',
  `balance` float NOT NULL COMMENT '账号余额',
  `join_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
  `avatar` varchar(50) NOT NULL COMMENT '头像位置',
  `sex` int(11) NOT NULL COMMENT ' 性别，0：未确定；1：男；2：女',
  `birthdate` date NOT NULL COMMENT '出生日期',
  `name` varchar(20) NOT NULL COMMENT '名，与姓分开',
  `phone` varchar(15) CHARACTER SET utf8mb4 NOT NULL COMMENT '手机号',
  `weixin` varchar(20) NOT NULL COMMENT '微信号',
  `gongzhonghao` varchar(40) NOT NULL COMMENT '微信公众号',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_number` (`card_num`),
  UNIQUE KEY `username` (`username`),
  KEY `village_id` (`village_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小区经理表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `manager_bill`
--

CREATE TABLE IF NOT EXISTS `manager_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager_id` int(11) NOT NULL COMMENT '小区经理ID',
  `type` int(11) NOT NULL COMMENT '小区经理账单类型，0：提成；1：提现',
  `event` varchar(200) NOT NULL COMMENT '事件：何人接收何服务交易多少钱产生提成',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发生时间',
  `balance` float NOT NULL COMMENT '事件发生后，小区经理的余额',
  `turnover` float NOT NULL COMMENT '成交金额',
  `service_type` int(11) NOT NULL COMMENT '服务类型编号',
  `service_id` int(11) NOT NULL COMMENT '服务ID',
  PRIMARY KEY (`id`),
  KEY `manager_id` (`manager_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小区经理提成日志' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ser_gfqjz_instance`
--

CREATE TABLE IF NOT EXISTS `ser_gfqjz_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL COMMENT '兼职日期',
  `claim_id` int(11) NOT NULL COMMENT '认领人ID',
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `status` int(11) NOT NULL COMMENT '服务状态，0：未发布；1：未认领；2：已认领；3：已完成；4：发布人撤销；5：认领人撤销',
  `position_id` int(11) NOT NULL COMMENT '岗位ID ',
  `turnover` int(11) NOT NULL COMMENT '成交价格',
  PRIMARY KEY (`id`),
  KEY `claim_id` (`claim_id`),
  KEY `publish_id` (`publish_id`),
  KEY `position_id` (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='服务_高峰期兼职 表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ser_gfqjz_position`
--

CREATE TABLE IF NOT EXISTS `ser_gfqjz_position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL COMMENT '工作地点',
  `discription` varchar(512) NOT NULL COMMENT '岗位描述',
  `publish_id` int(11) NOT NULL COMMENT '发布人',
  `reward` int(11) NOT NULL COMMENT '报酬',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='服务_高峰期兼职_岗位' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ser_sbffc_instance`
--

CREATE TABLE IF NOT EXISTS `ser_sbffc_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `claim_id` int(11) NOT NULL COMMENT '认领人ID',
  `status` int(11) NOT NULL COMMENT '服务状态，0：未发布；1：未认领；2：已认领；3：已完成；4：发布人撤销；5：认领人撤销',
  `date` date NOT NULL COMMENT '日期',
  `route_id` int(11) NOT NULL COMMENT '线路ID',
  `turnover` int(11) NOT NULL COMMENT '成交价格',
  `destination` varchar(100) NOT NULL COMMENT '目的地',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`),
  KEY `claim_id` (`claim_id`),
  KEY `route_id` (`route_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='服务_上班顺风车 表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `ser_sbffc_route`
--

CREATE TABLE IF NOT EXISTS `ser_sbffc_route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dep_time` time NOT NULL COMMENT 'departure出发时间',
  `dep_point` varchar(100) NOT NULL COMMENT '出发地点',
  `car_model` varchar(80) NOT NULL COMMENT '车款',
  `car_plate` varchar(80) NOT NULL COMMENT '车牌号',
  `end_point` varchar(100) NOT NULL COMMENT '终点',
  `pass_point_1` varchar(100) NOT NULL COMMENT '必经点1',
  `pass_point_2` varchar(100) NOT NULL COMMENT '必经点2',
  `pass_point_3` varchar(100) CHARACTER SET utf8mb4 NOT NULL COMMENT '必经点3',
  `pass_point_4` varchar(100) NOT NULL COMMENT '必经点4',
  `price_1` int(11) NOT NULL COMMENT '必经点1 的价格',
  `price_2` int(11) NOT NULL COMMENT '必经点2 的价格',
  `price_3` int(11) NOT NULL COMMENT '必经点3 的价格',
  `price_4` int(11) NOT NULL COMMENT '必经点4  的价格',
  `price_end` int(11) NOT NULL COMMENT '终点的价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='服务_高峰期_线路' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `village_id` int(11) NOT NULL COMMENT '小区ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `birthdate` date NOT NULL COMMENT '出生日期',
  `phone` varchar(15) NOT NULL COMMENT '手机号码',
  `building_num` varchar(20) NOT NULL COMMENT '楼号',
  `door_num` varchar(20) NOT NULL COMMENT '门牌号',
  `balance` float NOT NULL COMMENT '账号余额',
  `comment_num` int(11) NOT NULL DEFAULT '0' COMMENT '评论总数',
  `score_sum` float NOT NULL DEFAULT '0' COMMENT '评分总分',
  `complete_num` int(11) NOT NULL COMMENT '完成单数',
  `house_auth` int(11) NOT NULL DEFAULT '0' COMMENT '0：家庭自有住房；1：租住；2：住户亲友',
  `cert_auth` varchar(512) NOT NULL COMMENT '证件认证，以分号隔开',
  `prof_auth` varchar(128) NOT NULL COMMENT 'profession职业认证，以逗号分隔',
  `prop_auth` varchar(512) NOT NULL COMMENT 'property产权认证，以分号隔开',
  `status` int(11) NOT NULL COMMENT '状态，0：未注册完成；1：正常；2：封号',
  `surname` varchar(20) NOT NULL COMMENT '姓氏',
  `sex` int(11) NOT NULL COMMENT '性别  0：未确定；1：男；2：女',
  `description` varchar(512) NOT NULL COMMENT '个人描述',
  `revoke_num` int(11) NOT NULL COMMENT '撤销数',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `village_id` (`village_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user_bill`
--

CREATE TABLE IF NOT EXISTS `user_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '账单类型，0：支出；1：收入；2：提现；3：充值',
  `service_type` int(11) NOT NULL COMMENT '服务类型编号',
  `service_id` int(11) NOT NULL COMMENT '服务ID',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  `event` varchar(200) NOT NULL COMMENT '事件',
  `balance` float NOT NULL COMMENT '事件发生后，用户的余额',
  `turnover` float NOT NULL COMMENT '成交金额',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户账单表' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `village`
--

CREATE TABLE IF NOT EXISTS `village` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '小区名称',
  `county_id` int(11) NOT NULL COMMENT '所属区县ID',
  `address` varchar(200) NOT NULL COMMENT '小区地址',
  `longitude` float NOT NULL COMMENT '小区所在经度',
  `latitude` float NOT NULL COMMENT '小区所在维度',
  PRIMARY KEY (`id`),
  KEY `county_id` (`county_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='小区表' AUTO_INCREMENT=1 ;

--
-- 限制导出的表
--

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`comment_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`commont_to`) REFERENCES `user` (`id`);

--
-- 限制表 `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `village` (`id`);

--
-- 限制表 `manager_bill`
--
ALTER TABLE `manager_bill`
  ADD CONSTRAINT `manager_bill_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`);

--
-- 限制表 `ser_gfqjz_instance`
--
ALTER TABLE `ser_gfqjz_instance`
  ADD CONSTRAINT `ser_gfqjz_instance_ibfk_1` FOREIGN KEY (`claim_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_gfqjz_instance_ibfk_2` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_gfqjz_instance_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `ser_gfqjz_position` (`id`);

--
-- 限制表 `ser_gfqjz_position`
--
ALTER TABLE `ser_gfqjz_position`
  ADD CONSTRAINT `ser_gfqjz_position_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`);

--
-- 限制表 `ser_sbffc_instance`
--
ALTER TABLE `ser_sbffc_instance`
  ADD CONSTRAINT `ser_sbffc_instance_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_sbffc_instance_ibfk_2` FOREIGN KEY (`claim_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_sbffc_instance_ibfk_3` FOREIGN KEY (`route_id`) REFERENCES `ser_sbffc_route` (`id`);

--
-- 限制表 `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`village_id`) REFERENCES `village` (`id`);

--
-- 限制表 `user_bill`
--
ALTER TABLE `user_bill`
  ADD CONSTRAINT `user_bill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- 限制表 `village`
--
ALTER TABLE `village`
  ADD CONSTRAINT `village_ibfk_1` FOREIGN KEY (`county_id`) REFERENCES `county` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
