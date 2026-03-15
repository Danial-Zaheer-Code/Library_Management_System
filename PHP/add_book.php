<?php
include "db.php";

header("Content-Type: application/json");

$name = $_POST['name'];
$author = $_POST['author'];
$category = $_POST['category'];

$sql = "INSERT INTO books (name,author,category)
VALUES ('$name','$author','$category')";

mysqli_query($conn,$sql);

http_response_code(201);
echo json_encode(["message" => "Book added successfully"]);
?>