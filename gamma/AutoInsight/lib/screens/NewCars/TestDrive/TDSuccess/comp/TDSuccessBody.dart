import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class TDSuccessBody extends StatelessWidget {
  const TDSuccessBody({super.key});

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
          image: DecorationImage(
            image: AssetImage("assets/bg.png"),
            fit: BoxFit.cover,
          ),
        ),
      ),
              Container(margin: EdgeInsets.only(top: 140,left: 100),
                width: 200,
                height: 100,
                child: Text('BOOKING SUCCESSFUL!',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      fontFamily: 'PoppinsSB',
                      fontSize: 30,
                      color: Colors.white),
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
                                    image: AssetImage("assets/contents_red.png")
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
                                    image: AssetImage("assets/home_red.png"),fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.home,color:Colors.white,size: 50)
                      )
                      ),
                      Expanded(child: InkWell(
                          onTap: () {
                            Navigator.push(
                              context, MaterialPageRoute(builder: (context) => const SettingsPage()),
                            );
                          },
                          child: Container(
                            height: 60,
                            width: 50,
                            decoration: const BoxDecoration(
                                image: DecorationImage(
                                    image: AssetImage("assets/settings_red.png"), fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.settings,color:Colors.white,size: 50)
                      )
                      ),
                    ],
                  )
              )//bottom bar
      ],
    ),
      ),
    );
  }
}
