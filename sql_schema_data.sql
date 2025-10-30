-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.40 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for expense_tracker
CREATE DATABASE IF NOT EXISTS `expense_tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `expense_tracker`;

-- Dumping structure for table expense_tracker.expenses
CREATE TABLE IF NOT EXISTS `expenses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `amount` double NOT NULL DEFAULT (0),
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `expense_date` date NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=796 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense_tracker.expenses: ~90 rows (approximately)
INSERT INTO `expenses` (`id`, `user_id`, `category`, `amount`, `description`, `expense_date`, `created_at`) VALUES
	(627, 25, 'HEALTH', 25, 'Vitamins', '2025-09-19', '2025-09-24 22:03:18'),
	(628, 25, 'FOOD', 22, 'Grocery shopping', '2025-09-19', '2025-09-24 22:03:18'),
	(629, 26, 'HEALTH', 60, 'Therapy session', '2025-09-19', '2025-09-24 22:03:18'),
	(630, 26, 'FOOD', 5.9, 'Lunch snack', '2025-09-19', '2025-09-24 22:03:18'),
	(631, 26, 'HEALTH', 12.99, 'Yoga class', '2025-09-19', '2025-09-24 22:03:18'),
	(632, 26, 'FOOD', 28.5, 'Restaurant meal', '2025-09-19', '2025-09-24 22:03:18'),
	(633, 26, 'HEALTH', 20, 'Medication', '2025-09-19', '2025-09-24 22:03:18'),
	(634, 26, 'FOOD', 11.1, 'Smoothie', '2025-09-19', '2025-09-24 22:03:18'),
	(635, 26, 'HEALTH', 55, 'Chiropractic visit', '2025-09-19', '2025-09-24 22:03:18'),
	(636, 26, 'FOOD', 26.3, 'Takeout', '2025-09-19', '2025-09-24 22:03:18'),
	(637, 26, 'HEALTH', 18.5, 'Massage therapy', '2025-09-19', '2025-09-24 22:03:18'),
	(638, 25, 'FOOD', 14.2, 'Sandwich', '2025-09-19', '2025-09-24 22:03:18'),
	(639, 26, 'FOOD', 22, 'Supplements', '2025-09-19', '2025-09-24 22:03:18'),
	(640, 25, 'FOOD', 19.9, 'Food delivery', '2025-09-19', '2025-09-24 22:03:18'),
	(641, 26, 'HEALTH', 45, 'Mental health consultation', '2025-09-19', '2025-09-24 22:03:18'),
	(642, 26, 'FOOD', 13, 'Bakery items', '2025-09-19', '2025-09-24 22:03:18'),
	(643, 26, 'HEALTH', 32, 'Physical therapy', '2025-09-19', '2025-09-24 22:03:18'),
	(644, 25, 'FOOD', 21.8, 'Restaurant brunch', '2025-09-19', '2025-09-24 22:03:18'),
	(645, 26, 'HEALTH', 10.5, 'Sleep aid', '2025-09-19', '2025-09-24 22:03:18'),
	(648, 25, 'GIFT', 500, 'to my friend', '2025-09-18', '2025-09-27 05:36:09'),
	(671, 25, 'FOOD', 450.75, 'Dinner at local restaurant with friends.', '2025-10-02', '2025-10-24 14:35:27'),
	(678, 25, 'FOOD', 180, 'Lunch with team at cafe downtown.', '2025-10-09', '2025-10-24 14:35:27'),
	(679, 25, 'HEALTH', 100, 'Monthly gym subscription renewal.', '2025-10-10', '2025-10-24 14:35:27'),
	(685, 25, 'FOOD', 420.5, 'Dinner at restaurant with family and friends.', '2020-01-15', '2025-10-24 14:37:22'),
	(686, 25, 'HEALTH', 980, 'Purchased medicines and regular health check.', '2020-02-20', '2025-10-24 14:37:22'),
	(687, 25, 'GIFT', 750.25, 'Bought birthday gift for close friend.', '2020-03-10', '2025-10-24 14:37:22'),
	(688, 25, 'EDUCATION', 1550, 'Online Java certification course enrolled.', '2020-04-12', '2025-10-24 14:37:22'),
	(689, 25, 'INVEST', 3000, 'Invested in new mutual fund portfolio.', '2020-05-21', '2025-10-24 14:37:22'),
	(690, 25, 'MOVIE', 350, 'Watched latest blockbuster movie night.', '2020-06-17', '2025-10-24 14:37:22'),
	(691, 25, 'TRAVEL', 2400.5, 'Weekend trip to nearby hill station.', '2020-07-03', '2025-10-24 14:37:22'),
	(692, 25, 'FARMING', 870, 'Bought fertilizer and farm maintenance tools.', '2020-08-09', '2025-10-24 14:37:22'),
	(693, 25, 'FOOD', 560, 'Lunch at work cafeteria and snacks.', '2020-09-13', '2025-10-24 14:37:22'),
	(694, 25, 'HEALTH', 450, 'Monthly gym membership renewal payment.', '2020-10-08', '2025-10-24 14:37:22'),
	(695, 25, 'EDUCATION', 1800, 'Purchased new study materials online.', '2020-11-14', '2025-10-24 14:37:22'),
	(696, 25, 'TRAVEL', 3100, 'Trip to Goa with college friends group.', '2020-12-21', '2025-10-24 14:37:22'),
	(697, 25, 'MOVIE', 280, 'Evening cinema show and popcorn snacks.', '2021-01-11', '2025-10-24 14:37:22'),
	(699, 25, 'FOOD', 470.75, 'Dinner at roadside restaurant near office.', '2021-03-19', '2025-10-24 14:37:22'),
	(700, 25, 'HEALTH', 1150, 'Full body checkup at city hospital.', '2021-04-04', '2025-10-24 14:37:22'),
	(701, 25, 'FARMING', 690, 'Bought organic compost and seeds.', '2021-05-23', '2025-10-24 14:37:22'),
	(702, 25, 'GIFT', 830.5, 'Bought wedding gift for relative.', '2021-06-10', '2025-10-24 14:37:22'),
	(703, 25, 'EDUCATION', 1450, 'Enrolled for spring online session.', '2021-07-15', '2025-10-24 14:37:22'),
	(704, 25, 'TRAVEL', 2300, 'Road trip to nearby tourist destination.', '2021-08-06', '2025-10-24 14:37:22'),
	(705, 25, 'FOOD', 600, 'Weekend dinner outing with old friends.', '2021-09-22', '2025-10-24 14:37:22'),
	(706, 25, 'MOVIE', 250, 'Watched animated movie with cousins.', '2021-10-09', '2025-10-24 14:37:22'),
	(707, 25, 'INVEST', 2800, 'SIP investment through online platform.', '2021-11-02', '2025-10-24 14:37:22'),
	(708, 25, 'GIFT', 960, 'Bought anniversary gift for parents.', '2021-12-14', '2025-10-24 14:37:22'),
	(709, 25, 'HEALTH', 700, 'Dentist visit and minor medication.', '2022-01-08', '2025-10-24 14:37:22'),
	(710, 25, 'FARMING', 900, 'Bought new garden tools and manure.', '2022-02-20', '2025-10-24 14:37:22'),
	(711, 25, 'FOOD', 550, 'Breakfast and coffee with team.', '2022-03-12', '2025-10-24 14:37:22'),
	(712, 25, 'EDUCATION', 1750, 'Attended online technical bootcamp.', '2022-04-18', '2025-10-24 14:37:22'),
	(713, 25, 'TRAVEL', 2600, 'Flight tickets for holiday vacation.', '2022-05-03', '2025-10-24 14:37:22'),
	(714, 25, 'MOVIE', 320, 'Movie and snacks at evening show.', '2022-06-09', '2025-10-24 14:37:22'),
	(716, 25, 'GIFT', 880, 'Farewell gift for colleague leaving office.', '2022-08-07', '2025-10-24 14:37:22'),
	(717, 25, 'FOOD', 440, 'Dinner and drinks after office work.', '2022-09-12', '2025-10-24 14:37:22'),
	(718, 25, 'HEALTH', 1250, 'Purchased new health insurance policy.', '2022-10-05', '2025-10-24 14:37:22'),
	(719, 25, 'EDUCATION', 1600, 'Bought course for Flutter mobile dev.', '2022-11-19', '2025-10-24 14:37:22'),
	(720, 25, 'TRAVEL', 2900, 'Weekend long drive to mountain area.', '2022-12-03', '2025-10-24 14:37:22'),
	(721, 25, 'FARMING', 800, 'Repaired water pipe for irrigation use.', '2023-01-10', '2025-10-24 14:37:22'),
	(722, 25, 'MOVIE', 260, 'Evening movie show with family.', '2023-02-11', '2025-10-24 14:37:22'),
	(723, 25, 'INVEST', 3200, 'Increased SIP contribution monthly.', '2023-03-20', '2025-10-24 14:37:22'),
	(724, 25, 'GIFT', 780, 'Birthday gift for office teammate.', '2023-04-02', '2025-10-24 14:37:22'),
	(725, 25, 'HEALTH', 500, 'Monthly gym workout membership renewal.', '2023-05-11', '2025-10-24 14:37:22'),
	(726, 25, 'FOOD', 680, 'Dinner and desserts at nearby cafe.', '2023-06-05', '2025-10-24 14:37:22'),
	(728, 25, 'EDUCATION', 1500, 'Online data structures practice course.', '2023-08-21', '2025-10-24 14:37:22'),
	(729, 25, 'INVEST', 2500, 'Invested in short-term fixed deposit.', '2023-09-13', '2025-10-24 14:37:22'),
	(730, 25, 'MOVIE', 310, 'Watched thriller movie Saturday night.', '2023-10-02', '2025-10-24 14:37:22'),
	(731, 25, 'FARMING', 970, 'New soil testing kit and accessories.', '2023-11-06', '2025-10-24 14:37:22'),
	(732, 25, 'GIFT', 1050, 'Bought New Year gifts for friends.', '2023-12-20', '2025-10-24 14:37:22'),
	(733, 25, 'FOOD', 520, 'Evening snacks and street food treats.', '2024-01-05', '2025-10-24 14:37:22'),
	(734, 25, 'HEALTH', 800, 'Yoga class fees and mat purchased.', '2024-02-17', '2025-10-24 14:37:22'),
	(735, 25, 'TRAVEL', 3100, 'Trip to Kerala for summer vacation.', '2024-03-08', '2025-10-24 14:37:22'),
	(736, 25, 'EDUCATION', 1750, 'Advanced Angular development course.', '2024-04-02', '2025-10-24 14:37:22'),
	(737, 25, 'INVEST', 2800, 'Mutual fund lump sum purchase.', '2024-05-19', '2025-10-24 14:37:22'),
	(738, 25, 'FARMING', 760, 'Bought pest control materials.', '2024-06-09', '2025-10-24 14:37:22'),
	(739, 25, 'MOVIE', 270, 'Family movie night at theater.', '2024-07-15', '2025-10-24 14:37:22'),
	(740, 25, 'GIFT', 900, 'Gift for friend’s housewarming event.', '2024-08-02', '2025-10-24 14:37:22'),
	(741, 25, 'FOOD', 470, 'Breakfast buffet with family weekend.', '2024-09-18', '2025-10-24 14:37:22'),
	(742, 25, 'HEALTH', 1100, 'Blood test and medicines purchased.', '2024-10-22', '2025-10-24 14:37:22'),
	(743, 25, 'EDUCATION', 1950, 'Purchased premium learning course pack.', '2024-11-06', '2025-10-24 14:37:22'),
	(744, 25, 'TRAVEL', 2750, 'Weekend trip to coastal area resort.', '2024-12-01', '2025-10-24 14:37:22'),
	(745, 25, 'FOOD', 600, 'Had dinner with old friends reunion.', '2025-01-07', '2025-10-24 14:37:22'),
	(746, 25, 'MOVIE', 330, 'Evening action movie with colleagues.', '2025-02-14', '2025-10-24 14:37:22'),
	(748, 25, 'FARMING', 880, 'Bought organic manure for small farm.', '2025-04-10', '2025-10-24 14:37:22'),
	(749, 25, 'HEALTH', 950, 'Yearly doctor consultation and check.', '2025-05-20', '2025-10-24 14:37:22'),
	(750, 25, 'GIFT', 870, 'Bought surprise gift for best friend.', '2025-06-06', '2025-10-24 14:37:22'),
	(752, 25, 'EDUCATION', 1850, 'Enrolled in cloud computing course.', '2025-08-08', '2025-10-24 14:37:22'),
	(753, 25, 'FOOD', 520, 'Lunch and drinks at work party.', '2025-09-12', '2025-10-24 14:37:22'),
	(766, 25, 'EDUCATION', 200, 'Bought a Book for Computer Science', '2025-10-21', '2025-10-29 17:16:38'),
	(767, 25, 'INVEST', 400, 'Investment in Stocks.', '2025-10-07', '2025-10-30 02:49:29'),
	(768, 25, 'HEALTH', 150, 'Bought medicine for fever', '2025-10-01', '2025-10-30 03:24:21'),
	(769, 25, 'GIFT', 300, 'Giving a gift to my girlfriend for his birthday.', '2025-10-03', '2025-10-30 03:25:12'),
	(770, 25, 'EDUCATION', 500, 'Tuition fee for mathematics.', '2025-10-05', '2025-10-30 03:25:55'),
	(771, 25, 'MOVIE', 210, 'Watching Kantara Chapter-1 in PVR', '2025-10-06', '2025-10-30 03:26:42'),
	(772, 25, 'TRAVEL', 200, 'Travelling to see Ganesh Puja', '2025-10-11', '2025-10-30 03:27:42'),
	(773, 25, 'FARMING', 300, 'Bought rice seeds for cultivating in my field.', '2025-10-13', '2025-10-30 03:28:24'),
	(774, 25, 'BILLS', 150, 'Electricity Bills.', '2025-10-13', '2025-10-30 03:28:56'),
	(775, 25, 'FOOD', 350, 'Chicken', '2025-10-15', '2025-10-30 03:33:28'),
	(776, 25, 'GIFT', 600, 'Birthday gift to a Raghu.', '2025-10-16', '2025-10-30 03:34:08'),
	(777, 25, 'EDUCATION', 50, 'Bought Pen Packet.', '2025-10-17', '2025-10-30 03:34:32'),
	(778, 25, 'INVEST', 100, '', '2025-10-18', '2025-10-30 03:35:03'),
	(779, 25, 'MOVIE', 80, 'Bought a water bottle and a parking ticket', '2025-10-20', '2025-10-30 03:35:43'),
	(780, 25, 'TRAVEL', 450, 'Book Tatkal tickets for my parents.', '2025-10-24', '2025-10-30 03:36:15'),
	(781, 25, 'BILLS', 420, 'Credit card bills', '2025-10-22', '2025-10-30 03:36:44'),
	(782, 25, 'FARMING', 500, 'Harvesting Crops', '2025-10-25', '2025-10-30 03:37:12'),
	(783, 25, 'BILLS', 200, 'Gas', '2025-10-26', '2025-10-30 03:37:41'),
	(784, 25, 'FOOD', 200, 'Bought Vegetables.', '2025-10-27', '2025-10-30 03:38:08'),
	(785, 25, 'HEALTH', 350, 'Bought fruits', '2025-10-28', '2025-10-30 03:39:01'),
	(786, 25, 'BILLS', 120, 'Professional Tax', '2025-10-30', '2025-10-30 03:39:29'),
	(787, 25, 'HEALTH', 5000, 'Medicine', '2025-09-15', '2025-10-30 03:41:46'),
	(788, 25, 'EDUCATION', 6000, 'College Fees.', '2025-08-16', '2025-10-30 03:42:11'),
	(789, 25, 'INVEST', 7000, 'SEBI', '2025-07-30', '2025-10-30 03:42:34'),
	(790, 25, 'TRAVEL', 3000, NULL, '2025-06-30', '2025-10-30 03:42:50'),
	(791, 25, 'FARMING', 6000, NULL, '2025-05-30', '2025-10-30 03:43:02'),
	(792, 25, 'FOOD', 4000, '', '2025-04-30', '2025-10-30 03:43:25'),
	(793, 25, 'EDUCATION', 4000, NULL, '2025-03-30', '2025-10-30 03:43:40'),
	(794, 25, 'INVEST', 4500, NULL, '2025-02-28', '2025-10-30 03:43:57'),
	(795, 25, 'FARMING', 3500, NULL, '2025-01-30', '2025-10-30 03:44:24');

