CREATE DATABASE IF NOT EXISTS loldle;
USE loldle;
DROP TABLE IF EXISTS classic_daily;
DROP TABLE IF EXISTS champions;
CREATE TABLE champions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    riot_id VARCHAR(20) NOT NULL,
    weight INT NOT NULL
);
INSERT INTO champions (riot_id, weight) VALUES
('Alistar', 35),
('Annie', 146),
('Ashe', 33),
('Fiddlesticks', 146),
('Jax', 17),
('Kayle', 144),
('MasterYi', 88),
('Morgana', 104),
('Nunu', 15),
('Ryze', 152),
('Sion', 23),
('Sivir', 84),
('Soraka', 8),
('Teemo', 89),
('Tristana', 120),
('TwistedFate', 6),
('Warwick', 131),
('Singed', 36),
('Zilean', 61),
('Evelynn', 51),
('Tryndamere', 79),
('Twitch', 167),
('Karthus', 24),
('Amumu', 74),
('Chogath', 145),
('Anivia', 76),
('Rammus', 152),
('Veigar', 94),
('Kassadin', 31),
('Gangplank', 81),
('Taric', 50),
('Blitzcrank', 99),
('DrMundo', 118),
('Janna', 155),
('Malphite', 92),
('Corki', 118),
('Katarina', 162),
('Nasus', 41),
('Heimerdinger', 135),
('Shaco', 5),
('Udyr', 149),
('Nidalee', 18),
('Poppy', 119),
('Gragas', 53),
('Pantheon', 8),
('Mordekaiser', 76),
('Ezreal', 56),
('Shen', 112),
('Kennen', 54),
('Garen', 37),
('Akali', 61),
('Malzahar', 13),
('Olaf', 27),
('KogMaw', 42),
('XinZhao', 23),
('Vladimir', 83),
('Galio', 131),
('Urgot', 37),
('MissFortune', 101),
('Sona', 161),
('Swain', 54),
('Lux', 99),
('Leblanc', 163),
('Irelia', 72),
('Trundle', 68),
('Cassiopeia', 45),
('Caitlyn', 160),
('Renekton', 29),
('Karma', 168),
('Maokai', 48),
('JarvanIV', 113),
('Nocturne', 151),
('LeeSin', 1),
('Brand', 96),
('Rumble', 57),
('Vayne', 48),
('Orianna', 140),
('Yorick', 30),
('Leona', 41),
('MonkeyKing', 137),
('Skarner', 137),
('Talon', 99),
('Riven', 8),
('Xerath', 107),
('Graves', 12),
('Shyvana', 44),
('Fizz', 116),
('Volibear', 169),
('Ahri', 5),
('Viktor', 139),
('Sejuani', 15),
('Ziggs', 22),
('Nautilus', 123),
('Fiora', 142),
('Lulu', 119),
('Hecarim', 8),
('Varus', 19),
('Darius', 87),
('Draven', 133),
('Jayce', 133),
('Zyra', 5),
('Diana', 2),
('Rengar', 66),
('Syndra', 150),
('Khazix', 75),
('Elise', 154),
('Zed', 116),
('Nami', 136),
('Vi', 122),
('Thresh', 157),
('Quinn', 9),
('Zac', 54),
('Lissandra', 94),
('Aatrox', 99),
('Lucian', 26),
('Jinx', 85),
('Yasuo', 103),
('Velkoz', 111),
('Braum', 165),
('Gnar', 69),
('Azir', 13),
('Kalista', 52),
('RekSai', 39),
('Bard', 64),
('Ekko', 70),
('TahmKench', 33),
('Kindred', 8),
('Illaoi', 4),
('Jhin', 83),
('AurelionSol', 91),
('Taliyah', 129),
('Kled', 126),
('Ivern', 35),
('Camille', 39),
('Rakan', 59),
('Xayah', 106),
('Kayn', 127),
('Ornn', 31),
('Zoe', 123),
('Kaisa', 21),
('Pyke', 23),
('Neeko', 46),
('Sylas', 158),
('Yuumi', 93),
('Qiyana', 15),
('Senna', 9),
('Aphelios', 90),
('Sett', 82),
('Lillia', 19),
('Yone', 65),
('Samira', 110),
('Seraphine', 151),
('Rell', 149),
('Viego', 47),
('Gwen', 42),
('Akshan', 23),
('Vex', 125),
('Zeri', 85),
('Renata', 140),
('Belveth', 56),
('Nilah', 56),
('KSante', 17),
('Milio', 141),
('Naafiri', 145),
('Briar', 60),
('Hwei', 145),
('Smolder', 88),
('Aurora', 88),
('Ambessa', 113),
('Mel', 160);

CREATE TABLE classic_daily (
    id INT AUTO_INCREMENT PRIMARY KEY,
    champion_id INT NOT NULL,
    selected_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(champion_id) REFERENCES champions(id) 
);
