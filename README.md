# SmilesDB
A SMILES-first molecular database API

![screenshot](https://i.imgur.com/Zms4VHs.png)
Available at [smilesdb.org](https://smilesdb.org/citations).

## Documentation
SmilesDB contains only SMILES strings and no other data. It can be queried using `GET` endpoints.

| Endpoint              | Description                                      |
|-----------------------|--------------------------------------------------|
| `/api/smiles/full`    | Gets the full list of SMILES strings as a JSON list. |
| `/api/smiles/random/n_` | Returns `n_` random SMILES strings.               |
| `/api/smiles/short/n_`  | Returns `n_` shortest SMILES strings.             |
| `/api/smiles/long/n_`   | Returns `n_` longest SMILES strings.              |


### Data Spec
Each JSON will have some (but not necessarily all) of the following:

| Field              | Description                             |
|--------------------|-----------------------------------------|
| `SMILES`           | SMILES string                           |
| `formula`          | Molecular formula                       |
| `weight`           | Molecular weight                        |
| `num_atoms`        | Number of atoms                         |
| `num_bonds`        | Number of bonds                         |
| `LogP`             | Wildman-Crippen LogP value              |
| `TPSA`             | Topological Polar Surface Area (TPSA)   |
| `rotatable_bonds`  | Number of rotatable bonds               |
| `hbond_donors`     | Number of H-bond donors                 |
| `hbond_acceptors`  | Number of H-bond acceptors              |


## Examples
### WolframLanguage (Mathematica)
This is a community post that we wrote about using SmilesDB in WolframLanguage.

### JavaScript
The Explore page calls the API. You can see its code on [Github](https://github.com/rockwillck/SmilesDB/blob/main/static/explore.js).

## Cite SmilesDB
Choi-Kim, W. (2025). SmilesDB Dataset [Dataset]. Zenodo. https://doi.org/10.5281/ZENODO.15756603

## Citations
**Molecular Transformer: A Model for Uncertainty-Calibrated Chemical Reaction Prediction**  
Philippe Schwaller, Teodoro Laino, ThÃ©ophile Gaudin, Peter Bolgar, Christopher A. Hunter, Costas Bekas, and Alpha A. Lee
ACS Central Science 2019 5 (9), 1572-1583
DOI: 10.1021/acscentsci.9b00576

**BindingDB**  
BindingDB in 2015: A public database for medicinal chemistry, computational chemistry and systems pharmacology. M.K. Gilson, T. Liu, M. Baitaluk, G. Nicola, L. Hwang and J. Chong Nucleic Acids Research 44:D0145-D1053, doi: 10.1093/nar/gkv1072

**ChEMBL Database**  
Zdrazil B, Felix E, Hunter F, Manners EJ, Blackshaw J, Corbett S, de Veij M, Ioannidis H, Lopez DM, Mosquera JF, Magarinos MP, Bosc N, Arcila R, KizilÃ¶ren T, Gaulton A, Bento AP, Adasme MF, Monecke P, Landrum GA, Leach AR. The ChEMBL Database in 2023: a drug discovery platform spanning multiple bioactivity data types and time periods. Nucleic Acids Res. 2024 Jan 5;52(D1):D1180-D1192.  

doi: 10.1093/nar/gkad1004. PMID: 37933841; PMCID: PMC10767899.

**RDKit**  
RDKit: Open-source cheminformatics. https://www.rdkit.org

## License
The SmilesDB database is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License (https://creativecommons.org/licenses/by-sa/3.0/). This allows use, redistribution, and adaption of SmilesDB as long as appropriate attribution is given and any adaptations are redistributed under the same license.
