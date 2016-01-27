-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost:3306
-- 生成日期: 2016 年 01 月 27 日 12:00
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
-- 表的结构 `add_gfqjz_instance`
--

CREATE TABLE IF NOT EXISTS `add_gfqjz_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serve_date` date NOT NULL COMMENT '兼职日期',
  `claim_id` int(11) NOT NULL COMMENT '认领人ID',
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `status` int(11) NOT NULL COMMENT '服务状态，0：已认领；1：已完成；2：已取消；3：发布人撤销；4：认领人撤销',
  `position_id` int(11) NOT NULL COMMENT '岗位ID ',
  `turnover` int(11) NOT NULL COMMENT '成交价格',
  PRIMARY KEY (`id`),
  KEY `claim_id` (`claim_id`),
  KEY `publish_id` (`publish_id`),
  KEY `position_id` (`position_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='服务_高峰期兼职 表' AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `add_gfqjz_instance`
--

INSERT INTO `add_gfqjz_instance` (`id`, `serve_date`, `claim_id`, `publish_id`, `status`, `position_id`, `turnover`) VALUES
(1, '2016-01-24', 7, 1, 0, 3, 0),
(2, '2016-01-29', 7, 1, 0, 3, 0),
(4, '2016-01-24', 7, 7, 0, 2, 50),
(5, '2016-01-24', 7, 7, 0, 2, 50),
(6, '2016-01-28', 7, 7, 0, 2, 50);

-- --------------------------------------------------------

--
-- 表的结构 `add_gfqjz_position`
--

CREATE TABLE IF NOT EXISTS `add_gfqjz_position` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(100) NOT NULL COMMENT '工作地点',
  `description` varchar(512) NOT NULL COMMENT '岗位描述',
  `publish_id` int(11) NOT NULL COMMENT '发布人',
  `reward` int(11) NOT NULL COMMENT '报酬',
  `number` int(11) NOT NULL COMMENT '需要人数',
  `status` int(11) NOT NULL COMMENT '状态，0：正常；1：已删除',
  `spot` varchar(50) NOT NULL COMMENT '时段',
  `term` date NOT NULL COMMENT '截止有效期',
  `day_flag` int(11) NOT NULL COMMENT '有效日',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='服务_高峰期兼职_岗位' AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `add_gfqjz_position`
--

INSERT INTO `add_gfqjz_position` (`id`, `address`, `description`, `publish_id`, `reward`, `number`, `status`, `spot`, `term`, `day_flag`) VALUES
(2, '锦业公寓西门超市', '搬货', 7, 50, 4, 0, '11:00-13:00,16:00-20:00', '2016-01-31', 1010101),
(3, '望京花园', '端菜', 1, 20, 2, 1, '11:00-14:00', '2016-01-30', 1110001),
(4, '北门', 'ddd', 7, 20, 7, 0, '7:00-9:00', '2016-02-15', 1101100);

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='系统管理员表' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'hong', '38906cb4cbe2a72f8592cd501fe0a1e4');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `service_type` varchar(15) NOT NULL COMMENT '服务类型编号',
  `service_id` int(11) NOT NULL COMMENT '服务ID',
  `comment_by` int(11) NOT NULL COMMENT '评论人',
  `comment_to` int(11) NOT NULL COMMENT '被评论人',
  `score` int(11) NOT NULL COMMENT '评分',
  `content` varchar(1024) NOT NULL COMMENT '评论内容',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  PRIMARY KEY (`id`),
  KEY `comment_by` (`comment_by`),
  KEY `comment_to` (`comment_to`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='评价表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `service_type`, `service_id`, `comment_by`, `comment_to`, `score`, `content`, `time`) VALUES
(1, 'add_gfqjz', 4, 7, 7, 90, '好得很', '2016-01-23 10:37:56'),
(3, 'add_gfqjz', 5, 7, 7, 0, 'dff66', '2016-01-23 10:59:29'),
(4, 'ser_ban', 3, 7, 7, 0, '报的好', '2016-01-24 14:42:58'),
(5, 'ser_fuwu', 3, 7, 7, 0, '服务的好', '2016-01-24 14:58:38');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='区县表' AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `county`
--

INSERT INTO `county` (`id`, `province`, `city`, `name`) VALUES
(1, '陕西省', '西安市', '雁塔区'),
(2, '北京市', '北京市辖区', '朝阳区'),
(3, '陕西省', '西安市', '碑林区'),
(5, '陕西省', '西安市', '长安区'),
(6, '北京市', '北京市辖区', '通州区'),
(7, '辽宁省', '沈阳市', 'dd');

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `door_num` varchar(20) NOT NULL COMMENT '门牌号',
  `description` varchar(512) NOT NULL COMMENT '个人描述',
  `house_auth` varchar(128) NOT NULL DEFAULT '',
  `cert_auth` varchar(512) NOT NULL COMMENT '证件认证，以分号隔开',
  `prof_auth` varchar(128) NOT NULL COMMENT 'profession职业认证，以逗号分隔',
  `prop_auth` varchar(512) NOT NULL COMMENT 'property产权认证，以分号隔开',
  `balance` float NOT NULL DEFAULT '0' COMMENT '账号余额',
  `building_num` varchar(20) NOT NULL COMMENT '楼号',
  `birthdate` date DEFAULT NULL COMMENT '出生日期',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='成员表，从用户表分离出来' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `member`
--

INSERT INTO `member` (`id`, `user_id`, `door_num`, `description`, `house_auth`, `cert_auth`, `prof_auth`, `prop_auth`, `balance`, `building_num`, `birthdate`) VALUES
(1, 7, '', 'msmsmsm788', '0', '', '', '', 0, '', '0000-00-00'),
(2, 8, '', '', '0', '', '', '', 0, '', '0000-00-00'),
(3, 9, '', '', '0', '', '', '', 0, '', '0000-00-00');

-- --------------------------------------------------------

--
-- 表的结构 `ser_ban_class`
--

CREATE TABLE IF NOT EXISTS `ser_ban_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(80) NOT NULL COMMENT '地址',
  `content` varchar(200) NOT NULL COMMENT '活动内容，时间，时长',
  `description` varchar(1024) NOT NULL COMMENT '详细介绍',
  `status` int(11) NOT NULL COMMENT '状态，0：未开放；1：报班中；2：开班中；3：持续接收；4：已关闭；5：已删除',
  `price` varchar(60) NOT NULL COMMENT '价格',
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `min_num` int(11) NOT NULL COMMENT '最小开班人数',
  `max_num` int(11) NOT NULL COMMENT '最大接收人数',
  `term` date NOT NULL COMMENT '报名有效期',
  `title` varchar(60) CHARACTER SET utf8mb4 NOT NULL COMMENT '班团标题',
  `field` int(11) NOT NULL COMMENT '领域',
  `category` int(11) NOT NULL COMMENT '类别',
  `subject` int(11) NOT NULL COMMENT '科目',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='培训班、旅游团' AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ser_ban_class`
--

INSERT INTO `ser_ban_class` (`id`, `address`, `content`, `description`, `status`, `price`, `publish_id`, `min_num`, `max_num`, `term`, `title`, `field`, `category`, `subject`) VALUES
(1, '锦业公寓', '补习班 英语', '来吧来吧', 1, '20元/小时', 7, 10, 10, '2025-01-17', '初中英语补习班', 5, 2, 2),
(2, '零一广场', '培训', 'dd', 5, '45每天', 7, 23, 35, '2016-05-06', '培训啦', 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ser_ban_instance`
--

CREATE TABLE IF NOT EXISTS `ser_ban_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `claim_id` int(11) NOT NULL COMMENT '报班人ID',
  `class_id` int(11) NOT NULL COMMENT '培训班ID',
  `status` int(11) NOT NULL COMMENT '服务状态，0：已报名；1：已完成；2：已取消；3：发布人撤销；4：报班人撤销',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报名时间',
  `turnover` float NOT NULL COMMENT '成交额',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`),
  KEY `claim_id` (`claim_id`),
  KEY `class_id` (`class_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COMMENT='报班信息表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ser_ban_instance`
--

INSERT INTO `ser_ban_instance` (`id`, `publish_id`, `claim_id`, `class_id`, `status`, `time`, `turnover`) VALUES
(1, 7, 7, 1, 0, '2016-01-24 09:25:52', 0),
(2, 7, 7, 1, 0, '2016-01-24 14:35:33', 0),
(3, 7, 7, 1, 0, '2016-01-24 14:42:35', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ser_fuwu_instance`
--

CREATE TABLE IF NOT EXISTS `ser_fuwu_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publish_id` int(11) NOT NULL COMMENT '发布者ID',
  `claim_id` int(11) NOT NULL COMMENT '认领者ID',
  `item_id` int(11) NOT NULL COMMENT '服务项目ID',
  `status` int(11) NOT NULL COMMENT '服务状态，0：已预定；1：已完成；2：已取消；3：发布人撤销；4：报班人撤销',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '预定时间',
  `turnover` int(11) NOT NULL COMMENT '成交额',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`),
  KEY `claim_id` (`claim_id`),
  KEY `item_id` (`item_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='服务预定表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ser_fuwu_instance`
--

INSERT INTO `ser_fuwu_instance` (`id`, `publish_id`, `claim_id`, `item_id`, `status`, `time`, `turnover`) VALUES
(1, 7, 7, 1, 0, '2016-01-24 13:42:13', 0),
(2, 7, 7, 1, 0, '2016-01-24 14:41:09', 0),
(3, 7, 7, 1, 0, '2016-01-24 14:42:41', 0);

-- --------------------------------------------------------

--
-- 表的结构 `ser_fuwu_item`
--

CREATE TABLE IF NOT EXISTS `ser_fuwu_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `title` varchar(60) NOT NULL COMMENT '服务标题',
  `term` date NOT NULL COMMENT '有效期',
  `price` varchar(60) NOT NULL COMMENT '价格',
  `address` varchar(80) NOT NULL COMMENT '地点、国家',
  `status` int(11) NOT NULL COMMENT '状态，0：未开放；1：正常；2：已关闭',
  `description` varchar(1024) NOT NULL COMMENT '服务描述',
  `serve_method` int(11) NOT NULL COMMENT '服务方式，0：未知；1：上门；2：到店；3：远程',
  `charge_method` int(11) NOT NULL COMMENT '收费方式，0：未知；1：先收费；2：后收费；3：先付一半',
  `field` int(11) NOT NULL COMMENT '领域',
  `category` int(11) NOT NULL COMMENT '类别',
  `subject` int(11) NOT NULL COMMENT '科目',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='服务表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `ser_fuwu_item`
--

INSERT INTO `ser_fuwu_item` (`id`, `publish_id`, `title`, `term`, `price`, `address`, `status`, `description`, `serve_method`, `charge_method`, `field`, `category`, `subject`) VALUES
(1, 7, '小学语文家教', '2016-08-16', '10元/天', '钟楼', 1, '描述', 1, 2, 2, 1, 1),
(2, 7, '', '0000-00-00', '', '', 1, '', 0, 0, 0, 0, 0),
(3, 7, 'dddttt', '2015-04-06', '33', 'dddttt', 5, 'dddttt', 2, 2, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `ser_sbsfc_instance`
--

CREATE TABLE IF NOT EXISTS `ser_sbsfc_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `claim_id` int(11) NOT NULL COMMENT '认领人ID',
  `status` int(11) NOT NULL COMMENT '服务状态，0：已认领；1：已完成；2：已取消；3：发布人撤销；4：认领人撤销',
  `serve_date` date NOT NULL COMMENT '日期',
  `route_id` int(11) NOT NULL COMMENT '线路ID',
  `turnover` int(11) NOT NULL COMMENT '成交价格',
  `destination` varchar(100) NOT NULL COMMENT '目的地',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`),
  KEY `claim_id` (`claim_id`),
  KEY `route_id` (`route_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='服务_上班顺风车 表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `ser_sbsfc_instance`
--

INSERT INTO `ser_sbsfc_instance` (`id`, `publish_id`, `claim_id`, `status`, `serve_date`, `route_id`, `turnover`, `destination`) VALUES
(1, 1, 7, 0, '2016-01-23', 1, 40, '高新一中'),
(2, 7, 7, 0, '2016-01-29', 2, 2, '2'),
(3, 7, 7, 0, '2016-01-25', 2, 2, '2'),
(4, 7, 7, 0, '2016-01-25', 2, 2, '2'),
(5, 1, 7, 0, '2016-01-30', 1, 20, '锦业路');

-- --------------------------------------------------------

--
-- 表的结构 `ser_sbsfc_route`
--

CREATE TABLE IF NOT EXISTS `ser_sbsfc_route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dep_time` varchar(5) NOT NULL COMMENT 'departure出发时间',
  `dep_point` varchar(100) NOT NULL COMMENT '出发地点',
  `car_model` varchar(80) NOT NULL COMMENT '车款',
  `car_plate` varchar(80) NOT NULL COMMENT '车牌号',
  `point_end` varchar(100) NOT NULL COMMENT '终点',
  `point_1` varchar(100) NOT NULL COMMENT '必经点1',
  `point_2` varchar(100) NOT NULL COMMENT '必经点2',
  `point_3` varchar(100) CHARACTER SET utf8mb4 NOT NULL COMMENT '必经点3',
  `point_4` varchar(100) NOT NULL COMMENT '必经点4',
  `price_1` int(11) NOT NULL COMMENT '必经点1 的价格',
  `price_2` int(11) NOT NULL COMMENT '必经点2 的价格',
  `price_3` int(11) NOT NULL COMMENT '必经点3 的价格',
  `price_4` int(11) NOT NULL COMMENT '必经点4  的价格',
  `price_end` int(11) NOT NULL COMMENT '终点的价格',
  `number` int(11) NOT NULL COMMENT '可搭载人数',
  `status` int(11) NOT NULL COMMENT '状态，0：正常；1：已删除',
  `day_flag` int(11) NOT NULL COMMENT '有效日',
  `publish_id` int(11) NOT NULL COMMENT '发布人ID',
  `term` date NOT NULL COMMENT '截止有效日',
  PRIMARY KEY (`id`),
  KEY `publish_id` (`publish_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='服务_高峰期_线路' AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `ser_sbsfc_route`
--

INSERT INTO `ser_sbsfc_route` (`id`, `dep_time`, `dep_point`, `car_model`, `car_plate`, `point_end`, `point_1`, `point_2`, `point_3`, `point_4`, `price_1`, `price_2`, `price_3`, `price_4`, `price_end`, `number`, `status`, `day_flag`, `publish_id`, `term`) VALUES
(1, '07:00', '北门', '奥迪', '陕A 1233', '零壹广场', '绿地世纪城', '锦业路', '旺座', '高新一中', 10, 20, 30, 40, 50, 3, 0, 1001010, 1, '2016-01-29'),
(2, '7:00', '北门', '奥迪', '陕B', '5', '1', '2', '3', '4', 1, 2, 3, 4, 5, 3, 0, 1100011, 7, '2016-12-03');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `village_id` int(11) NOT NULL COMMENT '小区ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `comment_num` int(11) NOT NULL DEFAULT '0' COMMENT '评论总数',
  `score_sum` float NOT NULL DEFAULT '0' COMMENT '评分总分',
  `complete_num` int(11) NOT NULL COMMENT '完成单数',
  `status` int(11) NOT NULL COMMENT '状态，0：未注册完成；1：正常；2：封号',
  `surname` varchar(20) NOT NULL COMMENT '姓氏',
  `sex` int(11) NOT NULL COMMENT '性别  0：未确定；1：男；2：女',
  `revoke_num` int(11) NOT NULL COMMENT '撤销数',
  `phone` varchar(15) NOT NULL COMMENT '手机号码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `village_id` (`village_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `village_id`, `username`, `password`, `comment_num`, `score_sum`, `complete_num`, `status`, `surname`, `sex`, `revoke_num`, `phone`) VALUES
(1, 1, 'hongzhenquan', '52b20a2d7bd1705cbc6165a0266bf3cc', 0, 0, 0, 1, '洪', 1, 0, ''),
(7, 1, 'hong1', '38906cb4cbe2a72f8592cd501fe0a1e4', 0, 0, 0, 0, '李', 0, 0, ''),
(8, 1, 'gggg', 'c1ebb4933e06ce5617483f665e26627c', 0, 0, 0, 0, '', 0, 0, ''),
(9, 1, 'fgdg', 'a8d0555c213aa52d3c968d60cd6731dd', 0, 0, 0, 0, '', 0, 0, ''),
(10, 1, 'dddd', '11ddbaf3386aea1f2974eee984542152', 0, 0, 0, 0, '', 0, 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `user_bill`
--

CREATE TABLE IF NOT EXISTS `user_bill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '账单类型，0：预订；1：支出；2：收入；3：提现；4：充值',
  `service_type` varchar(15) NOT NULL COMMENT '服务类型编号',
  `service_id` int(11) NOT NULL COMMENT '服务ID',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '时间',
  `event` varchar(200) NOT NULL COMMENT '事件',
  `balance` float NOT NULL COMMENT '事件发生后，用户的余额',
  `turnover` float NOT NULL COMMENT '成交金额',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='用户账单表' AUTO_INCREMENT=15 ;

--
-- 转存表中的数据 `user_bill`
--

INSERT INTO `user_bill` (`id`, `user_id`, `type`, `service_type`, `service_id`, `time`, `event`, `balance`, `turnover`) VALUES
(1, 7, 0, 'add_gfqjz', 5, '2016-01-23 10:38:38', '高峰期兼职', 0, 50),
(2, 7, 0, 'add_gfqjz', 5, '2016-01-23 10:38:46', '高峰期兼职', 0, -50),
(3, 7, 0, 'add_gfqjz', 6, '2016-01-23 10:38:54', '高峰期兼职', 0, 50),
(4, 7, 0, 'add_gfqjz', 6, '2016-01-23 10:39:01', '高峰期兼职', 0, -50),
(5, 7, 0, 'serv_sbsfc', 5, '2016-01-24 14:31:03', '认领上班顺风车', 0, -20),
(6, 1, 0, 'serv_sbsfc', 5, '2016-01-24 14:31:03', '上班顺风车被认领', 0, 20),
(7, 7, 0, 'serv_ban', 2, '2016-01-24 14:35:33', '报班', 0, 0),
(8, 7, 0, 'serv_ban', 2, '2016-01-24 14:35:33', '上班顺风车被认领', 0, 0),
(9, 7, 0, 'serv_fuwu', 2, '2016-01-24 14:41:09', '接受服务', 0, 0),
(10, 7, 0, 'serv_fuwu', 2, '2016-01-24 14:41:09', '提供服务', 0, 0),
(11, 7, 0, 'ser_ban', 3, '2016-01-24 14:42:35', '报班', 0, 0),
(12, 7, 0, 'ser_ban', 3, '2016-01-24 14:42:35', '班被报', 0, 0),
(13, 7, 0, 'ser_fuwu', 3, '2016-01-24 14:42:41', '接受服务', 0, 0),
(14, 7, 0, 'ser_fuwu', 3, '2016-01-24 14:42:41', '提供服务', 0, 0);

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='小区表' AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `village`
--

INSERT INTO `village` (`id`, `name`, `county_id`, `address`, `longitude`, `latitude`) VALUES
(1, '站营1', 1, '未知', 0, 0),
(2, '望京花园', 2, '利泽中街', 116.477, 40.013),
(4, '北海上', 6, '北海下', 33, 34);

--
-- 限制导出的表
--

--
-- 限制表 `add_gfqjz_instance`
--
ALTER TABLE `add_gfqjz_instance`
  ADD CONSTRAINT `add_gfqjz_instance_ibfk_1` FOREIGN KEY (`claim_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `add_gfqjz_instance_ibfk_2` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `add_gfqjz_instance_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `add_gfqjz_position` (`id`);

--
-- 限制表 `add_gfqjz_position`
--
ALTER TABLE `add_gfqjz_position`
  ADD CONSTRAINT `add_gfqjz_position_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`);

--
-- 限制表 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`comment_by`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`comment_to`) REFERENCES `user` (`id`);

--
-- 限制表 `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- 限制表 `ser_ban_class`
--
ALTER TABLE `ser_ban_class`
  ADD CONSTRAINT `ser_ban_class_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`);

--
-- 限制表 `ser_ban_instance`
--
ALTER TABLE `ser_ban_instance`
  ADD CONSTRAINT `ser_ban_instance_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_ban_instance_ibfk_2` FOREIGN KEY (`claim_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_ban_instance_ibfk_3` FOREIGN KEY (`class_id`) REFERENCES `ser_ban_class` (`id`);

--
-- 限制表 `ser_fuwu_instance`
--
ALTER TABLE `ser_fuwu_instance`
  ADD CONSTRAINT `ser_fuwu_instance_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_fuwu_instance_ibfk_2` FOREIGN KEY (`claim_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_fuwu_instance_ibfk_3` FOREIGN KEY (`item_id`) REFERENCES `ser_fuwu_item` (`id`);

--
-- 限制表 `ser_fuwu_item`
--
ALTER TABLE `ser_fuwu_item`
  ADD CONSTRAINT `ser_fuwu_item_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`);

--
-- 限制表 `ser_sbsfc_instance`
--
ALTER TABLE `ser_sbsfc_instance`
  ADD CONSTRAINT `ser_sbsfc_instance_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_sbsfc_instance_ibfk_2` FOREIGN KEY (`claim_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `ser_sbsfc_instance_ibfk_3` FOREIGN KEY (`route_id`) REFERENCES `ser_sbsfc_route` (`id`);

--
-- 限制表 `ser_sbsfc_route`
--
ALTER TABLE `ser_sbsfc_route`
  ADD CONSTRAINT `ser_sbsfc_route_ibfk_1` FOREIGN KEY (`publish_id`) REFERENCES `user` (`id`);

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
