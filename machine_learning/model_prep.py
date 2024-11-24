from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

with open("data/processedSmiles.txt", "r") as f:
    molList = list(map(lambda a : a.strip(), f.readlines()))
    molList.sort(key=lambda x : len(x))

tbw = ""
for smiles in molList:
    try:
        mol = Chem.MolFromSmiles(smiles)
        tbw += f"{len(Chem.rdMolDescriptors.CalcMolFormula(mol))} {Descriptors.NumHAcceptors(mol)} {Descriptors.NumHDonors(mol)} {Descriptors.NumRotatableBonds(mol)} {Descriptors.TPSA(mol)} {Descriptors.MolLogP(mol)} {mol.GetNumAtoms()} {Descriptors.MolWt(mol)} {len(Chem.CanonSmiles(smiles))}\n"
    except:
        pass


with open("data/trainingSmiles.txt", "w") as f:
    f.write(tbw)