import requests
from bs4 import BeautifulSoup
import re
import datetime
import time

lines = open("links.txt", "r").readlines()
with open("smiles.txt","r") as out:
    startIndex = len(out.readlines())
curIndex = startIndex
for url in lines[startIndex:]:
    start = time.time()
    try:
        # Get the HTML content of the page
        response = requests.get(url.strip())
        response.raise_for_status()  # Raise an exception if there's an error

        # Parse the HTML with BeautifulSoup
        soup = BeautifulSoup(response.content, "html.parser")

        # Now you can access and manipulate the HTML using BeautifulSoup
        # For example, to get the title of the page:
        contents = soup.prettify()

        # Regular expression pattern to match setClipboard('SOMETHING')
        pattern = r"setClipboard\('([^']+)'\)"

        # Search for the pattern in the long string
        match = re.search(pattern, contents)

        if match:
            result = match.group(0)  # This will give the full match: setClipboard('SOMETHING')
            with open("smiles.txt", "a") as f:
                f.write(result[14:-2] + "\n")
            print(result[14:-2])
        else:
            with open("smiles.txt", "a") as f:
                f.write("\n")
            print("No match found")
    except:
        with open("smiles.txt", "a") as f:
            f.write("\n")
        print("404")
        pass
    
    end = time.time()
    curIndex += 1

    print(f"~{str(datetime.timedelta(seconds = (end - start)*(len(lines) - curIndex)))} left.")