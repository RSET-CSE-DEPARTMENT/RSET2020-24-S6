import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Maintenance/HideFeat/comp/HideFeatBody2.dart';
import 'package:autoinsight/screens/Maintenance/HideFeat/comp/HideFeatBody4.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class hidefeatbody3 extends StatelessWidget {
  const hidefeatbody3({super.key});

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
                  child: Text('8. Emergency stop',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 30,left:20),
                  child: Wrap(
                    children: [
                      Text('Instructions: While you are driving if need to stop for any emergency press'
                  'and hold the e-parking brake for a few seconds.  The car will come to a safe'
                  'stop even if you are in drive mode. This feature will also call emergency'
                  'services and turn on the hazard lights.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Container(height: 300, width: 200,
                margin: EdgeInsets.only(top: 12,left: 85),
                decoration: const BoxDecoration(
                    image: DecorationImage(image: AssetImage("assets/trick9.png"))
                ),
              ),

              Container(margin: EdgeInsets.only(top: 210,left:10),
                  child: Text('9. Gesture control',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 230,left:20),
                  child: Wrap(
                    children: [
                      Text('Instructions: Hover your hand over the infotainment and rotating it clockwise'
                  'and counter clockwise will increase and decrease the volume respectively.'
                  'Some of the other gestures are given below:',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:90.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                  decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick8.png"))
                  ),
                ),
              ),

              Container(margin: EdgeInsets.only(top: 410,left:10),
                  child: Text('10. Adjustable trunk height',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 430,left:20),
                  child: Wrap(
                    children: [
                      Text('Instructions: To access this setting go to car>setting>door/vehicle access>'
                  'Tailgate option in the infotainment menu and reduce the trunk height to your'
                  'preference. Useful when you have to access the trunk in garages with low'
                  'ceiling height.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:390.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                  decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick10.png"))
                  ),
                ),
              ),

              Positioned(top: 570, left: 300,
                child: InkWell(
                  onTap: (){
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const hidefeatbody4()),
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
