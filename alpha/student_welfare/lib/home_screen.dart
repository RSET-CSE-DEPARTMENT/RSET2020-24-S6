import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:html' as html;
import 'package:student_welfare/auth/login_screen.dart';
void main() {
  runApp(HomeApp());
}

class HomeApp extends StatelessWidget {
  final String url = 'http://127.0.0.1:5500/index.html';


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.orange[200],
          leading: Icon(Icons.school),
          title: Text(''),
          actions: [
            IconButton(
              icon: Icon(Icons.exit_to_app),
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => LoginScreen()),
                );
              },
            ),
          ],
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Image.asset('assets/images/logo2.png'),
              Padding(
                padding:  EdgeInsets.all(10.0),
                child: Container(
                  width: MediaQuery.of(context).size.width * 1.0, // 80% of screen width
                  height: MediaQuery.of(context).size.height * 0.5, // 60% of screen height
                  child: Container(
                    width: 200,
                    height: 100,
                    color: Colors.orange[100],
                    child: Column(
                      children: [
                        Padding(
                          padding: EdgeInsets.all(15.0),
                          child: Text(
                            'Student Welfare Redressal Cell',
                            style: GoogleFonts.bebasNeue(
                              fontWeight: FontWeight.bold,
                              fontSize: 80,
                              color: Colors.blueGrey[900]
                            )
                          ),
                        ),
                        Padding(
                          padding: EdgeInsets.all(20.0),
                          child: Text(
                              'Welcome to the Student Welfare Redressal Platform! We are committed to ensuring the well-being and satisfaction of all students within our educational community. Our platform provides a safe and accessible space for students to voice their concerns, seek support, and access resources aimed at enhancing their overall educational experience. Here you can raise your concerns and get solution to it or raise it to the higher authorities ',
                          style: TextStyle(
                            color: Colors.blueGrey,
                            fontWeight: FontWeight.w300,
                            fontSize: 28.0
                          ),),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              Padding(
                padding:  EdgeInsets.all(10.0),
                child: Container(
                  color: Colors.orange[100],
                  width: MediaQuery.of(context).size.width * 1.0, // 80% of screen width
                  height: MediaQuery.of(context).size.height * 0.63,
                  child: Column(
                    children: [
                      Image.asset('assets/images/student2.png'),

                    ],
                  )
                ),
              ),
              Padding(
                padding: EdgeInsets.all(10.0),
                child: Container(
                  color: Colors.orange[100],
                  width: MediaQuery.of(context).size.width * 1.0, // 80% of screen width
                  height: MediaQuery.of(context).size.height * 0.4,
                  child: Column(
                    children: [
                      Text(
                          'About RSET',
                        style: GoogleFonts.robotoMono(
                            fontWeight: FontWeight.bold,
                            fontSize: 80,
                            color: Colors.blueGrey[800]
                        ),
                      ),
                      Text(
                          'Rajagiri School of Engineering & Technology (Autonomous) is an educational institution located in Kochi, Kerala, India, offering engineering education and research. RSET is affiliated to APJ Abdul Kalam Technological University and approved by the All India Council for Technical Education. It is located in the port city of Kochi, Kerala and was established in 2001. It offers B. Tech programs in 8 specializations, M. Tech programs in 5 specializations and PhD programs in 6 specializations.',
                      style: GoogleFonts.montserrat(
                          fontWeight: FontWeight.w600,
                          letterSpacing: 2.0,
                          color: Colors.black45,
                          fontSize: 24
                      ),)
                    ],
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.all(10.0),
                child: ElevatedButton(
                  style: ButtonStyle(
                    // You can also set other properties like padding, background color, etc.
                  ),
                  onPressed: _launchURL,
                  child: Text(
                      'Open Chatbot',
                  style: GoogleFonts.inter(
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: Colors.blueGrey[900]
                  )
                  ),
                ),
              ),
            ],
          ),
        ),
        backgroundColor: Colors.orange[200],
      ),
    );
  }
  void _launchURL() {
    html.window.open(url, 'new tab');
  }
}