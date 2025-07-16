# SmilesDB
A SMILES-first molecular database API

![screenshot](https://i.imgur.com/Zms4VHs.png)
Available at [smilesdb.org](https://smilesdb.org).

To check availability and uptime, see the [status page](https://status.smilesdb.org/).

## Documentation

### [Endpoints](https://github.com/rockwillck/SmilesDB/wiki/API-Documentation#endpoints)
### [Data Spec](https://github.com/rockwillck/SmilesDB/wiki/API-Documentation#data-spec)
### Dependencies

## Self-Hosting / Installation
### Quickstart
To self-host SmilesDB, clone the repo:  
`git clone https://github.com/rockwillck/SmilesDB`  

#### Dependencies
Then, install dependencies:  
`pip install -r requirements.txt`  

#### Run Server
And run the API server using:  
`flask --app api run`

### Scraping and Processing
If you want to scrape and process data yourself, use the scripts under `processing/`; links from BindingDB are in `data/links.txt` but you can use your own scraper to populate `smiles.txt`.  

Once `smiles.txt` has been filled, use the `updateSmiles.yml` Github Action or run `python processing/process.py && python processing/smilesRDkit.py`.

## Examples
### [WolframLanguage (Mathematica)](https://github.com/rockwillck/SmilesDB/wiki/Examples#wolframlanguage-mathematica)

### [JavaScript](https://github.com/rockwillck/SmilesDB/wiki/Examples#javascript)

## Cite SmilesDB
Choi-Kim, W. (2025). SmilesDB Dataset [Dataset]. Zenodo. https://doi.org/10.5281/ZENODO.15756603

## [Citations](https://github.com/rockwillck/SmilesDB/wiki/Citations)

## License
The SmilesDB database is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License (https://creativecommons.org/licenses/by-sa/3.0/). This allows use, redistribution, and adaption of SmilesDB as long as appropriate attribution is given and any adaptations are redistributed under the same license.
