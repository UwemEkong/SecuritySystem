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
          FutureBuilder(
              builder: (BuildContext context, AsyncSnapshot snapshot) {
            // If JSON data has not arrived yet show loading
            if (snapshot.data == null) {
              return Container(
                child: const Center(
                  child: Text("Loading Image..."),
                ),
              );
            } else {
              //Once the JSON Data has arrived build the list
              return Padding(
                  padding: EdgeInsets.only(top: 25),
                  child: Image.network(
                    snapshot.data.toString(),
                  ));
            }
          }),
          Text(widget.snapshot.data[widget.index].title),
          Text(widget.snapshot.data[widget.index].timestamp),
        ]));
  }
}
