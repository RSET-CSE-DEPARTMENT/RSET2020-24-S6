<?php
include "../connection.php";

$id=$_POST["rid"];


$qry="delete from recepient where rid='$id'";

$result=$conn->query($qry);
if($result)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}