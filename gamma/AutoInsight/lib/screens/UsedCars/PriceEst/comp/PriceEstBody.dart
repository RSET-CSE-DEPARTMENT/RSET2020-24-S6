import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class PriceEstBody extends StatelessWidget {
  const PriceEstBody({super.key});

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
                  image: AssetImage("assets/PriceEstbg.png"),
                  fit: BoxFit.cover,
                ),
              ),
            ),
              //bg
              Container(
                margin: EdgeInsets.only(top: 20,left: 63),
                child: Text('Price estimate',
                  style: TextStyle(
                    fontFamily: 'PoppinsEBItalic',
                    fontSize: 35,
                    color: Colors.white,
                  ),
                ),
              ),
              //text
              Container(margin: EdgeInsets.only(top: 100,left: 50),
                height: 50,
                width: 300,
                child: TextField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(hintText: 'Rs 18,00,000',hintStyle: TextStyle(color: Colors.white24)),
                  cursorColor: Colors.white,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(40),
                  color: Color(0XFF184026).withOpacity(0.42),
                ),
              ),
              //price box
              Container(
                height: 140,
                width: 400,
                margin: EdgeInsets.only(top: 270),
                child: InkWell(
                  child: Text('Contact us\nJuhu LaneAndheri WestMumbai\n400058, Maharashtra\nTel.: +91-22 6677 7777\nEmail: info-mumbai@bmw-navnitmotors.in',
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontSize: 16,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
              //address
              Container(margin: EdgeInsets.only(top: 634),
                  height: 70,
                  width: 410,
                  color: Colors.black.withOpacity(0.5),
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
                                    image: AssetImage("assets/contents_green.png")
                                )
                            ),
                          )
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
                                    image: AssetImage("assets/home_green.png"),fit: BoxFit.contain)
                            ),
                          )
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
                                    image: AssetImage("assets/settings_green.png"), fit: BoxFit.contain)
                            ),
                          )
                      )
                      ),
                    ],
                  )
              ),
              //bottom bar
      ],
    ),
      ),
    );
  }
}
