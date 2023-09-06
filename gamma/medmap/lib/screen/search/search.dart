import 'package:flutter/material.dart';
import 'package:medmap/screen/search/comp8/searchbody.dart';

class search extends StatelessWidget {
  const search({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: searchbody(),
      appBar: AppBar(
        backgroundColor: Colors.black,
        title: Text("MedMap"),centerTitle: true,titleTextStyle: TextStyle(
        fontFamily: "Jost",fontSize: 25,),),
    );
  }
}