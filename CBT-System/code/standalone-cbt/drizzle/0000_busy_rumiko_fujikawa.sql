CREATE TABLE `admins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_email_unique` ON `admins` (`email`);--> statement-breakpoint
CREATE TABLE `answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`question_id` integer NOT NULL,
	`selected_option` text,
	`answered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `answers_session_question_uq` ON `answers` (`session_id`,`question_id`);--> statement-breakpoint
CREATE TABLE `exams` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`course_code` text NOT NULL,
	`description` text,
	`duration` integer DEFAULT 60 NOT NULL,
	`timer_mode` text DEFAULT 'full_exam' NOT NULL,
	`question_layout` text DEFAULT 'single_question' NOT NULL,
	`question_time_sec` integer DEFAULT 60 NOT NULL,
	`passing_score` integer DEFAULT 50 NOT NULL,
	`max_violations` integer DEFAULT 3 NOT NULL,
	`max_retakes` integer DEFAULT 0 NOT NULL,
	`shuffle_questions` integer DEFAULT false NOT NULL,
	`shuffle_options` integer DEFAULT false NOT NULL,
	`show_result` integer DEFAULT true NOT NULL,
	`allow_mobile` integer DEFAULT true NOT NULL,
	`is_active` integer DEFAULT false NOT NULL,
	`start_window` text,
	`end_window` text,
	`created_by_admin_id` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`created_by_admin_id`) REFERENCES `admins`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `question_images` (
	`id` text PRIMARY KEY NOT NULL,
	`exam_id` text NOT NULL,
	`original_name` text,
	`mime_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`data` blob NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exam_id` text NOT NULL,
	`text` text NOT NULL,
	`image_url` text,
	`option_a` text NOT NULL,
	`option_b` text NOT NULL,
	`option_c` text NOT NULL,
	`option_d` text NOT NULL,
	`correct_option` text NOT NULL,
	`points` integer DEFAULT 1 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `questions_exam_order_idx` ON `questions` (`exam_id`,`sort_order`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`exam_id` text NOT NULL,
	`student_id` integer NOT NULL,
	`attempt_number` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'in_progress' NOT NULL,
	`started_at` text NOT NULL,
	`last_resumed_at` text,
	`paused_at` text,
	`submitted_at` text,
	`remaining_seconds` integer NOT NULL,
	`warning_count` integer DEFAULT 0 NOT NULL,
	`score` integer,
	`total_points` integer,
	`question_timers` text DEFAULT '{}' NOT NULL,
	`question_order` text DEFAULT '[]' NOT NULL,
	`option_order` text DEFAULT '{}' NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`exam_id`) REFERENCES `exams`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`student_id`) REFERENCES `students`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_exam_student_attempt_uq` ON `sessions` (`exam_id`,`student_id`,`attempt_number`);--> statement-breakpoint
CREATE INDEX `sessions_exam_status_idx` ON `sessions` (`exam_id`,`status`);--> statement-breakpoint
CREATE TABLE `students` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`matric_no` text NOT NULL,
	`surname` text NOT NULL,
	`first_name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `students_matric_no_unique` ON `students` (`matric_no`);--> statement-breakpoint
CREATE TABLE `violations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`type` text NOT NULL,
	`metadata` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `violations_session_timestamp_idx` ON `violations` (`session_id`,`timestamp`);