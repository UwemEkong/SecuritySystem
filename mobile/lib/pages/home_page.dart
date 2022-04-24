// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_vlc_player/flutter_vlc_player.dart';
import 'package:mobile/models/user.dart';
// import 'package:flutter_vlc_player/flutter_vlc_controller.dart';
import '../models/loginmessage.dart';
import '../models/mediax.dart';
import '../widgets/RecordTile.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
// import 'package:sour_notes/widgets/header.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _fullname = "";
  String _streamUrl = "http://127.0.0.1:5000/video_feed";
  //late VlcPlayerController _videoPlayerController;
  @override
  @protected
  @mustCallSuper
  void initState() {
    getAuthedUser();
    super.initState();
    // _videoPlayerController = VlcPlayerController.network(
    //   'https://media.w3.org/2010/05/sintel/trailer.mp4',
    //   autoPlay: false,
    //   options: VlcPlayerOptions(),
    // );
  }

  getAuthedUser() async {
    var url = Platform.isAndroid
        ? 'http://10.0.2.2:8080/api/auth/getloggedinuser'
        : 'http://localhost:8080/api/auth/getloggedinuser';
    var res = await http.get(Uri.parse(url));
    var body = res.body;

    if (body.length > 1) {
      setState(
          () => _fullname = "Logged in as: " + json.decode(body)["username"]);
    }
  }

  getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/';
    } else {
      return 'http://localhost:8080/api/';
    }
  }

  String getCameraUrl() {
    return "http://127.0.0.1:5000/video_feed";
  }

  Future<List<Mediax>> _getAllMediax() async {
    String url = getUrlForDevice() + "mediax/getUserMediax";

    var res = await http.get(Uri.parse(url));
    var body = res.body;
    print(body);
    var jsonData = json.decode(body);

    List<Mediax> mediaxList = [];

    for (var s in jsonData) {
      Mediax m = Mediax(
          userid: s["userid"],
          islocal: s["islocal"],
          isvideo: s["isvideo"],
          pathorkey: s["pathorkey"],
          filename: s["filename"],
          location: s["location"],
          timestamp: s["timestamp"],
          url: s["url"],
          isfavorite: s["isfavorite"],
          shared: s["shared"],
          title: s["title"],
          category: s["category"],
          views: s["views"]);

      mediaxList.add(m);
    }

    return mediaxList;
  }

  @override
  void dispose() async {
    super.dispose();
    //await _videoPlayerController.stopRendererScanning();
    //await _videoViewController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('BigBro Security'),
          backgroundColor: Color(0xFF303030),
        ),
        // const color = const Color(0xFF303030);,
        backgroundColor: Color(0xFF303030),
        body: SingleChildScrollView(
            child: Column(children: <Widget>[
          Text(_fullname!, style: TextStyle(color: Colors.white)),
          // Camera feed
          //new VlcPlayer(controller: _vlcViewController, aspectRatio: 1),
          // VlcPlayer(
          //   controller: _videoPlayerController,
          //   aspectRatio: 16 / 9,
          //   placeholder: Center(child: CircularProgressIndicator()),
          // ),
          Divider(color: Colors.black),

          //Mediax list
          Container(
              padding: EdgeInsets.fromLTRB(60, 10, 60, 0),
              child: FutureBuilder(
                  future: _getAllMediax(),
                  builder: (BuildContext context, AsyncSnapshot snapshot) {
                    //For reload on button click
                    if (snapshot.connectionState == ConnectionState.done) {
                      // If JSON data has not arrived yet show loading
                      if (snapshot.data == null) {
                        return Container(
                          child: Center(
                            child: Text("Loading..."),
                          ),
                        );
                      } else {
                        //Once the JSON Data has arrived build the list
                        return ListView.builder(
                            physics: const PageScrollPhysics(),
                            scrollDirection: Axis.vertical,
                            shrinkWrap: true,
                            itemCount: snapshot.data.length,
                            itemBuilder: (BuildContext context, int index) {
                              //List tile / Song row
                              return RecordTile(snapshot, index);
                            });
                      }
                    } else {
                      return Container(
                          child: Center(
                        child: Text("Loading..."),
                      ));
                    }
                  }))
        ])));
    // const color = const Color(0xFF303030);,
  }

  getUsers() {}
}
