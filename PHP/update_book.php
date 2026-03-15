<?php
include "db.php";

header("Content-Type: application/json");

$id = $_POST['id'];
$name = $_POST['name'];
$author = $_POST['author'];
$category = $_POST['category'];

$sql = "UPDATE books 
SET name='$name', author='$author', category='$category'
WHERE id=$id";

mysqli_query($conn,$sql);


http_response_code(200);
echo json_encode(["message" => "Book Updated successfully"]);

?>