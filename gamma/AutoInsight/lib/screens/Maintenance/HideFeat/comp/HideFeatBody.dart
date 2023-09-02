import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Maintenance/HideFeat/comp/HideFeatBody2.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class hidefeatbody1 extends StatelessWidget {
  const hidefeatbody1({super.key});

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
                  child: Text('1. Key Fob tricks',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 30,left:20),
                  child: Wrap(
                    children: [
                          Text('Instructions: Pressing the unlock button on the key fob will automatically'
                          'open all the windows and sunroof of the car.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                        ],
                  )),
              Container(height: 200, width: 200,
                margin: EdgeInsets.only(top: 12,left: 85),
                  decoration: const BoxDecoration(
                    image: DecorationImage(image: AssetImage("assets/trick1.png"))
                  ),
              ),

              Container(margin: EdgeInsets.only(top: 160,left:10),
                  child: Text('2. Remote start',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 180,left:20),
                  child: Wrap(
                    children: [
                        Text('Instructions: Pressing the BMW logo button on the key fob starts the car'
                        'remotely. Press the BMW logo button the key fob three times to shut down'
                        'the car.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                      ],
                  )),

              Container(margin: EdgeInsets.only(top: 240,left:10),
                  child: Text('3. Winter wipe mode',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 260,left:20),
                  child: Wrap(
                    children: [
                        Text('Instructions: Holding down the right shifter down for 5 seconds. This makes'
                        'the wiper stand still which makes it easier to replace and during winters. Pull'
                        'down the stick oce more to disengage.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                      ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:120.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                    decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick2.png"))
                    ),
                ),
              ),
              Container(margin: EdgeInsets.only(top: 420,left:10),
                  child: Text('4. Reverse tilting mirrors',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 440,left:20),
                  child: Wrap(
                    children: [
                          Text('Instructions: Switch the mirror knob to the required direction and then'
                          'putting the car in reverse will tilt the reverse mirror in the downward direction'
                          'of the respective side.  Really helpful when parking in tight spots or parallel'
                          'parking.\n',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                        ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:430.0),
                child: Container(height: 700, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                    decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick3.png"))
                    ),
                ),
              ),
              Positioned(top: 570, left: 300,
                child: InkWell(
                  onTap: (){
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const hidefeatbody2()),
                    );
                  },
                  child: Container(height: 50,width: 50,
                    decoration: const BoxDecoration(
                        image: DecorationImage(
                            image: AssetImage("assets/nextarrow.png"),
                            fit: BoxFit.contain)
                    ),
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
