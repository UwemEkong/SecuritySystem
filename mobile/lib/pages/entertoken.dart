import 'package:flutter/material.dart';
import 'package:mobile/widgets/form_input.dart';
import '../widgets/form_input.dart';
import 'dart:io' show Platform;
import 'package:http/http.dart' as http;

import 'changepassword.dart';

class EnterTokenPage extends StatefulWidget {
  final email;
  EnterTokenPage({this.email}) : super();


  @override
  _EnterTokenPage createState() => _EnterTokenPage();
}

class _EnterTokenPage extends State<EnterTokenPage> {
  String? _errorText = "";
  final userNameController = TextEditingController();
  final tokenController = TextEditingController();

  @override
  void dispose() {
    userNameController.dispose();
    tokenController.dispose();
    super.dispose();
  }

  reset(String username, String token, BuildContext context) async {
    final response = await http.get(
      Uri.parse(getUrlForDevice(username, token)),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode != 200) {
      setState(() => _errorText = response.body);
    } else {
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ChangePasswordPage(username: username, token: token, email: widget.email)));
    }
  }

  String getUrlForDevice(String username, String token) {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/auth/forgot-password/$username/$token';
    } else {
      return 'http://localhost:8080/api/auth/forgot-password/$username}/$token';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFFFFFFF),
      appBar: AppBar(
        title: Text('Token Confirmation'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              FormInput(userNameController, 'Username', 'Enter Username'),
              FormInput(tokenController, 'Token', 'Enter Token'),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor:
                          MaterialStateProperty.all<Color>(Colors.black)),
                  child: const Text('Continue to Reset Password!'),
                  onPressed: () => reset(userNameController.text, tokenController.text, context)),
            ],
          ),
        ),
      ),
    );
  }
}
