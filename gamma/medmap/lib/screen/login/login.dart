import 'package:flutter/material.dart';
import 'package:medmap/screen/login/comp2/loginbody.dart';

class login extends StatelessWidget {
  const login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      body: loginbody(),
    );
  }
}