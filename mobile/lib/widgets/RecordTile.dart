import 'package:flutter/material.dart';

class RecordTile extends StatefulWidget {
  final AsyncSnapshot<dynamic> snapshot;
  final int index;
  RecordTile(this.snapshot, this.index, {Key? key}) : super(key: key);

  @override
  State<RecordTile> createState() => _RecordTileState();
}

class _RecordTileState extends State<RecordTile> {
  @override
  Widget build(BuildContext context) {
    return Card(
        color: Colors.blueAccent,
        child: Column(children: <Widget>[
          Padding(
              padding: EdgeInsets.only(top: 25),
              child: Image.network(
                widget.snapshot.data[widget.index].url.toString(),
              )),
          Text(widget.snapshot.data[widget.index].filename),
          Text(widget.snapshot.data[widget.index].timestamp),
        ]));
  }
}
