def create_dot(nodes):
    default_path = 'static/dots/'
    file = open(default_path + "network_{}.dot".format(nodes), 'w')
    file.write("digraph { ")

    for x in range(1, nodes + 1):
        for e in range(1, nodes + 1):
            if x == e:
                continue
            row = " {} -> {} ;".format(x, e)
            file.write(row)
    file.write("}")
    file.close()

create_dot(3)