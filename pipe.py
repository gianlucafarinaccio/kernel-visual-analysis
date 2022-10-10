import subprocess

###
def nav():
	#with open('static/dots/temp.txt','w') as output_dir:
	completed_process = subprocess.run(["./nav", "-f","conf.json"], capture_output=True, text=True)  #run ls command and redirect stdout in a file
	return completed_process.stdout

if __name__ == '__main__':
	nav()