import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Signup/signup.dart';
import 'package:email_validator/email_validator.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class signinbody extends StatefulWidget {
  const signinbody({super.key});

  @override
  State<signinbody> createState() => _signinbodyState();
}


class _signinbodyState extends State<signinbody> {

  final _emailcontroller = TextEditingController();
  final  _passwordcontroller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
            Container(margin: EdgeInsets.only(top: 380,left: 13),
            height: 60,
            width: 370,
            child:TextFormField(
              textAlign: TextAlign.center,
              controller: _emailcontroller,
              keyboardType: TextInputType.emailAddress,
              validator: (value){
                if (value == null || value.isEmpty){
                  return 'Please enter your Email';}
                return null;
              },
              decoration: InputDecoration(hintText: 'Enter Email',hintStyle: TextStyle(color: Colors.white24)),
              cursorColor: Colors.white,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: Color(0XFFFAF9F6).withOpacity(0.2),
            ),
          ),

          Container(margin: EdgeInsets.only(top: 450,left: 13),
            height: 60,
            width: 370,
            child: TextFormField(
              textAlign: TextAlign.center,
              controller: _passwordcontroller,
              obscureText: true,
              validator: (value){
                if (value == null || value.isEmpty){
                  return 'Please enter your Password';}
                return null;
              },
              decoration: InputDecoration(hintText: 'Enter Password',hintStyle: TextStyle(color: Colors.white24)),
              cursorColor: Colors.white,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(40),
              color: Color(0XFFFAF9F6).withOpacity(0.2),
            ),
          ),
          Positioned(top: 520, left: 160,
            child: ElevatedButton(onPressed: () async{
              if (_emailcontroller.text == null||!EmailValidator.validate(_emailcontroller.text)) {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                  content: Text('Please enter a valid mail.'), ));
                print("Not a valid email.");
                return;
              }
              if (_passwordcontroller.text == '') {
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                  content: Text('Please enter a password.'), ));
                print("No password entered.");
                return;
              }

              await FirebaseAuth.instance
                  .signInWithEmailAndPassword(
                  email: _emailcontroller.text,
                  password: _passwordcontroller.text)
                  .then((value) async {
                final user = FirebaseAuth.instance.currentUser;
                if (user != null) {
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(builder: (context) => FirstScreen()),
                  );
                }
              }
              );
            },
            style: ElevatedButton.styleFrom(
              primary: Colors.white24,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(40)
              )
            ),
                child: const Text('LOG IN'))
          ),
          Positioned(top: 590, left: 85,
              child: Row(mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text("Don't you have an account? ",
              style: TextStyle(color: Colors.white70)),
              GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const signup()),
                  );
                },
                child: const Text("Sign Up",
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                ),
              )
            ],
          )
          ),
        ],
      ),
    );
  }
}
