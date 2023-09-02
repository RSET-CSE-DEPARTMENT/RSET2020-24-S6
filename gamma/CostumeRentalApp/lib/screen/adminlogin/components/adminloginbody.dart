import 'package:corental/screen/accountpage/accountpage.dart';
import 'package:corental/screen/adminproductentry/adminproductentry.dart';
import 'package:corental/screen/adminsignup/adminsignup.dart';
import 'package:corental/screen/coverpage/components/coverpagebody.dart';
import 'package:corental/screen/coverpage/coverpage.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:corental/screen/openpage/openpage.dart';
import 'package:corental/screen/signuppage/signuppage.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AdminLoginPageBody extends StatefulWidget {
  const AdminLoginPageBody({Key? key}) : super(key: key);

  @override
  State<AdminLoginPageBody> createState() => _AdminLoginPageBodyState();
}

class _AdminLoginPageBodyState extends State<AdminLoginPageBody> {
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
    return
      SingleChildScrollView(
        child: Column(
          children: [
            Container(margin: EdgeInsets.only(top: 40,right: 295,),
                decoration: BoxDecoration(shape: BoxShape.circle,color: Color.fromRGBO(158, 117, 85,1),),
                child: IconButton(icon: Icon(Icons.arrow_back),
                  onPressed: (){Navigator.push(context, MaterialPageRoute(builder: (context)=> AdminSignUpPage(),));
                  },)),

            Column(mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(height: 40,width: 170,
                    margin: EdgeInsets.only(top: 60,bottom: 30,left: 10),
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(20.0)),color: Color.fromRGBO(158, 117, 85,1),),
                    child: Center(child: Text("ADMIN LOGIN",style: TextStyle(fontSize: 25),))),
              ],
            ),

            Container(
                child: Text("Email",style: TextStyle(fontSize: 18),textAlign: TextAlign.left,)),

            Container(height: 50,width: 300,padding: EdgeInsets.symmetric(horizontal: 10),
              margin: EdgeInsets.only(left: 25,right: 15,top: 15,bottom: 25),
              decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(15)),
                  color: Color.fromRGBO(191, 189, 153, 1)),
              child: SizedBox(width: 200,
                child:TextField(controller: emailController,style: TextStyle(fontSize: 18,fontWeight: FontWeight.bold),
                  cursorColor: Colors.black,cursorWidth: 1,
                  keyboardType: TextInputType.emailAddress,
                  decoration: InputDecoration(
                    prefixStyle: TextStyle(fontSize: 20,color: Colors.black45),
                    border: InputBorder.none,counterText: "",
                  ),
                ),
                //child: TextFormField(style: TextStyle(fontSize: 18),textAlign: TextAlign.center,)),
              ),
            ),
            Container(
                child: Text("Password",style: TextStyle(fontSize: 18),textAlign: TextAlign.left,)),

            Container(height: 50,width: 300,
              margin: EdgeInsets.only(left: 35,right: 15,top: 15,bottom: 20),
              decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(15)),
                  color: Color.fromRGBO(191, 189, 153, 1)),
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

            Center(
              child: Container(height: 35,width: 100,margin: EdgeInsets.only(bottom: 20),
                  decoration: BoxDecoration(color: Color.fromRGBO(158, 117, 85,1),
                      borderRadius: BorderRadius.all(Radius.circular(30))),
                  child: ElevatedButton(child: Text("Login"),
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.black,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),),
                    onPressed: (){
                      setState(() {
                        FirebaseAuth.instance.signInWithEmailAndPassword(
                            email: emailController.text,
                            password: passwordController.text)
                            .then((value) async {
                          final user = FirebaseAuth.instance.currentUser;
                          if (user != null) {
                            final documentId = user.uid;
                            final mobileNumber =await getMobileNumberFromFirestore(documentId);
                            if (mobileNumber != null) {
                              _storeDocumentIdInSharedPreferences(documentId);
                              _storeMobileNumberInSharedPreferences(mobileNumber);
                              Navigator.push(context, MaterialPageRoute(builder: (context) => AdminProductEntry()));
                            } else {
                              _showSnackBar(context, 'Mobile number not found.');
                            }
                          }
                        }).catchError((error) {
                          _showSnackBar(context, 'Password does not match.');
                          print("Error ${error.toString()}");

                        });
                      });},
                  )),
            ),
            Divider(
              height: 70,
              indent: 30,
              endIndent: 30,
              color: Colors.black45,
            ),
            Container(child: Row(mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text("Don't have an account?",style: TextStyle(fontSize: 14),),
                TextButton(onPressed: (){Navigator.push(context, MaterialPageRoute(builder: (context)=> AdminSignUpPage(),));},
                    child: Text("SignUp", style: TextStyle(color: Color.fromRGBO(158, 117, 85,1),fontSize: 14),))
              ],
            )),
          ],
        ),
      );
  }
}
