// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors

import 'package:flutter/material.dart';

class AboutUsPage extends StatefulWidget {
  @override
  _AboutUsPage createState() => _AboutUsPage();
}

class _AboutUsPage extends State<AboutUsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFFFFFFF),
      appBar: AppBar(
        title: Text('About Us'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: EdgeInsets.all(10),
                child: Text(
                    "\nNinjas For Life!\n\n",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        height: 1.25,
                        fontSize: 25,
                        color: Colors.black)),
              ),
              Padding(
                child: Image.asset('assets/adam.jpg'),
                  padding: EdgeInsets.all(10),
              ),
              Padding(
                padding: EdgeInsets.all(10),
                child: Text('\nAdam Chaplin (AKA Leonardo)\n'
                    'E-mail: adam_chaplin@leonardo.com\n'
                    'Phone: (245) 317 - 8385\n\n\n',
                    style: TextStyle(
                        height: 1.25,
                        fontSize: 20,
                        color: Colors.blueAccent[400])),
              ),
              Padding(
                child: Image.asset('assets/gil.jpg'),
                padding: EdgeInsets.all(10),
              ),
              Padding(
                padding: EdgeInsets.all(10),
                child: Text('\nGil Gurkirat (AKA Michelangelo)\n'
                    'E-mail: gil_gurkirat@michelangelo.net\n'
                    'Phone: (755) 349-1057\n\n\n',
                    style: TextStyle(
                        height: 1.25,
                        fontSize: 20,
                        color: Colors.orangeAccent[400])),
              ),
              Padding(
                child: Image.asset('assets/niraj.jpg'),
                padding: EdgeInsets.all(10),
              ),
              Padding(
                padding: EdgeInsets.all(10),
                child: Text('\nNiraj Patel (AKA Raphael)\n'
                    'E-mail:  niraj_patel@raphael.org\n'
                    'Phone: (630) 822-6104\n\n\n',
                    style: TextStyle(
                        height: 1.25,
                        fontSize: 20,
                        color: Colors.redAccent[400])),
              ),
              Padding(
                child: Image.asset('assets/uwem.jpg'),
                padding: EdgeInsets.all(10),
              ),
              Padding(
                padding: EdgeInsets.all(10),
                child: Text('\nUwem Ekong (AKA Donatello)\n'
                    'E-mail: uwem_ekong@donatello.gov\n'
                    'Phone: (199) 474-2008\n\n',
                    style: TextStyle(
                        height: 1.25,
                        fontSize: 20,
                        color: Colors.purpleAccent[400])),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
