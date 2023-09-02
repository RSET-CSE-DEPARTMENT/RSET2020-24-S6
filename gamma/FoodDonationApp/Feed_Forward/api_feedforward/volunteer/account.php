<?php
include "../connection.php";


$id=$_POST["vol_id"];

$qry="select * from volunteer where vol_id='$id'";

$result=$conn->query($qry);
if($result->num_rows==1)
{   $row = $result->fetch_assoc();
    echo json_encode(array("success"=>true,"name"=>$row['vname'],"email"=>$row['vemail'],"addr"=>$row['vaddr'],"pno"=>$row['vphnos'],"lic"=>$row['lic'],"veh"=>$row['veh']));

}
else
{
    echo json_encode(array("success"=>false));
}