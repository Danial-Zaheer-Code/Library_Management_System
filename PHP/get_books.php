<?php
include "db.php";

header("Content-Type: application/json");

$result = mysqli_query($conn,"SELECT * FROM books");

$data = [];

while($row = mysqli_fetch_assoc($result)){
    $data[] = $row;
}


http_response_code(200);
echo json_encode($data);

?>