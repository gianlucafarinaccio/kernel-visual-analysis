# Kernel Visual Analysis
Gianluca Farinaccio, 11.2022


### How to run flask app

> `$ cd kernel-visual-analysis` <br>
> `$ . venv/bin/activate` <br>
> `$ flask --app app run` <br><br>
<b> if you want to run in debug mode</b><br>
> `$ flask --app app --debug run` <br>

### Input data-format
JSON String <br>
```javascript
{
"graph" : "a compatible DOT-format string which represent your graph", 
"symbol" : 
	[
		{ 
			"FuncName": "symbol-id", 
			"subsystems":[ "SUBSYSTEM-NAME-1", "SUBSYSTEM-NAME-2"]
		}
	],
}
```