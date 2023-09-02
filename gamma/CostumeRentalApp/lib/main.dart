import 'package:corental/screen/accountpage/accountpage.dart';
import 'package:corental/screen/adminlogin/adminlogin.dart';
import 'package:corental/screen/adminproductentry/adminproductentry.dart';
import 'package:corental/screen/adminsignup/adminsignup.dart';
import 'package:corental/screen/coverpage/coverpage.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:corental/screen/location/location.dart';
import 'package:corental/screen/loginpage/loginpage.dart';
import 'package:corental/screen/openpage/openpage.dart';
import 'package:corental/screen/productlist/productlist.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: OpenPage(),

    );
  }
}

