// import 'package:autoinsight/screens/Contents/contents.dart';
// import 'package:autoinsight/screens/FirstScreen/FirstScreen.dart';
// import 'package:autoinsight/screens/Settings/settings.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class ThreeSeriesBody extends StatelessWidget {
  const ThreeSeriesBody({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Scaffold(
          appBar: AppBar(
            title: Image.asset("assets/topbar.png",fit: BoxFit.cover),
            backgroundColor: Colors.black,
          ),
          body: Stack (
            children: [
              Container(
                constraints: const BoxConstraints.expand(),
                decoration: const BoxDecoration(
                  color: Colors.black
                ),
              ),//background
              Container(margin: EdgeInsets.only(top: 5),
                child: const Text("BMW 3 SERIES",
                  style: TextStyle(
                    color: Colors.white,fontSize: 25,
                    fontFamily: 'PoppinsBold'
                  ),
                ),
              ),//title text
              Container(margin: EdgeInsets.only(top: 50),
                child: CarouselSlider(
                  options: CarouselOptions(height: 200.0),
                  items: [1,2,3,4,5,6,7,8].map((i) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                            width: 300,//MediaQuery.of(context).size.width,
                            margin: const EdgeInsets.symmetric(horizontal: 5.0),
                            decoration: const BoxDecoration(
                                color: Colors.black
                            ),
                            child: Image.asset("assets/3_series$i.png"),
                        );
                      },
                    );
                  }).toList(),
                ),
              ), //carousel car images
              Container(margin: EdgeInsets.only(top: 470),
                child: CarouselSlider(
                  options: CarouselOptions(height: 200.0),
                  items: [1,2,3,4].map((i) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          width: 300,//MediaQuery.of(context).size.width,
                          margin: const EdgeInsets.symmetric(horizontal: 5.0),
                          decoration: const BoxDecoration(
                              color: Colors.black
                          ),
                          child: Image.asset("assets/3s_colours$i.png"),
                        );
                      },
                    );
                  }).toList(),
                ),
              ), //carousel car colours
              // Container(margin: EdgeInsets.only(top: 634),
              //     height: 70,
              //     width: 410,
              //     color: Colors.black,
              //     child: Row(
              //       children: [
              //         Expanded(child: InkWell(
              //             onTap: () {
              //               Navigator.push(
              //                   context, MaterialPageRoute(builder: (context) => const Contents())
              //               );
              //             },
              //             child: Container(
              //               height: 60,
              //               width: 60,
              //               decoration: const BoxDecoration(
              //                   image: DecorationImage(
              //                       image: AssetImage("assets/contents_cyan.png")
              //                   )
              //               ),
              //             )
              //           //Icon(Icons.horizontal_split_rounded,color: Colors.white,size: 50)
              //         )
              //         ),
              //         Expanded(child: InkWell(
              //             onTap: () {
              //               Navigator.push(
              //                   context, MaterialPageRoute(builder: (context) => const FirstScreen())
              //               );
              //             },
              //             child: Container(
              //               height: 60,
              //               width: 60,
              //               decoration: const BoxDecoration(
              //                   image: DecorationImage(
              //                       image: AssetImage("assets/home_cyan.png"),fit: BoxFit.contain)
              //               ),
              //             )
              //           //Icon(Icons.home,color:Colors.white,size: 50)
              //         )
              //         ),
              //         Expanded(child: InkWell(
              //             onTap: () {
              //               Navigator.push(
              //                   context, MaterialPageRoute(builder: (context) => const Settings())
              //               );
              //             },
              //             child: Container(
              //               height: 60,
              //               width: 50,
              //               decoration: const BoxDecoration(
              //                   image: DecorationImage(
              //                       image: AssetImage("assets/settings_cyan.png"), fit: BoxFit.contain)
              //               ),
              //             )
              //           //Icon(Icons.settings,color:Colors.white,size: 50)
              //         )
              //         ),
              //       ],
              //     )
              // ),
              Container(margin: EdgeInsets.only(top: 260),
                child: Text('Key Specs',
                    style: TextStyle(
                        color: Colors.white,
                        fontFamily: 'PoppinsMed',
                        fontSize: 25
                    )
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 300),
                height: 200,
                width: 400,
                color: Colors.black,
                child: const Column(
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text('Engine: 2988cc',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text('Max Torque: 500Nm',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Expanded(
                          child: Text('Bhp: 368.788Bhp',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text('Body Type: Sedan',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Expanded(
                          child: Text('Transmission: Automatic',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text('No. of cylinders: 6',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Text('Mileage: 13.06kmpl',
                          style: TextStyle(
                              fontSize: 15,
                              fontFamily: 'PoppinsLight',
                              color: Colors.white
                          ),
                        ),
                      ],
                    ),
                    Row(
                      children: [
                        Text('Fuel: Petrol',
                          style: TextStyle(
                              fontSize: 15,
                              fontFamily: 'PoppinsLight',
                              color: Colors.white
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              //details
              Container(margin: EdgeInsets.only(top: 440),
                child: Text('Colour Availability',
                  style: TextStyle(
                      fontSize: 20,
                      fontFamily: 'PoppinsMed',
                      color: Colors.white
                  ),
                ),
              ),

            ],
          )
          ,
    )
    );
  }
}
