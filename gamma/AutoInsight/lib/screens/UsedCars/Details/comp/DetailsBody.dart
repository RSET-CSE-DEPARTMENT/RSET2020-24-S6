import 'package:autoinsight/screens/Contents/contents.dart';
import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:autoinsight/screens/UsedCars/PriceEst/priceEst.dart';
import 'package:flutter/material.dart';

class DetailsBody extends StatelessWidget {
  const DetailsBody({super.key});

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
                    image: AssetImage("assets/usedcars.png"),
                    fit: BoxFit.cover,
                ),
              ),
            ),
              //bg
              Container(
                margin: EdgeInsets.only(top: 20),
                child: Text('Enter your car details',
                  style: TextStyle(
                    fontFamily: 'PoppinsEBItalic',
                    fontSize: 35,
                    color: Colors.white,
                  ),
                ),
              ),
              //enter car text
              Container(
                margin: EdgeInsets.only(top: 80, left: 150),
                child: Image.asset("assets/mLogo.png"),
              ),
              //m logo
              Container(margin: EdgeInsets.only(top: 140,left: 110),
                height: 50,
                width: 280,
                child: TextField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(hintText: 'BMW 3 Series',hintStyle: TextStyle(color: Colors.white24)),
                  cursorColor: Colors.white,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(40),
                  color: Color(0XFF184026).withOpacity(0.42),
                ),
              ),
              //model textbox
              Container(margin: EdgeInsets.only(top: 210,left: 110),
                height: 50,
                width: 280,
                child: TextField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(hintText: '2023',hintStyle: TextStyle(color: Colors.white24)),
                  cursorColor: Colors.white,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(40),
                  color: Color(0XFF184026).withOpacity(0.42),
                ),
              ),
              //year textbox
              Container(margin: EdgeInsets.only(top: 280,left: 110),
                height: 50,
                width: 280,
                child: TextField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(hintText: 'Petrol',hintStyle: TextStyle(color: Colors.white24)),
                  cursorColor: Colors.white,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(40),
                  color: Color(0XFF184026).withOpacity(0.65),
                ),
              ),
              //make textbox
              Container(margin: EdgeInsets.only(top: 350,left: 110),
                height: 50,
                width: 280,
                child: TextField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(hintText: '23534',hintStyle: TextStyle(color: Colors.white24)),
                  cursorColor: Colors.white,
                ),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(40),
                  color: Color(0XFF184026),
                ),
              ),
              //kms textbox

              Container(margin: EdgeInsets.only(top: 145),
                child: Text('Model',
                  style: TextStyle(
                    fontSize: 22,
                    fontFamily: 'Poppins',
                    color: Colors.white,
                  ),
                ),
              ),
              //model text
              Container(margin: EdgeInsets.only(top: 215),
                child: Text('Year',
                  style: TextStyle(
                    fontSize: 22,
                    fontFamily: 'Poppins',
                    color: Colors.white,
                  ),
                ),
              ),
              //year text
              Container(margin: EdgeInsets.only(top: 285),
                child: Text('Fueltype',
                  style: TextStyle(
                    fontSize: 22,
                    fontFamily: 'Poppins',
                    color: Colors.white,
                  ),
                ),
              ),
              //make text
              Container(margin: EdgeInsets.only(top: 355),
                child: Text('Kms',
                  style: TextStyle(
                    fontSize: 22,
                    fontFamily: 'Poppins',
                    color: Colors.white,
                  ),
                ),
              ),
              //kms text
              Positioned(top: 410, left: 310,
                child: InkWell(
                  onTap: (){
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const PriceEst()),
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
              //arrow next
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
                                    image: AssetImage("assets/home_green.png"),fit: BoxFit.contain)
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
                                    image: AssetImage("assets/settings_green.png"), fit: BoxFit.contain)
                            ),
                          )
                        //Icon(Icons.settings,color:Colors.white,size: 50)
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
