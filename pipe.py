import subprocess
import json

def nav(symbol = None):
	
	if(symbol == None):
		return None

	completed_process = subprocess.run(["./nav", "-f","conf.json","-s",symbol], capture_output=True, text=True) 
	return completed_process.stdout

if __name__ == '__main__':
	nav()