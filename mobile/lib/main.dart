import 'package:flutter/material.dart';
import 'package:mobile/pages/login.dart';
import 'package:http/http.dart' as http;
import '../pages/home_page.dart';
import '../widgets/app.dart';
import 'package:splashscreen/splashscreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SplashScreen(
          seconds: 5,
          navigateAfterSeconds: App(),
          title: new Text(
            'Welcome to BigBro Security, we watch you get mugged through our backdoor!',
            textAlign: TextAlign.center,
            style: new TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 35.0,
                color: Colors.blueAccent),
          ),
          //image: new Image.asset('assets/orange-music-note-hi.png'),
          //photoSize: 100.0,
          backgroundColor: Color(0xFF303030),
          styleTextUnderTheLoader: new TextStyle(),
          loaderColor: Colors.blueAccent),
    );
  }
}
