<?php
include "../connection.php";


$mail=$_POST["demail"];

$qry="select * from donor where demail='$mail'";

$result=$conn->query($qry);
if($result->num_rows>0)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}