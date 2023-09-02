import 'package:autoinsight/screens/CarBook/BookingDetails/BookingDetails.dart';
import 'package:autoinsight/screens/CarBook/BookingDetails/Pass.dart';
import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class X6BookBody extends StatefulWidget {
  const X6BookBody({super.key});

  @override
  State<X6BookBody> createState() => _X6BookBodyState();
}

class _X6BookBodyState extends State<X6BookBody> {
  List<String> colour = ['Black','Blue','Navy Blue','Chocolate','Grey','Green','Red','White'];
  List<String> interior = ['Grey/Bxrown','Black','Red','Cream','Brown'];

  int _currentColour = 0;
  int _currentInt = 0;

  Pass obj = new Pass();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png", fit: BoxFit.cover),
          backgroundColor: Colors.black,

        ),
        body: Stack (
          children: [
            Container(
              constraints: const BoxConstraints.expand(),
              decoration: const BoxDecoration(
                  color: Colors.black
              ),
            ),
            Container(margin: EdgeInsets.only(top: 10, left: 5),
              child: const Text("BMW X6 SERIES",
                style: TextStyle(
                    color: Colors.white,fontSize: 25,
                    fontFamily: 'PoppinsBold'
                ),
              ),
            ),
            //model text
            Container(margin: EdgeInsets.only(top: 50, left: 5),
              child: const Text("Select Colour",
                style: TextStyle(
                    color: Colors.white,fontSize: 20,
                    fontFamily: 'PoppinsMed'
                ),
              ),
            ),
            //colour text
            Container(margin: EdgeInsets.only(top: 80),
              child: CarouselSlider(
                options: CarouselOptions(height: 200.0,
                  onPageChanged: (index, reason) {
                    _currentColour = index;
                    setState(() {});
                  },
                ),
                items: [1,2,3,4,5,6,7,8].map((i) {
                  return Builder(
                    builder: (BuildContext context) {
                      return Container(
                        width: 300,//MediaQuery.of(context).size.width,
                        margin: const EdgeInsets.symmetric(horizontal: 5.0),
                        decoration: const BoxDecoration(
                            color: Colors.black
                        ),
                        child: Image.asset("assets/X6book$i.png"),
                      );
                    },
                  );
                }).toList(),
              ),
            ),
            //carousel colour
            Container(margin: EdgeInsets.only(top: 300, left: 5),
              child: const Text("Select Interior",
                style: TextStyle(
                    color: Colors.white,fontSize: 20,
                    fontFamily: 'PoppinsMed'
                ),
              ),
            ),
            //interior text
            Container(margin: EdgeInsets.only(top: 340),
              child: CarouselSlider(
                options: CarouselOptions(height: 200.0,
                  onPageChanged: (index, reason) {
                    _currentInt = index;
                    setState(() {});
                  },
                ),
                items: [1,2,3,4,5].map((i) {
                  return Builder(
                    builder: (BuildContext context) {
                      return Container(
                        width: 300,//MediaQuery.of(context).size.width,
                        margin: const EdgeInsets.symmetric(horizontal: 5.0),
                        decoration: const BoxDecoration(
                            color: Colors.black
                        ),
                        child: Image.asset("assets/X6Int$i.png"),
                      );
                    },
                  );
                }).toList(),
              ),
            ),
            //carousel interior
            Positioned(top: 550, left: 155,
              child: InkWell(
                onTap: (){
                  obj.recieveCI(colour[_currentColour], interior[_currentInt]);
                  obj.receiveModel('X6 Series');
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const BookingDetails()),
                  );
                },
                child: Container(height: 50,width: 50,
                  //margin: EdgeInsets.only(top: 420,left: 310),
                  decoration: const BoxDecoration(
                      image: DecorationImage(
                          image: AssetImage("assets/nextarrow.png"),
                          fit: BoxFit.contain)
                  ),
                ),
              ),
            ),
            //arrow
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
            ),
            //bottom row
          ],
        ),
      ),
    );
  }
}
