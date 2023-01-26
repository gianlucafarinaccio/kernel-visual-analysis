# Kernel Visual Analysis
This tool represent the result of the collaboration between **RedHat** and the **University of RomaTre** for the development of *an interactive tool for the analysis of Linux kernel functions dependencies*.<br>

- Alessandro Carminati - **RedHat**
- Gianluca Farinaccio - **University of RomaTre**
- Maurizio Papini - **RedHat**
- Maurizio Patrignani - **University of RomaTre**

*Feb. 2023*

---

### Setup and Installation
This tool is basically a web application composed by [Flask](https://github.com/pallets/flask) + [Vis.js](https://github.com/visjs/vis-network) + [Boostrap](https://getbootstrap.com). 

First of all, install the Python requirements:<br>
`$ pip install -r requirements.txt`


> `$ cd kernel-visual-analysis` <br>
> `$ . venv/bin/activate` <br>
> `$ flask --app app run` <br><br>
<b> if you want to run in debug mode</b><br>
> `$ flask --app app --debug run` <br>

### Input data-format
This project is thinked and developed for work side-by-side with [**Nav**](https://github.com/alessandrocarminati/nav) and for this, the input data-format supported is the same of Nav's output.


