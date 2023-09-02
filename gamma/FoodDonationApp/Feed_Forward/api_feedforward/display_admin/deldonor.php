<?php
include "../connection.php";

$id=$_POST["did"];


$qry="delete from donor where did='$id'";

$result=$conn->query($qry);
if($result)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}