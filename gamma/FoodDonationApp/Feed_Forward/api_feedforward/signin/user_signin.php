<?php
include "../connection.php";


$demail=$_POST["demail"];
$dpass=md5($_POST["dpassword"]);
$vemail=$_POST["vemail"];
$vpass=md5($_POST["vpassword"]);
$aemail=$_POST["admin_mail"];
$apass=md5($_POST["apassword"]);
$remail=$_POST["remail"];
$rpass=md5($_POST["rpassword"]);



$qry1="select * from donor where demail='$demail'AND dpassword='$dpass'" ;
$qry2="select * from volunteer where vemail='$vemail' AND vpassword='$vpass'";
$qry3="select * FROM admin WHERE admin_mail='$aemail' AND apassword='$apass'";
$qry4="select * from recepient where remail='$remail'AND rpassword='$rpass'" ;

$result1=$conn->query($qry1);
$result2=$conn->query($qry2);
$result3=$conn->query($qry3);
$result4=$conn->query($qry4);

if($result1->num_rows==1)
{   $row = $result1->fetch_assoc();
    echo json_encode(array("success"=>true,"mode"=>"donor",'id'=>(int)$row['did']));

}
else
{   if($result2->num_rows==1)
    {   $row = $result2->fetch_assoc();
        echo json_encode(array("success"=>true,"mode"=>"volunteer",'id'=>(int)$row['vol_id']));
    
    }
    else{
        if($result3->num_rows==1)
    {$row = $result3->fetch_assoc();
        echo json_encode(array("success"=>true,"mode"=>"admin",'id'=>(int)$row['admin_id']));
    
    }
    else{
        if($result4->num_rows==1)
    {$row = $result4->fetch_assoc();
        echo json_encode(array("success"=>true,"mode"=>"recep",'id'=>(int)$row['rid']));
    
    }
    else{
        echo json_encode(array("success"=>false));
    }
    }
    
    }
}
    


