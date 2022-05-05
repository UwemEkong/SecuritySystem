import 'dart:convert';
import 'dart:io';

import 'package:flutter/gestures.dart';
import 'package:http/http.dart' as http;
// import 'package:video_player/video_player.dart';
import 'package:flutter_vlc_player/flutter_vlc_player.dart';
import 'package:mobile/widgets/DisplayMediax.dart';
import '../models/mediax.dart';
import 'dart:io' show Platform;
import 'package:flutter/material.dart';

import '../widgets/form_input.dart';

class MediaxDetailPage extends StatefulWidget {
  final Mediax mediax;
  MediaxDetailPage(this.mediax);
  @override
  State<MediaxDetailPage> createState() => _MediaxDetailPageState();
}

class _MediaxDetailPageState extends State<MediaxDetailPage> {
  String? _errorText = "";
  bool isVisible = true;

  Future<void> initializePlayer() async {}
  // late VideoPlayerController _controller;
  // late Future<void> _initializeVideoPlayerFuture;

  get mediax => null;

  @override
  void initState() {
    super.initState();

    // Create and store the VideoPlayerController. The VideoPlayerController
    // offers several different constructors to play videos from assets, files,
    // or the internet.
    // _controller = VideoPlayerController.network(
    //     "https://mainmediabucket.s3.us-east-1.amazonaws.com/buttrfly.mp4?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJHMEUCIQCAHWMDaEDOybM2DFoEG%2FL1DitV8m19aXHD5zQZBUt5GgIgOjGXMPwi9ngAkStMicy5GWY7J8sc9jw%2FE1yh1ylfQXYq%2BwIIYxAAGgw3Mzg0NjE2ODM4MTgiDM8Go85T8OyC0RoRZCrYAja2q3LdnFuOlGNmMmm5d3yUxLmkA30UGakyObSMitvqZlWSALpNnrxlpydFy5EmnQKGJqWFgN%2FeW2cmsDxNKqWMurQg29Aa0KtoiBDCNKWaAlQcOGJtaaZWYLgZX2uSaUw6OSKWvI4vdPguYX9yBbxLpShZRLA3kKvTUtUwim1elj0XQ6ZuofpQ1amEEzRLY3205P4WOktrsgdgDd4loLpr0yz7a5MjN4Qq%2BwAcmHjyP2GKf8TBu2XkKybtayNcUbeEpJvtBmIhWUftr5Eg%2BhC9vX28KGAqaos0LIMC4hdSppv%2FJTE4wk%2FjSMYtZxP1Rk7P6x72afurKxf1jm%2B3XHzK00MgR7OX%2Fi9i2sZOmmBHxjUcPYsbarfqYpvAdeGoecYChCKXxCqc9paHDVrij6kIBqPCAqadq0Cj3d5vwU1VbtjoANJbTrzL9LVCqmYZBFdm%2FUxCKH3zMKXfxZMGOrMCnsYYmbEiMKcRUXVW7OMzXRnTPEl%2F9Cg5EGoJ3JhJrGvh1mkikQedJmzxNZaV%2BMlUbY0cV6l4i095TreKqBBzUT7gT%2BMxhXB3zaKXyr4QWCGkunJXwIUl7kcuNKsjMPwT4%2FwM2N1xREte8ymwPM3LMBOQuZ2qzyeQTzoXDgPyeH9xOlVkgHmMZto2pfIwX3rnQ8ru1guiw1SH3DdqTzrCzPkPo5OOAazbgA7UoO45%2Btnf3ev8dJ02yIVC8cYd0CHvwhwPF7shxSUFpSZNQTcAbg3m4%2B6bI1c2RUBhPy2omRiCb%2BQ9NtWCOdzmTa5hqoGTyy8iFwmbWSPQHJPMGOMRmiWrqGqNI2hlp9737xUmyYkuLSSDjXN3H%2BshFx4d1gtOeQ8qf%2FbgPVaFkXOenXn3jRVh8g%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220503T184333Z&X-Amz-SignedHeaders=host&X-Amz-Expires=240&X-Amz-Credential=ASIA2X357CBVA57E7YMK%2F20220503%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1dc81606967d7e94129810a8cb62abff6d83ef441d73e9cffd87540c90a751eb");

    print("URLLLL");
    print(widget.mediax.url);

    //_initializeVideoPlayerFuture = _controller.initialize();
  }

  @override
  Future<void> dispose() async {
    // Ensure disposing of the VideoPlayerController to free up resources.
    // _controller.dispose();

    super.dispose();
  }

  getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/';
    } else {
      return 'http://localhost:8080/api/';
    }
  }

  image_or_vid() {
    // it is an image
    if (widget.mediax.isvideo == false) {
      return;
    } else {
      // if it is a video

      /*
      return Column(children: [
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
        )
      ])*/
      ;
    }
  }

  bool admin = false;
  var reviewId = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: Text(widget.mediax.filename),
          backgroundColor: Colors.blue,
        ),
        body: Container(
            child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              DisplayMediax(widget.mediax),
              ListTile(
                  title: Text(
                      "\n\nTitle: " +
                          widget.mediax.title +
                          "\nDate: " +
                          widget.mediax.timestamp +
                          "\nLocation: " +
                          widget.mediax.location,
                      style: const TextStyle(
                        fontFamily: "Trajan Pro",
                        height: 1.0,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue,
                      )),
                  trailing: Text(widget.mediax.timestamp,
                      style: const TextStyle(
                          fontFamily: "Trajan Pro",
                          height: 1.0,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: Colors.blue)))
            ],
          ),
        )));
  }

  void deleteMediax() async {
    // final response = await http.post(
    //   Uri.parse(getUrlForDevice()),
    //   headers: <String, String>{
    //     'Content-Type': 'application/json; charset=UTF-8',
    //   },
    //   body: jsonEncode(<String, Mediax>{
    //     'mediaxDTO': widget.mediax,
    //   }),
    // );

    String url = getUrlForDevice() + "mediax/deleteById";

    var response = await http.delete(Uri.parse(url));
    if (response.statusCode == 200) {
      setState(() {});
    }
  }
}

// }
