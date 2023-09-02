import 'package:flutter/material.dart';
class MyLogin extends StatefulWidget {
  const MyLogin({Key? key}) : super(key : key);

  @override
  State<MyLogin> createState() => _MyLoginState();
}

class _MyLoginState extends State<MyLogin> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/Home page.png'),fit: BoxFit.cover)),
      child:Scaffold(
          backgroundColor: Colors.transparent,
          body:Stack(
            children: [
              SingleChildScrollView(
                child: Container(
                  padding:EdgeInsets.only(left: 35,top :350),

                    child:Text('          Welcome Back!   ',style: TextStyle(color:Colors.white, fontSize: 25),
                  ),
                ),
              ),
      Container(
    padding: EdgeInsets.only(top:400,right:35,left:35),
    child:Column(
    children: [
    TextField(
      decoration: InputDecoration(
    fillColor: Colors.grey.shade100,
    filled:true ,
    hintText: 'EMAIL',
    icon: Icon(Icons.mail_outline_outlined,color: Color(0XFFC2858C),size: 30,),
    border: OutlineInputBorder(
    borderRadius: BorderRadius.circular(40)
    ),
    ),),
    SizedBox(
      height:30,
    ),
    TextField(
      obscureText:true,
      decoration: InputDecoration(
    fillColor: Colors.grey.shade100,
    filled:true ,
    hintText: 'PASSWORD',
          icon: Icon(Icons.lock_open_rounded,color: Color(0XFFC2858C),size: 30,),
    border: OutlineInputBorder(
    borderRadius: BorderRadius.circular(40)
    )
    ),),
      SizedBox(
        height: 40,
      ),
         Center(
           child: ElevatedButton(
             style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
              onPressed: () {
               // Navigator.pushNamed(context, 'signupsuccessful');
                Navigator.pushNamed(context, 'volactive');
              },
              child:Text('SIGN IN',style: TextStyle(
                  color: Colors.white,
                  fontSize: 27,fontWeight: FontWeight.w100
              )
            ),

            ),
         ),
      SizedBox(
        height:30,
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          TextButton(
              onPressed: (){
                Navigator.pushNamed(context, 'login successful');
              },
              child: Text('SIGN UP',style: TextStyle(
            decoration: TextDecoration.underline,
            fontSize: 15,color:  Colors.white,
          ),)),
          TextButton(onPressed: (){
            Navigator.pushNamed(context, 'forgotpassword');
          }, child: Text('FORGOT PASSWORD?',style: TextStyle(
            decoration: TextDecoration.underline,
            fontSize: 15,color:  Colors.white,
          ),))
        ],
      )
    ],
    ),
    )
     ],
          )
      ),
    );
  }
}