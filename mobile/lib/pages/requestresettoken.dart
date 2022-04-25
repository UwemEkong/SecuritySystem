import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobile/widgets/form_input.dart';
import '../widgets/form_input.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;

import 'entertoken.dart';

class RequestResetTokenPage extends StatefulWidget {
  @override
  _RequestResetTokenPage createState() => _RequestResetTokenPage();
}

class _RequestResetTokenPage extends State<RequestResetTokenPage> {
  String? _errorText = "";
  final emailController = TextEditingController();

  @override
  void dispose() {
    emailController.dispose();
    super.dispose();
  }

  send(String email, BuildContext context) async {
    final response = await http.get(
      Uri.parse(getUrlForDevice(email)),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode != 200) {
      setState(() => _errorText = response.body);
    } else {
      Navigator.push(context,
          new MaterialPageRoute(builder: (context) => EnterTokenPage()));
    }
  }

  String getUrlForDevice(String email) {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/auth/forgot-password/$email';
    } else {
      return 'http://localhost:8080/api/auth/forgot-password/$email';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFFFFFFF),
      appBar: AppBar(
        title: Text('Request Password Reset Token'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              const Padding(
                padding: EdgeInsets.all(10),
                child: Text("Enter a valid email to receive reset token!\n\n",
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        height: 1.25,
                        fontSize: 25,
                        color: Colors.black)),
              ),
              FormInput(emailController, 'E-Mail', 'Enter E-Mail'),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.black)),
                  child: const Text('Request Reset Token'),
                  onPressed: () => send(emailController.text, context)),
            ],
          ),
        ),
      ),
    );
  }
}
