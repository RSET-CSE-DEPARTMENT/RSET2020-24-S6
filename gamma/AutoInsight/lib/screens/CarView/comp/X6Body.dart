import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class X6Body extends StatelessWidget {
  const X6Body({super.key});

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
                child: const Text("BMW X6 SERIES",
                  style: TextStyle(
                      color: Colors.white,fontSize: 25,
                      fontFamily: 'PoppinsBold'
                  ),
                ),
              ),//title text
              Container(margin: EdgeInsets.only(top: 50),
                child: CarouselSlider(
                  options: CarouselOptions(height: 200.0),
                  items: [1,2,3,4,5,6,7,8,9,10,11,12,13].map((i) {
                    return Builder(
                      builder: (BuildContext context) {
                        return Container(
                          width: 300,//MediaQuery.of(context).size.width,
                          margin: const EdgeInsets.symmetric(horizontal: 5.0),
                          decoration: const BoxDecoration(
                              color: Colors.black
                          ),
                          child: Image.asset("assets/x6_series$i.png"),
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
                          child: Image.asset("assets/x6_colours$i.png"),
                        );
                      },
                    );
                  }).toList(),
                ),
              ),//carousel car colours
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
                // color: Colors.black,
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
                          child: Text('Max Torque: 450Nm',
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
                          child: Text('Bhp: 335.25Bhp',
                            style: TextStyle(
                                fontSize: 15,
                                fontFamily: 'PoppinsLight',
                                color: Colors.white
                            ),
                          ),
                        ),
                        Expanded(
                          child: Text('Body Type: SUV',
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
                        Text('Mileage: 10.35kmpl',
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
                        Text('Fuel: Petrol/Diesel',
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
