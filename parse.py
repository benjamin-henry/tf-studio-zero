import json

with open('test.txt', 'r') as f:
    file = f.read().strip().split('\n')

tfDict = {}
last_key = ''
last_subkey = ''
funcs = {}
words = []
css_classes = []
for i,word in enumerate(file):
    if word.isupper():
        tfDict[word] = {}
        last_key = word
        last_subkey = ''
    elif 'tf.' not in word:
        tfDict[last_key][word] = []
        last_subkey = word
    else:
        words.append(word)
        funcs[f"&{word}&"] = f"@{word}@"
        tfDict[last_key][last_subkey].append(word)
    
# print(json.dumps(funcs, indent=2).replace('&"', '"').replace('"&', '"').replace('@"', '').replace('"@', ''))



# newstr = f"import {{{','.join(words)}}} from '@tensorflow/tfjs'"
# print(newstr)


# keys = sorted(list(tfDict.keys()))
# sorted_dict = {}

# for key in keys:
#     sorted_dict[key] = {}
#     subkeys = sorted(list(tfDict[key].keys()))
#     for subkey in subkeys:
#             words = sorted(tfDict[key][subkey])
#             sorted_dict[key][subkey] = words

# print(json.dumps(sorted_dict, indent=2))


# with open('tf_API_list.json','w', encoding='utf8') as f:
#     f.write(json.dumps(sorted_dict))

# with open('tf_API_list_readable.json','w', encoding='utf8') as f:
#     f.write(json.dumps(sorted_dict, indent=2))