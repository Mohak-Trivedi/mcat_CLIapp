#!/usr/bin/env node

const fs = require("fs"); // the Node.js fs module
let arguments = process.argv.slice(2); /* store all user arguments (i/p provided via terminal)
 sliced from index 2 onwards because 0th : node path, 1st : file path, 2nd onwards: user i/p */

// segregate flags(i.e. options), secondary arguments, number values  and file names from given arguement.
let flags = []; // to store flags
let filenames = []; // to store file names
let secondaryArguments = []; // to store secondary arguments
let num; // to store the numeric i/p
for(let i of arguments)
{
    if(i[0] == "-") // string argument is a flag always starts with -
    {
        flags.push(i);
    }
    else if(i[0] == "$")
    {
        secondaryArguments.push(i.slice(1));
    }
    else if(i.charCodeAt(0)>=48  && i.charCodeAt(0)<=57) // argument is a number
    {
        num = parseInt(i);
    }
    else // argument string is a filename
    {
        filenames.push(i);
    }
}
 
/* for each file mentioned by the user, apply all the flags mentioned by the user, so that the required file operations 
 will be performed for the specified files.*/
for(let file of filenames)
{
    let fileData = fs.readFileSync(file, "utf-8");
    for(let flag of flags)
    {
        // remove all spaces from file text
        if(flag == "-rs")
        {
            fileData = removeAll(fileData, " ");
        }
        
        // display text from all lines in the file in a single line
        if(flag == "-rn")
        {
            fileData = removeAll(fileData, "\r\n");
        } 

        // removing any string mentioned after $ in terminal
        // note: you can't choose to remove & sign
        if(flag == "-rsc")
        {
            for(let secondaryArgument of secondaryArguments)
            {
                fileData = removeAll(fileData, secondaryArgument);
            }
        }

        // number all the lines in file as per the sequence in which they appear
        if(flag == "-s")
        {
            let data1 = addSequence(fileData);
            for(let str of data1)
            {
                console.log(str);
            }
        }

        // number only the non-empty lines
        if(flag == "-sn")
        {
            let data2 = addSequenceTnel(fileData);
            for(let str of data2)
            {
                console.log(str);
            }
        }

        // remove extra lines from file text (i.e. atmost 1 line difference between each two consecutive lines)
        if(flag == "-rel")
        {
            let ans = removeExtraLine(fileData);
            for(let i = 0;i < ans.length;i++)
            {
                console.log(ans[i]);
            }
        }

        // to reverse the sequence of lines in the file
        if(flag == "-tacw")
        {
            let rev_data = revLineSeq(fileData);
            for(let str of rev_data)
            {
                console.log(str);
            }
        }

        // to display tabs present in file, on terminal as ^I
        if(flag == "-t")
        {
            let dt = displayTabs(fileData);
            console.log(dt);
        }

        // to display count of lines
        if(flag == "-cntl")
        {
            let lc = cntLines(fileData);
            console.log(lc);
        }

        // to display count of chars
        if(flag == "-cntc")
        {
            let cc = cntChar(fileData);
            console.log(cc);
        }

        // to display num-th char from fileData
        if(flag == "-head")
        {
            let hc = getHead(fileData, num);
            console.log(hc);
        }

        // to display num-th char from last end of fileData
        if(flag == "-tail")
        {
            let tc = getTail(fileData, num);
            console.log(tc);
        }
    }
    // print the resultant text after applying all required flags, thus, print statement out of for-loop
    console.log(fileData);
}

// return string which has `fildata` without `toRemove`
function removeAll(filedata, toRemove)
{
    return filedata.split(toRemove).join("");
}

/* return an array contentArr[] such that contentArr[i] : ith line in  `filedata` with a number at it's 0th char 
 which denotes the line number of that line as per it's occurence in the `filedata`*/
function addSequence(filedata)
{
    let contentArr = filedata.split("\r\n");
    for(let idx = 0;idx < contentArr.length;idx++)
    {
        contentArr[idx] = (idx + 1) + " " + contentArr[idx];
    }
    return contentArr;
}

/* return an array contentArr[] such that contentArr[i] : ith line in  `filedata` with a number at it's 0th char 
 which denotes the line number of that line as per it's occurence in the `filedata, only if ith line is non-empty.`*/
function addSequenceTnel(filedata)
{
    let contentArr = filedata.split("\r\n");
    let lineNum = 1; // here cant use idx for lineNum because we want to increment it only if non-empty string 
    for(let idx in contentArr)
    {
        if(contentArr[idx] != "") // non-empty line, so add line number
        {
            contentArr[idx] = lineNum + " " + contentArr[idx];
            lineNum++;
        }
        else // empty line, so just print the empty line as it is
        {
            contentArr[idx] = contentArr[idx];
        }
    }
    return contentArr;
}

/* return an array in which each element is a non-empty line of `filedata` and empty lines also allowed(only non-extra)
 without disturbing the relative sequencing of lines.*/
function removeExtraLine(filedata)
{
    let contentArr = filedata.split("\r\n");
    let data = []; // the array in which we have to store the filedata but without extra lines, and spiltted into array elements
    for(let i = 1;i < contentArr.length;i++) //notice that we're starting from 1st index element rather than 0th, because there's no previous line than 0th whereas we do checks for line and line-1
    {
        if(contentArr[i]=="" && contentArr[i-1]=="") // current line is the first extra empty line, the previous one is empty but not an extra empty line
        {
            contentArr[i] = null; // so remove the current line, thus, only 1 empty line i.e. the previous one remains, and the empty lines after the currently removed(i.e. the 2nd empty line)
        }

        if(contentArr[i]=="" && contentArr[i-1]==null) // current line is not the first extra line, there have been consecutive extra line(s) before.
        {
            contentArr[i] = null; // so remove this current line
        }
    }

    // now contentArr[] stores all extra empty lines as null
    for(let i = 0;i < contentArr.length;i++)
    {
        if(contentArr[i] != null) // not an extra empty line
        {
            data.push(contentArr[i]);
        }
    }

    return data;
}

// return an array which stores lines of `filedata` but in reverse order.
function revLineSeq(filedata)
{
    let contentArr = filedata.split("\r\n"); // store lines in filedata as in given order
    let revData = []; // store lines in filedata in a reverse order

    for(let i = contentArr.length - 1;i >= 0;i--)
    {
        revData.push(contentArr[i]);
    }

    return revData;
}

// returns a string which is the `filedata` but tabs are replaced with "^I"
function displayTabs(fileData)
{
    let contentArr = fileData.split("");
    let str = "";
    for(let idx in contentArr)
    {
        if(contentArr[idx] == '\t')
        {
            str += "^I";
        }
        else
        {
            str += contentArr[idx];
        }
    }

    return str;
}

// return number of lines present in `fileData`
function cntLines(fileData)
{
    let contentArr = fileData.split("\r\n");
    return contentArr.length;
}

// return number of chars present in `fileData` 
function cntChar(fileData)
{
    let contentArr = fileData.split("");
    return contentArr.length;
}

// return the num-th char from the start of filedata
function getHead(filedata, num)
{
    let contentArr = filedata.split("");
    return contentArr[num - 1];
}

// return the num-th char from the end of filedata
function getTail(filedata, num)
{
    let contentArr = filedata.split("");
    return contentArr[contentArr.length - num];
}