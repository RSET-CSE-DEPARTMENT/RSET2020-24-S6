import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class hidefeatbody4 extends StatelessWidget {
  const hidefeatbody4({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
          backgroundColor: Colors.black,
        ),
        body: Stack(
            children: [
              Container(
                constraints: const BoxConstraints.expand(),
                decoration: const BoxDecoration(
                    color: Colors.black
                ),
              ),
              Container(margin: EdgeInsets.only(top: 10,left:10),
                  child: Text('11. Schedule remote engine start',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 30,left:20),
                  child: Wrap(
                    children: [
                      Text('Instructions: Access this option in the infotainment screen under car>conv-'
                  'enience>schedule auto start. This option automatically starts your vehicle at'
                  'a certain time of your convenience. Helpful in cold regions where the engine'
                  'has to be heated before driving the car.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Container(height: 300, width: 200,
                margin: EdgeInsets.only(top: 12,left: 85),
                decoration: const BoxDecoration(
                    image: DecorationImage(image: AssetImage("assets/trick13.png"))
                ),
              ),

              Container(margin: EdgeInsets.only(top: 210,left:10),
                  child: Text('12. Blind spot detection',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 230,left:20),
                  child: Wrap(
                    children: [
                      Text('Instructions: There are additional blind spot lights on the mirrors on either'
                  'side of the car which blinks when there is a car present in our blind spot and'
                  'warns against changing lanes',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:90.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                  decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick11.png"))
                  ),
                ),
              ),

              Container(margin: EdgeInsets.only(top: 410,left:10),
                  child: Text('13. Preconditioning',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 430,left:20),
                  child: Wrap(
                    children: [
                      Text(' Instructions: press the start stop button of the vehicle and then the pre-'
                  'conditioning option pops up on the infotainment screen. Helps maintain a'
                  'desired temperature inside the vehicle while leaving it for a brief period of'
                    'time.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:370.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 60,left: 85),
                  decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick12.png"))
                  ),
                ),
              ),

              Container(margin: EdgeInsets.only(top: 634),
                height: 70,
                width: 410,
                color: Colors.black,
                child: Row(
                    children: [
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                                context, MaterialPageRoute(builder: (context) => const Contents())
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 60,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/contents_cyan.png")
                                )
                            ),
                          )
                        //Icon(Icons.horizontal_split_rounded,color: Colors.white,size: 50)
                      )
                      ),
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                                context, MaterialPageRoute(builder: (context) => const FirstScreen())
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 60,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/home_cyan.png"),fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.home,color:Colors.white,size: 50)
                      )
                      ),
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                                context, MaterialPageRoute(builder: (context) => const SettingsPage())
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 50,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/settings_cyan.png"), fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.settings,color:Colors.white,size: 50)
                      )
                      ),


                    ]
                ),
              ),
            ]
        ),
      ),
    );
  }
}
