import 'package:flutter/material.dart';
import 'package:medmap/screen/signup/comp4/signupbody.dart';

class signup extends StatelessWidget {
  const signup({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      body: signupbody(),
    );
  }
}