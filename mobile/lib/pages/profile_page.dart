import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/pages/aboutus.dart';
import 'package:mobile/pages/faq.dart';
import 'package:mobile/pages/requestresettoken.dart';

import '../models/user.dart';

class profile_page extends StatefulWidget {
  @override
  _profile_page_state createState() => _profile_page_state();
}

// ignore: camel_case_types
class _profile_page_state extends State<profile_page> {
  int? id = 0;
  String? userName = "";
  String? password = "";
  String? email = "";
  String? firstName = "";
  String? lastName = "";
  @override
  void initState() {
    super.initState();
    getAuthedUser();
  }
  // _videoPlayerController = VlcPlayerController.network(
  //   'https://media.w3.org/2010/05/sintel/trailer.mp4',
  //   autoPlay: false,
  //   options: VlcPlayerOptions(),
  // );

  getAuthedUser() async {
    var url = Platform.isAndroid
        ? 'http://10.0.2.2:8080/api/auth/getloggedinuser'
        : 'http://localhost:8080/api/auth/getloggedinuser';
    var res = await http.get(Uri.parse(url));
    var body = res.body;

    if (body.length > 1) {
      // ignore: avoid_print
      print(body);
      setState(() => userName = json.decode(body)['username']);
      setState(() => email = json.decode(body)['email']);
      setState(() => firstName = json.decode(body)['firstname']);
      setState(() => lastName = json.decode(body)['lastname']);
    }
    // ignore: avoid_print
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Profile'),
          backgroundColor: (Colors.blue[500]),
        ),
        body: SizedBox(
          height: 710,
          width: 400,
          child: Card(
            child: Column(
              children: [
                Padding(padding: EdgeInsets.all(10)),
                //Padding(padding: EdgeInsets.fromLTRB(0, 10, 0, 0)),
                ListTile(
                  title: Text(
                    'Welcome ' + firstName! + ' ' + lastName!,
                    style: TextStyle(fontWeight: FontWeight.w500),
                  ),
                  leading: Icon(
                    Icons.person_rounded,
                    color: Colors.blue[500],
                  ),
                ),
                const Divider(),
                ListTile(
                  title: Text(
                    'Username: ' + userName!,
                    style: TextStyle(fontWeight: FontWeight.w500),
                  ),
                  leading: Icon(
                    Icons.person_outline,
                    color: Colors.blue[500],
                  ),
                ),
                ListTile(
                  title: Text(
                    'email: ' + email!,
                    style: TextStyle(fontWeight: FontWeight.w500),
                  ),
                  leading: Icon(
                    Icons.email,
                    color: Colors.blue[500],
                  ),
                ),
                ElevatedButton(
                    style: ButtonStyle(
                        backgroundColor:
                            MaterialStateProperty.all<Color>(Colors.blue)),
                    child: Text('Reset Password'),
                    onPressed: () {
                      Navigator.push(
                          context,
                          new MaterialPageRoute(
                              builder: (context) => RequestResetTokenPage()));
                    }),
                TextButton(
                  onPressed: () {
                    Navigator.push(context,
                        new MaterialPageRoute(builder: (context) => FaqPage()));
                  },
                  child: const Text(
                    'Frequently Asked Questions',
                    style: TextStyle(fontSize: 20),
                  ),
                ),
                TextButton(
                  child: const Text(
                    'About Us',
                    style: TextStyle(fontSize: 20),
                  ),
                  onPressed: () {
                    Navigator.push(
                        context,
                        new MaterialPageRoute(
                            builder: (context) => AboutUsPage()));
                  },
                )
              ],
            ),
          ),
        ));
  }
}
