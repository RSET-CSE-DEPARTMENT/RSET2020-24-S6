import 'package:corental/screen/adminlogin/components/adminloginbody.dart';
import 'package:corental/screen/cart/components/cartbody.dart';
import 'package:flutter/material.dart';

class AdminLogin extends StatelessWidget {
  const AdminLogin({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AdminLoginPageBody(),);
  }
}
