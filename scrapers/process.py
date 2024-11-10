with open("smiles.txt", "r") as f:
    smiles = f.readlines()

filtered = filter(lambda a : a.strip() != "", smiles)
with open("processedSmiles.txt", "w") as f:
    f.writelines(filtered)