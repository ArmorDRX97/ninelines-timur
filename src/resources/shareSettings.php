<?php

$protocol = $_SERVER['PROTOCOL'] = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https' : 'http';
$host = $protocol . '://' . $_SERVER['HTTP_HOST'];
$title = 'Базовый заголовок страницы';
$description = 'Базовое описание страницы';
$image = $host . '/images/logo.png';

$pages = [
	'/test' => [
		'title' => 'Тимур',
		'description' => 'HTML-верстальщик',
		'image' => '/images/logo.png',
	],
];

$page = @$pages[$_SERVER['REQUEST_URI']];

if ($page) {
	$title = !is_null(@$page['title']) ? $page['title'] : $title;
	$description = !is_null(@$page['description']) ? $page['description'] : $description;
	$image = !is_null(@$page['image']) ? $host . $page['image'] : $image;
}

?>
