#!/bin/bash

# Find all professor names and update them with Lorem ipsum
sed -i 's/<h3>Dr. Amina Zafar<\/h3>/<h3>Dr. Amina Zafar Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Dr. Imran Hussain<\/h3>/<h3>Dr. Imran Hussain Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Prof. Yasir Ali<\/h3>/<h3>Prof. Yasir Ali Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Dr. Farah Khan<\/h3>/<h3>Dr. Farah Khan Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Prof. Hassan Raza<\/h3>/<h3>Prof. Hassan Raza Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Dr. Ayesha Tariq<\/h3>/<h3>Dr. Ayesha Tariq Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Dr. Usman Shah<\/h3>/<h3>Dr. Usman Shah Lorem ipsum<\/h3>/g' faculty.html
sed -i 's/<h3>Dr. Sadia Naeem<\/h3>/<h3>Dr. Sadia Naeem Lorem ipsum<\/h3>/g' faculty.html

echo "All professor names updated with 'Lorem ipsum'"
