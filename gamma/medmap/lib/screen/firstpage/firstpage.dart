import 'package:flutter/material.dart';
import 'package:medmap/screen/firstpage/comp/firstpagebody.dart';

class firstpage extends StatelessWidget {
  const firstpage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: firstpagebody(),
    );
  }
}
