import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/pages/profile_page.dart';
import 'package:mobile/pages/requestresettoken.dart';
import 'package:mobile/widgets/form_input.dart';
import '../widgets/form_input.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;

class ChangePasswordPage extends StatefulWidget {
  final username;
  final token;
  final email;

  ChangePasswordPage({this.username, this.token, this.email}) : super();

  @override
  _ChangePasswordPage createState() => _ChangePasswordPage();
}

class _ChangePasswordPage extends State<ChangePasswordPage> {
  String? _errorText = "";
  final passwordController = TextEditingController();

  @override
  void dispose() {
    passwordController.dispose();
    super.dispose();
  }

  reset(String password, BuildContext context) async {
    final response = await http.post(
      Uri.parse(getUrlForDevice()),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'username': widget.username,
        'password': password,
      }),
    );

    if (response.statusCode != 200) {
      setState(() => _errorText = response.body);
    } else {
      Navigator.pop(context, true);
      Navigator.pop(context, true);
      Navigator.pop(context, true);
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => profile_page(),
        ),
      );
    }
  }

  String getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/auth/edituser';
    } else {
      return 'http://localhost:8080/api/auth/edituser';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('Change Password'),
        backgroundColor: Colors.blue,
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
                  'Username: ' + widget.username,
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
                leading: Icon(
                  Icons.person_outline,
                  color: Colors.blue[500],
                ),
              ),
              ListTile(
                title: Text(
                  'email: ' + widget.email,
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
                leading: Icon(
                  Icons.email,
                  color: Colors.blue[500],
                ),
              ),
              FormInput(
                  passwordController, 'New Password', 'Enter New Password'),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.blue)),
                  child: const Text('Reset Password!'),
                  onPressed: () => reset(passwordController.text, context)),
            ],
          ),
        ),
      ),
    );
  }
}
