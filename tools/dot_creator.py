def create_dot(nodes):
    default_path = 'static/dots/'
    file = open(default_path + "network_{}.dot".format(nodes), 'w')
    file.write("digraph { \\n")

    for x in range(1, nodes + 1):
        for e in range(1, nodes+1):
            if x == e:
                continue
            row = " {} -> {} ;\\n".format(x, e)
            file.write(row)
    file.write("}")
    file.close()

create_dot(100)