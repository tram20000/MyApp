<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $commentData = [
        'name' => htmlspecialchars($_POST['name']),
        'comment' => htmlspecialchars($_POST['comment']),
        'rating' => intval($_POST['rating']),
        'timestamp' => date('Y-m-d H:i:s')
    ];

    $file = '../data.json';

 
    if (file_exists($file)) {
        $existing = json_decode(file_get_contents($file), true);
    } else {
        $existing = [];
    }

    $existing[] = $commentData;

    file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT));

    header('Location: ../lab3.html?success=true');

    exit;
}
?>
