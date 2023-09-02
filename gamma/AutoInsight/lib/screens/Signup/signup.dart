import 'package:flutter/material.dart';

import 'comp/signupBody.dart';

class signup extends StatelessWidget {
  const signup({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:  signupbody(),
    );
  }
}