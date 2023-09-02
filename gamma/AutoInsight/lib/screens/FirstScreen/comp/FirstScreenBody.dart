import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Maintenance/maintenanceView.dart';
import 'package:autoinsight/screens/Maintenance/threeSmaintenance.dart';
import 'package:autoinsight/screens/NewCars/newcars.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:autoinsight/screens/UsedCars/Details/details.dart';
import 'package:flutter/material.dart';

class FirstScreenBody extends StatelessWidget {
  const FirstScreenBody({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
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
                    onTap: (){
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const newcars()),
                      );
                    },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/newcar.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                    // onTap: () {
                    //     Navigator.push(context, route),
                    // },
                  ),
                  InkWell(
                  onTap: (){
                    Navigator.push(context,MaterialPageRoute(builder: (context)=> const Details()));
                    },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/usercars.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                  InkWell(//onTap: (){Navigator.push(context,MaterialPageRoute(builder: (context)=> )); }
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/performance.png"),
                              fit: BoxFit.contain)
                      ),
                    ),
                  ),
                  InkWell(
                     onTap: () {
                       Navigator.push(context,MaterialPageRoute(
                           builder: (context)=> maintenanceView()));
                       },
                    child: Container(height: 100,width: 100,
                      decoration: const BoxDecoration(
                          image: DecorationImage(
                              image: AssetImage("assets/maintenance.png"),
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
            ]
        ),
      ),
    );

    // ],
    // ),
    // );
  }

}
