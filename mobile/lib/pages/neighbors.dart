import 'dart:convert';

import 'package:flutter/material.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;

class Mediax {
  int userid;
  bool islocal;
  bool isvideo;
  String pathorkey;
  String filename;
  String location;
  String timestamp;
  String url;
  bool isfavorite;
  bool shared;
  String title;
  String category;
  int views;

  Mediax({
    required this.userid,
    required this.islocal,
    required this.isvideo,
    required this.pathorkey,
    required this.filename,
    required this.location,
    required this.timestamp,
    required this.url,
    required this.isfavorite,
    required this.shared,
    required this.title,
    required this.category,
    required this.views,
  });
}

class NeighborsPage extends StatefulWidget {
  @override
  _NeighborsPage createState() => _NeighborsPage();
}

class _NeighborsPage extends State<NeighborsPage> {
  String? _errorText = "";
  String? _fullname = "";

  late Future<List<Mediax>> mediax;

  @override
  void initState() {
    super.initState();
    mediax = getMediax();
  }

  Future<List<Mediax>> getMediax() async {
    final response = await http.get(
      Uri.parse(getUrlForDevice()),
    );
    if (response.statusCode != 200) {
      setState(() => _errorText = response.body);
    } else {}
    if (response.statusCode == 200) {
      var jsonResponse = json.decode(response.body);
      List<Mediax> mediax = [];
      for (var m in jsonResponse) {
        Mediax media = Mediax(
            userid: m['userid'],
            islocal: m['islocal'],
            isvideo: m['isvideo'],
            pathorkey: m['pathorkey'],
            filename: m['filename'],
            location: m['location'],
            timestamp: m['timestamp'],
            url: m['url'],
            isfavorite: m['isfavorite'],
            shared: m['shared'],
            title: m['title'],
            category: m['category'],
            views: m['views']);
        mediax.add(media);
      }
      return mediax;
    } else {
      throw Exception('Failed to load post');
    }
  }

  String getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/mediax/getAllSharedMediax';
    } else {
      return 'http://localhost:8080/api/mediax/getAllSharedMediax';
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Neighborhood Media'),
        backgroundColor: Colors.blue,
        centerTitle: true,
      ),
      body: Center(
        child: FutureBuilder<List<Mediax>>(
            future: mediax,
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return ListView.builder(
                    itemCount: snapshot.data!.length,
                    itemBuilder: (context, index) {
                      return Card(
                          child: Column(children: [
                        Padding(padding: EdgeInsets.all(10)),
                        //Padding(padding: EdgeInsets.fromLTRB(0, 10, 0, 0)),
                        ListTile(
                          title: Text(
                              "\n\nTitle: " +
                                  snapshot.data![index].title +
                                  "\nDate: " +
                                  snapshot.data![index].timestamp +
                                  "\nLocation: " +
                                  snapshot.data![index].location,
                              style: const TextStyle(
                                fontFamily: "Trajan Pro",
                                height: 1.0,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.blue,
                              )),
                          subtitle: Image.network(snapshot.data![index].url),
                          trailing: Text(snapshot.data![index].timestamp,
                              style: const TextStyle(
                                  fontFamily: "Trajan Pro",
                                  height: 1.0,
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.blue)),

                          // return ListTile(
                          //   title: Text(
                          //       "\n\nTitle: " +
                          //           snapshot.data![index].title +
                          //           "\nDate: " +
                          //           snapshot.data![index].timestamp +
                          //           "\nLocation: " +
                          //           snapshot.data![index].location +
                          //           "\nUser Id: " +
                          //           snapshot.data![index].userid.toString(),
                          //       style: const TextStyle(
                          //           fontFamily: "Trajan Pro",
                          //           height: 1.0,
                          //           fontSize: 20,
                          //           fontWeight: FontWeight.bold,
                          //           color: Color(0xFFFFFFFF))),
                          //   subtitle: Image.network(snapshot.data![index].url),
                          // trailing: Text(snapshot.data![index].timestamp,
                          //     style: const TextStyle(
                          //         fontFamily: "Trajan Pro",
                          //         height: 1.0,
                          //         fontSize: 10,
                          //         fontWeight: FontWeight.bold,
                          //         color: Color(0xFFFFFFFF))),
                        )
                      ]));
                    });
              } else if (snapshot.hasError) {
                return Text(snapshot.error.toString());
              } else {
                return CircularProgressIndicator();
              }
            }),
      ),
    ));
  }
}
