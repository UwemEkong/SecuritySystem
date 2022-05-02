import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:mobile/models/mediax.dart';
import 'package:mobile/pages/mediax_detail.dart';

import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/status.dart' as status;

import 'dart:convert';

import 'package:web_socket_channel/web_socket_channel.dart';

class Feed extends StatefulWidget {
  Feed({Key? key}) : super(key: key);

  @override
  State<Feed> createState() => _FeedState();
}

class _FeedState extends State<Feed> {
  static const String url = "ws://127.0.0.1:5000";
  WebSocketChannel? _channel;
  bool _isConnected = false;

  void connect() {
    _channel = IOWebSocketChannel.connect(Uri.parse(url));
    setState(() {
      _isConnected = true;
    });
  }

  void disconnect() {
    _channel!.sink.close();
    setState(() {
      _isConnected = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Center(
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton(
                  onPressed: connect,
                  child: const Text("Connect"),
                ),
                ElevatedButton(
                  onPressed: disconnect,
                  child: const Text("Disconnect"),
                ),
              ],
            ),
            const SizedBox(
              height: 50.0,
            ),
            _isConnected
                ? StreamBuilder(
                    stream: _channel!.stream,
                    builder: (context, snapshot) {
                      if (!snapshot.hasData) {
                        return const CircularProgressIndicator();
                      }

                      if (snapshot.connectionState == ConnectionState.done) {
                        return const Center(
                          child: Text("Connection Closed !"),
                        );
                      }
                      //? Working for single frames
                      return Image.memory(
                        Uint8List.fromList(
                          base64Decode(
                            (snapshot.data.toString()),
                          ),
                        ),
                        gaplessPlayback: true,
                      );
                    },
                  )
                : const Text("Initiate Connection")
          ],
        ),
      ),
    );
  }
}
