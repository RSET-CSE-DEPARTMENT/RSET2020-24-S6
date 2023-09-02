import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BookingSuccessBody extends StatelessWidget {
  const BookingSuccessBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
          backgroundColor: Colors.black,
          automaticallyImplyLeading: false,
        ),
        body: Stack(
            children: [
        Container(
              color: Colors.black,
        ),
          //bg
          Container(height: 150,width: 150,
          margin: EdgeInsets.only(top: 80,left: 114),
              decoration: const BoxDecoration(
              image: DecorationImage(
              image: AssetImage("assets/mLogo.png"),
              fit: BoxFit.contain)
          ),
          ),
              //mLogo
              Container(
                margin: EdgeInsets.only(top: 280,left: 50),
                child: Text('CONGRATS!!\nBOOKING SUCCESSFUL!',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 25,
                      fontFamily: 'PoppinsMed',
                  ),
                ),
              ),
              //booking successful message
              Container(
                height: 100,
                width: 250,
                margin: EdgeInsets.only(top: 450,left: 66),
                child: Text('Our showroom executive will contact you shortly',
                  textAlign: TextAlign.center,
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontFamily: 'PoppinsEL',
                  ),
                ),
              ),
              //contact message
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
              )
              //bottowm row
      ],
    ),
    );
  }
}
