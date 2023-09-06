import 'package:flutter/material.dart';
import 'package:medmap/screen/emergency/comp6/emergencybody.dart';

class emergency extends StatelessWidget {
  const emergency({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("EMERGENCY"),centerTitle: true,
        titleTextStyle: TextStyle(color: Colors.white,fontFamily: "Jost",fontSize: 25,),
        backgroundColor: Color.fromRGBO(189,35,11,10),
      ),
      body: emergencybody(

      ),
    );
  }
}