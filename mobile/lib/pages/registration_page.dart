import 'package:flutter/material.dart';
import '../models/loginmessage.dart';
import '../pages/home_page.dart';
import '../widgets/form_input.dart';
import '../models/user.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io' show HttpClientResponse, Platform;

// Define a custom Form widget.
class RegistrationPage extends StatefulWidget {
  const RegistrationPage({Key? key}) : super(key: key);

  @override
  _RegistrationPageState createState() => _RegistrationPageState();
}

// Define a corresponding State class.
// This class holds the data related to the Form.
class _RegistrationPageState extends State<RegistrationPage> {
  // Create a text controller and use it to retrieve the current value
  // of the TextField.
  String? _errorText = "";
  int? attempts = 5;
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();
  final emailController = TextEditingController();
  final userNameController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  void dispose() {
    // Clean up the controller when the widget is disposed.
    passwordController.dispose();
    userNameController.dispose();
    firstNameController.dispose();
    lastNameController.dispose();
    emailController.dispose();

    super.dispose();
  }

  register(String firstName, String lastName, String email, String username,
      String password, BuildContext context) async {
    final response = await http.post(
      Uri.parse(getUrlForDevice()),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'username': username,
        'password': password,
        'email': email,
        'firstname': firstName,
        'lastname': lastName,
      }),
    );

    if (response.statusCode != 200) {
      setState(() => _errorText = response.body);
    } else {
      Navigator.pop(context, true);
    }
  }

  String getUrlForDevice() {
    if (Platform.isAndroid) {
      return 'http://10.0.2.2:8080/api/auth/register';
    } else {
      return 'http://localhost:8080/api/auth/register';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Create an Account'),
        backgroundColor: Colors.blue,
      ),
      body: SingleChildScrollView(
          child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          FormInput(firstNameController, 'First Name', 'Enter First Name'),
          FormInput(lastNameController, 'Last Name', 'Enter Last Name'),
          FormInput(emailController, 'Email', 'Enter valid email'),
          FormInput(userNameController, 'User Name', 'Enter valid user name'),
          FormInput(passwordController, 'Password', 'Enter password'),
          ElevatedButton(
            style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(Colors.blue)),
            child: Text('Register'),
            onPressed: () => register(
                firstNameController.text,
                lastNameController.text,
                emailController.text,
                userNameController.text,
                passwordController.text,
                context),
          ),
        ],
      )),
    );
  }
}
