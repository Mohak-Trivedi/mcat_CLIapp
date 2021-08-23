# mcat 
mcat is a CLI(Command Line Interface) application, coded in JavaScript. It allows it's users to perform certain file operations(read file, remove specific characters from mentioned files, add line numbers in file, etc.) which are similar to those availed by the `cat` command in Linux.

### Installation:
(Make sure you have [Git](https://git-scm.com/downloads) and [Node JS](https://nodejs.org/en/download/) installed on your system)
- Step 1 : `git clone `
- Step 2 : `npm install`

### Modules used:
I have used the Node.js **fs (file system)** module to be able to access and interact with the file system in an efficient and convenient manner.
`const fs = require('fs')`
If you wish to learn more about the Node.js fs module, click [here](https://nodejs.dev/learn/the-nodejs-fs-module).

### Usage:
`mcat [options] file(s)`
For example:
`mcat -r my_file.txt`
The above `wcat` command uses option `-r` to specify that it wants to _read_ the file named _my_file.txt_.
**Note** : You can specify multiple options and multiple files as well.

### Options:
Following are options available in wcat:
- `-r` : read file
- `-rs` : remove all spaces from file text
- `-rn` : display text from all lines in the file in a single line
- `-rel` : remove extra lines from file text (i.e. atmost 1 line difference between each two consecutive lines)
- `-rsc $chars` (_chars_ can be a particular character or a sequence of characters) : remove all occurences particular character or a sequence of characters, mentioned after $. **Note** : chars can't be &.
- `-s` : number all the lines in file as per the sequence in which they appear
- `-sn` : number only the non-empty lines 
- `-tacw` : read file in reverse order
- `-cntl` : display the count of lines present in the file
- `-t` : display tabs present in file, on terminal as ^I
- `-cntc` : display the count of characters present in the file
- `-head num`(_num_ must be a natural number) : display the _num_ th character from the start of the file.
- `-tail num`(_num_ must be a natural number) : display the _num_ th character from the end of the file.
