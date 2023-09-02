import 'package:corental/screen/coverpage/coverpage.dart';
import 'package:flutter/material.dart';
class OpenPageBody extends StatelessWidget {
  const OpenPageBody({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      child: Container(
        decoration: BoxDecoration(image: DecorationImage(image:  AssetImage("asset/firstp.jpg"),
          fit: BoxFit.cover,
        ))),
        onTap: () {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => CoverPage()));
        }
    );
  }
}
