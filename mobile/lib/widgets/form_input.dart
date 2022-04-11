import 'package:flutter/material.dart';

class FormInput extends StatefulWidget {
  late TextEditingController userNameController;
  String labelTextContent;
  String hintText;
  FormInput(this.userNameController, this.labelTextContent, this.hintText,
      {Key? key})
      : super(key: key);

  @override
  State<FormInput> createState() => _FormInputState();
}

class _FormInputState extends State<FormInput> {
  String? _errorText = "";
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(10),
      child: TextField(
        style: TextStyle(color: Colors.black),
        controller: widget.userNameController,
        obscureText: widget.labelTextContent == "Password" ? true : false,
        decoration: InputDecoration(
            filled: true,
            fillColor: Colors.white,
            border: const OutlineInputBorder(),
            labelText: widget.labelTextContent,
            hintText: widget.hintText),
      ),
    );
  }
}
