DROP TABLE IF EXISTS wcf1_gmap_personal;
DROP TABLE IF EXISTS wcf1_gmap_personal_data;

DROP TABLE IF EXISTS wcf1_gmap_menu_item;
CREATE TABLE wcf1_gmap_menu_item (
	menuItemID int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
	menuItem varchar(255) NOT NULL DEFAULT '',
	parentMenuItem varchar(255) NOT NULL DEFAULT '',
	menuItemLink varchar(255) NOT NULL DEFAULT '',
	menuItemIconM varchar(255) NOT NULL DEFAULT '',
	menuItemIconL varchar(255) NOT NULL DEFAULT '',
	showOrder smallint(5) NOT NULL DEFAULT '0',
	permissions text,
	options text,
	UNIQUE KEY menuItem (menuItem)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
