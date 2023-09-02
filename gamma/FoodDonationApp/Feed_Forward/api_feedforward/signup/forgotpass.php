<?php
include "../connection.php";


$dmail=$_POST["demail"];
$rmail=$_POST["remail"];
$vmail=$_POST["vemail"];
$amail=$_POST["admin_mail"];

$qry1="select * from donor where demail='$dmail'";
$qry2="select * from recepient where remail='$rmail'";
$qry3="select * from volunteer where vemail='$vmail'";
$qry4="select * from admin where admin_mail='$amail'";



$result1=$conn->query($qry1);
$result2=$conn->query($qry2);
$result3=$conn->query($qry3);
$result4=$conn->query($qry4);

if($result1->num_rows>0)
{   $row = $result1->fetch_assoc();
    echo json_encode(array("success"=>true,'id'=>(int)$row['did']));

}
else
{   if($result2->num_rows>0)
    {   $row = $result2->fetch_assoc();
        echo json_encode(array("success"=>true,'id'=>(int)$row['rid']));
    
    }
    else{
        if($result3->num_rows>0)
    {   $row = $result3->fetch_assoc();
        echo json_encode(array("success"=>true,'id'=>(int)$row['vol_id']));
    
    }
    else{
        if($result4->num_rows>0){
            $row = $result4->fetch_assoc();
            echo json_encode(array("success"=>true,'id'=>(int)$row['admin_id']));
        }
        else{
        echo json_encode(array("success"=>false));}
    }
    }}
    //else{
    //echo json_encode(array("success"=>false));}
