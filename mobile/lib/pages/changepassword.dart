import 'dart:convert';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
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
          builder: (context) => RequestResetTokenPage(),
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
      backgroundColor: Color(0xFF303030),
      appBar: AppBar(
        title: Text('Change Password'),
        backgroundColor: Color(0xFF303030),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              Padding(
                padding: EdgeInsets.all(10),
                child: Text(
                    "Username: " +
                        widget.username +
                        "\n\nE-Mail: " +
                        widget.email +
                        "\n\nReset Token: " +
                        widget.token + "\n",
                    style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        height: 1.25,
                        fontSize: 25,
                        color: Colors.white)),
              ),
              FormInput(
                  passwordController, 'New Password', 'Enter New Password'),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.black)),
                  child: const Text('Reset Password!'),
                  onPressed: () => reset(passwordController.text, context)),
            ],
          ),
        ),
      ),
    );
  }
}
