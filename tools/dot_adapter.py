# Vis's DOTparser doesn't accept the \n char...
# works only with graph declaration in a single line string
# Necessary fix...
#
# [Temporary fix]
# Replaced '\n' with '\\n' in all file lines
# The new adapted file is stored in <static/dots/> with
# name <filename>_adpt.dot
def dot_adapter():
    default_path = 'static/dots/'
    file = open(default_path + 'kmalloc.dot', 'r')
    out = open(default_path + 'kmalloc_adpt.dot', 'w')
    for line in file:
        str = line.replace('\n','\\n')
        print(repr(str))
        out.write(str)
    file.close()
    out.close()
    return


dot_adapter()
