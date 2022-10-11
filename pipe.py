import subprocess
import json

def nav(symbol = None):
	
	if(symbol == None):
		raise Exception("symbol name must not be 'None' ")

	completed_process = subprocess.run(["./nav", "-f","conf.json","-s",symbol], capture_output=True, text=True) 
	#print(completed_process.stdout)
	if(completed_process.stdout.startswith("digraph G {")):
		return completed_process.stdout
	else:
		raise Exception("nav error")

if __name__ == '__main__':
	nav("xx")