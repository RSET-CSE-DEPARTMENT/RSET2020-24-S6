<?php
include "../connection.php";

$mail=$_POST["vemail"];

$qry="select * from volunteer where vemail='$mail'";

$result=$conn->query($qry);
if($result->num_rows>0)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}