import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/NewCars/newcars.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:autoinsight/screens/UsedCars/Details/details.dart';
import 'package:autoinsight/screens/UsedCars/PriceEst/priceEst.dart';
import 'package:flutter/material.dart';

class ContentsBody extends StatelessWidget {
  const ContentsBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png", fit: BoxFit.cover),
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
            Container(
              color: Colors.black,
              margin: const EdgeInsets.only(top: 20),
              height: 150,
              width: 250,
              child:  Column(
                children: [
                    Padding(
                      padding: EdgeInsets.only(left: 8.0),
                      child: Row(
                        children: [
                          InkWell(
                            onTap: () {
                              Navigator.push(context,MaterialPageRoute(builder: (context)=> newcars() ));
                            },
                            child: const Text("New Car",
                            style: TextStyle(
                              fontSize: 25,
                              fontFamily: 'PoppinsMed',
                              color: Colors.white
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        InkWell(
                          onTap: () {
                    Navigator.push(context,MaterialPageRoute(builder: (context)=> Details() ));
                    },
                          child: Text("Used Car",
                            style: TextStyle(
                              fontSize: 25,
                              fontFamily: 'PoppinsMed',
                              color: Colors.white,
                              ),
                            ),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("Sell Car",
                          style: TextStyle(
                            fontSize: 25,
                            fontFamily: 'PoppinsMed',
                            color: Colors.white,
                            ),
                          ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            //top contents
            Container(
              margin: EdgeInsets.only(top: 350),
              color: Colors.black,
              height: 350,
              width: 250,
              child: const Column(
                children: [
                  Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("Explore more",
                          style: TextStyle(
                            fontFamily: 'PoppinsMed',
                            fontSize: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("Dealer solutions",
                          style: TextStyle(
                            fontFamily: 'PoppinsMed',
                            fontSize: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("Car loan",
                          style: TextStyle(
                            fontFamily: 'PoppinsMed',
                            fontSize: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("EMI Calculator",
                          style: TextStyle(
                            fontFamily: 'PoppinsMed',
                            fontSize: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("Car Insurance",
                          style: TextStyle(
                            fontFamily: 'PoppinsMed',
                            fontSize: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),Padding(
                    padding: EdgeInsets.only(left: 8.0),
                    child: Row(
                      children: [
                        Text("About",
                          style: TextStyle(
                            fontFamily: 'PoppinsMed',
                            fontSize: 25,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            //bottom contents
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
                              context, MaterialPageRoute(builder: (context) => const SettingsPage())
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
            ),//bottom bar
          ],
        ),
      ),
    );
  }
}
