import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'dart:ui';

class Scene extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double baseWidth = 390;
    double fem = MediaQuery.of(context).size.width / baseWidth;
    double ffem = fem * 0.97;
    return Container(
      width: double.infinity,
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration (
          color: Color(0xff000000),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              // autogrouptzvvUL1 (96Pk8kiscwnNLUAqdrtZvV)
              margin: EdgeInsets.fromLTRB(0*fem, 0*fem, 0*fem, 10*fem),
              padding: EdgeInsets.fromLTRB(3*fem, 3*fem, 3*fem, 4*fem),
              width: double.infinity,
              height: 1*fem,
              decoration: BoxDecoration (
                color: Color(0xff000000),
                borderRadius: BorderRadius.only (
                  bottomRight: Radius.circular(15*fem),
                  bottomLeft: Radius.circular(15*fem),
                ),
              ),
              child: Align(
                // image2qZs (344:34)
                alignment: Alignment.centerLeft,
                child: SizedBox(
                  width: 56*fem,
                  height: 54*fem,
                ),
              ),
            ),
            Container(
              // bmw3seriesKjw (345:36)
              // width: double.infinity,
              child: Text(
                'BMW 3 SERIES',
                textAlign: TextAlign.center,
                style: TextStyle (fontFamily: 'Poppins', fontSize: 20*ffem, fontWeight: FontWeight.w600, height: 1.5*ffem/fem, color: Color(0xffffffff),
                ),
              ),
            ),
            Container(
              // autogroupkunz9U5 (96PkH5pKzqJdfkhTxGkUnZ)
              width: 4217*fem,
              height: 1573*fem,
              child: Stack(
                children: [
                  Positioned(
                    // rectangle72Gy (344:5)
                    left: 0*fem,
                    top: 684*fem,
                    child: Align(
                      child: SizedBox(width: 390*fem, height: 61*fem,
                        child: Container(
                          decoration: BoxDecoration (
                            color: Color(0xff000000),
                          ),
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    // frame48Jr5 (346:37)
                    left: 0*fem,
                    top: 0*fem,
                    child: Container(
                      padding: EdgeInsets.fromLTRB(8*fem, 8*fem, 0*fem, 79*fem), width: 374*fem, height: 1573*fem,
                      decoration: BoxDecoration (
                        color: Color(0xff000000),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            // autogroupaxr9pxq (96PknpTnJewLV9ASXXAxr9)
                            margin: EdgeInsets.fromLTRB(4*fem, 0*fem, 12*fem, 7*fem),
                            width: double.infinity,
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  // prosfunctionalhightechinterior (346:39)
                                  margin: EdgeInsets.fromLTRB(0*fem, 5*fem, 14*fem, 0*fem),
                                  constraints: BoxConstraints (
                                    maxWidth: 132*fem,
                                  ),
                                  child: RichText(
                                    text: TextSpan(
                                      style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w300, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                      ),
                                      children: [
                                        TextSpan(
                                          text: 'Pros\n',
                                          style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                          ),
                                        ),
                                        TextSpan(
                                          text: 'Functional, high-tech interior\nBalance of comfort and handling\nSmooth, punchy engine',
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                Container(margin: EdgeInsets.fromLTRB(0*fem, 0*fem, 3*fem, 0*fem), width: 1*fem, height: 80*fem, decoration: BoxDecoration (color: Color(0xffffffff),
                                  ),
                                ),
                                Container(
                                  // consmissingadaptivecruisecontr (346:41)
                                  margin: EdgeInsets.fromLTRB(0*fem, 5*fem, 0*fem, 0*fem),
                                  constraints: BoxConstraints (
                                    maxWidth: 200*fem,
                                  ),
                                  child: RichText(
                                    text: TextSpan(
                                      style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w300, height: 1.5*ffem/fem, color: Color(0xfffffdfd),
                                      ),
                                      children: [
                                        TextSpan(
                                          text: 'Cons\n',
                                          style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xfffffdfd),
                                          ),
                                        ),
                                        TextSpan(
                                          text: 'Missing adaptive cruise control\nFour-cylinder engine lacks the character of a BMW six\nThree-year warranty isn\'t good enough',
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            // line25NH (346:43)
                            margin: EdgeInsets.fromLTRB(1*fem, 0*fem, 0*fem, 7*fem), width: 357*fem, height: 1*fem,
                            decoration: BoxDecoration (
                              color: Color(0xffffffff),
                            ),
                          ),
                          Container(
                            // bmw330ihighlights19inchalloywh (346:45)
                            margin: EdgeInsets.fromLTRB(4*fem, 0*fem, 0*fem, 0*fem),
                            constraints: BoxConstraints (
                              maxWidth: 333*fem,
                            ),
                            child: RichText(
                              text: TextSpan(
                                style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w300, height: 1.5*ffem/fem,
                                  color: Color(0xfffffafa),
                                ),
                                children: [
                                  TextSpan(
                                    text: 'BMW 330i highlights:\n',
                                    style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem,
                                      color: Color(0xfffffafa),
                                    ),
                                  ),
                                  TextSpan(
                                    text: '19-inch alloy wheels\nSemi-autonomous parking assist\nVernasca leather upholstery\nAdaptive cruise control with stop/go (currently N/A due to semiconductor shortage)\nSurround-view camera\nFront cross-traffic alert\nLane-keeping assist\nBMW Digital Key\nKeyless entry',
                                    style: TextStyle(fontFamily: 'PoppinsLight',fontWeight: FontWeight.w700),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Container(
                            // inchdigitalinstrumentcluster10 (346:47)
                            margin: EdgeInsets.fromLTRB(4*fem, 0*fem, 0*fem, 8*fem),
                            constraints: BoxConstraints (
                              maxWidth: 338*fem,
                            ),
                            child: Text(
                              '12.3-inch digital instrument cluster\n10.25-inch touch screen infotainment system\nWireless Apple CarPlay and Android Auto\nDAB+ digital radio\nSatellite navigation\nHead-up display\nAutomatic LED headlights with LED daytime running lights\nAutomatic high-beam\nRain-sensing wipers\nKeyless entry and start\nFront and rear parking sensors\nReversing camera\nHeated and folding exterior mirrors\nWireless phone charging (currently missing due to semiconductor shortage)\nVernasca leather upholstery (Luxury Line) or Alcantara/Sensatec upholstery (M Sport)\nWood trim\n10-speaker sound system\n18-inch alloy wheels',
                              style: TextStyle (fontFamily: 'PoppinsLight', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                              ),
                            ),
                          ),
                          Container(
                            // line3hkM (346:48)
                            margin: EdgeInsets.fromLTRB(1*fem, 0*fem, 0*fem, 4*fem), width: 357*fem, height: 1*fem,
                            decoration: BoxDecoration (
                              color: Color(0xffffffff),
                            ),
                          ),
                          Container(
                            // isthebmw330imsportsafethebmw3s (346:49)
                            margin: EdgeInsets.fromLTRB(4*fem, 0*fem, 0*fem, 2*fem),
                            constraints: BoxConstraints (
                              maxWidth: 361*fem,
                            ),
                            child: RichText(
                              text: TextSpan(
                                style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w300, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                ),
                                children: [
                                  TextSpan(
                                    text: 'Is the BMW 330i M Sport safe?\n',
                                    style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                    ),
                                  ),
                                  TextSpan(
                                    text: 'The BMW 3 Series was crash tested by ANCAP back in 2019 and received a five-star safety \nrating.\nIt scored 97 per cent for adult occupant protection, 87 per cent for child occupant \nprotection, 87 per cent for vulnerable road user protection, and 77 per cent for safety assist.\nStandard safety features across the 3 Series line-up includes:\nAutonomous emergency braking with pedestrian detection\nLane departure warning\nBlind-spot monitoring\nDriver attention monitoring\nRear cross-traffic alert\nReversing camera\nFront and rear parking sensors\nEight airbags\nThe 330i on test also featured:\nFront cross-traffic alert\nLane-keep assist\nSemi-autonomous parking assist\nSurround-view camera',
                                    style: TextStyle(fontFamily: 'PoppinsLight',fontWeight: FontWeight.w700),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Container(
                            // line4QkZ (346:50)
                            margin: EdgeInsets.fromLTRB(1*fem, 0*fem, 0*fem, 6*fem), width: 357*fem, height: 1*fem,
                            decoration: BoxDecoration (
                              color: Color(0xffffffff),
                            ),
                          ),
                          Container(
                            // howmuchdoesthebmw330imsportcos (346:51)
                            margin: EdgeInsets.fromLTRB(4*fem, 0*fem, 0*fem, 14*fem),
                            constraints: BoxConstraints (
                              maxWidth: 362*fem,
                            ),
                            child: RichText(
                              text: TextSpan(
                                style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w300, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                ),
                                children: [
                                  TextSpan(
                                    text: 'How much does the BMW 330i M Sport cost to run?\n',
                                    style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w600, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                    ),
                                  ),
                                  TextSpan(
                                    text: 'The BMW 3 Series range is covered by a three-year, unlimited-kilometre warranty with \nthree years of roadside assist.\nBMW is stuck in the mud when it comes to warranty, staunchly refusing to move with the \nlikes of Mercedes-Benz and Jaguar Land Rover to five years of coverage.\nAlong with Alfa Romeo, it’s one of the few brands still offering a three-year warranty in India.\nBMW offers a three-year/40,000km service pack for 1.2 lakhs, and a five-years/80,000km \npackage for 2 lakhs.',
                                    style: TextStyle(fontFamily: 'PoppinsLight',fontWeight: FontWeight.w700),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Container(
                            // buyerreviewsmB7 (350:55)
                            margin: EdgeInsets.fromLTRB(3*fem, 160*fem, 0*fem, 3*fem),
                            child: Text(
                              'Buyer Reviews:\n',
                              style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                              ),
                            ),
                          ),
                          Container(
                            // frame491Um (351:62)
                            margin: EdgeInsets.fromLTRB(58*fem, 0*fem, 88*fem, 7*fem),
                            padding: EdgeInsets.fromLTRB(6*fem, 3*fem, 0*fem, 4*fem),
                            width: double.infinity,
                            height: 60*fem,
                            decoration: BoxDecoration (
                              color: Color(0xff000000),
                            ),
                          ),
                          Container(
                            // frame4926M (351:70)
                            margin: EdgeInsets.fromLTRB(57*fem, 0*fem, 89*fem, 14*fem),
                            padding: EdgeInsets.fromLTRB(8*fem, 8*fem, 0*fem, 8*fem),
                            width: double.infinity,
                            height: 60*fem,
                            decoration: BoxDecoration (
                              color: Color(0xff000000),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    // carexpertstakeonthebmw330imspo (346:53)
                    left: 18*fem,
                    top: 740*fem,
                    child: Align(
                      child: SizedBox(width: 4000*fem, height: 12*fem,
                        child: Wrap(
                          children: [
                            RichText(
                              text: TextSpan(
                                style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w300, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                ),
                                children: [
                                  TextSpan(
                                    text: 'CarExpert’s Take on the BMW 330i M Sport\n',
                                    style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                    ),
                                  ),
                                  TextSpan(
                                    text: 'BMW might not be defined by the 3 Series anymore, but it’s arguably the best car the brand \nmakes in 2022.\nNot only is the 3 Series still right up there as a class-leader, the 330i is the sweet spot in the\n range. It offers a brilliant blend of practicality, performance, and everyday comfort, \nwrapped in a design that hits all the right notes.\nIt’s not perfect, though. The chip crunch has hit BMW hard, and the fact the 330i doesn’t \ncurrently come with adaptive cruise control as standard (and that some owners have\n missed out on touchscreens) undermines its credentials as a premium sedan.\nWe’d recommend searching (or waiting) for a car with a full equipment list. Not only will it \nmake the car better day-to-day, it should pay off come trade-in time.\nIf you’re happy to pocket a few hundred extra dollars and go without that kit, you’re still \ngetting a brilliant mid-sized sedan. The 3 Series still sets the standards, and the \nnew C-Class will have to be very good to knock it off its perch.',
                                    style: TextStyle(fontFamily: 'PoppinsLight',fontWeight: FontWeight.w700),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Positioned(left: 18*fem, top: 920*fem,
                    child: Align(
                      child: SizedBox(width: 4036*fem, height: 12*fem,
                        child: Wrap(
                          children:[ Text(
                            'I like the Cognac interiors and leather are of good quality. Compared to X4 that I \nchecked, 320Ld has soft touch plastics for entire door pad, has better ambient \nlights and larger screen make’s the interior a better place to be. Front seats are \naccommodative and gets under thigh support extenders. Cushion has right \nfirmness to aid both city and long highway drives. Rear seat is wonderful place to be. \nOodles of leg space and with legs stretched there is decent under thigh support too. I am \n5’10 and find headroom adequate too. Special mention for the rear headrests, they are very \nwell designed. I am not much into features and don’t buy car for feature it offers. In current\ntimes, features get outdated in 6 months- 1 year. I am happy if car offer basic features \nwhich 320Ld does. Digital displays, electric seats, reversing assistant, sunroof etc. However \nalso misses some basic stuff like comfort access, ventilated seats.Overall good place to be \nfor enthusiastic driver as well as the family members.',
                            style: TextStyle (fontFamily: 'PoppinsLight', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                            ),
                          ),
                        ],
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 595,
                    left: 76,
                    child: Container(margin: EdgeInsets.only(top: 470), height: 60, width: 230,
                      child: CarouselSlider(
                        options: CarouselOptions(height: 80.0),
                        items: [1,2,3,4,5].map((i) {
                          return Builder(
                            builder: (BuildContext context) {
                              return Container(
                                width: 300,
                                margin: const EdgeInsets.symmetric(horizontal: 5.0),
                                decoration: const BoxDecoration(
                                    color: Colors.black
                                ),
                                child: Image.asset("assets/threeSmain$i.png"),
                              );
                            },
                          );
                        }).toList(),
                      ),
                    ),
                  ),
                  Positioned(
                    left: 18*fem,
                    top: 1140*fem,
                    child: Align(
                      child: SizedBox(width: 4205*fem, height: 12*fem,
                        child: Wrap(
                          children: [
                            Text(
                              'I have not driven the 320Ld yet, but have driven the 320d a lot and recently also \ndrove a "lowered" 330i GT through pretty bad roads. All these cars handle bad roads \nsurprisingly well. As you correctly said, you have to be careful and can not drive this \nlike a SUV. However, with proper care while driving, these cars can handle some \npretty bad terrain. I have driven my 320d with 4 people (and their luggage) on board on \nsome very bad roads too. It still managed without scrapping with some careful driving. And \nthe best part is the built-in under-body protection. The BMWs in India come with the rough \nroad package, which includes a complete metal plate under the car that shields almost \neverything underneath it. Therefore, in the rare case the car does take some hits on bad \nroads, there is enough protection. An occasional scraping on speed breakers will do zero \nharm to the car, thanks again to this under-body protection. This has given me enough \nconfidence to take my car on some really bad roads and so far, it has done the job well.',
                              style: TextStyle (fontFamily: 'PoppinsLight', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Positioned(
                    top: 820,
                    left: 76,
                    child: Container(margin: EdgeInsets.only(top: 470),
                      height: 80,
                      width: 230,
                      child: CarouselSlider(
                        options: CarouselOptions(height: 150.0),
                        items: [1,2,3,4,5,6,7].map((i) {
                          return Builder(
                            builder: (BuildContext context) {
                              return Container(
                                width: 300,
                                margin: const EdgeInsets.symmetric(horizontal: 5.0),
                                decoration: const BoxDecoration(
                                    color: Colors.black
                                ),
                                child: Image.asset("assets/threeSm$i.png"),
                              );
                            },
                          );
                        }).toList(),
                      ),
                    ),
                  ),
                  Positioned(
                    left: 18*fem,
                    top: 1360*fem,
                    child: Align(
                      child: SizedBox(
                        width: 2528*fem,
                        height: 12*fem,
                        child: Wrap(
                          children: [
                            Text(
                              'I am not very convinced with all black grille, probably will need some time. I find the\ncurrent chrome with black inserts quite decent and feel all black may be too much \nblack. Anyway probably wait for sometime and decide.The car otherwise has been \nlovely, mostly driving on comfort and sport mode. Despite heavy right foot FE has \nbeen fantastic. Coming from gas guzzling Body om frame SUV this was a pleasant \nsurprise. Sunroof is overrated, atleast has been that way in my case, heats up the \ncabin and not comfortable driving with glass open.Did some detailing over the \nweekend, mineral white has good shine.',
                              style: TextStyle (fontFamily: 'PoppinsLight', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}