<?php
$jsonPath = '../final.json';


if (file_exists($jsonPath)) {
  $data = json_decode(file_get_contents($jsonPath), true);
} else {
  $data = [
    'downloads' => ['count' => 0, 'logs' => []],
    'comments' => [],
    'ratings' => []
  ];
}


if ($_SERVER["REQUEST_METHOD"] === "GET" && isset($_GET["summary"]) && $_GET["summary"] === "rating") {
  $ratings = $data["ratings"];
  $count = count($ratings);
  $avg = $count > 0 ? round(array_sum($ratings) / $count, 2) : 0;
  echo "<p style='font-family: sans-serif; font-size: 1rem; margin: 0;'> Average Rating: $avg / 5 ($count vote" . ($count === 1 ? "" : "s") . ")</p>";
  exit;
}


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["name"], $_POST["email"], $_POST["message"])) {
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $message = htmlspecialchars($_POST["message"]);

  $data['comments'][] = [
    'name' => $name,
    'email' => $email,
    'message' => $message,
    'time' => date("Y-m-d H:i:s")
  ];

  file_put_contents($jsonPath, json_encode($data, JSON_PRETTY_PRINT));
  header("Location: ../contact.html?status=sent");
  exit;
}


if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["rating"])) {
  $rating = (int) $_POST["rating"];
  if ($rating >= 1 && $rating <= 5) {
    $data['ratings'][] = $rating;
    file_put_contents($jsonPath, json_encode($data, JSON_PRETTY_PRINT));
  }
  header("Location: " . $_SERVER["HTTP_REFERER"]);
  exit;
}
?>
