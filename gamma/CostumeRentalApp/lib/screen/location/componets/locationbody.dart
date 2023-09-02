import 'package:flutter/material.dart';

class LocationBody extends StatefulWidget {
  const LocationBody({Key? key}) : super(key: key);

  @override
  State<LocationBody> createState() => _LocationBodyState();
}

class _LocationBodyState extends State<LocationBody> {
  List<Map<String,dynamic>> WhereBuy=[
    {"num":"Chamayam Costume Rental","loc":"Vazhakulam,Aluva,Kerala", "time":"8am-10pm",
      "contact":"9061610441"},
    {"num":"AOne Costume Rental","loc":"MKK Nair road,Palarivattom", "time":"8am-11pm",
      "contact":"9998761230"},
    {"num":"Glanz Costume Rental","loc":"Parambithara Rd,Panampilly", "time":"9am-11pm",
      "contact":"0484299616"},
  ];
  @override
  Widget build(BuildContext context) {
    return Container(
      //margin: EdgeInsets.only(top: 250),
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(40),color: Colors.white,),
      height: 900,

      child: SingleChildScrollView(
        child: Column(
          children: [
            Container(
                padding: EdgeInsets.only(right: 155,top: 50),
                child: Text("WHERE TO BUY?",style: TextStyle(fontWeight: FontWeight.bold,fontSize: 17,fontFamily: "Ubuntu-Medium"),)
            ),
            SizedBox(
              height: 15,
            ),
            ListView.builder(
              itemCount:  WhereBuy.length,
              primary: false,
              shrinkWrap: true,
              itemBuilder: (context, index) => Container(
                padding: EdgeInsets.symmetric(horizontal: 6),
                height: 120,
                margin: EdgeInsets.symmetric(vertical: 10),
                decoration: BoxDecoration(color: Colors.white,
                    borderRadius: BorderRadius.circular(10)
                ),

                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                        padding: EdgeInsets.only(left: 10),
                        child: Text(WhereBuy[index]["num"],style: TextStyle(fontSize: 17,fontWeight: FontWeight.bold),)),
                    Container(
                      //color: Colors.red,
                        padding: EdgeInsets.only(right: 145,left: 10),
                        child: Text(WhereBuy[index]["loc"],style: TextStyle(fontSize: 16,color: Colors.black),)
                    ),

                    Container(height: 50,
                        padding: EdgeInsets.only(right: 145,left: 10),
                      child: Text(WhereBuy[index]["contact"],style: TextStyle(color: Colors.black),),
                    ),
                    Container(
                      //color: Colors.red,
                      child: Container(
                          padding: EdgeInsets.only(left: 10),
                          child: Text(WhereBuy[index]["time"],style: TextStyle(color: Colors.black,fontSize: 15,fontFamily: "Ubuntu-Medium"),)),
                    )
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
