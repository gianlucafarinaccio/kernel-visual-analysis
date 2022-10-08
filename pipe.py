import subprocess


def get():
	with open('static/dots/temp.txt','w') as output_dir:
		completed_process = subprocess.run(["ls", "-l"], stdout=output_dir, text=True)  #run ls command and redirect stdout in a file

if __name__ == '__main__':
	get()