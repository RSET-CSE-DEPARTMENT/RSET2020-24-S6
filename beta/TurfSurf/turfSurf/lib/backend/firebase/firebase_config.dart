import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyDIKpDkgRvrOz0iDotm3aj8maDxbql8Ogc",
            authDomain: "turfbooking-6f315.firebaseapp.com",
            projectId: "turfbooking-6f315",
            storageBucket: "turfbooking-6f315.appspot.com",
            messagingSenderId: "889503539449",
            appId: "1:889503539449:web:dbb80e9dd6b77bd0078228",
            measurementId: "G-HMNQ5Q18XD"));
  } else {
    await Firebase.initializeApp();
  }
}
