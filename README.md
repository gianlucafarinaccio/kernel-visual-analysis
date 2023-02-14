# Kva - An interactive tool for the analysis of Linux kernel functions dependencies

**KVA**, which stands for *Kernel Visual Analysis*, is the result of a collaboration between **Red Hat** and the **University of Roma Tre** to develop an *interactive tool for analyzing dependencies among Linux kernel functions*.


The tool was designed and developed to work alongside with the Red Hat's [**Nav**](https://github.com/alessandrocarminati/nav) tool, a tool from Red Hat that uses a pre-existing database to generate call tree graphs. As a result, Kva allows users to visualize and interact with these graphs.

<img width="1268" alt="__arm64_sys_getpid" src="https://user-images.githubusercontent.com/81380857/216648420-39332912-140c-4fb2-8ae2-53b544d5e017.png">



- Alessandro Carminati - **Red Hat**
- Gianluca Farinaccio - **University of Roma Tre**
- Maurizio Papini - **Red Hat**
- Maurizio Patrignani - **University of Roma Tre**

*Feb. 2023*



## Install 
KVA is a python backend web application that uses Nav output. KVA has a few dependencies that can be installed as follows.
`cd` into your project's directory and create a Python venv:

```
$ python3 -m venv myvenv
```

After that, install dependencies:

```
$ . myvenv/bin/activate
$ pip install -r requirements.txt
```

## Input data
KVA requires the Nav's output data as input data. Nav's output is directly  piped into KVA.

For more info on the Nav's output format, please refer to Nav [README](https://github.com/alessandrocarminati/nav).  
## How to run
For a simple KVA run, please use the followings:
```
$ flask --app app run
```
To run KVA in debug mode:
```
$ flask --app app --debug run
```
