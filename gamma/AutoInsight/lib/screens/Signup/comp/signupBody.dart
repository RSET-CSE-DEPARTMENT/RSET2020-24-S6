import 'package:autoinsight/screens/Signin/signin.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:email_validator/email_validator.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class signupbody extends StatefulWidget {
  const signupbody({super.key});

  @override
  State<signupbody> createState() => _signupbodyState();
}

class _signupbodyState extends State<signupbody> {

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController confirmpwdController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      body: Stack(
        children: [
          Container(
            constraints: const BoxConstraints.expand(),
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/multilogo.png"),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Container(margin: EdgeInsets.only(top: 350,left: 13),
            height: 60,
            width: 370,
            child: TextField(
              controller: nameController,
              textAlign: TextAlign.center,
              decoration: InputDecoration(hintText: 'Enter name',hintStyle: TextStyle(color: Colors.white24)),
              cursorColor: Colors.white,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: Color(0XFFFAF9F6).withOpacity(0.2),
            ),
          ),
          Container(margin: EdgeInsets.only(top: 420,left: 13),
            height: 60,
            width: 370,
            child: TextField(
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              textAlign: TextAlign.center,
              decoration: InputDecoration(hintText: 'Enter email',hintStyle: TextStyle(color: Colors.white24)),
              cursorColor: Colors.white,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: Color(0XFFFAF9F6).withOpacity(0.2),
            ),
          ),
          Container(margin: EdgeInsets.only(top: 490,left: 13),
            height: 60,
            width: 370,
            child: TextField(
              controller: passwordController,
              textAlign: TextAlign.center,
              decoration: InputDecoration(hintText: 'Enter password',hintStyle: TextStyle(color: Colors.white24)),
              cursorColor: Colors.white,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: Color(0XFFFAF9F6).withOpacity(0.2),
            ),
          ),
          Container(margin: EdgeInsets.only(top: 560,left: 13),
            height: 60,
            width: 370,
            child: TextField(
              controller: confirmpwdController,
              obscureText: true,
              textAlign: TextAlign.center,
              decoration: InputDecoration(hintText: 'Confirm password',hintStyle: TextStyle(color: Colors.white24)),
              cursorColor: Colors.white,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: Color(0XFFFAF9F6).withOpacity(0.2),
            ),
          ),

          Positioned(top: 630, left: 155,
              child: ElevatedButton(onPressed: () async{

                if (passwordController.text == '') {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                    content: Text('Please enter a password.'), ));
                  print("No password entered.");
                  return;
                }
                else if (passwordController.text != confirmpwdController.text) {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                      content: Text('Password does not match.'), ));
                  print("Password do not match");
                  return;
                }
                else if (emailController.text == null||!EmailValidator.validate(emailController.text)) {
                  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                    content: Text('Please enter a valid mail.'), ));
                  print("Not a valid email.");
                  return;
                }

                await FirebaseAuth.instance.createUserWithEmailAndPassword(
                  email: emailController.text,
                  password: passwordController.text,
                );
                CollectionReference collref = FirebaseFirestore.instance.collection('User');
                collref.add({
                  'Name': nameController.text,
                  'Email': emailController.text,
                  'Password': passwordController.text,
                });
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const signin()),
                );
              },
                  style: ElevatedButton.styleFrom(
                      primary: Colors.white24,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(40)
                      )
                  ),
                  child: const Text('SIGN UP'))
          ),
        ],
      ),
    );
  }
}
