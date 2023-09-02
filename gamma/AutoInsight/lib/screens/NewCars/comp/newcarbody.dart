import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/NewCars/BookCars/Newbook/Newbook.dart';
import 'package:autoinsight/screens/NewCars/BookCars/bookcars.dart';
import 'package:autoinsight/screens/NewCars/TestDrive/SlotDetails/TDSlot.dart';
import 'package:autoinsight/screens/NewCars/TestDrive/testdrive.dart';
import 'package:autoinsight/screens/NewCars/ViewCar/viewcar.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class newcarbody extends StatelessWidget {
  const newcarbody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
          backgroundColor: Colors.black,
        ),
        // extendBody: true,
        body: Stack(
            children: [
              Container(
                constraints: const BoxConstraints.expand(),
                decoration: const BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage("assets/bg2.png"),
                      fit: BoxFit.cover
                  ),
                ),
              ),
              GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 2.0,
                mainAxisSpacing: 2.0,
                children: [
                  InkWell(
                    onTap: () {
                      Navigator.push(
                          context,MaterialPageRoute(builder: (context)=> ViewCar() ));
                      },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/viewcar.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.push(context,MaterialPageRoute(builder: (context)=> newbook() ));
                      },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/bookcar.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                  InkWell(
                      onTap: (){
                        Navigator.push(context,MaterialPageRoute(builder: (context)=> TDSlot() ));
                        },
                    child: Container(
                      height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/testdrive.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                ],
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
                    ],
                  )
              )//bottom bar
            ]
        ),
      ),
    );
  }
}
