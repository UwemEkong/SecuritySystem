import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_vlc_player/flutter_vlc_player.dart';
import 'package:mobile/models/mediax.dart';
import 'package:mobile/pages/mediax_detail.dart';

import 'package:web_socket_channel/io.dart';
import 'package:web_socket_channel/status.dart' as status;

import 'dart:convert';

import 'package:web_socket_channel/web_socket_channel.dart';

class DisplayMediax extends StatefulWidget {
  final Mediax mediax;
  DisplayMediax(this.mediax, {Key? key}) : super(key: key);

  @override
  State<DisplayMediax> createState() => _DisplayMediaxState();
}

class _DisplayMediaxState extends State<DisplayMediax> {
  late VlcPlayerController _videoPlayerController;

  get _videoViewController => null;

  Future<void> initializePlayer() async {}

  @override
  void initState() {
    super.initState();

    _videoPlayerController = VlcPlayerController.network(
      widget.mediax.url,
      hwAcc: HwAcc.auto,
      autoPlay: true,
      options: VlcPlayerOptions(),
    );
  }

  @override
  void dispose() async {
    super.dispose();
    await _videoPlayerController.stopRendererScanning();
    await _videoViewController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Center(
        child: Column(
          children: [
            widget.mediax.isvideo
                ? Column(children: [
                    VlcPlayer(
                      controller: _videoPlayerController,
                      aspectRatio: 16 / 9,
                      placeholder: Center(child: CircularProgressIndicator()),
                    ),
                    FloatingActionButton(
                      onPressed: () {
                        // Wrap the play or pause in a call to `setState`. This ensures the
                        // correct icon is shown.
                        setState(() {
                          // If the video is playing, pause it.
                          if (_videoPlayerController.value.isPlaying) {
                            _videoPlayerController.pause();
                          } else {
                            // If the video is paused, play it.
                            _videoPlayerController.play();
                          }
                        });
                      },
                      // Display the correct icon depending on the state of the player.
                      child: Icon(
                        _videoPlayerController.value.isPlaying
                            ? Icons.play_arrow
                            : Icons.pause,
                      ),
                    ),
                  ])
                : Padding(
                    padding: EdgeInsets.only(top: 25),
                    child: Image.network(
                      widget.mediax.url,
                    ))
          ],
        ),
      ),
    );
  }
}
