import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Signin/signin.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  User? user;

  @override
  void initState() {
    super.initState();
    user = FirebaseAuth.instance.currentUser;
    print(user?.uid.toString());
  }

  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
       debugShowCheckedModeBanner: false,
      // home: StreamBuilder<User?>(
      //       stream: FirebaseAuth.instance.authStateChanges(),
      //       builder: (context, snapshot) {
      //         if(snapshot.hasData) {
      //           return const FirstScreen()
      //         }
      //         else {
      //           return const signin()
      //         }
      //       },
      home: user != null?  const FirstScreen(): const signin(),
          );
  }
}
