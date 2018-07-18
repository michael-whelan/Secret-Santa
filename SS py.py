import sys
import copy
import os
import json
from pprint import pprint
import re
import random


users = {
'user1' : {'email': 'user1@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user2' : {'email': 'user2@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user3' : {'email': 'user3@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user4' : {'email': 'user4@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user5' : {'email': 'user5@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user6' : {'email': 'user6@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user7' : {'email': 'user7@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user8' : {'email': 'user8@gmail.com', 'no_list':[], 'poss':[], 'given':''},
'user9' : {'email': 'user9@gmail.com', 'no_list':[], 'poss':[], 'given':''}
}

taken = []

def main():
	for u in users:
		fillPossible(u)
		fillGiven(users[u])
	for u in users:
		print(u , users[u]['given'])

def fillGiven(user):
	#if fillGiven.counter < 20:
		rand = random.randint(0,len(user['poss'])-1)
		if str(user['poss'][rand]) in taken:
		#	fillGiven.counter += 1
			fillGiven(user)
		else:
			taken.append(str(user['poss'][rand]))
			user['given'] = str(user['poss'][rand])
	#else:
	#	print('fucked!')
#fillGiven.counter=0

def fillPossible(user):
	for u in users:
		if u not in users[user]['no_list'] and str(u) != str(user):
			users[user]['poss'].append(str(u))


if __name__ == "__main__":
	main()
