// ignore_for_file: prefer_const_constructors, use_key_in_widget_constructors

import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:mobile/models/user.dart';
import 'package:flutter/services.dart';
import 'package:mobile/models/user.dart';
import 'package:mobile/widgets/Feed.dart';

import '../models/loginmessage.dart';
import '../models/mediax.dart';
import '../widgets/RecordTile.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _fullname = "";
  //late VideoPlayerController _controller;
  late Future<void> _initializeVideoPlayerFuture;

  @override
  @protected
  @mustCallSuper
  void initState() {
    getAuthedUser();
    super.initState();
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
    return "http://10.100.211.233:8000/";
  }

  Future<List<Mediax>> _getAllMediax() async {
    String url = getUrlForDevice() + "mediax/getUserMediax";

    var res = await http.get(Uri.parse(url));
    var body = res.body;
    print(body);
    var jsonData = json.decode(body);
    Widget _pic;

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
    // _controller.dispose();

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
          Feed(),
          /*
          FutureBuilder(
            future: _initializeVideoPlayerFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                // If the VideoPlayerController has finished initialization, use
                // the data it provides to limit the aspect ratio of the video.
                return AspectRatio(
                  aspectRatio: _controller.value.aspectRatio,
                  // Use the VideoPlayer widget to display the video.
                  child: VideoPlayer(_controller),
                );
              } else {
                // If the VideoPlayerController is still initializing, show a
                // loading spinner.
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
            },
          ),
          FloatingActionButton(
            onPressed: () {
              // Wrap the play or pause in a call to `setState`. This ensures the
              // correct icon is shown.
              setState(() {
                // If the video is playing, pause it.
                if (_controller.value.isPlaying) {
                  _controller.pause();
                } else {
                  // If the video is paused, play it.
                  _controller.play();
                }
              });
            },
            // Display the correct icon depending on the state of the player.
            child: Icon(
              _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
            ),
          ),
          */

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
                              return RecordTile(snapshot.data[index]);
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
