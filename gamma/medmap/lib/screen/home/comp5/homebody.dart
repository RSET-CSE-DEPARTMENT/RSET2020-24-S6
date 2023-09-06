import 'package:flutter/material.dart';
import 'package:medmap/screen/Map/Map.dart';
import 'package:medmap/screen/clinic/clinic.dart';
import 'package:medmap/screen/emergency/emergency.dart';
import 'package:medmap/screen/search/search.dart';


class Homebody extends StatefulWidget {
  const Homebody({Key? key}) : super(key: key);

  @override
  State<Homebody> createState() => _HomebodyState();
}

class _HomebodyState extends State<Homebody> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
            padding: EdgeInsets.only(top: 30,left: 30,right: 30,),
            child: Text("Choose a category",style: TextStyle(fontFamily: "Manjari",fontSize: 28),)),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: EdgeInsets.only(right: 10),
              child:Row(
                children: [
                  Container(
                    margin: EdgeInsets.all(15),
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => search(),),);},
                        child: Text("Hospitals",style: TextStyle(fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                            shadows: <Shadow>[Shadow(
                              offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                            )]),),
                      ),),),
                  Container(
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Map(),),);},
                        child: Text("Veterinary",style: TextStyle(fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                            shadows: <Shadow>[Shadow(
                              offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                            )]),),
                      ),),),
                ],




              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: EdgeInsets.only(right: 10),
              child:Row(
                children: [
                  Container(
                    margin: EdgeInsets.all(15),
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => clinic(),),);},
                        child: Text("Specialization",style: TextStyle(fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                            shadows: <Shadow>[Shadow(
                              offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                            )]),),
                      ),),),
                  Container(
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Map(),),);},
                        child: Text("Pharmacies",style: TextStyle(fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                            shadows: <Shadow>[Shadow(
                              offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                            )]),),
                      ),),),
                ],




              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: EdgeInsets.only(right: 10),
              child:Row(
                children: [
                  Container(
                    margin: EdgeInsets.all(15),
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Map(),),);},
                        child: Text("Scanning        Centres",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                              shadows: <Shadow>[Shadow(
                                offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                              )]),),
                      ),),),
                  Container(
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Map(),),);},
                        child: Text("Medical Laboratories",
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                              shadows: <Shadow>[Shadow(
                                offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                              )]),),
                      ),),),
                ],




              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            Container(
              margin: EdgeInsets.only(right: 10),
              child:Row(
                children: [
                  Container(
                    margin: EdgeInsets.all(15),
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),color: Colors.black,),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => Map(),),);},
                        child: Text("Clinics",
                          style: TextStyle(
                              fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                              shadows: <Shadow>[Shadow(
                                offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                              )]),),
                      ),),),
                  Container(
                    height: 120, width: 150,
                    decoration: BoxDecoration(borderRadius: BorderRadius.all(Radius.circular(25)),
                      color: Color.fromRGBO(189,35,11,10),),
                    child: Align(alignment: Alignment.center,
                      child: InkWell(
                        onTap:() {
                          Navigator.push(context, MaterialPageRoute(builder: (context) => emergency(),),);},
                        child: Text("Emergency",
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 20,color: Colors.white,fontFamily: "Manjari",
                              shadows: <Shadow>[Shadow(
                                offset: Offset(0.8, 0.8), blurRadius: 5, color: Colors.white,
                              )]),),
                      ),),),
                ],




              ),
            ),
          ],
        ),


      ],
    );



  }
}