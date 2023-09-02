import 'package:flutter/material.dart';

class MyRegister extends StatefulWidget {
  const MyRegister({super.key});

  @override
  State<MyRegister> createState() => _MyRegisterState();
}

class _MyRegisterState extends State<MyRegister> {
  bool?isChecked=false;
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration:BoxDecoration(
          image:DecorationImage(
              image: AssetImage('assets/register page.png'),fit: BoxFit.cover)),
      child:Scaffold(
          backgroundColor: Colors.transparent,
          body:Stack(
            children: [
             SingleChildScrollView(
             child:Container(
                padding: EdgeInsets.only(top:155,right:35,left:35),
                child:Column(
                  children: [
                    TextField(
                      decoration: InputDecoration(
                        fillColor: Colors.grey.shade100,
                        filled:true ,
                        hintText: 'NAME',
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10)
                        ),
                      ),),
                    SizedBox(
                      height:20,
                    ),
                    TextField(
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'PHONE NUMBER',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
                    SizedBox(
                      height: 20,
                    ),
                    TextField(
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'ADDRESS',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
                    SizedBox(
                      height: 20,
                    ),
                    TextField(
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'EMAIL ID',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
                    SizedBox(
                      height: 20,
                    ),

                    TextField(
                      obscureText:true,
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'PASSWORD',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
                    SizedBox(
                      height: 20,
                    ),
                    TextField(
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'LICENCE NUMBER',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
                    SizedBox(
                      height: 20,
                    ),
                    TextField(
                      decoration: InputDecoration(
                          fillColor: Colors.grey.shade100,
                          filled:true ,
                          hintText: 'VEHICLE NUMBER',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(10)
                          )
                      ),),
  SingleChildScrollView(
  child: Container(
    padding: EdgeInsets.only(top:10,right:10,left:10),
    child:Column(
    children: [
    Row(
    children: [
    Checkbox(
    value: isChecked,
    activeColor: Color(0XFF5A082D),
    checkColor: Colors.white,
    onChanged: (newBool){
    setState(() {
    isChecked=newBool;
    },
    );

    }
    ),
    TextButton(
    onPressed: (){
    Navigator.pushNamed(context, 'TermsandConditions');
    },
    child: Text('Terms and Conditions',style: TextStyle(
    decoration: TextDecoration.underline,
    fontSize: 15,color:  Color(0XFF5A082D),
    ),),
    ),
    ],
    )
    ],
    ),
    ),
    ),
                    SizedBox(height: 10),
                        Center(
                          child: ElevatedButton(
    style: ElevatedButton.styleFrom(backgroundColor:Color(0XFFC2858C),shape: StadiumBorder()),
    onPressed: () {
    Navigator.pushNamed(context, 'login');
    },
    child:Text('REGISTER',style: TextStyle(
    color: Colors.white,
    fontSize: 27,fontWeight: FontWeight.w200
    )
    ),

    ),
                        ),

    /*ElevatedButton(
                          onPressed: () {
                            Navigator.pushNamed(context, 'login sucessful');
                          },
                          child: Icon( //<-- SEE HERE
                            Icons.arrow_back,
                            color: Colors.black,
                            size: 20,
                          ),
                          style: ElevatedButton.styleFrom(
                            shape: CircleBorder(), //<-- SEE HERE
                            padding: EdgeInsets.all(20),
                          ),
                        ),
                        Text('REGISTER ',style: TextStyle(
                          color: Color(0xff26c6da),
                          fontSize: 27,fontWeight: FontWeight.w700
                      ),
                      ),
                        ElevatedButton(
                          onPressed: () {
                            Navigator.pushNamed(context, 'registerplus');
                          },
                          child: Icon( //<-- SEE HERE
                            Icons.arrow_forward,
                            color: Colors.black,
                            size: 20,
                          ),
                          style: ElevatedButton.styleFrom(
                            shape: CircleBorder(), //<-- SEE HERE
                            padding: EdgeInsets.all(20),
                          ),
                        ),*/
                      ],
                    ),

    ),
    ),
             ]
          ),
    ),
    );
  }
}
