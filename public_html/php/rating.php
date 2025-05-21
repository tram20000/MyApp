<?php
$jsonPath = '../final.json';

$data = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : ['ratings' => []];
$ratings = $data['ratings'];
$count = count($ratings);
$avg = $count ? round(array_sum($ratings) / $count, 2) : 0;

echo "<p style='font-family: sans-serif; font-size: 1rem; margin: 0;'> Average Rating: $avg / 5 ($count vote" . ($count === 1 ? '' : 's') . ")</p>";
?>