
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

class confirmation_body extends StatefulWidget {
   confirmation_body({Key? key,required this.total,required this.list7}) : super(key: key);
  double total;
  Map<String,dynamic> list7;
  @override
  State<confirmation_body> createState() => _confirmation_bodyState();
}

class _confirmation_bodyState extends State<confirmation_body> {
 String userID = '';

 @override
 void initState() {
   super.initState();
   userID = generateUserID();
   uploadingData(userID, now,widget.total,widget.list7['Name']);
 }

 String generateUserID() {
   var uuid = Uuid();
   return uuid.v4(); // Generates a version 4 (random) UUID
 }
 DateTime now = DateTime.now();


 //DateTime currentDate = DateTime(now.year, now.month, now.day);
  Widget build(BuildContext context) {
    DateTime now = DateTime.now();
    DateTime current = DateTime(now.year,now.month,now.day);
    return Column(
      children: [
        Container(
          height: 4,width: 400,color: Colors.brown,
        ),
        SizedBox(
          height: 35,
        ),
        Container(
          height: 50,width: 400,
          child: Center(child: Text("BOOKING CONFIRMATION",style: TextStyle(color: Colors.brown,fontSize: 25,fontFamily: "MarcellusSC-Regular"),)),
        ),
        SizedBox(
          height: 40,
        ),
        Align(
          alignment: Alignment.center,
          child: Container(
            height: 95,width: 230,
    child: Column(
      children: [
        Text("YOUR BOOKING IS CONFIRMED!!"
                    //"YOUR SLOT NUMBER IS: ZY123"
        ),
        SizedBox(height: 10,),
        Text('  User ID: $userID', style: TextStyle(fontSize: 15,fontWeight: FontWeight.w400,fontFamily: "MarcellusSC-Regular")),
      ],
    ),
          ),
        ),

        SizedBox(
          height: 5,
        ),
        Container(
          height: 50,width: 360,
          child: Text("Please note that this slot number will be valid for 2 days.",style: TextStyle(fontFamily: "fonts/HindSiliguri-Regular.ttf",fontWeight: FontWeight.normal,fontSize: 14)),
        ),
        SizedBox(
          height: 250,
        ),
        InkWell(
            onTap: (){
              Navigator.push(context, MaterialPageRoute(builder: (context) => HomePage(),),);
            },
            child: Text("Go to App",style: TextStyle(
              decoration: TextDecoration.underline,fontSize: 15,color: Colors.black,fontWeight: FontWeight.w400,fontFamily: "MarcellusSC-Regular"),)),
        SizedBox(height: 10,),
        Container(//color: Colors.yellow,
          padding: EdgeInsets.symmetric(horizontal: 20),
          height: 50,width: 300,
          child:Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [


              Container(
                height: 43,
                width: 150,
                child: Align(alignment: Alignment.center,
                    child: Text("Corental",style: TextStyle(color: Colors.brown,fontSize: 36,fontFamily: "LoversQuarrel-Regular"),)),
              ),


            ],
          ),
        )
      ],


    );
  }



 Future<void> uploadingData(String _bookid, DateTime _date,
     double _total,String _user) async {
   await FirebaseFirestore.instance.collection("bookings").add({
     'BookingID': _bookid,
     'Date': _date,
     'Amount': _total,
     'User': _user,


   });
 }
}