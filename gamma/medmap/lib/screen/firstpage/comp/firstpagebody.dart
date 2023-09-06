import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/material/page.dart';
import 'package:medmap/screen/signup/signup.dart';


class firstpagebody extends StatefulWidget {
  const firstpagebody({Key? key}) : super(key: key);

  @override
  State<firstpagebody> createState() => _firstpagebodyState();
}

class _firstpagebodyState extends State<firstpagebody> {
  @override
  Widget build(BuildContext context) {
    return Center(
        child: InkWell(
            onTap: (){ setState(() {
              Navigator.push(context, MaterialPageRoute(builder: (context) => signup(),),);
            });},
            child:
            Text("MedMap",style: TextStyle(color: Colors.white,fontSize: 50,fontWeight: FontWeight.bold,fontFamily: "Jost"),)));
  }
}
