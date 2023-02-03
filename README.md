# Kva - An interactive tool for the analysis of Linux kernel functions dependencies

**Kva**, acronym of *Kernel visual analysis*, represents the result of the collaboration between **Red Hat** and the **University of Roma Tre** for the development of *an interactive tool for the analysis of Linux kernel functions dependencies*.<br>

This tool was thinked and developed for work side-by-side with [**Nav**](https://github.com/alessandrocarminati/nav), a Red Hat's tool that uses a pre-constituted database to emit call trees graphs. Therefore, Kva consents to visualize and interact with these graphs.

<img width="1268" alt="__arm64_sys_getpid" src="https://user-images.githubusercontent.com/81380857/216648420-39332912-140c-4fb2-8ae2-53b544d5e017.png"
     style="border:10px solid black;">



- Alessandro Carminati - **Red Hat**
- Gianluca Farinaccio - **University of Roma Tre**
- Maurizio Papini - **Red Hat**
- Maurizio Patrignani - **University of Roma Tre**

*Feb. 2023*



## Install 
Kva is a web application with a Python backend, so you need to install some dependencies. 

First of all, cd into your project's directory and create a Python venv:<br>
`$ python3 -m venv myvenv`<br>

After that, install dependencies:<br> 
`$ . myvenv/bin/activate`<br>
`$ pip install -r requirements.txt`<br>

## Input data
Kva is developed for support the Nav's output data as input data. The dialogue between this two tools is made with a UNIX-PIPE, placed in pipe.py file.

If you should have more info about Nav, you can find it [here](https://github.com/alessandrocarminati/nav).  
## How to run
After you've installed all dependencies, you are ready to run Kva.

`$ flask --app app run`<br> 
`$ flask --app app --debug run` *If you want to run in debug mode*<br>




