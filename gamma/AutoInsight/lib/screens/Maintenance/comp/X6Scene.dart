import 'package:flutter/material.dart';

class X6Scene extends StatelessWidget {
  const X6Scene({super.key});

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
                'BMW X6 SERIES',
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
                                          text: 'Good ride and handling\nFine engines\nWell-finished cabin\nMany high-tech options',
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
                                          text: 'The steering is a bit numb, not helped by the thick steering wheel',
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
                                    text: 'BMW X3 highlights:\n',
                                    style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem,
                                      color: Color(0xfffffafa),
                                    ),
                                  ),
                                  TextSpan(
                                    text: 'The new larger, BMW kidney grill\nPowerful 2.0 litre, inline 4 cylinder engine\nFully adaptive LED headlamps\nPanoramic sunroof\n12.3” digital instrument cluster\nHarman Kardon Surround system\nSteptronic sports transmission\nTwin turbo engines\nBMW Xdrive\nSensatec upholstery\nBMW live cockpit plus\nDigital enhanced control',
                                    style: TextStyle(fontFamily: 'PoppinsLight',fontWeight: FontWeight.w700),
                                  ),
                                ],
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
                                    text: 'Is the BMW X3 a good car?\n',
                                    style: TextStyle (fontFamily: 'Poppins', fontSize: 8*ffem, fontWeight: FontWeight.w700, height: 1.5*ffem/fem, color: Color(0xffffffff),
                                    ),
                                  ),
                                  TextSpan(
                                    text: 'The BMW X3 is a shark among whales when it comes to family SUVs. If you’re after\npractical transport that doesn’t come up short on driving fun, then it’s definitely worth\nconsidering over and above alternatives such as the Audi Q5, Volvo XC60 and\nMercedes GLC.\nUpdates in late 2021 mean the already handsome X3 now looks more chiselled than a\nyoung Tom Cruise – particularly in the sportier M Sport and M Performance guises.\nIts posh, leather-upholstered cabin received a sharp new 12.3-inch infotainment screen\nand a crisp digital instrument display, though this does look a touch dated now BMW\'s\nnewer cars get a swooping twin-screen setup.\nBut despite this technological glow-up, the X3 is still as functional as ever.\nElectrically-adjustable seats are available as part of an options package, and make\ngetting comfortable behind the optional heated steering wheel a breeze.',
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
                        ],
                      ),
                    ),
                  ),
                  // Padding(
                  //   padding: const EdgeInsets.only(bottom: 350),
                  //   child: Container(
                  //     decoration: BoxDecoration(image: DecorationImage(image: AssetImage("assets/price1.png"))),
                  //   ),
                  // ),
                  // Padding(
                  //   padding: const EdgeInsets.only(top: 580),
                  //   child: Container(
                  //     decoration: BoxDecoration(image: DecorationImage(image: AssetImage("assets/price3.png"))),
                  //   ),
                  // ),
                  // Padding(
                  //   padding: const EdgeInsets.only(top: 120),
                  //   child: Container(
                  //     decoration: BoxDecoration(image: DecorationImage(image: AssetImage("assets/price2.png"))),
                  //   ),
                  // ),

                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
