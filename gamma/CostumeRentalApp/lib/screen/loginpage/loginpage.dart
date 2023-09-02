import 'package:corental/screen/loginpage/components/loginpagebody.dart';
import 'package:corental/screen/signuppage/components/signuppagebody.dart';
import 'package:flutter/material.dart';
class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(body: LoginPageBody());
  }
}
