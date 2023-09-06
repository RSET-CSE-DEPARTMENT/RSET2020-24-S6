import 'package:flutter/material.dart';
import 'package:medmap/screen/home/home.dart';
import 'package:medmap/screen/login/login.dart';
import 'package:medmap/screen/signup/signup.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class loginbody extends StatefulWidget {
  const loginbody({Key? key}) : super(key: key);

  @override
  State<loginbody> createState() => _loginbodyState();
}

class _loginbodyState extends State<loginbody> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  bool _passwordVisible = false;
  Future<void> _storeDocumentIdInSharedPreferences(String documentId) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('documentId', documentId);
  }

  Future<void> _storeMobileNumberInSharedPreferences(String mobileNumber) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('mobileNumber', mobileNumber);
  }
  void _showSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<String?> getMobileNumberFromFirestore(String documentId) async {
    final DocumentSnapshot snapshot =
    await FirebaseFirestore.instance.collection('usermap').doc(documentId).get();
    if (snapshot.exists) {
      final data = snapshot.data() as Map<String, dynamic>?; // Explicitly cast to Map<String, dynamic>
      if (data != null) {
        return data['Phone Number'] as String?;
      }
    }
    return null;
   }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          Row(

            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 30,height: 50,),
              Text("Log in",style: TextStyle(color: Colors.black,fontSize: 28,fontWeight: FontWeight.w600),),
            ],
          ),
          SizedBox(height: 50,),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 40,height: 30,),
              Text("Email",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "Manjari"),),
            ],
          ),
          Container(
            width: 290,
            height: 50,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(18),border: Border.all(color: Colors.black12)),
            child: TextField(controller: emailController,style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),
              cursorColor: Colors.black,cursorWidth: 1,
              keyboardType: TextInputType.emailAddress,
              decoration: InputDecoration(
                prefixStyle: TextStyle(fontSize: 20,color: Colors.black45),
                border: InputBorder.none,counterText: "",
              ),
            ),
          ),
          SizedBox(height: 30,),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 40,height: 30,),
              Text("Password",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "Manjari"
              ),),
            ],
          ),
          Container(
            width: 290,
            height: 50,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(18),border: Border.all(color: Colors.black12)),
            padding: EdgeInsets.only(left: 5),
            child: TextFormField(

              obscureText: !_passwordVisible,controller: passwordController,style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),
              maxLength: 8,cursorColor: Colors.black,cursorWidth: 1,
              decoration: InputDecoration(
                icon: Icon(Icons.lock,color: Colors.black,size: 20,),
                suffixIcon: InkWell(
                  onTap: (){
                    setState(() {
                      _passwordVisible = !_passwordVisible;
                    });

                  },
                  child: Icon(Icons.remove_red_eye,color: Colors.black54,size: 20,),

                ),
                border: InputBorder.none,counterText: "",
              ),
            ),
          ),
          SizedBox(height: 80,),
          Container(
            width: 150,
            height: 45,
            margin: EdgeInsets.all(20),

            child: ElevatedButton(
              onPressed: () {
                FirebaseAuth.instance
                    .signInWithEmailAndPassword(
                    email: emailController.text,
                    password: passwordController.text)
                    .then((value) async {
                  final user = FirebaseAuth.instance.currentUser;
                  if (user != null) {
                    final documentId = user.uid;
                    final mobileNumber =
                    await getMobileNumberFromFirestore(documentId);
                      _storeDocumentIdInSharedPreferences(documentId);
                   //   _storeMobileNumberInSharedPreferences(mobileNumber);
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (context) => Home()),
                      );
                  }
                    }).catchError((error) {
                  _showSnackBar(context, 'Password does not match.');
                   print("Error ${error.toString()}");

                });
                },
              child: Text("Log in",style: TextStyle(fontSize: 20,color: Colors.white,fontWeight: FontWeight.normal),),
              style: ElevatedButton.styleFrom(backgroundColor: Colors.black,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),),
            ),
          ),
          SizedBox(height: 30,),
          Divider(
            height: 70,
            indent: 30,
            endIndent: 30,
            color: Colors.black45,
          ),
          Text("Don't have an account?",style: TextStyle(fontSize: 16,color: Colors.black54),),
          InkWell(
              onTap: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) => signup(),),);
              },
              child: Text("Sign up",style: TextStyle(
                decoration: TextDecoration.underline,fontSize: 18,color: Colors.black,fontWeight: FontWeight.bold,),))



        ],

      ),
    );
  }
}