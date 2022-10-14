import subprocess
import json

def nav(symbol = None):
	
	if(symbol == None):
		raise Exception("symbol name must not be 'None' ")

	completed_process = subprocess.run(["./nav", "-f","conf-local.json","-s",symbol], capture_output=True) 
	#print(completed_process.stdout)
	# if(completed_process.stdout.startswith("digraph G {")):
	# 	return completed_process.stdout
	# else:
	# 	raise Exception("nav error")
	raw_data = completed_process.stdout
	dict_data = json.loads(raw_data) #convert raw data in a python dict
	converted_graph = dict_data['graph'].replace('\\\n', '\n')
	dict_data.update({'graph' : converted_graph})
	return dict_data

if __name__ == '__main__':
	print(nav("__kmalloc"))
