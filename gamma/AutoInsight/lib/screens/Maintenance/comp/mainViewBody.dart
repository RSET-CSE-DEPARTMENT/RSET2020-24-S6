import 'package:autoinsight/screens/CarView/ThreeSeries.dart';
import 'package:autoinsight/screens/CarView/X3.dart';
import 'package:autoinsight/screens/CarView/X6.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Maintenance/X3maintenance.dart';
import 'package:autoinsight/screens/Maintenance/X6maintenance.dart';
import 'package:autoinsight/screens/Maintenance/threeSmaintenance.dart';
import 'package:flutter/material.dart';

class MaintenanceViewBody extends StatelessWidget {
  const MaintenanceViewBody({super.key});

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
                  color: Colors.black,
                ),
              ),
              GridView.count(
                crossAxisCount: 2,
                crossAxisSpacing: 7.0,
                mainAxisSpacing: 0.10,
                children: [
                  InkWell(
                    onTap: (){
                      Navigator.push(
                          context,MaterialPageRoute(builder: (context)=> threeSmaintenance() )); },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/3series.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                    // onTap: () {
                    //     Navigator.push(context, route),
                    // },
                  ),
                  InkWell(//onTap: (){Navigator.push(context,MaterialPageRoute(builder: (context)=> )); }
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/i7series.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: (){
                      Navigator.push(
                          context,MaterialPageRoute(builder: (context)=> X3maintenance() )); },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/x3series.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: (){
                      Navigator.push(
                          context,MaterialPageRoute(builder: (context)=> x6maintenance())); },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/x6series.png"),
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
                                context, MaterialPageRoute(builder: (context) => const FirstScreen())
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
                                context, MaterialPageRoute(builder: (context) => const FirstScreen())
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
    // ],
    // ),
    // );
  }
}
