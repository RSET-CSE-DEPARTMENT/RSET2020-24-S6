import 'package:corental/screen/loginpage/loginpage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:floating_navbar/floating_navbar.dart';

class AccountPageBody extends StatefulWidget {
  AccountPageBody({Key? key,required this.list6}) : super(key: key);
  Map<String,dynamic> list6;

  @override
  State<AccountPageBody> createState() => _AccountPageBodyState();
}

class _AccountPageBodyState extends State<AccountPageBody> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 80),
      child: Column(
        children: [
          Text("MY ACCOUNT",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 25,color: Color.fromRGBO(164, 110, 63, 1))),
          SizedBox(height: 40,),
          Text("${widget.list6["Name"]}",textAlign: TextAlign.left,style: TextStyle(fontWeight: FontWeight.w600,fontSize: 20),),
          SizedBox(height: 30,),


          Container(padding: EdgeInsets.only(right: 285),
              child: Text("Email",textAlign: TextAlign.left,
                  style: TextStyle(fontWeight: FontWeight.w600,fontSize: 18))),
          Container(margin: EdgeInsets.only(bottom:30,top: 20,left: 35,right: 35),
            padding: EdgeInsets.only(left: 20),
            width: 350,height: 50,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(10),color: Color.fromRGBO(158, 117, 85,1)),
            child: Center(child: Text("${widget.list6['Email']}",textAlign: TextAlign.left,style: TextStyle(fontSize: 18,fontWeight: FontWeight.w500),)),
          ),


          Container(padding: EdgeInsets.only(right: 220),
              child: Text("Phone number",textAlign: TextAlign.left,style: TextStyle(fontWeight: FontWeight.w600,fontSize: 18))),
          Container(margin: EdgeInsets.only(bottom:30,top: 20,left: 35,right: 35),
            padding: EdgeInsets.only(left: 20),
            width: 350,height: 50,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(10),color: Color.fromRGBO(158, 117, 85,1)),
            child: Center(child: Text("${widget.list6['Phone Number']}",textAlign: TextAlign.left,style: TextStyle(fontSize: 18,fontWeight: FontWeight.w500),)),
          ),
          ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: Color.fromRGBO(149,125,96,1)),
              onPressed: (){Navigator.push(context, MaterialPageRoute(builder: (context) => LoginPage(),));},
    child: Text("Logout ->",style: TextStyle(fontSize: 15),))

        ],
      ),
    );
  }
}
