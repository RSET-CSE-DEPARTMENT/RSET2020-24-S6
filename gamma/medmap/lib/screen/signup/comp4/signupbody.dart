import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:medmap/screen/login/login.dart';
import 'package:cloud_firestore/cloud_firestore.dart';


class signupbody extends StatefulWidget {
  const signupbody({Key? key}) : super(key: key);

  @override
  State<signupbody> createState() => _signupbodyState();
}

class _signupbodyState extends State<signupbody> {
  final TextEditingController uname = TextEditingController();
  final TextEditingController phoneNumberController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  bool _passwordVisible1 = false;
  bool _passwordVisible2 = false;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          Row(

            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 30,height: 50,),
              Text("Sign up",style: TextStyle(color: Colors.black,fontSize: 28,fontWeight: FontWeight.w600),),
            ],
          ),
          SizedBox(height: 10,),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 40,height: 10,),
              Text("Name",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "Manjari"),),
            ],
          ),
          Container(
            width: 290,
            height: 50,
            padding: EdgeInsets.symmetric(horizontal: 10),

            decoration: BoxDecoration(borderRadius: BorderRadius.circular(18),border: Border.all(color: Colors.black12)),
            child: TextField(controller: uname,style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),
              cursorColor: Colors.black,cursorWidth: 1,
              decoration: InputDecoration(
                border: InputBorder.none,counterText: "",
              ),
            ),
          ),
          // SizedBox(height: 10,),
          // Row(
          //   mainAxisAlignment: MainAxisAlignment.start,
          //   children: [
          //     SizedBox(width: 40,height: 30,),
          //     Text("Phone Number",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "Manjari"),),
          //   ],
          // ),
          // Container(
          //   width: 290,
          //   height: 50,
          //   decoration: BoxDecoration(borderRadius: BorderRadius.circular(18),border: Border.all(color: Colors.black12)),
          //   child: TextField(controller: phoneNumberController,style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),
          //     maxLength: 10,cursorColor: Colors.black,cursorWidth: 1,
          //     keyboardType: TextInputType.phone,
          //     decoration: InputDecoration(
          //       prefixText: " +91 ",
          //       prefixStyle: TextStyle(fontSize: 20,color: Colors.black45),
          //       border: InputBorder.none,counterText: "",
          //     ),
          //   ),
          // ),

          SizedBox(height: 10,),
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
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 40,height: 30,),
              Text("Enter Password",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "Manjari"
              ),),
            ],
          ),
          Container(
            width: 290,
            height: 50,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(18),border: Border.all(color: Colors.black12)),
            padding: EdgeInsets.only(left: 5),
            child: TextFormField(

              obscureText: !_passwordVisible1,controller: passwordController,style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),
              maxLength: 8,cursorColor: Colors.black,cursorWidth: 1,
              decoration: InputDecoration(
                icon: Icon(Icons.lock,color: Colors.black,size: 20,),
                suffixIcon: InkWell(
                  onTap: (){
                    setState(() {
                      _passwordVisible1 = !_passwordVisible1;
                    });

                  },
                  child: Icon(Icons.remove_red_eye,color: Colors.black54,size: 20,),

                ),
                border: InputBorder.none,counterText: "",
              ),
            ),
          ),
          SizedBox(height: 10,),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SizedBox(width: 40,height: 30,),
              Text("Re-enter Password",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "Manjari"
              ),),
            ],
          ),
          Container(
            width: 290,
            height: 50,
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(18),border: Border.all(color: Colors.black12)),
            padding: EdgeInsets.only(left: 5),
            child: TextFormField(

              obscureText: !_passwordVisible2,controller: confirmPasswordController,style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),
              maxLength: 8,cursorColor: Colors.black,cursorWidth: 1,
              decoration: InputDecoration(
                icon: Icon(Icons.lock,color: Colors.black,size: 20,),
                suffixIcon: InkWell(
                  onTap: (){
                    setState(() {
                      _passwordVisible2 = !_passwordVisible2;
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
              onPressed: (){
    if (passwordController.text != confirmPasswordController.text) {

    print("Password do not match");
    return;
                //Navigator.push(context, MaterialPageRoute(builder: (context) => verify(),),);

    }


    final email = emailController.text;
    final userData = {
      'Name': uname.text,
     // 'Phone Number': phoneNumber,
      'Email': emailController.text,
      'Password': passwordController.text,

    };
    FirebaseFirestore.instance
        .collection('users')
        .doc(email)
        .set(userData);
    FirebaseAuth.instance

         .createUserWithEmailAndPassword(
      email: emailController.text,
     password: passwordController.text,
     )
        .then((value) {
    var userId = value.user!.uid;
    print(userId);
    final userMapData = {
      'Email': email,
    };
    FirebaseFirestore.instance
        .collection('usermap')
        .doc(userId)
        .set(userMapData);
    Navigator.push(context, MaterialPageRoute(builder: (context) => login()),
    );
    }).onError((error, stackTrace) {
      print("Error ${error.toString()}");
    });
    },
              child: Text("Sign up",style: TextStyle(fontSize: 20,color: Colors.white,fontWeight: FontWeight.normal),),
              style: ElevatedButton.styleFrom(backgroundColor: Colors.black,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),),
            ),
          ),
          SizedBox(height: 10,),
          Divider(
            indent: 30,
            endIndent: 30,
            color: Colors.black45,
          ),
          Text("Have an account?",style: TextStyle(fontSize: 16,color: Colors.black54),),
          InkWell(
              onTap: (){
                Navigator.push(context, MaterialPageRoute(builder: (context) => login(),),);
              },
              child: Text("Log in",style: TextStyle(
                decoration: TextDecoration.underline,fontSize: 18,color: Colors.black,fontWeight: FontWeight.bold,),))



        ],

      ),
    );
  }
}