import 'package:flutter/material.dart';
import 'package:mobile/pages/aboutus.dart';
import 'package:mobile/pages/faq.dart';
import 'package:mobile/pages/login.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/pages/requestresettoken.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BigBro Mobile',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Big Bro Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Center(
        // Center is a layout widget. It takes a single child and positions it
        // in the middle of the parent.
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ListTile(
              tileColor: Colors.white,
              title: Text("Login Here"),
              onTap: () {
                //When user clicks the row/tile they go to the song's detail page
                Navigator.push(context,
                    new MaterialPageRoute(builder: (context) => LoginPage()));
              },
            ),
            ListTile(
              tileColor: Colors.white,
              title: Text("About Us"),
              onTap: () {
                //When user clicks the row/tile they go to the song's detail page
                Navigator.push(context,
                    new MaterialPageRoute(builder: (context) => AboutUsPage()));
              },
            ),
            ListTile(
              tileColor: Colors.white,
              title: Text("FAQ"),
              onTap: () {
                //When user clicks the row/tile they go to the song's detail page
                Navigator.push(context,
                    new MaterialPageRoute(builder: (context) => FaqPage()));
              },
            ),
            ListTile(
              tileColor: Colors.white,
              title: Text("Request Password Reset Token"),
              onTap: () {
                //When user clicks the row/tile they go to the song's detail page
                Navigator.push(context,
                    new MaterialPageRoute(builder: (context) => RequestResetTokenPage()));
              },
            )
          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
