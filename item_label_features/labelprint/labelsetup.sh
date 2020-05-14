#!/bin/bash
echo "your printers are as follows: "
lpstat -p 
#assume we are root#
cp labelprinter.desktop /usr/share/applications/
chmod +x lprint && cp lprint /bin/

echo "copied 2 files. test with 'lprint testlabel.zpl' in the current directory"

