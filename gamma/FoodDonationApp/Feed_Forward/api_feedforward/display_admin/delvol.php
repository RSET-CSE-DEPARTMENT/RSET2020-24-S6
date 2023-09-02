<?php
include "../connection.php";

$id=$_POST["vol_id"];


$qry="delete from volunteer where vol_id='$id'";

$result=$conn->query($qry);
if($result)
{
    echo json_encode(array("success"=>true));

}
else
{
    echo json_encode(array("success"=>false));
}