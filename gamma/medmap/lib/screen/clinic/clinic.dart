import 'package:flutter/material.dart';
import 'package:medmap/screen/clinic/comp12/clinicbody.dart';
import 'package:medmap/screen/search/comp8/searchbody.dart';

class clinic extends StatelessWidget {
  const clinic({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: clinicbody(),
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text("MedMap"),centerTitle: true,titleTextStyle: TextStyle(
        fontFamily: "Jost",fontSize: 25,),),
    );
  }
}