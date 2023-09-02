import 'package:corental/screen/confirmation/confirmation.dart';
import 'package:corental/screen/firstpage/firstpage.dart';
import 'package:flutter/material.dart';

class paymentbody extends StatefulWidget {
   paymentbody({Key? key,required this.total}) : super(key: key);
  double total;

  @override
  State<paymentbody> createState() => _paymentbodyState();
}

class _paymentbodyState extends State<paymentbody> {

  bool isSelect=false;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          height: 4,width: 400,color: Colors.brown,
        ),
        SizedBox(height: 15),
        Text("Confirmation",style: TextStyle(fontSize: 25,fontWeight: FontWeight.w500,
            fontFamily:"MarcellusSC-Regular",color: Color.fromRGBO(149,128,96,1)),),

        Center(
          child: Container(margin: EdgeInsets.only(top: 170),
            height: 90,width: 230,
            decoration: BoxDecoration(color: Colors.brown,borderRadius: BorderRadius.circular(15)),

            child:
              InkWell(onTap: (){
                setState(() {
                  isSelect=!isSelect;
                });
              },
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(padding: EdgeInsets.only(left: 20),
                    //decoration: BoxDecoration(borderRadius: BorderRadius.circular(15)),
                    child: Text("Pay at Shop",style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold,fontFamily: "MarcellusSC-Regular"),),),
                SizedBox(width: 60,),
                Container(child: isSelect==false?Icon(Icons.square_outlined):Icon(Icons.check_box),),

                ],
              ),
            ),

          ),
        ),SizedBox(height: 50,),
        Container(child: isSelect==false?Text(" ")
            :Container(width: 120,
              height: 50,
              child: ElevatedButton(style: ElevatedButton.styleFrom(backgroundColor: Color.fromRGBO(149,128,96,1)),
              onPressed: (){ Navigator.push(
              context, MaterialPageRoute(builder: (context) => confirmation(total:widget.total)));},
              child: Text("Book",style: TextStyle(color: Colors.black,fontSize: 20,fontFamily: "MarcellusSC-Regular"),)),
            ),),
        SizedBox(height: 150,),
        Container(
          child: TextButton(onPressed:(){
            Navigator.push(context, MaterialPageRoute(builder: (context) => HomePage(),));
          },
            child: Text("<<Go back",style: TextStyle(color: Colors.black,decoration: TextDecoration.underline,fontSize: 16),),),
        )
            ],
          );
  }
}