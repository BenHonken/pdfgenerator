# Ben Honken - PDFGenerator

## Description

This is a profile PDF generator by Ben Honken.  It uses the github API via axios to write a pdf based on input of a color and github username.  Running the script with node will create an HTML file, and a PDF is generated from that.  You can see an example here.  

[Screenshot](demo.gif)

Color and username are gathered using inquirer.  
[Inquirer](inquirer.png)

HTML was generated using template literals which called the color and two objects returned from the API.  The number of stars required a separate call, but all the rest of the github info came from a single call.  
[Axios](axios.png)
[HTML](html.png)

Styling was difficult, as some of the more powerful tools such as bootstrap, and even some of the more basic functions, such as text-align: center do not work quite right with this PDF converter.  To align things, I manually adjusted margins by guessing and checking what would look good.  This is somewhat visible in the HTML screenshot.  


## Usage

As a web developer, I want to generate a clean profile quickly so that I can be prepared to send it to potential employers.

## Credits

Ben Honken made this.

## License

MIT License

Copyright (c) [2019] [Ben Honken]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
