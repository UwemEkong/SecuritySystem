import 'dart:convert';
import 'dart:io';

import 'package:flutter/gestures.dart';
import 'package:http/http.dart' as http;
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

  get mediax => null;

  getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/';
    } else {
      return 'http://localhost:8080/api/';
    }
  }

  bool admin = false;
  var reviewId = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF303030),
      appBar: AppBar(
        title: Text(widget.mediax.filename),
        backgroundColor: Color(0xFF303030),
      ),
      body: Container(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Padding(
                  padding: EdgeInsets.only(top: 25),
                  child: Image.network(
                    widget.mediax.url,
                  )),
              Text(
                widget.mediax.location,
                style: TextStyle(fontSize: 12, color: Colors.white),
              ),
              ElevatedButton(
                  child: Text('Delete'), onPressed: () => deleteMediax()),
            ],
          ),
        ),
      ),
    );
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
