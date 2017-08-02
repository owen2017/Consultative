-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2017 年 07 月 31 日 09:59
-- 伺服器版本: 5.5.39
-- PHP 版本： 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 資料庫： `company`
--

-- --------------------------------------------------------

--
-- 資料表結構 `bulletin`
--

CREATE TABLE IF NOT EXISTS `bulletin` (
`sn` int(12) NOT NULL COMMENT '流水號',
  `title` varchar(50) NOT NULL COMMENT '標題',
  `content` varchar(3500) NOT NULL COMMENT '內容',
  `enable` enum('Y','N') NOT NULL COMMENT '啟用 / 停用',
  `build_time` int(10) NOT NULL COMMENT '建立時間',
  `remark` varchar(50) NOT NULL COMMENT '備註',
  `op` int(11) NOT NULL COMMENT '操作者',
  `op_IP` int(11) unsigned NOT NULL COMMENT '操作者IP'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='布告欄' AUTO_INCREMENT=3 ;

--
-- 資料表的匯出資料 `bulletin`
--

INSERT INTO `bulletin` (`sn`, `title`, `content`, `enable`, `build_time`, `remark`, `op`, `op_IP`) VALUES
(1, '驗收日測試公告列表', '驗收日測試公告列表\n驗收日測試公告列表\n驗收日測試公告列表\n驗收日測試公告列表\n驗收日測試公告列表', 'Y', 1501048134, '', 2, 2020319264);

-- --------------------------------------------------------

--
-- 資料表結構 `config_case_times`
--

CREATE TABLE IF NOT EXISTS `config_case_times` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `case_times` varchar(50) NOT NULL COMMENT '接案次數'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 資料表的匯出資料 `config_case_times`
--

INSERT INTO `config_case_times` (`sn`, `case_times`) VALUES
(1, '3人以下'),
(2, '3-10人'),
(3, '10-20人'),
(4, '20人以上');

-- --------------------------------------------------------

--
-- 資料表結構 `config_charges`
--

CREATE TABLE IF NOT EXISTS `config_charges` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `charges` varchar(50) NOT NULL COMMENT '收費標準'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT AUTO_INCREMENT=3 ;

--
-- 資料表的匯出資料 `config_charges`
--

INSERT INTO `config_charges` (`sn`, `charges`) VALUES
(1, '免費'),
(2, '收費');

-- --------------------------------------------------------

--
-- 資料表結構 `config_city`
--

CREATE TABLE IF NOT EXISTS `config_city` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `area` varchar(10) NOT NULL COMMENT '地區',
  `city` varchar(10) NOT NULL COMMENT '縣市'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='地區' AUTO_INCREMENT=22 ;

--
-- 資料表的匯出資料 `config_city`
--

INSERT INTO `config_city` (`sn`, `area`, `city`) VALUES
(1, '北部', '基隆'),
(2, '北部', '臺北'),
(3, '北部', '桃園'),
(4, '北部', '新竹'),
(5, '中部', '苗栗'),
(6, '中部', '台中'),
(7, '中部', '彰化'),
(8, '中部', '雲林'),
(9, '中部', '南投'),
(10, '南部', '嘉義'),
(11, '南部', '台南'),
(12, '南部', '高雄'),
(13, '南部', '屏東'),
(14, '東部', '台東'),
(15, '東部', '花蓮'),
(16, '東部', '宜蘭'),
(17, '外島', '澎湖'),
(18, '外島', '金門'),
(19, '外島', '馬祖'),
(20, '外島', '連江'),
(21, '外島', '海外');

-- --------------------------------------------------------

--
-- 資料表結構 `config_gender`
--

CREATE TABLE IF NOT EXISTS `config_gender` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `gender` varchar(50) NOT NULL COMMENT '性別'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 資料表的匯出資料 `config_gender`
--

INSERT INTO `config_gender` (`sn`, `gender`) VALUES
(1, '男'),
(2, '女'),
(3, '陰陽人'),
(4, '跨性別男性'),
(5, '跨性別女性'),
(7, '其他');

-- --------------------------------------------------------

--
-- 資料表結構 `config_identity`
--

CREATE TABLE IF NOT EXISTS `config_identity` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `identity` varchar(50) NOT NULL COMMENT '身份'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 資料表的匯出資料 `config_identity`
--

INSERT INTO `config_identity` (`sn`, `identity`) VALUES
(1, '我不是同志'),
(2, '我是同志，但不願意公開身份'),
(3, '我是同志，我願意公開同志身份');

-- --------------------------------------------------------

--
-- 資料表結構 `config_license`
--

CREATE TABLE IF NOT EXISTS `config_license` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `license` varchar(50) NOT NULL COMMENT '證照'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 資料表的匯出資料 `config_license`
--

INSERT INTO `config_license` (`sn`, `license`) VALUES
(1, '諮商心理師'),
(2, '臨床心理師'),
(3, '社工師'),
(4, '精神科醫師'),
(5, '輔導專長教師');

-- --------------------------------------------------------

--
-- 資料表結構 `config_office_area`
--

CREATE TABLE IF NOT EXISTS `config_office_area` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `office` varchar(50) NOT NULL COMMENT '工作場所'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 資料表的匯出資料 `config_office_area`
--

INSERT INTO `config_office_area` (`sn`, `office`) VALUES
(1, '學校'),
(2, '醫療院所'),
(3, '社區機構'),
(4, '心理諮商、治療所'),
(5, '行動心理師');

-- --------------------------------------------------------

--
-- 資料表結構 `config_serviceobj`
--

CREATE TABLE IF NOT EXISTS `config_serviceobj` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `serviceobj` varchar(50) NOT NULL COMMENT '服務對象'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 資料表的匯出資料 `config_serviceobj`
--

INSERT INTO `config_serviceobj` (`sn`, `serviceobj`) VALUES
(1, '兒童'),
(2, '青少年'),
(3, '成人'),
(4, '高齡者');

-- --------------------------------------------------------

--
-- 資料表結構 `config_specialty`
--

CREATE TABLE IF NOT EXISTS `config_specialty` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `specialty` varchar(50) NOT NULL COMMENT '專長'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='專長' AUTO_INCREMENT=9 ;

--
-- 資料表的匯出資料 `config_specialty`
--

INSERT INTO `config_specialty` (`sn`, `specialty`) VALUES
(1, '同志友善諮商'),
(2, '同志肯定諮商'),
(3, '同志認同諮商'),
(4, '同志伴侶家庭諮商'),
(5, '同志職場諮商'),
(6, '同志學校諮商'),
(7, '跨性別同志諮商'),
(8, 'HIV感染專長');

-- --------------------------------------------------------

--
-- 資料表結構 `config_training`
--

CREATE TABLE IF NOT EXISTS `config_training` (
`sn` int(2) NOT NULL COMMENT '流水號',
  `training` varchar(50) NOT NULL COMMENT '訓練'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='訓練' AUTO_INCREMENT=4 ;

--
-- 資料表的匯出資料 `config_training`
--

INSERT INTO `config_training` (`sn`, `training`) VALUES
(1, '曾受過同志諮商相關課程、訓練'),
(2, '曾受過多元文化諮商相關課程、訓練'),
(3, '曾開設同志諮商、多元文化諮商相關課程或著有相關著作');

-- --------------------------------------------------------

--
-- 資料表結構 `counselor`
--

CREATE TABLE IF NOT EXISTS `counselor` (
`sn` int(12) NOT NULL COMMENT '流水號',
  `account` varchar(20) NOT NULL COMMENT '帳號',
  `password` varchar(20) NOT NULL COMMENT '密碼',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `gender` varchar(10) NOT NULL COMMENT '性別（認同）',
  `identity` varchar(500) NOT NULL COMMENT '專業人員同志身分',
  `identity_yes` varchar(20) NOT NULL COMMENT '同志身份',
  `mobile` varchar(15) NOT NULL COMMENT '手機',
  `phone` varchar(15) NOT NULL COMMENT '機構電話',
  `email` varchar(30) NOT NULL COMMENT 'E-mail',
  `area` varchar(100) NOT NULL COMMENT '服務地區',
  `office_time` varchar(100) NOT NULL COMMENT '服務時段',
  `office_area` varchar(100) NOT NULL COMMENT '工作場域',
  `job` varchar(100) NOT NULL COMMENT '職稱',
  `service_area` varchar(100) NOT NULL COMMENT '可服務地點',
  `serviceobj` varchar(100) NOT NULL COMMENT '可服務對象',
  `serviceLimit` varchar(100) NOT NULL COMMENT '服務對象限制',
  `charges` varchar(10) NOT NULL COMMENT '收費標準',
  `fee` varchar(50) NOT NULL COMMENT '收費',
  `seniority` int(3) NOT NULL COMMENT '年資',
  `training` varchar(300) NOT NULL COMMENT '修課及訓練',
  `experience` varchar(100) NOT NULL COMMENT '服務同志實務經歷',
  `case_times` varchar(10) NOT NULL COMMENT '接案次數',
  `education` varchar(100) NOT NULL COMMENT '學歷',
  `license` varchar(500) NOT NULL COMMENT '證照',
  `license_num` varchar(100) NOT NULL COMMENT '證照證號',
  `specialty` varchar(500) NOT NULL COMMENT '專長',
  `idea1` varchar(3) NOT NULL COMMENT '看法1',
  `idea2` varchar(3) NOT NULL COMMENT '看法2',
  `satisfaction` int(3) NOT NULL COMMENT '滿意度',
  `click` int(10) NOT NULL COMMENT '點擊數',
  `remark` varchar(50) NOT NULL COMMENT '備註',
  `enable` enum('Y','N') NOT NULL DEFAULT 'Y' COMMENT '狀態',
  `apply_time` int(10) NOT NULL COMMENT '申請時間',
  `approve_time` int(10) NOT NULL COMMENT '核准時間',
  `op` int(11) NOT NULL COMMENT '操作者',
  `op_IP` int(11) unsigned NOT NULL COMMENT '操作者IP'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='諮商師列表' AUTO_INCREMENT=39 ;

--
-- 資料表的匯出資料 `counselor`
--

INSERT INTO `counselor` (`sn`, `account`, `password`, `name`, `gender`, `identity`, `identity_yes`, `mobile`, `phone`, `email`, `area`, `office_time`, `office_area`, `job`, `service_area`, `serviceobj`, `serviceLimit`, `charges`, `fee`, `seniority`, `training`, `experience`, `case_times`, `education`, `license`, `license_num`, `specialty`, `idea1`, `idea2`, `satisfaction`, `click`, `remark`, `enable`, `apply_time`, `approve_time`, `op`, `op_IP`) VALUES
(37, 'wagnerwang', '631052ww', '王振圍', '男', '我是同志，我願意公開同志身份', '疑／流性戀', '0952515353', '08-7523781#253', 'weiweict@gmail.com', '{"0":"彰化","1":"雲林","2":"嘉義","3":"台南","4":"高雄","5":"屏東","6":"台東","7":"花蓮"}', '屏東高工校內為上班時間；餘為週間夜間或假日', '{"checkbox":{"0":"學校"},"other":""}', '國立屏東高級工業職業學校專任輔導教師', '屏東高工或自備諮商空間', '{"0":"青少年","1":"成人"}', '無', '免費', '', 7, '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練","1":"曾開設同志諮商、多元文化諮商相關課程或著有相關著作"},"other":""}', '長期服務同志校園社團、定期辦理同志成長團體工作坊', '20人以上', '國立彰化師範大學輔導與諮商學系博士班研究生', '{"checkbox":{"0":"輔導專長教師"},"other":""}', '中等檢第9900405號', '{"checkbox":{"0":"同志友善諮商","1":"同志肯定諮商","2":"同志認同諮商","3":"同志學校諮商","4":"跨性別同志諮商"},"other":"青少年輔導與諮商、學校輔導與諮商、多元文化諮商、團體諮商、心理劇與社會計量、性別教育與酷兒研究"}', '是', '是', 5, 6, '', 'Y', 1500522000, 1500523670, 5, 2735795241),
(38, 'picka80', 'picka0310', '趙書賢', '男', '我是同志，但不願意公開身份', '', '', '', 'stu20129@gmail.com', '{"0":"台中","1":"彰化"}', '', '{"checkbox":{"0":"學校","1":"社區機構","2":"行動心理師"},"other":""}', '', '', '{"0":"兒童","1":"青少年","2":"成人"}', '', '免費', '', 0, '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練"},"other":""}', '參與同志社團、編輯多元性別心衛刊物、帶領直同志成長團體', '3-10人', '', '{"checkbox":{"0":"諮商心理師"},"other":""}', '尚未畢業', '{"checkbox":{"0":"同志肯定諮商","1":"同志認同諮商","2":"同志學校諮商","3":"跨性別同志諮商"},"other":"榮格心理學、夢工作、華人心理學、家庭動力議題、性別／性平教育議題。"}', '否', '是', 1, 1, '', 'N', 1501042867, 1501047118, 2, 2020319264);

-- --------------------------------------------------------

--
-- 資料表結構 `counselor_apply`
--

CREATE TABLE IF NOT EXISTS `counselor_apply` (
`sn` int(12) NOT NULL COMMENT '流水號',
  `account` varchar(20) NOT NULL COMMENT '帳號',
  `password` varchar(20) NOT NULL COMMENT '密碼',
  `name` varchar(20) NOT NULL COMMENT '姓名',
  `gender` varchar(10) NOT NULL COMMENT '性別（認同）',
  `identity` varchar(500) NOT NULL COMMENT '專業人員同志身分',
  `identity_yes` varchar(20) NOT NULL COMMENT '同志身份',
  `mobile` varchar(15) NOT NULL COMMENT '手機',
  `phone` varchar(15) NOT NULL COMMENT '機構電話',
  `email` varchar(30) NOT NULL COMMENT 'E-mail',
  `area` varchar(100) NOT NULL COMMENT '服務地區',
  `office_time` varchar(100) NOT NULL COMMENT '服務時段',
  `office_area` varchar(100) NOT NULL COMMENT '工作場域',
  `job` varchar(100) NOT NULL COMMENT '職稱',
  `service_area` varchar(100) NOT NULL COMMENT '可服務地點',
  `serviceobj` varchar(100) NOT NULL COMMENT '可服務對象',
  `serviceLimit` varchar(100) NOT NULL COMMENT '服務對象限制',
  `charges` varchar(10) NOT NULL COMMENT '收費標準',
  `fee` varchar(50) NOT NULL COMMENT '收費',
  `seniority` int(3) NOT NULL COMMENT '年資',
  `training` varchar(300) NOT NULL COMMENT '修課及訓練',
  `experience` varchar(100) NOT NULL COMMENT '服務同志實務經歷',
  `case_times` varchar(10) NOT NULL COMMENT '接案次數',
  `education` varchar(100) NOT NULL COMMENT '學歷',
  `license` varchar(500) NOT NULL COMMENT '證照',
  `license_num` varchar(100) NOT NULL COMMENT '證照證號',
  `specialty` varchar(500) NOT NULL COMMENT '專長',
  `idea1` varchar(3) NOT NULL COMMENT '看法1',
  `idea2` varchar(3) NOT NULL COMMENT '看法2',
  `apply_time` int(10) NOT NULL COMMENT '申請時間',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '狀態',
  `approve_time` int(10) NOT NULL COMMENT '核准時間',
  `op` int(11) NOT NULL COMMENT '操作者',
  `op_IP` int(11) unsigned NOT NULL COMMENT '操作者IP'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='諮商師申請表' AUTO_INCREMENT=2 ;

--
-- 資料表的匯出資料 `counselor_apply`
--

INSERT INTO `counselor_apply` (`sn`, `account`, `password`, `name`, `gender`, `identity`, `identity_yes`, `mobile`, `phone`, `email`, `area`, `office_time`, `office_area`, `job`, `service_area`, `serviceobj`, `serviceLimit`, `charges`, `fee`, `seniority`, `training`, `experience`, `case_times`, `education`, `license`, `license_num`, `specialty`, `idea1`, `idea2`, `apply_time`, `status`, `approve_time`, `op`, `op_IP`) VALUES
(1, 'picka80', 'picka0310', '趙書賢', '男', '我是同志，但不願意公開身份', '', '', '', 'stu20129@gmail.com', '{"0":"台中","1":"彰化"}', '', '{"checkbox":{},"other":"研究所尚未畢業"}', '', '', '{"0":"兒童","1":"青少年","2":"成人"}', '', '免費', '', 0, '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練"},"other":""}', '參與同志社團、編輯多元性別心衛刊物、帶領直同志成長團體', '3-10人', '', '{"checkbox":{"0":"諮商心理師"},"other":""}', '尚未畢業', '{"checkbox":{"0":"同志肯定諮商","1":"同志認同諮商","2":"同志學校諮商","3":"跨性別同志諮商"},"other":"榮格心理學、夢工作、華人心理學、家庭動力議題、性別／性平教育議題。"}', '否', '是', 1501042867, 1, 1501047118, 2, 2020319264);

-- --------------------------------------------------------

--
-- 資料表結構 `counselor_modify_apply`
--

CREATE TABLE IF NOT EXISTS `counselor_modify_apply` (
`sn` int(12) NOT NULL COMMENT '流水號',
  `mid` int(12) NOT NULL COMMENT '編號',
  `account` varchar(20) NOT NULL COMMENT '帳號',
  `type` varchar(20) NOT NULL COMMENT '修改類型',
  `oldData` varchar(500) NOT NULL COMMENT '修改前的資料',
  `newData` varchar(500) NOT NULL COMMENT '要修改的資料',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '狀態',
  `op` int(11) NOT NULL COMMENT '操作者',
  `op_IP` int(11) unsigned NOT NULL COMMENT '操作者IP'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='諮商師申請表' AUTO_INCREMENT=2 ;

--
-- 資料表的匯出資料 `counselor_modify_apply`
--

INSERT INTO `counselor_modify_apply` (`sn`, `mid`, `account`, `type`, `oldData`, `newData`, `status`, `op`, `op_IP`) VALUES
(1, 38, 'picka80', 'gender', '男', '女', 2, 2, 2020319264);

-- --------------------------------------------------------

--
-- 資料表結構 `feedback`
--

CREATE TABLE IF NOT EXISTS `feedback` (
  `sn` int(12) NOT NULL COMMENT '流水號',
  `cid` int(12) NOT NULL COMMENT '諮商師編號',
  `account` varchar(20) NOT NULL COMMENT '諮商師帳號',
  `name` varchar(20) NOT NULL COMMENT '諮商師姓名',
  `message` varchar(500) NOT NULL COMMENT '留言',
  `satisfaction` int(3) NOT NULL COMMENT '滿意度',
  `status` enum('Y','N') NOT NULL DEFAULT 'Y' COMMENT '狀態',
  `builttime` int(11) NOT NULL COMMENT '建立時間	',
  `op_IP` int(11) NOT NULL COMMENT '留言者IP'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='回饋';

--
-- 資料表的匯出資料 `feedback`
--

INSERT INTO `feedback` (`sn`, `cid`, `account`, `name`, `message`, `satisfaction`, `status`, `builttime`, `op_IP`) VALUES
(0, 38, 'picka80', '趙書賢', '驗收日測試我要回饋（by書賢）', 0, 'Y', 1501048100, 2020319264);

-- --------------------------------------------------------

--
-- 資料表結構 `log_back_changed`
--

CREATE TABLE IF NOT EXISTS `log_back_changed` (
`sn` int(12) NOT NULL COMMENT '流水號',
  `cid` int(12) NOT NULL COMMENT '諮商師',
  `type` varchar(20) NOT NULL COMMENT '類型',
  `oldData` varchar(500) NOT NULL COMMENT '修改前',
  `newData` varchar(500) NOT NULL COMMENT '修改後',
  `builttime` int(10) NOT NULL COMMENT '建立時間',
  `op` int(11) NOT NULL COMMENT '操作者',
  `op_IP` int(11) NOT NULL COMMENT '操作者IP'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='後台修改會員資料' AUTO_INCREMENT=4 ;

--
-- 資料表的匯出資料 `log_back_changed`
--

INSERT INTO `log_back_changed` (`sn`, `cid`, `type`, `oldData`, `newData`, `builttime`, `op`, `op_IP`) VALUES
(1, 37, 'training', '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練","1":"曾開設同志諮商、多元文化諮商相關課程或著有相關著作"},"other":""}', '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練","1":"曾開設同志諮商、多元文化諮商相關課程或著有相關著作","2":"曾受過多元文化諮商相關課程、訓練"},"other":""}', 1500985708, 1, 1695123253),
(2, 37, 'training', '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練","1":"曾開設同志諮商、多元文化諮商相關課程或著有相關著作","2":"曾受過多元文化諮商相關課程、訓練"},"other":""}', '{"checkbox":{"0":"曾受過同志諮商相關課程、訓練","1":"曾開設同志諮商、多元文化諮商相關課程或著有相關著作"},"other":""}', 1500986458, 1, 1695123253),
(3, 38, 'office_area', '{"checkbox":{},"other":"研究所尚未畢業"}', '{"checkbox":{"0":"學校","1":"社區機構","2":"行動心理師"},"other":""}', 1501047199, 2, 2020319264);

-- --------------------------------------------------------

--
-- 資料表結構 `manager`
--

CREATE TABLE IF NOT EXISTS `manager` (
`sn` int(5) NOT NULL COMMENT '流水號',
  `account` varchar(20) NOT NULL COMMENT '帳號',
  `password` varchar(20) NOT NULL COMMENT '密碼',
  `name` varchar(10) NOT NULL COMMENT '姓名',
  `build_time` int(10) NOT NULL COMMENT '申請時間',
  `remark` varchar(50) NOT NULL COMMENT '備註',
  `op` int(11) NOT NULL COMMENT '操作者',
  `op_IP` int(11) unsigned NOT NULL COMMENT '操作者IP'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='管理者' AUTO_INCREMENT=7 ;

--
-- 資料表的匯出資料 `manager`
--

INSERT INTO `manager` (`sn`, `account`, `password`, `name`, `build_time`, `remark`, `op`, `op_IP`) VALUES
(1, 'admin', 'aa123999', 'admin', 1484153080, 'admin', 0, 0),
(2, 'cnbp01', 'ttaass2005', 'cnbp01', 1484153080, 'cnbp01', 0, 0),
(3, 'cnbp02', 'ttaass2005', 'cnbp02', 1484153080, 'cnbp02', 0, 0),
(4, 'cnbp03', 'ttaass2005', 'cnbp03', 1484153080, 'cnbp03', 0, 0),
(5, 'cnbp04', 'ttaass2005', 'cnbp04', 1484153080, 'cnbp04', 0, 0),
(6, 'cnbp05', 'ttaass2005', 'cnbp05', 1484153080, 'cnbp05', 0, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `visitor`
--

CREATE TABLE IF NOT EXISTS `visitor` (
`sn` int(11) NOT NULL COMMENT '流水號',
  `time` int(10) NOT NULL COMMENT '訪問時間',
  `ip` int(11) NOT NULL COMMENT '訪問IP'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- 資料表的匯出資料 `visitor`
--

INSERT INTO `visitor` (`sn`, `time`, `ip`) VALUES
(1, 1500968957, 1878399321),
(2, 1500969102, 1695123253),
(3, 1501042638, 2020319264),
(4, 1501047125, 2020319264),
(5, 1501048150, 2020319264),
(6, 1501048488, 2020319264),
(7, 1501048588, 2020319264),
(8, 1501121701, 2147483647),
(9, 1501124905, 1878845843),
(10, 1501126734, 1878845843),
(11, 1501128856, 1878845843),
(12, 1501129102, 1878845843),
(13, 1501129239, 1878845843),
(14, 1501130525, 1878845843),
(15, 1501133226, 2147483647),
(16, 1501133228, 2147483647),
(17, 1501349393, 2147483647),
(18, 1501349402, 2147483647),
(19, 1501350382, 2147483647),
(20, 1501350385, 2147483647),
(21, 1501376683, 2147483647),
(22, 1501397547, 1990867803),
(23, 1501397727, 2147483647),
(24, 1501397768, 2147483647),
(25, 1501397942, 1990867803),
(26, 1501400054, 2147483647),
(27, 1501400064, 2147483647),
(28, 1501400229, 2147483647),
(29, 1501416275, 1990867803),
(30, 1501472262, 1990867803);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `bulletin`
--
ALTER TABLE `bulletin`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_case_times`
--
ALTER TABLE `config_case_times`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_charges`
--
ALTER TABLE `config_charges`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_city`
--
ALTER TABLE `config_city`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_gender`
--
ALTER TABLE `config_gender`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_identity`
--
ALTER TABLE `config_identity`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_license`
--
ALTER TABLE `config_license`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_office_area`
--
ALTER TABLE `config_office_area`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_serviceobj`
--
ALTER TABLE `config_serviceobj`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_specialty`
--
ALTER TABLE `config_specialty`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `config_training`
--
ALTER TABLE `config_training`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `counselor`
--
ALTER TABLE `counselor`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `counselor_apply`
--
ALTER TABLE `counselor_apply`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `counselor_modify_apply`
--
ALTER TABLE `counselor_modify_apply`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `log_back_changed`
--
ALTER TABLE `log_back_changed`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `manager`
--
ALTER TABLE `manager`
 ADD PRIMARY KEY (`sn`);

--
-- 資料表索引 `visitor`
--
ALTER TABLE `visitor`
 ADD PRIMARY KEY (`sn`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `bulletin`
--
ALTER TABLE `bulletin`
MODIFY `sn` int(12) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=3;
--
-- 使用資料表 AUTO_INCREMENT `config_case_times`
--
ALTER TABLE `config_case_times`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=5;
--
-- 使用資料表 AUTO_INCREMENT `config_charges`
--
ALTER TABLE `config_charges`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=3;
--
-- 使用資料表 AUTO_INCREMENT `config_city`
--
ALTER TABLE `config_city`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=22;
--
-- 使用資料表 AUTO_INCREMENT `config_gender`
--
ALTER TABLE `config_gender`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=8;
--
-- 使用資料表 AUTO_INCREMENT `config_identity`
--
ALTER TABLE `config_identity`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=4;
--
-- 使用資料表 AUTO_INCREMENT `config_license`
--
ALTER TABLE `config_license`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=6;
--
-- 使用資料表 AUTO_INCREMENT `config_office_area`
--
ALTER TABLE `config_office_area`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=6;
--
-- 使用資料表 AUTO_INCREMENT `config_serviceobj`
--
ALTER TABLE `config_serviceobj`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=5;
--
-- 使用資料表 AUTO_INCREMENT `config_specialty`
--
ALTER TABLE `config_specialty`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=9;
--
-- 使用資料表 AUTO_INCREMENT `config_training`
--
ALTER TABLE `config_training`
MODIFY `sn` int(2) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=4;
--
-- 使用資料表 AUTO_INCREMENT `counselor`
--
ALTER TABLE `counselor`
MODIFY `sn` int(12) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=39;
--
-- 使用資料表 AUTO_INCREMENT `counselor_apply`
--
ALTER TABLE `counselor_apply`
MODIFY `sn` int(12) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=2;
--
-- 使用資料表 AUTO_INCREMENT `counselor_modify_apply`
--
ALTER TABLE `counselor_modify_apply`
MODIFY `sn` int(12) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=2;
--
-- 使用資料表 AUTO_INCREMENT `log_back_changed`
--
ALTER TABLE `log_back_changed`
MODIFY `sn` int(12) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=4;
--
-- 使用資料表 AUTO_INCREMENT `manager`
--
ALTER TABLE `manager`
MODIFY `sn` int(5) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=7;
--
-- 使用資料表 AUTO_INCREMENT `visitor`
--
ALTER TABLE `visitor`
MODIFY `sn` int(11) NOT NULL AUTO_INCREMENT COMMENT '流水號',AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
