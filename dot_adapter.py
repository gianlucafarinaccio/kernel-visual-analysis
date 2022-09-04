# Vis's DOTparser doesn't accept the \n char...
# works only with graph declaration in a single line string
# Necessary fix...
#

def dot_adapter():
    default_path = 'static/dots/'
    file = open(default_path + 'kmallocx.dot', 'r')

    new_file = open(default_path + "kmallocx_adapted.dot", 'w')
    print(file.readline())
    str = file.read()
    print(str)
    new_file.write(str)
    file.close()
    new_file.close()
    return


dot_adapter()
