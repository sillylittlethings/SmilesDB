from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors
from json import dumps

with open("data/processedSmiles.txt", "r") as f:
    molList = list(map(lambda a : a.strip(), f.readlines()))
    molList.sort(key=lambda x : len(x))

tbw = ""
for smiles in molList:
    mol = Chem.MolFromSmiles(smiles)

    molData = {}
    
    molData["SMILES"] = smiles
    try:
        molData["formula"] = Chem.rdMolDescriptors.CalcMolFormula(mol)
    except:
        pass
    try:
        molData["weight"] = Descriptors.MolWt(mol)
    except:
        pass
    try:
        molData["num_atoms"] = mol.GetNumAtoms()
    except:
        pass
    try:
        molData["num_bonds"] = mol.GetNumBonds()
    except:
        pass
    try:
        molData["LogP"] = Descriptors.MolLogP(mol)
    except:
        pass
    try:
        molData["TPSA"] = Descriptors.TPSA(mol)
    except:
        pass
    try:
        molData["rotatable_bonds"] = Descriptors.NumRotatableBonds(mol)
    except:
        pass
    try:
        molData["hbond_donors"] = Descriptors.NumHDonors(mol)
    except:
        pass
    try:
        molData["hbond_acceptors"] = Descriptors.NumHAcceptors(mol)
    except:
        pass
    tbw += dumps(molData) + "\n"


with open("data/smilesData.txt", "w") as f:
    f.write(tbw)