-- Dumping structure for table expense_tracker.password_reset_token
CREATE TABLE IF NOT EXISTS `password_reset_token` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  `expiry_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_password_reset_user` (`user_id`),
  CONSTRAINT `fk_password_reset_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense_tracker.password_reset_token: ~36 rows (approximately)
INSERT INTO `password_reset_token` (`id`, `token`, `user_id`, `expiry_date`) VALUES
	(16, '75915376-3ba9-465c-8e17-bac23275ffb5', 25, '2025-10-18 19:50:57'),
	(17, '370477a4-ae36-4cce-b356-122fdfa5bf41', 26, '2025-09-19 20:38:45'),
	(18, '39945231-58e1-4f72-a606-3aab9a414ec6', 27, '2025-09-20 17:25:00'),
	(20, 'a441b9e9-f147-4a0d-9c0e-0e7db11ecae4', 59, '2025-09-26 20:02:56'),
	(21, '9829e42e-1411-4b10-8c12-fd448636bdbd', 60, '2025-09-26 20:04:57'),
	(22, '309de3c1-01f9-467f-b284-bbee68e064a5', 61, '2025-09-26 20:05:42'),
	(23, '7bd07692-623c-423a-a3b3-76b5bcb18e80', 64, '2025-09-26 20:17:45'),
	(24, '5bf9c1b4-4ca4-43cf-add8-f77ff286a7f4', 68, '2025-09-26 20:22:53'),
	(25, '3f1a3f1f-a1bd-4183-8a01-ad801ee35bba', 73, '2025-09-26 20:33:56'),
	(26, '8f8555aa-f2bf-4c9f-8602-540e2b0ea800', 75, '2025-09-26 20:34:55'),
	(27, 'ea05cad9-0760-4a31-8a62-92f6c46664e1', 76, '2025-09-26 20:38:14'),
	(28, '16da8856-eb77-4fc7-b863-faefe5e42f3b', 77, '2025-09-27 11:17:31'),
	(29, 'cd92d84c-be9c-49b8-baf6-1ed4507e18b5', 78, '2025-09-27 11:17:52'),
	(30, '066f8bca-fd50-4401-b8f0-3ce6a23a088a', 79, '2025-09-27 11:19:09'),
	(31, '5fd6eba7-6552-47ba-929b-0c6a6427ca55', 80, '2025-09-27 11:22:14'),
	(32, 'f9f04a76-2700-4a64-88f2-63f320aaa45a', 85, '2025-09-27 11:28:06'),
	(33, 'cd247bf0-a9e8-4c6e-bb73-e47dc6ae0c49', 86, '2025-09-27 11:28:20'),
	(34, '01f880ce-07ef-4455-917f-4ba103796c34', 87, '2025-09-27 11:28:55'),
	(35, '883569e3-9495-43e8-8b03-70a93f7371ec', 94, '2025-09-27 11:54:08'),
	(36, 'f73c1a76-591d-49d1-8a33-a45d68440cd1', 95, '2025-09-27 11:54:33'),
	(37, '6e7bb113-5263-46c8-99c6-b315f6fbd7c1', 96, '2025-09-27 11:59:04'),
	(38, '680b077a-0cbf-4ea4-aae3-c504d764a246', 97, '2025-09-27 12:06:09'),
	(39, '226bfa6c-3f51-4002-9839-40250af5883a', 98, '2025-09-27 12:06:59'),
	(40, '61231aa4-6fd6-493b-ab48-ca06a1cd4e48', 99, '2025-09-27 12:14:15'),
	(41, 'beacca28-743e-4ec3-9b9d-afff1a279c59', 100, '2025-09-27 21:38:22'),
	(42, '09769604-45e0-41e3-9605-23ea7dbe0061', 101, '2025-09-27 21:39:29'),
	(43, '55996a4e-97d8-4455-9514-58b13301ede2', 102, '2025-09-27 21:40:47'),
	(44, '564f59da-8078-42d8-a1b7-e94120420bea', 103, '2025-09-27 21:49:15'),
	(45, '8649e79e-f381-410e-92e2-aaecc1c8938d', 104, '2025-09-27 21:50:48'),
	(46, 'fcdb6a16-dac5-44bb-84fb-fef1c7de6886', 105, '2025-09-27 21:56:37'),
	(47, '4e9c8a0d-7465-4b60-a293-098240656253', 106, '2025-09-27 22:00:57'),
	(48, '69b9b48c-808f-48bb-bba4-d8663b7dba26', 108, '2025-10-18 19:41:58'),
	(49, '861241c0-3949-4a81-b150-6d3e5e795095', 110, '2025-10-18 19:44:49'),
	(50, '61bdcedf-44b0-49b7-abba-bec467535b31', 111, '2025-10-18 19:45:03'),
	(51, 'efd7ca8c-ae98-41ad-8baf-732d150d4d67', 112, '2025-10-20 10:33:08'),
	(52, '6d9ca00f-6cc3-4204-948b-61e490d60730', 114, '2025-10-20 10:40:38'),
	(53, 'dd4cc501-3b36-49ac-97c1-b18e9d3091a7', 115, '2025-10-20 10:48:40'),
	(54, 'ef65fe8c-a886-480b-a0d6-1919ba5334f9', 116, '2025-10-20 10:51:44'),
	(55, '4828700f-7aef-4e01-b426-ca0b6d9709a6', 117, '2025-10-20 10:57:01'),
	(56, 'f0a192b1-77d6-4c0c-88bb-27b8640330b4', 118, '2025-10-20 10:58:10');

-- Dumping structure for procedure expense_tracker.seed_expenses
DELIMITER //
CREATE PROCEDURE `seed_expenses`()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE categories VARCHAR(20);
    DECLARE descriptions TEXT;
    DECLARE expenseDate DATE;

    WHILE i <= 500 DO
        -- Pick random category
        SET categories = ELT(FLOOR(1 + RAND() * 7), 'FOOD', 'HEALTH', 'TRAVEL', 'EDUCATION', 'GIFT', 'BILLS', 'OTHERS');
        
        -- Pick random description
        SET descriptions = CASE categories
            WHEN 'FOOD' THEN ELT(FLOOR(1 + RAND() * 5), 'Lunch', 'Dinner', 'Snacks', 'Groceries', 'Coffee')
            WHEN 'HEALTH' THEN ELT(FLOOR(1 + RAND() * 5), 'Doctor visit', 'Gym', 'Medicine', 'Insurance', 'Therapy')
            WHEN 'TRAVEL' THEN ELT(FLOOR(1 + RAND() * 5), 'Flight ticket', 'Hotel', 'Taxi', 'Fuel', 'Train ticket')
            WHEN 'EDUCATION' THEN ELT(FLOOR(1 + RAND() * 5), 'Books', 'Course fee', 'Workshop', 'Exam fee', 'Stationery')
            WHEN 'GIFT' THEN ELT(FLOOR(1 + RAND() * 5), 'Birthday gift', 'Anniversary gift', 'Wedding gift', 'Festive gift', 'Charity')
            WHEN 'BILLS' THEN ELT(FLOOR(1 + RAND() * 5), 'Electricity bill', 'Water bill', 'Internet bill', 'Mobile bill', 'Gas bill')
            ELSE ELT(FLOOR(1 + RAND() * 5), 'Misc expense', 'Repair', 'Donation', 'Entertainment', 'Shopping')
        END;

        -- Random date between 2022-01-01 and 2025-12-31
        SET expenseDate = DATE_ADD('2022-01-01', INTERVAL FLOOR(RAND() * 1461) DAY);

        INSERT INTO expenses (user_id, category, amount, description, expense_date, created_at)
        VALUES (
            23,
            categories,
            ROUND((RAND() * 500) + 5, 2), -- amount between 5 and 505
            descriptions,
            expenseDate,
            NOW()
        );

        SET i = i + 1;
    END WHILE;
END//
DELIMITER ;

-- Dumping structure for table expense_tracker.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` enum('USER','ADMIN') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT (now()),
  `lastname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `zipcode` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profession` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_agree_TOS` tinyint NOT NULL,
  `is_active` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table expense_tracker.users: ~89 rows (approximately)
INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `lastname`, `phone`, `firstname`, `zipcode`, `profession`, `is_agree_TOS`, `is_active`) VALUES
	(25, 'deepak@gmail.com', '$2a$12$pehJbhpPNTsYcgkfXtJPb.ht6C46SlYc4coARWL5My24d9HgH3Yai', 'ADMIN', '2025-09-18 14:56:07', 'Nayak', '9876543210', 'Deepak', '756023', 'Senior Software Developer', 0, 1),
	(26, 'deepaknayak@gmail.com', '$2a$12$75ahOO4r.TwHjENw0Gxuve5p9Ksx60AfIOeQkKBUybQHjr97Rr2Ym', 'USER', '2025-09-18 15:08:45', 'Nayak.', '9876543210', 'Deepak', '751001', 'Software Developers', 0, 1),
	(27, 'deepaknayak55260@gmail.com', '', 'USER', '2025-09-19 11:55:00', 'Nayak', '07894541864', 'Deepak', '751024', '', 0, 1),
	(28, 'user1@gmail.com', 'pass123', 'ADMIN', '2025-09-21 15:18:14', 'Smith', '9876543210', 'John', '560001', 'Engineer', 1, 1),
	(29, 'user2@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Johnson', '9876543211', 'Alice', '560002', 'Doctor', 1, 0),
	(30, 'user3@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Williams', '9876543212', 'Bob', '560003', 'Teacher', 0, 1),
	(31, 'user4@gmail.com', 'pass123', 'ADMIN', '2025-09-21 15:18:14', 'Brown', '9876543213', 'Emma', '560004', 'Manager', 1, 1),
	(32, 'user5@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Jones', '9876543214', 'Liam', '560005', 'Designer', 1, 1),
	(33, 'user6@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Garci', '9876543215', 'Sophia', '560006', 'Developer', 1, 1),
	(34, 'user7@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Miller', '9876543216', 'Noah', '560007', 'Nurse', 0, 0),
	(35, 'user8@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Davis', '9876543217', 'Olivia', '560008', 'Architect', 1, 0),
	(36, 'user9@gmail.com', 'pass123', 'ADMIN', '2025-09-21 15:18:14', 'Rodriguez', '9876543218', 'James', '560009', 'Writer', 1, 1),
	(37, 'user10@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Martinez', '9876543219', 'Isabella', '560010', 'Lawyer', 1, 1),
	(38, 'user11@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Hernandez', '9876543220', 'Ethan', '560011', 'Artist', 0, 1),
	(39, 'user12@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Lopez', '9876543221', 'Mia', '560012', 'Chef', 1, 1),
	(40, 'user13@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Gonzalez', '9876543222', 'Lucas', '560013', 'Farmer', 1, 1),
	(41, 'user14@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Wilson', '9876543223', 'Charlotte', '560014', 'Student', 1, 1),
	(42, 'user15@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Anderson', '9876543224', 'Mason', '560015', 'Pilot', 1, 1),
	(43, 'user16@gmail.com', 'pass123', 'ADMIN', '2025-09-21 15:18:14', 'Thomas', '9876543225', 'Amelia', '560016', 'Scientist', 1, 1),
	(44, 'user17@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Taylor', '9876543226', 'Benjamin', '560017', 'Accountant', 0, 1),
	(45, 'user18@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Moore', '9876543227', 'Harper', '560018', 'Dentist', 1, 1),
	(46, 'user19@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Jackson', '9876543228', 'Elijah', '560019', 'Technician', 1, 1),
	(47, 'user20@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Martin', '9876543229', 'Ava', '560020', 'Consultant', 1, 1),
	(48, 'user21@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Lee', '9876543230', 'Daniel', '560021', 'Professor', 0, 1),
	(49, 'user22@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Perez', '9876543231', 'Chloe', '560022', 'Singer', 1, 0),
	(50, 'user23@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'White', '9876543232', 'Matthew', '560023', 'Actor', 1, 1),
	(51, 'user24@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Harris', '9876543233', 'Grace', '560024', 'Engineer', 1, 1),
	(52, 'user25@gmail.com', 'pass123', 'ADMIN', '2025-09-21 15:18:14', 'Clark', '9876543234', 'Henry', '560025', 'Doctor', 1, 0),
	(53, 'user26@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Lewis', '9876543235', 'Ella', '560026', 'Designer', 1, 0),
	(54, 'user27@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Robinson', '9876543236', 'Jack', '560027', 'Teacher', 0, 0),
	(55, 'user28@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Walker', '9876543237', 'Lily', '560028', 'Manager', 1, 0),
	(56, 'user29@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Allen', '9876543238', 'Samuel', '560029', 'Developer', 1, 1),
	(57, 'user30@gmail.com', 'pass123', 'USER', '2025-09-21 15:18:14', 'Young', '9876543239', 'Zoe', '560030', 'Nurse', 1, 0),
	(59, 'nayak@gmail.com', '', 'USER', '2025-09-25 14:32:55', '', '7894541864', 'nayak', '', '', 0, 1),
	(60, 'nayak1@gmail.com', '', 'USER', '2025-09-25 14:34:57', '', '78', 'nayak1', '', '', 1, 1),
	(61, 'nayak2@gmail.com', '', 'USER', '2025-09-25 14:35:42', '', '87', 'nayak2', '', '', 0, 1),
	(62, 'nayak4@gmail.com', NULL, 'USER', '2025-09-25 14:46:04', 'Nayak', '07894541864', 'nayak4', '751024', NULL, 1, 1),
	(63, 'nayak5@gmail.com', NULL, 'USER', '2025-09-25 14:46:30', NULL, '87', 'nayak5', NULL, NULL, 1, 1),
	(64, 'nayak7@gmail.com', '', 'USER', '2025-09-25 14:47:44', '', '12', 'nayak7', '', '', 0, 1),
	(65, 'nayak9@gmail.com', NULL, 'USER', '2025-09-25 14:48:56', NULL, '21', 'nayak9', NULL, NULL, 0, 1),
	(66, 'deepak5@gmail.com', NULL, 'USER', '2025-09-25 14:50:06', NULL, '2', 'deepak523', '756023', NULL, 0, 1),
	(68, 'hfdiuyeriu@gmail.com', '', 'USER', '2025-09-25 14:52:53', '', '1234567890', 'hfdiuyeriufgs', '', '', 0, 1),
	(69, 'hdfghfd@gmail.com', NULL, 'USER', '2025-09-25 14:54:00', NULL, '321', 'hdfghfd', NULL, NULL, 0, 1),
	(70, 'hkjfdshgh@gmail.com', NULL, 'USER', '2025-09-25 14:54:32', NULL, '4561237890', 'hkjfdshgh', NULL, NULL, 0, 1),
	(71, 'hsdjkfghs@gmail.com', NULL, 'USER', '2025-09-25 14:58:53', NULL, '1236874985', 'hsdjkfghs', NULL, NULL, 0, 1),
	(72, 'lkjhgfd@gmail.com', NULL, 'USER', '2025-09-25 14:59:45', NULL, '54', 'lkjhgfd', NULL, NULL, 0, 1),
	(73, 'asdfjkl@gmail.com', '', 'USER', '2025-09-25 15:03:56', '', '7894541864', 'asdfjkl', '', '', 0, 0),
	(75, 'hfasjkdfgh@gmail.com', '', 'USER', '2025-09-25 15:04:55', '', '7894541864', 'hfasjkdfghasd', '', '', 0, 1),
	(76, 'ljkghfsdujkgh@gmail.com', '', 'USER', '2025-09-25 15:08:14', '', '7894541864', 'ljkghfsdujkgh', '', '', 0, 1),
	(77, 'deep@gmail.com', '$2a$12$pehJbhpPNTsYcgkfXtJPb.ht6C46SlYc4coARWL5My24d9HgH3Yai', 'ADMIN', '2025-09-26 05:47:31', 'Nayak', '9876543210', 'Deepak', '751001', 'Software Developer', 1, 1),
	(78, 'deepa@gmail.com', '$2a$12$pehJbhpPNTsYcgkfXtJPb.ht6C46SlYc4coARWL5My24d9HgH3Yai', 'ADMIN', '2025-09-26 05:47:52', 'Nayak', '9876543210', 'Deepak', '751001', 'Software Developer', 1, 1),
	(79, 'deepajfhd@gmail.com', '$2a$12$pehJbhpPNTsYcgkfXtJPb.ht6C46SlYc4coARWL5My24d9HgH3Yai', 'USER', '2025-09-26 05:49:08', 'Nayak', '9876543210', 'Deepak', '751001', 'Software Developer', 1, 1),
	(80, 'sameer@gmail.com', '', 'USER', '2025-09-26 05:52:13', 'pradhan', '7894541864', 'sameer', '', 'Mechanics', 0, 1),
	(81, 'soumya@gmail.com', NULL, 'USER', '2025-09-26 05:53:04', 'Majhi', '7894541864', 'Soumya', NULL, 'Networking Engineer', 0, 1),
	(82, 'soumya1@gmail.com', NULL, 'ADMIN', '2025-09-26 05:56:42', 'Majhi', '9876543210', 'Soumya', NULL, 'Software Developer', 1, 1),
	(83, 'soumya132@gmail.com', NULL, 'USER', '2025-09-26 05:56:58', 'Majhi', '9876543210', 'Soumya', NULL, 'Software Developer', 1, 1),
	(84, 'soumya1325@gmail.com', NULL, 'USER', '2025-09-26 05:57:20', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 0),
	(85, 'soumya132576@gmail.com', 'null', 'USER', '2025-09-26 05:58:06', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(86, 'soumya13257632@gmail.com', 'null', 'USER', '2025-09-26 05:58:20', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(87, 'soumya1325763223@gmail.com', '', 'USER', '2025-09-26 05:58:55', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(88, 'soumya13257632rt23@gmail.com', NULL, 'USER', '2025-09-26 05:59:22', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(89, 'soumya13257632rfgdt23@gmail.com', NULL, 'USER', '2025-09-26 06:08:11', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(90, 'soumyamajhi@gmail.com', NULL, 'USER', '2025-09-26 06:09:37', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(91, 'soumyamajhi123@gmail.com', NULL, 'USER', '2025-09-26 06:11:17', 'Majhi', '9876543210', 'Soumya', '756023', 'Software Developer', 1, 1),
	(92, 'souhiuui@gmail.com', NULL, 'USER', '2025-09-26 06:15:37', NULL, '546', 'souhiuui', NULL, NULL, 0, 1),
	(93, 'djfhauif@gmail.com', NULL, 'USER', '2025-09-26 06:15:57', NULL, '789564', 'djfhauif', NULL, NULL, 0, 1),
	(94, 'deehjfdh@gmail.com', '', 'USER', '2025-09-26 06:24:07', '', '64874', 'deehjfdh', '', '', 0, 1),
	(95, 'sdfgdfhj@gmail.com', NULL, 'USER', '2025-09-26 06:24:32', NULL, '654694', 'sdfgdfhj', NULL, NULL, 0, 1),
	(96, 'dsjkffjg@gmail.com', NULL, 'USER', '2025-09-26 06:29:04', NULL, '6544', 'fhuisfhg', NULL, NULL, 0, 1),
	(97, 'fghjuhgfruikh@gmail.com', NULL, 'USER', '2025-09-26 06:36:08', NULL, '5789', 'fghjuhgfruikh', NULL, NULL, 0, 1),
	(98, 'dhjdhsgfikuh@gmail.com', NULL, 'USER', '2025-09-26 06:36:58', NULL, '4654', 'dhjdhsgfikuh', NULL, NULL, 1, 1),
	(99, 'fbhadkjhb@gmail.com', '', 'USER', '2025-09-26 06:44:15', '', '75624', 'fbhadkjhb', '', '', 0, 1),
	(100, 'swaraj@gmail.com', NULL, 'USER', '2025-09-26 16:08:22', NULL, '7797', 'swaraj', NULL, NULL, 1, 1),
	(101, 'swaraj1@gmail.com', NULL, 'USER', '2025-09-26 16:09:29', NULL, '6578', 'swaraj1', NULL, NULL, 1, 1),
	(102, 'swaraj12@gmail.com', NULL, 'USER', '2025-09-26 16:10:46', NULL, '12', 'swaraj12', NULL, NULL, 1, 1),
	(103, 'swaraj1234@gmail.com', '', 'USER', '2025-09-26 16:19:15', '', '1234', 'swaraj1234', '', '', 1, 1),
	(104, 'swaraj12345@gmail.com', '', 'USER', '2025-09-26 16:20:48', '', '4654', 'swaraj12345', '', '', 1, 1),
	(105, 'jhafgdfhuugt@gmail.com', NULL, 'USER', '2025-09-26 16:26:36', NULL, '5687', 'jhafgdfhuugt', NULL, NULL, 1, 0),
	(106, 'dhahguikjfhd@gmail.com', '', 'USER', '2025-09-26 16:30:57', '', '4787897', 'dhahguikjfhd', '', '', 1, 0),
	(107, 'swarajdemo@gmail.com', NULL, 'USER', '2025-10-17 14:07:02', 'Mishra', '7894541864', 'Swaraj', '756044', 'Software Engineer', 1, 0),
	(108, 'swarajdemo1@gmail.com', '', 'USER', '2025-10-17 14:11:58', 'Mishra', '7894541864', 'Swaraj', '756044', 'Software Engineer', 1, 0),
	(109, 'deepaknayak5526054@gmail.com', NULL, 'USER', '2025-10-17 14:12:35', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0),
	(110, 'swarajdemo4@gmail.com', NULL, 'USER', '2025-10-17 14:14:49', 'Mishra', '7894541864', 'Swaraj', '751024', 'Software Engineer', 1, 0),
	(111, 'deepaknayak55260123454@gmail.com', NULL, 'USER', '2025-10-17 14:15:03', 'Nayak', '07894541864', 'Deepak', '411057', 'Software Engineer', 1, 0),
	(112, 'deepaknayak5@gmail.com', '', 'USER', '2025-10-19 05:03:08', 'Nayak', '07894541864', 'Deepak', '751024', '', 1, 0),
	(113, 'deepaknayak55@gmail.com', NULL, 'USER', '2025-10-19 05:05:39', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0),
	(114, 'deepaknayak560@gmail.com', NULL, 'USER', '2025-10-19 05:10:37', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0),
	(115, 'deepaknayak0@gmail.com', NULL, 'USER', '2025-10-19 05:18:40', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0),
	(116, 'deepaknayak3425@gmail.com', NULL, 'USER', '2025-10-19 05:20:28', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0),
	(117, 'deepakna@gmail.com', '$2a$12$S34Yht.fBtx9scazXCCI7.FxK/DWILQrTiah2J5igBbLRJb/Twjr6', 'USER', '2025-10-19 05:27:01', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0),
	(118, 'deepaknay@gmail.com', NULL, 'USER', '2025-10-19 05:28:09', 'Nayak', '07894541864', 'Deepak', '751024', NULL, 1, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
