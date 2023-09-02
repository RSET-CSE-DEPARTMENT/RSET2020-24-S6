import 'package:autoinsight/screens/CarBook/PreviousBook/PreviousBook.dart';
import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/NewCars/BookCars/bookcars.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/material.dart';

class newbookbody extends StatelessWidget {
  const newbookbody({super.key});

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
            //bg
            Row(
              children: [
                InkWell(
                  onTap: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context)=> prevbook()));
                  },
                  child: Container(
                    margin: EdgeInsets.only(top: 10,left: 20),
                    height: 150,
                    width: 160,
                    decoration: BoxDecoration(color: Color(0xff18E2E2),
                        borderRadius: BorderRadius.circular(20)),
                    child: Container(margin: EdgeInsets.only(top: 35),
                      child: Text('PREVIOUS BOOKINGS',
                        style: TextStyle(color: Colors.black,fontFamily: 'Poppins',fontSize: 25),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(
                        context,MaterialPageRoute(builder: (context)=> bookcars() ));
                  },
                  child: Container(
                    margin: EdgeInsets.only(top: 10,left: 10),
                    height: 150,
                    width: 160,
                    decoration: BoxDecoration(color: Color(0xff18E2E2),
                        borderRadius: BorderRadius.circular(20)),
                    child: Container(margin: EdgeInsets.only(top: 35),
                      child: Text('BOOK NEW CAR',
                        style: TextStyle(color: Colors.black,fontFamily: 'Poppins',fontSize: 25),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                )
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


        ]
              ),
      ),
              ]
    ),
    ),
    );
  }
}
