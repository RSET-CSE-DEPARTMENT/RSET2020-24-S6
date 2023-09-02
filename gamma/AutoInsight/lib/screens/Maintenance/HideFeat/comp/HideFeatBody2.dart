import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Maintenance/HideFeat/comp/HideFeatBody3.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class hidefeatbody2 extends StatelessWidget {
  const hidefeatbody2({super.key});

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
                  child: Text('5. Kick to open trunk',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 30,left:20),
                  child: Wrap(
                    children: [
                      Text(' Instructions: Put the key fob in your pocket and then make a kicking motion'
                  'under the back side of the car to open the trunk automatically. Do the same'
                  'motion to close the trunk too. Helpful when are hands are full and need to'
                  'open the trunk to access something. ',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Container(height: 300, width: 200,
                margin: EdgeInsets.only(top: 12,left: 85),
                decoration: const BoxDecoration(
                    image: DecorationImage(image: AssetImage("assets/trick4.png"))
                ),
              ),

              Container(margin: EdgeInsets.only(top: 210,left:10),
                  child: Text('6. Left paddle long pull',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 230,left:20),
                  child: Wrap(
                    children: [
                      Text('Instructions: Keep pressing the left paddle shifters in the car to increase the'
                  'rev range by 2000rpm.  Useful while overtaking other cars.',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:60.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                  decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick6.png"))
                  ),
                ),
              ),

              Container(margin: EdgeInsets.only(top: 350,left:10),
                  child: Text('7. Launch control',style: TextStyle(fontFamily: 'PoppinsMed',fontSize: 12,color: Colors.white),)),
              Container(margin: EdgeInsets.only(top: 370,left:20),
                  child: Wrap(
                    children: [
                      Text(' Instructions: can be accessed through the infotainment system under'
                  'car>sport>launch control. Toggling this feature holds the engines RPM at'
                    'a set number allowing for the car to build power before the computer or'
                  'operator disengages the clutch',style: TextStyle(fontFamily: 'PoppinsLight',fontSize: 12,color: Colors.white),),
                    ],
                  )),
              Padding(
                padding: const EdgeInsets.only(top:280.0),
                child: Container(height: 450, width: 200,
                  margin: EdgeInsets.only(top: 30,left: 85),
                  decoration: const BoxDecoration(
                      image: DecorationImage(image: AssetImage("assets/trick7.png"))
                  ),
                ),
              ),

              Positioned(top: 570, left: 300,
                child: InkWell(
                  onTap: (){
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const hidefeatbody3()),
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
