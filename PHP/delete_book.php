<?php
include "db.php";

$id = $_POST['id'];

$sql = "DELETE FROM books WHERE id=$id";

mysqli_query($conn,$sql);


http_response_code(200);
echo json_encode(["message" => "Book Deleted successfully"]);

?>