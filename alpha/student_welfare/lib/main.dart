import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:student_welfare/auth/login_screen.dart';

Future<void> main() async{
  WidgetsFlutterBinding.ensureInitialized();

  if(kIsWeb){
    await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "AIzaSyB7TvSaWztB3qffwtcXG1qz7luStEv5QmU",
      authDomain: "fire1-8db02.firebaseapp.com",
      projectId: "fire1-8db02",
      storageBucket: "fire1-8db02.appspot.com",
      messagingSenderId: "389541261866",
      appId: "1:389541261866:web:63fa6b4eb52811655b4953"));
  }else{
    await Firebase.initializeApp();
  }
    
  
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
        debugShowCheckedModeBanner: false, home: LoginScreen());
  }
}
